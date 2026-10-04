# Split Ridge custom terrain

Original custom artwork authored for TRI-032. The recovered palette reference is
`assets/maps/7.png`, Desert Rocks by Anthony Lopes / DarkSun Games. Only color
values are referenced: no source pixels, actors, textures or silhouettes copied.
Accepted concept A supplies the three obstacle envelopes and exact 25 hotspots;
irregular rock outlines remain inside those envelopes. B/C concepts are untouched.

Rebuild only these custom assets using `tools/build-split-ridge.py` (Python/Pillow).
Seed 32032, 512×384 authoring grid scaled nearest-neighbor to 1024×768. Terrain and
mask use the same polygon/grid rasterization; a thin lit rim is decorative.
`collision.png` is the matching white-blocked/black-clear preview. `terrain.js`
packs the same pixels into the existing bit layout: y×1024+x, low bit first.
No dependency is added to serving or browser execution. The source nine map
files, original collision masks and installed game are never regenerated.

Desert Rocks remains the rules/support template. Source carrier/tank paths are
unchanged; tests exercise real timed unloading, rally assignment and physical
movement around the new mask, independently of concept route arrows.
