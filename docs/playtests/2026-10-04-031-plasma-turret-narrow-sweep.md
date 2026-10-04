# TRI-031 browser smoke

- Build: feature/plasma-turret-narrow-sweep working tree from 355a0b6 (code equivalent to Review commit).
- Date: 2026-10-04; tester: implementation worker.
- Browser: Codex hidden IAB; version unavailable; screenshot viewport 1265 × 712.
- Difficulty: normal; MIDI bank: unavailable/not listened to.
- URL: loopback port 2131, isolated ticket checkout.

| Scenario | Result | Evidence |
| --- | --- | --- |
| Last Convoy start/resume/render | pass | UI selected Last Convoy, Start entered tactical mode, Exit tactical resumed; screenshot showed map, troops and turrets. |
| Updated cannon field manual | pass | Native Units dialog showed sixteen visual headings, locked total 0–15° smooth arc, alternation and retained timings. |
| Browser runtime console | pass | No error-level logs after start/resume/dialog. |
| Mounted live trajectories, operator comparisons and audio | not run | No targeted live mounted combat observed; simulation checks are recorded separately. |
| Other full PLAYTEST scenarios | not run | Bounded ticket smoke only. |

Acceptance: limited startup/manual smoke; no audible, balance or live mounted trajectory claim.
