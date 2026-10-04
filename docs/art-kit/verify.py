"""Validate kit snapshot references and collision conventions; no gameplay simulation."""
from pathlib import Path
import json,hashlib,base64,re
from PIL import Image
out=Path(__file__).resolve().parent;root=out.parents[1]
m=json.loads((out/'manifest.json').read_text())
for r in m['references']:
    p=root/r['path'];assert p.is_file(),p
    assert hashlib.sha256(p.read_bytes()).hexdigest()==r['sha256'],p
for s in m['sprites']+m['elements']:
    p=root/s['path'];assert p.is_file(),p
    assert Image.open(p).size==(s['width'],s['height']),p
    assert s['provenance'].startswith('recovered')
for p in ['terrain.png','collision.png']:
    assert Image.open(root/'assets/custom/split-ridge'/p).size==(1024,768)
assert len(m['placements'])==25
bits=base64.b64decode(m['maskBase64']);assert len(bits)==98304
assert hashlib.sha256(bits).hexdigest()==m['maskSha256']
mask=Image.open(root/'assets/custom/split-ridge/collision.png').convert('L')
pixels=mask.tobytes()
assert set(pixels)=={0,255}
packed=bytearray(98304)
for n,v in enumerate(pixels):
    if v:packed[n>>3]|=1<<(n&7)
assert bytes(packed)==bits
data=(root/'assets/custom/split-ridge/terrain.js').read_text();assert json.loads(data.split("'split-ridge':",1)[1].rsplit('});',1)[0])['mask']==m['maskBase64']
for p in ['library.png','elements.png','sprites.png','palette.png','geometry.png']:
    Image.open(out/p).verify()
for p in out.glob('*.md'):
    for target in re.findall(r'\]\(([^)]+)\)',p.read_text()):
        if '://' not in target: assert (out/target.split('#')[0]).exists(),(p,target)
print('PASS kit paths/hashes, sprite dimensions/provenance, 25 hotspots, 1024x768, all 786432 mask bits/packing, previews and Markdown links.')
