# Original-mission difficulty profiles (TRI-046)

The 2026-10-05 autonomous mandate adopts TRI-020's numeric/layout candidates as initial custom tuning, excluding optional resource relief. Normal remains the accepted TRI-021 reference. This is an implemented profile matrix with VM evidence, not calibrated human difficulty or native timing parity. Source assets/rules are unchanged; runtime constants live in `src/balance.js` under immutable `originalProfiles`. Custom missions retain their pre-TRI-046 stats, layouts, intervals and overrides.

| Setting | Bug HP | Queen HP | Nest HP | Motion / Normal | Roll successes / 100 per 0.5 s | Final crystal HP |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Very easy | 2 | 20 | 35 | 0.90 | 2 | 12 |
| Easy | 3 | 35 | 40 | 0.95 | 3 | 10 |
| Normal | 4 | 50 | 50 | 1.00 | 4 | 7 |
| Hard | 5 | 55 | 50 | 1.00 | 5 | 7 |
| Very hard | 6 | 60 | 55 | 1.05 | 6 | 7 |

All original settings use the same first opportunity at0.5s, finite2.4s busy phase and single frame9 birth at1.8s. The source Normal <=3 rule is four bins; other probabilities are custom. Cap50, frame emission consumption, destruction cancellation and tactical freeze retain the accepted baseline. Enemy motion multipliers do not change friendly movement. Red bug10%/5HP, spit bases5.5/4.8/3.8/3.2/2.7 plus0–1.6s, growplants, support eligibility/caps, friendly stats, aiming and controls remain unchanged. Resource opportunities stay1s on every setting.

| Mission | VE | E | N | H | VH |
| --- | ---: | ---: | ---: | ---: | ---: |
| Canyon | 2 | 2 | 3 | 4 | 4 |
| Rocks | 2 | 3 | 4 | 5 | 6 |
| Flash back | 6 | 8 | 11 | 12 | 14 |
| Retake | 3 | 4 | 5 | 7 | 10 |
| Hold | 0 | 0 | 0 | 0 | 0 |
| Hanger | 12 | 18 | 24 | 30 | 36 |
| Inside | 12 | 16 | 20 | 20 | 20 |
| Caves | 12 | 17 | 22 | 27 | 30 |
| Final | 0 | 0 | 0 | 0 | 0 |

Every retained nest uses the exact source instance handle and hotspot coordinates in the [TRI-020 manifest](../../research/difficulty-proposal.json); no geometry changes. Normal equals the previous source-culling subset. Other actor/flower/prop culls retain recovered rules. Nested selections add fronts; easier nest-only1-damage work is no greater than Normal. Very hard work totals220/330/770/550/0/1980/1100/1650/0. These totals estimate nominal durability work, not combat cleanup duration.

Hold starts25s and uses ordinary targets120/160/200/200/200, intervals0.5/0.333333/0.25/0.2/0.166667s. Final starts30s, ordinary targets100/125/150/150/150 at the same intervals, then queen targets25/35/50/50/50 at1/0.75/0.5/0.45/0.4s. Both final terminals and ordinary target remain prerequisites to extraction; queen thresholds20/28/40/40/40. Full targets plus all living/transition enemies cleared and recovered crystal are still needed for victory. Source cap retries and minimum-time gates remain; opportunity timers are not guaranteed emission rates. No new finite spawn budget is invented for quota waves.

## Evidence and limits

`node tools/check-difficulty-profiles.cjs --record` saves [VM evidence](difficulty-profile-evidence.json): all45 exact layouts, progressively reachable terminal/door interactions, at least one reachable actual projectile LOS firing venue per retained nest, quotas/extraction/clearance, per-setting roll boundaries and cap-clear seeded1800s breeding comparisons. Independent snapshots compare all-nine Normal and all-five custom initialization against pre-ticket commit6b41ca15, excluding only added diagnostic fields and explicit wave-profile aliases. Geometry probes place disposable interaction actors at reachable points; they do not prove a human playthrough. Terminal interaction uses the actual35px radius; final boundary terminal must not be incorrectly judged using a smaller radius or projectile LOS. Wave gate probes clear vents explicitly because live/transition ceiling bugs correctly block victory.

Live browser access from the worker was unavailable: IAB rejects subagent visibility and Chrome is unavailable. Therefore UI deployment, rendering/audio, full Normal clears, alternative human attack approaches, casualty/recovery comparison and cleanup80th-percentile gates remain not run. Hanger/Retake extra cleanup is a candidate risk, not measured stall; no layout correction is justified by the passing static firing-route checks alone. Retain these profiles as initial tuning for subsequent human calibration. See [playtest limitation record](../playtests/2026-10-05-difficulty-profile-tuning.md).
