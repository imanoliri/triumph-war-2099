# Campaign Brief (`1. Campaign Brief`)

- **Scope Mode:** `Multi-World Campaign` | `Single-World Upgrade` | `Engine / AI Sprint`
- **Campaign / Ticket Slug:** `<slug>`
- **Target Worlds & Arc:**
  1. `<World A>` — Atlas option / terrain ID (`<terrainId>`), role (`<assault|rescue|expedition|...>`), mechanical hook
  2. `<World B>` — Atlas option / terrain ID (`<terrainId>`), role (`<role>`), escalating threat
- **Shared Roster & Enemy Additions (`docs/design/catalogues/catalogue.json`):**
  - Existing units / `worldRoster` gates: `<worldRoster>`
  - Approved new enemies or specialist mechanics: `<IDs or "None — existing runtime only">`
- **Active Parallel Build Stages (`s-code`, `s-art`, `s-audio`):**
  - Run `s-code` (`Gameplay Engineer`): `yes | skip`
  - Run `s-art` (`Map & Sprite Artist`): `yes | skip`
  - Run `s-audio` (`Sound Designer`, optional — 1 song per planet): `skip (all planets already scored) | yes (1 track per new/unscored planet)`
- **Explicit Exclusions & Provenance Guards:**
  - Original 9 recovered missions, `assets/images/*` (`995`), `assets/maps/*` (`9`), `assets/audio/catalog.json` (`62`/`14`), and `ORIGINAL_MUSIC` line-1 SHA256 remain untouched.
  - Open operator questions batched here before Step 2 begins:
    1. `<Decision or "None">`
