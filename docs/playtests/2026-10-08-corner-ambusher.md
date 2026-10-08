# Corner Ambusher browser inspection

- Build: TRI-077 feature branch working candidate based on f18580c; final worker commit in session003.
- Date:2026-10-08; tester: implementation worker through browser UI.
- Browser: Codex in-app browser (version not exposed by browser inventory); screenshot viewport1265x712.
- Loopback: assigned worktree server on127.0.0.1:2117.
- Difficulty: Normal.
- MIDI bank: ignored local gm-bank.js absent; fallback. Audio was not evaluated.

| Scenario | Result | Actual evidence |
| --- | --- | --- |
| Undercity deployment | pass | Selected Undercity Tunnels Breach and Start mission; tactical controls and Reinforcements enabled. |
| Units text / sprite portrait | pass | Normal context shows7 starting infantry,4 nests,47 finite arrivals and3.6s nest interval. Ambusher card displays1HP/1damage/three rounds,1s/0.1s/2s,120px and Guard/fixed-kit text. Slate/copper sprite preview rendered alongside navy Suppressor and teal Grenadier: [screenshot](2026-10-08-ambusher-units.png). This is UI evidence, not live timing. |
| Matching world ground/air menus | pass | All ten Undercity selectors contain Infantry, Corner Ambusher, Commando; [screenshot](2026-10-08-ambusher-menu.png). |
| Save/reopen | pass | Set first ground and first air slot to Ambusher, Save and return, reopen: both choices retained. |
| Nonmatching world menu | pass | Selected Harbor Watch, Start mission, Reinforcements: Infantry/Suppressor/Grenadier/Commando only, no Ambusher. |
| Final Controls copy | pass | Reloaded final build after copy changes, opened Controls and inspected1s/three0.1s rounds/120px/2s, stationary Defend, fixed kit/order text and Undercity cap inclusion. |
| Controlled burst/setup/movement/Guard/terrain/freeze | not run | Exact rules proven only in disposable production VM fixtures. No controlled live combat conclusion. |
| Actual eagle carrier/air landing/cap retry | not run | Factories/caps proven only by VM; no live delivery claim. |
| Physical German keys/audio/all-profile human balance/victory | not run | Requires subsequent controlled playtest. |

No observed UI failure. Awaiting director review; limitations above remain explicit.
