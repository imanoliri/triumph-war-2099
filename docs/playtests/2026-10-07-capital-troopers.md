# Capital specialist browser inspection — TRI-075

- Build: feature/capital-trooper-roster implementation commit 4aebda14e9824b1e576696f626e0875877ec5199; browser observed its working tree before commit, final geometry and indicator layering changes loaded.
- Date: 2026-10-07 (Europe/Berlin).
- Browser: Codex In-app Browser; engine/version not exposed. Screenshot viewport1265x712.
- Difficulty: Normal. MIDI bank absent; oscillator fallback available, audible playback not verified.
- Tester: implementation worker via computer-use browser UI; local server127.0.0.1:2105. Explicit visibility is unsupported in a subagent; default browser tab worked.

| Scenario | Result | Evidence |
| --- | --- | --- |
| Capital ground/air menus | pass | Opened District Twelve reinforcement dialog; all ten slots offer Infantry/Shield Trooper/Laser Cannon/Commando; no Winter Gunner. Selected Shield ground slot1 and Laser air slot1. [Screenshot](2026-10-07-capital-menu.png). |
| Units descriptions and distinct portraits | pass | Actual dialog renders recovered troop head/hotspot with cyan steel shield versus violet/magenta cannon. Shield defense line3HP/120degrees and Laser3damage/4s/0.15s text read. Context correctly shows8 starting infantry (6ordinary+2specialists),4nests,46arrivals. [Screenshot](2026-10-07-capital-portraits.png). |
| Initial runtime specialist appearance | pass | Restart/deploy shows initial cyan shield with three strength segments and distinct magenta cannon in original replacement coordinates. [Screenshot](2026-10-07-capital-start.png). |
| Ordinary live rendering / pause | pass, limited | Resumed through UI, then paused at about69s (remaining wait51s); battlefield changed, multiple bugs/ordinary friendly actors, shield still visible with three segments. [Screenshot](2026-10-07-capital-live.png). This is observation of a running scene, not completion/calibration. |
| Laser pulse, shield break/recharge timing | not run | No controlled live encounter directly observed. Production VM tests cover timing/geometry/absorption; not equivalent to visual timing acceptance. |
| Specialist mouse movement/focus/use and actual support landing | not run live | Automated production paths pass; manual/browser control sequence and live delivery remain gaps. |
| All profiles / human mission completion / audio / German hardware keys | not run live | Five-profile count/pressure fixtures and unchanged-input suite are separate simulation evidence. |

## Acceptance

UI/portraits/initial indicators verified in actual browser; behavioral simulation evidence is separate. Awaiting director review with the listed live gaps, especially pulse/break/recharge observation and human difficulty calibration. No publication or original-game comparison performed.
