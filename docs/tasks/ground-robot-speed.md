# Increase ground robot movement speed by 50 percent

- Ticket: TRI-038; state in [local board](../BOARD.md).
- Branch: not started

## Goal and user-visible outcome

Increase ground robot movement speed by 50 percent

## Acceptance criteria

- [ ] Ground robots move at 1.5 times their current movement speed across ordinary orders and routing, with combat cadence and other units unchanged.

## Scope and decisions

User explicitly requested robots be50% faster on2026-10-05. Scope is ground robot movement, multiplier1.5 relative to current actual rates; health, weapons, projectile speed, attack/burst/rest cadence, reaction and other unit movement remain unchanged. Apply across ordinary orders, attack/focus approach, force move, rally and terrain routing as relevant; inspect all robot-specific movement callers rather than change one visible branch. Preserve collision/door/mounted behavior and support delivery. Original-source speed versus custom modification must be documented distinguishably. Meaningful movement-distance fixtures with equivalent dt/routes and other-unit controls, relevant/full checks and honest browser limits. Execute after TRI-037, TRI-028 and TRI-030 with one separate bounded worker stopping Review. No director gameplay implementation.

## Sessions
