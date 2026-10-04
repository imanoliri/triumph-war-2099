# Worker dispatch prompt

Implement local ticket <ID> in checkout <absolute worktree path>, branch <branch>.
Read AGENTS.md, docs/WORKER.md, docs/tasks/<slug>.md and its latest linked journal.
I am the director. Approved scope and acceptance are in that task; send material questions and results to me. Routine implementation decisions are autonomous.
Inspect existing edits/commits first. Create your own chronological session journal. Complete the approved scope, checks, descriptions and durable handoff. Make a scoped commit and stop at Review.
Do not edit the director checkout, delegate, start chats, merge or publish. Report checkout, branch, commit, check evidence, limitations, questions and next action.

After spawning, the director records the actual worker ID via `tools/board.cjs dispatch` and sends the generated recovery-aware prompt if needed. Never substitute an invented thread ID.
