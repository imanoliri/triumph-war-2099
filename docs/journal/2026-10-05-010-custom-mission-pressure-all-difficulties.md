# 2026-10-05 / 010 — custom-mission-pressure-all-difficulties

- Task: [custom-mission-pressure-all-difficulties](../tasks/custom-mission-pressure-all-difficulties.md)
- Date: 2026-10-05 (Europe/Berlin); session 010 across all features that day
- Branch: `feature/custom-mission-pressure-all-difficulties`
- Starting commit: `88a3bb7b94f5e797bc89c43e0106d83854c06d6e`
- Status: Review

## Starting context

Read AGENTS/WORKER, authoritative task/latest scope and initial session; HEAD88a3bb7, isolated assigned branch. Only preexisting edits were director-prepared task and initial session.

## Work performed

Completed bounded TRI-037 implementation below.

## Chronological log

Latest user scope, friendly schedule answer and director early review corrections are recorded below.

## Verification

| Check | Result | Evidence |
| --- | --- | --- |
| Automated checks | passed | node tools/dev.cjs test; focused pressure check; director independently confirmed full suite |
| Live browser playtest | Normal smoke passed; full challenge not run | docs/playtests/2026-10-05-tri-037-pressure.md |

## Unresolved issues and risks

See explicit human-calibration/browser/audio limitations below; no open scope questions.

## Next action / handoff

Review scoped implementation3da3c32, with final session evidence below. Director owns independent acceptance and squash integration; worker has not merged.

## Completed implementation and chronological steering

Latest scope read: Relay Breaker and Silent Return only, every difficulty; Last Convoy unchanged. Director relayed confirmed friendly three-drop formation at20s, northern entry, three central top-to-bottom drop points; copied authoritative decision into task. No delegation/board edits/merge/publication or original-game research.

- Relay nests now (904,240)/(904,600)/(656,160)/(656,600). Four reachable west-facing approach lanes, ±8px bodies and birth positions checked. Explicit custom births7/6/4.5/2.6/2s, armies8/8/8/6/4 soldiers, finite budgets11/14/22/33/44 (Very easy→Very hard). Tank support retained through Normal; harder starts preserve prior smaller forces.
- Silent nests (328,328)/(648,520)/(904,392); fixed9/7/5/3.8/3s and budgets7/10/14/21/28. All difficulties keep four starting commandos and optional source air eagle. Nests/enemies/future enemy arrivals may remain at extraction.
- Friendly schedule20s launches three source176 aircraft from x520,north y−24/−88/−152, heading south. One ordinary commando animation each lands at (520,328)/(520,392)/(520,520); no access/laser flags are altered. Existing aircraft fire/bombs retained. Director early review caught visual overlap and capped-drop loss: corrected with64px spacing, exact-target cap waiting/retry, pending-parachute capacity reservation, and large-dt tests. Original air path behavior unchanged for unconfigured aircraft.
- Pending schedule plus unfinished flight/drop actors gate extraction; every living landed human joins ordinary return requirement. Tactical freeze/single-shot/restart checked. Configured custom nests opt out of native Normal random breeding; original nests still use recovered Normal lifecycle.
- Updated briefings, Units context, README/DESIGN/design descriptions and art-kit snapshotv3 all-five active profile nests/wave geometry. Historical25-hotspot art proposal/geometry preview retained and explicitly labeled; manifest placements now active27-point superset and current profile nests authoritative. Terrain/collision/source data unchanged. Captured baseline custom registry from88a3bb7 for reproducible comparison.

## Verification results

- PASS node tools/dev.cjs test: complete suite including original nine scenarios, source support/combat/breeding, custom objectives, new pressure/formation and disposable tooling/director fixtures.
- PASS node tools/check-custom-pressure.cjs (also included in full suite): all-five cadence/first births, connected LOS and spawn clearance, exact Last Convoy resolved JSON equality, north formation spacing/landing points, schedule gates, freeze, single shot/restart, cap denial and retry, one-slot reservation, large-dt behavior and legitimate locked access.
- PASS node tools/check-custom-pressure.cjs --record:20 full-runtime tactical before/after encounters, seed37,0.02s updates up to240s. Detailed snapshots/stages/army/birth/arrival/time in docs/design/tri-037-pressure-evidence.json. No teleports/healing/cap/HP changes in encounters. Initial support army and delivered extra friendly force reflected in actual simulation.
- PASS git diff --check.
- Browser smoke separately in docs/playtests/2026-10-05-tri-037-pressure.md with three screenshots: Normal Silent approach/formation and Relay focus destruction of added north nest. Audio/full victory/all-five human challenge not checked.

| Mission | Very easy births before→after | Easy | Normal | Hard | Very hard |
| --- | --- | --- | --- | --- | --- |
| Relay |9→20|9→35|6→33|22→49|32→40|
| Silent |0→10|0→15|0→23|0→65|0→70|

All budgets/actual emissions/army/time are separate in evidence. Relay Hard after defeated144.6s; Silent Easy after extracted210.4s with5 noncommanders; Silent Very hard after defeated141.3s. Birth totals are encounter-dependent (nest destruction/cap/time matter), not uncapped theoretical output. Silent baseline scripted approach stalled stage3 while hunting threats around locked-room routes; added support/encounters sometimes change route outcomes. More enemies and tactical failures establish increased pressure, not a claim every profile is subjectively harder or guarantees human victory.

## Limitations and handoff

Acceptance implementation and relevant checks satisfied; subjective human calibration remains explicit. No full human completion or exhaustive browser difficulty pass, no audible verification. No open scope questions. Exact next action: director independently reviews scoped commit, evidence and custom-only boundaries; may request corrections, otherwise squash-integrates. Worker has not merged. Record final worker SHA below; resulting main squash SHA belongs to director checkpoint after acceptance.

Review implementation commit: `3da3c32` (Increase Relay and Silent pressure across all difficulties). This follow-up records its exact SHA in the session; director should squash implementation plus this handoff checkpoint, then record resulting main SHA in its administrative checkpoint.
