# Capital specialist roster

- Ticket: TRI-075; state in [local board](../BOARD.md).
- Branch: not started

## Goal and user-visible outcome

Provide the agreed capital specialist roster, integrated with implemented matching missions where they exist.

## Acceptance criteria

- [ ] Implement each trooper mechanic listed below, including damage/range/timing, order behavior and terrain limits.
- [ ] Add distinct world roster entries and meaningful Units-tab descriptions/sprite previews for new types; future TRI-072 ground/air menu exposes only eligible matching-world slots. Do not require TRI-072 to be implemented in this ticket.
- [ ] Integrate specialists into existing matching-world missions with documented placements/payloads without changing objectives, map assets or unrelated enemy pressure. For worlds without runtime missions, provide opt-in roster definitions and disposable fixtures; do not create a mission.
- [ ] Add relevant positive/negative regressions, run node tools/dev.cjs test, update DESIGN/Units/Controls where behavior changes, and record browser evidence or its absence separately.

## Scope and decisions

User approved on 2026-10-07: rest of proposed world mechanics accepted; Desert Scout fires a very fast burst at the enemy it evaded immediately after dash; latest correction: Winter Gunner stays in Snow and Laser Cannon stays in Capital; the earlier swap is cancelled; Suppressor stops hit enemies; reject Tunnel Listener. Detailed mechanics below preserve the agreed proposal numbers as initial tuning.

- Shield Trooper: frontal 120-degree shield with 3 shield HP, excess frontal damage reaches body; side/rear attacks bypass it. Shield fully restores after 6s without hits. Basic rifle, slower ordinary movement; bearer-only protection. Melee uses attacker position, projectile uses incoming direction, environmental damage bypasses shield. Preserve order/aim behavior; show shield strength, break and recharge. Do not silently add ally interception.
- Add infantry-carried Laser Cannon: 220px range, 8px full beam width (half the current 16px infantry collision diameter), 3 damage once per intersected enemy, 4s recharge. Beam stops at first blocking terrain and follows established infantry aim headings. No backup rifle or friendly damage. Visible pulse lasts about 0.15s without repeat damage. AI prefers legal multi-enemy alignments while respecting orders. Laser Cannon remains in Capital; no Winter Gunner in Capital.

Common limits: preserve established aiming rules, German physical-key controls, source sprite/map coordinate conventions, enemy-only barrel damage, explicit orders, support limits and unrelated work. Use dependency-free runtime and small explicit modules. No recovered-asset regeneration, original-game research, publication, campaign persistence or unrelated systems. Unspecified ordinary weapon tuning may use existing infantry defaults and must be documented. Do not silently resolve health eligibility, exceptional enemy phase conflicts or missing essential UI controls by expanding scope; relay a material question.

Execution authorized by user on 2026-10-07: director dispatches agents one ticket at a time, independently reviews and squash-integrates accepted work. Existing-world placement details can use conservative defaults; explain decisions in worker journal. Each world is one bounded ticket, not authority to implement the whole roster table.

## Sessions

- Planning approval and queue: [2026-10-07 roster checkpoint](../journal/2026-10-07-009-world-roster-planning.md).

