# Develop distinct world-map layout options and comparison artifact

- Ticket: TRI-095; state in [local board](../BOARD.md).
- Branch: not started

## Goal and user-visible outcome

Provide a durable visual map-options atlas for all newer world missions, following the earlier desert proposal packets, so the user can compare genuinely different tactical layouts and select replacements/new mission layouts.

## Acceptance criteria

- [ ] Deliver three meaningfully different layout options for each of13 worlds: Snow, Maritime, Capital, Jungle, Volcanic, Undercity, Industrial, Mercenary Frontier, Toxic Marsh, Airless Moon, Floating Habitats, Abandoned World and Orbital Scrapyard. Existing desert proposals and recovered nine maps remain preserved.
- [ ] Provide a readable visual comparison artifact with world navigation, overview/contact sheets and individual clearly labelled proposals; durable editable SVG/canvas/native source plus proposed geometry/hotspot metadata in repository. Show terrain, friendly deployment, objectives, enemies, reinforcement access, main/flank routes and legend. Use existing1024x768 convention/top HUD reservation.
- [ ] Explain concise pros/cons and tactical tradeoffs for each option: route topology, sightlines, chokepoints, objective sequencing, exposure, movement/vehicle access and specialist use. Do not produce repeated central-core plus symmetric corner layouts with renamed scenery. Audit cross-world similarity and give each world distinct spatial identity.
- [ ] Preserve existing mission objectives, approved roster mechanics and gameplay budgets as constraints; show useful existing specialist roles. Planned Abandoned/Orbital missions may use their already-authorized existing-system scope, with no new mechanics. Any material feasibility conflict is relayed rather than silently changing rules.
- [ ] Validate conceptual connected routes, sufficient actor/vehicle corridor widths, legal placements, objective/support access and enemy targetability using explicit geometry/disposable fixtures. Clearly distinguish schematic feasibility from runtime collision, live playability or calibrated balance. Record exact checks and limitations.
- [ ] Run node tools/dev.cjs test, document inherited baseline failures separately if still present, update task/session and comparison guide, commit scoped proposals and stop at Review. Do not replace runtime maps in this design ticket.

## Scope and decisions

User2026-10-08 requested more unique maps and many different layouts with pros/cons in an artifact like earlier desert proposals, then explicitly selected all newer world missions for the first artifact. Three options per world is the director's bounded proposal count (39 options), retaining alternatives for future use. This is one design-atlas deliverable, not authority for39 runtime missions or new hazards/mechanics.

Reference accepted proposal workflows: docs/tasks/relay-breaker-map-proposals.md, docs/tasks/beneath-the-dunes-map-proposals.md and their linked durable selection packets. Use dependency-free native geometric authoring; no generative bitmap needed. Label authored concepts and preserve original/recovered authorship and source paths. No original-game research, installed-game modifications, asset regeneration for unrelated work, publication, nested delegation or board edits.

Execution order: finish active TRI-094 repair, then prepare this atlas before returning to preserved TRI-085/086/067 queue. Show actual reviewed artifacts to user and record layout choices. Choices inform queued TRI-092/093; each existing runtime replacement is a separate bounded ticket after selection. Existing playable maps remain intact while design runs.

## Sessions

- Director request/approval: [session018](../journal/2026-10-08-018-director-continuation.md).
