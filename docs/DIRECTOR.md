# Director workflow

For an approved map-art ticket, use the [art intake/dispatch/review checklist](art-kit/director-workflow.md) and its complete prompts/reference kit. This adds art evidence requirements within the authority below.

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

Board events retain dated lifecycle reasons and relay answers; detailed execution narrative belongs in the journal. The director alone edits board state in the director checkout. A worker's copied board can be stale; the worker reports to the director and updates its own task/journal. Do not run multiple directors editing the board simultaneously. Board changes and planning records are ordinary scoped Git commits. Consolidate accepted scope, approval and planning into one administrative checkpoint on main before preparation, so the task is available to the new branch. These administrative commits are distinct from the one squash commit per implementation task.

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

3. Commit the scope/approval checkpoint, then prepare an isolated branch/worktree from main:

   ```text
   node tools/task.cjs prepare feature/medics --ticket TRI-009 --worktree ../triumph-medics
   ```

   Preparation preserves the approved committed task, creates one initial session, and prints the concise linked worker contract. It allows unrelated unstaged director edits and untracked files; it rejects staged changes, dirty authoritative task/board records, unsafe destinations and active-worker overlap. It never stashes, resets or cleans. It does not start an agent or change board state.

4. Start one fresh minimal-context collaboration worker (`spawn_agent`, `fork_turns: "none"`) with the printed contract. Save the returned **actual** worker ID, then generate the durable dispatch prompt and bind the worker:

   ```text
   node tools/board.cjs dispatch TRI-009 ../triumph-medics /root/medics_worker
   ```

   Always run `board.cjs dispatch` before or as part of launching the worker subagent so `docs/board.json` transitions from `Ready` to `In progress`. The dispatch output uses the same contract; do not send a duplicate unless recovery or changed pointers require it. The director invokes available agent tools; the Node helper only prepares records/prompts. It needs no API key and never launches an agent. One worker remains bound through In progress, Blocked and Review; finish or explicitly park it before starting another ticket. Use collaboration messaging/followup for steering and bounded `wait_agent` calls for completion/events; inspect the agent tree when recovering. Avoid repeated unchanged status narration, while keeping required user communication cadence. A saved local Git project is not configured in the desktop app; do not claim `create_thread` dispatch is available. Collaboration workers are the current operational path.

## Quota pacing and automated recovery

If a worker or subagent hits an API rate limit quota pause (`RESOURCE_EXHAUSTED` / 429) during long-running queue execution:
- Inspect the log to get the exact reset window (e.g. ~18–19 minutes).
- Schedule a one-shot background timer using the `schedule` tool (`DurationSeconds` equal to the reset window, `TimerCondition="never"`).
- Notify the user of the scheduled reset time and pause execution cleanly.
- When the timer fires, resume queue execution immediately without losing state or stopping the task train.

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

After acceptance, the director follows WORKFLOW and **squash-merges** into main. Query `git rev-parse HEAD` for the main squash SHA and `git rev-parse <branch>` for the reviewed worker feature SHA in the director checkout. Then record the real resulting commit pair:

```text
node tools/board.cjs move TRI-009 Done "Acceptance reviewed; relevant checks passed; see journal evidence" /root/director <squash-SHA> <reviewed-worker-SHA>
```

Done refuses unchecked acceptance, unanswered questions, self review, absent main commits, commits that do not change the ticket task record, and merge commits. This is a record-validation gate; it cannot prove that a human reviewed the code or that a supplied main commit contains all intended code changes. A single-parent commit alone is not proof of a squash; the director confirms the actual integration. The director must verify both. The CLI has no merge/publish command.

Consolidate review, Done, final SHA and handoff into one subsequent administrative completion checkpoint when possible. Publication remains separately authorized; record its outcome in that checkpoint if already available. The final commit cannot contain its own SHA. Record the squash result in a small subsequent administrative board/handoff commit; do not rewrite the accepted squash or pretend its SHA was known before integration. Historical Done imports are explicitly labelled and retain their prior evidence.

## Recovery in a fresh director chat

Read AGENTS, this document, BOARD/board.json, the active ticket's task and latest director/worker journals. Inspect recorded checkout Git status/branch/HEAD. Compare worker report and commits to main before any transition. Agent IDs are session-local handles and may no longer be live; inspect the available agent tree before messaging them. Never invent a desktop thread ID or blindly recreate a checkout.

Resume the same live worker and checkout for unfinished work when available; a new bounded ticket gets a fresh minimal-context worker. If the worker no longer exists, start a replacement in the **same existing checkout and branch**, inspect unfinished edits first, then run `dispatch` with its new actual ID. The generated prompt includes latest session and persisted answers. The replacement reads the previous handoff, then `node tools/task.cjs session <slug>` creates its one new run journal. Dispatch itself never creates a journal. A blocked unanswered decision remains blocked until resolved. Never assume a vanished worker means its task is Done.

## Native GitHub Project mirror

GitHub Project [Triumph War 2099](https://github.com/users/imanoliri/projects/6) mirrors local board states via `node tools/github-project.cjs`. Local `docs/board.json` remains master; the remote board is refreshed at director checkpoints.

If `node tools/github-project.cjs` fails due to a transient GraphQL API error (`gh api graphql --input - failed`), retry the command. Local board state remains authoritative and safe across API retries.
