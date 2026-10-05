# Extract combat and burst system

- Ticket: TRI-042; state in [local board](../BOARD.md).
- Branch: `chore/extract-combat-bursts`

## Goal and user-visible outcome

Extract combat and burst system

## Acceptance criteria

- [x] Extract combat/burst calculation and state lifecycle with explicit inputs; preserve current gameplay and all relevant regressions

## Scope and decisions

Approved under the director autonomous mandate recorded below. Acceptance evidence is in session 032; worker stops at Review.

## Sessions

- [Director integration and queue checkpoint034](../journal/2026-10-05-034-director-queue.md)

## Scope — autonomous mandate 2026-10-05

Child of TRI-003. Extract the existing firing/aiming/burst calculations and lifecycle into small dependency-free modules with explicit state/services, including source asymmetric aim and tank/plasma sweep rules. Keep runtime integration thin; avoid a service locator or copying the entire game into a wrapper. Preserve all constants, RNG order, timers, collision/damage/owner accounting and control behavior, including new desert types. Tests should compare meaningful before/after seeded sequences and existing regressions. No balance/fidelity changes. Update ARCHITECTURE and handoff; full suite plus relevant browser smoke (or explicit gap). Stop Review.
- [2026-10-05 / 032](../journal/2026-10-05-032-extract-combat-bursts.md)

