# Extract battlefield rendering system

- Ticket: TRI-045; state in [local board](../BOARD.md).
- Branch: not started

## Goal and user-visible outcome

Extract battlefield rendering system

## Acceptance criteria

- [ ] Extract battlefield rendering with explicit state/assets inputs; preserve coordinate/sprite and mounted rendering conventions

## Scope and decisions

Backlog proposal; director must record user agreement before Ready.

## Sessions

## Scope — autonomous mandate 2026-10-05

Child of TRI-003, after TRI-044. Extract battlefield drawing, sprite/composite/HUD/markers into dependency-free rendering modules with explicit state/assets/context inputs. Preserve ordering, source coordinates, headings, original/custom provenance and standing suppression for mounted troops. Do not regenerate assets, restyle maps or alter physics. Compare draw commands and actual browser screenshots for representative original/custom maps and tactical states; full suite. Keep DOM input outside renderer. Stop Review.
