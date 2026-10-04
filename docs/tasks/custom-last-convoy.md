# Add Last Convoy defense mission

- Ticket: TRI-025; state in [local board](../BOARD.md).
- Branch: not started

## Goal and user-visible outcome

Add Last Convoy defense mission

## Acceptance criteria

- [ ] Separate custom defense mission emits exactly 26 scheduled bugs, requires 120 seconds and cleanup with a surviving noncommander, and preserves original wave logic.

## Scope and decisions

User explicitly requested new mission creation after workflow task; director stated three independent scenarios as working scope, optional count preference remains unsubmitted. Parent TRI-019, design TRI-023 docs/design/custom-missions.md and JSON. Depends on accepted TRI-024 registry; only Last Convoy metadata, finite emissions and defense objective here. Reuse Hold Base terrain/cannons and exact proposed placements without regenerating source assets. Four commanders, ten soldiers, robot and four initial bugs; no nests/flowers/source replenishment quota. Queue scheduled arrivals at 20/50/80 seconds totaling 26, emit at most one every 0.5 seconds, retain queued arrivals under ordinary cap pressure and avoid dropping/duplicating emissions at large dt. Victory requires all emissions consumed, 120 elapsed simulation seconds, enemy cleanup and living noncommander. Last noncommander dying loses even if support is inbound. Tactical freeze and restart reset timers/queue; support, cannons including 16-heading fire, commander controls and original difficulty rules otherwise unchanged. Preserve all original wave logic and quotas and custom Relay Breaker objectives/progress.

Meaningful regression checks: exact finite budget across long frames, cap pressure, restart/tactical; no victory at 119.9s, while queued or living enemies remain; loss after final noncommander including inbound support; separate custom progress; cannon mounting and support cap rules; original Hold Base/Crystal Chamber wave quotas. Update briefing/guide/current docs and chronological session. Run node tools/dev.cjs test; browser playtest per PLAYTEST if available and record truthful limits if unavailable. No new dependency/art, global balancing, source installation changes, unrelated refactor, nested delegation or board edits. Isolated worker stops Review with scoped commit; director review/squash/publication follows existing authority.

## Sessions


