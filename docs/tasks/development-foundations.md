# Development foundations

- Branch: `chore/development-foundations`
- Base: `main` at `eab0bb0c962ac41e9dea3eee26a346062566caad`
- Issue: user-requested maintenance milestone; local backlog
- Status: complete locally

## Goal

Make project development independent of the prototype chat: durable approved design, branch/session instructions, reproducible setup, task tracking and verification.

## Acceptance criteria

- [x] AGENTS plus current DESIGN/ARCHITECTURE/STATUS/SETUP/WORKFLOW are usable from a fresh checkout.
- [x] Each new task gets its own branch instruction Markdown and each session a numbered handoff, through a safe helper.
- [x] Existing playable state preserved as a milestone/main baseline; no history discarded.
- [x] Local backlog, issue/PR templates and CI checks prepared.
- [x] Runtime, packaging and optional asset recovery use repository-contained commands and explicit external inputs.
- [x] Begin gradual modularization without changing gameplay.
- [x] Automated checks, tooling/package/HTTP smoke checks pass; browser verification explicitly distinguished.

## Decisions and scope

Use Markdown instructions rather than duplicate per-feature skills. No new gameplay/balance changes. First extraction covers balance, mission progress and rally helpers; remaining systems receive bounded backlog tasks. Original assets/local Windows bank retain existing provenance constraints. Remote publication remains unresolved and is not performed by this maintenance task.

## Verification plan

Run complete syntax/project/game/music checks, task-helper creation/resume/worktree checks in disposable Git fixtures, package membership checks and runtime HTTP allowlist checks. Rehearse optional asset recovery in an isolated checkout if possible. Record unavailable live browser acceptance separately.

## Completion and review

Automated, tooling, packaging, HTTP and isolated recovery checks passed; scoped diff reviewed with no gameplay rebalance. Live browser acceptance remains not run and is recorded explicitly. Final handoff: docs/journal/2026-10-04-001-development-foundations.md. Maintenance implementation commit 0378f4a was fast-forwarded into local main after review; this completion record follows it. Publication is deferred.

## Sessions

- [2026-10-04 / 001](../journal/2026-10-04-001-development-foundations.md)
