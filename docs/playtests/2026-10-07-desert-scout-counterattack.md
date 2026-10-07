# TRI-073 Scout browser inspection

- Build: feature/desert-trooper-roster working tree based on 6399c6b33ea75abfa6731654b71b83e6fee7841d; same Scout UI as final worker commit.
- Date: 2026-10-07; tester: implementation worker.
- Browser: Codex In-app Browser (version not exposed), loopback http://127.0.0.1:2073; screenshot approximately1265x716.
- Difficulty: normal. MIDI bank: absent in this checkout; fallback, audio not assessed.

| Scenario | Result | Actual evidence |
| --- | --- | --- |
| Units description | pass | Opened Units in Desert Canyon, scrolled Scout card, closed it, switched to Beneath the Dunes convoy rescue and reopened. DOM showed ordinary0.6s, three post-dash rounds/0.06s, evade rest2.5s, retained eight-direction lane/clear sight and cancellation wording. |
| Scout portrait/card layout | pass | Two actual browser screenshots displayed existing Scout portrait and readable wrapped cadence/body text inside the scrollable three-column manual. No overlap observed; remaining text reached by scrolling. |
| Live counter timing, target cancellation and order resumption | not run | No live combat timing observation; disposable runtime fixtures separately cover these behaviors. |
| Live audio, mission playability/difficulty | not run | No observation or calibration claimed. |

Acceptance: UI inspection passed; combat and audio live acceptance remain awaiting observation. Screenshots were inspected through browser tool output; no screenshot file was exported. Reproduce with node serve.cjs, Units, and scroll to Rider scout. The automated suite is separate evidence.
