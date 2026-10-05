# Fix Windows director Git repository identity check

- Ticket: TRI-047; state in [local board](../BOARD.md).
- Branch: not started

## Goal and user-visible outcome

Fix Windows director Git repository identity check

## Acceptance criteria

- [ ] Reproduce and fix GitHub Windows director workflow failure without weakening unrelated-repository guards; verify Windows and Ubuntu CI

## Scope and decisions

Backlog proposal; director must record user agreement before Ready.

## Sessions

## Evidence and bounded scope — 2026-10-05

Director checked actual [run 37277644513](https://github.com/imanoliri/triumph-war-2099/actions/runs/37277644513) for pushed main 5d0d908: Ubuntu job111658132433 succeeded; Windows job111658132770 failed after all gameplay checks, in tools/check-director.cjs:37 through board dispatch, asserting `Worker must share this Git repository` (exit1 versus expected0). Local Windows full suite passes; hosted Windows failure must be reproduced from exact Git/common-directory/path behavior. Do not infer cause solely from this message.

Use disposable fixtures, preserve strict rejection of genuinely unrelated repositories, don't globally disable safe.directory or skip Windows tests, and make the smallest portability fix with meaningful regression evidence. Keep gameplay/difficulty changes out. Run director/tooling plus full suite and record hosted matrix results after authorized director integration/push; a locally green check alone does not prove remote resolution. Execute after active TRI-046, before other queued runtime work. User autonomous mandate authorizes bounded fix.
