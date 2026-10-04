# Development across branches and chats

## Daily workflow

1. Pick one backlog item or issue. Agree on gameplay/UI decisions before implementing material design changes.
2. Create a branch and task record using the command below, or resume the task's existing branch.
3. Start a fresh chat attached to that checkout. Give it the task path; the checked-out repository carries the context.
4. Implement the acceptance criteria, add focused regressions, run local checks and perform the relevant browser playtest when available.
5. Update current documentation, complete the session handoff and commit scoped files. Review the diff and the verification evidence.
6. After acceptance, merge into main and mark the backlog/task complete. Tag meaningful playable releases. Keep incomplete or unverified work identified.

## Start a feature branch

From the repository root, with a clean working tree:

```text
node tools/task.cjs start feature/example-feature
node tools/task.cjs start fix/example-bug --issue 12
```

This creates a branch from local main plus `docs/tasks/example-feature.md` and `docs/sessions/example-feature/001.md`. Fill in the task's acceptance criteria before work starts. The helper never publishes, commits or merges.

For concurrent work, use an isolated worktree:

```text
node tools/task.cjs start feature/example-feature --worktree ../triumph-example-feature
```

Open the returned directory in the app. Do not run two implementation chats in one checkout. A worktree uses tracked assets; generate its ignored local MIDI bank separately if desired. Git commands may need an explicitly trusted safe.directory on machines with different ownership; never disable that check globally.

## Resume or start another session

Switch to the existing task branch or open its worktree, then:

```text
node tools/task.cjs session example-feature
```

The helper creates the next numbered session record. Each record includes the active branch, starting commit, task link, work performed, verification, unresolved questions and the next action. Earlier records remain as history. Do not duplicate the whole design document in session files.

Suggested opening prompt:

> Implement/resume docs/tasks/example-feature.md. Follow AGENTS.md and the latest handoff in docs/sessions/example-feature. Complete the acceptance criteria, verify the result and update the session record. Discuss unresolved gameplay choices before changing them.

## Review and merge

- Compare the branch to main; inspect game behavior, generated-data changes and documentation together.
- `node tools/dev.cjs test` runs syntax, repository checks, simulation and music checks. Browser acceptance is recorded in `docs/playtests/`.
- Unavailable browser access is a verification gap, not a passing playtest. Keep visual/audio changes awaiting playtest.
- Merge accepted changes with a merge commit when retaining one task per branch is useful. Do not force-push shared branches.
- Before switching/merging, preserve unrelated modifications and check Git status. Never auto-stash another person's changes.
- For larger work, leave a draft task state and session handoff at each stopping point. Branch records are instructions; the task name is not automatic authorization to expand scope.

## Backlog and GitHub

Use `docs/BACKLOG.md` until remote publication is resolved. Stable IDs can be copied into GitHub Issues using the supplied issue templates. Keep one authoritative status for each item; link a GitHub issue from its task record once it exists.

The GitHub workflow and PR templates are checked in locally and become active only after authorized publication. No automation here publishes original assets or the machine-local MIDI bank.

## Documentation ownership

- DESIGN: current approved rules and intent.
- ARCHITECTURE: current code boundaries and data flow.
- STATUS: current checkpoint and verification limitations.
- DEVELOPMENT-NOTES: chronological history; it can contain superseded numbers.
- Task/session files: branch scope, acceptance and handoff.
- README: installation, controls and entry points.

Use ordinary Markdown instructions for this workflow. A per-feature skill would duplicate the task records and become stale; create a skill only if a recurring specialized procedure later needs one.
