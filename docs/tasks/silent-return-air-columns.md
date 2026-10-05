# Spread Silent Return airdrops into parallel columns

- Ticket: TRI-052; state in [local board](../BOARD.md).
- Branch: not started

## Goal and user-visible outcome

Spread Silent Return airdrops into parallel columns

## Acceptance criteria

- [ ] Three nearby distinct x coordinates centered on the existing approach, with about one soldier sprite of clear horizontal space between troop columns; footprint/spacing choice documented.
- [ ] Preserve 20s timing, three aircraft and one commando each, north entry, existing landing y values, support caps/reservations, restart and objective rules.
- [ ] Briefing/Units/current docs match; focused regressions and full local suite pass, real formation/landing browser evidence separate from simulation.
- [ ] Scoped commit and task/session handoff ready for independent review.

## Scope and decisions

User explicitly requested three tight parallel columns with about one soldier gap on 2026-10-06. Execute after TRI-051. Change only scheduled horizontal positions; retain current landing y values and other Silent Return behavior. Worker determines nearby geometry-valid spacing from recovered soldier footprint; ordinary coordinate choice delegated. No support amount/timing/balance changes, original assets or combat refactor. One worker, no delegation/board edits/merge/publication; stop at Review.

## Sessions
