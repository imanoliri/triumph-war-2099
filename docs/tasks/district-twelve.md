# Add District Twelve capital mission

- Ticket: TRI-053; state in [local board](../BOARD.md).
- Branch: `feature/district-twelve`

## Goal and user-visible outcome

Add District Twelve capital mission

## Acceptance criteria

- [x] Selectable mission with newly authored capital streets/courtyards/connected rooms, two enemy approaches, guard post/transit/plaza identity, sheltered circuit and clear relief entry; existing maps preserved.
- [x] Activate two transit-route terminals, survive a finite hold and timed existing-unit relief, then clear assault with a living noncommander; no early victory, explicit army loss, no timeout/civilian system.
- [x] Five explicit finite nest/wave pressure profiles, increased harder profiles, reachable spawns and preserved caps; substantial engaged pressure evidence with human calibration limits.
- [x] At least two accessible finite troop eagles and actual timed relief delivery; understandable briefing/HUD; tactical startup, restart and state isolation.
- [x] Focused routes/terminals/finite sources/relief/eagles/caps/victory/loss checks and full local suite pass; actual browser evidence recorded separately.
- [x] Current docs, editable map source/geometry/manifest/provenance and chronological handoff updated; scoped commit ready for review.

## Scope and decisions

User renewed more missions from the existing world table on 2026-10-06. Director selects remaining detailed capital-world brief District Twelve after completed snow/maritime missions and requested fixes. This supersedes the draft gate for this bounded first playable mission. Read docs/planning/campaigns/missions/district-twelve.md, capital dossier, campaign agent kit and art references. Worker chooses reasonable existing humans/bugs, terminal positions, hold duration, finite budgets, timed existing-aircraft relief and authored geometry, recording defaults/evidence. Local Guard identity comes from map/briefing/existing roster. No civilians, rooftops, destructible buildings, new faction abilities, campaign persistence, new enemies, environmental damage or original assets. Preserve Last Convoy and all world dossiers. One worker, no delegation/board edits/merge/publication; stop at Review.

## Sessions
- [2026-10-06 / 007](../journal/2026-10-06-007-district-twelve.md)

## Review evidence

Full `node tools/dev.cjs test` passed (70 scripts); dedicated District lifecycle/route tests and current seven-custom/allfive actual carrier audit passed. Five120s engaged default-AI probes are in `docs/design/district-pressure.json`, including autonomous eagle collection. Director Normal bounded browser evidence is separate; full victory/player balance/audio not claimed. See latest session for exact evidence and review limits.

Director-owned [bounded Normal browser record](../playtests/2026-10-06-district-director.md) lives on main f37ad14; original worker branch does not duplicate screenshots. It observes tactical startup, combat/relay change/casualties, actual eagle carrier squad and three relief commandos; full mission win remains unobserved.
