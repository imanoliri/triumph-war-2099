# Rebalance enemy pressure and friendly soldier initiative

- Ticket: TRI-070; state in [local board](../BOARD.md).
- Branch: not started

## Goal and user-visible outcome

Rebalance enemy pressure and friendly soldier initiative

## Acceptance criteria

- [ ] Reduce runaway enemy alert/pursuit pressure and improve friendly engagement reliability while preserving explicit orders and weapon aiming rules; relevant regression checks pass

## Scope and decisions

User requested on 2026-10-07: enemy AI is too aggressive and difficult to win against; friendly soldiers should be more aggressive and competent. Tune alert propagation/pursuit and friendly acquisition/weapon positioning as one bounded combat-balance fix. Use conservative numerical defaults and document them. Preserve mission populations, spawn budgets, damage/HP, manual orders, guard leash intent, controls and established aiming conventions. No new units or UI in this ticket. Add comparative deterministic regressions demonstrating less enemy escalation and reliable friendly engagement; record live calibration limitations separately.

## Sessions


