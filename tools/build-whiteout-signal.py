from pathlib import Path
import json,random,base64
from PIL import Image,ImageDraw
root=Path(__file__).resolve().parents[1];out=root/'assets/custom/whiteout-signal';out.mkdir(parents=True,exist_ok=True)
rects=[[290,260,740,470],[430,510,630,590],[795,280,915,390]]
g={'width':1024,'height':768,'ridge':rects,'extraction':[120,390,80],'station':[845,205],'approaches':[[[120,390],[220,200],[845,205]],[[120,390],[220,650],[760,650],[960,450],[845,205]]]}
im=Image.new('RGB',(1024,768),(204,222,230));d=ImageDraw.Draw(im);rng=random.Random(49049)
for _ in range(14000):
 x,y=rng.randrange(1024),rng.randrange(32,768);d.line((x,y,x+rng.randrange(2,8),y),fill=rng.choice([(194,212,221),(214,232,238),(200,219,228)]))
mask=Image.new('L',(1024,768));md=ImageDraw.Draw(mask)
for r in rects:
 md.rectangle(r,fill=255);d.rectangle(r,fill=(49,79,103))
 for n,col in [(3,(83,119,146)),(9,(124,162,187)),(18,(166,197,214))]:
  x,y,X,Y=r;d.rectangle((x+n,y+n,X-n,Y-n),fill=col)
 for x in range(r[0]+24,r[2]-24,38):d.line((x,r[1]+20,x+22,r[3]-20),fill=(141,180,201),width=3)
# Wind-swept paths and irregular ice strata inside the exact blocked envelopes.
for pts in [[(120,390),(215,205),(780,205)],[(120,390),(230,655),(760,655),(962,425)]]:
 d.line(pts,fill=(211,229,235),width=42)
 for offset in [-12,12]:d.line([(x,y+offset) for x,y in pts],fill=(184,207,216),width=2)
for r in rects:
 x,y,X,Y=r
 for _ in range(160):
  a,b=rng.randrange(x+5,X-5),rng.randrange(y+5,Y-5)
  d.polygon([(a,b),(min(X-3,a+25),b-3),(min(X-3,a+12),min(Y-3,b+12))],fill=rng.choice([(145,182,202),(182,210,223),(117,156,180)]))
 for a in range(x+4,X-10,17):
  depth=rng.randrange(5,15);d.polygon([(a,y+2),(a+14,y+2),(a+7,y+depth)],fill=(226,241,245))
 for b in range(y+7,Y-10,23):d.line((x+3,b,x+14,b+9),fill=(196,223,233),width=2)
# Nonblocking station apron and extraction landing pad; runtime actors remain separate.
d.rectangle((790,145,930,250),fill=(158,183,198),outline=(91,125,146),width=3)
for x in range(800,930,20):d.line((x,148,x,247),fill=(170,195,207))
d.ellipse((48,318,192,462),fill=(180,208,217),outline=(93,151,166),width=3)
d.line((96,350,96,430),fill=(230,243,246),width=5);d.line((144,350,144,430),fill=(230,243,246),width=5);d.line((96,390,144,390),fill=(230,243,246),width=5)
d.rectangle((225,615,355,695),outline=(133,175,189),width=3)
# Research equipment is decorative floor marking, never a misleading wall.
for x in [800,890]:
 d.rectangle((x,153,x+28,178),fill=(108,147,168),outline=(73,110,130),width=2)
 d.rectangle((x+4,158,x+24,164),fill=(190,228,240))
d.ellipse((856,148,882,174),fill=(99,142,165),outline=(223,239,244),width=2)
d.line((869,162,882,139),fill=(69,113,141),width=3);d.arc((869,123,902,151),200,340,fill=(76,119,143),width=3)
for x in [58,176]:
 for y in [335,445]:d.rectangle((x-3,y-3,x+3,y+3),fill=(235,187,85))
d.line((55,320,184,320),fill=(230,241,244),width=4);d.line((55,460,184,460),fill=(230,241,244),width=4)
im.save(out/'terrain.png');mask.save(out/'collision.png');bits=bytearray(98304)
for y in range(768):
 for x in range(1024):
  if mask.getpixel((x,y)):n=y*1024+x;bits[n>>3]|=1<<(n&7)
meta=dict(id='whiteout-signal',width=1024,height=768,image='assets/custom/whiteout-signal/terrain.png',mask=base64.b64encode(bits).decode(),provenance='Authored deterministic snow terrain, seed 49049, no recovered pixels.')
(out/'geometry.json').write_text(json.dumps(g,indent=2))
(out/'terrain.js').write_text("'use strict';\nwindow.TriumphTerrains=Object.freeze({...window.TriumphTerrains,'whiteout-signal':"+json.dumps(meta,separators=(',',':'))+"});\n")
