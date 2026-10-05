# 2026-10-05 / 019 — desert-charging-worm

- Task: [desert-charging-worm](../tasks/desert-charging-worm.md), TRI-035
- Branch: feature/desert-charging-worm
- Checkout: C:/Users/user/Documents/Codex/2026-10-03/he/outputs/triumph-desert-charging-worm
- Starting commit: 8b5737696813cb2f44fbba45e5d0973a2df90432
- Status: Review

## Starting context

Used the director-prepared initial session, read AGENTS/WORKER/task/ARCHITECTURE/PLAYTEST. Only prepared task/session metadata existed; no implementation. Approved bounded custom unit, cardinal charge and immunity; dormant until TRI-036. No original-game research, original assets, board, other worktree or installed game modified. No delegation or publication.

## Work performed

Created dependency-free desert-worm module with explicit immutable defaults, creation/body clearance, underground approach, exposed committed warning, cardinal straight charge and exposed recovery. Runtime keeps actors in aliens once for completion and kill accounting, skips ordinary spit/evolution AI, protects damage/kill/AI/manual focus/projectile paths underground and draws authored custom geometry. Shared navigation uses stable inflated footprint policy and revision; 2 px movement substeps prevent thin-wall tunneling and never destroy walls/doors. Ground contact applies 2 damage once per target per charge; air is excluded and existing shields apply. Existing loaders place zero worms.

Initial tuning: 16 HP; 60 px/s burrow; 1 s minimum burrow; 180 px trigger; lane cross-offset <=8 px and clear approach required; 1.2 s warning; 300 px/s, 260 px charge; 24 px body clearance; 1.5 s recovery. Defaults are initial custom balance, not calibrated/source-derived. DESIGN and Units manual describe them. DESIGN documents serializable telegraph lock/countdown contract for TRI-040, custom geometry provenance and excluded mechanics. ARCHITECTURE records callbacks/ownership.

Added focused VM lifecycle/draw-command tests, real runtime combat/isolation fixtures, runtime load-order checks and test-runner entry. Added standalone two-route loopback preview server and one-charge interactive sandbox, separate from runtime missions.

## Chronological log

1. Implemented custom lifecycle and integration without asset generation or original research. No image skill used: these visuals are code-native authored canvas shapes. Read computer-use skill during availability investigation; actual browser automation used the provided browser surface, no native Windows control.
2. Initial integration projectile assertion failed because test stayed in briefing; corrected fixture to playing. A broad loader string edit accidentally affected check-vents readFileSync encoding; restored that unrelated file and reran. Both failures are resolved.
3. Director early review requested drawn-body/footprint alignment, obstacle detour and meaningful cardinal threat against stationary diagonal targets. Reduced body geometry to fit physical footprint, supplied stable inflated navigation callback, aligned before warning and checked unobstructed cardinal approach. Added deterministic rock-detour/alignment and locked-target dodge evidence.
4. Hidden in-app browser available; visible=true is unsupported in workers. Live module gallery and locked-warning dodge inspected. Initial exploratory repeating cycle eventually reacquired and hurt the moved troop; bounded sandbox to one charge and reran, yielding HP8 dodged / HP6 stationary at recovery.
5. Final review found prior focus could still pursue a reburrowed actor; added new-focus rejection and prior-focus drop plus regression. Required suite rerun after this change.

## Verification

| Check | Result | Evidence |
| --- | --- | --- |
| node tools/dev.cjs test | pass | Syntax, portable references, breeding, full runtime, all custom mission/profile/pressure/terrain checks, vents, worm lifecycle, music, tooling and director disposable fixtures. |
| Focused worm fixtures | pass | Four cardinal directions, committed target movement/dodge, one hit per ground target, air exclusion, recovery/reburrow, spawn footprint, full dt thin-wall stop, rock detour and aligned stationary diagonal warning; phase-specific draw commands and save/restore. |
| Runtime integration | pass | Creation, underground damage/kill/grenade/support immunity, manual focus drop, sight/click exclusion, bullet passthrough, exposed hit/death/score; all nine originals and all registered custom missions have zero worms. Existing suite validates aiming/controls/barrels etc. |
| Live browser sandbox | bounded pass | [Report](../playtests/2026-10-05-desert-worm.md): authored phase art/warning, diagonal dodge HP8 and stationary contact HP6 in one charge. No mission/audio/calibrated balance claim. |
| git diff --check | pass | No whitespace errors. |

## Unresolved issues and risks

No blocking questions. Activation, desert terrain identity, convoy roster/evasion and numerical balancing in real mission context remain later tickets. Default custom tuning has not been calibrated. Live checks are standalone-module evidence; full mission rendering/audio/playability was not tested. Browser version not exposed and screenshots inspected through tool were not persisted as binaries. Worm footprint is deliberately conservative (square); navigation grid adds its existing padding.

## Next action / handoff

Director independently reviews feature/desert-charging-worm HEAD and this session, then squash-integrates if accepted. Worker stops at Review, no merge/publish. Implementation commit subject: Add dormant desert worm with telegraphed cardinal charges. Resolve exact review SHA with `git rev-parse feature/desert-charging-worm`; director receives it in Review report and records subsequent squash SHA in integration checkpoint. TRI-036 can use internal `spawnDesertWorm(x,y)` in its opt-in placement path; invalid full-body positions return null. TRI-040 consumes DESIGN telegraph contract. Reproduce bounded visuals with `node tools/worm-preview.cjs` and http://127.0.0.1:2135/. No squash SHA yet.
