# Prepare reusable map art kit and AI handoff prompts

- Ticket: TRI-033; state in [local board](../BOARD.md).
- Branch: `chore/map-art-handoff-kit`

## Goal and user-visible outcome

Prepare reusable map art kit and AI handoff prompts

## Acceptance criteria

- [x] A self-contained map art kit provides fixed geometry contracts, palettes, element/sprite references, map images/screenshots and bounded artist prompts for other AI workers without gameplay changes.

## Scope and decisions

User explicitly wants map prettification delegated to other AIs and suggested preparing elements, sprites, instructions, recreated maps, screenshots and prompts on 2026-10-04. Director agreed to a reusable kit and fresh worker after active Silent Return. This task prepares concrete local handoff material; it does not prettify runtime assets or alter gameplay. Director owns contact/review; a worker owns all kit generation. No agent model override or numerical token budget was requested.

Prepare a compact self-contained kit under docs/art-kit with a clear entry README, bounded artist-worker prompt template, and a filled Split Ridge brief. Include reference catalog/atlas for relevant terrain, cliffs, shadows, existing actor/object sprites and palette, explicit paths/provenance identifying recovered references versus newly authored custom assets. Include approved layout metadata, collision-mask visual/bit conventions, current terrain image, existing original/recreated map references, and available in-game screenshots. Prefer links/manifests to existing assets over duplicating whole source directories; create useful small visual atlases/contact sheets when needed. No installed original modification or ignored MIDI bank inclusion, no new dependency or external account upload. B Relay Basin and C Switchback Mesa remain saved concepts, with optional future briefs clearly unimplemented.

Artist contract: fixed 1024x768 top-left world coordinates, original pixel scale and HUD strip, existing geometry/mask and sprite-hotspot placements immutable; preserve collision boundaries, corridor widths, relay/nest/support access and clear tank routes. Beautify sand textures, cliff faces, shadows and collision-free scenery, keeping tactical readability and style reference clear. Do not bake live actors, pickups, terminals, cannons, damageable props or HUD into terrain. Proposed new obstacles or layout changes require director/user review before implementation. Require editable authoring source, final terrain PNG, provenance/change notes, visual before/after and explicit unchanged-mask evidence. New art output stays separate from recovered assets. Explain how a fresh artist worker uses a separate branch/worktree, reads only the kit + task/session, spends context on art, stops Review, and hands exact paths/checks back. Original assets remain local references subject to existing provenance; do not treat kit as new redistribution authorization.

Provide reviewable library previews and complete handoff prompt, suitable for another AI without conversation history. Validate all referenced files/dimensions, atlas labels/provenance and absence of baked live entities; visually inspect artifacts. Run relevant existing checks, no needless broad suite for docs/images-only changes. Record durable session/scoped commit and limits. No nested delegation, director board edits, gameplay/code/art replacement, merge or publication. Stops Review; director will present concrete kit before deciding the next bounded art implementation.

## Sessions



User explicitly confirmed ticket preparation and queue priority on 2026-10-04: run directly after current TRI-026 Silent Return. This priority supersedes other Backlog fixes. Prepare kit only; director remains coordinator.

User refinement on 2026-10-04: TRI-033 must add adequate prompts and skills or workflows for the director/orchestrator and feature session to conduct delegated art work. Deliver concrete director intake/dispatch/review workflow, reusable bounded artist-session workflow, and filled Split Ridge handoff prompt, not only a reference folder. Integrate with existing DIRECTOR/WORKER/WORKFLOW through concise links, avoiding duplicated policies and recursive sessions. Assess whether a small dedicated reusable skill is useful; if creating a Codex skill, read skill-creator first and keep authority limited to the art kit (no autonomous scope expansion, new threads, publication or model override). Otherwise use explicit repository workflow/prompt files with clear trigger and minimal context pointers. Teach director what to send and what evidence to require; teach artist worker how to locate references, preserve immutable mask/gameplay, produce editable/raster outputs, visually verify and stop at Review. Document available tool/skill selection for raster generation versus deterministic SVG/canvas/tile authoring, with exact invoked-skill requirements when applicable. No need to install tools or a plugin to make the handoff usable.

Priority confirmation on2026-10-05: user corrected immediate balance start to after TRI-033. Finish current kit, then start TRI-034 directly afterward; do not park this task.
- [2026-10-04 / 051](../journal/2026-10-04-051-map-art-handoff-kit.md)

- [Director acceptance / next balance task](../journal/2026-10-05-001-map-art-handoff-kit-director.md)
