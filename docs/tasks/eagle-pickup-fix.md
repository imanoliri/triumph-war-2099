# Fix rendered reinforcement eagles that cannot be collected

- Ticket: TRI-012; state in [local board](../BOARD.md).
- Branch: not started

## Goal and user-visible outcome

Fix rendered reinforcement eagles that cannot be collected

## Acceptance criteria

- [ ] Reproduce a visible unpickable reinforcement eagle, fix its cause without bypassing legitimate support constraints, and add relevant regressions.

## Scope and decisions

User reported on 2026-10-04 that some rendered reinforcement eagles cannot be picked up, seemingly at random, and requested a bug fix. Inspect source support eligibility, spawning, collision/interaction and the recent attack-move behavior before selecting a fix. Preserve legitimate population/support constraints and original recovered data; do not silently change reinforcement balance. Correct invalid spawning/rule selection or interactions as supported by reproduction. Record any remaining intentional temporary rejection clearly in current descriptions. Preserve explicit orders, turret priorities, commander AI defaults and tactical startup. No asset regeneration or publication.

- Add deterministic regressions for the actual cause and adjacent pickup paths; run full checks.
- Keep simulation results separate from browser checks; update relevant docs and session handoff.

## Sessions

