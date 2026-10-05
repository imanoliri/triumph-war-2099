# TRI-043 input extraction browser smoke

- Build: chore/extract-orders-input working tree after final hint correction; source base a6fed3313515a02bc2ab49e7ab6b380fd3bbe870. Review commit is branch HEAD.
- Date: 2026-10-05
- Browser/version and window size: director ordinary Codex IAB at http://127.0.0.1:2143; version and viewport size not reported.
- Difficulty: Normal default.
- MIDI bank: not inspected; no audio claim.
- Tester: director root agent, independently using ordinary DOM/browser actions on the worker preview. Worker explicit-visibility IAB creation was unavailable in subagent context.

| Scenario from PLAYTEST | Result | Mission and evidence |
| --- | --- | --- |
| Commander/mouse/keyboard | partial pass | Desert Canyon: selectors1→2→3→4 show exclusive checked state and correct hints; deselect4 restores troop hint and all4 unchecked. Physical R/Escape/F2 observed. Mouse aim/fire and held movement not live-tested. |
| Troop orders/focus/use | not run | Covered separately by VM comparisons, not claimed as live. |
| Pause and queued orders | partial pass | Start enters tactical. Controls close restores existing tactical mode. Queued troop execution not live-tested. |
| Doors/terminals | not run | No live traversal or activation smoke. |
| Support/respawn | not run | No live claim. |
| Rally flags and excluded commandos | partial pass | Physical R enters placement; Escape exits placement while tactical remains. Flag placement/deletion and arrivals not live-tested. |
| Bursts/sweeps/AI/terrain | not run | No live combat claim. |
| Barrels | not run | No live claim. |
| All nine victory requirements | not run | No full-playthrough claim. |
| Maps/UI/audio/manual | partial pass | Correct exact drag copy in troop and commander hints after final reload. No audio or whole-map fidelity claim. |
| Restart ownership | pass | Select3 then physicalF2 resets all4 selectors to unchecked troop mode; Start redeploys into tactical. |

## Findings and acceptance

Initial director smoke found two inputState.drag copy leaks from identifier conversion. Worker restored exact original drag wording and added rendered hint text to immutable before/after traces. Director reloaded and verified the final correction before accepting this bounded smoke. No hidden state injection or original-game research. This records input UI smoke only; broader live gameplay/audio remains unverified.
