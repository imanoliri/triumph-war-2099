# World-map layout atlas — TRI-095

Open [the local interactive atlas](atlas.html). Select a world, compare A/B/C, then use **Inspect at full size** for readable actor labels. Each option explains its route topology, objective approach, exposure cost and specialist use. The atlas is a standalone file with inline data/SVG and no network requests, packages or server requirement. Its export links point to sibling repository files. Browser policy may block local-file preview in some environments; the PNG/SVG sheets provide durable review access.

[All39 thumbnail contact sheet](all-worlds-overview.png) / [editable SVG](all-worlds-overview.svg) provides a visual index. Individual sheets are1536×470; individual proposals are1024×820, including a52px annotation footer outside the1024×768 world. Use the individual PNG/SVG to inspect detail; thumbnail labels are deliberately not the primary review surface.

| World | Comparison sheet | Spatial identity and objective constraint |
| --- | --- | --- |
| Snow | [PNG](snow-overview.png) / [SVG](snow-overview.svg) | Glacier fork, staged switchback or branching ice teeth; rescue and return ONE living survivor to D/X. |
| Maritime | [PNG](maritime-overview.png) / [SVG](maritime-overview.svg) | Three dock heads, crescent seawall or twin basins;120s mobile defense, finite births/arrivals, preserve a noncommander. No terminal objectives. |
| Capital | [PNG](capital-overview.png) / [SVG](capital-overview.svg) | Boulevard/terrace, successive courtyards or transit loop/alley; two transit terminals,120s hold,70s three-person relief and clearance. L1–L3 are future friendly landings. |
| Jungle | [PNG](jungle-overview.png) / [SVG](jungle-overview.svg) | Root delta, spiral ruin or three clearings; existing ambush anchors, rescue and return ONE survivor to D/X. |
| Volcanic | [PNG](volcanic-overview.png) / [SVG](volcanic-overview.svg) | Basalt stairs, diagonal fissure bridge or quarry trident; two pressure terminals and clearance; only existing marked thermal hazards. |
| Undercity | [PNG](undercity-overview.png) / [SVG](undercity-overview.svg) | Drain bypass, service ladder or fan galleries; two hacks then ALL surviving ground forces at X, including a noncommander; enemies may remain. |
| Industrial | [PNG](industrial-overview.png) / [SVG](industrial-overview.svg) | Braided assembly aisles, rail crossing or horseshoe maintenance shortcut; two terminals and clearance. |
| Mercenary Frontier | [PNG](mercenary-frontier-overview.png) / [SVG](mercenary-frontier-overview.svg) | Three forts, broken ridge or runway pincer; two terminals and clearance. |
| Toxic Marsh | [PNG](toxic-marsh-overview.png) / [SVG](toxic-marsh-overview.svg) | Dry island chain, reed fan or sluice diamonds; two containment terminals and clearance; no new toxicity rules. |
| Airless Moon | [PNG](airless-moon-overview.png) / [SVG](airless-moon-overview.svg) | Rim spokes, dome necklace or excavation rake; two terminals and clearance; drones remain ground actors. |
| Floating Habitats | [PNG](floating-habitats-overview.png) / [SVG](floating-habitats-overview.svg) | Immediate three-way bridge lattice, compulsory tower chain or overlapping rings; two terminals and clearance; no flight or gap jumping. |
| Abandoned World | [PNG](abandoned-world-overview.png) / [SVG](abandoned-world-overview.svg) | Ruin terraces, broken boulevard or enclave spokes; planned existing-system two-relay assault. Incendiary/Recovery plus existing7HP robot; repair applies after injury. |
| Orbital Scrapyard | [PNG](orbital-scrapyard-overview.png) / [SVG](orbital-scrapyard-overview.svg) | Boarding zigzag, asymmetric port/starboard circuits or joined derelicts; planned two-relay assault. Four ordered mines and90px Breacher; no hull demolition. |

`layouts.cjs` is the authored geometry and tactical comparison source. `template.html` is the editable navigation/layout source. `build.cjs` produces the atlas,39 individual SVGs,13 world sheets, global sheet, [geometry.json](geometry.json) and [validation.json](validation.json). Every polygonal corridor plan is custom-authored; no recovered map pixels, original-game research or installed assets were used. Earlier Relay/Beneath Dunes alternatives and runtime maps remain intact.

Light material is traversable. Dark material is a schematic solid/impassable region; water, magma, hull, canopy and void labels do not imply new environment rules.144px corridors and176px staging discs are an intentionally conservative construction vocabulary, not finished terrain art. A map worker can shape their outlines only after selection and a separate collision contract. Teal/violet routes are suggestions and not compulsory order or claims of globally shortest paths. Intersecting corridors physically connect in the union, including junctions not named as a route-node landmark. D/X is shared deployment/extraction in rescue worlds. Green rings depict the existing acquisition/extraction criteria, not new safe zones. The32px HUD strip is reserved; schematic titles printed there are overlays.

The contract preserves the exact checked-out mission objective, roster, all five profile starting counts, support kinds, nest interval/budget, wave timestamps/counts and special actor counts from `src/custom-missions.js`, with SHA256 provenance. Its old source coordinates and briefing remain an immutable **source snapshot**. Proposed actors, `proposedObjective`, `proposedScheduledAir` and `waveAnchorMapping` are separate spatial proposals. These replace coordinates only if a later implementation is selected; terminal keys, rescue range/radius/survival conditions, defense/relief timing and enemy budgets do not change. Normal is depicted; Hard/Very hard tank exclusions and profile army counts remain in the snapshot/table. Placement labels SP resolve to exact specialist roles in metadata and the option text.

Abandoned/Orbital lack runtime missions here. Their explicit proposed base budget is4 commanders,6 ordinary soldiers, one of each approved world specialist,4 nests with4 finite births each/6s,6 initial ordinary bugs,1 finite troop eagle,1 plasma and no waves. Abandoned additionally has one existing robot with its established7HP, creating a useful Recovery recipient after combat injury. No pre-injury, health increase, passive healing or new unit is proposed. Final five-profile tuning and roster integration belong to TRI-092/093 after TRI-085/086. These are design defaults within the existing-system mission authority, not enacted gameplay.

## Geometry and similarity evidence

All39 pass50,950 samples at at most2px spacing on every corridor centerline with a49px circular envelope. This is a17px provisional ground-actor radius plus32px maneuver margin, **not** a proof of any diagonal dash/dodge ability or final sprite footprint. All hotspot centers keep17px static clearance. An independent8px cardinal-grid flood fill in the actual corridor/staging union reaches every placement from deployment; graph connectivity and every suggested route edge also pass. Support, special hazard/vent/ambush and friendly relief hotspot access is included. Each nest/bug has a clear64px firing position on an existing eight-direction lane. Example negative fixtures reject a boundary actor, disconnected pad and nonexistent suggested corridor. These checks validate the declared geometry rather than visual text assertions.

The audit compares all741 option pairs on a16px clear-area raster. Highest fixed-position Jaccard overlap is82.4% (UndercityB / IndustrialC). A second audit checks left/right and up/down reflections and translations of−64/0/+64px on both axes, keeping clipped area in the union denominator; highest overlap remains82.4%. Initial near-clones were redesigned, including JungleA/FloatingA and IndustrialC/AbandonedB; the stronger audit also led to the asymmetric OrbitalB design. A85% review threshold is an authoring alarm, not scientific proof of originality. No rotated or arbitrary-scale search is performed. Loop/ladder/fork families intentionally recur, and the graph degree/cycle statistics in evidence are descriptive, not a uniqueness certificate.

The most similar remaining pair deliberately carries different tasks: UndercityB uses three service-ladder transfer rungs, two hack nodes and an all-survivor exit through the outer gallery; IndustrialC is a horseshoe with a central maintenance shortcut, staged tank access and clear-all assault. VolcanicA and vertically reflected MarshA score82.3%, but quarry stair climb/pressure-vault retreat differs from the island-chain containment sweep and lower bank. MaritimeA and a64px-shifted MercenaryC score81.3%; mobile dock defense across three fronts differs from a runway-centered two-terminal pincer. The13 sheets provide the visual review that these metrics cannot replace.

No production collision mask, real pathfinder/formation turn, spawn crowd, birth timing, projectile acquisition/accuracy, reinforcement carrier flight/landing path, audio, balance or live playthrough is certified. Cardinal firing access is a repositioning opportunity; asymmetric aiming remains unchanged. Proposed support and L relief positions need actual delivery/cap validation in a selected runtime ticket. Static SVG-to-PNG inspection is recorded separately from the disposable navigation fixture. Local-file browser access was blocked during director review, so there is no live browser UI or gameplay claim.

## Rebuild and checks

From repository root:

```powershell
node docs/design/world-map-atlas/build.cjs
node docs/design/world-map-atlas/raster.cjs C:/Users/user/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp
node docs/design/world-map-atlas/check.cjs
node docs/design/world-map-atlas/check-ui.cjs
node tools/dev.cjs test
```

Vector/HTML authoring and checks use Node built-ins only. Optional PNG export uses the bundled Sharp package and adds no runtime dependency. The authoring folder alone is regenerated. The DOM fixture exercises13 world controls and39 option views, export paths and metadata; it is not a browser test.

The required full dev run reached the inherited `Custom baseline custom-floating-habitats-station-strike veryeasy` mismatch in `tools/check-difficulty-profiles.cjs`: current Skirmisher/Defender factories differ from the baseline fixture. TRI-085's parked sibling owns the narrow repair; this atlas changes no runtime file or baseline. Syntax/reference/gamepad/breeding checks preceding that assertion passed; later suite stages did not run. Atlas geometry, source-contract, negative fixture, export and navigation checks pass independently.

**Selection:** choose A/B/C per world and any desired route, supply, objective-placement or cover adjustments. Selection does not itself replace any map or authorize new systems. Existing map replacement remains one bounded ticket per selected world; Abandoned/Orbital choices inform their already-approved future mission tickets.
