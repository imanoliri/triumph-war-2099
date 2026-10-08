# Restore Volcanic Forge mission clearance after map redesign

- Ticket: TRI-094; state in [local board](../BOARD.md).
- Branch: not started

## Goal and user-visible outcome

Restore playable collision-safe Volcanic Forge Strike placements and routes after the unique magma-core map change, preserving its distinct authored layout.

## Acceptance criteria

- [ ] Resolve the reproduced blocked mission point (800,110) and any other Volcanic authored placement, nest birth clearance or connected-route failures exposed by the existing focused check on all five profiles.
- [ ] Preserve the magma-core world identity, existing roster mechanics, objectives, headcounts, enemy/wave budgets, support counts, aiming and controls. Do not revert to reused map geometry.
- [ ] Keep authored terrain/mask/geometry/build source consistent; change only this map or its placements as required. Preserve recovered assets and installed original.
- [ ] Existing check-volcanic-forge.cjs, specialist and relevant geometry/project checks pass; add only necessary regression evidence. Run node tools/dev.cjs test and record exact outcomes, distinguishing inherited Floating fixture failures awaiting TRI-085 from task-caused failures.
- [ ] Update current descriptions where changed and task/session handoff; record browser evidence or its absence separately. Commit scoped work and stop at Review.

## Scope and decisions

User 2026-10-08 explicitly approved a separate bounded Volcanic map fix after director and worker independently reproduced check-volcanic-forge.cjs49 veryeasy clear800,110 on unchanged main. Regression follows map-only commit0ffef94. This ticket does not authorize unrelated map redesigns or gameplay changes.

Director parks TRI-085 with its scoped commit before dispatching this isolated worker. TRI-085 already owns narrow inherited Floating oracle/roster fixture corrections; do not duplicate or remove those checks here. After this fix integrates, resume TRI-085 in its preserved checkout and rerun the full final suite against corrected main.

## Sessions

- Director approval/recovery: [session018](../journal/2026-10-08-018-director-continuation.md).
