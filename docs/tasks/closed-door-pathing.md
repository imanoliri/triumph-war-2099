# Fix soldiers routing through walls near closed doors

- Ticket: TRI-014; state in [local board](../BOARD.md).
- Branch: not started

## Goal and user-visible outcome

Fix soldiers routing through walls near closed doors

## Acceptance criteria

- [ ] Reproduce soldiers stalling against a room wall when routing through a closed door, and fix navigation while preserving locked-door and interaction rules.

## Scope and decisions

User reported on 2026-10-04 that soldiers trying to enter rooms with closed doors sometimes choose shortcuts through walls and stall. Reproduce navigation with closed unlocked doors and wall clearance before fixing. Preserve locked-door terminal requirements, unlocked-door automatic opening, source map/sprite coordinate conventions and explicit move/focus/use orders. Check route cache invalidation and actual movement clearance, avoid oscillation or new wall traversal. Do not regenerate source masks/assets absent evidence that they cause the issue. Add deterministic relevant regressions and current documentation/session handoff; full suite required. Browser route evidence separate from simulation. No publication.

## Sessions

