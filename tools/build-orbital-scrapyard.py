"""TRI-093 authored Derelict Relay Strike; atlas B source retained, no recovered pixels."""
from pathlib import Path
import json, base64, random, sys
from PIL import Image, ImageDraw
root=Path(__file__).resolve().parents[1]
plan=next(w for w in json.loads((root/'docs/design/world-map-atlas/geometry.json').read_text())['worlds'] if w['world']=='Orbital Scrapyard')['options'][1]
out=Path(sys.argv[1]).resolve() if len(sys.argv)>1 else root/'assets/custom/orbital-scrapyard';out.mkdir(parents=True,exist_ok=True)
mask=Image.new('1',(1024,768),1);md=ImageDraw.Draw(mask)
# Exact selected corridor union; broad staging pads provide turns and nest births.
for a,b in plan['edges']:
    md.line([tuple(plan['points'][a]),tuple(plan['points'][b])],fill=0,width=144)
for x,y in plan['points']:md.ellipse((x-88,y-88,x+88,y+88),fill=0)
md.rectangle((0,0,1023,31),fill=1)
im=Image.new('RGB',(1024,768));px=im.load();rng=random.Random(9309)
for y in range(768):
 for x in range(1024):
  solid=mask.getpixel((x,y));v=rng.randrange(-6,7)
  base=(35,39,52) if solid else (152,140,134)
  px[x,y]=tuple(c+v for c in base)
d=ImageDraw.Draw(im)
# Hull plates and salvage seams on solid regions only; visual trim never changes collision.
for y in range(48,768,24):
 for x in range((y//24%2)*24,1024,48):
  if all(mask.getpixel((xx,yy)) for xx,yy in [(x,y),(min(x+42,1023),y),(x,min(y+18,767)),(min(x+42,1023),min(y+18,767))]):
   d.rectangle((x,y,x+40,y+16),outline=(61,68,88),width=2)
   if rng.random()<.25:d.line((x+4,y,x+18,y+15,x+30,y+16),fill=(91,99,113),width=3)
for x,y in plan['points']:
 d.ellipse((x-65,y-65,x+65,y+65),outline=(188,175,158),width=2)
 d.line((x-38,y,x+38,y),fill=(122,116,111),width=2)
d.rectangle((0,0,1023,31),fill=(23,26,36))
im.save(out/'terrain.png');mask.convert('L').save(out/'collision.png')
bits=bytearray(1024*768//8)
for y in range(768):
 for x in range(1024):
  if mask.getpixel((x,y)):
   n=y*1024+x;bits[n>>3]|=1<<(n&7)
geometry={'id':'orbital-scrapyard','width':1024,'height':768,'source':'docs/design/world-map-atlas/geometry.json#orbital-scrapyard-b','selectedOption':'orbital-scrapyard-b','points':plan['points'],'edges':plan['edges'],'corridorWidth':144,'nodePadRadius':88,'collisionContract':'Selected corridor union, 32px HUD solid; center movement plus 17px static visual envelope.'}
geometry['source']='docs/design/world-map-atlas/geometry.json#orbital-scrapyard-b'
(out/'geometry.json').write_text(json.dumps(geometry,indent=2)+'\n')
metadata={'id':'orbital-scrapyard','name':'Derelict Relay Strike','width':1024,'height':768,'image':'assets/custom/orbital-scrapyard/terrain.png','mask':base64.b64encode(bits).decode(),'provenance':'TRI-093 custom authored selected orbital-scrapyard-b asymmetric hull circuits, deterministic seed9309; no recovered pixels.'}
(out/'terrain.js').write_text("'use strict';\nwindow.TriumphTerrains=Object.freeze({...window.TriumphTerrains,'orbital-scrapyard':"+json.dumps(metadata,separators=(',',':'))+'});\n')
print('Built only orbital-scrapyard terrain and collision.')
