# Propose a new Relay Breaker map for user review

- Ticket: TRI-029; state in [local board](../BOARD.md).
- Branch: `chore/relay-breaker-map-proposals`

## Goal and user-visible outcome

Propose a new Relay Breaker map for user review

## Acceptance criteria

- [x] Produce distinct visual custom-map proposals with terrain, routes, objectives, starts and enemy/support placements; user selects and refines a proposal before new-map implementation.

## Scope and decisions

User asked whether Relay Breaker has a new map and stated a new map would be good; explicitly requested map proposals to align and review on 2026-10-04. Director clarified existing Desert Rocks reuse. After active TRI-025 finishes, prioritize a fresh bounded design worker for three meaningfully distinct Relay Breaker map proposals; TRI-026 infiltration remains queued meanwhile. This ticket authorizes proposal design only, not final map/asset/gameplay implementation.

Provide clear user-reviewable visual artifacts plus brief comparison: purpose-built new terrain in original1024x768 coordinate convention, deployment for4commanders+8soldiers, two relays, two nests, accessible enemy firing lanes, main and optional flank routes, support pickups and tank-compatible outdoor circulation. Preserve existing Relay Breaker assault objective/units and existing gameplay rules. Proposals must be new layouts rather than traces of Desert Rocks; existing terrain palette/sprites can inform style, clearly labelled schematic concepts rather than recovered source. Use native SVG/canvas or other suitable durable artifacts in repo docs, with readable legend/labels and overview thumbnails. No generative bitmap required for geometric planning, no new dependency or original installation modification. Show chokepoints, route tradeoffs, sightline/movement risks and estimated implementation seam/asset needs. Validate conceptual connectivity and sufficient corridor widths without claiming runtime collision or balanced live gameplay. Keep scope concise for user choice and iteration; do not implement selected map until user explicitly selects/refines it.

Worker owns design/artifact creation and feasibility inspection, stops Review with scoped commit/session and concise links/decision needed. Director reviews, presents actual visual proposals to user, records their selection/feedback, and only then creates a bounded implementation ticket. No nested delegation/board edits/merge/push. Current original nine maps and runtime remain unchanged in design ticket.

## Sessions


- [2026-10-04 / 043](../journal/2026-10-04-043-relay-breaker-map-proposals.md)

