# Extract troop orders and input system

- Ticket: TRI-043; state in [local board](../BOARD.md).
- Branch: `chore/extract-orders-input`

## Goal and user-visible outcome

Extract troop orders and input system

## Acceptance criteria

- [x] Extract orders/input ownership and handlers with explicit interfaces, preserving keyboard/mouse/tactical behavior

## Scope and decisions

Approved under the autonomous mandate on 2026-10-05; TRI-043 is the bounded orders/input extraction child of TRI-003.

## Sessions

- [Director integration and queue checkpoint034](../journal/2026-10-05-034-director-queue.md)

## Scope — autonomous mandate 2026-10-05

Child of TRI-003, after TRI-042. Extract troop order handling and keyboard/mouse/controller input ownership through explicit interfaces. Preserve German physical-key controls, AI-default commanders, deliberate aiming, selection/focus/use/force/rally, tactical queued orders and modal restoration. Keep DOM boundary separate from decision helpers; no state injection or unrelated UX redesign. Meaningful before/after input sequences and full suite; actual browser smoke separately recorded. No balance changes. Stop Review.
- [2026-10-05 / 033](../journal/2026-10-05-033-extract-orders-input.md)

## Review evidence

Named-services orders/input extraction and DOM boundary are implemented without balance or UI changes. Full suite passed, including immutable pre/post traces and independent existing regressions; director performed ordinary browser smoke after correcting control hints. See session033 and [browser record](../playtests/2026-10-05-extract-orders-input.md). Ready for independent review; not merged.
