# Relay Breaker browser smoke — TRI-024

- Build: feature/custom-relay-breaker, working tree before Review commit (session 039)
- Date: 2026-10-04
- Browser: Codex In-app Browser; version unavailable; screenshot viewport about 1265×712
- Difficulty: Normal
- MIDI bank: ignored sample bank absent in worker; fallback expected, audible output not verified
- Tester: TRI-024 worker using computer-use / cua_repl

| Scenario | Result | Evidence |
| --- | --- | --- |
| Original/Custom selector and custom briefing | pass | Selected Relay Breaker assault; custom heading and exact brief rendered on Desert Rocks |
| Custom HUD and initial army sprites | pass | Corrected sprite IDs after smoke caught incorrect initial IDs; subsequent screenshot shows CUSTOM, army 8, four commanders and eight infantry |
| Tactical deployment and objective overlay | pass | Start mission showed visor and Remaining: 2 relays · 2 nests · 6 bugs; initial geometry visible |
| Both relay activation routes and full Normal victory | not run | No completed live combat run; cannot claim completion time, casualties, support usage, remaining births, LOS accessibility or balance |
| Live support delivery / audio / all nine originals | not run | Covered where possible by separate VM evidence, which is not live validation |

The first visible-tab attempt was rejected because subagent visibility is unsupported. Hidden IAB succeeded, so browser availability is partial rather than absent. Selector action immediately after reload raced page initialization; switching to original and then custom after initialization worked. No console errors observed. Live smoke identified and verified sprite/HUD fixes. Screenshots were inspected through tool output; no persistent screenshot artifact was available through this surface.

Awaiting full Normal playthrough per docs/design/custom-missions.md. Live completion/balance/audio remain unverified; no geometry softlock is established by this smoke.
