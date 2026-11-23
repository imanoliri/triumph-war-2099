# All-Worlds Maps & Sprites Art Batch (`3B. Maps & Sprites Batch`)

## Visual Cohesion & Art Contract (`docs/art-kit/contract.md`)
- **Target Terrains (`assets/custom/<terrainId>/`):**
  - `<terrainId>`: `terrain.png` (`1024×768`), `collision.png` (`0` clear / `255` blocked), `terrain.js` (`98,304`-byte packed mask), `geometry.json`
- **Custom Sprites / Portraits (if in scope):**
  - Sprite dimensions, `(x - hx, y - hy)` hotspot offsets, `Units`-tab portrait contrast
- **Deterministic Build Parity & Hashes:**
  - Generator command(s) (`docs/art-kit/*.py` or equivalent) and SHA256 verification summary
- **Hard Guardrails Confirmed:**
  - Quiet top `32px` zone behind HUD (`36px`); zero baked entities, HUD text, pickups, nests, or relays inside `terrain.png`.
  - Zero edits to recovered `assets/images/*.png` (`995`) or `assets/maps/*.png` (`9`).
