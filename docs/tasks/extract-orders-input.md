# Extract troop orders and input system

- Ticket: TRI-043; state in [local board](../BOARD.md).
- Branch: not started

## Goal and user-visible outcome

Extract troop orders and input system

## Acceptance criteria

- [ ] Extract orders/input ownership and handlers with explicit interfaces, preserving keyboard/mouse/tactical behavior

## Scope and decisions

Backlog proposal; director must record user agreement before Ready.

## Sessions

## Scope — autonomous mandate 2026-10-05

Child of TRI-003, after TRI-042. Extract troop order handling and keyboard/mouse/controller input ownership through explicit interfaces. Preserve German physical-key controls, AI-default commanders, deliberate aiming, selection/focus/use/force/rally, tactical queued orders and modal restoration. Keep DOM boundary separate from decision helpers; no state injection or unrelated UX redesign. Meaningful before/after input sequences and full suite; actual browser smoke separately recorded. No balance changes. Stop Review.
