"""Author Undercity planet tunnels breach mission terrain. Pillow build tool; runtime remains dependency-free.

Generates assets/custom/undercity-tunnels/ terrain.png, collision.png, geometry.json, terrain.js.
Palette reference: Dark subterranean tunnel slate, damp masonry, rusted iron girders, green sludge accents.
"""
from pathlib import Path
import random, json, base64
from PIL import Image, ImageDraw

root = Path(__file__).resolve().parents[1]
out = root / 'assets/custom/undercity-tunnels'
out.mkdir(parents=True, exist_ok=True)
rng = random.Random(70707)

# 512x384 authoring canvas, scaled 2x to 1024x768
im = Image.new('RGB', (512, 384), (28, 30, 34))
d = ImageDraw.Draw(im)

# Floor textures: damp slate stone noise, dark masonry, sludge spots
floor_colors = [(22, 24, 28), (32, 35, 40), (40, 44, 50), (18, 20, 24), (48, 52, 60)]
for _ in range(22000):
    x, y = rng.randrange(512), rng.randrange(16, 384)
    d.line((x, y, x + rng.choice([0, 1, 2]), y), fill=rng.choice(floor_colors))

# Subterranean sludge / fungal glow background noise
sludge_colors = [(20, 60, 30), (30, 90, 45), (40, 120, 60), (50, 140, 70)]
for _ in range(3000):
    x, y = rng.randrange(512), rng.randrange(16, 384)
    if (140 <= x <= 190 and 100 <= y <= 280) or (300 <= x <= 330 and 30 <= y <= 350):
        d.point((x, y), fill=rng.choice(sludge_colors))

# Polygons for obstacle structures and tunnel pillars (in 1024x768 space)
polygons = [
    # Top border masonry wall
    [(0, 0), (1024, 0), (1024, 50), (0, 50)],
    # Bottom border masonry wall
    [(0, 725), (1024, 725), (1024, 768), (0, 768)],
    # West outer tunnel walls (North & South of staging)
    [(0, 50), (60, 50), (60, 270), (0, 270)],
    [(0, 510), (60, 510), (60, 725), (0, 725)],
    # Central tunnel dividing pillars separating northern/southern passes
    [(310, 240), (370, 240), (370, 340), (310, 340)],
    [(310, 440), (370, 440), (370, 540), (310, 540)],
    # East tunnel vault pillars
    [(620, 100), (660, 100), (660, 260), (620, 260)],
    [(620, 510), (660, 510), (660, 670), (620, 670)],
    [(780, 270), (840, 270), (840, 500), (780, 500)]
]

mask = Image.new('1', (1024, 768), 0)
md = ImageDraw.Draw(mask)
for points in polygons:
    md.polygon(points, fill=1)
    p = [(x // 2, y // 2) for x, y in points]
    d.polygon(p, fill=(35, 38, 45))
    
    # Layered tunnel pillar slate & metal shading
    cx = sum(x for x, y in p) / len(p)
    cy = sum(y for x, y in p) / len(p)
    for scale, color in [(0.92, (28, 30, 36)), (0.78, (45, 48, 56)), (0.60, (60, 64, 75))]:
        d.polygon([(int(cx + (x - cx) * scale), int(cy + (y - cy) * scale)) for x, y in p], fill=color)

# Texture noise on obstacles
small_mask = mask.resize((512, 384), Image.Resampling.NEAREST)
for _ in range(3500):
    x, y = rng.randrange(512), rng.randrange(384)
    if small_mask.getpixel((x, y)):
        d.line((x, y, x + rng.randrange(1, 4), y), fill=rng.choice([(25, 28, 34), (42, 46, 54), (58, 62, 72), (75, 80, 92)]))

# HUD top strip
d.rectangle((0, 0, 511, 15), fill=(20, 22, 26))

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
    'nests': [[450, 160], [720, 180], [450, 600], [720, 580]],
    'vents': [[350, 180], [680, 200], [480, 600], [750, 560]],
    'extraction': [920, 384, 80]
}
(out / 'geometry.json').write_text(json.dumps(geometry, indent=2), encoding='utf8')

metadata = {
    'id': 'undercity-tunnels',
    'name': 'Undercity Tunnels',
    'width': 1024,
    'height': 768,
    'image': 'assets/custom/undercity-tunnels/terrain.png',
    'mask': base64.b64encode(bits).decode(),
    'provenance': 'Authored deterministic undercity tunnels terrain, seed 70707, no recovered pixels.'
}

js_content = "'use strict';\nwindow.TriumphTerrains=Object.freeze({...window.TriumphTerrains,'undercity-tunnels':" + json.dumps(metadata, separators=(',', ':')) + "});\n"
(out / 'terrain.js').write_text(js_content, encoding='utf8')

print('Authored Undercity Tunnels terrain, collision and JS payload.')
