# TRI-071 Units guide browser verification

- Build: fix/custom-unit-guide-sprites, working implementation based on b06b998185c384fe54ee4a58f587b5418d468785 (final implementation SHA in session handoff).
- Date: 2026-10-07, Europe/Berlin.
- Browser: Codex in-app browser; exact engine version unavailable from provided browser tools. Screenshot viewport 1265 × 711.
- Difficulty: Normal.
- MIDI bank: absent; oscillator fallback. Audio was not tested.
- Tester: TRI-071 implementation worker; actual local browser at http://127.0.0.1:2171/.

| Scenario | Result | Evidence |
| --- | --- | --- |
| Units cards/rendering | pass | Opened Units in Desert Canyon; scrolled through original Tank/robot/bug entries and all four custom soldier portraits. Scout tan/yellow, guard brown/orange, mechanic green and sniper white/cyan appear distinctly, fit headings and preserve their existing runtime art. |
| Reopen/switch to Snow | pass | Closed guide, selected Whiteout Signal, reopened; context changed to Whiteout Signal and all four canvas portrait entries remain. |
| Combat, movement, all victory conditions, audio | not run | Outside this guide-only change. |

Actual rendered screenshots: [Scout](2026-10-07-custom-unit-guide-scout.png), [Guard, mechanic and sniper](2026-10-07-custom-unit-guide-specialists.png).

No rendering failure observed. VM regression separately checks exact recovered sprite/hotspot and variant drawing command parity; it is not a browser pixel assertion. Browser read-only DOM tooling does not expose canvas getContext, so direct alpha pixel counts were unavailable; nonblank portraits were visually verified in screenshots. Review acceptance remains with director.
