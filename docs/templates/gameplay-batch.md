# All-Worlds Gameplay & Tests Batch (`3A. Gameplay & Tests Batch`)

## Implementation Scope (`src/`, `tools/`, root JS/HTML/CSS)
- **New / Updated Modules (loaded before `game.js` in `index.html`):**
  - `src/<module>.js` — explicit state/callback signatures, zero external dependencies
- **Enemy / Specialist Mechanics:**
  - Summarize implemented AI state machines, telegraphing, aiming rules, `Units` / `Controls` copy updates, and `worldRoster` enforcement
- **Mission & Profile Registrations (`src/custom-missions.js`):**
  - List all campaign mission IDs and confirm all 5 profiles (`veryeasy`..`veryhard`) match the approved Blueprint
- **Focused Regression Checks (`tools/check-*.cjs`):**
  - Confirm real production assertions (wall stops, mask clearance, finite caps, all-5 profiles, victory/defeat/restart) — no tautological checks
- **Safety Check:** Confirm zero edits to `assets/images/*`, `assets/maps/*`, `assets/original-*`, or `assets/audio/*`, and do **not** run `git commit` during parallel `build`.
