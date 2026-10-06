# Future Soldier Unit Candidates & Design Proposals

This document records unit concepts and candidate proposals for future ticket implementation.

## 1. Specialist Infantry Units (Environment Rosters)

### ❄️ Snow Sniper (*Nivalis Snow / Whiteout Signal*)
* **Role:** Extreme-range precision marksman.
* **HP:** 1 HP | **Speed:** 36 px/s | **Sight:** 360 px
* **Weapon:** Heavy Scoped Anti-Materiel Rifle (Range: 480 px, Damage: 4 HP/shot, Cooldown: 1.8 s).
* **Special Trait:** **360-Degree Unconstrained Aim:** Fires in any arbitrary angle (mouse & AI targeting unconstrained by cardinal lanes).

### 🛡️ Heavy Armor Trooper (*Volcanic Forge / Heavy Industrial*)
* **Role:** Front-line juggernaut in heat-resistant powered armor.
* **HP:** 3 HP | **Speed:** 28 px/s | **Sight:** 245 px
* **Weapon:** Heavy Rotary Autocannon (Range: 220 px, Damage: 1 HP/shot, 6–8 shot rapid burst, Cooldown: 0.2 s).
* **Special Trait:** **Thermal & Hazard Immunity:** Immune to lava pools, thermal vent pulses, and environmental hazard damage.

### 🌿 Recon Scout (*Jungle Canopy Recon / Desert Dunes*)
* **Role:** Fast-moving flanker and ambush spotter.
* **HP:** 1 HP | **Speed:** 48 px/s | **Sight:** 320 px
* **Weapon:** Dual Carbines (Range: 180 px, Damage: 1 HP/shot, 8-direction aim, 0.1 s acquisition delay).
* **Special Trait:** **Ambush Spotter & Kiting AI:** Detects hidden canopy ambushes and nests through fog/foliage earlier (320px sight); maintains maximum 180px standoff range while firing.

### 💥 Breacher Commando (*Undercity Tunnels & Indoor Breach*)
* **Role:** Subterranean door and barricade demolition specialist.
* **HP:** 2 HP | **Speed:** 36 px/s | **Sight:** 245 px
* **Weapon:** High-Impact SMG (Range: 180 px, Damage: 1 HP/shot, 5–7 shot burst, 8-direction aim).
* **Special Traits:**
  * **Instant Door Breach:** Instantly forces open locked security doors without waiting for terminal hack triggers.
  * **Demolition Charges:** Throws heavy breach charges dealing 5 damage to nests/structures in a 32px splash radius.

### 🔥 Flamethrower Trooper (*Undercity Tunnels & Nest Clearance*)
* **Role:** Hazardous environment cleaner and horde-clearing fire specialist.
* **HP:** 1 HP | **Speed:** 36 px/s | **Sight:** 245 px
* **Weapon:** Heavy Continuous Flamethrower (Range: 145 px, 45° spray cone, 0.18 s shot interval).
* **Special Traits:**
  * **Piercing Cone Damage:** Flame streams pass through multiple bugs in a line, damaging all enemies in the cone simultaneously.
  * **Fire Immunity:** Immune to barrel explosions and lingering ground fire.

---

## 2. Advanced Unit Candidate Ideas (For Future Expansion Tickets)

### ⚡ Laser Cannon Trooper
* **Role:** Heavy anti-armor & choke-point beam operator.
* **HP:** 1 HP | **Speed:** 32 px/s
* **Weapon:** High-Energy Linear Laser Cannon (Range: 240 px, 3 damage/sec continuous beam).
* **Beam Width:** 8 px wide (~half a soldier width) piercing all hostiles in the line.
* **Tradeoff:** Requires a 0.6s charge-up phase before firing, followed by a 2.5s recharge cooldown.

### 🚀 Jetpack Infantry
* **Role:** Airborne mobility & obstacle-bypassing trooper.
* **HP:** 1 HP | **Speed:** 40 px/s
* **Special Ability:** **Jetpack Leap:** Can boost over low rocks, barricades, chasms, and bug swarms (120 px leap distance, 4 s cooldown).
* **Weapon:** Dual Pistol SMGs (Range: 160 px, high close-quarters burst).

### 💣 Grenadier Specialist
* **Role:** Indirect siege & anti-nest bombardier.
* **HP:** 1 HP | **Speed:** 36 px/s
* **Weapon:** Revolver Grenade Launcher (Range: 280 px, 3 damage/grenade, 24 px splash radius).
* **Tactical Use:** Bombards bug nests and enemies behind rock formations from behind friendly front lines.

### 🩺 Field Medic Trooper
* **Role:** Mobile support unit for squad sustain.
* **HP:** 1 HP | **Speed:** 36 px/s
* **Ability:** **Field Triage Aura:** Emits a localized healing pulse (0.5 HP/s) restoring health to adjacent injured human infantry within a 60 px radius when stationary or defending.
