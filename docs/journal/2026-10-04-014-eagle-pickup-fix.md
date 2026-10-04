# 2026-10-04 / 014 — eagle-pickup-fix

- Task: [eagle-pickup-fix](../tasks/eagle-pickup-fix.md)
- Date: 2026-10-04 (Europe/Berlin)
- Branch: fix/eagle-pickup-fix
- Starting commit: e504fe8957b8b98b357e3e90f8a69125116bc8da
- Status: Review

## Starting context

Read AGENTS, WORKER, task/session 013 and DESIGN. Started own session 014. Initial edits were director task/session only; preserved them. User initially described unpickable eagles apparently in all missions regardless commander or soldier; subsequently confirmed via director: “yeah, it seems to be population cap!”

## Diagnosis and source evidence

Deterministic pre-fix VM reproduction: Hanger mission 6, time 2, clear pickup list, roll 9 produced bronze tank eagle at (719,404), clear terrain. Both commander and soldier placed on that eagle returned false from pickup; reinforcementRule was null. Recovered Hanger random creation group 67620 checks roll/count/population, while pickup support group 7096 requires global15<16 and Hanger global15=16. Inspected actual groups in research/events.json.gz, support generator and shipped recovered rules; no missing alternate Hanger bronze case found. Director independently reproduced this cause.

Shared direct-indoor troop rules also reject at troop capacity (50 in normal fixtures), while random spawning previously used a broader recovered spawn population expression without collection eligibility. All initial source-placed eagles across nine missions were eligible and had clear centers at initial population. Existing eagle claims do not affect commander pickup; recent attack-move threat/turret/force priorities remain intentional and unchanged. No universal every-mission collision failure was reproduced.

## Work performed

A shared reinforcementStatus returns the existing guarded rule or rejection reason. Collection still uses the original rules/cap; random creation now additionally checks that same eligibility. No unavailable Hanger bronze or currently cap-blocked new indoor eagle is rendered. Source artifacts and balance remain unchanged.

Existing temporarily rejected eagles remain. Each blocked eagle visibly says TROOPS FULL · WAIT FOR SPACE; labels clear as troop count drops and collection becomes available. Unsupported existing eagles say SUPPORT UNAVAILABLE. Labels are positioned inside map bounds. Soldier automatic candidate selection and explicit use continue respecting availability; explicit pickup jobs wait and successfully consume their same eagle after capacity returns. Updated Controls, README, DESIGN and STATUS; retained broader user report as a verification limitation.

## Chronological log

- Audited support guards/globals, random spawn rules, source event groups, initial eagle placement, shared pickup logic and attack-move claims/threat handling.
- Reproduced Hanger random bronze rejection for commander and soldier before fix.
- Director approved shared creation eligibility and explanatory persistent rejection labels, preserving source caps and existing eagles.
- Director relayed user population-cap confirmation; recorded in task and implemented explicit wait-for-space feedback.
- Added all-nine random-eagle collection tests for both unit types, Hanger guard reproduction, indoor cap rejection/retention/new-spawn suppression, rendered availability labels/clearing, commander retry and explicit soldier-use wait/retry.
- Director review requested stronger label contrast over sand: added compact dark backing, retaining map bounds, and a targeted canvas backing/bounds assertion.
- Full suite passed; after adding final adjacent label-clearing/soldier-use checks, affected recreation checks passed again.

## Verification

| Check | Result | Evidence |
| --- | --- | --- |
| Deterministic pre-fix reproduction | confirmed | Hanger roll9 at t2, clear terrain, commander/soldier pickup false; source offsets and guards above. |
| node tools/dev.cjs test | passed | Full syntax/project/simulation/music/disposable tooling/director suite. |
| node --check game.js | passed review follow-up | Syntax valid after availability-backing addition. |
| node tools/check-recreation.cjs | passed final tests and review follow-up | Final additional cap-label clearing and explicit soldier-use retry coverage plus prior feature checks. |
| Live browser eagle-fix check | unverified | Availability text/rendering asserted in mocked canvas; no new live check reported to worker. |

## Unresolved issues and risks

Intentional cap rejection is preserved and now explained. User confirmed probable population-cap cause; no claim that all potential every-mission failures were reproduced. Broad live gameplay/audio and new label legibility remain unverified by worker. Existing source guards, troop-cap semantics and explicit orders are unchanged.

## Next action / handoff

Director independently reviews shared eligibility, source evidence, preserved temporary eagle state and label feedback, performs available live UI smoke, then squash-integrates if accepted. Worker stops at Review; no merge/publication. Resolve implementation SHA via git log -1; record resulting main squash SHA in subsequent director checkpoint.
