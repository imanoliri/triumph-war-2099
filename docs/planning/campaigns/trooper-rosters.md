# World trooper roster refinement

Planning only; no implementation dispatch. Read alongside [world table](planets/README.md). Recorded 2026-10-07. User wants all world rosters compared before specialist implementation tickets, with concrete mechanics that fit the game rather than speculative abilities.

## Selected identities and draft mechanics

User selected Capital Shield Trooper and Laser Cannon, replacing the director's militia proposal. User specified medium laser range, approximately 3 damage to every enemy in a corridor half a soldier wide, with long recharge. User selected Jungle Recon: sprint with damage immunity while moving, and automatic dash with immunity to avoid damage while stationary. Numbers below are director proposals, not agreed balance.

| Unit | Draft in-game rules | Limits and implementation needs |
| --- | --- | --- |
| Capital Shield Trooper | Slow rifle infantry, carrying a forward shield. A frontal 120-degree sector absorbs up to 3 damage before breaking; rear/side attacks hit ordinary health. Shield regenerates after 6 seconds without being hit. Faces its current aim or travel heading. | Individual protection only in initial proposal; no promised bodyguard aura or ally interception. Needs attack-origin data at damage resolution, shield state, facing indicator and break/recharge feedback. Environmental damage bypasses directional shield. Exact rifle, health and speed remain open. |
| Capital Laser Cannon | Infantry-carried weapon. Proposed 220px maximum range, instantaneous straight beam dealing 3 damage once to each intersected enemy, 4-second recharge. Full corridor width equals half the agreed soldier reference width. Stops at the first blocking terrain; cannot penetrate walls. Fires along established infantry aim headings. | Needs segment-versus-enemy-footprint collision and per-shot deduplication. Current infantry hit radius is 8px; proposing the 16px collision diameter as reference gives an 8px full beam width (4px half-width). Sprite-width reference is an alternative still requiring decision. Infantry type interpretation is a proposal. Enemy nests can be hit if included as normal enemy targets; ordinary prop damage must respect existing rules. No friendly damage. AI should prefer aligned groups without bypassing orders or aiming. |
| Jungle Recon | Basic rifle with a proposed automatic defensive sprint/dash: 0.25-second immunity and up to 48px travel, then a 3-second cooldown. Moving recon continues along its legal route; stationary recon sidesteps to avoid an imminent projectile or melee hit. | Immunity is confined to the dash, not all movement. Shares one cooldown between moving and stationary cases. Trigger before hit resolution from an imminent valid threat, not after death. Choose a collision-safe endpoint and check the entire swept route. Cannot cross walls, closed doors, gaps or map bounds. If no safe dodge is available, take the hit rather than gain free stationary immunity. Stationary dodge returns toward guard anchor afterward; temporary movement preserves explicit order. Needs projectile prediction and melee pre-hit hook, visual tell and focused regression checks. Whether unavoidable noncombat damage can be dodged remains open. |

## Feasibility discipline for the remaining roster

Each proposed specialist must state weapon range/damage/cooldown, target and trigger, movement/aim behavior, duration/resource limits, terrain interaction, order compatibility, counters, visible feedback and reinforcement eligibility before becoming an implementation ticket. Existing mechanisms are evidence of feasibility, not proof the new ability exists.

- Desert Scout, Dune Guard and Mechanic already exist; preserve their distinctions instead of cloning them for other worlds.
- Snow Sniper already exists. Temporary cover requires explicit projectile/terrain rules; it is not a free cosmetic ability.
- Maritime suppression needs a bounded slow duration and immunity/stacking rules; a grenadier can build on existing grenade trajectories, explosions and friendly-damage rules.
- Undercity sensing may show threat markers, but must not permit shooting through walls. Ambusher needs a concrete trigger and limited damage benefit, without invented stealth.
- Jungle spotter should not be selected merely to accompany Recon. Its independent role remains open.
- Industrial armor-piercing requires an actual approved armor model; otherwise use a concrete high-damage weapon role. Robot repair overlaps existing Mechanic and needs a distinct justification.
- Mercenary medic is a new healing mechanic; define health eligibility, rate and interruption. Weapon switching requires a finite approved kit.
- Volcanic demolition can use finite placed explosive charges. Heat resistance has no value unless actual mission hazards and their damage exist.
- Toxic hazard resistance likewise requires active hazards. Chemical spray must specify direct damage or a finite timed effect; neither is presumed implemented.
- Airless moon drone operation requires a controllable/spawned entity, population and loss rules. Heavy infantry can use ordinary movement/health/weapon systems with concrete tradeoffs.
- Floating habitat jumps are not approved: current movement must respect terrain collision; crossing gaps would need explicit navigation and landing rules. A stationary long-range defender is feasible with existing combat primitives.
- Abandoned-world scavenging requires a finite actual pickup resource, not an implied economy. Incendiary weapon can reuse existing flame mechanics but needs differentiation from other short-range troops.
- Orbital mine-layer can build on existing finite crawler mines; manual placement/arming/trigger rules are new. Breaching cannot imply destructible walls without a separate approved system.

## Next planning action

Resolve Capital shield behavior, laser reference width/range/recharge and Jungle Recon dash/cooldown rules with the user. Continue world-by-world comparison across all fourteen settings. Create bounded specialist tickets only after roster mechanics are agreed. No worker running for this planning work.
