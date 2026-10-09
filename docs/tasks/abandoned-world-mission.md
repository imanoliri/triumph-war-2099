# Abandoned World mission

- Ticket: TRI-092; state in [local board](../BOARD.md).
- Branch: `feature/abandoned-world-mission`
- Dependency: TRI-085 integrated before dispatch.

## Goal and user-visible outcome

Add one playable selectable custom mission for Abandoned World, giving its approved roster an actual battlefield.

## Acceptance criteria

- [x] Add exactly one custom mission with authored terrain, selector entry, briefing and visible objectives, preserving existing missions and recovered assets.
- [x] Integrate matching approved specialists in starting forces, world-only reinforcement menus and actual deliveries; demonstrate useful legal specialist roles without changing their mechanics.
- [x] Provide connected collision-safe routes, reachable objectives, legal placements and finite sufficient support; inaccessible enemies must not prevent completion.
- [x] Define all five supported profiles (Very easy, Easy, Normal, Hard, Very hard) using existing conventions and finite enemy/wave budgets; production fixtures verify objectives, victory, defeat, restart and actual support capacity on every profile.
- [x] Run node tools/dev.cjs test and focused regressions; update current documentation and task/session handoff, record browser map/UI/playtest evidence separately from simulations and return a scoped commit at Review.

## Scope and decisions

User2026-10-08 authorized creation, queuing and sequential implementation of missing-world missions. One mission per ticket, following the roster queue and parked TRI-067 soundtrack. One isolated feature-branch worker; independent director review and squash integration authorized.

Worker may author name, layout, placements and concise objectives with existing supported assault/defense/infiltration primitives and existing enemies/support. Choose conservative playable scenarios demonstrating approved world kits; document decisions and budgets. Use established dependency-free custom-terrain/rendering pipeline and existing available visuals; distinguish authored maps from recovered data. No original-game research or installed-game edits.

World identity is theme, briefing and roster. No new oxygen/gravity/flight/toxicity, economy, campaign persistence, health rules, equipment, enemy species or gameplay systems implied. Missing/deferred kits stay deferred. Relay essential material conflicts. No campaign reordering, unrelated rebalance, asset regeneration, publication or licensing changes. Preserve aiming asymmetry, German physical keys, coordinate conventions, enemy-only barrel damage and unrelated work.

## Sessions

- Planning: [director queue](../journal/2026-10-08-002-director-queue.md).

## Layout selection checkpoint

User2026-10-09 selected A (Ruin terraces) by accepting the director recommendation, and explicitly requested saving all choices for later. Implement this selected proposal from the retained TRI095 atlas geometry and comparison guide; preserve every A/B/C source and export as reusable alternatives. Adapt schematic placements into actual terrain safely while retaining route identity, existing systems and all-five acceptance. Integrated roster prerequisite: 4efb7897ba11c3be5520b7a17503ca3fb1bc40a5. Execute Abandoned first, then Orbital; separate isolated branches and reviews.
- [2026-10-09 / 003](../journal/2026-10-09-003-abandoned-world-mission.md)

## Review evidence

Exactly one selectable mission, selected A topology/placements and preserved39 atlas alternatives. Five explicit finite profiles; world menus/actual ground deliveries and useful starting specialists/7HP robot covered in tools/check-abandoned-terraces.cjs. Existing clear-source semantics permit exhausted nests, explicitly documented. Full suite/commit handoff is in session003; live spot checks are separate in docs/playtests/2026-10-09-abandoned-terraces.md. Full live victory/audio/human calibration remains unverified. Worker stops at Review for independent director review.
