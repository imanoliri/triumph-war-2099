# Gamepad controls browser smoke

- Build: feature/gamepad-controls working tree, based on 3b799a171cfa57c4f293876643ce842d42b717b3
- Date: 2026-10-05
- Browser: connected Chrome; exact version unavailable; screenshot viewport 863×1271
- Difficulty: Normal, Desert Canyon
- MIDI bank/audio: not verified
- Tester: TRI-007 worker via computer-use skill, local http://127.0.0.1:2137

| Scenario | Result | Evidence |
| --- | --- | --- |
| No-controller status/default ownership | pass | Visible Gamepad: disconnected and troop-control hint before explicit selection; no commander pressed |
| Gamepad mapping help | pass | Controls visibly lists bumpers, sticks, RT/LT, A, D-pad, Start and neutral rearm |
| Modal/tactical restoration | pass | Start deploys tactical; closing Controls preserves Exit tactical mode |
| Mouse selection | pass | Commander 1 click sets pressed state and direct-control hint |
| Keyboard tactical toggle | pass | Space switches to Tactical mode, then back to Exit tactical mode |
| Battlefield render | pass | Screenshot visibly shows map, sprites, tactical visor, commander panel and disconnected status |
| Keyboard movement/mouse combat | not run | W tap sent, but movement delta/combat not independently measured; VM evidence only |
| Physical gamepad/model compatibility | not run | No controller attached; API fixtures are separate evidence |
| Audio/all missions/balance | not run | Outside this smoke |

No observed smoke failure. Awaiting director review; physical-controller support remains unverified.
