# TRI-035 isolated worm browser acceptance

- Build: feature/desert-charging-worm working tree based on 8b5737696813cb2f44fbba45e5d0973a2df90432; delivered by scoped TRI-035 commit.
- Date: 2026-10-05, Europe/Berlin.
- Browser: Codex In-app Browser, hidden worker tab; engine/version not exposed by inventory. Screenshot viewport 1280×720; canvas 900×400.
- Difficulty: fixed initial custom defaults, no campaign. MIDI bank/audio: not loaded.
- Tester: implementation worker via documented browser controls.

| Scenario | Result | Evidence |
| --- | --- | --- |
| Phase art gallery | pass | Live screenshot showed ripples, gold exposed warning body and dashed lane, charge body/lane and exposed recovery body. |
| Lock and diagonal dodge | pass | Click Start at warning then Dodge diagonally. Warning AX: worm (110,280), HP8. Recovery AX and screenshot: worm (370,280), troop shifted from (260,280) to (290,335), HP8. |
| Stationary contact | pass | Click Start at warning without dodge. Recovery AX and screenshot: worm (370,280), troop HP6 from HP8; one charge. |
| Live underground→warning | pass | Start cycle AX showed burrow at (120,280); live exposed warning later seen in explicit warning-start case. Full transition timing separately established by VM. |
| Full mission controls, audio, difficulty feel, all nine campaign regressions | not run | This is a dormant unit fixture. Runtime original/custom isolation and combat are VM evidence only. |
| Wall detour, dynamically blocked charge, full lifecycle repetition | simulation only | Focused module fixtures verify full footprint, thin wall/substep stop, recovery/burrow and stationary diagonal acquisition around rock. |

## Reproduce

Run `node tools/worm-preview.cjs`, open http://127.0.0.1:2135/. Gallery uses authored module drawing. Start at warning runs one charge and freezes at recovery, allowing HP comparison; Dodge diagonally moves the ground marker off the committed lane. Start cycle exercises underground approach first. Ctrl+C stops the read-only server.

The first exploratory sandbox repeated cycles; later HP loss was from later reacquisition, not the dodged first charge. The fixture was bounded to one charge, rerun, and produced HP8 dodged / HP6 stationary results above. Screenshots were inspected in the browser tool; no screenshot binary is persisted in this report. No mission playability, audio fidelity or calibrated balance claim. Awaiting director review.
