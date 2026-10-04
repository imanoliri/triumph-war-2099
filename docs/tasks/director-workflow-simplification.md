# Simplify director worker dispatch and handoffs

- Ticket: TRI-022; state in [local board](../BOARD.md).
- Branch: `chore/director-workflow-simplification`

## Goal and user-visible outcome

Simplify director worker dispatch and handoffs

## Acceptance criteria

- [x] Implement safe streamlined preparation/dispatch records, one useful session per run, concise fresh-worker contracts and consolidated completion guidance; disposable lifecycle checks pass without weakening isolation/review or changing gameplay.

## Scope and decisions

User explicitly authorized implementation of the discussed workflow simplification on 2026-10-04. Director never implements; one fresh worker with minimal inherited context owns this maintenance ticket. Inspect AGENTS, DIRECTOR, WORKER, WORKFLOW, tools/task.cjs, tools/board.cjs and disposable tooling/director checks. Implement a safe streamlined preparation operation that validates approved ticket/repository/worktree/branch and creates isolated checkout plus task/session links without rejecting unrelated unstaged director changes; reject unsafe overlap, staged/uncommitted authoritative task changes, mismatched repos/branches or unsafe destinations, preserve all unrelated files. Do not auto-stash/reset/clean/delete. Integrate existing helpers rather than adding a parallel workflow or hidden agent-launch service. Preparation/dispatch should yield one concise pointer-based contract with ticket/task, checkout, branch, session and expected Review return, avoiding repeated scope/policy copies. Make one useful journal per execution run: initial preparation session is used by its worker, retries/resumes create a fresh session only for a genuinely new run when appropriate; preserve previous records and globally unique chronological naming. New bounded tickets get fresh minimal-context subagents; unfinished tickets resume same worker/check-out when available, otherwise replacement reads durable handoff in preserved checkout. Document actual collaboration tool orchestration; CLI does not launch agents and never invents IDs. Director reports stay concise (SHA/checks/limits/questions/next action); details remain linked in worker records. Consolidate administrative planning/dispatch and review/completion/publication checkpoints where possible, preserving scope approval evidence, board authority and separate one squash implementation commit. Keep all current lifecycle validation gates and one active implementation worker. Explain waiting/event handling without claiming capabilities absent here; avoid frequent check-in messages and repetitive status narration, obey required user communication cadence. Update canonical instructions/templates once, remove duplicated policy rather than introducing another abstraction/record authority. No automatic merge/push, network access credentials, recursive tasks, GitHub board migration, gameplay/assets changes or nested delegation. Meaningful disposable regression tests for dirty director preservation/safe preparation, one initial session/recovery, prompt links/conciseness, rejected malformed inputs, unrelated repo, false Done/self review and integration; run node tools/dev.cjs test, affected checks and committed-range diff check. Record concise before/after evidence and limitations. Stop Review with scoped commit; director independently reviews and squash-integrates. Proposed speed/context benefits require measurement, not unsupported percentage claims.

## Sessions

- [2026-10-04 / 035](../journal/2026-10-04-035-director-workflow-simplification.md)

- [2026-10-04 / 036 — director acceptance](../journal/2026-10-04-036-director-workflow-simplification-director.md)
