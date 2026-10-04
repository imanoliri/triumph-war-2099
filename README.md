# Triumph! War 2099 — fan recreation

A local browser recreation using art, maps, sounds and MIDI recovered from the user's installed version 2.3 game by Anthony Lopes / DarkSun Games. The JavaScript engine and AI are reconstructed; the original editable MMF project has not been found. Original assets retain their authorship and no new asset license is granted.

## Run

Node.js 20+ and a desktop browser. No npm install is required.

```text
node tools/dev.cjs doctor
node serve.cjs
```

Open http://127.0.0.1:2099, or open index.html directly. The preview server is read-only and binds to loopback.

## Play

- Select Commander 1–4; WASD moves that commander. Hold left mouse to aim/fire, right mouse to grenade. V fires, B chooses a keyboard squad order. Physical keys support German QWERTZ.
- Drag selects troops; Shift adds. Right-click ground attack-moves, double right-click empty ground force-moves, enemy clicks focus attacks, double right-click usable objects travels/activates them.
- Space/Escape/Pause freezes play with a small banner. Selection and orders work while paused and execute on resume.
- Top-right Rally button or R toggles flag placement. Left-click clear ground places, right-click removes, Escape exits. Yellow/bronze/BLITZ soldiers/tanks/robots use the nearest reachable flag; commandos are excluded.
- Units shows health, damage, burst behavior and descriptions. Remaining shows mission requirements. Enter starts/advances, F2 restarts.

Regular infantry is deliberately cardinal-only; commandos use eight directions, mouse-controlled commanders arbitrary angles, bugs a facing cone. Current balance and all mission requirements: [DESIGN](docs/DESIGN.md). Full key presets are available in the in-game Controls panel.

## Develop in fresh chats

Start with [WORKFLOW](docs/WORKFLOW.md), [STATUS](docs/STATUS.md) and the chosen task. Repository instructions are in [AGENTS.md](AGENTS.md).

```text
node tools/task.cjs start feature/example-feature
node tools/task.cjs session example-feature
node tools/dev.cjs test
node tools/dev.cjs package
```

The task helper creates branch instructions and chronological journals named `YYYY-MM-DD-NNN-feature-name.md`. Browse [journals](docs/journal/README.md) by date, or use each task’s session links to follow a feature; every journal includes a handover. [SETUP](docs/SETUP.md) covers worktrees, Python/image recovery, optional local MIDI samples and packaging. [ARCHITECTURE](docs/ARCHITECTURE.md) explains module boundaries. [BACKLOG](docs/BACKLOG.md) tracks pending work; [PLAYTEST](docs/PLAYTEST.md) defines browser acceptance.

## Verification and provenance

Automated checks use mocked canvas/audio and cannot establish live graphics, audio fidelity or balance feel. Check [STATUS](docs/STATUS.md) and recorded playtests for actual verification. The reported mission-completion issue remains pending live reproduction despite all nine simulation completion checks passing.

995 sprites, 623 object definitions, nine gameplay maps, 62 PCM sound effects and 14 MIDI tracks are included. The generated Windows sample bank is machine-local and ignored; default packages use fallback synthesis if it is absent. See [PROJECT](PROJECT.md), assets/provenance.json and research/ for authorship and recovery evidence.

Local main preserves the accepted playable milestone; individual branches carry new work. Accepted task branches are always squash-merged into main as one commit per task. GitHub publication state/visibility is documented in STATUS. No publishing is implied by local commits.

[DEVELOPMENT-NOTES](DEVELOPMENT-NOTES.md) is chronological history. The [archived prototype README](docs/archive/README-prototype.md) records early details, some superseded by DESIGN.
