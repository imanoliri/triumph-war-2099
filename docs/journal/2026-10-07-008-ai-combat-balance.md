# 2026-10-07 / 008 — ai-combat-balance

- Task: [ai-combat-balance](../tasks/ai-combat-balance.md)
- Date: 2026-10-07 (Europe/Berlin); session 008 across all features that day
- Branch: `fix/ai-combat-balance`
- Starting commit: `f5b627f5c569c122b226ae5e4504b92bb607715b`
- Status: Review — implementation and local checks complete; director integration pending

## Starting context

Prepared initial session; prior paused worker performed no code changes. Resumed the same session/checkout after user revoked planning-only pause and authorized sequential ticket execution. Read AGENTS, WORKER, WORKFLOW, task, DESIGN and PLAYTEST. Starting dirty files were only this prepared journal and its task link. Director confirmed TRI-070 board dispatch bound to `/root/ai_balance_worker`; main metadata checkpoint `82fb80e` was not merged into this branch.

## Work performed

- Investigated TRI-064 alerts: source-or-threat radius without sight checks allowed remote recipients to relay; perception then dropped beyond-sight targets and recurring alarms could wake them again. Same-target pack focus was already not refreshed (correcting initial hypothesis). Acoustic shots repeatedly extended 3–5 s investigation goals. Engaged bugs always approached.
- Added authored `combatAI` defaults in src/balance.js: pack120 px / source cooldown2.5 s / recipient focus2 s; recruitment requires source and threat visibility inside recipient175/200 px sight. Recipients cannot relay an alarm until independent target reacquisition or direct damage confirms the threat. Sound220 px / listener cooldown3 s / unconfirmed investigation1.5–2.5 s. Engaged approach/wander/pause65/20/15%, preserving distracted40/35/25% and movement speeds.
- Friendly first scan is immediate. Acquisition favors nearby smaller quantized lane offsets; Defend skips candidate lanes requiring travel beyond its existing50 px leash, including short-weapon closing distance. Spray retains density priority. Already eligible targets remain stable; explicit focus remains authoritative.
- Attack-move uses weapon-aware engagement distance; flame/shotgun include20 px closing allowance. Short-range aiming closes to reach before lateral alignment. Fire/burst/rest/reaction weapon timings, actual projectile ranges, HP/damage, populations/spawns, difficulty profiles, manual controls/aiming, source assets and enemy-only barrels are preserved.
- Added immutable before/after regression loading all four affected runtime files from starting Git commit into disposable VMs. Checks cover repeated relay/out-of-sight alarm wakeups, sight/cooldown, sound memory, three seeded pursuit/weapon trials, first reaction, guard alternative lane/leash and force/Follow precedence. Wired into standard test command; updated superseded TRI-064 assertions to revised approved behavior.
- Updated relevant DESIGN, Controls and Units descriptions. Corrected stale cardinal/immobile-Defend prose to already established TRI-061/063 code behavior; aiming code is unchanged.

## Chronological log

1. User steering resumed read-only investigation while director bound dispatch. No implementation before confirmation.
2. Director confirmed In progress dispatch and approved conservative AI-only defaults; worker implemented in assigned isolated checkout. No board changes/delegation/merge/publication.
3. Baseline full suite launched before implementation and completed successfully, but later subprocesses may have read changed files; this run is preliminary evidence only. Immutable focused comparisons use exact starting source and final full suite is required.
4. Focused comparisons passed. Superseded recreation checks initially failed because they required uninterrupted enemy approach and immediate repeated pack recruitment; updated to randomized valid modes and cooldown boundary, then reran.
5. Browser inventory returned no apps/browsers; attempted in-app browser returned unavailable. Recorded separate not-run playtest, no rendering/audio/playability/victory claim.
6. Full run caught overbroad historical immutable weapon/input/support comparisons: intentional acoustic/pack/acquisition RNG changes altered weapon traces, world snapshots and background resource arrivals. Preserved immutable source loaders and explicit subsystem assertions, but isolated named acoustic callback for weapon traces and suppressed autonomous acquisition/hearing/pack for input/support comparisons. The older support baseline predates acoustic/pack code; absence there remains authoritative. Production recreation/real combat simulations and new AI comparison retain real AI. Independent focused weapon/input/support suites passed after isolation; final full suite restarted on all current runtime/test files.
7. Final `node tools/dev.cjs test` completed with exit0: 81 script syntax checks plus every standard project/gameplay/mission/music/tooling/director/mirror suite. Scoped diff hygiene passed. Acceptance marked complete with live calibration limitation retained.

## Verification

| Check | Result | Evidence |
| --- | --- | --- |
| Comparative AI regression | passed | `node tools/check-ai-balance.cjs`, immutable baseline `f5b627f`; seeds1/77/812. |
| Full automated suite | passed, exit0 | `node tools/dev.cjs test`, 81 scripts syntax checked and all standard suites green; output in ignored work/tri-070-verified.log. |
| Immutable weapon/input/support boundaries | passed | `node tools/check-combat.cjs`, `node tools/check-input.cjs`, `node tools/check-support.cjs`; acoustic/acquisition/pack isolation documented above and ARCHITECTURE. |
| Diff hygiene | passed | `git diff --check` before commit. |
| Live browser playtest | not run | [Attempt / unavailable browser](../playtests/2026-10-07-ai-combat-balance.md). |

Comparative seed77 evidence (controlled fixture, not mission win calibration): alarm recipients4→1 after8 s; remote out-of-sight repeated wakeups prevented; sound investigation3.53→1.77 s and repeated shot extension prevented; friendly first reaction0.32→0.12 s; 100 forced decision samples approach/wander/pause100/0/0→53/27/20; plasma attack-move first shot3.76→0.40 s, retaining280 px standoff instead of walking121 px closer; flame first shot1.04→0.96 s with closing then alignment. Weapon burst/shot values are unchanged; different AI decisions intentionally consume RNG differently. All three seeded trials require nonzero pauses/wanders and successful short-range fire.

## Unresolved issues and risks

No material scope question. Live balance/win rates, rendering and audio remain unverified because browser is unavailable. Lane cost is a local geometric heuristic plus existing visible-ray/navigation checks, not a new global tactical/path optimizer. Controlled comparisons support direction of correction, not a claim that every mission is now easy or calibrated.

## Next action / handoff

Ready for independent director review in `C:/Users/user/Documents/Codex/2026-10-03/he/outputs/triumph-ai-combat-balance`, branch `fix/ai-combat-balance`. Scoped commit title: `Bound enemy alerts and improve friendly weapon engagement`; obtain exact worker SHA with `git log -1 --format=%H fix/ai-combat-balance` (reported to director after commit). Review alert bounds/cooldowns/provenance and direct-hit response, short-range positioning, guard candidate/leash and weapon-aware attack-move; check comparison isolation alongside production regression coverage. No merge/publication performed. Director owns independent review and squash integration, then records resulting main SHA in a subsequent metadata checkpoint. Browser follow-up is specified in the separate playtest; user need not answer a new scope question.
