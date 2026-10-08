# Orbital scrapyard specialist roster

- Ticket: TRI-086; state in [local board](../BOARD.md).
- Branch: `feature/orbital-scrapyard-trooper-roster`

## Goal and user-visible outcome

Provide the agreed orbital-scrapyard specialist roster, integrated with implemented matching missions where they exist.

## Acceptance criteria

- [x] Implement each trooper mechanic listed below, including damage/range/timing, order behavior and terrain limits.
- [x] Add distinct world roster entries and meaningful Units-tab descriptions/sprite previews for new types; future TRI-072 ground/air menu exposes only eligible matching-world slots. Do not require TRI-072 to be implemented in this ticket.
- [x] Integrate specialists into existing matching-world missions with documented placements/payloads without changing objectives, map assets or unrelated enemy pressure. For worlds without runtime missions, provide opt-in roster definitions and disposable fixtures; do not create a mission.
- [x] Add relevant positive/negative regressions, run node tools/dev.cjs test, update DESIGN/Units/Controls where behavior changes, and record browser evidence or its absence separately.

## Scope and decisions

User approved on 2026-10-07: rest of proposed world mechanics accepted; Desert Scout fires a very fast burst at the enemy it evaded immediately after dash; latest correction: Winter Gunner stays in Snow and Laser Cannon stays in Capital; the earlier swap is cancelled; Suppressor stops hit enemies; reject Tunnel Listener. Detailed mechanics below preserve the agreed proposal numbers as initial tuning.

- Mine-layer: four finite proximity mines, explicit reachable-ground placement order, 1s arming, 20px trigger radius, 32px blast radius, 2 damage. AI places only on explicit orders; build on existing crawler mines while preserving existing damage conventions.
- Breacher: single-target impact weapon, 90px range, 3 damage, 2s reload. Ordinary collision/aiming. No automatic wall demolition or locked-door opening.

Common limits: preserve established aiming rules, German physical-key controls, source sprite/map coordinate conventions, enemy-only barrel damage, explicit orders, support limits and unrelated work. Use dependency-free runtime and small explicit modules. No recovered-asset regeneration, original-game research, publication, campaign persistence or unrelated systems. Unspecified ordinary weapon tuning may use existing infantry defaults and must be documented. Do not silently resolve health eligibility, exceptional enemy phase conflicts or missing essential UI controls by expanding scope; relay a material question.

Execution authorized by user on 2026-10-07: director dispatches agents one ticket at a time, independently reviews and squash-integrates accepted work. Existing-world placement details can use conservative defaults; explain decisions in worker journal. Each world is one bounded ticket, not authority to implement the whole roster table.

## Sessions

- Planning approval and queue: [2026-10-07 roster checkpoint](../journal/2026-10-07-009-world-roster-planning.md).

- [2026-10-09 / 001](../journal/2026-10-09-001-orbital-scrapyard-trooper-roster.md)

## Review evidence

Implementation is ready for director review. `node tools/check-orbital-troopers.cjs`, `node tools/check-unit-guide.cjs` and the complete `node tools/dev.cjs test` pass on final sources. No matching Orbital runtime mission exists; integration is limited to opt-in roster/factories/menus and disposable fixtures. Browser acceptance is explicitly not run, separately recorded in the session and live-check record.
