# Attack-move eagle collection and turret mounting

- Ticket: TRI-010; state in [local board](../BOARD.md).
- Branch: `feature/attack-move-interactions`

## Goal and user-visible outcome

Attack-move eagle collection and turret mounting

## Acceptance criteria

- [x] Attack-moving soldiers collect nearby route eagles and mount nearby usable plasma turrets, with the requested enemy-dependent priority.

## Scope and decisions

Approved by the user request on 2026-10-04. Preserve unrelated assets, combat conventions and German physical-key controls; no publication.

- Use a short reachable proximity near the route, without broad detours. Preserve explicit orders and occupied-turret handling. Record exact distance choices.
- Clear area: eagles before turrets. Nearby enemies: usable turrets before enemy attacks. Update gameplay docs and focused regressions.

## Sessions


- [2026-10-04 / 009](../journal/2026-10-04-009-attack-move-interactions.md)
- [2026-10-04 / 010](../journal/2026-10-04-010-attack-move-interactions.md)
