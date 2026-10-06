# District Twelve authored capital

TRI-053 Crown local Metropolitan Guard mission. Entire terrain is deterministic Pillow artwork, seed 53053, from tools/build-district-twelve.py. No original pixels, model-generated input or installed-game reads. Runtime sprite authorship remains Anthony Lopes / DarkSun Games; actors are never baked into terrain.

World 1024x768, top-left origin. geometry.json freezes selected clear streets, west connected guard rooms, sheltered vertical circuit, east plaza and two transit approaches. Dark building masses/wall strips are blocked; rails, crosswalks, relief floor markings and plaza paving are walkable paint. Static locker/planter/bench details stay on already blocked envelopes. No rooftop layer or destructible/environmental objects.

Rebuild with Pillow-capable Python: `python tools/build-district-twelve.py`; export runtime hotspot/profile contract with `node tools/export-district-contract.cjs`; validate with `node tools/check-district-twelve.cjs`. collision.png uses black clear / white blocked; terrain.js has the existing row-major LSB-first mask. geometry-overlay.png is reference-only. manifest.json hashes collision/mask/terrain and links provenance/reference catalogs. runtime-contract.json records all five exact actor/source/support profiles for overlays and review. Source geometry and runtime placements change together only within an approved gameplay ticket.

VM evidence proves physical routes, terminals, finite cap-retained births/waves, actual carrier unloads and scheduled aircraft commandos. Browser observation and skilled-player calibration remain distinct in the playtest/session records.
