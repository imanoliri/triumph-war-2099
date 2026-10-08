"""Author Volcanic planet forge strike mission terrain. Pillow build tool; runtime remains dependency-free.

Generates assets/custom/volcanic-forge/ terrain.png, collision.png, geometry.json, terrain.js.
Palette reference: Dark basalt rock, glowing magma channels, industrial metal forge structures, thermal choke points.
"""
from pathlib import Path
import random, json, base64
from PIL import Image, ImageDraw

root = Path(__file__).resolve().parents[1]
out = root / 'assets/custom/volcanic-forge'
out.mkdir(parents=True, exist_ok=True)
rng = random.Random(80808)

# 512x384 authoring canvas, scaled 2x to 1024x768
im = Image.new('RGB', (512, 384), (32, 28, 24))
d = ImageDraw.Draw(im)

# Floor textures: basalt noise, ash, dark volcanic stone
rock_colors = [(26, 22, 20), (38, 32, 28), (48, 40, 34), (20, 18, 16), (56, 46, 38)]
for _ in range(22000):
    x, y = rng.randrange(512), rng.randrange(16, 384)
    d.line((x, y, x + rng.choice([0, 1, 2]), y), fill=rng.choice(rock_colors))

# Magma rivers / pools background noise and glow (in 512x384 space)
magma_colors = [(190, 45, 0), (220, 70, 0), (245, 110, 0), (255, 160, 20), (255, 200, 40)]

for _ in range(3000):
    x, y = rng.randrange(512), rng.randrange(16, 384)
    if (140 <= x <= 190 and 100 <= y <= 280) or (300 <= x <= 330 and 30 <= y <= 350):
        d.point((x, y), fill=rng.choice(magma_colors))

# Polygons for obstacle structures and lava rock formations (in 1024x768 space)
polygons = [
    # Top border basalt wall
    [(0, 0), (1024, 0), (1024, 50), (0, 50)],
    # Bottom border basalt wall
    [(0, 725), (1024, 725), (1024, 768), (0, 768)],
    # West outer basalt rock formations (North & South of staging)
    [(0, 50), (60, 50), (60, 250), (0, 250)],
    [(0, 530), (60, 530), (60, 725), (0, 725)],
    # North Basalt Chokepoint Wall
    [(240, 120), (370, 120), (370, 190), (240, 190)],
    # South Basalt Chokepoint Wall
    [(240, 570), (370, 570), (370, 640), (240, 640)],
    # Central Magma Forge Core (Island basalt block)
    [(460, 260), (600, 260), (620, 340), (600, 490), (460, 490), (440, 340)],
    # Northeast Thermal Chamber Pillar
    [(750, 100), (840, 100), (840, 260), (750, 260)],
    # Southeast Thermal Chamber Pillar
    [(750, 510), (840, 510), (840, 670), (750, 670)]
]

mask = Image.new('1', (1024, 768), 0)
md = ImageDraw.Draw(mask)
for points in polygons:
    md.polygon(points, fill=1)
    p = [(x // 2, y // 2) for x, y in points]
    d.polygon(p, fill=(45, 40, 48))
    
    # Layered industrial forge steel / basalt rock shading
    cx = sum(x for x, y in p) / len(p)
    cy = sum(y for x, y in p) / len(p)
    for scale, color in [(0.92, (35, 30, 38)), (0.78, (55, 50, 60)), (0.60, (75, 70, 82))]:
        d.polygon([(int(cx + (x - cx) * scale), int(cy + (y - cy) * scale)) for x, y in p], fill=color)

# Texture noise on obstacles
small_mask = mask.resize((512, 384), Image.Resampling.NEAREST)
for _ in range(3500):
    x, y = rng.randrange(512), rng.randrange(384)
    if small_mask.getpixel((x, y)):
        d.line((x, y, x + rng.randrange(1, 4), y), fill=rng.choice([(30, 26, 32), (50, 44, 54), (70, 62, 76), (90, 80, 96)]))

# HUD top strip
d.rectangle((0, 0, 511, 15), fill=(24, 20, 18))

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
    'hazards': [[420, 190], [520, 390], [420, 590]]
}
(out / 'geometry.json').write_text(json.dumps(geometry, indent=2), encoding='utf8')

metadata = {
    'id': 'volcanic-forge',
    'name': 'Volcanic Forge',
    'width': 1024,
    'height': 768,
    'image': 'assets/custom/volcanic-forge/terrain.png',
    'mask': base64.b64encode(bits).decode(),
    'provenance': 'Authored deterministic volcanic forge terrain, seed 80808, no recovered pixels.'
}

js_content = "'use strict';\nwindow.TriumphTerrains=Object.freeze({...window.TriumphTerrains,'volcanic-forge':" + json.dumps(metadata, separators=(',', ':')) + "});\n"
(out / 'terrain.js').write_text(js_content, encoding='utf8')

print('Authored Volcanic Forge terrain, collision and JS payload.')
