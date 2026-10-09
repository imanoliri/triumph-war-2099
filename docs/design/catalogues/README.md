# Reusable design catalogues

Open [browsable catalogue](catalogue.html), or inspect [structured records](catalogue.json). This is a design library, independent of mission construction. It does not configure the runtime. Twelve generic layout IDs, 34 implemented human entries, one explicitly deferred Field Medic, rejected/historical alternatives, seven existing enemy roles, six proposed enemies and all 45 map alternatives remain editable and cross-linked.

## Authoring and evidence

Edit authored analysis in `records.cjs`, contextual composition/index mappings in `build.cjs`, presentation in `template.html`. Run from repository root:

```text
node docs/design/catalogues/build.cjs
node docs/design/catalogues/check.cjs
node tools/dev.cjs test
```

The builder reads current repository sources and the existing disposable VM fixture; it writes only catalogue HTML/JSON. `capture.cjs` captures exact Units prose, actual infantry reinforcement initialization, module rules, burst timing and current world rosters. It never changes production data. Commander/vehicle/companion/escort facts are explicitly contextual guide/mission evidence, not fake infantry factory values. Factory order 0 is initialization, not a restriction on later player orders. Crawler nominal cap is 6 but Beneath the Dunes starts at 2 and disabled. Robot cap7 comes from actual mission initialization; generic `unit()` defaults alone are insufficient. Heavy Trooper HP3 is initialized by its module. Existing 1 HP infantry cannot survive an ordinary full damage hit and become a healing recipient. Mechanic/Recovery recipients are explicit living ground vehicles/Heavy Troopers, not an implied infantry-health redesign.

`catalogue.json` is a committed evidence snapshot with baseline, classification, stable IDs, explicit source paths/hashes, structured rules and analysis. Regeneration deliberately updates evidence; review source drift and re-run checks. Do not rename IDs after references exist. Add a new record and mark an old identity superseded when identity meaning changes. Status vocabulary: `implemented`, `design-inference`, `approved-pending`, `deferred`, `rejected`, `unapproved-proposal`, `selected-implemented`, `selected-approved-pending`, `retained-alternative`. Status never enables mechanics. There are no currently unimplemented approved kits other than explicitly deferred Medic; Orbital mission integration remains pending, its two kits already exist. Jungle “ambush spotter” and former numeric candidates are unapproved/superseded drafts, not another approved deferred roster entry.

Map sources, PNG/SVG exports, original attribution and selections are references, never regenerated. TRI-095 all39 remain independent map records. Earlier Relay Breaker A/B/C and Beneath the Dunes A/B/C are also indexed. Dunes A was selected and is implemented; saved B/C and runtime Dunes variant B are distinct history. Selected Abandoned A and Orbital B stay identified; no alternative is overwritten. Authored graph diagrams are topology analysis, not collision geometry, recovered assets or measured tactical results.

## Future mission contract (specification only)

Keep these sections separate so later mission code can validate each independently:

| Section | Required fields and ownership | Validation gate |
| --- | --- | --- |
| `layout` | Generic stable pattern ID plus independent geometry ID/version, route graph, blockers, usable bounds and body envelopes | Actual navigation, full footprints, bends and swept dodges; graph connectivity alone is insufficient |
| `artTheme` | World/theme identity, immutable art source/export refs, geometry binding, attribution | Art follows geometry/hotspots; decoration must not add collision or immunity |
| `units` | Stable capability IDs, explicit legal `worldRoster`, starting counts and health context | Existing world restriction is a hard gate; cross-world unlock needs separate approval/implementation |
| `enemies` | Implemented role IDs, phase eligibility, population reservations and finite spawn policy | Proposed IDs rejected by any future runnable adapter until separately approved/implemented |
| `objectives` | Existing objective kind, target keys, completion/defeat/extraction conditions | Do not infer new objective scripts from graph labels |
| `placements` | Hotspot coordinates, actor/object source identifiers, route assignments, arrival/retreat/refuge points | x right/y down in current 1024×768 world; HUD exclusion and sprite hotspots preserved; check all footprints |
| `support` | Finite caches, eligible payload snapshots, reservation/cap ownership, starting vehicles separate from deliveries | Ground/air/drop reservations and original Desert cap convention preserved; no hidden refill |
| `difficulty` | Per-setting starting roster, enemy HP/motion, nest cadence/opportunity/birth budgets, wave times/counts, resource limits | Separate geometry from pressure; include active and pending entities, finite ammo and cumulative cleanup work |

Illustrative future structure (not a runtime API):

```json
{
  "layout": {"patternId": "layout-asymmetric-wheel", "geometryRef": "independent-approved-geometry-version"},
  "artTheme": {"world": "Orbital Scrapyard", "referenceId": "map-orbital-scrapyard-b"},
  "units": {"capabilityIds": ["soldier-soldier", "soldier-mine-layer", "soldier-breacher"], "worldRosterRef": "current Orbital Scrapyard roster"},
  "enemies": {"roleIds": ["enemy-ground-bug", "enemy-nest"], "spawnPolicy": "finite profile with reservations"},
  "objectives": {"kind": "existing terminal activation and cleanup", "keys": ["relay-a", "relay-b"]},
  "placements": {"coordinateConvention": "sprite hotspots", "recordsRef": "separate reviewed coordinates"},
  "support": {"finiteCachesRef": "separate payload and capacity records"},
  "difficulty": {"profilesRef": "separate all-five pressure profiles"}
}
```

Choose space, then art, then legal capability/pressure composition. Design each counterplay route before placement. Do not combine world-only specialists merely because matrix roles fit. A Capital beam and Snow sniper composition is an unsupported roster combination requiring a separate decision; proposed moth pressure additionally needs implementation. Long-lane reach cannot shoot through turns; setup troops need retreat time; close cones need rifle backup; phase immunity overrides raw damage compatibility. A friendly kit that can hit an exposed ground worm still cannot target a ceiling transition or buried worm. Supplied matrix is an affinity analysis, not permission to change targeting or menus.

## Verification limits

Source hashes use raw PNG bytes and LF-normalized UTF-8 text, explicitly recorded in JSON. This preserves source-content checks across Windows Git CRLF checkout conversion without changing source files.

Disposable source/ID/link/factory/roster/DOM checks validate the records and interactions. Browser artifact QA is recorded in the ticket journal. No gameplay/balance/terrain/assets changed, and artifact inspection does not establish live mission playability, rendering or audio. No original-game access, external design research, publication or asset distribution occurs.
