# Last Convoy browser smoke playtest

- Build: feature/custom-last-convoy working tree based on c7fe702; final source commit recorded in session 041.
- Date: 2026-10-04; tester: TRI-025 worker.
- Browser: hidden Codex IAB, backend version not supplied. Default viewport; full battlefield extends vertically and can be scrolled.
- Difficulty: Normal. MIDI bank: fallback (ignored local bank absent); audible playback not checked.

| Scenario | Result | Evidence |
| --- | --- | --- |
| Custom selector and briefing | pass | Last Convoy appears in Custom scenarios, separate from nine originals and Relay Breaker. Readable briefing describes 120s, 26 scheduled bugs and survival rule. |
| Reused terrain / actors | pass | Hold Base rendered with four commander markers, soldiers, robot, yellow/bronze support and plasma pickup; no regenerated artwork. |
| Tactical deployment / resume | pass | Start entered visible visor and Exit tactical mode; resume displayed playing field and Remaining: 26 arrivals · wait 120s · 4 bugs. |
| Live arrivals / combat | pass (smoke) | After natural play, pause showed Remaining: 12 arrivals · wait 65s with bugs approaching from the east, troops moving and support tank visible. This observes first two waves; exact totals are VM evidence. |
| Units guide | pass | Last Convoy context with Normal 4-HP bugs; 7-HP robot and 16-heading cannon descriptions visible. Defense objective sentence added afterward and covered by source inspection, not repeated live check. |
| Full 120s survival / cleanup / defeat | not run | VM verifies objective transitions; no full manual playthrough claim. |
| Commander controls, cannon headings, support cap, all nine originals, sound | not run | Existing full VM regressions pass; manual/browser scenarios outside this bounded smoke pass. |

Acceptance: browser smoke passed; full manual defense completion/balance and audible playback remain unverified. No original game comparison performed.
