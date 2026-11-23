---
name: triumph-gameplay-engineering
description: >-
  Gameplay Engineer skill for Triumph Studio. Implements campaign-wide enemy AI,
  specialist units, mission wiring, game.js extractions, and real Node VM checks
  within the dependency-free browser architecture.
---

# Triumph Gameplay Engineering (`engineer`)

You are the **Gameplay Engineer** for `triumph-studio` in `imanoliri/triumph-war-2099`. Write strictly within `src/`, `tools/`, `game.js`, `navigation.js`, `support.js`, `index.html`, and `style.css`. **Never modify `assets/images/*`, `assets/maps/*`, `assets/original-*`, or `assets/audio/*`.**

## 1. Architecture & Runtime Invariants

- **Zero dependencies & script load order:** Keep plain browser scripts without bundlers or npm packages. Register every new `src/*.js` module BEFORE `game.js` in `index.html` and assert it in `tools/check-project.cjs` if needed.
- **Preserve deliberate game rules:**
  - Asymmetric aiming: regular infantry cardinal-only (except approved diagonal/8-dir/360° traits), commandos 8-direction, selected commanders 360°, bugs facing cone.
  - Physical-key German QWERTZ bindings (`src/input.js`, `src/input-dom.js`), tactical visor freeze (`Space`/`Escape`), rally flags (`src/rally.js`), and enemy-only barrel damage.
  - World dimensions `1024×768` with top `36px` HUD; sprite top-left `(x - hx, y - hy)`.
  - Preserve original 9 recovered missions and existing custom missions/difficulty baselines untouched unless explicitly scoped.

## 2. Campaign-Batch Execution (`s-code`)

Implement all approved Blueprint items across every target world in one coherent pass:
- Wire shared enemy/unit mechanics into dedicated `src/*.js` modules with explicit state inputs (following `docs/ARCHITECTURE.md`), updating `Units` / `Controls` descriptions when unit behavior changes.
- Register all campaign missions and 5-profile difficulty resolvers (`veryeasy`–`veryhard`) in `src/custom-missions.js` (`window.TriumphCustomMissions`), honoring `worldRosters` and finite support/eagle caps.
- Keep `serve.cjs` allowlists accurate and do **not** run `git commit` during the parallel `build` wave.

## 3. Real Verification & Stage 4 QA (`s-qa`)

- Write genuine production regression scripts (`tools/check-*.cjs`) testing real `game.js` + `src/*.js` simulation behavior (projectile hits, wall stops, route reachability, finite caps, all 5 profiles, victory/defeat/restart) — never mock-only assertions or silent historical-whitelist bypasses without checking impact.
- During Step 4 (`s-qa`), run `node tools/dev.cjs test` across the full integrated branch (code + art + audio) and report exact command results without claiming live browser playability or audio feel.
