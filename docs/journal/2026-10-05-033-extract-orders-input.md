# 2026-10-05 / 033 — extract-orders-input

- Task: [extract-orders-input](../tasks/extract-orders-input.md)
- Date: 2026-10-05 (Europe/Berlin); session 033 across all features that day
- Branch: `chore/extract-orders-input`
- Starting commit: `a6fed3313515a02bc2ab49e7ab6b380fd3bbe870`
- Status: Review

## Starting context

Approved TRI-043 starts from a6fed3313515a02bc2ab49e7ab6b380fd3bbe870 after TRI-042 combat/projectile extraction. Existing task/journal preparation edits were intentional; no unrelated edits or prior execution to resume.

## Work performed

Extracted dependency-free classic scripts src/orders.js, src/input.js and src/input-dom.js. Troop orders use current-state and named gameplay services; owned input state covers keys, selection, rally, commander, pointer and modal bookkeeping. Runtime retains world state, simulation pause, support/combat orchestration and rendering. Preserved physical presets, AI defaults, free mouse aim, selection/focus/use/force precedence and shared job identity. Added immutable source-baseline sequences with guarded loader substitution and rendered hint comparison; updated runtime/VM load order and architecture.

## Chronological log

Append requests, decisions, actions and results in order during this session. Summarize relevant context; do not copy entire transcripts. Use timestamps only when known.

## Verification

| Check | Result | Evidence |
| --- | --- | --- |
| Automated checks | pass | node tools/dev.cjs test: syntax + 18 check scripts; session56306 exit0. Four immutable input traces, 30 combat traces/six simulations, independent existing gameplay checks. Follow-up check-input (62141), check-project and git diff --check pass after copy correction. |
| Live browser playtest | bounded smoke pass | Director independently reloaded ordinary IAB2143 after hint fix: tactical deployment, selectors1–4/deselect, correct copy, Controls tactical restore, physical R/Escape placement exit and physicalF2 ownership reset/redeploy. [Detailed partial/not-run record](../playtests/2026-10-05-extract-orders-input.md). |

## Unresolved issues and risks

No gameplay/simulation failures remain. Worker IAB creation with explicit visibility is unsupported in subagent context; director runs independent browser smoke on worker preview. Broader nine-mission live playthrough/audio fidelity remains outside this bounded smoke. Source baseline requires preserved Git history, as does the existing combat baseline. No original-game research, asset regeneration, board edits, merge or publication.

## Next action / handoff

Independent director review of chore/extract-orders-input HEAD: inspect explicit services/current-state replacement, immutable loader fail-loud guards, DOM normalization and preserved hints. All acceptance evidence is recorded. Obtain the scoped Review SHA with git rev-parse chore/extract-orders-input (also reported by worker to director). Not squash-merged; director owns integration and subsequent squash-SHA checkpoint. No open questions.

- Inspected clean feature base; prepared task/journal edits are intentional. Chosen explicit orders services, owned input state, and normalized DOM event boundary. Implementing extraction and immutable baseline checks.

- Extracted src/orders.js, src/input.js and normalized src/input-dom.js; current-state getter follows mission replacement. Four immutable pre/post traces passed before strengthened coverage assertions. Full suite running via exec session56306; preview session67059 on port2143. Browser tool refuses IAB in subagent thread; asked director to smoke the worker preview. Initial project load-order assertion edit was corrected before rerunning suite.

- Director browser smoke found two control-hint copy leaks from identifier conversion. Restored exact original drag wording, audited decision strings, and added rendered hint text to immutable snapshots. Strengthened four-sequence comparison passed (session62141 exit0), including independent expected behavior checks and running/tactical modal restoration. Full suite session56306 remains running at combat comparisons; no redundant second full-suite run.

- Full node tools/dev.cjs test session56306 exited0, including18 check scripts plus syntax. Strengthened hint comparison62141 and follow-up project/whitespace checks exited0. Remaining exact action: record director browser evidence, update acceptance/handoff, commit scoped files and stop Review. Preview67059 remains live on2143 for review.

- Director final reload smoke confirmed corrected hints, tactical start/modal restoration, exclusive selectors1–4/deselect, physicalR/Escape rally exit and physicalF2 reset/redeploy; attributed in separate playtest record. Acceptance checked and status Review. Scoped commit follows; no board/merge/publish.
