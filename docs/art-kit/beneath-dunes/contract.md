# Beneath the Dunes map art contract

TRI-036 freezes selected **A—Twin Crescent**. Use [manifest.json](manifest.json), [accepted schematic](../../planning/campaigns/maps/beneath-dunes/a.png), [baseline terrain](../../../assets/custom/beneath-dunes/terrain.png), [collision preview](../../../assets/custom/beneath-dunes/collision.png), and [existing reference kit](../README.md). Paths in the manifest resolve from the repository root. B/C files remain saved proposals.

A future approved art worker follows [artist workflow](../artist-workflow.md), AGENTS and WORKER; this packet does not authorize dispatch, publishing or changes outside this map. Read the recovered terrain, element and sprite references separately. Authorship and original-asset distribution restrictions remain in STATUS/provenance. Do not access or alter the installed game or include the local MIDI bank.

Keep 1024×768, the top36px HUD, packed collision bytes, rectangle edges, placements, both full-body routes, extraction and all listed immutable hashes. Guard and worm counts are profile subsets of the manifest superset; do not bake any actors, mines, pickups, labels, route arrows, warning lanes or extraction ring into terrain. The two crescents must remain visually traversable. Keep low-contrast sand and cliffs within existing blocked envelopes. Decorative shading must not suggest new collision. No new nests/hazards, rock movement, corridor narrowing or global art regeneration.

Baseline deterministic seed36036 is in tools/build-beneath-dunes.py; terrain currently uses warm sand and layered rectangular mesa faces. Later polish may improve the editable terrain authoring source/terrain.png while retaining collision generation output exactly. Preserve the original baseline source before replacing it with another reproducible source. Use existing reference kit to guide cliff shading and pixel cadence; baseline is original authored art, not recovered artwork. Optional raster generation remains an input clipped against immutable geometry, never a collision mask.

Runtime square crawler radius17 and diagonal evade axes32 are documented in DESIGN. Approved route samples every2px pass the full49px square envelope. Navigation adds an independent4px corner margin; do not confuse nav.line(49) with the49px proposal proof. Actual post-evade/off-route motion must still require clear swept bodies; no immunity is implied.

Before Review, rebuild from saved source, inspect native-scale terrain and actor overlay against both corridor routes, compare collision/manifest hashes, run `node docs/art-kit/beneath-dunes/verify.cjs` and relevant checks, and record browser evidence separately. New decorative polish belongs in its own approved ticket.

Immutable hashes use raw binary bytes and LF-normalized UTF8 text per manifest.hashPolicy; Windows autocrlf must not appear as a geometry change.
