# 2026-10-05 / 002 — custom-mission-challenge

- Task: [custom-mission-challenge](../tasks/custom-mission-challenge.md)
- Date: 2026-10-05 (Europe/Berlin)
- Branch: feature/custom-mission-challenge
- Starting commit:66ab2e8a8de51e8bfb50bdb47ad81f7d9c879c14
- Status: Review; not merged

## Starting context

Read AGENTS, WORKER, task and initial session. Only prepared task modification/journal were present; preserved and included. User reports harder settings too easy; exact Hard versus Very Hard unspecified. Approved bounded custom tuning only; original campaign, combat rules and Split Ridge geometry immutable.

## Work performed / chronological log

Inspected force ratios and automatic support: original Relay8 starting soldiers/6 bugs/2 nests/no finite waves; Convoy10 soldiers+robot against4 bugs+26 finite waves. Hard/Very Hard profiles now reduce soldiers to6/4 and omit tank support while retaining troop/plasma. Relay fixed custom nest intervals3/2.4s and finite24/48 arrivals; Convoy80/120 arrivals across all four existing approaches from8s through100s. Scheduler, cap and objectives reused without global AI/damage/health changes. Runtime briefing, Controls and Units show profile differences and dynamic wave budget. Pending Relay arrivals prevent premature victory and show in HUD.

No new coordinates or asset regeneration. Art-kit catalog/manifest snapshot v2 records current per-difficulty active subsets/timing; README/contract/filled brief explain historical25-hotspot Normal superset. Terrain/mask/source assets untouched.

Measured seed34 before/after stationary actual-runtime180s combat probes in disposable VM, recorded parameter/log methods and pressure/army/kills/emission snapshots. Base profile data is retained pre-TRI-034 baseline. Live IAB Hard Convoy showed34 active bugs,16 pending arrivals and29s wait; live Hard Relay single-soldier northern attack-move showed43 bugs/12 pending and both nests/relays. These are sustained pressure smoke observations, not human challenge certification.

## Verification

| Check | Result | Evidence |
|---|---|---|
| node tools/dev.cjs test | pass | Full suite including new custom profile regression and all-nine original checks |
| node tools/check-custom-challenge.cjs | pass | budgets/reachable hotspots/cap queue drain/pending victory/restart/fixed nest cadence/original quota |
| combat probe | measured | design/custom-challenge-evidence.json; seed34,.02s,180s; before/after separately labelled |
| node docs/art-kit/catalog.cjs | pass | versioned difficultyProfiles; unchanged25-point superset |
| bundled Python docs/art-kit/verify.py | pass | paths/hashes/dimensions, all786432 packed collision bits and25-hotspot geometry |
| live browser | partial | playtests/2026-10-05-custom-challenge.md and two screenshots; Hard both maps only |

Bundled Python path: C:/Users/user/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe. Plain python alias unavailable; no installation performed.

## Unresolved issues and risks

Bounded retune implementation, measured pressure and isolation criteria are supported; human tactical challenge/victory calibration across Hard/Very Hard remains pending as an explicit validation limitation. Stronger emission/resource pressure is measured, and live rendering/movement/combat observed on Hard. Neither skipped Very Hard live play nor geometry tests certify balance. Sustained Relay nests can hold cap and defer finite arrivals until nests are destroyed; queue retention/cleanup gate intentional and visible. No change to aiming, controls, barrel damage, original health/difficulty, nests or waves.

## Next action / handoff

Director independently review scoped commit, compare profile parameters and recorded before/after evidence, run focused regression and art-kit verification. Review the bounded retune against the clarified verified criteria, preserving the explicit human-balance limitation during integration. Worker stops Review; no board edit, merge or publication. Local preview8787 was started from this checkout for live smoke.

## Review clarification — same session

Director relayed user authorization to continue the queue and requested final task acceptance to separate verified bounded implementation/pressure/original-isolation criteria from pending skilled-player calibration. Updated only task/journal wording; no runtime, evidence, checks or balance parameters changed. Implementation review commit: `845751ae76f34cc85a1018b1e19f287943578654`. Full tactical human victories and satisfying Hard/Very Hard difficulty remain unverified. Director is independently reviewing runtime diff and full suite; next action is director review/integration, with no worker merge/publication.

## Review correction — profile label

Director found the Relay briefing hardcoded Hard for the Very Hard profile. Corrected the assault label to the actual selected difficulty; added explicit Hard/Very Hard brief-label assertions to the focused profile regression. `node tools/check-custom-challenge.cjs` passes and `git diff --check` passes. No balance parameters, evidence or art snapshot changed. Return corrected branch head to director for integration.
