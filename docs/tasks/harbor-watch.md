# Harbor Watch maritime mission

- Ticket: TRI-050; state in [board](../BOARD.md).
- Branch: not started

## Goal
New maritime-world local Navy mission: defend an island harbor through a finite multi-lane assault.

## Acceptance criteria

- [ ] Selectable custom mission with newly authored maritime harbor map: three dock approaches, causeway flank and sheltered repositioning route; existing missions preserved.
- [ ] Hold through finite assault then clear remaining enemies after hold duration; prevent early victory and define army-exhaustion loss.
- [ ] Briefing/HUD explain time and remaining assault; tactical startup, restart, cap handling and progress isolation work.
- [ ] Five explicit difficulty profiles with substantial nest/source pressure, finite spawn budgets and increased harder profiles; challenge evidence and limits recorded.
- [ ] Relevant route/spawn/wave/victory/loss regression checks and full local suite pass; actual browser evidence separate from simulation.
- [ ] Current docs, authored map provenance and session handoff updated; scoped commit ready for director review.

## Scope and decisions

User explicitly requested more missions from the existing world table on 2026-10-05. Execute directly after TRI-049. This approved task supersedes Harbor Watch brief's draft-only gate for this mission. Read docs/planning/campaigns/missions/harbor-watch.md, maritime dossier and campaign agent kit. Worker chooses and records reasonable existing-unit roster, hold duration, budgets and newly authored geometry. Navy identity comes from briefing, map and existing roster roles. No boats, amphibious movement, ship convoy, structure HP, new faction abilities or campaign persistence. Preserve all world dossiers and Last Convoy. One bounded worker, no nested delegation, stop at Review, never merge/publish.

## Sessions
