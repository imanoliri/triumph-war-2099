# Spread Silent Return airdrops into parallel columns

- Ticket: TRI-052; state in [local board](../BOARD.md).
- Branch: `feature/silent-return-air-columns`

## Goal and user-visible outcome

Spread Silent Return airdrops into parallel columns

## Acceptance criteria

- [x] Three nearby distinct x coordinates centered on the existing approach, with about one soldier sprite of clear horizontal space between troop columns; footprint/spacing choice documented.
- [x] Preserve 20s timing, three aircraft and one commando each, north entry, existing landing y values, support caps/reservations, restart and objective rules.
- [x] Briefing/Units/current docs match; focused regressions and full local suite pass, real formation/landing browser evidence separate from simulation.
- [x] Scoped commit and task/session handoff ready for independent review.

## Scope and decisions

User explicitly requested three tight parallel columns with about one soldier gap on 2026-10-06. Execute after TRI-051. Change only scheduled horizontal positions; retain current landing y values and other Silent Return behavior. Worker determines nearby geometry-valid spacing from recovered soldier footprint; ordinary coordinate choice delegated. No support amount/timing/balance changes, original assets or combat refactor. One worker, no delegation/board edits/merge/publication; stop at Review.

## Sessions
- [2026-10-06 / 005](../journal/2026-10-06-005-silent-return-air-columns.md)

## Review handoff

Ready for independent director review; scoped branch commit is git HEAD. All focused checks and full node tools/dev.cjs test exit0. Live Normal formation/landing screenshots and limits in [playtest](../playtests/2026-10-06-silent-columns.md); exact coordinates/all-five profiles are VM evidence. No merge or publication; director records eventual squash SHA in a subsequent checkpoint.
