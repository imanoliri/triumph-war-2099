# Add desert charging worms

- Ticket: TRI-035; state in [local board](../BOARD.md).
- Branch: not started

## Goal and user-visible outcome

Add desert charging worms

## Acceptance criteria

- [ ] Implement the agreed burrow, visible warning, straight charge and recovery behavior with collision, damage, rendering and original-campaign isolation verified.

## Scope and decisions

User chose desert first on 2026-10-05 and explicitly selected dune-like worms that burrow, visibly warn, then emerge into a straight charge troops can dodge. See [mission refinement](../planning/campaigns/missions/desert-operation.md) and [planet dossier](../planning/campaigns/planets/desert-frontier.md). User explicitly chose underground protection and vulnerability during warning, charge and recovery; warning must visibly expose the worm. Proposed recovery, wall collision and once-per-target charge damage need final scope refinement. No under-city perforator mechanics in this ticket. Preserve original enemies, aiming, controls and source assets. Use a separate bounded worker after the current TRI-034 review is resolved; do not dispatch from this Backlog record.

## Sessions
