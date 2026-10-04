# 2026-10-04 / 035 — director-workflow-simplification

- Task: [director-workflow-simplification](../tasks/director-workflow-simplification.md)
- Date: 2026-10-04 (Europe/Berlin); session 035 across all features that day
- Branch: `chore/director-workflow-simplification`
- Starting commit: `75e6c199507a40a90bf28bdc491586e1b96bacb5`
- Status: Review

## Starting context

Fresh minimal-context worker assigned TRI-022 in the isolated checkout. Preserved the director-prepared task edits and initial session; did not create another journal. No unrelated worker edits were present. Director board remains owned by the sibling director checkout.

## Work performed

Added `task.cjs prepare` to the existing start path: validates approved Ready ticket and committed task on director main, rejects staged files, dirty scope, pending questions, active workers, existing/overlapping destinations and destinations inside another repository. Resolves existing parent aliases before writing. Unrelated unstaged and untracked director files remain intact; no stash/reset/clean/delete is performed.

Preparation creates task/session pointers and prints the same concise contract exported by board dispatch. CLI never launches agents or changes preparation board status. Dispatch retains repository/branch, question and lifecycle gates. Questions/answers are linked through the authoritative director board instead of embedded copies.

Updated canonical DIRECTOR/WORKER/WORKFLOW and the prompt template: one initial journal per prepared run; retries continue it; replacement runs read old handoff then create one fresh session in preserved checkout. New bounded tickets use fresh minimal-context collaboration workers; live unfinished workers resume. Documents describe actual spawn/message/followup/wait/tree tools, required communication cadence, and consolidated planning/completion administrative checkpoints. Independent review and separate squash implementation remain required.

## Chronological log

- Read approved task, instructions, initial journal, helpers and disposable regressions; inspected existing edits.
- Implemented preparation and shared contract, then canonical guidance.
- Added meaningful fixture checks for dirty file preservation, staged/dirty scope refusal, malformed input, overlap/nested unrelated repository refusal, branch mismatch, active worker gate, one initial session/replacement journal and concise linked prompt. Existing false-Done, independent-review, questions and integration checks remain.
- Moved director fixtures to OS temporary storage because destination protection correctly rejects nested repositories; no production access occurs.
- Director independent review requested committed-board guarding and fail-closed parent detection. Added dirty/untracked authoritative board refusal with byte-preservation regressions, and a small exported detector check: only Git status 128 with the exact not-a-repository diagnostic permits preparation; dubious ownership, permission errors, missing Git and unknown statuses fail with diagnostics. Ownership is never bypassed.
- Focused director/tooling and syntax checks passed after review fixes; no repeated full suite was required by review.
- Focused checks and full suite passed; reviewed scoped diff and corrected an extra final blank line.

## Verification

| Check | Result | Evidence |
| --- | --- | --- |
| `node tools/check-director.cjs` | passed | Disposable lifecycle plus added safe preparation/prompt/recovery regressions; final fixture XFrYNw in OS temp |
| `node tools/dev.cjs test` | passed | Syntax (34 scripts), project, simulation, music, tooling and director checks; final director fixture RpzXv2 |
| `git diff --check` | passed after EOF correction | Committed-range check follows scoped commit |
| Live browser playtest | not applicable / not run | Maintenance only; no gameplay/assets/runtime edits or new live rendering/audio claim |

## Before/after evidence and limits

Previously ticket start required a completely clean director checkout and worker instructions requested another fresh session after preparation. The fixture now preserves both dirty tracked bytes and an untracked file while creating exactly one initial journal; dispatch leaves that count unchanged, and explicit replacement session adds one record. Dispatch contract is regression-bounded below 1000 characters and links policy/scope/history instead of reproducing them. No elapsed-time/context percentage improvement is claimed. Repository validation gates cannot prove the quality of review or integration; director still inspects actual diff and evidence. Preparation is a new-run operation; recovery reuses checkout rather than calling it again. No automated merge, publication or agent service.

## Next action / handoff

Director independently reviews the scoped worker commit and acceptance, then squash-integrates if accepted; record resulting squash SHA in consolidated board/handoff checkpoint. Worker commit is the commit containing this session (resolve with `git log -1 --format=%H -- docs/journal/2026-10-04-035-director-workflow-simplification.md`). No open questions. Not merged or published. On review findings, continue this run/journal and report updated scoped SHA.
