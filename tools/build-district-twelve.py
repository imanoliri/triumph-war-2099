"""TRI-053 authored capital terrain. No recovered pixels or installed-game reads."""
from pathlib import Path
import json, random, base64, hashlib
from PIL import Image, ImageDraw
root=Path(__file__).resolve().parents[1]
out=root/'assets/custom/district-twelve';out.mkdir(parents=True,exist_ok=True)
# Selected schematic: west guard rooms, north/south transit streets, east plaza.
clear=[[45,65,325,710],[300,105,985,240],[300,530,985,665],[830,105,985,665],[325,320,850,455]]
# Guard post wall strips; broad passages connect its rooms and sheltered circuit.
walls=[[55,245,180,260],[235,245,300,260],[55,505,180,520],[235,505,300,520]]
g={'width':1024,'height':768,'seed':53053,'clearRectangles':clear,'blockedRectangles':walls,'shelteredRoute':[[115,170],[115,385],[115,600]],'connectedRooms':[[210,170],[210,385],[210,600]],'transitRoutes':[[[210,385],[360,170],[880,170]],[[210,385],[360,600],[880,600]]],'reliefEntry':[[210,70],[210,385]],'plazaCircuit':[[880,170],[880,600],[360,600],[360,385],[880,385]]}
im=Image.new('RGB',(1024,768),(43,47,56));d=ImageDraw.Draw(im)
mask=Image.new('L',(1024,768),255);md=ImageDraw.Draw(mask)
for r in clear:
 md.rectangle(r,fill=0);d.rectangle(r,fill=(117,116,108),outline=(170,169,148),width=3)
 for y in range(r[1]+8,r[3]-3,24):d.line((r[0]+4,y,r[2]-4,y),fill=(110,109,102))
for r in walls:md.rectangle(r,fill=255);d.rectangle(r,fill=(45,47,51),outline=(189,183,154),width=3)
# Blocked residential/government masses with visible wall rims, no walkable rooftops.
for r in [[340,265,805,300],[340,475,805,510],[345,50,980,88],[345,685,980,735]]:
 d.rectangle(r,fill=(60,65,74),outline=(176,171,150),width=3)
 for x in range(r[0]+14,r[2]-12,38):d.rectangle((x,r[1]+8,x+18,r[3]-8),fill=(72,78,86),outline=(92,98,105))
# Guard floor, transit rails and public plaza paving are walkable, muted paint.
for y in [170,385,600]:
 d.rectangle((70,y-47,290,y+47),outline=(151,146,125),width=2)
for y in [170,600]:
 for dy in [-20,20]:d.line((340,y+dy,815,y+dy),fill=(83,87,88),width=3)
 for x in range(350,815,32):d.line((x,y-19,x,y+19),fill=(101,103,99))
for x in range(850,976,24):d.line((x,250,x,520),fill=(130,130,120))
for y in range(250,521,24):d.line((835,y,980,y),fill=(130,130,120))
d.ellipse((868,336,945,414),outline=(162,157,133),width=3)
for x,y in [(150,170),(150,600),(210,385),(258,385),(306,385)]:
 d.rectangle((x-20,y-20,x+20,y+20),outline=(154,151,128),width=2)
 d.line((x-12,y,x+12,y),fill=(154,151,128),width=2)
# Static guard furnishings occupy already blocked wall envelopes only.
for y in [246,506]:
 for x in [68,108,148,248,278]:
  d.rectangle((x,y+2,x+16,y+10),fill=(90,101,98),outline=(137,148,130))
  d.line((x+7,y+3,x+7,y+9),fill=(56,66,67))
# North/south platforms, numbered floor bays and crosswalks are paint, not obstacles.
for y in [170,600]:
 for x in range(360,810,48):
  d.rectangle((x,y-48,x+28,y-42),fill=(151,143,111))
  d.rectangle((x,y+42,x+28,y+48),fill=(151,143,111))
 for x in range(836,972,16):d.rectangle((x,y-5,x+7,y+5),fill=(174,167,139))
# Plaza bench/planter shapes remain outside clear paving, on blocked building edges.
for y in [276,482]:
 for x in [365,490,630,755]:
  d.rectangle((x,y,x+30,y+12),fill=(76,86,77),outline=(139,144,118))
  d.rectangle((x+4,y+3,x+26,y+9),fill=(85,104,72))
# Facade vents and roof seams keep all blocked building masses legible.
for y in [272,482,59,697]:
 for x in range(355,785,57):
  d.line((x,y,x+32,y),fill=(93,98,106),width=2)
  d.rectangle((x+4,y+4,x+15,y+12),fill=(48,55,64),outline=(108,111,114))
rng=random.Random(53053)
for _ in range(6500):
 x,y=rng.randrange(1024),rng.randrange(40,768)
 if mask.getpixel((x,y))==0:d.point((x,y),fill=rng.choice([(108,109,101),(127,126,116),(115,115,108)]))
im.save(out/'terrain.png');mask.save(out/'collision.png')
bits=bytearray(98304)
for y in range(768):
 for x in range(1024):
  if mask.getpixel((x,y)):n=y*1024+x;bits[n>>3]|=1<<(n&7)
meta={'id':'district-twelve','width':1024,'height':768,'image':'assets/custom/district-twelve/terrain.png','mask':base64.b64encode(bits).decode(),'provenance':'Authored deterministic Crown capital terrain, seed 53053; no recovered pixels.'}
(out/'terrain.js').write_text("'use strict';\nwindow.TriumphTerrains=Object.freeze({...window.TriumphTerrains,'district-twelve':"+json.dumps(meta,separators=(',',':'))+"});\n")
(out/'geometry.json').write_text(json.dumps(g,indent=2)+'\n')
manifest={'source':'tools/build-district-twelve.py','seed':53053,'geometry':'geometry.json','references':['docs/art-kit/manifest.json','docs/art-kit/README.md','docs/planning/campaigns/planets/capital-world.md'],'coordinateConvention':'1024x768 top-left origin; recovered actor hotspots; row-major LSB-first mask','provenance':'Entire terrain authored in Pillow; no recovered or generated raster input. Runtime actors remain credited to Anthony Lopes / DarkSun Games.'}
for filename,key in [('collision.png','collisionSHA256'),('terrain.png','terrainSHA256')]:manifest[key]=hashlib.sha256((out/filename).read_bytes()).hexdigest()
manifest['maskSHA256']=hashlib.sha256(bits).hexdigest()
(out/'manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
# Reference-only geometry overlay.
overlay=im.copy();od=ImageDraw.Draw(overlay)
for key in ['shelteredRoute','connectedRooms','reliefEntry','plazaCircuit']:od.line([tuple(p) for p in g[key]],fill=(70,210,180),width=2)
for r in clear:od.rectangle(r,outline=(80,225,125),width=2)
for r in walls:od.rectangle(r,outline=(235,90,80),width=2)
overlay.save(out/'geometry-overlay.png')
