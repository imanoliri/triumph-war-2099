# Candidate difficulty profiles and mission interventions

TRI-020 proposal, 2026-10-04. **Unapproved numeric/layout candidates; no gameplay changes.** Read the [source/current audit](difficulty-audit.md) first. [Machine-readable candidates](../../research/difficulty-proposal.json) enumerate all45 exact nest selections using source instance IDs and coordinates. These are reviewed static choices, not validated playable layouts.

Recommendation: keep five settings and Normal as default/reference. First agree a small Normal fidelity correction, then tune other settings around it with fewer/more simultaneous fronts and breeding pressure. Preserve damage/aiming/bursts and recovery rather than turning the final half of each mission into larger HP piles. Current Easy can retain more nests than Normal; the candidates intentionally replace that nonmonotonic layout selection outside Normal.

## Separate Normal fidelity correction

1. Rename/document the recovered third value as evolutionRollMax (22/23/24/25/27), rather than speed. Stop using it to infer source enemy movement or nest cadence. Keep approved recreation Normal motion/AI as documented approximations; movement multipliers on other settings are explicit custom values below.
2. For Normal, restore the evidenced Egg opportunity rule: Random(100) every 0.5 s, success on<=3, then finite birth animation before a new ground bug. Preserve source cap/placement/50 durability and source birth frame 9. The candidate uses per-nest independent seeded rolls, first roll at0.5 s,12-frame busy phase2.4 s and birth at1.8 s (unverified50 Hz/10%-speed conversion). That independence/initial delay/cadence is an explicit reconstruction choice, not native measurement. A successful busy phase cannot be restarted or duplicate a birth.
3. Restore eligible growplant opportunities under source roll/cap/global guards, using the third value. Do not create random plants in later missions merely because copied unreachable event branches exist. Existing Hanger/Caves placed plants remain. Commander destruction and bug evolution stay; no additional HP/armor or supply effect is invented.

This may reduce breeding pressure relative to current Normal's measured one-birth/~7 s. 4% per0.5 s is an opportunity stream, not observed original births; proposed finite busy timing adds more delay. Choose this correction explicitly before any custom comparisons. An alternative is preserving today's Normal cadence as a documented custom baseline, but that would be a weaker source-fidelity reference. Native full AI/animation fidelity is outside this bounded proposal.

## Candidate global values

| Parameter | Very easy | Easy | Normal | Hard | Very hard |
| --- | ---: | ---: | ---: | ---: | ---: |
| Ordinary bug HP | 2 | 3 | 4 | 5 | 6 |
| Queen HP | 20 | 35 | 50 | 55 | 60 |
| Nest HP | 35 | 40 | 50 | 50 | 55 |
| Custom motion multiplier relative to current Normal | 0.90 | 0.95 | 1.00 | 1.00 | 1.05 |
| Successful roll bins out of100, every 0.5 s | 2 | 3 | 4 | 5 | 6 |
| Nominal opportunity rate per eligible nest | 0.04/s | 0.06/s | 0.08/s | 0.10/s | 0.12/s |
| Final crystal HP (mission9 only) | 12 | 10 | 7 | 7 | 7 |
| Optional random-resource interval multiplier | 0.80 | 0.90 | 1.00 | 1.00 | 1.00 |

No profile changes friendly damage/HP, aim rules, nest cap 50, cannon headings, orders, tactical mode, starting troops/placed pickups, pickup type/cap/eligibility, commander return10 s or source terminal/door dependencies. Red-bug chance10%, HP5 and approved burst/AI rules remain. Keep existing custom spit-delay bases5.5/4.8/3.8/3.2/2.7 plus0–1.6 s for this first tuning pass; they are custom even on Normal. No new AI complexity is required.

Queen harder HP55/60 replaces source65/80, deliberately limiting cleanup: ideal tank direct hits rise10→11→12 rather than10→13→16 (before sparks/other hits). Hard nest HP remains50; Very hard adds only10%. Challenge grows mostly from more fronts and throughput, not slow objectives. Optional easier resource intervals are0.8/0.9 s instead of1 s; caps/eligibility still bound grants. Recommend deferring this optional resource change until nest/wave evidence shows recovery is insufficient. Never cut difficult-setting support below the current baseline in the first pass.

The busy birth phase means realized rate is below nominal opportunity rate; cap/kill throughput may dominate. No candidate promises a mission spawn-per-second total from multiplying nest count by probability. Keep first-roll/busy duration constant between settings so the probability and layout comparison is understandable.

## Exact per-mission nest count candidates

| Mission | Very easy | Easy | Normal | Hard | Very hard | Nominal nest-only destruction work at1-damage hits, Normal / VH |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| 1 Desert Canyon | 2 | 2 | 3 | 4 | 4 | 150 /220 |
| 2 Desert Rocks | 2 | 3 | 4 | 5 | 6 | 200 /330 |
| 3 Flash back | 6 | 8 | 11 | 12 | 14 | 550 /770 |
| 4 Retake Base | 3 | 4 | 5 | 7 | 10 | 250 /550 |
| 5 Hold Base | 0 | 0 | 0 | 0 | 0 | Not a nest mission |
| 6 Hanger | 12 | 18 | 24 | 30 | 36 | 1200 /1980 |
| 7 Inside 1st level | 12 | 16 | 20 | 20 | 20 | 1000 /1100 |
| 8 Caves | 12 | 17 | 22 | 27 | 30 | 1100 /1650 |
| 9 Crystal Chamber | 0 | 0 | 0 | 0 | 0 | Not a nest mission |

The1-damage work column isolates objective durability/count; it is not expected combat duration. Harder Hanger/Retake still require substantial extra destruction and must pass the cleanup acceptance below; if they fail, reduce redundant nests first rather than inflate speed or damage. Very hard avoids the full42 source Hanger nests and uses30 of33 Caves nests. Inside 1 gains harder pressure without adding another terminal-room cleanup obligation.

Positions are **unchanged** existing source coordinates. JSON lists IDs/coordinates per setting. Easier/harder selections are nested prefixes of a deliberate order; Normal's prefix equals the source geometric Normal subset exactly. No walls, terminal locations, support routes or collision masks are edited. Source coordinates alone cannot prove good attack venues or reachability; route/fire-lane checks and browser playtests are required before accepting any subset.

| Mission | Proposed venues / reference coordinates | Candidate intervention and exclusions |
| --- | --- | --- |
| Canyon | ID 298(590,547),157(814,287),299(904,707); extra49(994,197) | VE/E retain two separated existing breeding venues; Normal adds southern nest; H/VH add northeast pressure. Keep initial24 bugs and35 s gate. No new spawn beside commander origin. |
| Rocks | ID 16(339,43),157(709,392),28(559,497),159(934,152); extra301(904,227),302(829,692) | Expand from upper/middle to lower/eastern venues. The(339,43) boundary venue already exists and needs targetability smoke. Exclude upper HUD-margin303(734,21) from custom subsets; source-boundary fidelity belongs in a separate fix. Keep10 initial bugs and35 s gate. |
| Flash back | ID 230(111,455),231(694,452),216(386,685),226(994,707),228(124,752),219(616,752); later274/217/215/275/225 | Distribute easier nests across existing west/east and lower field, rather than leave one dense surviving cluster. Hard adds227(994,662); VH adds229(199,752),220(304,752). Preserve unlock244/252 and laser terminal 257; no nest introduced inside a locked-only shooting lane without route verification. |
| Retake | ID 307(71,505),309(604,317),311(919,257),312(199,751),106(274,737) | Easier settings shorten lower-field cleanup. Hard adds301(138,583),306(934,707); VH additionally108/325/326. Treat right/lower venue labels as hypotheses until routes are tested. Preserve terminal 253 and all unlock dependencies. |
| Hold | Source off-field Egg(304,827) excluded | No nest relocation/addition. Tune separate wave pressure/quotas below. Preserve35-person initial army and existing placed weapons/grenades; this map has no runtime crystal to scale. |
| Hanger | Existing northern IDs247/246/249/253/254, left325/245/241, southern243/238/230/232 and remaining Normal cluster | Easier profiles retain a northern/left/southern distribution; harder expand at original113,219 /913,82 /949,47 /989,47 and selected southern sites. Exact manifest avoids coordinate invention. Keep9 initial army, infiltration/doors, three placed growplants and unavailable bronze support. Recovery must remain viable without granting tanks contrary to source guards. |
| Inside 1 | ID 403(281,135),326(514,122),406(783,133),340(745,138),325(559,272),338(484,272),341(244,422),189(139,347),312(942,345),342(875,422),175(559,722),179(964,677) | VE12 retain upper/middle/lower venues; E adds404/405/349/324; Normal adds214/183/401/402. H/VH retain20 but increase roll pressure modestly. Preserve eight terminal prerequisites, all source doors, one ceiling shadow and return rules. Initial single infantry makes support recovery a required playtest. |
| Caves | Upper301/403/245/248, middle256/303, right426/428, lower267/281/280/268 | VE12 preserve several existing areas; E17 and N22 add lower members; H/VH add original northern/middle/right sites listed in manifest. Keep16 initial bugs/one queen,18 placed plants, ceiling lifecycle and terminal 436. Do not create new choke points or assume visible art gives traversable routes. |
| Final | No playable Egg; crystal 547 at existing position | No new nests. Preserve two terminals, ceiling shadow and disabled final return. Tune rates/quotas/crystal HP jointly; keep damage and support types. |

## Wave / victory / recovery candidates

| Hold Base profile | VE | E | N | H | VH |
| --- | --- | --- | --- | --- | --- |
| Ordinary kill target | 120 | 160 | 200 | 200 | 200 |
| Wave opportunity interval | 0.50 s | 0.333 s | 0.25 s | 0.20 s | 0.167 s |

| Crystal Chamber profile | VE | E | N | H | VH |
| --- | --- | --- | --- | --- | --- |
| Ordinary / queen kill targets | 100 /25 | 125 /35 | 150 /50 | 150 /50 | 150 /50 |
| Ordinary opportunity interval | 0.50 s | 0.333 s | 0.25 s | 0.20 s | 0.167 s |
| Queen opportunity interval | 1.00 s | 0.75 s | 0.50 s | 0.45 s | 0.40 s |
| Begin extraction queen threshold after ordinary target met | 20 | 28 | 40 | 40 | 40 |

Start times remain25/30 s, source caps and ordinary→queen phase ordering remain. Reduced easy quotas shorten mandatory attrition; hard quotas do not rise beyond Normal, so harder means handling more simultaneous pressure rather than hundreds of extra cleanup kills. Source35/30 s minimum-time conditions elsewhere stay. Final extraction threshold =ceil(0.8*profile queen target), and ordinary threshold =profile ordinary target, with both terminals still required. Victory requires full profile targets plus clearance/extraction; no hardcoded150/40 path may block reduced profiles. This joint parameterization is essential.

Recovery remains deliberate: unchanged starting army/resources, source support types/caps, eagle availability labels and commander return. Faster optional easy resource rolls are a later decision. Do not reduce crystal HP below7 or change door durability: sudden unavoidable losses and damaged routes are weaker difficulty levers than pressure/venues.

## Proposed staged tickets, each requiring agreement

| Stage / suggested bounded ticket | Scope | Measurable acceptance |
| --- | --- | --- |
| A: difficulty semantics and profile selection | Correct misleading third-value label, explicit immutable profile, Normal default, restart/briefing semantics and current approximation text | All45 setting initializations select one coherent profile; selector restarts as stated, queued orders/flags reset consistently, tactical deployment and physical controls unchanged. No arbitrary field masquerades as source speed. |
| B: source-style breeding / evolution baseline | Normal opportunity/busy/frame 9 model and eligible growplant guards; independent seeded RNG approximation recorded | Boundary rolls0–3 succeed/4 fails; one birth per phase; no timer/animation progress in tactical; cap blocks triggers; no simultaneous kill credit or stale nests. Audit all17 value 2 refs/gates; eligible plants capped correctly, later guards respected, commander/bug contact semantics covered. Controlled100,000 independent opportunity tests yield4%±0.3 percentage points; report realized births separately. Native/browser timing remains unverified until measured. |
| C: global mixed pressure profiles | Agreed HP/motion/nest-roll values and source cap preservation, without layout/resource changes | HP matrix exact; tank ideal queen direct-hit work20/35/50/55/60 matched to5-damage math; all setting probability/cooldown boundaries; shared seed/config deterministic. Controlled30-minute no-combat cap-clear probes report opportunities,births,busy time and cap pauses separately; live encounters required before calling balance accepted. |
| D: outdoor nest subsets1–4 | Approved exact IDs/coordinates in manifest; source Normal unchanged; no terrain edits | Count/ID equality for20 combinations, easier subsets contained in harder, unique source positions; source terminal unlock routes and ranged target edges preserved. At least one reachable firing point for every retained nest after legitimate unlocks; blocked test includes projectile LOS, not center reachability alone. Browser two approaches where geometry permits. |
| E: indoor nest subsets6–8 | Approved exact IDs/coordinates and pressure limits; keep support/vents/terminals | Count/ID equality for15 combinations; all terminal/support routes and lifecycle completion preserved; no new locked-room stalemate. Normal source subset equality. Hanger30/36 and Inside 20 test cleanup/recovery criteria explicitly. |
| F: wave/crystal profiles5/9 | Agreed rates,quotas,extraction thresholds and crystalHP only | Zero added nests; all10 combinations spawn correct phase/rate under no-combat controlled cap; reaching quota cannot bypass living enemies. VE/E final extraction proceeds at20/28 queen kills but victory waits25/35; exact Normal 150/50 and extraction40 remain. Crystal defeat7/10/12 and one-time rewards covered. |
| G: optional easier resource relief | Only if tests show inadequate recovery; interval0.8/0.9/1 s, same source cases/caps | Ineligible/capped eagles still rejected visibly; existing blocked eagle retained; no new Hanger bronze; direct infantry grant totals/source types unchanged. Matched-seed150 s eligible roll counts/arrivals documented separately from pickups obtained. |

These are proposed ticket scopes, not created/approved work. Source fidelity work is separated from custom layout/HP balance. Do not package all stages into one opaque balance change.

## Browser balance acceptance and stop criteria

Before acceptance, run normal UI deploy/resume on each of45 combinations, then representative matched-seed/state scenarios at normal and narrow viewport. No state injection may stand in for a playthrough. Observe at least one full Normal clear per mission, plus easier/harder comparison in a wave map, Hanger and a terminal/vent map; log browser/version, sample-bank state, resources, casualties, time and failed routes separately from VM results.

Suggested quantitative gates are **candidate acceptance targets**, not current measurements: after last nest/required wave phase ends,80th-percentile remaining cleanup across5 pilot clears <=90 s and <=25% of that clear's duration; no enemy-free unrecoverable route/objective stall >30 s; same-profile attempt reproducibility recorded; easier profiles must not demand more nest-only1-damage work than Normal. Two distinct viable attack approaches where the original geometry permits them; no requirement to invent a second route through an intentionally single-door room. Starting tactical orders and commander/troop recovery remain usable on every setting.

If Hard/VH Hanger or Retake fails cleanup gates, reduce redundant nest count or queen HP before increasing attack damage. If Normal source-style birth correction feels too quiet, report the gap and choose an explicit custom Normal cadence rather than relabel it original. If mandatory wave quotas prevent reasonable recovery, adjust the wave profile as a separate agreed revision, not a hidden resource cheat. No playability, perceived difficulty ordering or native fidelity claim is justified by today's static/VM evidence.

Director/user agreement is needed on: adopting the Normal fidelity correction and its stated animation approximation, the exact global values,45 nest selections, wave/crystal values, and whether optional resource relief is deferred (recommended). No implementation is authorized by this report.
