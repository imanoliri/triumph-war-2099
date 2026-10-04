# director-workflow

- Branch: `chore/director-workflow`
- Base: `main` at `b279654`
- Issue: local ticket DIR-001 (remote creation unavailable)
- Workflow state: [local board](../BOARD.md), ticket DIR-001

## Goal and user-visible outcome

One director conversation coordinates approved tickets and isolated implementation workers; the user only needs to interact with the director.

## Acceptance criteria

- [x] Thin director/worker instructions, durable ticket/task/session links and recovery.
- [x] Usable local board supporting Backlog, Ready, In progress, Blocked, Review and Done with reasons/evidence.
- [x] One worker at a time; isolated checkout; material questions relayed through director.
- [x] Scoped changes, relevant verification and squash review/integration.
- [x] Preserve publication/browser limitations; no false claim of native GitHub board or remote issues.

## Scope and decisions

User explicitly approved director orchestration, ticket handling and worker coordination. Initial implementation is a local board with optional GitHub links. GitHub browser access is blocked by a saved permission setting. The connector's issue creation returned "MCP tool call requires approval, but approval policy is never"; no remote issue was created. GitHub CLI absent; no native Projects tools exposed. Local code/assets stay unpublished. Do not retry blocked writes through another route.

## Implementation plan

Dispatch one isolated implementation worker with this task and chronological journal. Implement bounded built-in-only tooling and docs; exercise disposable fixtures. Director reviews and integrates by squash. Native GitHub board/issue synchronization remains an explicit external configuration gap.

## Verification plan

Disposable board lifecycle/dispatch/refusal/recovery tests and existing local checks. No gameplay changes or live browser/audio claims.

## Completion and review

Implementation worker ready for independent director review. All local acceptance checks passed; native remote issue/Projects integration is explicitly unavailable and not claimed. Worker implementation is committed under the title "Add thin local director ticket workflow" on chore/director-workflow. Director must inspect the diff, verify acceptance and squash-integrate before Done.

## Sessions

- [2026-10-04 / 004](../journal/2026-10-04-004-director-workflow.md)
- [2026-10-04 / 005](../journal/2026-10-04-005-director-workflow.md)
