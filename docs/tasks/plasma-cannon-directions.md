# Give plasma cannons 16-direction fire for every operator

- Ticket: TRI-016; state in [local board](../BOARD.md).
- Branch: `fix/plasma-cannon-directions`

## Goal and user-visible outcome

Give plasma cannons 16-direction fire for every operator

## Acceptance criteria

- [x] Mounted plasma cannons aim and fire in 16 directions regardless of operator type; unmounted aiming rules remain intact.

## Scope and decisions

User explicitly requested on 2026-10-04 that plasma cannons always shoot in 16 directions regardless of the manning soldier type. Apply 16 equally spaced direction quantization to mounted cannon aiming AND emitted projectile heading for all supported operators (regular infantry and commandos), preserving source sprite coordinates, cardinal normal infantry and diagonal on-foot commando fire. Preserve turret range, plasma damage, burst/cooldown, mounting/dismounting and attack-move priorities. Update DESIGN and Units/Controls descriptions; focused angle/operator/dismount regressions plus full checks, durable handoff. No asset regeneration or publication.

## Sessions


- [2026-10-04 / 022](../journal/2026-10-04-022-plasma-cannon-directions.md)
- [2026-10-04 / 023](../journal/2026-10-04-023-plasma-cannon-directions.md)
