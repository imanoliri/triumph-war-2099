# 2026-10-08 / 014 — mercenary-frontier-mission

- Task: [mercenary-frontier-mission](../tasks/mercenary-frontier-mission.md)
- Date: 2026-10-08 (Europe/Berlin); session 014 across all features that day
- Branch: `feature/mercenary-frontier-mission`
- Starting commit: `045b16db173df1f4928081e00e34d356d3aa32a9`
- Status: complete

## Starting context

Read AGENTS.md, docs/WORKER.md, docs/tasks/mercenary-frontier-mission.md, and docs/journal/2026-10-08-014-mercenary-frontier-mission.md.
Ticket TRI-088 requires adding exactly one custom mission for the Mercenary Frontier planet/environment, integrating approved Mercenary specialists (Weapon Specialist and Bounty Hunter) into starting forces and world-only reinforcement menus across all 5 difficulty profiles, providing collision-safe routes, reachable objectives, legal placements, and finite sufficient support.

## Work performed

- **Authored Mercenary Outpost Terrain**:
  - Created `tools/build-mercenary-outpost.py` generating deterministic terrain map, collision mask, geometry JSON and JS payload at `assets/custom/mercenary-outpost/`.
  - Palette uses dusty frontier soil, rusted metal plating, scrap barricades, and yellow hazard trim. Seed 70707 ensures reproducibility.
- **Configured Custom Mission & Profiles**:
  - Added `custom-mercenary-outpost-strike` ("Mercenary Outpost Strike") in `src/custom-missions.js` with `environment: 'Mercenary'` and `worldRoster: worldRosters.Mercenary`.
  - Authored objectives: activate both comm/vault terminals (`outpost-comm-alpha` and `outpost-vault-beta`), destroy all four alien nests, and clear all remaining forces.
  - Defined 5 difficulty profiles (`veryeasy`, `easy`, `normal`, `hard`, `veryhard`) with starting forces featuring 1 Weapon Specialist and 1 Bounty Hunter across every profile (Very easy: 6 soldiers + 1 Specialist + 1 Hunter; Hard: 4 soldiers + 1 Specialist + 1 Hunter; Very hard: 2 soldiers + 1 Specialist + 1 Hunter).
  - Configured 4 nests with scaling birth intervals (7.0s, 6.0s, 4.5s, 2.6s, 2.0s) and finite wave budgets. Easy/Normal retain tank support; troop support and plasma available on all profiles.
- **Specialist & UI Integration**:
  - Integrated Mercenary roster (`soldier`, `weapon-specialist`, `bounty-hunter`, `commando`) into starting forces and world-only reinforcement dropdown menus for troop call-ins.
  - Added selector option and terrain script inclusion to `index.html`.
  - Updated `tools/check-recreation.cjs`, `tools/check-difficulty-profiles.cjs`, and `tools/check-mercenary-troopers.cjs` for registry length and custom baseline filtering.
- **Verification & Tooling**:
  - Created focused test tool `tools/check-mercenary-outpost.cjs` testing all 5 difficulty profiles, route travel, connected reachable positions, nest birth clearance, specialist integration, reinforcement menus, tactical freeze, victory, defeat, and restart.
  - Generated `docs/design/mercenary-outpost-pressure.json` via `--record` simulation.
  - Registered `check-mercenary-outpost.cjs` in `tools/dev.cjs`.

## Chronological log

- Read task documentation and existing codebase structure.
- Executed `py tools/build-mercenary-outpost.py` to generate `assets/custom/mercenary-outpost/` terrain assets.
- Added mission metadata, 5 difficulty profiles, and `resolve` logic in `src/custom-missions.js`.
- Updated `index.html`, `tools/check-recreation.cjs`, `tools/check-difficulty-profiles.cjs`, `tools/check-mercenary-troopers.cjs`, and `tools/dev.cjs`.
- Authored and executed `tools/check-mercenary-outpost.cjs --record`.
- Executed `node tools/check-mercenary-troopers.cjs`.
- Executed `node tools/dev.cjs test` to run full test suite.

## Verification

| Check | Result | Evidence |
| --- | --- | --- |
| `node tools/check-mercenary-outpost.cjs --record` | PASS | All 5 profiles, routes, objectives, specialist integration, victory/defeat/restart passed; recorded `docs/design/mercenary-outpost-pressure.json` |
| `node tools/check-mercenary-troopers.cjs` | PASS | Specialist modes, tracking reset, UI, orders, factories/caps, and world isolation passed |
| `node tools/dev.cjs test` | PASS | Full test suite passed without failures |
| Live browser playtest | N/A | No live display/browser access available in headless environment |

## Unresolved issues and risks

- None. All acceptance criteria met and verified cleanly via automated test suite. Live browser rendering and playability unverified due to lack of interactive display access.

## Next action / handoff

Ticket TRI-088 is complete and ready for director Review. Scoped commit `37bad36953f0786bec8bd199622141982b9d5e90` on branch `feature/mercenary-frontier-mission` at `c:\Users\user\Documents\Codex\2026-10-03\he\outputs\triumph-mercenary-frontier-mission`. Ready for independent director review and squash integration.
