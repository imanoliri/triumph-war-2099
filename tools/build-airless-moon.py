"""Author Airless Moon planet lunar outpost mission terrain. Pillow build tool; runtime remains dependency-free.

Generates assets/custom/airless-moon/ terrain.png, collision.png, geometry.json, terrain.js.
Palette reference: Dark space backdrop, lunar regolith grays, impact crater wall rims, white/silver lunar station domes & solar arrays.
"""
from pathlib import Path
import random, json, base64
from PIL import Image, ImageDraw

root = Path(__file__).resolve().parents[1]
out = root / 'assets/custom/airless-moon'
out.mkdir(parents=True, exist_ok=True)
rng = random.Random(80808)

# 512x384 authoring canvas, scaled 2x to 1024x768
im = Image.new('RGB', (512, 384), (24, 26, 32))
d = ImageDraw.Draw(im)

# Floor textures: lunar regolith noise, fine dust, impact dust motes
regolith_colors = [(18, 20, 26), (28, 31, 38), (38, 41, 50), (48, 52, 62), (60, 65, 76), (22, 25, 32)]
for _ in range(22000):
    x, y = rng.randrange(512), rng.randrange(16, 384)
    d.line((x, y, x + rng.choice([0, 1, 2]), y), fill=rng.choice(regolith_colors))

# Lunar dust highlights, crater rim dust lines, glowing lunar beacon accents (in 512x384 space)
dust_colors = [(80, 95, 115), (110, 125, 145), (140, 155, 180), (170, 190, 215)]
for _ in range(2500):
    x, y = rng.randrange(512), rng.randrange(16, 384)
    if (135 <= x <= 205 and 50 <= y <= 130) or (250 <= x <= 315 and 130 <= y <= 250) or (410 <= x <= 470 and 50 <= y <= 350):
        d.point((x, y), fill=rng.choice(dust_colors))

# UNIQUE polygon layout for Airless Moon (Lunar Crater Rims, Observatory Domes, Solar Arrays, Station Walls) (in 1024x768 space)
polygons = [
    # Top vacuum border wall
    [(0, 0), (1024, 0), (1024, 45), (0, 45)],
    # Bottom vacuum border wall
    [(0, 725), (1024, 725), (1024, 768), (0, 768)],
    # West staging embankment North
    [(0, 45), (75, 45), (75, 260), (0, 260)],
    # West staging embankment South
    [(0, 520), (75, 520), (75, 725), (0, 725)],
    # NW Lunar Observatory Octagonal Dome structure
    [(270, 120), (370, 120), (410, 160), (410, 220), (370, 260), (270, 260), (230, 220), (230, 160)],
    # SW Solar Power Substation Array
    [(260, 500), (390, 500), (390, 640), (260, 640)],
    # Central Lunar Crater Ridge Wall (divides central corridor)
    [(510, 280), (630, 280), (630, 480), (510, 480)],
    # NE Lunar Comm Vault Structure
    [(720, 120), (830, 120), (830, 250), (720, 250)],
    # SE Oxygen Generator Plant Structure
    [(720, 520), (830, 520), (830, 650), (720, 650)],
    # Far East Regolith Ridge Wall
    [(900, 260), (950, 260), (950, 500), (900, 500)]
]

mask = Image.new('1', (1024, 768), 0)
md = ImageDraw.Draw(mask)
for points in polygons:
    md.polygon(points, fill=1)
    p = [(x // 2, y // 2) for x, y in points]
    d.polygon(p, fill=(48, 52, 64))
    
    # Layered lunar regolith & station metallic dome/panel shading
    cx = sum(x for x, y in p) / len(p)
    cy = sum(y for x, y in p) / len(p)
    for scale, color in [(0.92, (38, 42, 54)), (0.78, (62, 68, 86)), (0.60, (90, 100, 122))]:
        d.polygon([(int(cx + (x - cx) * scale), int(cy + (y - cy) * scale)) for x, y in p], fill=color)

# Texture noise on obstacles
small_mask = mask.resize((512, 384), Image.Resampling.NEAREST)
for _ in range(3500):
    x, y = rng.randrange(512), rng.randrange(384)
    if small_mask.getpixel((x, y)):
        d.line((x, y, x + rng.randrange(1, 4), y), fill=rng.choice([(32, 36, 46), (54, 60, 74), (78, 86, 104), (102, 114, 136)]))

# HUD top strip
d.rectangle((0, 0, 511, 15), fill=(16, 18, 22))

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
    'terminals': [[850, 180], [850, 580]],
    'nests': [[450, 170], [670, 170], [450, 600], [670, 600]]
}
(out / 'geometry.json').write_text(json.dumps(geometry, indent=2), encoding='utf8')

metadata = {
    'id': 'airless-moon',
    'name': 'Airless Moon',
    'width': 1024,
    'height': 768,
    'image': 'assets/custom/airless-moon/terrain.png',
    'mask': base64.b64encode(bits).decode(),
    'provenance': 'Authored deterministic airless moon lunar outpost terrain, seed 80808, no recovered pixels.'
}

js_content = "'use strict';\nwindow.TriumphTerrains=Object.freeze({...window.TriumphTerrains,'airless-moon':" + json.dumps(metadata, separators=(',', ':')) + "});\n"
(out / 'terrain.js').write_text(js_content, encoding='utf8')

print('Authored Airless Moon terrain, collision and JS payload.')
