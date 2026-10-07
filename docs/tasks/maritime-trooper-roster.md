# Maritime specialist roster

- Ticket: TRI-076; state in [local board](../BOARD.md).
- Branch: not started

## Goal and user-visible outcome

Provide the agreed maritime specialist roster, integrated with implemented matching missions where they exist.

## Acceptance criteria

- [ ] Implement each trooper mechanic listed below, including damage/range/timing, order behavior and terrain limits.
- [ ] Add distinct world roster entries and meaningful Units-tab descriptions/sprite previews for new types; future TRI-072 ground/air menu exposes only eligible matching-world slots. Do not require TRI-072 to be implemented in this ticket.
- [ ] Integrate specialists into existing matching-world missions with documented placements/payloads without changing objectives, map assets or unrelated enemy pressure. For worlds without runtime missions, provide opt-in roster definitions and disposable fixtures; do not create a mission.
- [ ] Add relevant positive/negative regressions, run node tools/dev.cjs test, update DESIGN/Units/Controls where behavior changes, and record browser evidence or its absence separately.

## Scope and decisions

User approved on 2026-10-07: rest of proposed world mechanics accepted; Desert Scout fires a very fast burst at the enemy it evaded immediately after dash; latest correction: Winter Gunner stays in Snow and Laser Cannon stays in Capital; the earlier swap is cancelled; Suppressor stops hit enemies; reject Tunnel Listener. Detailed mechanics below preserve the agreed proposal numbers as initial tuning.

- Suppressor: four-round burst within 200px, 1.5s reload. A hit STOPS the hit mobile enemy for 1s (zero movement), replacing proposed 35-percent slow. Repeated hits refresh duration without additive stacking. Stop applies to movement, not automatically attack cancellation. Nests are unaffected. Apply to ordinary mobile enemies; exceptional committed charging phases must be documented/refined rather than silently broken.
- Grenadier: visible ground target within 240px, projectile with existing terrain collision, 40px blast radius, 2 damage, 3s reload. AI predicts group centre. No firing through walls/roofs; preserve established explosion and friendly-damage conventions.

Common limits: preserve established aiming rules, German physical-key controls, source sprite/map coordinate conventions, enemy-only barrel damage, explicit orders, support limits and unrelated work. Use dependency-free runtime and small explicit modules. No recovered-asset regeneration, original-game research, publication, campaign persistence or unrelated systems. Unspecified ordinary weapon tuning may use existing infantry defaults and must be documented. Do not silently resolve health eligibility, exceptional enemy phase conflicts or missing essential UI controls by expanding scope; relay a material question.

Execution authorized by user on 2026-10-07: director dispatches agents one ticket at a time, independently reviews and squash-integrates accepted work. Existing-world placement details can use conservative defaults; explain decisions in worker journal. Each world is one bounded ticket, not authority to implement the whole roster table.

## Sessions

- Planning approval and queue: [2026-10-07 roster checkpoint](../journal/2026-10-07-009-world-roster-planning.md).

