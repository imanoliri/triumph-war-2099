# Toxic marsh specialist roster

- Ticket: TRI-082; state in [local board](../BOARD.md).
- Branch: `feature/toxic-marsh-trooper-roster`

## Goal and user-visible outcome

Provide the agreed toxic-marsh specialist roster, integrated with implemented matching missions where they exist.

## Acceptance criteria

- [x] Implement each trooper mechanic listed below, including damage/range/timing, order behavior and terrain limits.
- [x] Add distinct world roster entries and meaningful Units-tab descriptions/sprite previews for new types; future TRI-072 ground/air menu exposes only eligible matching-world slots. Do not require TRI-072 to be implemented in this ticket.
- [x] Integrate specialists into existing matching-world missions with documented placements/payloads without changing objectives, map assets or unrelated enemy pressure. For worlds without runtime missions, provide opt-in roster definitions and disposable fixtures; do not create a mission.
- [x] Add relevant positive/negative regressions, run node tools/dev.cjs test, update DESIGN/Units/Controls where behavior changes, and record browser evidence or its absence separately.

## Scope and decisions

User approved on 2026-10-07: rest of proposed world mechanics accepted; Desert Scout fires a very fast burst at the enemy it evaded immediately after dash; latest correction: Winter Gunner stays in Snow and Laser Cannon stays in Capital; the earlier swap is cancelled; Suppressor stops hit enemies; reject Tunnel Listener. Detailed mechanics below preserve the agreed proposal numbers as initial tuning.

- Tracker: every 3s mark one visible enemy within 220px for 2s. Nearby friendly AI prioritizes it only when valid under its weapon range, sight, aiming and orders. No bonus damage or wall bypass. Basic rifle.
- Chemical Trooper: 100px spray cone, delayed 1 damage after 1s on affected enemy. Additional applications refresh delay without stacking. No persistent ground cloud. Visible effect/expiration; immunity and ownership handled explicitly.

Common limits: preserve established aiming rules, German physical-key controls, source sprite/map coordinate conventions, enemy-only barrel damage, explicit orders, support limits and unrelated work. Use dependency-free runtime and small explicit modules. No recovered-asset regeneration, original-game research, publication, campaign persistence or unrelated systems. Unspecified ordinary weapon tuning may use existing infantry defaults and must be documented. Do not silently resolve health eligibility, exceptional enemy phase conflicts or missing essential UI controls by expanding scope; relay a material question.

Execution authorized by user on 2026-10-07: director dispatches agents one ticket at a time, independently reviews and squash-integrates accepted work. Existing-world placement details can use conservative defaults; explain decisions in worker journal. Each world is one bounded ticket, not authority to implement the whole roster table.

## Sessions

- Planning approval and queue: [2026-10-07 roster checkpoint](../journal/2026-10-07-009-world-roster-planning.md).

- [2026-10-08 / 009](../journal/2026-10-08-009-toxic-marsh-trooper-roster.md)

## Implementation / Review evidence

Tracker and Chemical Trooper are implemented as opt-in Toxic Marsh roster entries with starting factories, actual ground/air delivery and capacity handling. No shipped mission matches; no mission was created. Routine tuning and immunity/ownership rules are in DESIGN. Focused production regressions cover timing, legality/order exclusions, terrain, refresh and actual delivery. Full suite and scoped commit are recorded in session009. Live browser evidence is [not run](../playtests/2026-10-08-toxic-marsh-trooper-roster.md); this remains a visual/audio/playability limitation, not a simulation failure. Branch stops at Review for director integration.
