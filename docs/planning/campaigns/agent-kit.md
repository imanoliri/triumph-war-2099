# Campaign and mission agent kit

This kit is a repository workflow, not an installed skill or new orchestration system. [DIRECTOR](../../DIRECTOR.md), [WORKER](../../WORKER.md) and [WORKFLOW](../../WORKFLOW.md) remain authoritative. The existing [art kit](../../art-kit/README.md) provides reference catalogs and art workflow; its Split Ridge coordinates and mask apply only to that map.

## Director refinement

Select one mission with the user. Fill the [mission template](mission-template.md), separating approved rules from alternatives. Inspect current runtime support before committing to new mechanics. Resolve material objective, roster, new-unit and map choices. Create a bounded task with linked brief and measurable acceptance. Leave campaign-wide save systems and unselected worlds outside scope.

Use schematic map proposals before artwork. Once layout is approved, freeze a mission-specific mask, placements and accesses. Reuse reference catalogs by link; create a new manifest and geometry contract for the new map. Never apply Split Ridge's 25-point snapshot to another mission.

## Worker dispatch prompt

Use the concise contract printed by `tools/task.cjs prepare`, followed by:

> Approved mission brief: docs/planning/campaigns/missions/<slug>.md. Read its linked planet and dependency records as needed. Implement only the assigned task acceptance. Report unresolved material design choices to the director. Use the existing initial session and stop at Review.

Do not paste this entire pack into the prompt. One active board-bound worker handles one approved ticket. No nested delegation or additional chats. The director coordinates separate map, unit, art and balance tickets rather than having a worker silently grow the feature.

## Implementation workflow

1. Inspect custom-mission registry, loader, objectives, waves and difficulty boundaries; record existing capabilities rather than assume them.
2. Build the approved mission with stable identity and isolated original-campaign behavior. Add only approved mechanics and actors.
3. Verify physical routes, door use, spawn clearance, support unloading, objective ordering, defeat, restart and cap behavior.
4. Update briefing/HUD/guide and relevant design docs. Run relevant checks and `node tools/dev.cjs test`.
5. Playtest under PLAYTEST. Save screenshots and timed observations. Compare pressure across approved difficulties; report challenge limitations honestly.
6. Commit scoped changes and provide exact SHA, acceptance evidence, limitations and next action. Director reviews and integrates.

## Art and skills routing

Use the existing art director/artist workflows by link. Fill a new map-specific artist prompt, reference manifest and immutable geometry contract. Require editable source, terrain output, overlays, provenance and collision proof. Actors and HUD remain runtime elements.

If a ticket needs generated raster art, the artist reads and announces the available imagegen skill before using it. Exact code-native/vector map construction uses existing tools. A reusable installed skill is optional future work if these workflows prove insufficient; do not duplicate policy or install tools as part of a mission ticket.

## Required handoff packet

Authoritative task and latest session; approved brief and planet dossier; current map sources/mask/manifest; source and custom reference links; actual screenshots; exact checks and limitations. Detailed material stays in files, while dispatch and reports remain compact.
