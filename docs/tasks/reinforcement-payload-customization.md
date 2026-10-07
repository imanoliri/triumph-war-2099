# Custom reinforcement eagle troop payload selection

- Ticket: TRI-068; state in [local board](../BOARD.md).
- Branch: `feature/reinforcement-payload-customization`

## Goal and user-visible outcome

Allow scenario creators and custom scenario definitions to configure specific troop payload compositions (e.g. mixed soldier types: regular `soldier`, `commando`, `rider-scout`, `dune-guard`, `field-mechanic`, `snow-sniper`) for incoming ground troop carriers, air support drops, and eagle reinforcement pickups.

## Acceptance criteria

- [x] Allow configuring the specific troop composition (mixed soldier types: regular, commando, scout, guard, mechanic, sniper) for each incoming ground/air reinforcement carrier and scenario eagle pickup.
- [x] Support custom payload arrays in scenario definitions (`payload: ['soldier', 'snow-sniper', 'field-mechanic']`) with fallback to default troop squad rules when omitted.
- [x] Automated unit test / regression checks pass via `node tools/dev.cjs test`.

## Scope and decisions

- Payload customization handles:
  - Ground troop carrier drops (`supportLifecycle.groundArrival` / `supportLifecycle.reinforce`).
  - Air support commando drops (`supportLifecycle.airDrop` / `supportLifecycle.reinforce`).
  - Eagle pickup activations (`pickup(u, p)`).
- Scenario support array configuration: `support: [{ type: 'troops', payload: [...] }]`.
- Default behavior for original missions remains unchanged.

## Sessions

- [2026-10-07-004-reinforcement-payload-customization.md](../journal/2026-10-07-004-reinforcement-payload-customization.md)
