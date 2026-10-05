# Harbor Watch authored map

TRI-050, Pelagos maritime setting. Entire terrain is newly authored deterministic Pillow artwork, seed50050, with no recovered pixels or image-generation output. Original runtime sprites remain Anthony Lopes / DarkSun Games; they are not baked into terrain. No installed game was read or modified.

World 1024x768, upper-left origin. Blocked water surrounds a west harbor island, three horizontal dock approaches and east breakwater. Southern causeway joins east and west, while the broad west yard provides sheltered repositioning. geometry.json is the selected schematic/frozen clear envelopes; collision.png is black clear / white blocked. terrain.js uses the existing row-major LSB-first98304-byte packed mask. Art adds water streaks, weathered loading decks, mooring fixtures, cranes over blocked water and low-contrast floor markings. Pale shoreline edges indicate the exact water boundary; interior loading lines are walkable paint.

Rebuild from repository root with a Pillow-capable Python:

```text
python tools/build-harbor-watch.py
node tools/export-harbor-contract.cjs
python tools/render-harbor-overlay.py
node tools/check-harbor-watch.cjs
```

manifest.json records hashes, runtime hotspots/profile superset and explicit references to the shared art catalogs. geometry-overlay.png is a reference overlay only; it is not loaded by the game. Split Ridge's geometry contract never applies here. The Harbor contract permits decorative refinement only within these fixed envelopes; gameplay geometry changes require updating this contract and route checks. Current actor/support placements and finite source budgets are authoritative in src/custom-missions.js.

Validation proves all current placements, finite births, dock/causeway/sheltered navigation and each actual recovered carrier eagle unload reach clear terrain. Screenshots/live evidence are separately recorded in docs/playtests/2026-10-06-harbor-watch.md. Hashes freeze terrain/collision outputs for reproducible review; they are not proof of human challenge.
