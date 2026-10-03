"""Prepare the installed Windows MIDI samples for local playback, without downloads.

The generated bank is machine-local and excluded from Git. Regenerate it on each
Windows installation; this script does not change the system DLS file.
"""
from pathlib import Path
import struct, base64, json, hashlib, sys
source = Path(sys.argv[1] if len(sys.argv)>1 else 'C:/Windows/System32/drivers/gm.dls')
b = source.read_bytes()
def chunks(start,end):
    while start+8<=end:
        name=b[start:start+4]; length=struct.unpack_from('<I',b,start+4)[0]
        if start+8+length>end: raise ValueError('Truncated DLS chunk')
        yield name,start+8,length
        start+=8+length+(length&1)
def children(p,n): return list(chunks(p+4,p+n))
def lists(p,n,kind): return [(q,l) for a,q,l in children(p,n) if a==b'LIST' and b[q:q+4]==kind]
def sample(p,n):
    size,root,fine,atten,options,count=struct.unpack_from('<IHhiII',b,p)
    loops=[]
    for i in range(count):
        _,kind,start,length=struct.unpack_from('<IIII',b,p+size+i*16)
        loops.append([start,length])
    return {'root':root,'fine':fine,'gain':10**(atten/65536/200),'loops':loops}
assert b[:4]==b'RIFF' and b[8:12]==b'DLS '
top=list(chunks(12,len(b)))
wp,wn=next((p,n) for a,p,n in top if a==b'LIST' and b[p:p+4]==b'wvpl')
waves=[]; offsets={}
for p,n in lists(wp,wn,b'wave'):
    c={a:(q,l) for a,q,l in children(p,n)}
    q,l=c[b'fmt ']; fmt,channels,rate,average,align,bits=struct.unpack_from('<HHIIHH',b,q)
    assert fmt==1 and bits==16 and channels==1
    q,l=c[b'data']; data=b[q:q+l]
    offsets[p-8-(wp+4)]=len(waves)
    waves.append({'rate':rate,'frames':l//2,'pcm':base64.b64encode(data).decode(),'sample':sample(*c[b'wsmp']) if b'wsmp' in c else None})
p,n=next((p,n) for a,p,n in top if a==b'ptbl'); size,count=struct.unpack_from('<II',b,p)
cues=[offsets[struct.unpack_from('<I',b,p+size+i*4)[0]] for i in range(count)]
ip,ins=next((p,n) for a,p,n in top if a==b'LIST' and b[p:p+4]==b'lins')
instruments={}
for p,n in lists(ip,ins,b'ins '):
    c={a:(q,l) for a,q,l in children(p,n)}; regions,bank,program=struct.unpack_from('<III',b,c[b'insh'][0])
    # The standard melodic bank and percussion bank reproduce the default MIDI device.
    if bank&0x7fffffff: continue
    key=('drum:' if bank&0x80000000 else 'melodic:')+str(program)
    out=[]
    for a,q,l in children(p,n):
        if a!=b'LIST' or b[q:q+4]!=b'lrgn': continue
        for r,z in lists(q,l,b'rgn '):
            rc={a:(u,v) for a,u,v in children(r,z)}
            low,high,vlow,vhigh,options,group=struct.unpack_from('<HHHHHH',b,rc[b'rgnh'][0])
            wave=cues[struct.unpack_from('<I',b,rc[b'wlnk'][0]+8)[0]]
            out.append({'low':low,'high':high,'vlow':vlow,'vhigh':vhigh,'wave':wave,'sample':sample(*rc[b'wsmp']) if b'wsmp' in rc else waves[wave]['sample']})
    assert len(out)==regions
    instruments[key]=out
result={'source':'Installed Windows gm.dls (Microsoft/Roland)','sha256':hashlib.sha256(b).hexdigest(),'waves':waves,'instruments':instruments}
target=Path('assets/audio/gm-bank.js')
target.write_text('window.WINDOWS_MIDI_BANK='+json.dumps(result,separators=(',',':'))+';\n',encoding='utf8')
print(f'Prepared {len(waves)} PCM samples and {len(instruments)} MIDI instruments in {target}. Machine-local, excluded from Git.')
