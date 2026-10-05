# 2026-10-05 — Beneath the Dunes browser smoke

- Ticket TRI-036; worker branch feature/beneath-the-dunes, loopback preview2106.
- Browser: Codex in-app browser through cua_repl, hidden subagent tab (visible mode rejected as unsupported). Exact browser version unavailable. Normal difficulty; no local MIDI bank in checkout. Computer Use skill read for browser workflow; native Windows app automation was not used.
- This is partial live browser evidence, separate from VM fixtures and scripted mission probes.

| Scenario | Result | Observed evidence / limits |
| --- | --- | --- |
| Custom selector / briefing | passed | Beneath the Dunes appeared in Custom scenarios. Canvas showed full-repair6HP,110px escort, one-save/both-loss and mechanic-loss text without overflow. |
| Tactical deployment | passed | Start revealed the battlefield, blue-green visor, two crawler bodies, Field mechanics, guards/scouts, distinct A mesas and eastern extraction ring. C1/C2 REPAIR2.0/6 appeared at bottom. |
| Live repair and route start | passed, limited | Ordinary UI resumed simulation with no injected actor state. Later pause snapshot showed both crawlers moved onto the north/south arcs and status C1 NEEDS ESCORT2/4 / C2 NEEDS ESCORT2/4. This proves actual launch from disabled state and visible stalled-escort feedback, not a complete rescue. |
| Worm warning / evade / mines | not verified live | Worms/bugs moved and combat casualties were visible, but no clearly observed locked warning/counter snapshot. Their lifecycle and finite mines have automated regressions; that is not live proof. |
| Complete rescue / both destroyed loss | not run live | Verified only by actual-runtime and focused VM fixtures. |
| Final-build smoke | passed, limited | Hidden-tab reload produced stale canvas frames despite DOM controls changing; those images are excluded. A fresh temporary tab then produced current tactical rendering and, after ordinary resume/pause, both repaired crawlers again traveled onto their arcs with NEEDS ESCORT2/4 feedback and finite bug pressure visible. Exact real elapsed duration/wave timestamp was not measured. |
| Audio / all-five human difficulty / long play | not run | No audible test, manual full mission or human challenge calibration. |

No browser canvas state was injected. Temporary hidden tabs are closed after smoke. The worker loopback server remains available for director review at http://127.0.0.1:2106 while the worker command session is alive. Review should prioritize a visible final-build warning/counter and successful commanded rescue. Baseline art is deliberately plain; decorative polish belongs to its own art ticket.
