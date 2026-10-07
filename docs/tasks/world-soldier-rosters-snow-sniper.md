# Environment world soldier rosters and 360-degree Snow Sniper unit

- Ticket: TRI-066; state in [local board](../BOARD.md).
- Branch: `feature/world-soldier-rosters-snow-sniper`

## Goal and user-visible outcome

Implement environment-specific soldier roster availability across custom scenarios, and introduce the Nivalis Snow Sniper specialist unit for snow/arctic environments.

## Acceptance criteria

- [x] Scenario world troop availability defines scenario specialists per environment, including the Nivalis Snow Sniper unit with 360-degree unconstrained aiming, 480px range, 4 damage, and Whiteout Signal deployment.
- [x] Automated unit test / regression suite checks pass via `node tools/dev.cjs test`.

## Scope and decisions

- Snow Sniper (`snow-sniper`) unit characteristics:
  - 360-degree unconstrained continuous aiming (free cursor/target angle, ignoring cardinal 8-way quantization).
  - Effective standoff range: 480px.
  - High damage sniper rifle: 4 damage per shot, slow reload/cooldown (~1.2s).
  - Optics visor / white camouflage visual rendering.
  - Opt-in environment deployment in `custom-snow-whiteout-signal` and arctic missions.
- Environment roster definitions in `src/custom-missions.js` / scenario definitions mapping available soldier types per world environment (Snow, Maritime, Capital, Desert, Jungle, Volcanic, Undercity).

## Sessions

- [2026-10-07-003-world-soldier-rosters-snow-sniper.md](../journal/2026-10-07-003-world-soldier-rosters-snow-sniper.md)
