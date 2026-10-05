# Enable diagonal fire for custom desert infantry

- Ticket: TRI-054; state in [local board](../BOARD.md).
- Branch: not started

## Goal and user-visible outcome

Enable diagonal fire for custom desert infantry

## Acceptance criteria

- [ ] Rider scout, dune guard and field mechanic can aim/fire toward diagonal targets with matching rendered heading; document eight-direction behavior and preserve weapon-specific spread/range/damage/cadence.
- [ ] Existing evasion/repair/mines/crawler/movement and original soldiers/commanders/commando/tank asymmetry unchanged; friendly damage remains preserved.
- [ ] Focused diagonal/axis firing and rendering regressions plus full local suite pass; actual browser evidence separate from simulation.
- [ ] DESIGN/Units/help if needed and task/session handoff updated; scoped commit ready for review.

## Scope and decisions

User explicitly requested custom soldiers in the desert mission shoot diagonally on 2026-10-06. Applies to existing Desert Rider infantry roles (scout, guard, mechanic), not convoy crawlers or original infantry. Execute after TRI-052 before next mission TRI-053. Worker inspects current cardinal restriction and implements smallest coherent eight-direction aiming/projectile/rendering fix, preserving existing five-pellet guard spread and all numerical weapon rules. No new abilities/roster/map/objective/balance changes, support edits or original assets. One worker, no delegation/board edits/merge/publication; stop at Review.

## Sessions
