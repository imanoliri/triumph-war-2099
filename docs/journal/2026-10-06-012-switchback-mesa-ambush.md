# 2026-10-06 / 012 — switchback-mesa-ambush

- Task: [switchback-mesa-ambush](../tasks/switchback-mesa-ambush.md)
- Date: 2026-10-06 (Europe/Berlin); session 012 across all features that day
- Branch: `feature/switchback-mesa-ambush`
- Starting commit: `6cc1e550f3a7a6df4600b8f78aa25142bea57d00`
- Status: complete

## Starting context

Read task `docs/tasks/switchback-mesa-ambush.md` and `docs/design/relay-breaker-maps/proposals.json`. Proposal C (Switchback Mesa) specifies a staged approach with elevation-choked northern switchbacks and a long southern bypass.

## Work performed

- Created deterministic pixel art builder `tools/build-switchback-mesa.py` generating `assets/custom/switchback-mesa/terrain.png`, `collision.png`, and `terrain.js` with packed 1024x768 mask.
- Registered `custom-rocks-switchback-mesa` variant in `src/custom-missions.js` and added option to `#mission` dropdown in `index.html`.
- Updated test sandbox `tools/check-recreation.cjs` to include `assets/custom/switchback-mesa/terrain.js`.
- Created dedicated verification check `tools/check-switchback-mesa.cjs` validating exact 27 object placements, 18px clearance, three wide routes, relay LOS/orders, squad circuits, timed carrier drops/rally, and bypass tank turns across all 5 difficulty settings.
- Added `check-switchback-mesa.cjs` to `tools/dev.cjs test`.

## Chronological log

- Authored `tools/build-switchback-mesa.py` and compiled terrain mask.
- Integrated map option in `src/custom-missions.js` and `index.html`.
- Added test fixtures and ran `node tools/check-switchback-mesa.cjs` and `node tools/dev.cjs test`.
- All 28 test suites passed cleanly.

## Verification

| Check | Result | Evidence |
| --- | --- | --- |
| Automated checks | passed | `node tools/check-switchback-mesa.cjs` passed; full suite `node tools/dev.cjs test` passed 28/28 checks |
| Live browser playtest | pending | Browser access unavailable in automated worker test env |

## Unresolved issues and risks

None.

## Next action / handoff

Branch ready for Director Review and squash-merge into `main`.
