# Extract remaining game.js systems

- Ticket: TRI-003; state in [local board](../BOARD.md).
- Branch: not started

## Goal and user-visible outcome

Extract remaining game.js systems

## Acceptance criteria

- [ ] Separate combat/bursts, orders/input, support lifecycle and rendering in individual behavior-preserving branches; regression suite remains green

## Scope and decisions

Backlog proposal. Agree bounded scope and verification with the user before Ready. TRI-003 is an umbrella; split into one system per approved task before execution.

## Sessions

## Autonomous execution plan — 2026-10-05

User authorized completing the queue with logged decisions. The four named systems are split into [TRI-042 combat/bursts](extract-combat-bursts.md), [TRI-043 orders/input](extract-orders-input.md), [TRI-044 support](extract-support-lifecycle.md) and [TRI-045 rendering](extract-rendering.md), sequential behavior-preserving branches. Parent closes only after all four accepted extractions and integrated regressions, not merely creation of these tickets. Preserve original/custom balance and sprite conventions. No runtime changes belong in this administrative split.

