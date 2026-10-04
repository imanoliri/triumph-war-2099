# Director workflow

The user talks to the director. One implementation worker handles one approved ticket in an isolated Git worktree. This is a local workflow, not a running service or a native GitHub Projects integration.

## Director boundary and context

The director never implements gameplay, fixes or refactors and never conducts original-game research. It owns user discussion, ticket refinement, administrative board/planning/session records, worker dispatch/steering, question relay, independent review/checks, accepted squash integration and authorized publication. A subagent worker owns each approved ticket's research, implementation, tests, current documentation and chronological session handoff in an isolated task branch/worktree. Do not take over implementation when a worker stalls; steer or replace the worker in the same preserved checkout.

Keep detailed execution in worker task/session/research records. Request concise findings, exact commit/check evidence, limitations and next actions; load details only when needed for a decision or review. Pending brainstorm tickets stay Backlog until refined and agreed here. Read durable records after a handoff instead of depending on accumulated chat context.

## Authority and records

The user authorized the director to start, resume, steer and interrupt workers for agreed tickets, relay their material questions, and send user answers back. This authority persists across director conversations through these instructions. It does not authorize unagreed gameplay choices, expanded scope, publication, or nested delegation. Routine implementation choices belong to the worker.

- `docs/board.json`: authoritative workflow status, approval, actual worker ID/checkout, material questions/answers and review/integration evidence. `docs/BOARD.md` is its generated readable view.
- `docs/tasks/<slug>.md`: authoritative ticket scope and acceptance criteria. Do not duplicate the criteria in the board or a remote issue.
- `docs/journal/YYYY-MM-DD-NNN-<slug>.md`: chronological decisions, actions, checks and exact next action; linked from the task. Director and worker can each have a session journal for the same ticket.
- Git: implementation history and accepted squash commit on main.

Board events retain dated lifecycle reasons and relay answers; detailed execution narrative belongs in the journal. The director alone edits board state in the director checkout. A worker's copied board can be stale; the worker reports to the director and updates its own task/journal. Do not run multiple directors editing the board simultaneously. Board changes and planning records are ordinary scoped Git commits. Commit accepted planning records on main before creating a task worktree, so the task is available to the new branch. These administrative commits are distinct from the one squash commit per implementation task.

## Intake and execution

1. Brainstorm with the user, capture a bounded outcome, exclusions and observable acceptance in a task. Create a local ticket:

   ```text
   node tools/board.cjs create TRI-009 medics "Add medics" "Medics heal nearby soldiers according to agreed rules"
   ```

2. Flesh out the task before recording actual user agreement:

   ```text
   node tools/board.cjs move TRI-009 Ready "User approved the task scope and acceptance on 2026-10-04"
   ```

   The reason is an evidence record, not a substitute for asking the user when a material choice remains open. Existing TRI-001 through TRI-007 are Backlog proposals, not approved work. TRI-008 is historical Done with linked prior verification.

3. Commit planning records, then create an isolated branch/worktree from main:

   ```text
   node tools/task.cjs start feature/medics --ticket TRI-009 --worktree ../triumph-medics
   ```

   The task helper preserves the ticket's scope and creates the chronological session. It does not start an agent or change board state.

4. Start one collaboration worker in that checkout using `docs/templates/WORKER-PROMPT.md` and the task/latest journal. Save the returned **actual** worker ID, then generate the durable dispatch prompt and bind the worker:

   ```text
   node tools/board.cjs dispatch TRI-009 ../triumph-medics /root/medics_worker
   ```

   Send the generated prompt to that worker as steering if needed. The director invokes available agent tools; the Node helper only prepares records/prompts. It needs no API key and never launches an agent. One worker remains bound through In progress, Blocked and Review; finish or explicitly park it before starting another ticket. A saved local Git project is not configured in the desktop app; do not claim `create_thread` dispatch is available. Collaboration workers are the current operational path.

## Questions, steering and stopping

Workers send material questions to the director. Record them with `ask`, which moves the ticket to Blocked. Relay the question to the user when it requires their decision; the director may answer repository/process questions independently.

```text
node tools/board.cjs ask TRI-009 "May medics heal commanders too?"
node tools/board.cjs answer TRI-009 1 "User: yes, using the same healing interval"
node tools/board.cjs move TRI-009 "In progress" "Answer relayed to the worker; approved scope updated"
```

Record design answers in the authoritative task and journal. Send the answer to the worker using collaboration messaging or followup. A recorded answer alone does not resume a live agent. Keep unanswered questions blocked. If interrupted, have the worker save its journal and scoped commit when feasible; do not reset files. To park work, interrupt the worker, keep branch/checkout and journal, then move Blocked to Ready with a reason describing the parked state; this releases the active binding. Resume that same branch later.

## Review and Done

The worker stops at Review with a scoped commit and evidence; it never merges. The director inspects the diff and task acceptance independently, checks relevant verification, and resolves limitations explicitly. Unavailable browser/audio access is not a passing result. Send findings back as In progress when needed.

```text
node tools/board.cjs move TRI-009 Review "Worker commit <SHA>; checks and limitations in the linked journal"
```

After acceptance, the director follows WORKFLOW and **squash-merges** into main. Then record the real resulting commit:

```text
node tools/board.cjs move TRI-009 Done "Acceptance reviewed; relevant checks passed; see journal evidence" /root/director <squash-SHA> <reviewed-worker-SHA>
```

Done refuses unchecked acceptance, unanswered questions, self review, absent main commits, commits that do not change the ticket task record, and merge commits. This is a record-validation gate; it cannot prove that a human reviewed the code or that a supplied main commit contains all intended code changes. A single-parent commit alone is not proof of a squash; the director confirms the actual integration. The director must verify both. The CLI has no merge/publish command.

The final commit cannot contain its own SHA. Record the squash result in a small subsequent administrative board/handoff commit; do not rewrite the accepted squash or pretend its SHA was known before integration. Historical Done imports are explicitly labelled and retain their prior evidence.

## Recovery in a fresh director chat

Read AGENTS, this document, BOARD/board.json, the active ticket's task and latest director/worker journals. Inspect recorded checkout Git status/branch/HEAD. Compare worker report and commits to main before any transition. Agent IDs are session-local handles and may no longer be live; inspect the available agent tree before messaging them. Never invent a desktop thread ID or blindly recreate a checkout.

If the worker no longer exists, start a replacement in the **same existing checkout and branch**, inspect unfinished edits first, then run `dispatch` with its new actual ID. The generated prompt includes latest session and persisted answers. `node tools/task.cjs session <slug>` creates the new worker journal. A blocked unanswered decision remains blocked until resolved. Never assume a vanished worker means its task is Done.

## Optional native board migration

GitHub repository `imanoliri/triumph-war-2099` was public and empty when checked on 2026-10-04. No issue was created: the issue connector required approval while session approval policy was never. Saved browser permission denies GitHub access; no gh CLI or native Projects connector is available. Do not bypass these restrictions. Local board operation is complete without remote synchronization; enabling remote writes/Projects is external setup work.

After the user enables an authorized route, create real issues and a Project with the same states, record optional `issueUrl` per ticket, and link the authoritative task scope. Choose one workflow-status authority before switching to the native board; turn the local board into a snapshot/link view rather than maintaining competing statuses. Verify each actual remote transition. Publication of code/assets remains a separate decision; no local workflow command uploads anything.
