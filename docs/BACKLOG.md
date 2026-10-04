# Backlog

Local IDs remain stable until linked to GitHub Issues. This file is the authoritative queue until remote issue tracking is established. Item states are shown below; completed gameplay history is in DEVELOPMENT-NOTES.

| ID | Priority | Task | Acceptance |
| --- | --- | --- | --- |
| TRI-001 | High | Reproduce live mission completion report | Record mission/difficulty/save or steps; confirm Remaining counters; win each mission with its source objectives or fix a reproduced failure with regression coverage |
| TRI-002 | High | Browser acceptance pass | Complete PLAYTEST with screenshots, browser version and results; resolve UI/input failures before tagging a verified release |
| TRI-003 | Medium | Extract remaining game.js systems | Separate combat/bursts, orders/input, support lifecycle and rendering in individual behavior-preserving branches; regression suite remains green |
| TRI-004 | Medium | Audible MIDI comparison | Compare original/recreation tracks with local bank; document envelope/controller differences; verify any changes by listening |
| TRI-005 | Medium | Fidelity audit | Compare source grenade travel, hazards, telepads, waves and support timing; propose explicit parity tasks with evidence |
| TRI-006 | Medium | Publication and issue tracking | Resolve visibility/distribution scope; publish authorized files; enable CI and mirror this backlog into linked issues |
| TRI-007 | Low | Gamepad controls | Agree mappings and supported controllers; preserve keyboard/mouse; verify unplug/reconnect and multi-player ownership |
| TRI-008 | Done | Complete asset recovery rehearsal | Passed isolated full extraction; all binary assets match and generated JSON/JS matches semantically (serialization/newline differences only) |

## Bug report requirements

Mission, difficulty, browser, build/commit, expected and actual result, exact steps, screenshot/video if useful, and Remaining HUD values. Distinguish source-game behavior from desired new behavior.

## Feature requirements

Desired player outcome, agreed UI/controls, affected units/missions, acceptance criteria and deliberate exclusions. Balance changes require updating DESIGN and Units descriptions.
