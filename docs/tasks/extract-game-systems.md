# Extract remaining game.js systems

- Ticket: TRI-003; state in [local board](../BOARD.md).
- Branch: not started

## Goal and user-visible outcome

Extract remaining game.js systems

## Acceptance criteria

- [x] Separate combat/bursts, orders/input, support lifecycle and rendering in individual behavior-preserving branches; regression suite remains green

## Scope and decisions

Administrative umbrella completed through the four separately accepted child branches under the user's autonomous mandate. Actual integration/check evidence is recorded in session039; broader live acceptance remains separately queued.

## Sessions

- [2026-10-05 / 039 — umbrella completion audit](../journal/2026-10-05-039-director-queue.md)

## Autonomous execution plan — 2026-10-05

User authorized completing the queue with logged decisions. The four named systems are split into [TRI-042 combat/bursts](extract-combat-bursts.md), [TRI-043 orders/input](extract-orders-input.md), [TRI-044 support](extract-support-lifecycle.md) and [TRI-045 rendering](extract-rendering.md), sequential behavior-preserving branches. Parent closes only after all four accepted extractions and integrated regressions, not merely creation of these tickets. Preserve original/custom balance and sprite conventions. No runtime changes belong in this administrative split.

