# Publication and issue tracking

- Ticket: TRI-006; state in [local board](../BOARD.md).
- Branch: not started

## Goal and user-visible outcome

Publication and issue tracking

## Acceptance criteria

- [ ] Resolve visibility/distribution scope; publish authorized files; enable CI and mirror this backlog into linked issues

## Scope and decisions

Backlog proposal. Agree bounded scope and verification with the user before Ready. TRI-003 is an umbrella; split into one system per approved task before execution.

## Sessions

## Connector revalidation — 2026-10-05

Browser revalidation: repository Projects page is reachable, but session is signed out; no authenticated create UI and no native Project connector operation. Authentication or a supported Project API is required. Do not extract Git credentials or bypass restrictions to manufacture an alternate session. The earlier blanket browser-denied statement is historical. Repository remains public; visibility unchanged. Main CI actually runs: Ubuntu succeeds, Windows director fixture fails in run37277644513. [TRI-047](windows-director-ci.md) owns the bounded fix; publication ticket cannot claim CI verified until hosted matrix passes.

Authenticated GitHub connector read and issue creation now succeed. Created [tracking issue #1](https://github.com/imanoliri/triumph-war-2099/issues/1) and mirrored all fifteen nonwithdrawn queued tickets as issues #1–15, with authoritative task links; URLs recorded in board.json. Existing completed work was not reopened, and withdrawn TRI-039 remains excluded. Local board remains status authority; these issues are mirrors, not verified synchronization.

Current GitHub tool inventory has issue/repository/PR tools but no native Projects operation. Native Project creation remains unresolved; do not claim issue mirrors satisfy the user's Project request. Ordinary code publication already succeeds through authorized Git. Previous issue-approval failure is historical, not current. Later bounded worker must inspect allowed Project routes and CI evidence, preserving access restrictions.

