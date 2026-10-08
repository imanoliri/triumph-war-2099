# Airless Moon specialist UI spot inspection — TRI-083

- Build: feature/airless-moon-trooper-roster working changes based on28079f2e4256c7b63e7e938ccc91eb24a48b52f9; scoped implementation commit titled Add Airless Moon Heavy Trooper and linked ground drone roster.
- Date:2026-10-08 Europe/Berlin.
- Browser: Codex In-app Browser; exact engine version not exposed by UI, not asserted. Captured viewport1267×712.
- Difficulty: Normal; opened Desert Canyon briefing.
- MIDI bank: local gm-bank.js absent; oscillator fallback available, audio not listened to.
- Tester: TRI-083 implementation worker using browser UI. Worker-only loopback2183; no production/source-game access.

| Scenario | Result | Evidence |
| --- | --- | --- |
| New Units cards and portraits | pass, UI inspection only | Opened Units, scrolled through Heavy/Operator/drone. Distinct recovered52-based marks; Heavy3HP/.75s/220px/65% and Operator1HP/one-package capacity/180px leash/permanent loss explanation. [Heavy/Operator screenshot](2026-10-08-airless-moon-units.jpg), [drone screenshot](2026-10-08-airless-moon-drone.jpg). |
| Controls description | pass, UI inspection only | Opened Controls and inspected first paragraph. Explicit package-cap reservation, ground drone/nonselection, blocked companion constraining Operator, permanent loss/death cleanup and no shipped moon mission. [Controls screenshot](2026-10-08-airless-moon-controls.jpg). |
| Live moon combat/weapon timing/HP/movement/terrain/orders/delivery/cap | not run | No shipped Airless Moon mission; disposable VM production fixtures verify simulation separately. TRI-090 mission is outside this ticket. |
| Audio, human completion and original/manual regression pass | not run | UI spot check alone; no claims about gameplay difficulty/playability or sound. |

No UI failure observed in scoped spot inspection. Live specialist scenario verification remains pending a future opted-in mission. Automated simulation results are recorded in session010 and cannot substitute for these not-run browser scenarios. Temporary browser tab closed after inspection.
