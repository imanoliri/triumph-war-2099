"""Small local reference previews only. Never writes runtime assets."""
from pathlib import Path
import json
from PIL import Image, ImageDraw
root=Path(__file__).resolve().parents[2]
out=Path(__file__).resolve().parent
m=json.loads((out/'manifest.json').read_text())
def load(p): return Image.open(root/p).convert('RGBA')
def sheet(items,name,cols=4,cell=(280,200)):
    w,h=cell; im=Image.new('RGB',(w*cols,h*((len(items)+cols-1)//cols)), '#20252a'); d=ImageDraw.Draw(im)
    for i,(label,p) in enumerate(items):
        x=i%cols*w;y=i//cols*h;src=load(p);src.thumbnail((w-20,h-52),Image.Resampling.NEAREST)
        im.paste(src,(x+10,y+34),src);d.text((x+8,y+5),label,fill='white');d.text((x+8,y+h-16),p.replace('assets/images/','img/'),fill='#c9b78b')
    im.save(out/name)
sheet([(f"{s['object']} {s['name']} (recovered)",s['path']) for s in m['sprites']],'sprites.png',3,(350,150))
# Native frames ×3 on checker-like neutral field, hotspot cross in cyan.
im=Image.open(out/'sprites.png'); d=ImageDraw.Draw(im)
for i,s in enumerate(m['sprites']):
    x=i%3*350+10;y=i//3*150+34;src=load(s['path']);src=src.resize((src.width*3,src.height*3),Image.Resampling.NEAREST);im.paste(src,(x,y),src)
    hx=x+s['hx']*3;hy=y+s['hy']*3;d.line((hx-4,hy,hx+4,hy),fill='cyan');d.line((hx,hy-4,hx,hy+4),fill='cyan');d.text((x+180,y+30),f"native {s['width']}x{s['height']}\nhotspot {s['hx']},{s['hy']}\ninspection x3",fill='white')
im.save(out/'sprites.png')
sheet([(f"Recovered backdrop handle {e['handle']}",e['path']) for e in m['elements']],'elements.png',4,(280,240))
sheet([('CUSTOM current terrain','assets/custom/split-ridge/terrain.png'),('CUSTOM white=blocked mask','assets/custom/split-ridge/collision.png'),('RECOVERED Desert Rocks','assets/maps/7.png'),('CUSTOM A approved schematic','docs/design/relay-breaker-maps/a-split-ridge.png'),('CUSTOM B saved concept only','docs/design/relay-breaker-maps/b-relay-basin.png'),('CUSTOM C saved concept only','docs/design/relay-breaker-maps/c-switchback-mesa.png'),('HISTORICAL tactical screenshot','docs/playtests/artifacts/2026-10-04-split-ridge-tactical.png'),('HISTORICAL earlier live screenshot','docs/playtests/artifacts/2026-10-04-split-ridge-live.png')],'library.png',2,(540,440))
im=load('assets/custom/split-ridge/terrain.png');mask=Image.open(root/'assets/custom/split-ridge/collision.png').convert('L');overlay=Image.new('RGBA',im.size,(255,0,180,110));overlay.putalpha(mask.point(lambda v:110 if v else 0));im.alpha_composite(overlay);d=ImageDraw.Draw(im)
for p in m['placements']:
    x,y=p['point'];d.ellipse((x-5,y-5,x+5,y+5),outline='cyan',width=2);label={'commander':'C','soldier':'S','bug':'B','nest':'N','relay':'R','troop support':'troop','tank support':'tank','plasma':'plasma'}[p['kind']];d.text((x+7,y-5),label,fill='cyan')
d.rectangle((0,0,1023,31),outline='white');d.text((5,5),'REFERENCE OVERLAY: magenta blocked / cyan immutable hotspots / not terrain',fill='white');im.convert('RGB').save(out/'geometry.png')
im=Image.new('RGB',(720,180),'#20252a');d=ImageDraw.Draw(im)
for row,(kind,colors) in enumerate(m['palette'].items()):
    for col,c in enumerate(colors):
        x=col*120;y=row*90;d.rectangle((x,y,x+119,y+55),fill=c);d.text((x+6,y+60),kind+' '+c,fill='white')
im.save(out/'palette.png')
print('Rendered library, recovered elements/sprites, custom palette and fixed geometry overlay.')
