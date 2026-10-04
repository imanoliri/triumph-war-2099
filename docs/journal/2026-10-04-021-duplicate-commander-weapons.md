# 2026-10-04 / 021 — duplicate-commander-weapons

- Task: [duplicate-commander-weapons](../tasks/duplicate-commander-weapons.md)
- Date: 2026-10-04 (Europe/Berlin)
- Branch: fix/duplicate-commander-weapons
- Starting commit: 0a45b8c8473e279cfab11a02849ebfc57207879c
- Status: Review

## Starting context

Read AGENTS, WORKER, task/session020 and pickup/commander AI implementation. Initial edits were director task/session020; preserved. Created own session021. User requests commanders not consume their current weapon; next cannon task is excluded.

## Work performed

Added explicit pickup weapon identities: auto0, flame/rapid1, plasma2. Commanders reject matching identities at pickup entry before equipment, score, particles or audio effects; default auto is included. Commander AI filters those duplicate weapons from nearby goals, preserving useful different guns and reinforcement/grenade behavior. Existing troop matching-weapon collection is unchanged.

Regression covers all four commander IDs and each alias through direct function/no-side-effect assertion plus actual update/contact removal path. Different-weapon contact switches and awards normal score. A soldier collects the preserved commander duplicate; matching soldier pickup, grenade and eagle behavior remain. AI bypasses nearer duplicate for needed plasma upgrade or available support. Updated DESIGN, Controls and STATUS.

## Chronological log

- Inspected current weapon values, pickup side effects and AI nearest-pickup search.
- Added shared duplicate classification and early rejection/AI filtering.
- Added focused contact/switch/collector/AI regressions and descriptions.
- Full node tools/dev.cjs test passed.

## Verification

| Check | Result | Evidence |
| --- | --- | --- |
| node tools/dev.cjs test | passed | Full syntax/project/simulation/music/disposable tooling/director suite; new all-four commander/alias contact checks and AI choice pass. |
| Live weapon collection | unverified | Worker used VM simulation, no new live playtest supplied. |

## Unresolved issues and risks

No failures/questions. Existing weapon aliases/lifetimes and noncommander behavior remain. Broad live gameplay/audio remains unverified. No decoded assets or cannon behavior changed.

## Next action / handoff

Director independently reviews duplicate rejection before side effects and AI filtering, then squash-integrates if accepted. Worker stops at Review; no merge/publication. Implementation SHA is the commit containing this journal (git log -1). Resulting main squash SHA goes in subsequent director checkpoint.
