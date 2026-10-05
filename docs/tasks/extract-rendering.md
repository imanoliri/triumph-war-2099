# Extract battlefield rendering system

- Ticket: TRI-045; state in [local board](../BOARD.md).
- Branch: `chore/extract-rendering`

## Goal and user-visible outcome

Extract battlefield rendering system

## Acceptance criteria

- [x] Extract battlefield rendering with explicit state/assets inputs; preserve coordinate/sprite and mounted rendering conventions

## Scope and decisions

Approved under the autonomous mandate below; implementation stops at Review.

## Sessions

- [2026-10-05 / 039 — director integration](../journal/2026-10-05-039-director-queue.md)

- [2026-10-05 / 038](../journal/2026-10-05-038-extract-rendering.md)

## Scope — autonomous mandate 2026-10-05

Child of TRI-003, after TRI-044. Extract battlefield drawing, sprite/composite/HUD/markers into dependency-free rendering modules with explicit state/assets/context inputs. Preserve ordering, source coordinates, headings, original/custom provenance and standing suppression for mounted troops. Do not regenerate assets, restyle maps or alter physics. Compare draw commands and actual browser screenshots for representative original/custom maps and tactical states; full suite. Keep DOM input outside renderer. Stop Review.

## Review evidence

Stateless rendering module and explicit source sprite lookup preserve gameplay, source hotspots/headings/composites, draw order and mounted standing suppression. Full `node tools/dev.cjs test` passed. Immutable canvas-command coverage: 30 main scenes, 64 heading/animation cases, 4 explicit-frame cases and 3 independent expected commands. Actual original Desert Canyon and custom Relay Breaker (Split Ridge terrain) tactical before/after screenshot pairs are identical; [bounded browser report](../playtests/2026-10-05-rendering.md). No assets regenerated; no balance/physics/DOM changes. See session038 for review handoff and limits.
