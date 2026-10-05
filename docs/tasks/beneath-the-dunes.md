# Create Beneath the Dunes desert convoy rescue

- Ticket: TRI-036; state in [local board](../BOARD.md).
- Branch: not started

## Goal and user-visible outcome

Create Beneath the Dunes desert convoy rescue

## Acceptance criteria

- [ ] Implement the approved desert convoy-rescue objective and new map, with reachable routes, charging-worm encounters, difficulty profiles and separately recorded live evidence.

## Scope and decisions

User selected a stranded-convoy rescue on the frontier desert planet on 2026-10-05. See [mission refinement](../planning/campaigns/missions/desert-operation.md). Depends on TRI-035 charging worms. User explicitly chose repair and escort of actual convoy vehicles. Vehicle repair/escort is new scoped behavior to refine, not an infantry-rescue substitute. Obtain reviewed schematic layout before freezing geometry; create map-specific art contract and references, preserving every other world in the campaign pack. Initial roster, support, rescue eligibility, victory/loss gates and difficulty parameters require refinement. Runtime mission implementation and delegated art polish remain separate bounded work; no campaign-wide progression or under-city enemies in scope.

## Sessions

## Further user decisions

Prerequisites: TRI-035 worms, TRI-040 confirmed human faction roster. Mission vehicle count, loss/success rule and schematic map remain for user refinement; do not dispatch036 before those choices are recorded.

Map review dependency: [TRI-041 proposals](beneath-the-dunes-map-proposals.md). User must select a shown layout before036 freezes geometry. Queue035→041→040→036, with040 able to proceed while map choice is pending.

Actual subsequent user answer2026-10-05: two crawlers; saving one is enough. Rescue victory requires at least one repaired crawler reaching extraction; both destroyed fails vehicle rescue. This supersedes pending vehicle-count/loss choice above. Approved Field mechanic repairs, normal escort routing with diagonal evade and limited automines apply. Schematic map review remains before036 dispatch; numerical repair/escort/timing/force profiles may be worker-owned after geometry approval.

2026-10-05 confirmed faction roster: Rider scout automatically evades nearby bugs; Dune guard shotgun fires five short-range pellets in an arc; Field mechanic repairs nearby vehicles; Convoy crawler has 6 HP and ordinary escort-route movement plus diagonal auto-evade against cardinal worm charges. User accepted limited automatic mines, dropped behind the crawler after an evade. Exact ammunition and tuning remain worker-owned implementation choices after bounded scope preparation. Human unit/vehicle behavior should be split into a prerequisite ticket before mission integration rather than silently expanding the mission branch. Sand buggy was proposed but not selected.
