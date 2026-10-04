# Triumph development instructions

This repository is the project memory. A new chat must be able to finish a task from the checked-out code and its task/session records.

- Work on one bounded feature, fix or maintenance task per branch. Use `docs/WORKFLOW.md` for branch creation, worktrees, session handoffs and review. Resume an existing task branch when appropriate.
- Read that task's `docs/tasks/<slug>.md` and latest `docs/sessions/<slug>/` handoff. Consult DESIGN for gameplay decisions, ARCHITECTURE for boundaries, SETUP for commands and STATUS for known gaps as needed. Do not require every document for trivial edits.
- Preserve the deliberate asymmetric aiming rules, German physical-key controls, original sprite/map coordinate conventions and enemy-only barrel damage. Update DESIGN and Units/Controls when behavior changes.
- Keep recovered source data and custom gameplay changes distinguishable. Do not regenerate assets for unrelated edits. Use explicit source paths; never modify the installed original game.
- Use the existing dependency-free browser runtime. Extract small modules with explicit inputs; make behavior-preserving refactors independently of balance changes.
- Local checks use disposable VM fixtures without production access. Add relevant regression checks, run `node tools/dev.cjs test`, fix failures caused by the task and rerun affected checks without repeated approval. Browser playtests use `docs/PLAYTEST.md`; record them separately from simulation results. Never claim live rendering/audio/playability was verified when browser access is unavailable.
- A task is finished when its acceptance criteria are met, relevant checks pass, current descriptions/docs are updated, and its session handoff records changes, evidence, limitations and next steps. Make a scoped commit; prepare review before merging unless the user already authorized the merge.
- Always squash-merge accepted task branches into main: one meaningful commit per completed feature/fix/maintenance task. Do not use merge commits or fast-forward task branches into main. Preserve existing history; do not rewrite earlier milestones. Record the resulting squash commit in the task/session handoff.
- Preserve unrelated work. Never reset, clean, force-push or remove another task's checkout. Use separate worktrees for concurrent implementation. Do not delegate or start new chats unless the user requests it.
- Public/private remote publication and original-asset distribution remain unresolved in STATUS. Preserve authorship; do not upload the ignored Windows MIDI bank. Do not infer publish permission from local implementation work.
- If interrupted, save the current task/session status and exact next action. A handoff must not depend on chat history.
