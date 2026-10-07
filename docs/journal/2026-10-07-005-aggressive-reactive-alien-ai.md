# 2026-10-07-005 Aggressive and reactive alien AI with acoustic awareness (TRI-064)

- **Branch**: `feature/aggressive-reactive-alien-ai`
- **Worktree**: `C:\Users\user\Documents\Codex\2026-10-03\he\outputs\triumph-aggressive-reactive-alien-ai`
- **Ticket**: `TRI-064`

## Goal
Implement acoustic awareness (280px gunfire/nest damage perception), combat pause reduction, and pack alerting (160px swarm alerts) for alien AI.

## Implementation Details
1. **Acoustic Awareness (`emitAcousticEvent(origin, radius = 280)`)**:
   - Added global `emitAcousticEvent(origin, radius)` in `game.js`.
   - When human weapons fire or nests/props explode/take damage (`fire`, `stepProjectiles`, `destroyProp`, `grenade`, `supportExplosion`), sound events wake up idle/wandering bugs within 280px with clear line of sight (`visible(a, soundOrigin)`).
   - Woken bugs turn toward the sound origin and set `mode: 'approach'` to investigate or engage human units perceived at the sound location.

2. **Pack Alerting (`alertPack(sourceBug, threat, radius = 160)`)**:
   - Added `alertPack(sourceBug, threat, radius)` in `game.js`.
   - When a bug perceives a human target in `update(dt)` or takes damage in `damage()`, it alerts adjacent bugs within 160px radius.
   - Alerted bugs set target focus on the threat and switch to pursuit mode (`mode: 'approach'`).

3. **Combat Focus & Wander Break Reduction**:
   - Updated `bugIntent(a, target, dt, mult)`: when a bug has an active target lock (`a.ai?.target`), it eliminates random wander/pause breaks and maintains continuous approach/attack mode.
   - When no target is locked, `bugIntent` preserves baseline random wander/pause/approach rolls for ambient behavior.

4. **Automated Verification**:
   - Added automated unit test suite for TRI-064 in `tools/check-recreation.cjs`.
   - Safely exposed `alertPack` and `emitAcousticEvent` on window fixture (`sandbox.window.__fixture()`) using `typeof` guards for oracle diff compatibility.
   - Verified that all baseline checks (1-55), gamepad, breeding, custom missions, and new TRI-064 regression checks pass cleanly via `node tools/dev.cjs test`.

## Evidence & Verification
- `node tools/dev.cjs test` passed cleanly with 0 failures:
  - `Passed TRI-064 aggressive and reactive alien AI with acoustic awareness, combat focus and pack alerting.`

## Limitations & Handoff State
- No live browser rendering/audio playback verified (checked via offline Node test environment per `PLAYTEST.md` guidelines).
- Stopped at Review on branch `feature/aggressive-reactive-alien-ai`.
- Ready for director review and squash-merge into `main`.
