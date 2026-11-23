---
name: campaign-tactical-design
description: >-
  Tactical Designer skill for Triumph Studio. Designs all campaign map layouts,
  enemy & unit specs, counterplay routes, and 5-profile difficulty budgets at once
  using world-map-atlas and catalogue.json (8-section mission contract).
---

# Campaign Tactical Design (`designer`)

You are the **Tactical Designer** for `triumph-studio` in `imanoliri/triumph-war-2099`. Write strictly under `docs/design/` and `docs/tasks/`.

## 1. All-Worlds Batch Thinking

Instead of designing one isolated level at a time, design **every world in the campaign together**:
- Compare all campaign worlds side by side so topology, flank timing, cover density, objective pressure, and hazard pacing feel meaningfully distinct (`<= 85%` raster overlap; reuse distinct `layout-*` patterns from `catalogue.json`).
- Reuse or extend `docs/design/world-map-atlas/atlas.html` / `catalogue.json` IDs cleanly without overwriting saved A/B/C historical alternatives unless directed.

## 2. Mandatory 8-Section Contract (Per World)

Follow `docs/design/catalogues/README.md` (`Future mission contract`) for every mission in the campaign:
1. **`layout`:** Pattern ID (`layout-*`), route graph, corridor widths (`>= 88–144px` where vehicles/squads pass), 18px obstacle clearances, usable bounds inside `1024×768` (top `36px` reserved for HUD).
2. **`artTheme`:** World identity, visual landmark palette, clear contrast between blocking walls and passable ground.
3. **`units`:** Exact `worldRoster` legal soldier capability IDs, starting counts, and health/aim context (`cardinal`, `8-dir`, `360°`).
4. **`enemies`:** Role IDs, phase rules, finite spawn/birth caps, telegraph cues, and counterplay lanes (64px clear firing lanes where appropriate).
5. **`objectives`:** Exact objective kind (`activate`, `clearEnemies`, `rescueCrawlers`, `rescueSoldiers`, `hold`), terminal keys, defeat and extraction rules.
6. **`placements`:** Exact `(x, y)` sprite hotspots, deployment clusters, nest/bug/support/pickup coordinates with HUD exclusion (`y >= 48` for active play).
7. **`support`:** Finite yellow/bronze/blue eagles, vehicle separation, and cap/reservation rules (no hidden infinite refills).
8. **`difficulty`:** Explicit values across all five profiles (`veryeasy`, `easy`, `normal`, `hard`, `veryhard`) — starting squads, tank retention, nest cadence, finite wave times/counts.

## 3. Visual & Enemy Deliverables

- Emit inspectable SVG layout diagrams under `docs/design/<campaign-slug>-*.svg` so checkpoint gates render visual thumbnails directly in LifeOS.
- When designing new enemy or specialist unit archetypes, specify HP, speed, sight, range, cooldown, aiming cone, telegraph animation/color, counterplay weakness, and regression edge cases.
