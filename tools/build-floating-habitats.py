"""Author Floating Habitats mission terrain. Pillow build tool; runtime remains dependency-free.

Generates assets/custom/floating-habitats/ terrain.png, collision.png, geometry.json, terrain.js.
Palette reference: High-altitude cloud sky slate/blue canvas, sky platform catwalks, golden skybridge accents, white/cyan habitat dome structures.
"""
from pathlib import Path
import random, json, base64
from PIL import Image, ImageDraw

root = Path(__file__).resolve().parents[1]
out = root / 'assets/custom/floating-habitats'
out.mkdir(parents=True, exist_ok=True)
rng = random.Random(70707)

# 512x384 authoring canvas, scaled 2x to 1024x768
im = Image.new('RGB', (512, 384), (26, 38, 52))
d = ImageDraw.Draw(im)

# Floor textures: atmospheric cloud slate, sky haze noise, high-altitude platform texture
sky_colors = [(22, 32, 45), (32, 46, 62), (42, 60, 80), (55, 76, 100), (70, 94, 120), (28, 40, 56)]
for _ in range(22000):
    x, y = rng.randrange(512), rng.randrange(16, 384)
    d.line((x, y, x + rng.choice([0, 1, 2]), y), fill=rng.choice(sky_colors))

# Cloud mist highlights and high-altitude sunlight / energy beacon glow (in 512x384 space)
cloud_colors = [(90, 120, 150), (120, 150, 185), (150, 185, 215), (180, 215, 240), (220, 200, 140)]
for _ in range(2800):
    x, y = rng.randrange(512), rng.randrange(16, 384)
    if (130 <= x <= 200 and 55 <= y <= 130) or (250 <= x <= 310 and 135 <= y <= 235) or (410 <= x <= 480 and 45 <= y <= 340):
        d.point((x, y), fill=rng.choice(cloud_colors))

# UNIQUE polygon layout for Floating Habitats (Sky Platforms, Cloud Deck Barriers, Skybridge Gaps) (in 1024x768 space)
polygons = [
    # Top sky atmosphere border railing
    [(0, 0), (1024, 0), (1024, 45), (0, 45)],
    # Bottom sky atmosphere border railing
    [(0, 725), (1024, 725), (1024, 768), (0, 768)],
    # West staging skybridge border North
    [(0, 45), (75, 45), (75, 250), (0, 250)],
    # West staging skybridge border South
    [(0, 530), (75, 530), (75, 725), (0, 725)],
    # NW Vertical Floating Habitat Module (West side barrier)
    [(240, 100), (340, 100), (340, 280), (240, 280)],
    # SW Vertical Floating Habitat Module
    [(240, 480), (340, 480), (340, 660), (240, 660)],
    # Central Skybridge Gap Wall (Tall vertical central sky barrier forcing N/S loops)
    [(400, 220), (480, 220), (480, 540), (400, 540)],
    # NE Cloud Deck Barrier Block
    [(740, 100), (840, 100), (840, 240), (740, 240)],
    # SE Cloud Deck Barrier Block
    [(740, 520), (840, 520), (840, 660), (740, 660)],
    # Far East Altitude Control Hub (Island station block)
    [(860, 270), (960, 270), (960, 490), (860, 490)]
]

mask = Image.new('1', (1024, 768), 0)
md = ImageDraw.Draw(mask)
for points in polygons:
    md.polygon(points, fill=1)
    p = [(x // 2, y // 2) for x, y in points]
    d.polygon(p, fill=(45, 58, 75))
    
    # Layered sky platform metallic girders & habitat dome/trim shading
    cx = sum(x for x, y in p) / len(p)
    cy = sum(y for x, y in p) / len(p)
    for scale, color in [(0.92, (38, 48, 64)), (0.78, (65, 82, 105)), (0.60, (95, 118, 145))]:
        d.polygon([(int(cx + (x - cx) * scale), int(cy + (y - cy) * scale)) for x, y in p], fill=color)

# Texture noise on obstacles
small_mask = mask.resize((512, 384), Image.Resampling.NEAREST)
for _ in range(3500):
    x, y = rng.randrange(512), rng.randrange(384)
    if small_mask.getpixel((x, y)):
        d.line((x, y, x + rng.randrange(1, 4), y), fill=rng.choice([(32, 42, 56), (54, 70, 92), (80, 102, 130), (110, 135, 168)]))

# HUD top strip
d.rectangle((0, 0, 511, 15), fill=(18, 26, 36))

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
    'terminals': [[850, 170], [850, 590]],
    'nests': [[450, 170], [670, 170], [450, 600], [670, 600]]
}
(out / 'geometry.json').write_text(json.dumps(geometry, indent=2), encoding='utf8')

metadata = {
    'id': 'floating-habitats',
    'name': 'Floating Habitats',
    'width': 1024,
    'height': 768,
    'image': 'assets/custom/floating-habitats/terrain.png',
    'mask': base64.b64encode(bits).decode(),
    'provenance': 'Authored deterministic floating habitats cloud station terrain, seed 70707, no recovered pixels.'
}

js_content = "'use strict';\nwindow.TriumphTerrains=Object.freeze({...window.TriumphTerrains,'floating-habitats':" + json.dumps(metadata, separators=(',', ':')) + "});\n"
(out / 'terrain.js').write_text(js_content, encoding='utf8')

print('Authored Floating Habitats terrain, collision and JS payload.')
