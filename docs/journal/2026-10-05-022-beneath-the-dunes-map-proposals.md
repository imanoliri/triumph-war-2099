# 2026-10-05 / 022 — beneath-the-dunes-map-proposals

- Task: [beneath-the-dunes-map-proposals](../tasks/beneath-the-dunes-map-proposals.md), TRI-041
- Date: 2026-10-05 (Europe/Berlin); initial session 022 retained
- Branch: `chore/beneath-the-dunes-map-proposals`
- Starting commit: `2d31c846d930a27e129dce8dd3cd59c402ed6095`
- Status: Review; not merged/published

## Starting context

Read AGENTS, WORKER, task/session, artist workflow/README/contract, agent kit, desert brief, planet dossier and current worm module. Initial task/session preparation retained. No installed skill, original-game access, asset regeneration or nested delegation.

## Work performed

Created [selection packet](../planning/campaigns/maps/beneath-dunes/README.md): three original 1024×768 PNG/SVG schematics, contact sheet, deterministic Pillow source, geometry and validation JSON. Twin Crescent has balanced arcs; Broken Wells has unequal vertical flanks; Three-Table Crossing has long diagonal alternatives. A is recommended for a balanced first rescue.

Annotated two disabled 6-HP crawlers, scout/shotgun guard/mechanic deployment, extraction of at least one crawler, escort alternatives, refuge shoulders, worm spawn and optional nest anchors. All annotations are proposal overlays. No runtime files or previous worlds/concepts changed. Optional nest anchors imply no new nest mechanic. Finite automines remain approved but are not preplaced; numerical mine/repair/escort tuning awaits implementation.

## Chronological log

1. Selected deterministic vector/geometry authoring under existing art/agent kit links.
2. Conservative checks caught initial rock/route/lane conflicts; moved proposal rocks/paths/lanes rather than weakening clearance.
3. Verified six escort routes: radius49 square clearance (provisional body17 plus evade32 per axis), four diagonal endpoint body squares, shared ambush route switching, mechanic access, placements, worm body sweeps and exposed-threat trigger/sightline opportunities.
4. Rendered and inspected contact sheet and each native PNG; corrected overlapping labels and regenerated.
5. Full project suite passed once. No runtime changes warrant repeated suite runs.
6. Director independent review caught three refuge markers inside shown charge sweep. Moved A markers to (330,280)/(660,510), C second marker to (730,620). Added explicit refuge clearance assertions against every shown charge segment: distance exceeds worm12+crawler17. Regenerated and validated. These are local refuges, not protection from later burrowing/repositioning.

## Verification

| Check | Result | Evidence |
| --- | --- | --- |
| Bundled Python proposal `build.py` | pass | Six routes, 3216 samples; full body/diagonal evade bound, shared ambush switch, mechanic access, placements, full cardinal lanes, current-rule exposed encounters and refuge-vs-shown-sweep clearance. `validation.json` records route results. |
| `node tools/dev.cjs test` | pass, exit0 | Complete project suite including worm lifecycle/footprint and original isolation; disposable fixtures only. |
| Visual inspection | pass | Contact sheet and all native PNGs viewed; distinct original layouts and clarified marker roles; corrected annotations. |
| Live browser playtest | not performed | Design-only outputs, no runtime mission; no live rendering/audio/playability claim. |

## Unresolved issues and risks

User selection is pending. Geometry is proposed rectangles, not final pixel mask. Body17/evade32 assumptions require verification against TRI-040. Crowd avoidance, final mine placement, repair interruption, facing/range and timed difficulty await implementation/playtests. No publishing, original-asset distribution, board edits or merge occurred.

## Next action / handoff

Director independently reviews scoped branch HEAD and presents contact sheet/native A/B/C for user selection before TRI-036 freezes geometry. Review SHA is the HEAD produced with this packet (`git log -1 --format=%H`), also returned to director; final squash SHA belongs in subsequent director checkpoint. Worker stops at Review and remains available for findings. TRI-040 can use documented clearance assumptions; later art follows a new immutable map manifest.
