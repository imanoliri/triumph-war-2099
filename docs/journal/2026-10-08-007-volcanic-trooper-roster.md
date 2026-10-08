# 2026-10-08 / 007 — volcanic-trooper-roster

- Task: [volcanic-trooper-roster](../tasks/volcanic-trooper-roster.md)
- Date: 2026-10-08 (Europe/Berlin); session 007 across all features that day
- Branch: `feature/volcanic-trooper-roster`
- Checkout: `C:/Users/user/Documents/Codex/2026-10-03/he/outputs/triumph-volcanic-trooper-roster`
- Starting commit: `88c790a9acf3d64ef260df825fc98c56d65ff2e9`
- Status: Review candidate; implementation and checks complete

## Starting context

Read AGENTS, WORKER, task and prepared session007 before mutations; initial task/session were preparation's only dirty files. Director confirmed dispatch. No original research or recovered-asset generation. Existing Volcanic Forge mission has ordinary enemies, with no exceptional worm/vent phase conflict requiring a design question.

## Work performed

- Added explicit-state Volcanic module: finite charges, reachable placement order, .75 s planting, 1 s arming, inclusive 24 px enemy trigger, 48 px/3 damage blast; no direct terrain-wall/door/friendly/crystal damage. Existing barrel destruction/chain/fire adapter and enemy-only conventions retained. Planting cancels on replacement orders without consuming ammo. Dynamic blocked destination cannot finish planting. Planted charges persist independently of living planter.
- Cooling: approved 130 px cone, 1 s fire/2 s repressurization, 25% movement-only slow for 1.5 s, refresh not stack. Director accepted initial ordinary 1 damage/.18 s pulses and 45-degree total eight-direction cone. Ordinary enemy attacks/clocks continue. Terrain/closed doors/props block spray. No exceptional worm phase behavior introduced.
- Demolition backup rifle uses existing infantry defaults including 3–6 burst, .38 s rounds/.20 s Defend, .8–1.8 s rest and .2–.8 s setup. Fixed-kit weapon/cannon restrictions and shared orders preserved.
- Forge replaces first two existing soldier slots: Demolition(155,320), Cooling(155,355), every profile. Original headcounts8/8/8/6/4 infantry, objectives, enemy budgets, support caches and terrain/assets unchanged. Brief identifies replacements. Both Volcanic-only support menus/factories initialize finite kits and count them at actual ground/air/drop caps.
- Added Place charge button → ground click without new keys; right-click/Escape/button cancel armed placement, R switches to Rally, commander selection cancels it, mission replacement clears it. Tactical queues/freezes. Amber remaining pips/tooltip, planted charge state, cyan spray arcs, distinct rust/amber and teal/ice runtime/Units marks use recovered infantry52.
- Updated DESIGN, ARCHITECTURE, STATUS, Controls/Units, regression rosters/portrait expectations and full test runner.

## Chronological log

1. Director dispatched TRI-081 and corrected a stray prompt fragment: Cooling exact task cadence is 1 s fire/2 s repressurize; .18 s pulse/45-degree cone/rifle tuning and conservative first-two-slot replacements accepted as ordinary documented tuning.
2. Implemented production adapters and focused fixtures. Initial full suite failed an old Volcanic roster expectation; corrected expected list. Cone fixture revealed exact-edge density floating-point disagreement; scoped boundary tolerance to Cooling, leaving other spray density behavior unchanged.
3. Director early review required no empty effect arrays/placement fields on unrelated actors, blocked dynamic planting protection, and commander-selection placement cancellation. Applied guarded state changes and cancellation; actual handler fixtures cover Escape/R/button/right-click/commander/mission reset plus queued planting, movement and ammo preservation.
4. Director guide review found old expected portrait list. Expanded parity/cold-image/distinctness checks for both types; guide passed. Director independently reran Volcanic/Forge/input/menu/guide checks and inspected module/orders/control integration and browser evidence; reported passing checks.
5. First complete suite passed exit0. Final complete rerun also passed exit0, including offline87-ticket Project mirror at the end. Scoped numerical/guide checks passed after final edge/brief polish. Only this worker's temporary root edit scripts were removed.
6. Director called out an existing pre-ticket comma expression in the ordinary patrol branch. Added real-update Guard and Follow tests for both new types; Guard stays within50px over4s and Follow travels toward a distant leader despite a nearby enemy over1s. Passed; preexisting expression preserved, no broad refactor/balance change.
7. Browser UI spot check used actual mission selector and controls in background IAB. Visible IAB unavailable for subagent, but screenshots/native browser interactions available. Observed Army8, both marks and Units portraits/descriptions; actual select→Place→ground→resume planting changed remaining tooltip3→2. Separate [browser record](../playtests/2026-10-08-volcanic-troopers.md) and screenshot preserve its limited scope.

## Verification

| Check | Result | Evidence |
| --- | --- | --- |
| node tools/check-volcanic-troopers.cjs | passed | Inclusive cone/range/trigger/blast boundaries; cycle and movement-only refresh; terrain; finite charges/plant/arm/cancel/blocked path and changing ground; actual input handlers/update walking/plant; both actual support factories/caps; all-five headcounts and other-world/original isolation. |
| node tools/check-unit-guide.cjs | passed | Both distinct recovered52 portraits, exact runtime mark parity and cold image repaint. |
| node tools/dev.cjs test | passed exit0 (two complete runs) | Final output saved locally under ignored work/volcanic-final-test.log; syntax, original immutable combat/input/support/rendering, custom objectives/terrain, tools/director/Project checks included. |
| Live browser spot check | limited pass | [Separate record](../playtests/2026-10-08-volcanic-troopers.md): visible marks/Units/Army8 and actual queued placement3→2; screenshot saved. Full mission balance/audio/timing/hardware not verified. |
| Final-tip affected checks | passed | Volcanic and Units guide rerun after final real-loop assertions; immutable input four-sequence regression also passed exit0. |
| Staged diff whitespace | passed | git diff --cached --check includes new module/tests/evidence/journal; no whitespace errors. |

## Unresolved issues and risks

Initial authored balance remains without full human mission calibration. Browser exact timing/trigger/blast/slow, audio fidelity, narrow responsive layout and hardware bindings remain unverified. Numerical evidence is disposable VM simulation, not live gameplay timing. No material design question remains. Parked Jungle and source assets/data untouched. Remote publication/asset distribution/ignored MIDI bank unresolved and unchanged.

## Next action / handoff

All four acceptance criteria checked. Final complete suite session96878 exited0. Review candidate is branch HEAD containing this journal; recover exact SHA with git rev-parse feature/volcanic-trooper-roster. Exact SHA reported to director after commit; director records eventual squash SHA in a subsequent checkpoint. Review finite placement/ammo/cycle/slow/order boundaries and actual input/factory evidence. Worker stops at Review; no merge, publication, board edit or delegation.
