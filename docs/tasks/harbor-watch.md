# Harbor Watch maritime mission

- Ticket: TRI-050; state in [board](../BOARD.md).
- Branch: `feature/harbor-watch`

## Goal
New maritime-world local Navy mission: defend an island harbor through a finite multi-lane assault.

## Acceptance criteria

- [x] Selectable custom mission with newly authored maritime harbor map: three dock approaches, causeway flank and sheltered repositioning route; existing missions preserved.
- [x] Hold through finite assault then clear remaining enemies after hold duration; prevent early victory and define army-exhaustion loss.
- [x] Briefing/HUD explain time and remaining assault; tactical startup, restart, cap handling and progress isolation work.
- [x] Five explicit difficulty profiles with substantial nest/source pressure, finite spawn budgets and increased harder profiles; challenge evidence and limits recorded.
- [x] Relevant route/spawn/wave/victory/loss regression checks and full local suite pass; actual browser evidence separate from simulation.
- [x] Current docs, authored map provenance and session handoff updated; scoped commit ready for director review.

## Scope and decisions

User explicitly requested more missions from the existing world table on 2026-10-05. Execute directly after TRI-049. This approved task supersedes Harbor Watch brief's draft-only gate for this mission. Read docs/planning/campaigns/missions/harbor-watch.md, maritime dossier and campaign agent kit. Worker chooses and records reasonable existing-unit roster, hold duration, budgets and newly authored geometry. Navy identity comes from briefing, map and existing roster roles. No boats, amphibious movement, ship convoy, structure HP, new faction abilities or campaign persistence. Preserve all world dossiers and Last Convoy. One bounded worker, no nested delegation, stop at Review, never merge/publish.

## Sessions

- [2026-10-06 / 003](../journal/2026-10-06-003-harbor-watch.md)

## Reinforcement eagle requirement (user steering)

User explicitly requested reinforcement eagles for new maps on 2026-10-05. Provide accessible usable reinforcement eagles with explicit finite/replenishing supply policy explained in briefing. Verify actual troop/support delivery on the custom map, pickup preservation and feedback at population cap, and restart reset. Include supply in defense balance without unlimited safe farming.


## Implementation decisions and evidence

Worker-selected contract:120s hold; four finite sources with cap-retained budgets; destroyed sources cancel unused births and empty live nests need not die. All scheduled arrivals and living bugs must clear. Last noncommander loss fails even with carrier inbound. Five profiles, near-mouth dock/causeway source placements and three finite sheltered troop eagles are recorded in DESIGN. Frozen water/land envelopes, runtime hotspots and reference/provenance contracts live in assets/custom/harbor-watch. No new combat AI/unit/faction mechanics.

Focused regression: node tools/check-harbor-watch.cjs. Recorded pressure only with --record; normal checks never rewrite pressure evidence. Browser tactical/combat/hold feedback and independent director ordinary-UI Normal victory are linked from playtests/2026-10-06-harbor-watch.md. Full suite result and scoped commit belong in the initial session handoff; state remains Review until director integration.
