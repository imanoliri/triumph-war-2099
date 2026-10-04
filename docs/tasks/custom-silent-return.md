# Add Silent Return infiltration mission

- Ticket: TRI-026; state in [local board](../BOARD.md).
- Branch: not started

## Goal and user-visible outcome

Add Silent Return infiltration mission

## Acceptance criteria

- [ ] Separate custom infiltration mission requires legitimate access unlock and laser activation followed by support-aware living-human extraction, while preserving original Flash Back behavior.

## Scope and decisions

User explicitly requested new mission creation after workflow task; director stated three independent scenarios as working scope, optional count preference remains unsubmitted. Parent TRI-019; accepted design TRI-023 docs/design/custom-missions.md and JSON. Depends on accepted custom registry; implement only Silent Return metadata and support-aware extraction objective, preserving assault/defense and original nine scenarios. Reuse Flash Back terrain/doors/terminals, four commanders and four commandos, six bugs and exact optional support/weapon placements. No nests, flowers, waves or vents. Legitimately use access terminal253 to unlock door252, physically traverse/open it, activate laser257, then bring every currently living ground human into radius96 of (392,72), including support arrivals, with at least one noncommander and no pending reinforcement/drop actors. Dead/missing commanders need not return before extraction. Enemies may remain. Ordinary total army/commander/support exhaustion loses; no stealth detection/alarm/awareness rewrite. Tactical freeze/restart reset custom flags; original Flash Back time/terminal/clear requirements and controls unchanged.

Meaningful regression checks: locked laser room inaccessible before legitimate access; use alone or laser alone cannot win; outside-radius living humans, zero noncommanders or inbound support block extraction; remaining enemies do not block valid extraction; real force/use/movement opens unlocked doors on outbound/return; tactical freeze/restart/selection/difficulty/progress isolation. Update briefing/guide/docs/session; run node tools/dev.cjs test; attempt browser playtest per PLAYTEST when available, otherwise truthfully record simulation-only limits. No source asset edits/new art/dependency/global balance, unrelated refactor, delegation or director board edits. Worker stops at Review with scoped commit/evidence; director independently reviews/squashes, with publication already authorized.

## Sessions


