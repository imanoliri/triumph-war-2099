# Review tank rest between firing bursts

- Ticket: TRI-028; state in [local board](../BOARD.md).
- Branch: not started

## Goal and user-visible outcome

Review tank rest between firing bursts

## Acceptance criteria

- [ ] Clarify and tune tank burst/rest timing from user timing note, with explicit desired duration and regression evidence before balance implementation.

## Scope and decisions

User balance report 2026-10-04, verbatim: "tank rests 3-5-4.5s between bursts". Meaning is not yet resolved: observed excessive roughly3-5s delay versus proposed fixed4.5s rest. Director asked an optional clarification and must record actual answer before approving a numerical balance change. Capture Backlog; do not interrupt current custom missions or dispatch parallel worker.

Later bounded investigation should inspect tank burst size, shot cadence, cooldown/rest, target acquisition/repositioning and any difficulty or aiming effects. Reproduce observed rest in deterministic disposable fixture and distinguish cooldown from moving/aligning/no-target time. Propose or implement only agreed timing; preserve mounted cannon16 headings and asymmetric infantry aiming. Record custom balance separate from recovered source behavior; no unrelated weapon/global difficulty rewrite. Measurable later acceptance should include agreed time measured between last shot of one burst and first shot of next with stable valid target, edge cases for target loss/reacquisition/tactical freeze/restart, relevant regression/full suite and honest live limits. Worker stops Review on isolated branch after director approval.

## Sessions


