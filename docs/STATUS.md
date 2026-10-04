# Project status

Updated: 2026-10-04. Latest integrated gameplay tasks: commander selection (TRI-009), attack-move interactions (TRI-010) and tactical mode (TRI-011). All three passed independent director review and were squash-integrated; integration commits are recorded in BOARD.

## Checkpoints

- `milestone-playable-2026-10-04` preserves eab0bb0: the playable state through rally flags before this maintenance task.
- Local main was advanced to that milestone. `initial-recreation` retains the original development history.
- `chore/development-foundations` introduced project/session instructions, portable commands, verification workflow and initial module extraction; it was fast-forwarded into local main after maintenance review. The branch and milestone history are retained.
- Git origin is configured for imanoliri/triumph-war-2099. This maintenance task has not published to GitHub or changed repository visibility. Prior publication/visibility decisions remain unresolved; check actual remote state before publishing.

## Merge policy

All accepted task branches now squash-merge into main as one commit per task. Earlier fast-forward history and milestone tags are retained; this policy does not rewrite existing history.

## Session context

Chronological session journals use `docs/journal/YYYY-MM-DD-NNN-feature-name.md`, with Berlin dates and daily numbering across features. Each task links its sessions; journals preserve context, verification and the next-action handover. See WORKFLOW.

## Implemented

Nine recovered maps/sprites/audio/MIDI; all four commanders use AI unless explicitly selected, with troop-control default and German physical keys; selection/attack-move/force/focus/use orders, soldier route-side eagle collection and enemy-dependent turret priority; terrain-aware randomized AI; burst fire; commandos/red bugs; tank sweeps; support/respawn; enemy-only barrels; Units manual; visible mission progress; tactical mode with startup freeze and blue-green visor; yellow/bronze/BLITZ rally flags excluding commandos.

## Verification distinction

Full project/simulation/music/tooling checks passed both in the working checkout and a clean export of tracked source without the local bank. The mocked simulation checks cover all nine missions and recent controls/support behavior. Music checks verify scheduling with mocked audio. The director recorded limited live browser commander selector/toggle UI checks; full AI, attack-move interaction and balance playtests remain unverified. The director checked tactical-mode start/restart visuals, mode button toggling, Controls/Units restoration and a 390×844 viewport; limited live queued movement and mission-selector deployment also passed. Details are in the [limited browser playtest](playtests/2026-10-04-commanders-tactical-mode.md) and tactical-mode session. Audible matching remains unverified. The user's own play reports informed fixes but are not a recorded comprehensive acceptance pass.

The reported mission-not-finishing issue was not reproduced as a universal completion failure. All nine completion fixtures pass; off-map births and carrier wave accounting were corrected. Keep TRI-001 open until the live scenario is reproduced or a full acceptance pass establishes resolution.

## Important gaps

- Source fidelity: no editable original MMF project recovered; event translation remains partial. Grenade travel, hazards, joysticks/gamepads and some support/wave timing are approximate or unfinished.
- Music: original MIDI data is present; sample envelopes/effects/controllers differ. Optional Windows bank is ignored and machine-local.
- Recovery: pipeline targets version 2.3 binary chunk layout. The complete pipeline was rehearsed successfully in an isolated checkout against the installed v2.3 executable; regenerated data matches shipped assets semantically. Ordinary development uses shipped assets.
- Modularization: balance, mission progress and rally helpers are extracted. Combat, orders/input, support integration and most rendering still live in game.js; split gradually under TRI-003.
- Publishing: original asset authorship is preserved; no new asset license is granted. The remote publication scope/visibility needs an explicit decision. CI/templates are prepared locally and activate after publication.

## Next recommended work

1. Run and record the browser acceptance checklist, especially victory, rally behavior and tactical mode UI.
2. Extract combat/burst logic as one behavior-preserving task.
3. Resolve publication scope/visibility, then publish and transfer local backlog items to GitHub Issues.

Use BOARD for workflow state, linked task records for scope, and DIRECTOR/WORKFLOW for starting or recovering a worker. Do not use the old conversation as the only source of instructions.

## Director coordination

A thin local ticket board and one isolated implementation worker support director-only user interaction. See DIRECTOR and BOARD. No native GitHub issues/project synchronization is configured: issue creation required unavailable approval, saved browser permission denies GitHub, and no Projects connector/gh CLI is available. Code/assets stay unpublished.

TRI-012 eagle fix (task branch Review): deterministic Hanger random bronze creation had no eligible support rule; new random eagle creation now shares collection eligibility. Existing temporarily capped eagles remain with an availability label. All-mission random-eagle collection by commanders and soldiers is regression-covered; the user report of intermittent unpickability in every mission is not fully reproduced, and live eagle-fix playability remains unverified.

TRI-013 tactical-music fix is implemented for Review: gameplay freeze no longer drives music pause, including tactical startup and modal dialogs. Frame integration and existing scheduler/API tests verify independence; actual audible playback remains unverified.

TRI-014 closed-door routing fix (Review): the reproduced room-wall stall now routes through an unlocked door and opens it before crossing, while actual collision/locked requirements remain. Fields are isolated by stable passability policy and door-state revision. All human-type room fixtures and locked/unlock/destroyed/cache/alien regressions pass; live room-routing playtest remains unverified.

TRI-015 duplicate commander weapons (Review): matching auto/flame/rapid/plasma pickups remain without score/effects, and AI skips those duplicates. Different equipment and other collectors work as before. VM contact/AI-choice regressions cover the behavior; live collection remains unverified.

TRI-016 plasma cannon directions (Review): both mounted operator types use 16-direction aim/projectiles, while on-foot infantry/commando rules remain. Direction/boundary/mount/dismount regressions cover the behavior; live cannon rendering/audio remains unverified.
