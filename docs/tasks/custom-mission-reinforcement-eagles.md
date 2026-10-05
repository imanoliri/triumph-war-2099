# Reinforcement eagles in new missions

- Ticket: TRI-051; workflow in [board](../BOARD.md).
- Branch: not started

## Goal
Custom maps provide meaningful accessible reinforcement eagles that actually deliver support, with understandable availability and cap feedback.

## Acceptance criteria

- [ ] Audit every existing custom mission's eagle placements, supply policy and delivery feasibility; distinguish missing supply from rendered but unusable support.
- [ ] Supply underserved custom maps with accessible reinforcement eagles and explicit balanced finite/replenishing availability; preserve already adequate supply.
- [ ] Verify actual deliveries on custom terrain, cap-full pickup retention/feedback, deferred reservations where applicable, restart and mission-state isolation.
- [ ] Briefings/current documentation describe supply policy; original mission support and Last Convoy challenge remain preserved.
- [ ] Relevant regression checks and full local suite pass; browser pickup/delivery evidence is separated from simulation with limits explicit.
- [ ] Scoped commit, updated task and chronological handoff ready for director review.

## Scope and decisions

User explicitly requested eagle reinforcements on new missions/maps on 2026-10-05. Execute after TRI-049 and TRI-050, which incorporate this requirement directly. Audit Relay Breaker, Last Convoy, Silent Return, Beneath the Dunes, Whiteout Signal and Harbor Watch. Existing good support should stay unchanged; Silent Return's three friendly timed drops remain intact. Respect earlier request to leave Last Convoy balance as it is; change it only if necessary to restore a genuinely unusable existing eagle, recording evidence. Worker chooses explicit conservative supply defaults for underserved missions without unlimited farming or changes to enemies, objectives, unit stats, campaign progression or original assets. No new support unit types. One bounded worker, no delegation/board edits/merge/publication; stop at Review.

## Sessions
