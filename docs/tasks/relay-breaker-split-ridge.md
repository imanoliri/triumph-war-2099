# Build Split Ridge as a new Relay Breaker map

- Ticket: TRI-032; state in [local board](../BOARD.md).
- Branch: not started

## Goal and user-visible outcome

Build Split Ridge as a new Relay Breaker map

## Acceptance criteria

- [ ] Relay Breaker loads a purpose-built Split Ridge terrain image/mask and agreed placements, with playable routes and support delivery; originals and saved B/C concepts preserved.

## Scope and decisions

User explicitly selected proposalA Split Ridge and requested preservingB Relay Basin andC Switchback Mesa for possible later missions on2026-10-04. This authorizes implementingA; alternatives already durable under docs/design/relay-breaker-maps and must remain saved/unregistered. Follow acceptedA geometry/placement metadata in proposals.json, PNG/SVG and comparisonREADME, preserve Relay Breaker assault rules/actors/objectives and original1024x768 coordinate/sprite convention. New map must be purpose-built, not Desert Rocks trace. Use original-compatible sand/rock pixel-art palette as routine visual default, retain agreed wide clearances/flank/east connector; rectangle schematics are not finished map artwork.

Worker owns new custom terrain art, collision mask and explicit metadata under custom-owned paths; never overwrite recovered maps/masks/source installations. Author terrain locally using deterministic native tools/canvas/vector/raster as appropriate, existing palette/style references with explicit source/provenance, no unrelated asset regeneration or new browser dependency. Avoid copying baked original actors into scenery. Preserve HUD/world top strip and pixel scale. Separate custom terrain override from source-rule/support template only as far as required; original nine and source support semantics unchanged. Update Relay Breaker placements toA exact25points, fourcommanders/eightsoldiers/sixbugs/twonests/tworelays/threepickups. No initialtank/waves/timer/doors/newunits. Existing Normal finite nestbirths, tactical starts, German keys, asymmetric aiming, cannon behaviors, army caps and enemy-onlybarrel damage preserved. Support template Desert Rocks remains eligible, but validate troop/tank delivery and turning/formation/rally routes on newmask; custom-owned delivery geometry allowed where needed without modifying original support paths.

Acceptance evidence: actual compiled terrain/mask align with artwork; all spawn/objective/pickup points clear and connected with appropriate body/tankclearance; both relay orders, legalinteraction/firingpositions and enemyclearance; physical routes on northern/southern/east connectors, tankdelivery/movement/rally and troopformations; no original actors or spriteplaceholder leakage; restart/difficulty/customidentity/results/originalmapisolation; dependency-free serving/package/loadchecks; relevant regression plusfull node tools/dev.cjs test. Perform browser visual/movement/objective/support checks per PLAYTEST using available hiddenIAB; ideally full Normal completion and record time/casualties/support/births, never claim unavailablelive/audio/balance. Update DESIGN/architecture/guide/status/provenance and durable session; honest limitations reviewed bydirector. No globalbalancechange, unrelatedbugfix, nesteddelegation/boardedit/merge/publish. New fresh isolated worker after activeTRI-031, stopsReview with scoped commit and visualartifactpaths. B/C remain intact as later-mission concepts.

## Sessions


