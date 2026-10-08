# Mercenary frontier specialist roster

- Ticket: TRI-080; state in [local board](../BOARD.md).
- Branch: `feature/mercenary-trooper-roster`

## Goal and user-visible outcome

Provide the agreed mercenary specialist roster, integrated with implemented matching missions where they exist.

## Acceptance criteria

- [x] Implement each trooper mechanic listed below, including damage/range/timing, order behavior and terrain limits.
- [x] Add distinct world roster entries and meaningful Units-tab descriptions/sprite previews for new types; future TRI-072 ground/air menu exposes only eligible matching-world slots. Do not require TRI-072 to be implemented in this ticket.
- [x] Integrate specialists into existing matching-world missions with documented placements/payloads without changing objectives, map assets or unrelated enemy pressure. For worlds without runtime missions, provide opt-in roster definitions and disposable fixtures; do not create a mission.
- [x] Add relevant positive/negative regressions, run node tools/dev.cjs test, update DESIGN/Units/Controls where behavior changes, and record browser evidence or its absence separately.

## Scope and decisions

User approved on 2026-10-07: rest of proposed world mechanics accepted; Desert Scout fires a very fast burst at the enemy it evaded immediately after dash; latest correction: Winter Gunner stays in Snow and Laser Cannon stays in Capital; the earlier swap is cancelled; Suppressor stops hit enemies; reject Tunnel Listener. Detailed mechanics below preserve the agreed proposal numbers as initial tuning.

- Weapon Specialist: two fixed modes, 240px single shot or 120px three-pellet spread. Switching takes 0.6s, with a short mode lockout to avoid oscillation. AI chooses by distance/grouping; simple preferred-mode unit setting. Finite kit, no economy.
- Bounty Hunter: one target focus until death, sight loss or beyond 260px. After 1s uninterrupted tracking, next shot deals 2 damage, then resets. Movement or blocked sightline cancels bonus. No monetary rewards.

Common limits: preserve established aiming rules, German physical-key controls, source sprite/map coordinate conventions, enemy-only barrel damage, explicit orders, support limits and unrelated work. Use dependency-free runtime and small explicit modules. No recovered-asset regeneration, original-game research, publication, campaign persistence or unrelated systems. Unspecified ordinary weapon tuning may use existing infantry defaults and must be documented. Do not silently resolve health eligibility, exceptional enemy phase conflicts or missing essential UI controls by expanding scope; relay a material question.

Execution authorized by user on 2026-10-07: director dispatches agents one ticket at a time, independently reviews and squash-integrates accepted work. Existing-world placement details can use conservative defaults; explain decisions in worker journal. Each world is one bounded ticket, not authority to implement the whole roster table.

## Sessions

- Planning approval and queue: [2026-10-07 roster checkpoint](../journal/2026-10-07-009-world-roster-planning.md).

- [2026-10-08 / 006](../journal/2026-10-08-006-mercenary-trooper-roster.md)

## Review evidence

Candidate implements both Mercenary kits and selected-unit preferred-mode UI; no matching shipped mission exists, so exported opt-in definitions and disposable production starting/carrier/parachute fixtures satisfy integration. Full node tools/dev.cjs test passed; final affected Mercenary, Units, combat, input and recreation checks passed. Current behavior/docs and [live absence record](../playtests/2026-10-08-mercenary-troopers.md) updated. Worker stops at Review; director review/squash integration next.
