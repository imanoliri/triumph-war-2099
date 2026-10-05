from pathlib import Path
import json, random, base64, hashlib
from PIL import Image, ImageDraw
root=Path(__file__).resolve().parents[1];out=root/'assets/custom/harbor-watch';out.mkdir(parents=True,exist_ok=True)
# Frozen traversable envelopes: west harbor, three docks, east shore, southern causeway.
land=[[55,75,390,700],[350,110,970,230],[350,310,970,440],[350,525,970,645],[865,75,1000,710],[350,655,940,715]]
g={'width':1024,'height':768,'clearRectangles':land,'dockRoutes':[[[225,375],[440,170],[930,170]],[[225,375],[930,375]],[[225,375],[440,585],[930,585]]],'causeway':[[225,375],[225,680],[930,680]],'shelteredRoute':[[140,170],[140,585]],'seed':50050}
im=Image.new('RGB',(1024,768),(27,67,83));d=ImageDraw.Draw(im);rng=random.Random(50050)
for _ in range(6500):
 x,y=rng.randrange(1024),rng.randrange(32,768);d.line((x,y,x+rng.randrange(3,15),y),fill=rng.choice([(31,77,92),(39,86,100),(25,61,78)]))
mask=Image.new('L',(1024,768),255);md=ImageDraw.Draw(mask)
for r in land:
 md.rectangle(r,fill=0);d.rectangle(r,fill=(107,127,127),outline=(170,190,173),width=4)
 for y in range(r[1]+8,r[3]-4,14):d.line((r[0]+5,y,r[2]-5,y),fill=(92,113,115))
 for x in range(r[0]+12,r[2]-4,38):d.line((x,r[1]+5,x,r[3]-5),fill=(119,137,133))
# Broad low-contrast sheltered yard and operational aprons, all walkable.
d.rectangle((75,90,325,685),fill=(112,132,126),outline=(150,165,146),width=2)
for y in range(110,680,18):d.line((80,y,320,y),fill=(108,126,121))
for y in [170,375,585]:
 d.rectangle((375,y-36,860,y+36),fill=(137,141,126),outline=(165,165,140),width=2)
 for x in range(390,850,24):d.line((x,y-31,x,y+31),fill=(124,128,115))
 for x in range(415,850,80):d.rectangle((x,y-29,x+23,y-25),fill=(175,167,115))
# Blocked water visually distinct; sparse foam outside dock edges.
for y in [245,285,460,500,735]:
 for x in range(410,860,41):d.line((x,y,x+19,y),fill=(64,117,127),width=2)
# Landing marks and harbor engineering floor paint, no baked actors or pickups.
for x,y in [(150,205),(150,540),(300,680)]:
 d.rectangle((x-24,y-24,x+24,y+24),outline=(169,172,146),width=2)
 d.line((x-15,y-15,x-15,y+15),fill=(166,172,157),width=3);d.line((x+15,y-15,x+15,y+15),fill=(166,172,157),width=3);d.line((x-15,y,x+15,y),fill=(166,172,157),width=3)
# Dock furniture remains inside blocked water: no walkable roof/wall deception.
for y in [245,470]:
 # Static jetty crane over water between approaches, entirely collision-blocked.
 d.rectangle((690,y,750,y+24),fill=(54,70,76),outline=(147,161,145),width=2)
 d.rectangle((705,y+3,737,y+20),fill=(88,101,101),outline=(35,55,66),width=2)
 d.line((723,y+12,820,y+12),fill=(167,164,120),width=6)
 d.line((727,y+8,794,y-5),fill=(121,134,125),width=3)
 d.line((817,y+10,817,y+26),fill=(50,60,62),width=2)
# Shore seawall with mooring hardware on blocked edge and floor-painted loading bays.
for y in [112,225,312,435,527,640]:
 for x in [425,565,715,845]:
  d.rectangle((x-4,y-3,x+4,y+3),fill=(54,68,69),outline=(173,171,135))
  d.line((x-8,y,x+8,y),fill=(153,151,126),width=2)
for x,y in [(90,260),(90,400),(90,625)]:
 d.rectangle((x,y,x+45,y+32),outline=(145,154,135),width=2)
 for dx in range(5,44,8):d.line((x+dx,y+5,x+dx,y+27),fill=(121,138,127))
# Breakwater markers fixed outside navigable dock faces, deliberately muted.
for y in [250,490,735]:
 d.rectangle((973,y,992,y+15),fill=(58,76,78),outline=(123,147,137),width=2)
 d.rectangle((980,y+4,986,y+9),fill=(175,153,104))
# Stippled deck weathering without high-contrast clutter.
for _ in range(4500):
 x,y=rng.randrange(65,995),rng.randrange(80,712)
 if mask.getpixel((x,y))==0:
  d.point((x,y),fill=rng.choice([(105,121,115),(133,144,131),(119,131,122)]))
im.save(out/'terrain.png');mask.save(out/'collision.png');bits=bytearray(98304)
for y in range(768):
 for x in range(1024):
  if mask.getpixel((x,y)):n=y*1024+x;bits[n>>3]|=1<<(n&7)
meta=dict(id='harbor-watch',width=1024,height=768,image='assets/custom/harbor-watch/terrain.png',mask=base64.b64encode(bits).decode(),provenance='Authored deterministic Pelagos harbor terrain, seed 50050; no recovered pixels.')
(out/'geometry.json').write_text(json.dumps(g,indent=2)+'\n')
(out/'terrain.js').write_text("'use strict';\nwindow.TriumphTerrains=Object.freeze({...window.TriumphTerrains,'harbor-watch':"+json.dumps(meta,separators=(',',':'))+"});\n")
(out/'manifest.json').write_text(json.dumps({'source':'tools/build-harbor-watch.py','seed':50050,'coordinateConvention':'1024x768; top-left origin; actors use recovered hotspots; row-major LSB-first mask','referenceCatalog':'docs/art-kit/manifest.json','collisionSHA256':hashlib.sha256((out/'collision.png').read_bytes()).hexdigest(),'maskSHA256':hashlib.sha256(bits).hexdigest(),'terrainSHA256':hashlib.sha256((out/'terrain.png').read_bytes()).hexdigest(),'geometry':'geometry.json'},indent=2)+'\n')

# Reference overlay is never shipped as terrain. Hotspots come from the runtime snapshot.
manifestPath=out/'manifest.json'
# Export runtime placements after building via node tools/export-harbor-contract.cjs.
