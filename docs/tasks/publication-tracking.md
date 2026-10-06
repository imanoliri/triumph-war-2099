# Publication and issue tracking

- Ticket: TRI-006; state in [local board](../BOARD.md).
- Branch: not started

## Goal and user-visible outcome

The GitHub repository `imanoliri/triumph-war-2099` has a native GitHub Project board that shows every local board ticket with its current workflow state, and the director can refresh it repeatably from `docs/board.json`.

## Acceptance criteria

- [ ] A GitHub Project (v2) named "Triumph War 2099" exists under the repository owner and is linked to the repository.
- [ ] Its single-select Status field has the local board states Backlog, Ready, In progress, Blocked, Review, Done, plus Withdrawn for tickets whose latest reason records a user withdrawal.
- [ ] Every ticket in `docs/board.json` appears exactly once: tickets with an `issueUrl` as that real issue; tickets without one as a draft item titled `<ID>: <title>` whose body links the task record on main. No new issues are created for historical tickets.
- [ ] Each item's Status matches the local board; issues of withdrawn tickets (TRI-001, TRI-002, TRI-004, TRI-039) are closed as not planned; other issues are closed exactly when the ticket is Done.
- [ ] A dependency-free `tools/` helper (Node, invoking the installed `gh` CLI) performs an idempotent sync with a dry-run mode; rerunning it makes no changes. Offline regression checks cover the board-to-Project mapping without network access and run in `node tools/dev.cjs test`.
- [ ] DIRECTOR, WORKFLOW, STATUS and the generated BOARD header state that the local board remains authoritative and the Project is a mirror refreshed at director checkpoints, including the Project URL.
- [ ] Real remote results (Project URL, item count, sample state checks, sync rerun with zero changes) are recorded in the session journal.

## Scope and decisions

User approved 2026-10-06 ("do TRI-006 right now, try to do everything on your own"). Director defaults recorded under that mandate:

- Local `docs/board.json` stays the single authoritative status source; the Project is a one-way mirror (board to GitHub). No two-way sync.
- Authentication uses the GitHub CLI (`gh`, installed 2026-10-06 at `C:\Program Files\GitHub CLI\gh.exe`) with the user's interactive device login and `project` scope. Never extract Git credential-helper tokens.
- Repository visibility stays unchanged (public). Original-asset distribution/licensing stays an unresolved STATUS item and is excluded from this ticket. The ignored Windows MIDI bank stays unpublished.
- No gameplay, asset or runtime changes. Existing issues are not retitled; historical Done tickets become draft items, not issues.
- Earlier connector notes below are history; they predate the CLI route.

## Sessions

## Connector revalidation — 2026-10-05

Browser revalidation: repository Projects page is reachable, but session is signed out; no authenticated create UI and no native Project connector operation. Authentication or a supported Project API is required. Do not extract Git credentials or bypass restrictions to manufacture an alternate session. The earlier blanket browser-denied statement is historical. Repository remains public; visibility unchanged. Main CI actually runs: Ubuntu succeeds, Windows director fixture fails in run37277644513. [TRI-047](windows-director-ci.md) owns the bounded fix; publication ticket cannot claim CI verified until hosted matrix passes.

Authenticated GitHub connector read and issue creation now succeed. Created [tracking issue #1](https://github.com/imanoliri/triumph-war-2099/issues/1) and mirrored all fifteen nonwithdrawn queued tickets as issues #1–15, with authoritative task links; URLs recorded in board.json. Existing completed work was not reopened, and withdrawn TRI-039 remains excluded. Local board remains status authority; these issues are mirrors, not verified synchronization.

Current GitHub tool inventory has issue/repository/PR tools but no native Projects operation. Native Project creation remains unresolved; do not claim issue mirrors satisfy the user's Project request. Ordinary code publication already succeeds through authorized Git. Previous issue-approval failure is historical, not current. Later bounded worker must inspect allowed Project routes and CI evidence, preserving access restrictions.

## Current publication evidence — 2026-10-05

TRI-047 is accepted as e477e2b4276e25617ab5521c8212792fda0652d5. Actual hosted feature run37301448979 and merged-main runs37301993040 and37302717167 pass full Windows and Ubuntu jobs. Earlier Windows failure is resolved; current CI is verified. Pending nonwithdrawn tickets have real mirrors through issue17; accepted child and reconciled planning issues were closed remotely after main publication. Local board remains authoritative. This does not create a native Project or resolve future distribution/visibility decisions. Native Project still requires an authenticated supported route; ignored MIDI bank remains unpublished.

Fresh director IAB revalidation after TRI-048: repository Projects page finished loading and states "There are no projects linked to this repository." Header still shows Sign in; no create control. Temporary inspection tab closed. Current GitHub tool inventory has no Project operation. Exact next action: provide an authenticated browser session or supported native Project connector, create/link the requested Project, choose one authoritative status source and verify each migrated item/state. Issue mirrors and local board do not satisfy this remaining deliverable; do not extract credentials to bypass this prerequisite.

