# Gamepad controls

- Ticket: TRI-007; state in [local board](../BOARD.md).
- Branch: not started

## Goal and user-visible outcome

Gamepad controls

## Acceptance criteria

- [ ] Agree mappings and supported controllers; preserve keyboard/mouse; verify unplug/reconnect and multi-player ownership

## Scope and decisions

Backlog proposal. Agree bounded scope and verification with the user before Ready. TRI-003 is an umbrella; split into one system per approved task before execution.

## Sessions

## Autonomous mandate and bounded design — 2026-10-05

User authorized reasonable design decisions to finish the queue. Implement browser Gamepad API standard-mapping controllers without dependencies. Adopt left stick movement, right stick aiming, right trigger fire, left trigger grenade, A interact, D-pad orders, Start tactical toggle, and bumpers cycle explicit commander selection. Select one controller/commander ownership at a time; preserve AI-default commanders, keyboard/mouse, German physical-key controls and existing asymmetric aim. Expose a concise mapping/help and connection status. Handle dead zones, edge-triggered actions, pause/modals, disconnect/reconnect and neutral input cleanup. Nonstandard controllers require explicit unsupported status rather than guessed mappings. Test API fixtures; real physical controller checks are separate and may be unavailable. Do not claim hardware support verified from mocks.

