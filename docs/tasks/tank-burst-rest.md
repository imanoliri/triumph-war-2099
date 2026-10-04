# Review tank rest between firing bursts

- Ticket: TRI-028; state in [local board](../BOARD.md).
- Branch: `feature/tank-burst-rest`

## Goal and user-visible outcome

Review tank rest between firing bursts

## Acceptance criteria

- [x] Clarify approved duration: randomized 3.5–4.5 seconds from final shot to next-burst eligibility.
- [x] Tune tank only; preserve 9–12 shots, 0.20-second cadence, acquisition delays, targeting/sweeps and other units.
- [x] Verify deterministic stable-target boundaries, loss/reacquisition, tactical freeze/restart and Units description; run full local suite.
- [x] Update design and session evidence; stop at Review for independent director review.

## Scope and decisions

User balance report 2026-10-04, verbatim: "tank rests 3-5-4.5s between bursts". User clarified: current rest is too short; desired new rest is randomized 3.5 to 4.5 seconds between bursts. Preserve within-burst cadence and burst size. Measure from last shot of one burst to eligibility for the next with a continuously valid target; target acquisition/aim can add delay separately. This is the agreed numerical scope for later implementation, recorded from an actual answer. Capture Backlog; do not interrupt current custom missions or dispatch parallel worker.

Later bounded investigation should inspect tank burst size, shot cadence, cooldown/rest, target acquisition/repositioning and any difficulty or aiming effects. Reproduce observed rest in deterministic disposable fixture and distinguish cooldown from moving/aligning/no-target time. Propose or implement only agreed timing; preserve mounted cannon16 headings and asymmetric infantry aiming. Record custom balance separate from recovered source behavior; no unrelated weapon/global difficulty rewrite. Measurable later acceptance should include agreed time measured between last shot of one burst and first shot of next with stable valid target, edge cases for target loss/reacquisition/tactical freeze/restart, relevant regression/full suite and honest live limits. Worker stops Review on isolated branch after director approval.

## Sessions

## Queue execution approval

2026-10-05 user authorized continuing the queue. Agreed implementation: randomized tank rest from 3.5 to 4.5 seconds, preserving burst size/cadence and other units. Execute after TRI-027, as a separate bounded worker ticket.



- [2026-10-05 / 012](../journal/2026-10-05-012-tank-burst-rest.md)
