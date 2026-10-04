# Project status

Updated: 2026-10-04. Current maintenance task: docs/tasks/development-foundations.md.

## Checkpoints

- `milestone-playable-2026-10-04` preserves eab0bb0: the playable state through rally flags before this maintenance task.
- Local main was advanced to that milestone. `initial-recreation` retains the original development history.
- `chore/development-foundations` introduces project/session instructions, portable commands, verification workflow and initial module extraction. See its task/session record for verification and merge state.
- Git origin is configured for imanoliri/triumph-war-2099. This maintenance task has not published to GitHub or changed repository visibility. Prior publication/visibility decisions remain unresolved; check actual remote state before publishing.

## Implemented

Nine recovered maps/sprites/audio/MIDI; commander controls with German physical keys; selection/attack-move/force/focus/use orders; terrain-aware randomized AI; burst fire; commandos/red bugs; tank sweeps; support/respawn; enemy-only barrels; Units manual; visible mission progress; tactical pause; yellow/bronze/BLITZ rally flags excluding commandos.

## Verification distinction

The mocked simulation checks cover all nine missions and recent controls/support behavior. Music checks verify scheduling with mocked audio. Live browser rendering, audible matching and broad balance playtests remain unverified in the current tool environment. The user's own play reports informed fixes but are not a recorded comprehensive acceptance pass.

The reported mission-not-finishing issue was not reproduced as a universal completion failure. All nine completion fixtures pass; off-map births and carrier wave accounting were corrected. Keep TRI-001 open until the live scenario is reproduced or a full acceptance pass establishes resolution.

## Important gaps

- Source fidelity: no editable original MMF project recovered; event translation remains partial. Grenade travel, hazards, joysticks/gamepads and some support/wave timing are approximate or unfinished.
- Music: original MIDI data is present; sample envelopes/effects/controllers differ. Optional Windows bank is ignored and machine-local.
- Recovery: pipeline targets version 2.3 binary chunk layout. The complete pipeline was rehearsed successfully in an isolated checkout against the installed v2.3 executable; regenerated data matches shipped assets semantically. Ordinary development uses shipped assets.
- Modularization: balance, mission progress and rally helpers are extracted. Combat, orders/input, support integration and most rendering still live in game.js; split gradually under TRI-003.
- Publishing: original asset authorship is preserved; no new asset license is granted. The remote publication scope/visibility needs an explicit decision. CI/templates are prepared locally and activate after publication.

## Next recommended work

1. Run and record the browser acceptance checklist, especially victory, rally behavior and pause UI.
2. Extract combat/burst logic as one behavior-preserving task.
3. Resolve publication scope/visibility, then publish and transfer local backlog items to GitHub Issues.

Use BACKLOG for item scope and WORKFLOW for starting a fresh branch/chat. Do not use the old conversation as the only source of instructions.
