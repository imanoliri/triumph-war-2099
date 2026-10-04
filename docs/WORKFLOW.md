# Development across branches and chats

## Daily workflow

1. The director agrees on one ticket with the user; follow [DIRECTOR](DIRECTOR.md) for intake, approved dispatch and question relay.
2. Create a branch and task record using the command below, or resume the task's existing branch.
3. The director starts one implementation worker in that checkout with the task/latest journal. The user continues talking to the director; see WORKER.
4. Implement the acceptance criteria, add focused regressions, run local checks and perform the relevant browser playtest when available.
5. Update current documentation, complete the session handoff and commit scoped files. Review the diff and the verification evidence.
6. The director independently reviews, squash-merges accepted work into main, then records Done and integration evidence in the board. Tag meaningful playable releases. Keep incomplete or unverified work identified.

## Start a feature branch

From the repository root, with a clean working tree:

```text
node tools/task.cjs start feature/example-feature
node tools/task.cjs start fix/example-bug --issue 12
```

This creates a branch from local main plus `docs/tasks/example-feature.md` and `docs/journal/YYYY-MM-DD-NNN-example-feature.md`. Fill in the task's acceptance criteria before work starts. The helper never publishes, commits or merges.

For concurrent work, use an isolated worktree:

```text
node tools/task.cjs start feature/example-feature --worktree ../triumph-example-feature
```

Open the returned directory in the app. Do not run two implementation chats in one checkout. A worktree uses tracked assets; generate its ignored local MIDI bank separately if desired. Git commands may need an explicitly trusted safe.directory on machines with different ownership; never disable that check globally.

For approved director tickets, use `task.cjs prepare <branch> --ticket <ID> --worktree <path>` as described in DIRECTOR. It preserves unrelated unstaged director files while requiring committed authoritative scope/approval board and an isolated destination. Generic `start` retains its clean-tree requirement.

## Resume or start another session

Use preparation's initial journal for its worker run. Retries and steering continue that journal. For a genuinely new run, read the previous handoff, switch to the existing task branch or open its preserved worktree, then:

```text
node tools/task.cjs session example-feature
```

The helper creates the next daily session record and appends its link to the task’s Sessions section. Each record includes the active branch, starting commit, task link, work performed, verification, unresolved questions and the next action. Earlier records remain as history. Do not duplicate the whole design document in session files.

Suggested opening prompt:

> Implement/resume docs/tasks/example-feature.md. Follow AGENTS.md and the latest handoff linked from that task’s Sessions section. Complete the acceptance criteria, verify the result and update the session record. Discuss unresolved gameplay choices before changing them.

## Chronological and feature views

Session journals live in `docs/journal/YYYY-MM-DD-NNN-feature-name.md`: date first, daily session number second, feature name last. Dates use Europe/Berlin. The number spans all features that day, rather than restarting for each feature. Sorting filenames gives project chronology; each `docs/tasks/<slug>.md` lists its sessions for the feature view. One journal is the authoritative session record and handover.

The helper chooses the next number from journals in local branches and active worktrees, including uncommitted session files. Create session records sequentially when using concurrent worktrees. Separately cloned repositories cannot share a local counter; reconcile duplicate daily numbers and update task links before integration. Existing records are preserved; the initial migration records known task order without inventing timestamps.

At session start, read the task and its latest linked journal. During work, append requests, decisions, actions and results in order to the chronological log. Before stopping, update task status and the journal’s verification, unresolved issues and exact next action. For a project-wide catch-up, read STATUS and the latest journals. Detailed session history belongs here; DEVELOPMENT-NOTES remains a concise milestone history.

## Review and merge

- Compare the branch to main; inspect game behavior, generated-data changes and documentation together.
- `node tools/dev.cjs test` runs syntax, repository checks, simulation and music checks. Browser acceptance is recorded in `docs/playtests/`.
- Unavailable browser access is a verification gap, not a passing playtest. Keep visual/audio changes awaiting playtest.
- Always squash-merge accepted task branches: one meaningful commit on main per completed task, even if the branch contains many implementation/session commits. Do not use merge commits or fast-forward task branches into main.
- On GitHub, use **Squash and merge**. For local merges, after review and with a clean checkout:

  ```text
  git switch main
  git merge --squash feature/example-feature
  git commit -m "Add example feature"
  ```

- Use a commit title that describes the complete player-facing change or maintenance outcome; reference the issue when applicable. Record the resulting squash commit in the task/session handoff.
- Start subsequent tasks from main; do not reuse a completed, squash-merged branch. Existing pre-policy history and milestone tags remain intact. Do not rewrite or force-push shared history.
- Before switching/merging, preserve unrelated modifications and check Git status. Never auto-stash another person's changes.
- For larger work, leave a draft task state and session handoff at each stopping point. Branch records are instructions; the task name is not automatic authorization to expand scope.

## Backlog and GitHub

Use the local docs/board.json and generated BOARD.md; BACKLOG describes intake. Task records own scope/acceptance. Optional issue links do not imply native synchronization. See DIRECTOR for the blocked remote setup and migration.

The GitHub workflow and PR templates are checked in locally and become active only after authorized publication. No automation here publishes original assets or the machine-local MIDI bank.

## Documentation ownership

- DESIGN: current approved rules and intent.
- ARCHITECTURE: current code boundaries and data flow.
- STATUS: current checkpoint and verification limitations.
- DEVELOPMENT-NOTES: chronological history; it can contain superseded numbers.
- Board JSON: workflow status, approved dispatch, questions/answers and review/integration evidence; BOARD is generated.
- Task files: feature scope, acceptance and session links; link board state rather than duplicating it.
- Journal files: chronological session history, decisions, evidence and handoff.
- README: installation, controls and entry points.

Use ordinary Markdown instructions for this workflow. A per-feature skill would duplicate the task records and become stale; create a skill only if a recurring specialized procedure later needs one.
