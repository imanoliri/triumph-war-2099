# Review tank rest between firing bursts

- Ticket: TRI-028; state in [local board](../BOARD.md).
- Branch: not started

## Goal and user-visible outcome

Review tank rest between firing bursts

## Acceptance criteria

- [ ] Clarify and tune tank burst/rest timing from user timing note, with explicit desired duration and regression evidence before balance implementation.

## Scope and decisions

User balance report 2026-10-04, verbatim: "tank rests 3-5-4.5s between bursts". User clarified: current rest is too short; desired new rest is randomized 3.5 to 4.5 seconds between bursts. Preserve within-burst cadence and burst size. Measure from last shot of one burst to eligibility for the next with a continuously valid target; target acquisition/aim can add delay separately. This is the agreed numerical scope for later implementation, recorded from an actual answer. Capture Backlog; do not interrupt current custom missions or dispatch parallel worker.

Later bounded investigation should inspect tank burst size, shot cadence, cooldown/rest, target acquisition/repositioning and any difficulty or aiming effects. Reproduce observed rest in deterministic disposable fixture and distinguish cooldown from moving/aligning/no-target time. Propose or implement only agreed timing; preserve mounted cannon16 headings and asymmetric infantry aiming. Record custom balance separate from recovered source behavior; no unrelated weapon/global difficulty rewrite. Measurable later acceptance should include agreed time measured between last shot of one burst and first shot of next with stable valid target, edge cases for target loss/reacquisition/tactical freeze/restart, relevant regression/full suite and honest live limits. Worker stops Review on isolated branch after director approval.

## Sessions

## Queue execution approval

2026-10-05 user authorized continuing the queue. Agreed implementation: randomized tank rest from 3.5 to 4.5 seconds, preserving burst size/cadence and other units. Execute after TRI-027, as a separate bounded worker ticket.



