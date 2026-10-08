# 2026-10-08 / 006 — mercenary-trooper-roster

- Task: [mercenary-trooper-roster](../tasks/mercenary-trooper-roster.md); TRI-080.
- Date:2026-10-08 (Europe/Berlin); prepared session006 retained.
- Branch: feature/mercenary-trooper-roster.
- Checkout: C:/Users/user/Documents/Codex/2026-10-03/he/outputs/triumph-mercenary-trooper-roster.
- Starting commit:8bf3f7e7d1e6725543977bde858cdac7faff8210.
- Status: Review; all task acceptance criteria met; scoped commit ready for independent director review.

## Starting context

Read AGENTS, WORKER, task, prepared session, relevant architecture/design/playtest and prior Industrial kit/check conventions. Prepared task/session metadata were the only initial changes; no unrelated implementation edits. Director confirmed dispatch before mutations. No runtime Mercenary mission exists in exported custom registry or recovered mission world routing; no original-game research performed.

## Work performed

Added explicit-clock src/mercenary-troopers.js with fixed240px single/120px three-pellet Specialist modes,0.6s switch and1s post-completion lockout; per-unit Auto/Single/Spread preference. Routine defaults (approved by director):1HP,1 damage/pellet,290px/s,0.38s interval,spread offsets ±15 degrees. Auto spread requires2 visible living targets in120px/15-degree half-cone. Mode completes even without a target; tactical freeze uses simulation clock. Auto retains240px acquisition and candidate-cost reach despite active spread120px; actual shots/order reach follow active mode.

Hunter fixed260px focus/rifle,1s stationary same-target tracking, next shot2 damage and then resets; ordinary shots preserve progress. Actual displacement/sightloss/prop obstruction/target change/death/out-of-range cancel; blocked movement without displacement does not. Shared order/aim/terrain integration remains explicit. No rewards/economy/campaign/new exceptional enemy behavior.

Central starting/support factories initialize both types. Exported Mercenary world roster restricts support menu options; optional authored fields weaponSpecialists/bountyHunters support later explicit opt-in. Actual carrier/parachute delivery and pending cap reservations covered. No existing mission placements/default payload/objective/pressure/map/assets changed. Fixed kits reject weapon pickup/mounting, retain explicit door/terminal/eagle/grenade and ordinary population/order conventions.

Preference selector beneath commander buttons applies only to selected living Specialists; panel synchronizes per-unit stored setting, including Mixed preferences. No physical key changes. Recovered52 sprite/hotspots retained with copper/amber Specialist and slate/lilac Hunter runtime/Units overlays. No asset regeneration or original-source modifications. Current DESIGN/ARCHITECTURE/Controls/Units/STATUS/PLAYTEST updated.

## Chronological log

1. Director dispatched approved bounded TRI-080; read assigned repository/session records and inspected code read-only first.
2. Implemented roster/module/adapters/UI and production checks. Focused group-negative fixture corrected from12.5-degree in-cone to18.4-degree out-of-cone; no behavior change for a faulty expectation.
3. Early director review highlighted Hunter tracking resetting every ordinary shot; fixed reset to charged shot only and added real update-loop repeating bonus evidence. Preference selection/mixed synchronization added and tested through actual handler/panel.
4. Mode-dependent range review led to explicit240px Auto acquisition. Requested real update near-group spread→single far target test exposed Defend candidate-cost still120px rejecting200px target; corrected Auto candidate reach240 and regression now confirms reacquisition/switch/damage. Preferred Spread and active shot/order geometry remain unchanged.
5. Focused checks passed including range/timing/mode grouping negatives, stationary real update bonus/reset, movement/sight/target/prop/range cancellation,8 headings,focus/attack-move/Follow/force/Defend,thin terrain projectile sweep/lifetime endpoint,actual ground/air factories and cap reservations,UI selection/mixed sync,world isolation and targetless switch completion. Full suite completed exit0, including director/project mirror checks. After final Auto candidate-cost/UI edits, affected recreation/combat/input/Mercenary/Units checks reran exit0. Added disposable public loader opt-in starting factory coverage; Mercenary check reran exit0.

## Verification

| Check | Result | Evidence |
| --- | --- | --- |
| node tools/check-mercenary-troopers.cjs | passed | Disposable production VM fixture; no mission persistence/production access. Actual update-loop repeat charged shots and near-group→far target acquisition checked. |
| node tools/check-unit-guide.cjs | passed | Both entries/recovered52 portraits and exact runtime/guide marks parity. |
| node tools/dev.cjs test | passed (exit0) | Complete suite including new Mercenary, original/custom terrain/objective/support, rendering, director and offline Project mirror checks. |
| Final affected checks | passed (exit0) | node tools/check-recreation.cjs; node tools/check-combat.cjs; node tools/check-input.cjs; node tools/check-mercenary-troopers.cjs; node tools/check-unit-guide.cjs after final edits. |
| Changed runtime syntax | passed | node --check game.js, src/combat.js, src/orders.js, src/projectiles.js and src/mercenary-troopers.js. |
| git diff --check | passed | No whitespace errors. |
| Live browser playtest | not run | [Separate absence record](../playtests/2026-10-08-mercenary-troopers.md). No matching shipped mission; no live rendering/audio/playability claim. |

## Unresolved issues and risks

Initial balance is authored tuning, without human play calibration. No runtime Mercenary mission: opt-in roster/factory/fixtures only, as approved. Browser evidence absent and separately recorded. No user design question remains. Remote publication/original-asset distribution/Windows MIDI bank concerns remain unchanged. Existing unrelated patrol expression/history preserved; no parked Jungle work touched.

## Next action / handoff

Review candidate is the HEAD commit of feature/mercenary-trooper-roster containing this handoff; recover exact SHA with git rev-parse feature/mercenary-trooper-roster in the checkout listed above. Exact SHA is reported to director after the scoped commit; director records subsequent integration SHA in its checkpoint. Review src/mercenary-troopers.js and adapters plus tools/check-mercenary-troopers.cjs (repeat charged-shot cycle, near-group→far target Auto transition, per-unit mixed UI, opt-in loader and carrier/parachute cap checks). All criteria checked in task. No open design question. Director independently reviews and squash-integrates; worker must not merge/publish/board-edit/delegate. No squash merge performed in this worker branch.
