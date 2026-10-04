# squash-merge-policy

- Branch: `chore/squash-merge-policy`
- Base: `main` at `8f5d3b290b3c176bd34201de22a629500db11d1b`
- Issue: local backlog
- Status: complete locally

## Goal and user-visible outcome

Make squash merging mandatory for every accepted task branch, retaining one meaningful task commit on main.

## Acceptance criteria

- [x] AGENTS, workflow, README/status, task/session templates and PR checklist require squash merges.
- [x] Document local and GitHub procedures, resulting commit references and starting subsequent tasks from main.
- [x] Existing milestone/history remains intact; this task itself is integrated by squash merge.

## Scope and decisions

Documentation only. Applies prospectively; historical fast-forward records remain truthful. GitHub repository settings are not changed by this local documentation task.

## Verification and completion

Reviewed documentation consistency and whitespace. No gameplay changes; gameplay tests not needed. One scoped task commit prepared, then squash-merged locally. The resulting commit can be located by its title, "Require squash merges for completed task branches", in main history.
