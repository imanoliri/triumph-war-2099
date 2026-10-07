# Show custom unit sprites in the Units tab

- Ticket: TRI-071; state in [local board](../BOARD.md).
- Branch: `fix/custom-unit-guide-sprites`

## Goal and user-visible outcome

Show custom unit sprites in the Units tab

## Acceptance criteria

- [x] Every implemented custom soldier has a visible matching sprite in the Units tab; preserve original unit entries and verify the rendered guide

## Scope and decisions

User reported missing custom unit sprites in the Units tab on 2026-10-07. Fix guide presentation for implemented custom units using their existing appearance; no new unit design or gameplay changes. Initial planning-only pause was revoked by the execution authorization below.

## Sessions



Execution authorization 2026-10-07: user requested agents executing tickets one by one; earlier planning-only pause is revoked.

- [2026-10-07 / 010](../journal/2026-10-07-010-custom-unit-guide-sprites.md)

Implementation coverage: Rider scout, Dune guard, Field mechanic and Snow sniper, using their existing recovered infantry frame and runtime marks. Convoy crawler and desert worm are vehicles/enemies and remain outside this soldier-only scope. Original unit entries preserved. Evidence: [actual browser report](../playtests/2026-10-07-custom-unit-guide-sprites.md) and `tools/check-unit-guide.cjs`.
