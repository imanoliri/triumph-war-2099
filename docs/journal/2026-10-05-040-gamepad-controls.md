# 2026-10-05 / 040 — gamepad-controls

- Task: [gamepad-controls](../tasks/gamepad-controls.md)
- Date: 2026-10-05 (Europe/Berlin); session 040 across all features that day
- Branch: `feature/gamepad-controls`
- Starting commit: `3b799a171cfa57c4f293876643ce842d42b717b3`
- Status: Review ready

## Starting context

Prepared isolated worktree contained only approved task/session metadata; no existing gamepad implementation or unrelated edits.

## Work performed

Added standard-mapping adapter, explicit ownership/neutral rearming, runtime polling/step wiring, connection status and Controls help. Added focused disposable fixtures and real runtime frame integration. Updated DESIGN, ARCHITECTURE and PLAYTEST without changing assets or existing input module.

## Chronological log

Implementation/review events and verification are recorded below; no original-game research performed.

## Verification

| Check | Result | Evidence |
| --- | --- | --- |
| Focused API fixtures | pass | node tools/check-gamepad.cjs: ownership/aim/actions/transition/reconnect/restart/mixed mapping |
| Production frame integration | pass | Real gamepad adapter + runtime VM: tactical selection/resume, diagonal bullet, status, disconnect; director independently passed clean-prefix probe |
| Full automated suite | pass | node tools/dev.cjs test, final handle 57605 exited 0; preceding fixture failure corrected as recorded below |
| Live browser smoke | pass within recorded scope | [Chrome no-controller smoke](../playtests/2026-10-05-gamepad-controls.md) |
| Physical controller/audio | not run | No controller attached; no hardware compatibility or audio claim |

## Unresolved issues and risks

No open scope question or test failure. Physical gamepad behavior/controller model compatibility remains unverified. Browser smoke did not independently measure keyboard movement or mouse combat.

## Next action / handoff

Director: review the scoped HEAD on feature/gamepad-controls in this checkout; inspect src/gamepad.js ownership/neutral gates, existing-input preservation, actual-frame probe and browser/hardware limits. All acceptance criteria met within authorized API-fixture scope; final suite exited 0. Worker stops at Review and must not merge/publish. Director reviews and squash-integrates; record resulting main squash SHA in a later checkpoint. No squash commit exists yet.

## Implementation decisions

New explicit-service gamepad module polls each render frame, including tactical pause. Connection never selects a commander; a bumper edge claims one controller. Mouse selection changes revoke ownership. Neutral input rearms after selection, pause, dialogs and focus loss. Keyboard/mouse module remains unchanged; runtime adds pad movement/aim/fire to the explicitly selected commander only. Standard mapping only; unsupported mappings expose status. No hardware verification claimed.

- Full-suite handle 85210 exited 1 because its recreation fixture loaded before the Start initialization correction: expected commander 1, got null in briefing. Added explicit Start plus playing/tactical assertions. Director and worker clean-prefix production-frame probes pass after correction. Final full-suite handle 57605 exited 0; output in ignored work-gamepad-tests.log. All runtime/module/custom/music/tooling/director checks passed.
- Browser smoke completed through connected Chrome with no attached controller. Visible disconnected status, mapping help, mouse commander selection, keyboard Space tactical toggle, modal restoration and battlefield rendering pass. Movement/combat was not independently measured. Report: [browser smoke](../playtests/2026-10-05-gamepad-controls.md). Physical gamepad and audio remain not run.

## Chronological evidence

- Implemented src/gamepad.js and production frame wiring, status/help, runtime load-order fixture and dedicated service fixtures. Existing keyboard/mouse module is unchanged.
- Director early review found tactical D-pad suppression; corrected to allow queued order edges while guarding simulation actions. Direct step also guards modal/focus/mode independently of frame poll. Radial stick magnitude scales movement speed because runtime move normalizes direction.
- Dedicated fixtures pass ownership, dead zone, free/cardinal aim, edge interactions/grenades, tactical orders, neutral rearming, modal/focus stale-sample gating, two controllers, mouse takeover, disconnect/reconnect and mission replacement.
- Final full suite started after runtime integration wiring. Added a physical-gamepad checklist to PLAYTEST. The later Chrome smoke is recorded above; physical gamepad/audio remain unverified.
