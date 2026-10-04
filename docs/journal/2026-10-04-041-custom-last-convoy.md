# 2026-10-04 / 041 — custom-last-convoy

- Task: [custom-last-convoy](../tasks/custom-last-convoy.md)
- Date: 2026-10-04 (Europe/Berlin); session 041
- Branch: feature/custom-last-convoy
- Starting commit: c7fe70241836e013040828886c24ef7d2b9b8cec
- Status: Review

## Starting context

Director approved TRI-025 finite defense scenario on existing Hold Base terrain, following accepted Relay Breaker registry. Preparation's task edit and initial session were the only opening changes; preserved and completed here. Read AGENTS, WORKER, WORKFLOW, task, design JSON, SETUP and PLAYTEST.

## Work performed

Added immutable Last Convoy metadata with exact approved actor/support/weapon and scheduled arrival coordinates. Added 7-HP initial robot through the existing human actor path. Reused source terrain, cannons, doors, props and support without asset changes. Finite queue belongs to custom scenario state and emits through existing ground-bug spawning (including existing redbug chance), preserving difficulty and cap rules. Arrivals at 20/50/80 seconds total 6/8/12; chronological emission opportunities are half a second apart. Under cap pressure, pending points remain queued and retry after half a second rather than accumulate an immediate release burst. Restart reconstructs all state and tactical mode bypasses updates.

Progress counts all unconsumed arrivals, time until 120 seconds and living enemies. Automatic loss has priority when the last noncommander dies, including inbound support. Original kill-quota wave path remains unchanged; separate custom ledger retains scenario merits. Added selector, briefing, Controls/Units objective text and current README/DESIGN/ARCHITECTURE/STATUS descriptions.

## Chronological log

1. Inspected clean implementation baseline and reviewed approved placements; no design questions needed.
2. Implemented metadata, finite scheduler, runtime initialization, progress and loss gates. Existing Relay Breaker checks passed.
3. Added focused fixture regressions for exact 26 budget, long frames, chronological half-second spacing, full cap queue retention/drain, 119.9/120 gates, enemy gate, tactical freeze/restart, real runtime victory/single award, last army loss with inbound carrier, initial robot/cannon mounting, support eligibility, merit isolation and original Hold Base/Crystal Chamber quotas.
4. Ran full authorized suite successfully. Hidden IAB worked; selected scenario and inspected readable briefing, terrain, tactical deployment, live movement/combat through second arrival wave and Units guide. Scoped live limitations recorded separately.
5. Director steering confirmed no map/art expansion; future Relay Breaker visual map proposals are a separate ticket. Finished unchanged defense scope.
6. Added a pre-support survivor gate so same-frame deliveries cannot reverse an already-lost final noncommander; retained end-of-combat loss priority. Reran full suite after this final runtime change.
7. Added runtime long-frame and full queue-drain checks; reran affected custom checks successfully. Updated task and review handoff.

8. Director browser review asked whether gray robot sprite was a helper. Confirmed recovered object 460 is named ground bot with animations 0/1/3; source ground spawners have separate IDs. Added explicit source-name regression and reran affected checks.

## Verification

| Check | Result | Evidence |
| --- | --- | --- |
| node tools/dev.cjs test | pass | Syntax 37 scripts, project, breeding, all-nine recreation, custom missions, vents, music, tooling and director disposable checks. |
| node tools/check-custom-missions.cjs | pass | Relay Breaker plus Last Convoy finite queue/objective/runtime regressions, rerun after added long-frame/full-drain assertions. |
| Live browser | partial pass | [Smoke record](../playtests/2026-10-04-custom-last-convoy.md); hidden IAB at loopback port 2105. |

## Unresolved issues and risks

No open scope questions or known implementation failures. Full manual 120-second survival/cleanup, balance and audible playback remain unverified. Simulation long-frame assertions establish scheduler/objective correctness, not complete live playability. Assets and source installation unchanged; no publication.

## Next action / handoff

Director independently reviews scoped diff and evidence, then squash-integrates if accepted. Worker stops at Review; no merge performed. Exact branch source commit is the commit containing this session (obtain with git rev-parse feature/custom-last-convoy). After integration director records final squash SHA in its administrative checkpoint. Next review command: git diff main...feature/custom-last-convoy; rerun node tools/check-custom-missions.cjs as needed.
