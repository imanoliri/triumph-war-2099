# Configure future ground and air eagle squads during missions

- Ticket: TRI-072; state in [local board](../BOARD.md).
- Branch: `feature/reinforcement-composition-menu`

## Goal and user-visible outcome

Configure future ground and air eagle squads during missions

## Acceptance criteria

- [x] During a mission, configure separate ground and air troop compositions in a menu; future eagle pickups use the current matching selection until changed
- [x] Both ground and air composition choices are restricted to the current mission world roster; unavailable types cannot be selected or applied.
- [x] Opening the reinforcement menu pauses gameplay; closing it automatically resumes play without a separate resume action.
- [x] Preserve the existing squad size for each ground/air reinforcement configuration; let the player choose the soldier type for each slot without increasing the number of delivered troops.

## Scope and decisions

User decisions on 2026-10-07: deliberately open an in-mission menu to edit separate ground and air compositions, applying them to future matching eagle requests until changed. Restrict both settings to current mission world roster; already requested/inbound support remains unchanged. Opening pauses simulation; closing automatically resumes, including from tactical mode. Ground has five slots. After runtime showed variable default air counts, user chose a repeating five-slot air pattern along its existing flight path; retain actual count/cadence/lifetime/terrain/cap. Preserve eligibility, defaults until explicit save, tank/Blitz and automatic schedules. Restart/mission replacement resets settings. Queue execution authorized.

Acceptance evidence: focused disposable VM UI/request/actual lifecycle checks and full suite (see session); complementary live UI verification belongs to director playtest record. Worker browser unavailable; worker did not verify live rendering/audio/playability.

## Sessions






Execution authorization 2026-10-07: user requested agents executing tickets one by one; earlier planning-only pause is revoked.

- [2026-10-07 / 011](../journal/2026-10-07-011-reinforcement-composition-menu.md)

User clarification 2026-10-07: air composition is a five-slot repeating pattern along the existing flight/drop path. Preserve variable actual delivered count, cadence, lifetime, terrain and caps; do not force a five-troop air limit. Ground composition uses its existing nominal five slots. Clearly label the air pattern and that flight conditions determine actual arrivals.
