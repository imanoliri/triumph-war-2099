# Reproduce live mission completion report

- Ticket: TRI-001; state in [local board](../BOARD.md).
- Branch: not started

## Goal and user-visible outcome

Reproduce live mission completion report

## Acceptance criteria

- [ ] Record mission/difficulty/save or steps; confirm Remaining counters; win each mission with its source objectives or fix a reproduced failure with regression coverage

## Scope and decisions

Backlog proposal. Agree bounded scope and verification with the user before Ready. TRI-003 is an umbrella; split into one system per approved task before execution.

## Sessions

## Autonomous mandate — 2026-10-05

User authorized consuming the queue and logging reasonable decisions while away. Run after TRI-036. Use Normal and fresh starts for all nine recovered missions, record exact browser actions, Remaining values and source-objective completion. Prior disposable VM completion checks are a useful baseline, not live evidence. Use normal UI input; never inject game state, fake victory or treat a deployment smoke as a completed mission. Record actual browser capability limitations and unreproduced reports honestly. A reproduced production defect should be reported for its own bounded fix before broad acceptance resumes. Do not tag a verified release from incomplete evidence.

