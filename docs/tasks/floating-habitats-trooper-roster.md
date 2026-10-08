# Floating habitat specialist roster

- Ticket: TRI-084; state in [local board](../BOARD.md).
- Branch: `feature/floating-habitats-trooper-roster`

## Goal and user-visible outcome

Provide the agreed floating-habitats specialist roster, integrated with implemented matching missions where they exist.

## Acceptance criteria

- [x] Implement each trooper mechanic listed below, including damage/range/timing, order behavior and terrain limits.
- [x] Add distinct world roster entries and meaningful Units-tab descriptions/sprite previews for new types; future TRI-072 ground/air menu exposes only eligible matching-world slots. Do not require TRI-072 to be implemented in this ticket.
- [x] Integrate specialists into existing matching-world missions with documented placements/payloads without changing objectives, map assets or unrelated enemy pressure. For worlds without runtime missions, provide opt-in roster definitions and disposable fixtures; do not create a mission.
- [x] Add relevant positive/negative regressions, run node tools/dev.cjs test, update DESIGN/Units/Controls where behavior changes, and record browser evidence or its absence separately.

## Scope and decisions

User approved on 2026-10-07: rest of proposed world mechanics accepted; Desert Scout fires a very fast burst at the enemy it evaded immediately after dash; latest correction: Winter Gunner stays in Snow and Laser Cannon stays in Capital; the earlier swap is cancelled; Suppressor stops hit enemies; reject Tunnel Listener. Detailed mechanics below preserve the agreed proposal numbers as initial tuning.

- Mobile Skirmisher: light weapon fires while continuing current movement order, 160px range and reduced firing rate. A shot cannot change movement into pursuit. Ordinary terrain collision; no jumping gaps or immunity.
- Platform Defender: deploy after 1s stationary, 300px range, 2-damage shots every 1.5s. Cannot fire while moving; packing takes 0.5s. Guard deploys at anchor. No new platform mechanics.

Common limits: preserve established aiming rules, German physical-key controls, source sprite/map coordinate conventions, enemy-only barrel damage, explicit orders, support limits and unrelated work. Use dependency-free runtime and small explicit modules. No recovered-asset regeneration, original-game research, publication, campaign persistence or unrelated systems. Unspecified ordinary weapon tuning may use existing infantry defaults and must be documented. Do not silently resolve health eligibility, exceptional enemy phase conflicts or missing essential UI controls by expanding scope; relay a material question.

Execution authorized by user on 2026-10-07: director dispatches agents one ticket at a time, independently reviews and squash-integrates accepted work. Existing-world placement details can use conservative defaults; explain decisions in worker journal. Each world is one bounded ticket, not authority to implement the whole roster table.

## Sessions

- Planning approval and queue: [2026-10-07 roster checkpoint](../journal/2026-10-07-009-world-roster-planning.md).

- [2026-10-08 / 011](../journal/2026-10-08-011-floating-habitats-trooper-roster.md)

## Review evidence

Implemented in prepared session011. Opt-in Floating Habitats roster, starting arrays, configured production/support factories and distinct Units/Controls portraits/text; no matching mission exists, so TRI-091 remains separate. Focused actual update fixtures cover both kits, legal Defender attack-move encounter stops/resumption and shared Tracker range compatibility. Full `node tools/dev.cjs test` exited0; affected Floating/Toxic/immutable combat checks reran after final corrections. Browser rendering/audio/playability not run, recorded separately in playtests/2026-10-08-floating-habitats-troopers.md. Ready for director review; not merged or published.
