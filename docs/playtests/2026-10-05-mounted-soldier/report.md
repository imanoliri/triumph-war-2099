# TRI-030 mounted soldier render playtest

- Build: baseline `7fd9fb228813fcab94022717ff4140b7a56fef23`, then this branch's rendering fix, loaded by browser refresh.
- Date: 2026-10-05 (Europe/Berlin).
- Browser: Codex in-app browser; version not exposed by the control surface. Screenshot viewport 1265 × 712, page scrolled to show battlefield.
- Difficulty: Normal. MIDI bank: fallback (no local bank generated); audio not assessed.
- Tester: implementation worker through computer-use; isolated loopback preview on port 2130.

| Scenario | Result | Evidence |
| --- | --- | --- |
| Mounted standing duplicate | pass | Hold Base before refresh showed seated and standing sprites together on occupied cannons; after refresh only the seated operator remains. See [before](before.png) and [after](after.png); lower-center selected cannon is around screenshot (690, 437). |
| Mount/use and selection feedback | pass | Select soldier near (622, 423), double-right-click cannon near (690, 437), Space resumes. Pause later: cannon is occupied and green selection feedback stays visible. |
| Ground-order dismount restoration | pass | While paused, double-right-click empty ground near (740, 475). The selected standing sprite immediately returns at the cannon and the cannon shows its empty frame. See [dismounted](dismounted.png). |
| All sixteen headings, continuous sweep, commando operator, death/reset | not run live | Covered by VM regressions, not exhaustively observed in browser. |
| Other PLAYTEST scenarios, audio and full mission completion | not run | Outside this bounded visual check. |

## Reproduction and limitations

Use mission 5 Hold Base and start in tactical mode; the room contains a cannon at map (569, 509). Select nearby ordinary infantry and double-right-click the cannon, then Space. Other autonomous soldiers also mount available cannons. Pause after arrival. The initial attempt used Retake Base, which has no stationary cannons; it did not reproduce this ticket and is not claimed as evidence. Hold Base before and after runs have different elapsed simulation times and troop positions; the duplicate/removal is judged at occupied cannon centers, not by pixel-diffing the entire battlefield.

The browser does not expose runtime state through its read-only DOM evaluator. No debug state mutations were used. Mount/dismount was driven with normal canvas inputs. Acceptance for this scoped visual behavior is supported; broader release playtesting remains outstanding.
