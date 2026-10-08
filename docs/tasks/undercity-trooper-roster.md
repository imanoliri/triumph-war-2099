# Undercity specialist roster

- Ticket: TRI-077; state in [local board](../BOARD.md).
- Branch: `feature/undercity-trooper-roster`

## Goal and user-visible outcome

Provide the agreed undercity specialist roster, integrated with implemented matching missions where they exist.

## Acceptance criteria

- [x] Implement each trooper mechanic listed below, including damage/range/timing, order behavior and terrain limits.
- [x] Add distinct world roster entries and meaningful Units-tab descriptions/sprite previews for new types; future TRI-072 ground/air menu exposes only eligible matching-world slots. Do not require TRI-072 to be implemented in this ticket.
- [x] Integrate specialists into existing matching-world missions with documented placements/payloads without changing objectives, map assets or unrelated enemy pressure. For worlds without runtime missions, provide opt-in roster definitions and disposable fixtures; do not create a mission.
- [x] Add relevant positive/negative regressions, run node tools/dev.cjs test, update DESIGN/Units/Controls where behavior changes, and record browser evidence or its absence separately.

## Scope and decisions

User approved on 2026-10-07: rest of proposed world mechanics accepted; Desert Scout fires a very fast burst at the enemy it evaded immediately after dash; latest correction: Winter Gunner stays in Snow and Laser Cannon stays in Capital; the earlier swap is cancelled; Suppressor stops hit enemies; reject Tunnel Listener. Detailed mechanics below preserve the agreed proposal numbers as initial tuning.

- Corner Ambusher: after 1s stationary, prepares a three-round rapid burst at an enemy entering a clear 120px firing lane. Needs 2s to prepare again; movement cancels preparation. Guard AI holds assigned position. No invisibility or invented stealth.
- Tunnel Listener is explicitly rejected and excluded. No replacement second specialist is authorized. Existing ordinary troops remain alongside Ambusher.

Common limits: preserve established aiming rules, German physical-key controls, source sprite/map coordinate conventions, enemy-only barrel damage, explicit orders, support limits and unrelated work. Use dependency-free runtime and small explicit modules. No recovered-asset regeneration, original-game research, publication, campaign persistence or unrelated systems. Unspecified ordinary weapon tuning may use existing infantry defaults and must be documented. Do not silently resolve health eligibility, exceptional enemy phase conflicts or missing essential UI controls by expanding scope; relay a material question.

Execution authorized by user on 2026-10-07: director dispatches agents one ticket at a time, independently reviews and squash-integrates accepted work. Existing-world placement details can use conservative defaults; explain decisions in worker journal. Each world is one bounded ticket, not authority to implement the whole roster table.

Implementation candidate2026-10-08: Corner Ambusher only; ordinary1HP/1damage/290px/s,0.1s rapid rounds,1s initial stationary setup and2s reprepare after third round or movement-interrupted partial burst. Guard immobile at assigned position; explicit Attack/focus/attack-move retain alignment, Follow/force/use priorities. Tunnels Breach first soldier(155,320) replaced one-for-one across all five profiles; other deployments/objectives/enemy pressure/support defaults untouched. Undercity-only menus and initialized delivery/cap paths, Units portrait and Controls updated. Full automated suite passed; browser UI evidence and remaining live combat/delivery/audio/hardware/balance gaps in [playtest](../playtests/2026-10-08-corner-ambusher.md). Ready for director Review; not merged.

## Sessions

- Planning approval and queue: [2026-10-07 roster checkpoint](../journal/2026-10-07-009-world-roster-planning.md).

- [2026-10-08 / 003](../journal/2026-10-08-003-undercity-trooper-roster.md)
