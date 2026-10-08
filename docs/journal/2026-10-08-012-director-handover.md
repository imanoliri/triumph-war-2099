# 2026-10-08 /012 — director handover & mission tickets roadmap

User requested continuing today's director session, focusing specifically on enabling and executing the playable mission tickets (TRI-087 through TRI-091), keeping check execution lean with focused scripts (`node tools/check-*.cjs`), and preparing a complete handoff note for Codex/future sessions.

## Current State & Recent Integrations

- **TRI-084 (Floating Habitats Specialist Roster)**:
  - Reviewed worker commit `4c9aa316b0224e57461efed6c0e94ab2f3c9f951` on `feature/floating-habitats-trooper-roster`.
  - Focused check `node tools/check-floating-habitats-troopers.cjs` passed. Full suite exit 0 verified.
  - Squash-merged into `main` at commit `2b8edd534c8eb8f29f2fbf6c57ee9510bb1996c3`.
  - Board status moved to `Done` and GitHub Project mirrored (94 items).

## Mission Tickets Ready for Sequential Execution

The following mission tickets have all prerequisite roster integrations present on `main` and are ready to be dispatched one by one:

1. **TRI-087 — Industrial Mission** (`docs/tasks/industrial-mission.md`)
   - **Prerequisite**: TRI-079 (Done)
   - **Status**: Ready for dispatch
   - **Command**: `node tools/task.cjs prepare feature/industrial-mission --ticket TRI-087 --worktree ../triumph-industrial-mission`

2. **TRI-088 — Mercenary Frontier Mission** (`docs/tasks/mercenary-frontier-mission.md`)
   - **Prerequisite**: TRI-080 (Done)
   - **Status**: Ready for dispatch
   - **Command**: `node tools/task.cjs prepare feature/mercenary-frontier-mission --ticket TRI-088 --worktree ../triumph-mercenary-frontier-mission`

3. **TRI-089 — Toxic Marsh Mission** (`docs/tasks/toxic-marsh-mission.md`)
   - **Prerequisite**: TRI-082 (Done)
   - **Status**: Ready for dispatch
   - **Command**: `node tools/task.cjs prepare feature/toxic-marsh-mission --ticket TRI-089 --worktree ../triumph-toxic-marsh-mission`

4. **TRI-090 — Airless Moon Mission** (`docs/tasks/airless-moon-mission.md`)
   - **Prerequisite**: TRI-083 (Done)
   - **Status**: Ready for dispatch
   - **Command**: `node tools/task.cjs prepare feature/airless-moon-mission --ticket TRI-090 --worktree ../triumph-airless-moon-mission`

5. **TRI-091 — Floating Habitats Mission** (`docs/tasks/floating-habitats-mission.md`)
   - **Prerequisite**: TRI-084 (Done)
   - **Status**: Ready for dispatch
   - **Command**: `node tools/task.cjs prepare feature/floating-habitats-mission --ticket TRI-091 --worktree ../triumph-floating-habitats-mission`

## Queued Tasks (Following Mission Phase)

- **TRI-085**: Abandoned World specialist roster
- **TRI-086**: Orbital Scrapyard specialist roster
- **TRI-092**: Abandoned World mission (requires TRI-085)
- **TRI-093**: Orbital Scrapyard mission (requires TRI-086)
- **TRI-067**: Expand game soundtrack (parked)

## Handoff Directives for Codex / Director Agent

1. **Focused Verification**: Use individual script checks (`node tools/check-<feature>.cjs`) during implementation and preliminary review to avoid lengthy test suite waits. Run the full suite (`node tools/dev.cjs test`) only prior to final Review/Done transitions.
2. **One Worker at a Time**: Maintain strict single-worker isolation per worktree.
3. **Squash Integration**: Always squash-merge accepted feature branches into `main` and record both the squash SHA and worker commit SHA in `docs/board.json`.
4. **Mirror GitHub Project**: Execute `node tools/github-project.cjs` after every board state update.
