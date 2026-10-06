# 2026-10-06 / 013 — beneath-dunes-variant-b

- Task: [beneath-dunes-variant-b](../tasks/beneath-dunes-variant-b.md)
- Date: 2026-10-06 (Europe/Berlin); session 013 across all features that day
- Branch: `feature/beneath-dunes-variant-b`
- Starting commit: `33e6439598ab9bca69d0f8b65c0fdafa318d331d`
- Status: complete

## Starting context

Read AGENTS.md, docs/WORKER.md, docs/tasks/beneath-dunes-variant-b.md, and docs/planning/campaigns/maps/beneath-dunes/geometry.json. Goal was to implement Beneath the Dunes map proposal B (Broken Wells) as a subterranean cavern layout option with calibrated wave pressure.

## Work performed

- Created build tool `tools/build-beneath-dunes-variant-b.py` to generate Proposal B (Broken Wells) terrain image (`terrain.png`), collision mask (`collision.png`), and terrain registration script (`assets/custom/beneath-dunes-variant-b/terrain.js`).
- Defined `custom-desert-beneath-dunes-variant-b` (`dunesB`) in `src/custom-missions.js` with:
  - Base terrain ID `beneath-dunes-variant-b`.
  - Authored starting positions for commanders, crawlers, scouts, mechanics, dune-guards, and desert worms based on Proposal B geometry.
  - Authored 2 escort routes: western route (`[[470,165],[280,240],[280,610],[510,675]]`) and eastern route (`[[520,165],[520,100],[820,100],[820,630],[510,675]]`).
  - Extraction point at `[510, 675]`.
  - Authored troop support eagle caches at `[280, 420]` and `[820, 370]`.
  - Difficulty profiles for all 5 difficulties (veryeasy to veryhard).
- Added `custom-desert-beneath-dunes-variant-b` mission option (`Beneath the Dunes · Broken Wells`) and script tag to `index.html`.
- Updated `game.js` to allow custom mission starting positions for desert rider infantry (`m.scouts`, `m.mechanics`, `m.guardPoints`), defaulting to Proposal A coordinates if not supplied.
- Updated `tools/check-recreation.cjs` and `tools/check-custom-support.cjs` to include `assets/custom/beneath-dunes-variant-b/terrain.js` and validate support caches and desert worm/rider presence across all custom missions.
- Created dedicated verification check `tools/check-beneath-dunes-variant-b.cjs` testing route envelopes, 49px clearance, body footprints, mechanic repair, escort movement, extraction victory, stranded defeat, mine behavior, difficulty scaling, and mission isolation.
- Integrated `tools/check-beneath-dunes-variant-b.cjs` into `tools/dev.cjs test`.

## Chronological log

- Read task instructions and proposal B specs in `docs/planning/campaigns/maps/beneath-dunes/geometry.json`.
- Built proposal B terrain assets via `tools/build-beneath-dunes-variant-b.py`.
- Registered `custom-desert-beneath-dunes-variant-b` scenario in `src/custom-missions.js` and `index.html`.
- Updated `game.js` desert rider spawn logic for custom positions.
- Built dedicated check script `tools/check-beneath-dunes-variant-b.cjs` and passed all 5 difficulty profile assertions and route timing evidence.
- Registered new check in `tools/dev.cjs` and ran full suite via `node tools/dev.cjs test`.

## Verification

| Check | Result | Evidence |
| --- | --- | --- |
| Automated checks | passed | `node tools/dev.cjs test` ran all 29 test scripts clean. Route timing evidence: Route 1: 27.8s, Route 2: 56.8s across all 5 difficulties. |
| Live browser playtest | pending | Browser playtest unverified (no live browser context in VM fixture). |

## Unresolved issues and risks

- Live visual rendering and manual browser control unverified (VM automated tests only).

## Next action / handoff

Report completion to director for Review.
