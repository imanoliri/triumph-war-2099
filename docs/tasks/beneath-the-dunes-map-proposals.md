# Prepare Beneath the Dunes map proposals

- Ticket: TRI-041; state in [local board](../BOARD.md).
- Branch: not started

## Goal and user-visible outcome

Prepare Beneath the Dunes map proposals

## Acceptance criteria

- [ ] Deliver three visibly distinct new desert layouts with two disabled crawlers, reachable mechanic/escort routes and extraction, annotated cardinal worm charge lanes and collision/route evidence for user selection.

## Scope and decisions

User selected desert convoy rescue and confirmed two crawlers, saving one sufficient, charging worms and Desert Rider abilities. Existing mission brief requires schematic review before freezing geometry. This bounded design ticket supplies that review: three original desert map alternatives, contact sheet and individual PNG/SVG/editable source plus machine-readable proposed geometry/hotspots and concise comparison. Follow [desert mission brief](../planning/campaigns/missions/desert-operation.md), [planet](../planning/campaigns/planets/desert-frontier.md), [agent kit](../planning/campaigns/agent-kit.md) and source/custom distinction. Do not implement runtime mission/art polish or copy Split Ridge terrain/mask. Labels must distinguish real vehicle targets, mechanics, friendly deployment, worm spawn/nest proposals and extraction.

Use existing1024x768 coordinate convention (or explicit approved proposal dimensions), top HUD strip reserved, physically wide connected escort routes. Each layout starts two disabled6HP crawlers at an ambush site and leads to extraction through at least two meaningful alternatives or maneuver spaces. Annotate cardinal-only warning/charge lanes, diagonal dodge clearance, rock refuges and risks; avoid a permanent safe corridor that removes worm threat. Exact actor counts/tuning other than agreed crawlers are proposals. Respect035worm footprint/telegraph and040roster when available. Visual geometry validation proves route/clearance assumptions, not runtime playability; verify no blocked placements and explain proposed escort path/support access. Existing units/environment hazards/newmechanics are not implied. Preserve all earlier worlds and saved Relay B/C concepts.

After035, execute this design worker before040 so user can review while friendly units are implemented. One isolated worker stops Review; director presents artifacts and records user choice before036. Links and compact contract rather than prompt duplication; art polish uses later map-specific immutable manifest.

## Sessions
