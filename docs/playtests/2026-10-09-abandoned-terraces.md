# Ruin Terraces browser spot checks — TRI-092

- Date: 2026-10-09, Europe/Berlin.
- Build: feature/abandoned-world-mission candidate based on32a1847; final scoped SHA in session003.
- Browser: Codex In-app Browser, Chromium engine; exact version unavailable through exposed UI. Background IAB tab at http://127.0.0.1:2099/. Full-page PNG1265px wide; canvas responds to viewport.
- Profiles: all five briefing screens inspected; Normal deployed/live spot check.
- MIDI bank/audio: not listened to; no audio verification.
- Tester: TRI-092 worker via computer-use browser API and UI controls; no injected gameplay writes.

| Scenario | Result | Evidence |
| --- | --- | --- |
| Selector and readable all-five briefs | pass | Saved normal/veryeasy/easy/hard/veryhard briefing PNGs; counts6/6/6/5/4, births2/3/4/5/6, intervals8/7/6/5/4. Entire shortened brief fits eight-line renderer. |
| Terrain/actor rendering | pass spot check | Normal deployment, western terraces, upper relay and eastern loop in normal-objectives.png; original robot sprite and specialist marks visible. |
| Tactical deployment/pause | pass spot check | Start entered tactical mode; menu save resumed live movement/combat; pause restored overlay. |
| World-filtered menu/save | pass UI | Ground/air slots offer only Infantry, Incendiary, Recovery, Commando; selected ground slots1/2 and saved. No live delivery claim. |
| Short live updates/combat | pass spot check | Troops moved, visible shot/effect and bugs changed positions; normal-live.png records this state. No full fight/win or flame/repair timing claim. |
| Visible objective status | pass after correction | Initial label overlapped tactical corner strokes. Compact counts plus raised/inset TRI092-only anchor in normal-objectives.png: Relays0/2, nests4, births16, bugs6. |
| Restart/difficulty restart | pass UI | Restart restored briefing/deployment; Controls difficulty selection rebuilt every profile with correct displayed budgets. |
| Full combat victory/defeat all five | not run live | Controlled production VM completion/defeat fixtures are separate. No human difficulty or full live playthrough certification. |
| Eagle delivery/cap, flame range, Recovery timing | not run live | Production fixtures cover physical collection/delivery and existing mechanics. |
| Audio, hardware/gamepad, original comparison | not run | No original-game research. |

Screenshots are in [abandoned-terraces](abandoned-terraces/normal-objectives.png). Full human playthrough and audio remain follow-up verification; Review contains no claim that these passed.
