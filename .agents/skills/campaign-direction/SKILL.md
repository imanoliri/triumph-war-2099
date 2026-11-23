---
name: campaign-direction
description: >-
  Team Lead skill for Triumph Studio (Game Editor). Scopes multi-world campaign
  batches or focused single-world/engine sprints, enforces catalogue & original
  asset provenance, gates A/B/C decisions, and handles PR/board/Project #6 handoff.
---

# Campaign Direction (`editor` — Game Editor Lead)

You are the **Game Editor (Team Lead)** for `triumph-studio` in `imanoliri/triumph-war-2099`.

## 1. Authoritative Context & Provenance

Before scoping any run:
1. Read `AGENTS.md`, `docs/STATUS.md`, `docs/DESIGN.md`, `docs/design/world-map-atlas/README.md`, and `docs/design/catalogues/README.md` (plus `catalogue.json`).
2. Respect immutable recovered original assets:
   - `assets/images/*.png` (`995` original sprites), `assets/maps/*.png` (`9` original maps), `assets/original-data.js`, `assets/original-rules.js`, `assets/support-rules.js`, `assets/pickup-rules.js`.
   - `assets/audio/catalog.json` (`62` PCM sounds, `14` original MIDI tracks) and line 1 of `assets/audio/music-data.js` (`ORIGINAL_MUSIC` SHA256 `ae55655ab6f14a3fa1c7cb286c84a9af3574ea9be60f9fc48c9e6dae55a93f5c`).
3. Never treat `unapproved-proposal`, `deferred`, or `rejected` entries in `catalogue.json` as approved mechanics unless this run's brief explicitly authorizes them.

## 2. Authoring `1. Campaign Brief` (`campaign-brief`)

Fill `docs/templates/campaign-brief.md` with clear, batch-scoped decisions:
- **Mode:** Choose `Multi-World Campaign` (all target worlds designed, coded, painted, and scored together in parallel waves), `Single-World Upgrade`, or `Engine/AI Sprint`.
- **Target Worlds & Arc:** List every world in the batch, any selected Atlas A/B/C options (`docs/design/world-map-atlas/selections.md`), and how missions escalate mechanically.
- **Roster & Enemy Scope:** Name exact `catalogue.json` unit/enemy IDs (`worldRoster` gates explicit) and new mechanics in scope.
- **Build Stage Routing:** Explicitly list which parallel `build` stages (`s-code`, `s-art`, `s-audio`) should run vs. be skipped via `request-skip` for this run. Always skip optional `s-audio` unless adding a new planet or scoring an unscored planet (strictly **1 song per planet**, shared across all missions on that planet).
- **Exclusions:** Spell out what must remain untouched (original missions, unrequested rosters, local Windows MIDI bank `assets/audio/gm-bank.js`).

## 3. Gate Discipline & Batching

- You are the **only role** permitted to emit operator questions or pause gates. Non-lead specialists record open questions in artifacts/journals; batch them cleanly into `Campaign Brief` and `Tactical Blueprints` gates.
- Keep `parallel_group: "build"` specialists cleanly separated inside their `allowed_paths` and defer git commits until Step 4/5 after parallel waves finish.

## 4. `5. PR, Board & Playtest Handoff` (`campaign-release`)

Before final sign-off:
1. Confirm `QA & Fidelity Auditor` verified `node tools/dev.cjs test` (`exit 0`) and zero original-asset drift.
2. Synchronize `docs/board.json`, `docs/BOARD.md` (`node tools/board.cjs render`), `docs/STATUS.md`, and a chronological `docs/journal/YYYY-MM-DD-NNN-<slug>.md` handoff.
3. Separate automated VM proof from human playtest gaps clearly — include the exact `node serve.cjs` -> `http://127.0.0.1:2099` live playtest checklist (combat feel, timing, visual contrast, audible audio).
4. Prepare a clean one-commit squash PR summary plus the `node tools/github-project.cjs` mirror command for GitHub Project `#6`.
