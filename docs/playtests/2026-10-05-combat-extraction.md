# Playtest report — TRI-042 combat extraction

- Build: `chore/extract-combat-bursts` candidate based on `6a39b420da2b30c9a2f0550b2c95c2e2d93ce2ea`; final Review commit is linked from session 032.
- Date: 2026-10-05 (Europe/Berlin).
- Browser: Codex In-app Browser; version unavailable from the browser binding. Screenshot viewport 1265 × 712, vertically scrolled battlefield view.
- Difficulty: Normal (default; checked in Units).
- MIDI bank: absent in this isolated checkout; fallback. Audible playback/timbre not verified.
- Tester: TRI-042 implementation worker through browser UI on `http://127.0.0.1:2142/`.

| Scenario from PLAYTEST | Result | Mission and evidence |
| --- | --- | --- |
| Commander/mouse/keyboard | not run | VM regression evidence is separate. |
| Troop orders/focus/use | not run | No focused manual order scenarios. |
| Pause and queued orders | partial pass | Start opened tactical mode; Exit tactical mode started real-time simulation; Tactical mode paused it. Queued orders not exercised. |
| Doors/terminals | not run | No complete Flash Back manual scenario. |
| Support/respawn | not run | No focused manual scenario. |
| Rally flags and excluded commandos | not run | No focused manual scenario. |
| Bursts/sweeps/AI/terrain | partial pass | Desert Canyon started and ran. Screenshots showed changed actor positions and visible projectile pixels. Reloaded after final module separation and repeated Start/unpause; a later screenshot again showed moving battlefield actors and projectiles. No console errors returned. Exact timed tank/plasma sweeps were not manually measured. |
| Barrels | not run | No manual barrel scenario. |
| All nine victory requirements | not run | Smoke only; no mission completion claim. |
| Maps/UI/audio/manual | partial pass | Units opened and displayed unchanged 3–6/5–7/9–12 burst counts, tank rest 3.5–4.5 s, locked tank and mounted plasma sweep rules. Switched final build to Beneath the Dunes, started/unpaused, and observed custom terrain, crawler repair labels, desert units and exposed/underground worm presentation. Audio not listened to. |

## Failures and reproduction

No runtime failure or error-console entry observed in these narrow smokes. Screenshots were inspected through the browser tool; no retained screenshot file was produced. Final Desert Canyon reload followed the src/projectiles.js separation; the custom mission switch followed that reload.

## Acceptance

Relevant runtime load/render/start/pause/mission-reset smoke passed. Timing, headings, collision/owner accounting and desert guards are backed by separately recorded VM checks, not inferred from this live smoke. The broader checklist remains unrun for this behavior-preserving extraction.
