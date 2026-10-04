"""Package a validated runtime ZIP using only Python's standard library."""
from pathlib import Path
import argparse, json, wave, zipfile

ROOT = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--output', type=Path, default=ROOT / 'dist' / 'triumph-recreation.zip')
parser.add_argument('--local-bank', action='store_true', help='Include this machine\'s ignored MIDI bank for personal local play')
args = parser.parse_args()
catalog = json.loads((ROOT / 'assets/audio/catalog.json').read_text(encoding='utf-8'))
sounds = [item for item in catalog if item['kind'] == 'sound']
for item in sounds:
    with wave.open(str(ROOT / 'assets/audio' / item['pcm'])) as audio:
        assert audio.getsampwidth() == 2 and audio.getnchannels() in (1, 2)
        assert audio.getnframes() > 0 and audio.getframerate() > 0
        assert abs(audio.getnframes() / audio.getframerate() - item['duration']) < .0001
assert len(list((ROOT / 'assets/images').glob('*.png'))) == 995
assert len(list((ROOT / 'assets/maps').glob('*.png'))) == 9
output = args.output.resolve()
output.parent.mkdir(parents=True, exist_ok=True)
runtime = [ROOT / name for name in ('index.html', 'style.css', 'game.js', 'navigation.js', 'music.js', 'support.js')]
runtime += sorted(path for directory in ('src', 'assets') for path in (ROOT / directory).rglob('*') if path.is_file())
if not args.local_bank:
    runtime = [path for path in runtime if path != ROOT / 'assets/audio/gm-bank.js']
with zipfile.ZipFile(output, 'w', zipfile.ZIP_DEFLATED) as archive:
    archive.write(ROOT / 'docs/PACKAGE-README.md', 'triumph-recreation/README.md')
    for path in runtime:
        archive.write(path, Path('triumph-recreation') / path.relative_to(ROOT))
print(f'Validated {len(sounds)} PCM WAVs, 995 sprites and 9 maps. Packaged {output} ({output.stat().st_size:,} bytes).')
if args.local_bank:
    print('Personal local package includes the machine-local MIDI bank; do not publish it.')
