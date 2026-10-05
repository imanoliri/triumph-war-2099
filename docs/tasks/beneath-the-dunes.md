# Create Beneath the Dunes desert convoy rescue

- Ticket: TRI-036; state in [local board](../BOARD.md).
- Branch: `feature/beneath-the-dunes`

## Goal and user-visible outcome

Create Beneath the Dunes desert convoy rescue

## Acceptance criteria

- [x] Add selectable Beneath the Dunes using approved layout A—Twin Crescent, with distinct custom terrain and both reachable escort arcs; preserve B/C proposal files.
- [x] Place confirmed Desert Rider roster and charging worms; two disabled six-HP crawlers require mechanic repair before escort. At least one repaired crawler reaching extraction wins; both destroyed loses. No infantry substitute, evade immunity or unlimited mines.
- [x] Provide all-five difficulty profiles, readable briefing/objective/repair/escort progress, tactical start, restart and original/custom mission isolation. Document initial tuning and challenge limits.
- [x] Verify actual full-body routes, repair and victory/loss gates with relevant regressions and full suite; separately record browser gameplay evidence and limitations. Prepare a map-specific terrain/art contract for later delegated polish.

## Scope and decisions

User selected a stranded-convoy rescue on the frontier desert planet on 2026-10-05. See [mission refinement](../planning/campaigns/missions/desert-operation.md). Depends on TRI-035 charging worms. User explicitly chose repair and escort of actual convoy vehicles. Vehicle repair/escort is new scoped behavior to refine, not an infantry-rescue substitute. Obtain reviewed schematic layout before freezing geometry; create map-specific art contract and references, preserving every other world in the campaign pack. Initial roster, support, rescue eligibility, victory/loss gates and difficulty parameters require refinement. Runtime mission implementation and delegated art polish remain separate bounded work; no campaign-wide progression or under-city enemies in scope.

## Sessions

2026-10-05 user selected **A—Twin Crescent** in reply to the presented A/B/C packet. Freeze runtime geometry from A in [geometry.json](../planning/campaigns/maps/beneath-dunes/geometry.json); preserve B/C for later missions. TRI-035 and TRI-040 are merged prerequisites. Mission-specific roster counts, disabled starting damage/repair threshold, escort eligibility/proximity, extraction radius and difficulty encounter timing are bounded worker-owned tuning; document and verify them. Use existing worms and faction abilities unchanged, no new worm-producing nest mechanic. The illustrative N? anchors may be omitted or mapped to existing ordinary bug nests. Runtime geometry and readable baseline visuals belong here; decorative art polish remains a separate delegated ticket.

## Further user decisions

Prerequisites: TRI-035 worms, TRI-040 confirmed human faction roster. Mission vehicle count, loss/success rule and schematic map remain for user refinement; do not dispatch036 before those choices are recorded.

Map review dependency: [TRI-041 proposals](beneath-the-dunes-map-proposals.md). User must select a shown layout before036 freezes geometry. Queue035→041→040→036, with040 able to proceed while map choice is pending.

Actual subsequent user answer2026-10-05: two crawlers; saving one is enough. Rescue victory requires at least one repaired crawler reaching extraction; both destroyed fails vehicle rescue. This supersedes pending vehicle-count/loss choice above. Approved Field mechanic repairs, normal escort routing with diagonal evade and limited automines apply. Schematic map review remains before036 dispatch; numerical repair/escort/timing/force profiles may be worker-owned after geometry approval.

2026-10-05 confirmed faction roster: Rider scout automatically evades nearby bugs; Dune guard shotgun fires five short-range pellets in an arc; Field mechanic repairs nearby vehicles; Convoy crawler has 6 HP and ordinary escort-route movement plus diagonal auto-evade against cardinal worm charges. User accepted limited automatic mines, dropped behind the crawler after an evade. Exact ammunition and tuning remain worker-owned implementation choices after bounded scope preparation. Human unit/vehicle behavior should be split into a prerequisite ticket before mission integration rather than silently expanding the mission branch. Sand buggy was proposed but not selected.
- [2026-10-05 / 026](../journal/2026-10-05-026-beneath-the-dunes.md)

## Review packet

Worker implementation is ready for independent Review, not merged. All-five rosters/packed geometry/actual repair-route-gate regressions and full suite pass; final Units-copy affected check is recorded in session026. Exact49px approved route envelopes pass against the packed mask; navigation adds its own4px probe margin. Both isolated crawler routes complete in29.4/35.2s without enemies. See [initial/final challenge evidence](../design/beneath-dunes-pressure.json), [browser smoke with explicit gaps](../playtests/2026-10-05-beneath-dunes.md), [art contract](../art-kit/beneath-dunes/contract.md) and session026 for decisions/remaining review.
