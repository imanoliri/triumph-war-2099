# Setup and reproducible commands

## Play and develop

Requirements: Node.js 20+ (current local checks use Node 24), a desktop browser, and Git for branch workflows. No npm dependencies or install step are needed.

```text
node tools/dev.cjs doctor
node serve.cjs
```

Open http://127.0.0.1:2099. The server binds only to loopback. Optional TRIUMPH_PORT overrides the default port (2099). Opening index.html directly also works. The server uses paths relative to its own file; keep the checkout open in your editor/project app.

```text
node tools/dev.cjs check
node tools/dev.cjs test
```

`check` validates script syntax and repository references/assets. `test` additionally runs the mocked-canvas gameplay suite and mocked-audio music suite. These are not browser playtests. npm aliases are in package.json; on Windows use `npm.cmd` if PowerShell blocks npm.ps1.

The difficulty regression suite reads an immutable accepted baseline from Git history. Use a full clone for `test`; in an existing shallow clone run `git fetch --unshallow` first. The Windows/Ubuntu Actions matrix checks out full history with `fetch-depth: 0` for this comparison.

## ZIP packaging

Python 3.10+ is required; packaging uses only the standard library. Set the PYTHON environment variable to an executable path if Python is not on PATH. The runner also recognizes the Windows `py -3` launcher.

```text
node tools/dev.cjs package
node tools/dev.cjs package --output ../triumph-recreation.zip --local-bank
```

Default output is ignored `dist/triumph-recreation.zip`. Packages contain the browser runtime and asset tree, not Git metadata, scratch recovery data, session notes or tooling. The generated Windows MIDI sample bank is excluded by default. `--local-bank` is for personal local playback packages; no redistribution rights are granted. Default packages retain the synthesizer fallback.

## Optional local MIDI sample bank

Original MIDI performances and decoded scheduling data are shipped. A machine-local sample bank approximates the Windows synth used by the original game:

```text
node tools/dev.cjs bank
node tools/dev.cjs bank <path-to-gm.dls>
```

The default source is the current Windows installation's System32/drivers/gm.dls. On other systems supply your own compatible file or use oscillator fallback. The generator reads the system file without modifying it, and writes ignored assets/audio/gm-bank.js. Regenerate in each worktree that needs sample playback.

## Optional original-asset regeneration

Playing and testing use shipped assets and do not need the original executable. To regenerate them, supply your installed original explicitly. This writes generated assets, so use a task branch and review its diff.

Python's Pillow dependency is declared in requirements-dev.txt. Install it in a development environment if you need image regeneration. No browser runtime dependency is added.

```text
python -m pip install -r requirements-dev.txt
node tools/dev.cjs recover <path-to-original-2099_23.exe>
```

The runner creates ignored work/original-chunks and work/recovered inside this repository, extracts image/object/frame banks, renders sprites, builds corrected map masks, enriches objects/movements, derives events/support/pickups, recovers sounds and MIDI, and rebuilds music scheduling data. It never modifies the original executable. The original version 2.3 binary layout is assumed; other versions are unsupported until investigated.

Individual tools can be run from the root after their inputs exist. Map regeneration accepts an alternate recovered directory:

```text
python tools/build-original-assets.py <recovered-directory>
```

The external workspace work/ folder used during early development is no longer required by the documented commands. Research/events.json.gz is a shipped event reference; pickup derivation prefers newly recovered events when present.

## Verification and limitations

See PLAYTEST for manual scenarios. Log failures with mission, difficulty, steps, expected/actual result and a screenshot. Keep local MIDI banks, original executable copies and scratch data out of Git. Authorship and publication state are in PROJECT and STATUS.

Beneath the Dunes checks: `node tools/check-beneath-dunes.cjs`; art contract: `node docs/art-kit/beneath-dunes/verify.cjs`; reproducible seed36036 full-runtime default/attack-move probe: `node tools/probe-beneath-dunes.cjs` (rewrites docs/design/beneath-dunes-pressure.json). Terrain-only authoring: run tools/build-beneath-dunes.py with an existing Pillow-capable Python; this builds only that custom map. Do not regenerate recovered assets.
