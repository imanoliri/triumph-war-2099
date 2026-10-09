# Orbital Scrapyard mission

- Ticket: TRI-093; state in [local board](../BOARD.md).
- Branch: `feature/orbital-scrapyard-mission`
- Dependency: TRI-086 integrated before dispatch.

## Goal and user-visible outcome

Add one playable selectable custom mission for Orbital Scrapyard, giving its approved roster an actual battlefield.

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
- [2026-10-09 / 005](../journal/2026-10-09-005-orbital-scrapyard-mission.md)

## Layout selection checkpoint

User2026-10-09 selected B (asymmetric hull circuits) by accepting the director recommendation, and explicitly requested saving all choices for later. Implement this selected proposal from the retained TRI095 atlas geometry and comparison guide; preserve every A/B/C source and export as reusable alternatives. Adapt schematic placements into actual terrain safely while retaining route identity, existing systems and all-five acceptance. Integrated roster prerequisite: 83f3794ba47436c808862ed3dfaee10a6c0a07d1. Execute Abandoned first, then Orbital; separate isolated branches and reviews.

## Implementation evidence

[Mission design](../design/orbital-scrapyard.md) records selected source identity,budgets and specialist roles; [all-five production fixtures](../design/orbital-scrapyard-evidence.json) verify real collision/movement,finite births,interactions,controlled completion/loss/reset and finite eagle delivery/caps. [Browser spot checks](../playtests/2026-10-09-orbital-scrapyard.md) record actual UI/rendering evidence and skipped full combat wins/audio. Review: final full suite passed; scoped implementation commit contains this record. Director owns board/integration.

## Integration

Accepted squash60661e184c20523b3d1ec15fb8a0cb5d0d9c9d5c from reviewed workerbcc5980de7beb87c219da5f617326d93c2c9e444. Independent production checks and static actual browser evidence accepted; fullsuite59007exit0. Full humanwins/audio remain unverified.
