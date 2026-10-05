# Beneath the Dunes — schematic selection packet (TRI-041)

User selected **A—Twin Crescent** on 2026-10-05 for TRI-036. B—Broken Wells and C—Three-Table Crossing remain saved concepts for later missions. The selection approves schematic geometry; runtime and art acceptance remain separate.

Three entirely custom layouts, drawn with deterministic Python/Pillow and SVG primitives. No recovered pixels, source-game maps, Split Ridge masks or saved Relay B/C concepts were copied. These are annotated design overlays, **not terrain exports or installed missions**. Select one before the mission worker freezes a new collision contract and placements; later art work follows the existing [artist workflow](../../../../art-kit/artist-workflow.md) and [agent kit](../../agent-kit.md).

Open [contact sheet](contact-sheet.png), then inspect native-size [A](a.png), [B](b.png), [C](c.png). Editable vector sources are [a.svg](a.svg), [b.svg](b.svg), [c.svg](c.svg); [build.py](build.py) is the deterministic authoring source. [geometry.json](geometry.json) supplies proposed rock rectangles, actor hotspots, route polylines, refuges and cardinal lanes; [validation.json](validation.json) records checks and route encounter coordinates. SVG/PNG annotations are overlays only and must not be baked into later terrain.

| Layout | Escort lengths | Tactical choice and risk |
| --- | --- | --- |
| A — Twin Crescent | 858 / 894 px | Recommended first implementation: comparably short northern/southern arcs around a central mesa. Northern lane has one illustrated interception; southern lane has intersecting late threats. Two local rock shoulders support regrouping without sheltering either entire arc. |
| B — Broken Wells | 813 / 1208 px | Northern ambush to southern extraction. Short western flank versus much longer eastern flank; staggered rock islands create different engagement angles. East route intentionally detours north of the upper well to preserve body/dodge clearance. |
| C — Three-Table Crossing | 1364 / 1232 px | Southwest ambush to northeast extraction. Inner route crosses two illustrated lanes; outer sweep trades distance and separation from mechanics for a late broad interception. The inner route is longer here: the rock tables prevent a direct diagonal shortcut. |

All have two real vehicle proposals, C1/C2, disabled at the ambush and 6 HP each. M is the proposed initial Field mechanic; S is a Rider scout; G is a five-pellet shotgun Dune guard. Their depicted counts are proposals, not a final army budget. Each crawler can connect through the shared clear ambush area to either escort alternative; a surviving repaired crawler at the marked extraction is sufficient. Neither infantry arrival nor an abstract rescue token substitutes for the vehicle. Exact extraction radius, repair rate, escort control and route assignment remain TRI-040/036 work.

Brown worm circles are **spawn proposals**, amber lanes show a committed cardinal 260-pixel charge with a 24-pixel width. Square N? markers are **optional nest/spawn-anchor proposals**, not an assertion that a new worm-producing nest mechanic exists. These should be omitted or mapped to a separately approved existing nest role by the mission worker. Worms can burrow and reposition, so these lanes illustrate encounters rather than constrain all future AI movement. TRI-035's radius 12, trigger range 180, alignment tolerance 8, warning 1.2 seconds and exposed-phase vulnerability are used; no tuning changes are proposed.

Green refuge markers are clear sand adjacent to blocking rock shoulders. Each lies more than 29 pixels (crawler17 + worm12) from every shown charge segment; validation explicitly checks this after independent review moved three unsafe initial markers. A rock can interrupt a particular cardinal approach, but there is no permanent escort corridor behind cover: both routes in every layout have a checked alignment/trigger-range encounter and a clear targeting line to an exposed worm. Targeting sightline does not prove a shotgun's eventual effective range or all facing-dependent infantry shots; squads must reposition under existing asymmetric aiming rules. Finite automatic mines and diagonal crawler evasion remain confirmed abilities; mine ammunition, drop/arming distance and damage await roster implementation. No mines are preplaced in this packet.

## Geometry evidence and limits

World coordinates are 1024×768, origin upper left, x right and y down. Top y=0..31 is reserved for runtime HUD; the title printed there is a proposal annotation. Sand is clear, rectangular rock interiors are blocked. No decorative collision or copied mask exists.

Every escort segment is sampled at at most 2-pixel spacing. A conservative axis-aligned square of radius 49 must stay in clear world space: 17-pixel provisional crawler body radius plus a 32-pixel evade offset on each axis. All four diagonal endpoint body squares are also checked at every sample; the full square bound covers the swept displacement between start and endpoint. The 98-pixel pale route envelope depicts that clearance, including turns. This is a proposal assumption based on existing tank-scale collision, not TRI-040's final crawler sprite/ability contract. Any larger eventual body or evade must rerun/revise this validation before runtime adoption.

Checks also prove clear initial actor/refuge/extraction placements, straight mechanic-to-each-crawler 8-pixel-body access, unobstructed worm 12-pixel-body charge sweeps, and at least one exposed threat sightline/trigger opportunity per route. All six routes pass; 3,216 sampled escort positions are checked. These assertions concern the proposed rectangle geometry, not a pixel runtime mask, crowd avoidance, mine placement, repair interruption, final pathfinding, timed difficulty or human playability. There is no browser gameplay claim.

Rebuild from the repository root with a Pillow-capable Python:

```powershell
& 'C:/Users/user/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe' docs/planning/campaigns/maps/beneath-dunes/build.py
node tools/dev.cjs test
```

This reads/writes this proposal folder only. The generator validates before exporting; SVG contains separate editable rectangles, paths, markers and text. Selecting one layout is the director's next action; runtime mission and art polish remain separate tickets.
