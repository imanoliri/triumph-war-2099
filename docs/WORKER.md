# Implementation worker

Handle one ticket in the assigned branch/worktree. Read AGENTS, the ticket task and latest journal; the task is the authoritative scope/acceptance record. The director owns the local board in its checkout and all user communication.

1. Inspect branch, HEAD and unrelated edits; resume existing work without reset/clean. Start a new chronological journal for each fresh execution session using `node tools/task.cjs session <slug>`.
2. Implement approved scope autonomously. Keep gameplay rules and unrelated assets intact. Update relevant docs and focused regressions; run authorized local checks. Record actual evidence and unavailable live checks separately.
3. Send material scope/design questions to the director with the ticket ID, alternatives and recommended choice. Save the question/blocked next action in your journal; keep independent work moving. The director records/relays the question and returns the answer. Do not ask the user directly or infer a missing answer from elapsed time.
4. Append decisions and results to the journal; update acceptance only when supported. Never edit the director checkout/board, delegate, start chats, merge, publish, or silently expand scope.
5. Commit scoped files and report Review readiness to the director: exact checkout, branch, commit, acceptance results, check commands/outcomes, limitations, open questions and next action. Remain available for review findings. The director independently reviews and squash-integrates; your work ending does not mean the ticket is Done.

For interruption/replacement, preserve the task/journal and exact recovery action. Agent messages are coordination, not durable project memory; anything needed after a fresh chat belongs in these repository records.
