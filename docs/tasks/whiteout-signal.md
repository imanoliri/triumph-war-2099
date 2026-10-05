# Whiteout Signal snow mission

- Ticket: TRI-049; state in [board](../BOARD.md).
- Branch: not started

## Goal
New snow-world expedition mission: activate the research station relay and return rescued soldiers to extraction.

## Acceptance criteria

- [ ] Selectable custom mission with a newly authored snow map, two approaches around an ice ridge, station and extraction landmark; existing missions unchanged.
- [ ] Activate relay, acquire stranded human rescue party, then extract at least one living designated survivor; prevent early victory, define army-exhaustion loss.
- [ ] Briefing/HUD explain objective progress; tactical startup, restart, population cap and mission-state isolation work.
- [ ] Five explicit difficulty profiles with substantial nest and flank pressure, regeneration/budgets and stronger harder profiles; challenge evidence and limits recorded.
- [ ] Relevant route/spawn/objective regression checks and full local suite pass; actual browser map/combat/objective evidence recorded separately from simulation.
- [ ] Current documentation, authored map provenance and worker session handoff updated; scoped commit ready for director review.

## Scope and decisions

User explicitly requested more missions from the existing world table on 2026-10-05. Director selects Whiteout Signal first, then Harbor Watch. This approved task supersedes the snow brief's draft-only gate for this mission. Read docs/planning/campaigns/missions/whiteout-signal.md, its planet dossier and campaign agent kit. Worker chooses and records reasonable existing-unit roster, survivor count, activation range, new geometry and numerical balance defaults, reusing established objective patterns. The map must be newly authored, not a recolor. Preserve all fourteen world dossiers and existing missions, especially Last Convoy. No new ice enemies, civilian system, environmental damage, campaign persistence or gamepad work. Follow map-specific art references/workflow; no nested delegation. Stop at Review, never merge or publish.

## Sessions

## Reinforcement eagle requirement (user steering)

User explicitly requested reinforcement eagles for new maps on 2026-10-05. Provide accessible usable reinforcement eagles with an explicit supply policy; a rendered pickup alone is insufficient. Verify actual support arrival on this custom geometry, preservation/feedback when population cap prevents use, and restart reset. Balance supply against substantial pressure; explain replenishment or finite availability in briefing. Preserve original source support conventions and avoid unlimited safe farming.
