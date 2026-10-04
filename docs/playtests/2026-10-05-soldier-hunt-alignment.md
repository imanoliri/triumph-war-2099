# TRI-027 live smoke — 2026-10-05

- Checkout: triumph-soldier-hunt-alignment; feature/soldier-hunt-alignment, based on 929408547d42dbdbe038b7b6a2115d90bda7b3f4 with this ticket's pending changes.
- Browser: Codex In-app Browser (IAB); exact engine/version not exposed by control surface.
- Preview: loopback http://127.0.0.1:8274, this isolated checkout.
- Mission/difficulty: Desert Canyon / default Normal. Ignored MIDI sample bank not generated in this checkout; audible playback not verified.

| Scenario | Result | Evidence |
| --- | --- | --- |
| Initial mission render/start | Passed smoke | Canvas rendered recovered terrain and infantry; Start entered tactical mode. |
| Resume combat | Passed smoke | Tactical toggle resumed; later screenshot showed moved infantry and bugs, active battlefield and updated Remaining count. |
| Controlled stationary/moving hunt and projectile intersection | Not run live | Precise isolated setup was not established using available UI. Evidence comes from disposable VM fixtures only. |
| Mounted/dismounted exceptions and all other PLAYTEST scenarios | Not run live | Covered relevant simulation regressions; no live claims. |
| Audio | Not run | No audible verification. |

This smoke does not establish broad live playability or isolate the reported aiming correction. Director may perform the focused hunt observation before accepting its live verification gap.
