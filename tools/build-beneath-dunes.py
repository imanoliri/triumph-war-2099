from pathlib import Path
import json, random, base64
from PIL import Image, ImageDraw
root=Path(__file__).resolve().parents[1]; out=root/'assets/custom/beneath-dunes';out.mkdir(parents=True,exist_ok=True)
g=json.loads((root/'docs/planning/campaigns/maps/beneath-dunes/geometry.json').read_text())['maps'][0]
im=Image.new('RGB',(1024,768),(207,178,108));d=ImageDraw.Draw(im);rng=random.Random(36036)
for _ in range(18000):
 x,y=rng.randrange(1024),rng.randrange(36,768);d.line((x,y,x+rng.randrange(1,5),y),fill=rng.choice([(199,168,99),(215,186,118),(203,174,105)]))
mask=Image.new('L',(1024,768));md=ImageDraw.Draw(mask)
for rect in g['rocks']:
 md.rectangle(rect,fill=255);d.rectangle(rect,fill=(107,84,57))
 for inset,color in [(3,(143,116,77)),(9,(170,140,92)),(17,(184,152,101))]:
  x,y,X,Y=rect;d.rectangle((x+inset,y+inset,X-inset,Y-inset),fill=color)
 for _ in range(90):
  x,y,X,Y=rect;a=rng.randrange(x+18,X-18);b=rng.randrange(y+18,Y-18);d.line((a,b,min(X-18,a+rng.randrange(3,24)),b),fill=(160,129,84))
im.save(out/'terrain.png');mask.save(out/'collision.png');bits=bytearray(98304)
for y in range(768):
 for x in range(1024):
  if mask.getpixel((x,y)):n=y*1024+x;bits[n>>3]|=1<<(n&7)
meta=dict(id='beneath-dunes',width=1024,height=768,image='assets/custom/beneath-dunes/terrain.png',mask=base64.b64encode(bits).decode(),rocks=g['rocks'],provenance='Custom deterministic baseline, seed 36036; accepted A rectangle envelopes; no recovered pixels.')
(out/'terrain.js').write_text("'use strict';\nwindow.TriumphTerrains=Object.freeze({...window.TriumphTerrains,'beneath-dunes':"+json.dumps(meta,separators=(',',':'))+"});\n")
print('Built only Beneath the Dunes baseline and mask.')
