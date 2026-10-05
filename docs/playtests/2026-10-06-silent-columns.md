# TRI-052 live browser formation and landing

- Date: 2026-10-06; isolated worker checkout, loopback port2114, IAB tab1 (director tab2108 untouched).
- Browser: Codex in-app browser; exact engine/version unavailable through read-only DOM scope (navigator is not exposed). Screenshot viewport is1265×711 pixels; viewport left at default. Candidate branch feature/silent-return-air-columns, based on f0023e4b46a54e6fbf358a2c93d0c2dd6d4a98ed; final Review commit in session005.
- Difficulty: Normal. Native DOM/UI actions only: select Silent Return, Start mission, exit tactical; Restart then Start and resume for repeated observation. No state injection, teleport, clearing enemies or clock manipulation.
- Actual updated briefing visibly lists (472,328)/(520,392)/(568,520) and about one soldier gap.
- [Flight screenshot](2026-10-06-silent-columns-flight.jpg): three rendered southbound aircraft occupy distinct adjacent horizontal columns, with retained vertical stagger. Normal combat continues; unfinished support is visible in objective text. Aircraft sprite wings can visually overlap, while column centers remain distinct.
- [Landing follow-up](2026-10-06-silent-columns-landed.jpg): standard support animation finishes, aircraft leave and additional blue commandos move on the ground under ordinary AI/combat. Objective text shows ten humans outside extraction (another remains inside) and no support-inbound suffix: consistent with eight starting humans plus three arrivals.
- Restart returned the updated briefing and reset roster/support; second deployment repeated actual support.

## Separate simulation evidence and limits

Exact unchanged landing y and x, route clearance/connectivity,20s schedule, north stagger, one troop per plane, caps/reservations, freeze/single-shot/restart/extraction/unlock are asserted by check-custom-pressure across all five difficulties; live screenshots do not establish exact landing coordinates because actors move after landing. check-custom-support/check-support/check-silent-return separately pass real VM support and objective lifecycle. No claim of completed mission, all-five live difficulty playthrough, hardware gamepad or audible audio verification.
