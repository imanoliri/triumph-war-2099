# Difficulty audit: findings for refinement

TRI-020 is research only. No gameplay or assets changed; the numeric proposals below still need user agreement.

The original varies bug/queen health, removes different nest subsets, and increases eligible growplant item rolls. Its recovered22–27 third value is **not movement speed**: all17 decoded references use it as a growplant roll ceiling. Current movement/nest-speed scaling and AI firing delays are custom. Original Easy retains more nests than Normal in several maps; current labels therefore do not guarantee an ordered challenge.

Current Normal keeps source health4/50 and nest durability50, but nests currently breed roughly every7 s in a controlled no-combat probe. Source events instead roll4% opportunities every0.5 s, followed by birth animation/cap gates. Restoring that model may lower pressure; source realized births have not been measured. The source style and disclosed animation conversion should be agreed separately from custom balancing.

Recommended candidate health/durability:

| Setting | Bug / queen HP | Nest HP | Birth opportunity bins out of100 every0.5 s |
| --- | --- | --- | --- |
| Very easy | 2 /20 | 35 | 2 |
| Easy | 3 /35 | 40 | 3 |
| Normal | 4 /50 | 50 | 4 |
| Hard | 5 /55 | 50 | 5 |
| Very hard | 6 /60 | 55 | 6 |

Harder queen55/60 deliberately departs from source65/80, limiting repetitive cleanup. Pressure rises through selected extra nest venues and breeding opportunities; Normal preserves its current source-geometric nest subset. All45 candidate selections use existing instance IDs/coordinates. Ordered counts are a playtest hypothesis, not proof of tactically ordered challenge.

Hold Base and Crystal Chamber have zero playable nests. They need separate wave rates/quotas; the proposal keeps hard quotas at Normal, reduces easy quotas, and parameterizes final extraction thresholds together. Only the final map has a runtime crystal to scale. Preserve support types/caps and recovery; defer optional faster easy resource rolls until recovery tests demonstrate a need. Those boosts are custom proposals, not original rules.

Suggested next agreement: adopt the Normal semantic/birth/evolution correction or retain its current cadence explicitly as custom; approve exact values/layouts and wave/crystal profiles; defer resource boosts (recommended). Then dispatch staged bounded tickets, with full VM coverage and cleanup/route/recovery browser gates. No implementation is authorized by the audit.

Evidence: [detailed source/current audit](difficulty-audit.md), [numeric proposal and staged acceptance](difficulty-proposal.md), [45-state diagnostic](../../research/difficulty-audit.json), [candidate manifest](../../research/difficulty-proposal.json). Full suite and diagnostic checks pass. Native fine-collision/animation/correlation and live balance remain unverified; previous original launch was access-denied and worker browser provider unavailable.
