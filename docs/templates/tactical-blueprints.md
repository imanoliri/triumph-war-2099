# All-Worlds Tactical & Enemy Blueprints (`2. Tactical Blueprints`)

> Complete one 8-section block for **every** world in the campaign before build stages start, plus SVG layout diagrams under `docs/design/`.

## Cross-World Campaign Matrix

| World | `terrainId` | `patternId` | Objective Kind | New Enemy / Unit Hook | Max Pairwise Overlap |
|---|---|---|---|---|---|
| `<World A>` | `<id>` | `layout-*` | `<activate/clear/rescue/hold>` | `<hook>` | `<check <= 85%>` |

## Per-World 8-Section Contract

### World `<N>`: `<World Name>`
1. **`layout`:** `patternId`, corridor widths (`>= 88–144px`), `18px` clearance, bounds inside `1024×768` (`y >= 36` below HUD), saved SVG path (`docs/design/<slug>-<world>.svg`).
2. **`artTheme`:** Terrain palette, landmarks, and visual separation between blocking obstacles and clear paths.
3. **`units`:** Exact legal `worldRoster` IDs, starting counts, HP, and aiming rules (`cardinal` / `8-dir` / `360°`).
4. **`enemies`:** Enemy role IDs, finite spawn/birth caps, telegraph cues, and counterplay lanes (`64px` clear fire lanes).
5. **`objectives`:** Exact terminal keys, victory, defeat, and extraction conditions.
6. **`placements`:** Exact `(x, y)` coordinates for commanders, troops, nests, bugs, terminals, pickups, and support.
7. **`support`:** Finite yellow/bronze/blue eagles, vehicle assignments, and troop-cap reservations (zero infinite refills).
8. **`difficulty` (All 5 Profiles):**

| Profile | Starting Squad | Tank | Nest Cadence / Births | Finite Waves |
|---|---|---|---|---|
| `veryeasy` | | | | |
| `easy` | | | | |
| `normal` | | | | |
| `hard` | | | | |
| `veryhard` | | | | |

## New Enemy / Unit Specifications (If Authorized)
- **ID / Name:** `<id>` — HP, Speed (`px/s`), Sight (`px`), Range (`px`), Cooldown (`s`), Aiming/Telegraph, Counterplay, Edge Cases.
