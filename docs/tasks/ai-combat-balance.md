# Rebalance enemy pressure and friendly soldier initiative

- Ticket: TRI-070; state in [local board](../BOARD.md).
- Branch: `fix/ai-combat-balance`

## Goal and user-visible outcome

Rebalance enemy pressure and friendly soldier initiative

## Acceptance criteria

- [x] Reduce runaway enemy alert/pursuit pressure and improve friendly engagement reliability while preserving explicit orders and weapon aiming rules; relevant regression checks pass

## Scope and decisions

User requested on 2026-10-07: enemy AI is too aggressive and difficult to win against; friendly soldiers should be more aggressive and competent. Tune alert propagation/pursuit and friendly acquisition/weapon positioning as one bounded combat-balance fix. Use conservative numerical defaults and document them. Preserve mission populations, spawn budgets, damage/HP, manual orders, guard leash intent, controls and established aiming conventions. No new units or UI in this ticket. Add comparative deterministic regressions demonstrating less enemy escalation and reliable friendly engagement; record live calibration limitations separately.

Execution authorized on 2026-10-07: user revoked planning-only pause and approved sequential bounded ticket work under director coordination. Director bound TRI-070 to `/root/ai_balance_worker` before edits. Implemented defaults and exact evidence are in session 008 and DESIGN; live difficulty calibration remains a separately recorded verification gap. Worker stops at Review; director owns independent review and squash integration.

## Sessions



Planning checkpoint: user requested brainstorming, tickets and queue only. Worker stopped before board dispatch. Preserved prepared checkout; do not implement until final scope is agreed and execution authorized.


Execution authorization 2026-10-07: user requested starting the session with agents executing tickets one by one; earlier planning-only pause is revoked.

- [2026-10-07 / 008](../journal/2026-10-07-008-ai-combat-balance.md)
