# 2026-10-07 / 001 — attack-move-guard-leash

- Task: [attack-move-guard-leash](../tasks/attack-move-guard-leash.md)
- Date: 2026-10-07 (Europe/Berlin); session 001 across all features that day
- Branch: `feature/attack-move-guard-leash`
- Starting commit: `a8353b61f70a62d0422a3fbfa13f80fc78a7e8fa`
- Status: complete (ready for review)

## Starting context

Read AGENTS.md, docs/WORKER.md, docs/tasks/attack-move-guard-leash.md and latest session handoff.
Implemented proactive attack-move guard stance with local engagement leash for human units:
1. Reaching attack-move destination (`dist(u, goal) <= 12`) transitions soldiers into proactive order 3 guard stance with anchor position saved (`u.anchor = {x: u.x, y: u.y}`).
2. Guard stance soldiers perceive nearby targets (~245px range) and step out up to `guardLeashRadius` (50px) from `u.anchor` to angle a legal cardinal/diagonal firing lane.
3. Once clear of hostiles (`!target`), guard soldiers return/leash back to their arrival anchor position.

## Work performed

- Added `guardLeashRadius: 50` in `src/balance.js` under `window.TriumphBalance`.
- Updated `aimHuman` in `src/combat.js` to allow units in `u.order === 3` to step out up to `guardLeashRadius` (50px) from `u.anchor` to angle a legal firing lane when targets are offset or obstructed.
- Updated main loop in `game.js` so `u.order === 3` guard soldiers pass non-zero `dt` to `aimHuman` when targets are in range, and leash back to `u.anchor` when clear of hostiles (`!target`) or if pushed beyond the leash radius.
- Added comprehensive regression unit tests in `tools/check-recreation.cjs` covering:
  - Transition to order 3 guard stance and anchor assignment upon attack-move arrival (`dist <= 12`).
  - Proactive step-out within 50px leash radius to align legal firing lane and fire at offset targets.
  - Return to arrival anchor position once target is clear (`!target`).
  - Strict leash radius cap preventing guard movement beyond 50px from anchor.

## Chronological log

- Executed baseline tests `node tools/dev.cjs test`.
- Implemented proactive guard leash in `src/balance.js`, `src/combat.js`, and `game.js`.
- Updated `tools/check-recreation.cjs` with TRI-063 unit tests.
- Ran full test suite `node tools/dev.cjs test` and verified all automated checks pass.

## Verification

| Check | Result | Evidence |
| --- | --- | --- |
| Automated checks | passed | `node tools/dev.cjs test` passed all check scripts including `tools/check-recreation.cjs` TRI-063 tests. |
| Live browser playtest | pending | Interactive browser access unavailable in VM execution context. |

## Unresolved issues and risks

- None. All acceptance criteria met and automated test suite passes.

## Next action / handoff

- Report Review readiness to director with checkout `C:\Users\user\Documents\Codex\2026-10-03\he\outputs\triumph-attack-move-guard-leash`, branch `feature/attack-move-guard-leash`, git commit SHA, test results, limitations, and summary.
