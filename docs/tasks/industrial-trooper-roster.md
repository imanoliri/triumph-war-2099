# Industrial specialist roster

- Ticket: TRI-079; state in [local board](../BOARD.md).
- Branch: `feature/industrial-trooper-roster`

## Goal and user-visible outcome

Provide the agreed industrial specialist roster, integrated with implemented matching missions where they exist.

## Acceptance criteria

- [x] Implement each trooper mechanic listed below, including damage/range/timing, order behavior and terrain limits.
- [x] Add distinct world roster entries and meaningful Units-tab descriptions/sprite previews for new types; future TRI-072 ground/air menu exposes only eligible matching-world slots. Do not require TRI-072 to be implemented in this ticket.
- [x] Integrate specialists into existing matching-world missions with documented placements/payloads without changing objectives, map assets or unrelated enemy pressure. For worlds without runtime missions, provide opt-in roster definitions and disposable fixtures; do not create a mission.
- [x] Add relevant positive/negative regressions, run node tools/dev.cjs test, update DESIGN/Units/Controls where behavior changes, and record browser evidence or its absence separately.

## Scope and decisions

User approved on 2026-10-07: rest of proposed world mechanics accepted; Desert Scout fires a very fast burst at the enemy it evaded immediately after dash; latest correction: Winter Gunner stays in Snow and Laser Cannon stays in Capital; the earlier swap is cancelled; Suppressor stops hit enemies; reject Tunnel Listener. Detailed mechanics below preserve the agreed proposal numbers as initial tuning.

- Heavy Riveter: slow projectile, 2 damage, 180px range, 1.2s shot interval, 75 percent ordinary infantry movement speed. No invented armor system; overkill versus weak enemies is deliberate tradeoff.
- Arc Technician: 110px primary shot, 1 damage, one jump to another visible enemy within 40px of first, 1.5s recharge. Jump must have clear path and cannot revisit same enemy. No repair role or wall penetration.

Common limits: preserve established aiming rules, German physical-key controls, source sprite/map coordinate conventions, enemy-only barrel damage, explicit orders, support limits and unrelated work. Use dependency-free runtime and small explicit modules. No recovered-asset regeneration, original-game research, publication, campaign persistence or unrelated systems. Unspecified ordinary weapon tuning may use existing infantry defaults and must be documented. Do not silently resolve health eligibility, exceptional enemy phase conflicts or missing essential UI controls by expanding scope; relay a material question.

Execution authorized by user on 2026-10-07: director dispatches agents one ticket at a time, independently reviews and squash-integrates accepted work. Existing-world placement details can use conservative defaults; explain decisions in worker journal. Each world is one bounded ticket, not authority to implement the whole roster table.

## Sessions

- Planning approval and queue: [2026-10-07 roster checkpoint](../journal/2026-10-07-009-world-roster-planning.md).

- [2026-10-08 / 005](../journal/2026-10-08-005-industrial-trooper-roster.md)

## Implementation evidence

TRI-079 uses authored opt-in Industrial definitions because no shipped runtime mission has Industrial environment. No placements/payloads or new mission were added. `riveters` / `technicians` coordinate arrays and the existing ground/air composition factories accept these types for future opted-in definitions. Starting1HP/fixed eight-direction kits,90px/s Riveter projectile and instantaneous Arc are documented routine tuning. Full command/evidence and limitations live in session005; browser absence is separate. Acceptance marks describe implementation/simulation evidence, not observed live playability.
