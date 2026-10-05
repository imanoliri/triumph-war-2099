# Gamepad controls

- Ticket: TRI-007; state in [local board](../BOARD.md).
- Branch: `feature/gamepad-controls`

## Goal and user-visible outcome

Explicit direct commander control using standard-mapping browser gamepads, with keyboard/mouse retained and clear connection/help status.

## Acceptance criteria

- [x] Adopt standard-mapping controllers and documented mapping; preserve keyboard/mouse and asymmetric aiming.
- [x] Verify unplug/reconnect, explicit one-controller/commander ownership and mixed-input transitions with API and production-frame fixtures.
- [x] Handle dead zones, edge actions, tactical/modal/focus transitions, restart and neutral cleanup; expose help and unsupported status.
- [x] Complete final automated suite; browser smoke is recorded separately and physical-controller support remains unverified.

## Scope and decisions

Approved bounded implementation below. No dependencies, assets, original-game research or publication. API/VM fixtures establish logic; hardware model compatibility requires separate physical checks.

## Autonomous mandate and bounded design — 2026-10-05

User authorized reasonable design decisions to finish the queue. Implement browser Gamepad API standard-mapping controllers without dependencies. Adopt left stick movement, right stick aiming, right trigger fire, left trigger grenade, A interact, D-pad orders, Start tactical toggle, and bumpers cycle explicit commander selection. Select one controller/commander ownership at a time; preserve AI-default commanders, keyboard/mouse, German physical-key controls and existing asymmetric aim. Expose a concise mapping/help and connection status. Handle dead zones, edge-triggered actions, pause/modals, disconnect/reconnect and neutral input cleanup. Nonstandard controllers require explicit unsupported status rather than guessed mappings. Test API fixtures; real physical controller checks are separate and may be unavailable. Do not claim hardware support verified from mocks.

## Sessions

- [2026-10-05 / 039 — director review/integration](../journal/2026-10-05-039-director-queue.md)

- [2026-10-05 / 040](../journal/2026-10-05-040-gamepad-controls.md)
