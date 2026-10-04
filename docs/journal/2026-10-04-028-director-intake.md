# 2026-10-04 / 028 — director intake checkpoint

- Branch: main
- Status: complete

User requested two tickets for refinement here: TRI-018 Difficulty levels and TRI-019 New missions. Created both as Backlog with explicit planning-only scope and unresolved refinement topics. No implementation approval or worker dispatch is implied by ticket creation.

User reiterated director must never implement and must keep context clean by dispatching subagents for feature branches/sessions. Updated AGENTS and DIRECTOR with explicit boundary: worker owns original-game research, implementation, tests, current docs and detailed sessions; director owns intake, coordination, administrative metadata, independent review/checks, squash integration and authorized publication. Stalled work stays delegated through steering/replacement, not director takeover. Context uses concise evidence and durable linked records.

Verification: board rendered by existing create commands; inspected ticket records and documentation diff, git diff --check. Administrative metadata only; no gameplay changes or new worker. Preserve unrelated assets/provenance.json edit. Next action: refine either ticket with user, capture bounded acceptance before Ready/dispatch. Native GitHub Projects migration remains separate and incomplete.
