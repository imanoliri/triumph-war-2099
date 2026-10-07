# Aggressive and reactive alien AI with acoustic awareness

- Ticket: TRI-064; state in [local board](../BOARD.md).
- Branch: `feature/aggressive-reactive-alien-ai`

## Goal and user-visible outcome

Enhance alien bug AI combat responsiveness with acoustic awareness and pack coordination. Hostile bugs react to nearby weapon fire and nest damage events within ~280px, reduce wander/pause breaks during active combat, and alert adjacent nest/bug packs to swarm identified human threats.

## Acceptance criteria

- [x] Bug AI responds to nearby gunfire and nest damage sound events within 280px, reduces wander/pause breaks during combat, and alerts adjacent bugs to swarm active threats.
- [x] Automated unit test / regression checks pass via `node tools/dev.cjs test`.

## Scope and decisions

- Acoustic awareness: when human weapons fire or nests take damage, sound events alert idle/wandering bugs within 280px radius (accounting for terrain obstruction / line-of-sight acoustics).
- Combat focus: bugs engaged in combat skip random wander/pause breaks and maintain active pursuit mode.
- Pack alerting: when a bug perceives or takes damage from a human unit, it emits a pack alert to adjacent bugs within 160px.
- Preserves original game difficulty scaling and mission balance isolation.

## Sessions

- [2026-10-07-005-aggressive-reactive-alien-ai.md](../journal/2026-10-07-005-aggressive-reactive-alien-ai.md)
