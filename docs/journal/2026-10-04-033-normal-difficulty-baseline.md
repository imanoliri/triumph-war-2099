# 2026-10-04 / 033 — normal-difficulty-baseline

- Task: [TRI-021](../tasks/normal-difficulty-baseline.md)
- Branch: fix/normal-difficulty-baseline
- Starting commit: 3ec3dedd15413aff959a1a14312304748bae3aaf
- Status: Review

## Starting context

Read AGENTS, WORKER, task/dispatch032, DESIGN, ARCHITECTURE and approved Normal correction/audit. Preserved director task/dispatch edits. User approved only Normal breeding/evolution correction; no custom profile health/layout/wave/resource proposals.

## Work performed

Renamed recovered third value evolutionRollMax in shipped schema and generator. Explicit custom motion multipliers preserve all existing motion and non-Normal nest cadence. Added src/breeding.js: independent coordinate-seeded per-nest half-second opportunities, rolls0–3, finite twelve-frame2.4 s busy animation, frame9/1.8 s single emission, trigger/emission caps, destruction cancellation. Emission at full cap is consumed, not deferred; phase finishes without infinite pending work. Nest itself continues to count once toward completion. Tactical freeze and restart use existing simulation lifecycle.

Targeted pickup derivation adds all17 growplant branches, roll ceiling, count and actual global guards. Normal-only placement goes into flowers, not pickups; only missions1–3 are eligible under recovered globals. Existing helper/offset and bounded clear-terrain fallback retained; source count<=3 can create fourth. Existing placed plants and commander/ordinary/red contact remain unchanged. No installed original, unrelated assets, board or director checkout changes.

Updated DESIGN, architecture, STATUS, Controls/Units and focused regression/diagnostic plus runtime/module serving fixtures. No delegation, merge or publication.

## Chronological log

- Confirmed old third-value coupling and missing growplant derivation; sent director early implementation approach.
- Implemented finite Normal module and targeted schema/cases; initial existing suite passed.
- Added meaningful pure boundaries/cap/frame/busy/RNG checks and production all-nine pause/destroy/completion/restart, plant guard/count/contact and other-profile preservation checks.
- Verified generated pickup data differs only by new growplant cases; all existing cases match HEAD exactly.
- Full suite passed with34 syntax scripts. Subsequent focused recreation/tooling checks cover added non-Normal plant/preview assertions.
- Native/browser prior access limitations retained; no new access attempt or workaround.

## Verification

- node tools/dev.cjs test: passed syntax, project, breeding, recreation, vents, music, tooling/director disposable regressions.
- node tools/check-breeding.cjs:100000 opportunities,4025 successes (4.025%, required4%±0.3pp); controlled1800 s/3600 opportunities gives142 successes,122 births,19 busy-skipped plus one pending success; continuously capped gives142 cap-skipped and0 births. Opportunity success is separate from realized throughput/pressure.
- node tools/check-recreation.cjs and node tools/check-tooling.cjs: final focused checks recorded before commit.
- Committed-range diff check: run after scoped commit against starting3ec3dedd; report SHA/check outcome to director. Commit containing this journal identifies implementation; git log -1.

## Limitations

Independent RNG correlation and50Hz source animation conversion are disclosed approximations. Exact native helper fallback/animation cadence, original/browser rendering/audio, live gameplay pressure and full mission playthroughs remain unverified. Other settings retain legacy custom cadence; no broader fidelity/balance claim. Prior native launch access denied and browser unavailable; no barrier workaround.

## Next action

Stop at Review. Director independently checks module phase/cap ordering, source global guards and Normal-only gates, unchanged non-Normal settings and relevant docs, then squash-integrates if accepted. User agreement is still required before any other TRI-018 candidate profiles/layouts/resources. No worker merge/publish.

## Review follow-up

Director caught a remaining Units-guide upper-bound h.speed reference. Replaced it with the preserved custom multiplier and added all-five guide assertions for exact nest cadence and absence of NaN/Infinity. Game/fixture syntax and affected recreation check pass; production search finds no difficulty.speed/h.speed references. Committed-range diff check rerun after follow-up commit. No scheduler or balance change.
