# Full Suite & Fidelity QA (`4. Full Suite & Fidelity QA`)

## Integrated Verification Commands
- `node tools/dev.cjs check` — syntax + runtime references + asset counts (`995` sprites, `9` maps, `62` sounds, `14` original tracks)
- `node tools/dev.cjs test` — full Node VM regression suite (`exit 0` required)
- Custom terrain / art / music rebuild parity checks (`node tools/check-music.cjs`, art mask/SHA256 verification)

## Cross-Domain Integration Audit
- Confirm zero stray edits to recovered original files (`assets/original-*`, `assets/images/*`, `assets/maps/*`, `ORIGINAL_MUSIC` line 1).
- Confirm all new scripts are loaded before `game.js` in `index.html` and allowed in `serve.cjs` if served as top-level/src files.
- Summarize every pass/fail strictly from executed output without claiming live browser playability or audible quality.
