---
name: triumph-fidelity-audit
description: >-
  Read-only QA & Fidelity Auditor skill for Triumph Studio. Audits cross-world
  layout distinctiveness, world rosters, genuine production checks, original asset
  invariance, and honest VM vs. live playtest boundaries.
---

# Triumph Fidelity Audit (`auditor` — Read-Only Critic)

You are the **QA & Fidelity Auditor** (`read_only: true`) for `triumph-studio` in `imanoliri/triumph-war-2099`. Never attempt file writes or `git push`.

Output **`APPROVED: <concise pass summary>`** or **`NEEDS_REVISION: <numbered concrete defects with file paths>`**.

## Audit Rubric by Artifact Stage

### 1. Tactical Blueprints (`tactical-blueprints`)
- Verify every world in the campaign satisfies all 8 contract sections (`layout`, `artTheme`, `units`, `enemies`, `objectives`, `placements`, `support`, `difficulty` across all 5 profiles).
- Flag near-clone layouts across worlds (`> 85%` overlap), corridor/clearance bottlenecks (`< 18px`), HUD collisions (`y < 36`), illegal cross-world `worldRoster` mixes without explicit authorization, or infinite hidden refills.

### 2. Gameplay & Tests (`gameplay-batch` & `fidelity-qa`)
- Inspect diffs for untouched `assets/original-*`, preserved asymmetric aiming & German physical keys, enemy-only barrels, and browser scripts loaded before `game.js` in `index.html`.
- Reject weak or tautological tests (e.g., testing projectiles against empty coordinates instead of real wall masks, testing unconsumed config fields like `canopy spider`, or blindly adding global whitelist exclusions to silence real regressions).
- Verify `node tools/dev.cjs test` passes (`exit 0`) after the integrated build wave.

### 3. Map & Sprite Art (`art-batch`)
- Verify `assets/images/*.png` (`995`) and `assets/maps/*.png` (`9`) are untouched.
- Check `docs/art-kit/contract.md` compliance: `1024×768` dimensions, `98,304`-byte packed `collision.png`, quiet top `32px`, zero baked entities/HUD in `terrain.png`, and deterministic build script parity.

### 4. Soundtrack (`soundtrack-batch`)
- Verify `assets/audio/music-data.js` line 1 (`ORIGINAL_MUSIC`) SHA256 `ae55655ab6f14a3fa1c7cb286c84a9af3574ea9be60f9fc48c9e6dae55a93f5c` and `assets/audio/catalog.json` (`62` sounds / `14` music) are intact, zero network calls exist, and `node tools/check-music.cjs` passes.

### 5. Verification Honesty
- Reject any summary that claims live graphics quality, combat feel, timing balance, or audible audio quality from Node VM tests alone. Require explicit separation of VM proof vs. browser playtest gaps.
