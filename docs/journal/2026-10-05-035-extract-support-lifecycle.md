# 2026-10-05 / 035 — extract-support-lifecycle

- Task: [extract-support-lifecycle](../tasks/extract-support-lifecycle.md)
- Date: 2026-10-05 (Europe/Berlin); session 035
- Branch: `chore/extract-support-lifecycle`
- Starting commit: `1e866aafd06268e6dc47ae3b791b5a2dd2e1dad0`
- Status: in progress

## Starting context

Prepared checkout had only the approved task/session metadata edits. Worker read AGENTS, WORKER, task and this initial session; resumed the prepared branch without reset or a duplicate session.

## Work performed

Extracted `src/support-lifecycle.js` with a current-state getter and named source/path, navigation, RNG, unit, rally, collision, world combat/damage/kill and audio services. Support-only initialization, source creation eligibility, carriers, aircraft, infiltration, drops, scheduled reservations and commander return live there. Runtime world initialization, pickup-roll generation, custom waves, mission progress and damage accounting remain outside. Added script/fixture/load-order wiring and architecture boundaries. No source assets, gameplay constants, balancing, public API or mission gate changes.

## Chronological log

- Director assigned TRI-044 to this prepared worktree and initial session; boundary confirmed as support-owned initialization only.
- Initial suite caught a callback initialization ordering issue (`assignRally` const); corrected by passing a deferred named callback.
- Added fail-loud immutable baseline injection at starting commit, missing/duplicate-anchor guard tests, and six seeded full-state/reference-alias lifecycle comparisons. Fixture correction used the real custom mission ID and existing tactical startup; full alias snapshots avoid circular public snapshot serialization after AI targets develop.
- Focused `node tools/check-support.cjs` passed (handle 27669). Final module cleanup removed unused runtime wrappers/private exports; final full suite pending below.

## Verification

| Check | Result | Evidence |
| --- | --- | --- |
| Immutable lifecycle | passed before final cleanup | Six seeds/missions; source eligibility, cap retry, delivery/departure, scheduled cap hold and one-slot reservation, return/death, tactical freeze, restart/current-state replacement; full world and reference alias comparison |
| Full automated suite | pending final run | Initial run handle 24643 proceeded through source support, combat/input baselines and custom mission regressions; final run recorded below |
| Live browser playtest | not run by worker | No live rendering, audio or playability claim. Director owns independent browser smoke/review; VM evidence is separate. |

## Unresolved issues and risks

No scope questions. Immutable checks require the full Git history already required by prior extraction fixtures. Live browser/audio evidence remains separate from simulation evidence.

## Next action / handoff

Run final `node tools/dev.cjs test`, record results, mark acceptance, scoped commit, and stop at Review for director inspection/squash integration. No merge or publication by worker.
- Final full-suite command started as exec session 33458; recover by polling that handle if still active, otherwise rerun only if its final result is unavailable.
- Initial full suite 24643 exited 0. Final run 33458 is checking the cleaned boundary plus registered support baseline. Added five subsequent bug spawns to the comparison as an observable RNG-continuation guard before the final run reached that check.
- Final suite 33458 passed recreation plus immutable combat and input checks; registered support comparison now runs with RNG continuation after deliveries and after replacement reinforcement. No active browser session started by worker.
