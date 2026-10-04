# Silent Return browser smoke

- Build: TRI-026 worker branch `feature/custom-silent-return`, final implementation based on `18224e7`; resolve scoped Review commit with `git log -1`.
- Date: 2026-10-04
- Browser: Codex in-app browser (version unavailable), screenshot viewport approximately 1264×712.
- Difficulty: Normal.
- MIDI bank: ignored bank absent; fallback. Audible playback not verified.
- Tester: TRI-026 worker using computer-use skill / IAB.
- Preview: http://127.0.0.1:2104/

| Scenario from PLAYTEST | Result | Evidence |
| --- | --- | --- |
| Custom selection/briefing | pass | Silent Return appeared separately in Custom scenarios; readable briefing specified access/laser and marked extraction with support arrivals. |
| Maps/UI/manual | pass (smoke only) | Start deployed four commanders/four commandos on recovered Flash Back terrain; cyan extraction circle and RETURN ALL SURVIVORS label visible at northern start. Tactical button showed Exit tactical mode. |
| Commander/mouse/keyboard; troop orders/focus/use | not run | Route exercised in disposable VM only. |
| Pause/queued orders; doors/terminals; support/respawn | not run | Gameplay semantics exercised in VM; no live completion claim. |
| Rally/bursts/barrels/all-nine victories/audio | not run | Outside scoped browser smoke; audio unavailable to tester. |

No observed smoke failures. Full Normal completion, elapsed time/casualties, support return by manual control and audible playback remain awaiting live verification. Simulation evidence is recorded separately in session 049.
