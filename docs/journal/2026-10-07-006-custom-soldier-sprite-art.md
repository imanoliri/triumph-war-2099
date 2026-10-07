# 2026-10-07-006 High-fidelity pixel art sprites for custom soldier types (TRI-065)

- **Branch**: `feature/custom-soldier-sprite-art`
- **Worktree**: `C:\Users\user\Documents\Codex\2026-10-03\he\outputs\triumph-custom-soldier-sprite-art`
- **Ticket**: `TRI-065`

## Goal
Render high-fidelity multi-directional pixel art sprites matching Triumph 2099 aesthetic conventions for custom specialist soldier types (`rider-scout`, `dune-guard`, `field-mechanic`, `snow-sniper`).

## Implementation Details
1. **`src/rendering.js`**:
   - Enhanced `variantMark(ctx, u)` to render high-fidelity 16/32-heading aligned pixel art overlays for each specialist type:
     - `rider-scout`: Sand gold armor palette (`#d8c896`), tracking cowl (`#b9b46e`), tracking visor / optics scan light (`#ffe066` / `#ffd700`), sensor pack (`#9e9453`), and carbine barrel shroud (`#292922`).
     - `dune-guard`: Heavy rust bronze desert blast armor (`#bf8057` / `#8c5230 scabbard`), double-barrel shotgun scabbard (`#3a2e26`), hardened blast helmet visor (`#e69145`), and heavy wide double shotgun barrels (`#292922`).
     - `field-mechanic`: Field engineer sage teal palette (`#75aaa0` / `#4a7870`), diagnostic repair scanner visor (`#50e3a6` / `#88ffc4`), and toolkit harness & spanner pouch (`#def2d5`).
     - `snow-sniper`: High-contrast arctic snow ghillie cowl (`#f0f8ff` / `#c4dbe8`), cyan optics scope (`#00e5ff` / `#00b2cc`), and precision long barrel shroud (`#1c2d37`).
   - Updated `soldier(u)`: Ensures custom soldier types render base soldier sprite 52 (image 155) first, followed by layering `variantMark(ctx, u)` across turning and facing angles (`u.angle`).
2. **`src/desert-riders.js`**:
   - Updated `draw(ctx, u)` so that specialist soldiers delegate directly to `window.TriumphRendering.variantMark(ctx, u)` while `convoy-crawler` retains its custom multi-compartment vehicle render.
3. **Automated Test Verification**:
   - **`tools/check-recreation.cjs`**: Added dedicated TRI-065 suite verifying `variantMark` rendering, fillStyles, visor/scabbard/harness layers, and 360-degree heading alignment (`u.angle`).
   - **`tools/check-combat.cjs`**, **`tools/check-input.cjs`**, **`tools/check-rendering.cjs`**: Updated baseline commit hashes and harness expectations to align with post-TRI-064 acoustic alien AI and post-TRI-065 custom soldier rendering.

## Evidence & Verification
- `node tools/dev.cjs test`: All 32 check suites passed cleanly.
- `tools/check-recreation.cjs`: Passed TRI-065 high-fidelity pixel art sprite overlay rendering for custom soldier types across directional headings.

## Limitations & Handoff State
- Canvas multi-directional overlays verified via automated canvas command inspection tests (`check-recreation.cjs` and `check-rendering.cjs`). Live browser visual playtest unverified (no browser access in headless environment).
