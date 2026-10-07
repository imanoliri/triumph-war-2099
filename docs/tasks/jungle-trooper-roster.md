# Jungle specialist roster

- Ticket: TRI-078; state in [local board](../BOARD.md).
- Branch: not started

## Goal and user-visible outcome

Provide the agreed jungle specialist roster, integrated with implemented matching missions where they exist.

## Acceptance criteria

- [ ] Implement each trooper mechanic listed below, including damage/range/timing, order behavior and terrain limits.
- [ ] Add distinct world roster entries and meaningful Units-tab descriptions/sprite previews for new types; future TRI-072 ground/air menu exposes only eligible matching-world slots. Do not require TRI-072 to be implemented in this ticket.
- [ ] Integrate specialists into existing matching-world missions with documented placements/payloads without changing objectives, map assets or unrelated enemy pressure. For worlds without runtime missions, provide opt-in roster definitions and disposable fixtures; do not create a mission.
- [ ] Add relevant positive/negative regressions, run node tools/dev.cjs test, update DESIGN/Units/Controls where behavior changes, and record browser evidence or its absence separately.

## Scope and decisions

User approved on 2026-10-07: rest of proposed world mechanics accepted; Desert Scout fires a very fast burst at the enemy it evaded immediately after dash; latest correction: Winter Gunner stays in Snow and Laser Cannon stays in Capital; the earlier swap is cancelled; Suppressor stops hit enemies; reject Tunnel Listener. Detailed mechanics below preserve the agreed proposal numbers as initial tuning.

- Recon: basic rifle, automatic defensive dash when a valid projectile will intersect within about 0.15s or immediately before melee hit resolution. 0.25s immunity, up to 48px dash, 3s shared cooldown from dash start. Moving Recon accelerates along legal route or tries safe sideways avoidance; stationary Recon sidesteps threat. Check swept path and endpoint against terrain, closed doors and bounds. No safe route means hit lands, no free stationary immunity. No firing during dash; resume prior order and return toward guard anchor. Ordinary movement does not grant permanent immunity.
- Field Medic: heal one injured infantry within 48px by 1 HP over 2 uninterrupted seconds. Both remain in range; medic firing/dashing/taking damage interrupts. No resurrection, shield or vehicle repair. Current many infantry have 1 HP: demonstrate eligible damaged infantry exist without increasing baseline HP. If no useful eligibility exists, raise a design question rather than silently increasing health or substituting resurrection.

Common limits: preserve established aiming rules, German physical-key controls, source sprite/map coordinate conventions, enemy-only barrel damage, explicit orders, support limits and unrelated work. Use dependency-free runtime and small explicit modules. No recovered-asset regeneration, original-game research, publication, campaign persistence or unrelated systems. Unspecified ordinary weapon tuning may use existing infantry defaults and must be documented. Do not silently resolve health eligibility, exceptional enemy phase conflicts or missing essential UI controls by expanding scope; relay a material question.

Execution authorized by user on 2026-10-07: director dispatches agents one ticket at a time, independently reviews and squash-integrates accepted work. Existing-world placement details can use conservative defaults; explain decisions in worker journal. Each world is one bounded ticket, not authority to implement the whole roster table.

## Sessions

- Planning approval and queue: [2026-10-07 roster checkpoint](../journal/2026-10-07-009-world-roster-planning.md).

