"""Author Toxic Marsh planet containment mission terrain. Pillow build tool; runtime remains dependency-free.

Generates assets/custom/toxic-marsh/ terrain.png, collision.png, geometry.json, terrain.js.
Palette reference: Dark swamp mud, bio-sludge green pools, bio-containment steel barriers, yellow-green bio-hazard trim.
"""
from pathlib import Path
import random, json, base64
from PIL import Image, ImageDraw

root = Path(__file__).resolve().parents[1]
out = root / 'assets/custom/toxic-marsh'
out.mkdir(parents=True, exist_ok=True)
rng = random.Random(90909)

# 512x384 authoring canvas, scaled 2x to 1024x768
im = Image.new('RGB', (512, 384), (28, 38, 26))
d = ImageDraw.Draw(im)

# Floor textures: murky swamp soil, bio-sludge noise, decayed marsh earth
marsh_colors = [(22, 30, 20), (34, 46, 30), (42, 56, 36), (18, 26, 16), (50, 68, 42)]
for _ in range(22000):
    x, y = rng.randrange(512), rng.randrange(16, 384)
    d.line((x, y, x + rng.choice([0, 1, 2]), y), fill=rng.choice(marsh_colors))

# Toxic bio-sludge pool highlights and bioluminescent glow (in 512x384 space)
toxic_colors = [(40, 130, 30), (60, 170, 45), (80, 200, 55), (100, 220, 65)]
for _ in range(3000):
    x, y = rng.randrange(512), rng.randrange(16, 384)
    if (140 <= x <= 190 and 100 <= y <= 280) or (300 <= x <= 330 and 30 <= y <= 350) or (400 <= x <= 460 and 150 <= y <= 300):
        d.point((x, y), fill=rng.choice(toxic_colors))

# UNIQUE polygon layout for Toxic Marsh containment walls and bio-vat islets (in 1024x768 space)
polygons = [
    # Top containment wall
    [(0, 0), (1024, 0), (1024, 50), (0, 50)],
    # Bottom containment wall
    [(0, 725), (1024, 725), (1024, 768), (0, 768)],
    # West embankment North (staging border)
    [(0, 50), (75, 50), (75, 260), (0, 260)],
    # West embankment South (staging border)
    [(0, 520), (75, 520), (75, 725), (0, 725)],
    # North-west bio-sludge containment vat island
    [(290, 110), (410, 110), (410, 240), (290, 240)],
    # South-west bio-sludge containment vat island
    [(290, 530), (410, 530), (410, 660), (290, 660)],
    # Central marshland barrier island (divides central corridor & flanks)
    [(510, 290), (620, 290), (620, 470), (510, 470)],
    # North-east bio-hazard research bunker
    [(730, 90), (810, 90), (810, 230), (730, 230)],
    # South-east bio-hazard containment bunker
    [(730, 540), (810, 540), (810, 680), (730, 680)],
    # Far east containment filtration wall
    [(890, 260), (950, 260), (950, 510), (890, 510)]
]

mask = Image.new('1', (1024, 768), 0)
md = ImageDraw.Draw(mask)
for points in polygons:
    md.polygon(points, fill=1)
    p = [(x // 2, y // 2) for x, y in points]
    d.polygon(p, fill=(34, 42, 32))
    
    # Layered bio-containment steel & moss shading
    cx = sum(x for x, y in p) / len(p)
    cy = sum(y for x, y in p) / len(p)
    for scale, color in [(0.92, (44, 54, 40)), (0.78, (58, 70, 52)), (0.60, (74, 88, 66))]:
        d.polygon([(int(cx + (x - cx) * scale), int(cy + (y - cy) * scale)) for x, y in p], fill=color)

# Texture noise on obstacles
small_mask = mask.resize((512, 384), Image.Resampling.NEAREST)
for _ in range(3500):
    x, y = rng.randrange(512), rng.randrange(384)
    if small_mask.getpixel((x, y)):
        d.line((x, y, x + rng.randrange(1, 4), y), fill=rng.choice([(26, 32, 24), (40, 48, 36), (56, 68, 50), (72, 86, 64)]))

# HUD top strip
d.rectangle((0, 0, 511, 15), fill=(20, 26, 18))

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
    'terminals': [[845, 170], [845, 600]],
    'nests': [[450, 170], [670, 170], [450, 600], [670, 600]]
}
(out / 'geometry.json').write_text(json.dumps(geometry, indent=2), encoding='utf8')

metadata = {
    'id': 'toxic-marsh',
    'name': 'Toxic Marsh',
    'width': 1024,
    'height': 768,
    'image': 'assets/custom/toxic-marsh/terrain.png',
    'mask': base64.b64encode(bits).decode(),
    'provenance': 'Authored deterministic toxic marsh containment terrain, seed 90909, no recovered pixels.'
}

js_content = "'use strict';\nwindow.TriumphTerrains=Object.freeze({...window.TriumphTerrains,'toxic-marsh':" + json.dumps(metadata, separators=(',', ':')) + "});\n"
(out / 'terrain.js').write_text(js_content, encoding='utf8')

print('Authored Toxic Marsh terrain, collision and JS payload.')
