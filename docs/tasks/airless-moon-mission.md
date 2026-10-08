# Airless Moon mission

- Ticket: TRI-090; state in [local board](../BOARD.md).
- Branch: `feature/airless-moon-mission`
- Dependency: TRI-083 integrated before dispatch.

## Goal and user-visible outcome

Add one playable selectable custom mission for Airless Moon, giving its approved roster an actual battlefield.

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
- [2026-10-08 / 016](../journal/2026-10-08-016-airless-moon-mission.md)
