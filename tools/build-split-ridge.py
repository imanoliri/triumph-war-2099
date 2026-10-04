"""Author Split Ridge only. Pillow build tool; runtime remains dependency-free.

Palette reference: assets/maps/7.png (recovered Desert Rocks). No source pixels,
actors or silhouettes are copied. Geometry derives from accepted proposal A.
"""
from pathlib import Path
import random, json, base64
from PIL import Image, ImageDraw

root = Path(__file__).resolve().parents[1]
out = root / 'assets/custom/split-ridge'
out.mkdir(parents=True, exist_ok=True)
rng = random.Random(32032)
# Two-pixel authoring grid matches the recovered low-resolution texture cadence.
im = Image.new('RGB', (512,384), (216,184,96))
d = ImageDraw.Draw(im)
sand = [(200,168,72),(240,208,112),(184,152,64),(208,168,96),(224,184,112)]
for _ in range(19000):
    x,y = rng.randrange(512),rng.randrange(16,384)
    d.line((x,y,x+rng.choice([0,1,2]),y),fill=rng.choice(sand))
# Wind-cut sand striations remain decorative and traversable.
for _ in range(200):
    x,y=rng.randrange(512),rng.randrange(20,380)
    d.line((x,y,x+rng.randrange(3,14),y-1),fill=(200,168,72))
# Irregular ridge silhouettes stay inside agreed obstacle envelopes.
polygons = [
 [(280,340),(298,322),(334,310),(390,318),(428,310),(474,322),(530,312),(580,324),(634,314),(690,326),(714,344),(730,374),(720,412),(730,438),(704,456),(654,460),(600,448),(548,460),(490,450),(442,460),(396,448),(346,458),(308,444),(284,420)],
 [(520,24),(700,24),(700,62),(682,82),(646,88),(612,80),(574,88),(540,78),(520,62)],
 [(520,712),(538,692),(568,680),(608,690),(654,680),(682,690),(700,710),(700,744),(520,744)]
]
mask = Image.new('1',(1024,768),0)
md=ImageDraw.Draw(mask)
for points in polygons:
    md.polygon(points,fill=1)
    p=[(x//2,y//2) for x,y in points]
    d.polygon(p,fill=(136,120,88))
    # Stepped inset rock layers and stratified facets; never square placeholders.
    cx=sum(x for x,y in p)/len(p);cy=sum(y for x,y in p)/len(p)
    for scale,color in [(0.93,(152,128,96)),(.80,(176,152,104)),(.65,(192,160,120))]:
        d.polygon([(int(cx+(x-cx)*scale),int(cy+(y-cy)*scale)) for x,y in p],fill=color)
    # Angular bedding cracks and lit rock slabs give each ridge a carved face.
    layer=Image.new('RGB',(512,384)); ld=ImageDraw.Draw(layer)
    for _ in range(30):
        x=rng.randrange(min(a for a,b in p),max(a for a,b in p)+1)
        y=rng.randrange(min(b for a,b in p),max(b for a,b in p)+1)
        length=rng.randrange(7,25); rise=rng.randrange(3,9)
        ld.polygon([(x,y),(x+length,y-rise),(x+length+5,y+3),(x+6,y+rise)],fill=(176,152,104))
        ld.line((x,y,x+length,y-rise),fill=(208,184,136),width=1)
        ld.line((x+6,y+rise,x+length+5,y+3),fill=(136,120,88),width=2)
    region=Image.new('1',(512,384));ImageDraw.Draw(region).polygon(p,fill=1)
    # Composite just the authored facet marks, clipped to this rock.
    import PIL.ImageChops
    marks=layer.convert('L').point(lambda v:255 if v else 0).convert('1')
    im.paste(layer,(0,0),PIL.ImageChops.logical_and(region,marks))
    # Texture clipped to silhouette via mask at source grid.
    small=mask.resize((512,384),Image.Resampling.NEAREST)
    for _ in range(1800):
        x=rng.randrange(min(a for a,b in p),max(a for a,b in p)+1)
        y=rng.randrange(min(b for a,b in p),max(b for a,b in p)+1)
        if small.getpixel((x,y)):
            d.line((x,y,x+rng.randrange(1,4),y),fill=rng.choice([(136,120,88),(152,128,96),(176,152,104),(192,160,120)]))
    for a,b in zip(p,p[1:]+p[:1]):
        d.line((a,b),fill=(120,80,32),width=1)
        if b[0]>a[0]: d.line((a[0],a[1]-1,b[0],b[1]-1),fill=(240,208,112))
# Top world strip is kept quiet for the HUD. No baked actors or pickup motifs.
d.rectangle((0,0,511,15),fill=(184,152,64))
im=im.resize((1024,768),Image.Resampling.NEAREST)
# Compile collision on the exact same two-pixel grid as the rock artwork.
mask=Image.new('1',(512,384),0)
md=ImageDraw.Draw(mask)
for points in polygons: md.polygon([(x//2,y//2) for x,y in points],fill=1)
mask=mask.resize((1024,768),Image.Resampling.NEAREST)
im.save(out/'terrain.png')
mask.convert('L').save(out/'collision.png')
bits=bytearray(1024*768//8)
for y in range(768):
    for x in range(1024):
        if mask.getpixel((x,y)):
            n=y*1024+x; bits[n>>3]|=1<<(n&7)
metadata={'id':'split-ridge','name':'Split Ridge','width':1024,'height':768,'image':'assets/custom/split-ridge/terrain.png','mask':base64.b64encode(bits).decode(),'polygons':polygons,'provenance':'Custom deterministic pixel art; palette only from assets/maps/7.png; accepted A geometry; no recovered pixels or actors.'}
(out/'terrain.js').write_text("'use strict';\nwindow.TriumphTerrains=Object.freeze({'split-ridge':"+json.dumps(metadata,separators=(',',':'))+"});\n",encoding='utf8')
print('Authored Split Ridge terrain, collision preview and packed runtime mask.')
