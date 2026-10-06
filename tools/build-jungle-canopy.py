"""Author Jungle Canopy Recon terrain. Pillow build tool; runtime remains dependency-free.

Generates assets/custom/jungle-canopy/ terrain.png, collision.png, geometry.json, terrain.js.
Palette reference: Deep jungle greens, mossy earth, ancient canopy trees, dense foliage obstacles.
"""
from pathlib import Path
import random, json, base64
from PIL import Image, ImageDraw

root = Path(__file__).resolve().parents[1]
out = root / 'assets/custom/jungle-canopy'
out.mkdir(parents=True, exist_ok=True)
rng = random.Random(58058)

# 512x384 authoring canvas, scaled 2x to 1024x768
im = Image.new('RGB', (512, 384), (42, 68, 38))
d = ImageDraw.Draw(im)

# Floor textures: moss, damp soil, leaf litter
soil_colors = [(34, 58, 31), (48, 76, 42), (56, 88, 50), (28, 48, 26), (62, 94, 54)]
for _ in range(22000):
    x, y = rng.randrange(512), rng.randrange(16, 384)
    d.line((x, y, x + rng.choice([0, 1, 2]), y), fill=rng.choice(soil_colors))

# Clear corridor paths (North pass, South pass, Staging, Canopy terminal site)
paths = [
    [(60, 195), (110, 100), (420, 100), (450, 190)], # North pass
    [(60, 195), (110, 310), (420, 310), (450, 190)], # South pass
    [(450, 190), (480, 190)]
]

# Dense foliage canopy obstacle polygons (in 1024x768 space)
polygons = [
    # Top border foliage wall
    [(0, 0), (1024, 0), (1024, 50), (0, 50)],
    # Bottom border foliage wall
    [(0, 725), (1024, 725), (1024, 768), (0, 768)],
    # Central dense canopy grove block
    [(410, 260), (590, 260), (600, 320), (580, 500), (420, 500), (400, 330)],
    # North ridge / foliage cluster
    [(230, 115), (350, 110), (360, 155), (230, 155)],
    # South ridge / foliage cluster
    [(230, 610), (350, 610), (360, 640), (230, 640)],
    # East Northeast canopy barrier cluster
    [(780, 120), (840, 110), (850, 260), (780, 260)],
    # East Southeast canopy barrier cluster
    [(780, 500), (840, 500), (850, 630), (780, 620)]
]

mask = Image.new('1', (1024, 768), 0)
md = ImageDraw.Draw(mask)
for points in polygons:
    md.polygon(points, fill=1)
    p = [(x // 2, y // 2) for x, y in points]
    d.polygon(p, fill=(22, 42, 20))
    
    # Layered canopy leaves and trunk textures
    cx = sum(x for x, y in p) / len(p)
    cy = sum(y for x, y in p) / len(p)
    for scale, color in [(0.92, (28, 54, 25)), (0.78, (38, 72, 34)), (0.60, (52, 92, 46))]:
        d.polygon([(int(cx + (x - cx) * scale), int(cy + (y - cy) * scale)) for x, y in p], fill=color)

# Add canopy leaf texture noise on obstacles
small_mask = mask.resize((512, 384), Image.Resampling.NEAREST)
for _ in range(3500):
    x, y = rng.randrange(512), rng.randrange(384)
    if small_mask.getpixel((x, y)):
        d.line((x, y, x + rng.randrange(1, 4), y), fill=rng.choice([(24, 48, 22), (36, 68, 32), (48, 88, 44), (64, 108, 56)]))

# HUD top strip
d.rectangle((0, 0, 511, 15), fill=(28, 48, 26))

im = im.resize((1024, 768), Image.Resampling.NEAREST)
collision_mask = mask.resize((1024, 768), Image.Resampling.NEAREST)

im.save(out / 'terrain.png')
collision_mask.convert('L').save(out / 'collision.png')

bits = bytearray(1024 * 768 // 8)
for y in range(768):
    for x in range(1024):
        if collision_mask.getpixel((x, y)):
            n = y * 1024 + x
            bits[n >> 3] |= 1 << (n & 7)

geometry = {
    'width': 1024,
    'height': 768,
    'polygons': polygons,
    'staging': [120, 390],
    'terminal': [845, 384],
    'extraction': [120, 390, 80],
    'ambushes': [[350, 200], [450, 580], [680, 220], [750, 560]]
}
(out / 'geometry.json').write_text(json.dumps(geometry, indent=2), encoding='utf8')

metadata = {
    'id': 'jungle-canopy',
    'name': 'Jungle Canopy',
    'width': 1024,
    'height': 768,
    'image': 'assets/custom/jungle-canopy/terrain.png',
    'mask': base64.b64encode(bits).decode(),
    'provenance': 'Authored deterministic jungle canopy terrain, seed 58058, no recovered pixels.'
}

js_content = "'use strict';\nwindow.TriumphTerrains=Object.freeze({...window.TriumphTerrains,'jungle-canopy':" + json.dumps(metadata, separators=(',', ':')) + "});\n"
(out / 'terrain.js').write_text(js_content, encoding='utf8')

print('Authored Jungle Canopy terrain, collision and JS payload.')
