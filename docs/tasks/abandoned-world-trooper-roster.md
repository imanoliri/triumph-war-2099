# Abandoned world specialist roster

- Ticket: TRI-085; state in [local board](../BOARD.md).
- Branch: `feature/abandoned-world-trooper-roster`

## Goal and user-visible outcome

Provide the agreed abandoned-world specialist roster, integrated with implemented matching missions where they exist.

## Acceptance criteria

- [x] Implement each trooper mechanic listed below, including damage/range/timing, order behavior and terrain limits.
- [x] Add distinct world roster entries and meaningful Units-tab descriptions/sprite previews for new types; future TRI-072 ground/air menu exposes only eligible matching-world slots. Do not require TRI-072 to be implemented in this ticket.
- [x] Integrate specialists into existing matching-world missions with documented placements/payloads without changing objectives, map assets or unrelated enemy pressure. For worlds without runtime missions, provide opt-in roster definitions and disposable fixtures; do not create a mission.
- [x] Add relevant positive/negative regressions, run node tools/dev.cjs test, update DESIGN/Units/Controls where behavior changes, and record browser evidence or its absence separately.

## Scope and decisions

User approved on 2026-10-07: rest of proposed world mechanics accepted; Desert Scout fires a very fast burst at the enemy it evaded immediately after dash; latest correction: Winter Gunner stays in Snow and Laser Cannon stays in Capital; the earlier swap is cancelled; Suppressor stops hit enemies; reject Tunnel Listener. Detailed mechanics below preserve the agreed proposal numbers as initial tuning.

- Incendiary Trooper: existing flame mechanics, 120px cone, 1s firing burst, 2s cooling. No spreading terrain fires or burning buildings. Document fixed firing/cooling cycle as its distinction from ordinary weapon pickup infantry.
- Recovery Trooper: two finite kits, each restores 1 HP to an eligible injured ally after 1s stationary nearby. No passive regeneration, refill or resurrection. Same current 1-HP infantry eligibility concern as Medic: prove useful recipients without changing baseline HP; ask if no useful scope exists.

Common limits: preserve established aiming rules, German physical-key controls, source sprite/map coordinate conventions, enemy-only barrel damage, explicit orders, support limits and unrelated work. Use dependency-free runtime and small explicit modules. No recovered-asset regeneration, original-game research, publication, campaign persistence or unrelated systems. Unspecified ordinary weapon tuning may use existing infantry defaults and must be documented. Do not silently resolve health eligibility, exceptional enemy phase conflicts or missing essential UI controls by expanding scope; relay a material question.

Execution authorized by user on 2026-10-07: director dispatches agents one ticket at a time, independently reviews and squash-integrates accepted work. Existing-world placement details can use conservative defaults; explain decisions in worker journal. Each world is one bounded ticket, not authority to implement the whole roster table.

## Sessions

- Planning approval and queue: [2026-10-07 roster checkpoint](../journal/2026-10-07-009-world-roster-planning.md).

- [2026-10-08 / 019](../journal/2026-10-08-019-abandoned-world-trooper-roster.md)

## Review evidence

Final resumed node tools/dev.cjs test passed (exit0) on2026-10-09 after importing separately integrated TRI-094 and design-only TRI-095 from main. All focused/affected checks pass. No Abandoned mission was created. The earlier inherited Volcanic Forge ground-placement failure is resolved by TRI-094; chronological evidence remains in session019. Live rendering/audio/playability has not been verified and its absence is explicitly recorded separately. Director review and squash integration remain next.
