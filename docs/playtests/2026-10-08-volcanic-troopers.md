# 2026-10-08 — Volcanic specialist spot check

- Checkout: `triumph-volcanic-trooper-roster`, TRI-081 session007, isolated loopback server port2181.
- Browser: Codex IAB, background tab (visible IAB unavailable to subagent; rendered screenshots and native browser pointer controls available).
- Method: actual mission selector / Start / Units / canvas selection / Place charge / ground click / tactical resume and pause. No fixture actors or hidden state mutation.
- Observed: Normal Forge tactical start reports Army8; rust/amber Demolition at first soldier slot and teal Cooling at second. Units shows distinct recovered-sprite portraits plus both mechanics and eight starting infantry. Select Demolition: button enables, tooltip Remaining3. Toggle Place charge: armed UI changes to Cancel placement. Ground click restores Place charge; tactical resume lets actor walk/plant. Later pause shows Remaining2. Runtime and selected actor continue rendering; no observed browser error.
- [Screenshot](2026-10-08-volcanic-troopers.jpg): paused scene after the queued order ran. It is visual spot-check evidence, not a timing measurement.
- Limits: did not measure live .75/1s timing, enemy trigger/blast, slow percentage or cooldown; those are disposable production fixtures. Did not complete a full human mission, assess balance, audit narrow-window layout, compare source-game art or verify audible audio.
