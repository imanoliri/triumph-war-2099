# Extract combat and burst system

- Ticket: TRI-042; state in [local board](../BOARD.md).
- Branch: not started

## Goal and user-visible outcome

Extract combat and burst system

## Acceptance criteria

- [ ] Extract combat/burst calculation and state lifecycle with explicit inputs; preserve current gameplay and all relevant regressions

## Scope and decisions

Backlog proposal; director must record user agreement before Ready.

## Sessions

## Scope — autonomous mandate 2026-10-05

Child of TRI-003. Extract the existing firing/aiming/burst calculations and lifecycle into small dependency-free modules with explicit state/services, including source asymmetric aim and tank/plasma sweep rules. Keep runtime integration thin; avoid a service locator or copying the entire game into a wrapper. Preserve all constants, RNG order, timers, collision/damage/owner accounting and control behavior, including new desert types. Tests should compare meaningful before/after seeded sequences and existing regressions. No balance/fidelity changes. Update ARCHITECTURE and handoff; full suite plus relevant browser smoke (or explicit gap). Stop Review.
