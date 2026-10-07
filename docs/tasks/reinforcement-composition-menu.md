# Configure future ground and air eagle squads during missions

- Ticket: TRI-072; state in [local board](../BOARD.md).
- Branch: not started

## Goal and user-visible outcome

Configure future ground and air eagle squads during missions

## Acceptance criteria

- [ ] During a mission, configure separate ground and air troop compositions in a menu; future eagle pickups use the current matching selection until changed

## Scope and decisions

User decisions on 2026-10-07: open a menu/modal during the mission, edit the desired reinforcement composition, and apply it to all future matching eagle pickups until changed again. Ground troop and air reinforcement eagles have separate compositions. The chooser is opened deliberately during play, not automatically on eagle collection. Already requested/inbound reinforcements retain their composition. Preserve support availability and population-cap rules. Planning only; no worker dispatch until user authorizes queue execution. Open design details: squad-size limits, eligible unit types by mission, and pause behavior while menu is open.

## Sessions


