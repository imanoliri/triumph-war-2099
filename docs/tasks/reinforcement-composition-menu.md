# Configure future ground and air eagle squads during missions

- Ticket: TRI-072; state in [local board](../BOARD.md).
- Branch: not started

## Goal and user-visible outcome

Configure future ground and air eagle squads during missions

## Acceptance criteria

- [ ] During a mission, configure separate ground and air troop compositions in a menu; future eagle pickups use the current matching selection until changed
- [ ] Both ground and air composition choices are restricted to the current mission world roster; unavailable types cannot be selected or applied.
- [ ] Opening the reinforcement menu pauses gameplay; closing it automatically resumes play without a separate resume action.
- [ ] Preserve the existing squad size for each ground/air reinforcement configuration; let the player choose the soldier type for each slot without increasing the number of delivered troops.

## Scope and decisions

User decisions on 2026-10-07: open a menu/modal during the mission, edit the desired reinforcement composition, and apply it to all future matching eagle pickups until changed again. Ground troop and air reinforcement eagles have separate compositions. The chooser is opened deliberately during play, not automatically on eagle collection. Already requested/inbound reinforcements retain their composition. Preserve support availability and population-cap rules. Planning only; no worker dispatch until user authorizes queue execution. User confirmed that available soldier types must be limited to the current mission world roster for both ground and air settings. Do not offer all unlocked types across worlds. User confirmed that opening the reinforcement menu pauses gameplay and closing it automatically resumes play. User confirmed keeping the existing squad size and choosing the soldier type for each slot, separately for ground and air compositions. All raised menu design questions are resolved; implementation remains queued pending user authorization to execute.

## Sessions






Execution authorization 2026-10-07: user requested agents executing tickets one by one; earlier planning-only pause is revoked.

