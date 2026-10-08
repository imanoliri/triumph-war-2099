# 2026-10-07 /015 — maritime-trooper-roster

- Task: [maritime-trooper-roster](../tasks/maritime-trooper-roster.md)
- Date:2026-10-07 (Europe/Berlin); session015, prepared journal reused.
- Branch: feature/maritime-trooper-roster
- Checkout: C:/Users/user/Documents/Codex/2026-10-03/he/outputs/triumph-maritime-trooper-roster
- Starting commit:17c185d794c1810fd10ad1bce204dd8a9a462cf1
- Status: implementation complete; final checks pending before Review.

## Starting context

Read AGENTS/WORKER/task and prepared session; preserved dirty task/session metadata. Director dispatch confirmed In progress before mutations. Main already included matching-world reinforcement menu, Snow Winter Gunner and Capital kits. No prior Maritime implementation existed. Worker never delegates, edits board/director checkout, merges or publishes.

## Work performed

Implemented authored Maritime module, fixed four-round suppression clock/movement-only deadline and Grenadier group prediction/quantized ground flight/terrain blast; integrated shared orders, actual support factories/cap, world-only menus, manual/runtime distinct marks and two Harbor starting replacements. Recovered assets untouched. DESIGN/ARCHITECTURE/Controls/Units/PLAYTEST updated. Focused production tests cover positive/negative mechanics and delivery; existing manual portrait and immutable custom-support comparisons extended with exact approved Maritime deltas.

## Chronological log

1. Inspected repository and ordinary enemy/exceptional worm behavior. Director agreed ordinary mobile suppression only; no shipped Maritime charger, cross-world menus exclude worm scenarios. Desert committed phases stay outside Maritime stopping; damage remains normal for exposed enemies. Conservative first-two Harbor soldier replacements accepted, preserving10/10/8/6/4 infantry total by difficulty.
2. Added Suppressor1HP/1damage/290px/s,200px target reach, four0.38s rounds,1.5s final reload; hit resets1s movement deadline without stacking, attacks unaffected. Ordinary movement/patrol tuning36/24px/s retained. Partial rounds persist across target/order interruption; docs make tuning explicit.
3. Added Grenadier1HP,240px visible ground group centre,220px/s projectile,40px/2damage,3s reload. Group prediction uses observed previous-frame movement. Terrain/live props obstruct sight/flight; endpoint/obstruction detonates once, allies untouched, enemy-only barrel conventions retained.
4. Director early review caught freely aimed grenade heading conflict; corrected to established eight infantry headings, lane alignment with50px Defend leash, rendered-heading/flight parity. No unrelated-world prediction fields: observation runs only with living Grenadier.
5. Director review reproduced2px sampling skipping a1px wall; refined only new grenade LOS/sweep to at most1px. Added odd thin-wall initial sight, dynamic blocker and blast occlusion regressions. Original projectile stepping stays unchanged.
6. Focused tests passed after correcting test assumptions: Harbor Normal infantry8, waves26/37/48/59/74; terminal use marks.used when objective does not request.active. Initial broad run stopped at that new fixture error; corrected fixture rerun passes. Immutable support comparison additionally needed exact two-for-two Harbor delta normalization; other data still compared to original immutable baseline.
7. Actual IAB menu/save/Units/start inspection and screenshots recorded. Default AI later showed mission completion with merits228; no controlled timing/human balance/audio claim. Final source reload captured updated eight-direction manual and Maritime cap text.

## Verification

| Check | Result | Evidence |
| --- | --- | --- |
| Syntax/reference check | pass | node tools/dev.cjs check |
| Focused Maritime production checks | pass | node tools/check-maritime-troopers.cjs; exact cadence/range/refresh/zero movement/active melee/freeze/nests, prediction/focus/eight headings/render angle/off-lane/Defend, flight/radius/reload/friendly/thin terrain, shared orders/profiles/menus/actual carrier-air factories/caps |
| Existing focused checks | pass | Harbor lifecycle/geometry/hash, manual portrait/runtime parity, custom pressure; immutable custom support final rerun pending |
| Final full suite | pending | node tools/dev.cjs test must run after final stable code/checks/docs |
| Live browser | limited pass | [Separate browser report](../playtests/2026-10-07-maritime-troopers.md) and four screenshots; menu/portraits/start/one default-AI completion observed |

## Unresolved issues and risks

No open material mechanic question. Controlled live stop timing, grenade flight/blast timing, manual specialist orders/delivery, human difficulty calibration, all-profile live completion, audio and physical-key hardware remain unverified. VM evidence is not live timing or human balance acceptance. Original/public/private publication remains unresolved; no publication performed.

## Next action / handoff

Finish immutable support rerun and final node tools/dev.cjs test, record result, mark supported acceptance, make scoped implementation commit and report exact SHA/clean status to director. Stop at Review; director independently reviews/squash integrates and records resulting main SHA in later checkpoint. No merge yet.

## Recovery continuation

Replacement run [2026-10-08 /001](2026-10-08-001-maritime-trooper-roster.md) completed the pending immutable support and full-suite checks (both exit 0) and prepared the scoped Review commit. Original observations and limitations above remain preserved.
