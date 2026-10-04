# Add custom mission registry and Relay Breaker

- Ticket: TRI-024; state in [local board](../BOARD.md).
- Branch: `feature/custom-relay-breaker`

## Goal and user-visible outcome

Add custom mission registry and Relay Breaker

## Acceptance criteria

- [x] Playable separately labelled Relay Breaker assault requires both unique relays and enemy clearance; all nine originals and their progress preserved; checks and honest live limitations recorded.

## Scope and decisions

User explicitly requested creating new missions after TRI-022. Director announced three existing-asset candidates as working scope; count preference remains unsubmitted and is not recorded as user agreement. This first independently playable mission implements the authorized creation request. Parent TRI-019; accepted design TRI-023 at d49158a. Follow docs/design/custom-missions.md and its JSON exactly for Relay Breaker and the minimal runtime seam. Implement only registry + Relay Breaker; no defense/infiltration behavior on this branch.

Add stable custom IDs, separate custom loader/selection/briefing/results and in-memory progress without changing original loadMission(1..9), source metadata, original progression or merits. Reuse Desert Rocks terrain and existing sprites with explicit custom actor/pickup lists and disabled random pickups/growplants. Four commanders, eight soldiers, two nests, six bugs and exact relays/support/weapon coordinates are in the accepted design. Both independently keyed relay activations plus full nest/birth/enemy clearance are required. Preserve tactical start/freeze, German keys, AI commander default, asymmetric aim, cannon directions, support map eligibility/caps/rally, finite Normal breeding and all original nine mission rules. Restart, difficulty and mission switching must reset custom flags safely. No new assets/dependencies, original installation changes, balance redesign or unrelated refactor. Update current DESIGN/mission guide/architecture as necessary and include script in all existing allowlists/checks.

Add meaningful regression evidence for both relay orders, missing flag, living/birthing nest/enemy gates, nest birth cancellation, tactical freeze/restart, unique terminal keys, custom/original progress isolation, all nine original objectives, support cap/movement and loading/selecting/restarting/switching difficulty. Run node tools/dev.cjs test. Attempt browser playtest only through available authorized tools per PLAYTEST; if unavailable explicitly record limitation, never claim live completion/balance/audio verification. Worker owns implementation and documentation in isolated checkout, never delegates or edits director board, stops at Review with scoped commit and durable session. Director independently reviews and squash-integrates accepted work; publication follows existing user push authorization.

## Sessions


- [2026-10-04 / 039](../journal/2026-10-04-039-custom-relay-breaker.md)

## Review evidence

Implemented registry and Relay Breaker only. Full dev suite and focused runtime/geometry checks pass; browser smoke verifies custom selection/brief/HUD/sprites/tactical deployment. Full Normal live completion, support usage, casualties, elapsed completion time, LOS softlocks and audio/balance remain unverified; see [playtest](../playtests/2026-10-04-relay-breaker.md). Ready for independent review, not merged or published.

Director accepted implementation after independent runtime diff review, passing full suite and live smoke of corrected sprites/CUSTOM HUD/tactical start. Acceptance includes the explicit limitation that full Normal playthrough, live support usage, casualties, completion time, remaining births, LOS softlocks, balance and audio remain unverified; none is claimed passed.
