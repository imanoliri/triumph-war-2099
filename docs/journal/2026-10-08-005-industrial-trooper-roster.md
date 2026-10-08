# 2026-10-08 / 005 — industrial-trooper-roster

- Task: [industrial-trooper-roster](../tasks/industrial-trooper-roster.md)
- Date:2026-10-08 (Europe/Berlin); initial session005 retained throughout dispatch
- Branch:`feature/industrial-trooper-roster`
- Starting commit:`ad64ffe332927b5b131ee3e71a47aa7554107793`
- Status: Review; implementation complete, awaiting director review/integration

## Starting context

Read AGENTS, WORKER, authoritative task and initial journal. Assigned isolated checkout is C:/Users/user/Documents/Codex/2026-10-03/he/outputs/triumph-industrial-trooper-roster. Starting changes were director preparation: task Sessions link and this initial journal; retained and completed. Director confirmed dispatch before mutations. Current main baseline contains integrated prior roster work; Jungle partial is parked and not inherited.

## Work performed

Authored Heavy Riveter and Arc Technician mechanics, exported Industrial world roster, future opted-in starting coordinate arrays, distinct recovered52-based visual marks/Units portraits, Controls, selection/order/movement/aim/terrain integration, fixed-kit exclusions, real carrier/parachute factories and cap membership. No Industrial runtime mission exists among13 custom scenarios; exported definitions plus disposable production fixtures satisfy the explicit no-new-mission rule. Existing maps, source data, scenarios, profiles, objectives, enemy budgets, initial headcounts and support payloads are unchanged.

Routine tuning documented/confirmed with director: ordinary1HP; fixed eight-direction weapons without randomized bursts; Riveter90px/s slow flight,2 damage,180px inclusive center range,1.2s interval,75% movement;10px muzzle +170px flight. Riveter-only lifetime clamp/one-pixel flight slices stop long-step overshoot and thin-wall tunneling while ordinary stepping remains unchanged. Arc instantaneous1damage/110px primary/one40px jump/1.5s recharge. Primary uses ordinary quantized lane and clear direct path. Secondary must be visible to shooter and have clear path from first; this conservative interpretation prevents hidden around-corner jumps. Snapshot one distinct secondary before primary damage lets lethal primary still jump; duplicates cannot revisit. Walls, closed doors and living props block paths; normal enemy/nest damage applies; burrowed worm excluded. No armor, repair or friendly splash introduced.

Preserved ordinary shared behavior: Follow travels toward leader but may fire legal existing lane; force/use overrides combat; Defend uses50px leash; ordinary Normal/patrol. Specialist arrivals use ordinary Normal order0, unlike Ambusher Guard default. Existing German physical keys, commander free aim, sprite/map hotspots and enemy-only barrel effects remain.

## Chronological log

1. Read policy/task/session and inspected assigned branch; awaited explicit dispatch before mutation.
2. Located no Industrial mission; told director opt-in/fixtures-only path and routine tuning. Director accepted choices and requested range/terrain/jump/order/support/isolation evidence.
3. Implemented scoped runtime/UI integration and production fixtures. Corrected fixture assumptions about Follow legal firing and ordinary arrival order using existing runtime conventions; director accepted preservation.
4. Focused checks passed. Added actual update cadence, exact8 headings, lethal-primary/duplicate identity/visibility negatives, long-step projectile isolation, Guard/closing and pending-air reservation checks. Director independent draft checks found no issue.
5. Updated current DESIGN/Controls/Units/STATUS/task and separate browser not-run record. Full suite completed exit0, including all mission/tooling/director/GitHub mirror checks. Final affected Industrial/guide/project/combat checks rerun after final range/test additions.

## Verification

| Check | Result | Evidence |
| --- | --- | --- |
| `node tools/check-industrial-troopers.cjs` | passed | Production weapon/range/cadence,180/110/40 boundaries,1.2/1.5 timing,2maximum distinct Arc hits/no revisit/lethal first, shooter visibility, rock/door/prop primary+jump blocks, Riveter long-step collision/endpoint, all8 headings,1HP/75% movement, closing/Guard/focus/attack/Follow/force/use/freeze, real carrier+air factories/caps/pending reservations, Industrial menu opt-in and all13custom+9original exclusion. |
| `node tools/check-unit-guide.cjs` | passed | Both guide portraits draw recovered52 frames plus distinct runtime marks, exact runtime command parity, existing portraits/cards retained, cold-cache repaint. |
| `node tools/dev.cjs test` | passed; exit0 | Syntax93 scripts and complete project/baseline/input/support/menu/specialist/rendering/mission/audio/tooling/director/GitHub mirror suite; all passed. |
| `git diff --check` | passed | No whitespace errors. |
| Live browser playtest | not run | [Separate absence/limits](../playtests/2026-10-08-industrial-troopers.md); no browser rendering/audio/hardware/live timing/balance claim. |

## Unresolved issues and risks

No material design question remains. Industrial has no shipped mission; no live timing/render/audio/order/delivery/human-balance verification. Future authored Industrial mission must explicitly opt into roster/coordinates and obtain live evidence. VM checks use disposable in-memory Industrial metadata over an existing fixture and have no production write access. Director controls integration/publication; branch is not merged or published.

## Next action / handoff

Scoped implementation commit is the tip of `feature/industrial-trooper-roster` with subject `Add opt-in Industrial Riveter and Arc Technician roster`; resolve its exact SHA using `git rev-parse HEAD` in the assigned checkout. Exact SHA is also reported to director after commit. This record is included in that commit and cannot self-embed its own hash. Director should review numerical/path/order/factory contracts and opt-in isolation, then decide squash integration; record resulting main squash SHA in the director integration checkpoint. No merge/publication performed and no squash SHA exists yet. All acceptance criteria met through implementation/simulation evidence; live limitations above remain.
