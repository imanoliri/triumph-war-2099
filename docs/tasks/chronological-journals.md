# chronological-journals

- Branch: `chore/chronological-journals`
- Base: `main` at `674dd426503928bb6004d2b5af85e5d5f0c49b3f`
- Issue: local backlog
- Status: complete locally

## Goal and user-visible outcome

Make session history chronological across the project while keeping a feature-oriented view and full handovers.

## Acceptance criteria

- [x] Date + daily number + feature name in each journal filename.
- [x] Daily numbers span features and locally visible branches/worktrees.
- [x] Task records link sessions; journals link their tasks.
- [x] Existing handovers migrated and links repaired.
- [x] Workflow instructions, templates and helper agree; disposable regressions pass.

## Scope and decisions

User requested chronological + feature structure, date + session number in that date + feature name. Use one authoritative journal per session under docs/journal; tasks provide the feature index. Dates use Europe/Berlin. Existing content preserved without invented timestamps.

## Implementation plan

Update helper and session template; migrate two prior handovers and this session; update task links and repository guidance; exercise daily numbering across task branches and worktrees.

## Verification plan

Full local suite plus disposable helper fixtures for journal names, cross-feature/worktree sequence, task links, resolved template fields and wrong-branch refusal. No gameplay change.

## Completion and review

Full local suite passed; additional journal regression fixtures passed. Scoped diff reviewed. Local squash integration uses the commit title "Organize session journals by date and feature". No publication. Sequential session creation is required across concurrent worktrees; separate clones must reconcile daily number collisions.

## Sessions

- [2026-10-04 / 003](../journal/2026-10-04-003-chronological-journals.md)
