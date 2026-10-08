# Restore Volcanic Forge mission clearance after map redesign

- Ticket: TRI-094; state in [local board](../BOARD.md).
- Branch: `fix/volcanic-forge-map-regression`

## Goal and user-visible outcome

Restore playable collision-safe Volcanic Forge Strike placements and routes after the unique magma-core map change, preserving its distinct authored layout.

## Acceptance criteria

- [x] Resolve the reproduced blocked mission point (800,110) and any other Volcanic authored placement, nest birth clearance or connected-route failures exposed by the existing focused check on all five profiles.
- [x] Preserve the magma-core world identity, existing roster mechanics, objectives, headcounts, enemy/wave budgets, support counts, aiming and controls. Do not revert to reused map geometry.
- [x] Keep authored terrain/mask/geometry/build source consistent; change only this map or its placements as required. Preserve recovered assets and installed original.
- [x] Existing check-volcanic-forge.cjs, specialist and relevant geometry/project checks pass; add only necessary regression evidence. Run node tools/dev.cjs test and record exact outcomes, distinguishing inherited Floating fixture failures awaiting TRI-085 from task-caused failures.
- [x] Update current descriptions where changed and task/session handoff; record browser evidence or its absence separately. Commit scoped work and stop at Review.

## Scope and decisions

User 2026-10-08 explicitly approved a separate bounded Volcanic map fix after director and worker independently reproduced check-volcanic-forge.cjs49 veryeasy clear800,110 on unchanged main. Regression follows map-only commit0ffef94. This ticket does not authorize unrelated map redesigns or gameplay changes.

Director parks TRI-085 with its scoped commit before dispatching this isolated worker. TRI-085 already owns narrow inherited Floating oracle/roster fixture corrections; do not duplicate or remove those checks here. After this fix integrates, resume TRI-085 in its preserved checkout and rerun the full final suite against corrected main.

## Review evidence

Two placements adapted to the existing solid geometry: northeast bug and repeated wave spawn (800,110) → (880,110); middle hazard and first/final wave spawn (520,390) → (650,390). Terrain pixels, polygons and collision payload are unchanged. Profile headcounts, six starting bugs, four nests, three hazards, objectives, support counts, wave timings and budgets are preserved.

Focused checks pass on all five profiles, including specialist starts and route walks. Full-suite invocation remains red at the inherited Floating baseline assertion in `check-difficulty-profiles.cjs:35`; TRI-085 owns its correction. No browser playtest was performed in this session. Detailed commands, geometry consistency evidence and review handoff are in session020.

## Sessions

- Director approval/recovery: [session018](../journal/2026-10-08-018-director-continuation.md).
- [2026-10-08 / 020](../journal/2026-10-08-020-volcanic-forge-map-regression.md)

Integrated: squash5787f8ed826a7d568c4fac80d4c3c23f3e2848be from reviewed83b1b5c2ace425b0ed6be2a1fb439c21b714b948. See session020 for checks and inherited-suite/live limitations.
