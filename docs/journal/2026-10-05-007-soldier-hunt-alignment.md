# 2026-10-05 / 007 — soldier-hunt-alignment

- Task: [soldier-hunt-alignment](../tasks/soldier-hunt-alignment.md)
- Date: 2026-10-05 (Europe/Berlin); session 007
- Branch: feature/soldier-hunt-alignment
- Starting commit: 929408547d42dbdbe038b7b6a2115d90bda7b3f4
- Status: Review

## Starting context

Read AGENTS, WORKER, WORKFLOW, ticket and initial session. Initial checkout contained only preparation's task update and this untracked journal; preserved both. Ticket queue execution approved. No director-board writes, original-game research, delegation, asset regeneration or publication.

## Work performed

Reproduced diagonal hunt miss before correcting it: soldier (400,350), bug (510,430), a short alignment step then reaction expiry emitted one cardinal bullet despite about 77 px lateral error. Disposable assertion expected zero and failed with 1 != 0. Existing friendly-order regression explicitly expected that ineffective shot. Diagnosis: aimHuman checked direct centerline visibility rather than quantized weapon ray; alignment stopped at 10 px despite bug hit radius 8 px; heading was reused after movement.

Added humanFiringLane to check target hit-radius overlap with one-pixel margin, forward muzzle intersection, weapon reach and actual quantized projectile obstruction (terrain, doors and props). Pursuers keep sliding toward a lane or close when aligned but range/terrain blocks a shot; heading refreshes after navigation. Gate burst consumption/fire on this legal lane. Preserve target reaction tracking during approach and all rest/cadence. Defenders remain stationary and wait for legal shots. Mounted/tank early exits and sweep implementations unchanged; selected commander manual mouse aiming unchanged.

Updated DESIGN and Units descriptions. Replaced old diagonal-miss expectation; flame cadence fixture now uses an in-range target. Added stationary/moving bug, nine-pixel miss on both sides, close diagonal, wall detour, direct-sight vs actual-ray prop obstruction, flame approach, focus and soldier/robot/AI commander vs commando heading checks. Existing full suite verifies attack-move, mounted/dismounted and burst exceptions.

## Chronological log

1. Inspected clean implementation files and preparation edits; no reset/clean.
2. Established failing reproduction on original runtime before implementation.
3. Added projectile-ray eligibility and post-navigation heading refresh; corrected prior tests that demanded ineffective fire.
4. Focused fixtures and full suite passed; subsequently added wall-detour pursuit coverage and reran affected check successfully.
5. Used computer-use skill and IAB for loopback smoke: initial unopened server connection refused; started isolated preview and loaded successfully. Desert Canyon rendered, entered tactical start, resumed, and later screenshot showed active movement. Read-only application-state access was unavailable in browser scope, so did not claim controlled live hunt.
6. Completed current docs, acceptance evidence and Review handoff.

## Verification

| Check | Result | Evidence |
| --- | --- | --- |
| Pre-fix reproduction | Failed as intended | check-recreation TRI-027 assertion: expected zero, actual one cardinal bullet far off lane. |
| node tools/dev.cjs test | Passed | Syntax 40 scripts; project, simulation, custom scenarios, music, tooling and director fixtures passed, exit 0. |
| node tools/check-recreation.cjs after wall test | Passed | Stationary/moving/obstruction/range fixtures plus all existing gameplay regressions, exit 0. |
| Browser smoke | Limited pass | [playtest](../playtests/2026-10-05-soldier-hunt-alignment.md); controlled hunt/audio not verified live. |

## Unresolved issues and risks

No open scope/design questions. This correction intentionally removes ineffective AI shots for Defend/off-lane targets; defenders still hold. Target motion after a shot can still evade it. Existing navigation remains responsible for route availability; unreachable lanes cannot be invented. No generic pathfinding or balance rewrite. Simulation establishes bounded acceptance; controlled live hunt remains a verification gap.

## Next action / handoff

Director independently reviews this scoped branch/diff and evidence, optionally performs focused live hunt, then squash-integrates if accepted. Not merged or published by worker. Exact scoped commit is delivered with the Review report; director records resulting squash SHA in a subsequent checkpoint. Checkout: C:/Users/user/Documents/Codex/2026-10-03/he/outputs/triumph-soldier-hunt-alignment. Replay: node tools/dev.cjs test; TRIUMPH_PORT=8274 node serve.cjs (PowerShell use environment syntax). Worker remains available for findings.
