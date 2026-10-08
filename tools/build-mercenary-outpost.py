"""Author Mercenary planet frontier outpost mission terrain. Pillow build tool; runtime remains dependency-free.

Generates assets/custom/mercenary-outpost/ terrain.png, collision.png, geometry.json, terrain.js.
Palette reference: Dusty frontier soil, rusted metal plating, scrap barricades, yellow hazard trim.
"""
from pathlib import Path
import random, json, base64
from PIL import Image, ImageDraw

root = Path(__file__).resolve().parents[1]
out = root / 'assets/custom/mercenary-outpost'
out.mkdir(parents=True, exist_ok=True)
rng = random.Random(70707)

# 512x384 authoring canvas, scaled 2x to 1024x768
im = Image.new('RGB', (512, 384), (36, 30, 24))
d = ImageDraw.Draw(im)

# Floor textures: frontier dirt/rust metal noise, dark steel, sand accents
frontier_colors = [(32, 26, 20), (44, 36, 28), (54, 44, 34), (28, 22, 18), (62, 48, 36)]
for _ in range(22000):
    x, y = rng.randrange(512), rng.randrange(16, 384)
    d.line((x, y, x + rng.choice([0, 1, 2]), y), fill=rng.choice(frontier_colors))

# Orange/rust hazard lines and copper metal trim (in 512x384 space)
hazard_colors = [(200, 100, 20), (220, 130, 30), (240, 160, 40), (180, 80, 20)]
for _ in range(2500):
    x, y = rng.randrange(512), rng.randrange(16, 384)
    if (140 <= x <= 190 and 100 <= y <= 280) or (300 <= x <= 330 and 30 <= y <= 350):
        d.point((x, y), fill=rng.choice(hazard_colors))

# Polygons for obstacle structures and scrap metal barricades (in 1024x768 space)
polygons = [
    # Top border wall
    [(0, 0), (1024, 0), (1024, 50), (0, 50)],
    # Bottom border wall
    [(0, 725), (1024, 725), (1024, 768), (0, 768)],
    # West outer scrap barricades (North & South of staging)
    [(0, 50), (60, 50), (60, 250), (0, 250)],
    [(0, 530), (60, 530), (60, 725), (0, 725)],
    # North Outpost Bunker
    [(260, 100), (360, 100), (360, 170), (260, 170)],
    # South Outpost Bunker
    [(260, 500), (360, 500), (360, 570), (260, 570)],
    # Central Watchtower / Command Post (Island block)
    [(480, 280), (620, 280), (620, 480), (480, 480)],
    # Northeast Storage Depot
    [(780, 230), (880, 230), (880, 310), (780, 310)],
    # Southeast Fuel Vault
    [(780, 430), (880, 430), (880, 510), (780, 510)]
]

mask = Image.new('1', (1024, 768), 0)
md = ImageDraw.Draw(mask)
for points in polygons:
    md.polygon(points, fill=1)
    p = [(x // 2, y // 2) for x, y in points]
    d.polygon(p, fill=(48, 40, 32))
    
    # Layered steel plate & rust metal shading
    cx = sum(x for x, y in p) / len(p)
    cy = sum(y for x, y in p) / len(p)
    for scale, color in [(0.92, (38, 32, 26)), (0.78, (58, 48, 38)), (0.60, (78, 64, 50))]:
        d.polygon([(int(cx + (x - cx) * scale), int(cy + (y - cy) * scale)) for x, y in p], fill=color)

# Texture noise on obstacles
small_mask = mask.resize((512, 384), Image.Resampling.NEAREST)
for _ in range(3500):
    x, y = rng.randrange(512), rng.randrange(384)
    if small_mask.getpixel((x, y)):
        d.line((x, y, x + rng.randrange(1, 4), y), fill=rng.choice([(34, 28, 22), (54, 44, 34), (74, 60, 46), (94, 76, 58)]))

# HUD top strip
d.rectangle((0, 0, 511, 15), fill=(24, 20, 16))

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
    'terminals': [[845, 190], [845, 580]],
    'nests': [[450, 160], [720, 180], [450, 600], [720, 580]]
}
(out / 'geometry.json').write_text(json.dumps(geometry, indent=2), encoding='utf8')

metadata = {
    'id': 'mercenary-outpost',
    'name': 'Mercenary Outpost',
    'width': 1024,
    'height': 768,
    'image': 'assets/custom/mercenary-outpost/terrain.png',
    'mask': base64.b64encode(bits).decode(),
    'provenance': 'Authored deterministic mercenary frontier outpost terrain, seed 70707, no recovered pixels.'
}

js_content = "'use strict';\nwindow.TriumphTerrains=Object.freeze({...window.TriumphTerrains,'mercenary-outpost':" + json.dumps(metadata, separators=(',', ':')) + "});\n"
(out / 'terrain.js').write_text(js_content, encoding='utf8')

print('Authored Mercenary Outpost terrain, collision and JS payload.')
