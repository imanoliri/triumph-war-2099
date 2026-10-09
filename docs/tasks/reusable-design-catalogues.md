# Create reusable layout, soldier and enemy design catalogues

- Ticket: TRI-096; state in [local board](../BOARD.md).
- Branch: `chore/reusable-design-catalogues`

## Goal and user-visible outcome

Provide three reusable, studied design catalogues independent of mission scripts: layout patterns, soldier capabilities, and enemy behaviours/concepts. Mission briefs select catalogue entries and supply objectives, placements, roster eligibility and finite budgets. A readable comparison artifact makes strengths, weaknesses, compatibility and unknowns visible before implementation.

## Acceptance criteria

- [x] Deliver a browsable catalogue artifact plus durable editable structured records with stable IDs for layouts, soldiers and enemies. Cross-link entries without requiring a particular mission; include a concise authoring/composition guide.
- [x] Preserve and index all39 TRI-095 map options and earlier desert proposals. Analyse at least12 reusable spatial patterns with diagrams, topology, sightlines, chokepoints, exposure, movement/vehicle clearance, objective flexibility and failure modes. Separate generic pattern identity from world art and current mission references; retain selected Abandoned A/Orbital B and every alternative.
- [x] Catalogue all implemented player troop/specialist types from current factories/Units and approved deferred soldier concepts from task records. Record source-backed capability/range/timing/health/order/terrain/support restrictions, useful roles, weaknesses and compatible layout/enemy pressure. Clearly label implemented, approved pending, deferred and unapproved proposals.
- [x] Catalogue existing enemy types/phase rules from runtime and add six distinct authored new-enemy design concepts with role, telegraph, counterplay, layout needs, budget/performance risks and unresolved decisions. Proposed concepts are design alternatives, not implemented enemies or approved mechanics. Preserve recovered/authored provenance distinctions.
- [x] Provide a compatibility matrix and at least three worked mission-composition examples using catalogue references, with clear feasibility/restriction labels. Describe a future mission contract separating layout, art/theme, units, enemies, objectives, placements, support and difficulty budgets. Existing world-only roster restrictions remain explicit; unsupported combinations require separate approval/implementation.
- [x] Validate record IDs/links/statuses and source-backed implemented facts using disposable checks; inspect the actual readable artifact. Update task/session/current design documentation, run relevant project checks and node tools/dev.cjs test, record limits and return a scoped clean commit at Review. No runtime behaviour changes in this ticket.

## Scope and decisions

User2026-10-09 requested studied catalogues with analysis for map layouts, soldiers and new enemies, independent of mission construction, to separate work and combine components flexibly. This ticket owns the reusable design library and composition specification. Runtime extraction, configurable mission builder, cross-world roster unlocking, new enemy/soldier mechanics and map replacement each remain separate bounded implementation work after concrete design choices.

Use current repository code/task records as the factual source. Consult existing atlas/desert packets and DESIGN/ARCHITECTURE; preserve original source attribution and all39 sources/exports. Catalogue references to current missions are examples, not identity or dependencies. Any external design references must be primary sources with attribution; no original-game research or installed-game access. Separate observed runtime facts, design inference and proposals. Do not turn conjecture into numeric implemented stats or claim schematic geometry proves runtime playability.

Execution order: finish active TRI-092, then this catalogue design ticket, then TRI-093 using already-selected Orbital B. One worker at a time, isolated branch, independent director review and accepted squash integration. Preserve all existing worktrees/scratch. No nested delegation, runtime refactor, balance change, asset regeneration, publication or licensing changes.

## Review result

Acceptance complete: [browsable catalogues](../design/catalogues/catalogue.html), [structured evidence](../design/catalogues/catalogue.json), [authoring/composition contract](../design/catalogues/README.md) and [actual artifact QA/screenshots](../design/catalogues/QA.md). Twelve generic patterns,34 implemented human entries with explicit deferred/rejected/historical statuses,7 existing+6 proposed enemy roles,45 preserved map alternatives and3 worked briefs. Source/factory/roster/record/DOM checks, unchanged atlas checks and full `node tools/dev.cjs test` passed. Runtime/assets/atlas unchanged; no gameplay/balance/publication claim. Latest session owns handoff; awaiting independent director review/squash integration.

## Sessions

- Director request and scope: [session018](../journal/2026-10-08-018-director-continuation.md).
- [2026-10-09 / 004](../journal/2026-10-09-004-reusable-design-catalogues.md)
