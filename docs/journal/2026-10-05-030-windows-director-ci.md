# 2026-10-05 / 030 — windows-director-ci

- Task: [windows-director-ci](../tasks/windows-director-ci.md)
- Date: 2026-10-05 (Europe/Berlin); session 030
- Branch: `fix/windows-director-ci`
- Starting commit: `a81fc62f4a8619bb06f61695268d61a3ad0c168e`
- Status: Review; local checks complete, hosted matrix pending

## Starting context

Prepared task/session edits were present; no implementation edits. Read AGENTS, WORKER, WORKFLOW and the task. Director owns authoritative board; worker does not modify it.

## Work performed

Board dispatch uses `fs.realpathSync.native` for the isolated-checkout and Git common-directory comparisons. Strict equality remains; unrelated repositories are still refused. Rejection includes both canonical common directories for future diagnosis. No global Git trust changes, dependencies, gameplay or assets changed.

The Windows disposable director fixture now enters its actual DOS 8.3 alias via `cmd /d /c for %I in (.) do @echo %~sI`. It reports the short/native paths, asserts that the old JS realpath retains the alias when distinct, and executes the existing full dispatch/lifecycle/guard checks. If 8.3 names are unavailable, it explicitly reports that limitation and runs the ordinary lifecycle. Ubuntu uses the same fixture lifecycle without Windows commands.

## Chronological log

- Fetched actual job111658132770 logs for run37277644513 through GitHub connector. Git2.55.0.windows.5/Node24.21.0; failure after preparation at successful dispatch, `Worker must share this Git repository`. Logs did not contain common-directory values.
- Basic local fixture and drive-letter variants passed. A real long-name/8.3 alias fixture reproduced the mismatch: relative `.git` resolved through the short alias, whereas worktree Git output expanded the long name. Native realpath expanded both identically.
- Diagnostic checkpoint `6c847c6` was committed before director requested a combined candidate. No worker publication. Final candidate includes native fix and regression; director will squash implementation history.
- Restored old JS realpath temporarily in the isolated checkout and ran `node tools/check-director.cjs`: failed at the same dispatch assertion. Common paths were `.../triumph-director-T0gG5c/director fixture/.git` versus `.../TRC635~1/DIRECT~1/.git`. Restored native implementation in `finally`.
- Native implementation passed real alias lifecycle, unrelated-repository refusal and director self-checkout refusal. Hosted original runner TEMP alias remains an inference until hosted evidence; local reproduction establishes the concrete portability defect.

## Verification

| Check | Result | Evidence |
| --- | --- | --- |
| Old implementation + alias regression | expected failure | Same successful-dispatch assertion; actual long/short common-dir mismatch printed |
| `node tools/check-director.cjs` | passed | Real Windows alias `TR1428~1/DIRECT~1`, native long path; all lifecycle/guards |
| `node tools/check-tooling.cjs` | passed | Disposable task/worktree, journal, serving and refusal checks |
| `node tools/dev.cjs test` | passed | Session12568 completed exit0; syntax50 scripts, all simulation/music/tooling/director checks; real alias TR408B~1/DIRECT~1 |
| `git diff --check` | passed | No whitespace errors |
| Hosted Windows/Ubuntu matrix | pending | Director owns candidate push and run review |
| Live browser playtest | not performed | Maintenance tooling only; rendering/audio/playability not claimed |

## Unresolved issues and risks

Acceptance remains unchecked until actual hosted Windows and Ubuntu CI pass. Original hosted common-dir spellings were not logged, so its 8.3 alias cause is an inference supported by matching local failure. Native canonicalization handles the demonstrated defect without lowercasing case-sensitive paths. Windows filesystems with no 8.3 support report the alias regression limitation.

## Next action / handoff

Director may push the candidate branch for the existing push workflow. Local full suite session12568 completed exit0. Candidate implementation commit: `4fee42f7b57bbbf4b7f18bde5fb8124c6533d04b`. Review native comparisons, real alias regression and preserved unrelated-repository guards. No merge/publication performed by worker; no squash SHA yet. Candidate commit is the commit containing this record; obtain with `git rev-parse HEAD`.

## Hosted candidate follow-up — history prerequisite

- Director pushed implementation candidate `4fee42f`; actual [run37301094619](https://github.com/imanoliri/triumph-war-2099/actions/runs/37301094619) failed Ubuntu job111733728702 before director checks. Connector log explicitly shows `fetch-depth: 1`, depth-one fetch, then `git show 6b41ca15b67c4cdabe2048de2f2c2819ed381dc1:game.js` failure in check-difficulty-profiles.cjs:30. Windows job111733728838 canceled by matrix failfast; it proves neither a Windows pass nor failure for this candidate.
- Director explicitly extended the same bounded CI maintenance ticket to its history prerequisite. Minimal workflow change sets `actions/checkout@v4` `fetch-depth: 0`. Full history preserves the independent immutable accepted-runtime comparison; no baseline or test was changed/skipped. SETUP documents the requirement for local shallow clones.
- Disposable local depth-one clone under `C:/Users/user/AppData/Local/Temp/triumph-shallow-c310fd921d9c47d585f3cbcb3c30b297` reproduced absent baseline `game.js`. After `git fetch --unshallow`, `git cat-file -e` succeeded for baseline game.js, src/balance.js and src/breeding.js (all exit0). Source shared repo was read-only; clone/fetch mutations were confined to disposable clone.
- Prior full local suite exit0 remains applicable to unchanged code. Rerunning affected difficulty baseline suite in unified session49334. Hosted acceptance remains pending next director push.
