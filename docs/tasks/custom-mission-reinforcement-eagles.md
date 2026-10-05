# Reinforcement eagles in new missions

- Ticket: TRI-051; workflow in [board](../BOARD.md).
- Branch: `feature/custom-mission-reinforcement-eagles`

## Goal
Custom maps provide meaningful accessible reinforcement eagles that actually deliver support, with understandable availability and cap feedback.

## Acceptance criteria

- [x] Audit every existing custom mission's eagle placements, supply policy and delivery feasibility; distinguish missing supply from rendered but unusable support.
- [x] Supply underserved custom maps with accessible reinforcement eagles and explicit balanced finite/replenishing availability; preserve already adequate supply.
- [x] Verify actual deliveries on custom terrain, cap-full pickup retention/feedback, deferred reservations where applicable, restart and mission-state isolation.
- [x] Briefings/current documentation describe supply policy; original mission support and Last Convoy challenge remain preserved.
- [x] Relevant regression checks and full local suite pass; browser pickup/delivery evidence is separated from simulation with limits explicit.
- [x] Scoped commit, updated task and chronological handoff ready for director review.

## Scope and decisions

User explicitly requested eagle reinforcements on new missions/maps on 2026-10-05. Execute after TRI-049 and TRI-050, which incorporate this requirement directly. Audit Relay Breaker, Last Convoy, Silent Return, Beneath the Dunes, Whiteout Signal and Harbor Watch. Existing good support should stay unchanged; Silent Return's three friendly timed drops remain intact. Respect earlier request to leave Last Convoy balance as it is; change it only if necessary to restore a genuinely unusable existing eagle, recording evidence. Worker chooses explicit conservative supply defaults for underserved missions without unlimited farming or changes to enemies, objectives, unit stats, campaign progression or original assets. No new support unit types. One bounded worker, no delegation/board edits/merge/publication; stop at Review.

## Sessions
- [2026-10-06 / 004](../journal/2026-10-06-004-custom-mission-reinforcement-eagles.md)

## Implementation decisions and evidence

Only Beneath the Dunes lacked supply: two finite yellow caches at(250,230),(330,590) provide ordinary soldiers, no refill. Other cache placement/count/type/profile policies unchanged; Silent three scheduled friendly drops remain. Director authorized Last Convoy cap-full retention/feedback as the task's exception for restoring unusable existing pickup; its pressure/objective/placements remain identical. Custom infantry support now respects soldier/commando cap plus pending landing reservations; specialist/crawler/robot/tank cap convention and original support remain unchanged. Exact unaffected custom mission-data comparison and actual geometry/contact/delivery are in tools/check-custom-support.cjs. [Independent limited live Dunes delivery](../playtests/2026-10-06-eagles-director.md) is director-owned main checkpoint6b97146, separate from VM support proofs and non-attributed completion observations.

## Worker handoff

Review ready: complete node tools/dev.cjs test exited0 (final run77531), focused/independent all-six/five-profile audit passed, and controlled limited live Dunes northern-cache delivery is recorded separately. Review custom-only guard, finite Dunes supplies and exact historical assertion adaptations; no original support/scheduled formation/enemy/stat/objective/art changes. Scoped branch HEAD contains finalized session; director reviews and records exact implementation/squash commits at integration. No merge or publication performed.
