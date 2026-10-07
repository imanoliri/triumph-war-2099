# TRI-070 browser calibration attempt

- Build: `fix/ai-combat-balance`, starting commit `f5b627f5c569c122b226ae5e4504b92bb607715b`; final worker commit recorded in session 008.
- Date: 2026-10-07 (Europe/Berlin).
- Tester: `/root/ai_balance_worker`.
- Browser/window/difficulty: unavailable; no live game loaded.
- MIDI bank: not tested; isolated checkout uses shipped fallback unless a local bank is separately supplied.

| Scenario | Result | Evidence |
| --- | --- | --- |
| Live enemy alert pressure and pursuit breaks | not run | CUA inventory returned no browsers/apps; `createBrowserTab('iab', ...)` returned `Browser is not available: iab`. |
| Friendly weapon engagement / guard / attack-move | not run | Same browser limitation. Comparative seeded VM fixtures are recorded separately in session 008. |
| Missions / victories / difficulty win rates | not run | No live playability or calibration claim. |
| Rendering/audio / Controls and Units appearance | not run | Text checked in source and repository tests only. |

## Acceptance

Awaiting live calibration. Director may review the bounded AI correction with this explicit limitation. When browser access is available, follow PLAYTEST scenario 2/3/7, compare Normal Desert Canyon and a custom assault, test flame/plasma attack-move and 50 px Defend leash, then record actual difficulty/time/survivors. Do not infer victories or win-rate improvement from the controlled VM comparisons.
