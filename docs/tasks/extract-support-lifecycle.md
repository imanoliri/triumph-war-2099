# Extract support lifecycle system

- Ticket: TRI-044; state in [local board](../BOARD.md).
- Branch: `chore/extract-support-lifecycle`
- Worker status: Review.

## Goal and user-visible outcome

Extract support lifecycle into an explicit-service module while preserving all existing gameplay behavior.

## Acceptance criteria

- [x] Extract carriers, drops and support lifecycle without changing timing, eligibility or cap rules.

## Scope and decisions

Approved autonomous mandate 2026-10-05, child of TRI-003 after TRI-043. Extract carrier/drop/air/infiltration arrivals, eligibility/cap reservations and return lifecycle through explicit state/services. Preserve source support types and mission timing, commander respawn, custom scheduled waves/airdrops and victory pending-arrival gates; no new support balancing. Verify seeded lifecycle, cap/retry/delivery/death/restart/tactical sequences and full suite. Update boundaries and separately record actual browser evidence. Stop Review.

## Evidence

`src/support-lifecycle.js` owns support initialization, eligibility/creation, arrivals/drops and commander return. Runtime adapters retain pickup rolls, wave emission and mission gates. Architecture describes the boundary. Immutable checks compare six seeded full-state/reference-alias sequences against starting commit, including RNG continuation. [Focused live smoke](../playtests/2026-10-05-support-lifecycle.md) records ordinary rendering, tactical startup, scheduled delivery outcome and restart separately from VM evidence.

## Sessions

- [2026-10-05 / 035](../journal/2026-10-05-035-extract-support-lifecycle.md)
- [2026-10-05 / 036 — director recovery](../journal/2026-10-05-036-director-recovery.md)
- [2026-10-05 / 037](../journal/2026-10-05-037-extract-support-lifecycle.md)
