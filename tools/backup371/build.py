"""Reproducible Nightshade348 Downtown review artifact; full campaign stays in editable dist."""
from pathlib import Path
import subprocess,re,json,shutil
R=Path(__file__).resolve().parents[2]
subprocess.run(['python',str(R/'tools/resolution342/build.py')],cwd=R,check=True)
out=R/'out'
exclude={'yacht-view195.js','estates196-data.js','estates-view196.js','hydro-view243.js','subway-view238.js','subway-ui238.js','subway-audio238.js','baylor-data237.js','baylor-view237.js','fans-data237.js','fans332-data.js','stadium313-data.js','stadium-view237.js','style310-data.js','style310.js','airport332-data.js','airport-view309.js','airport-weather312.js','airport-view312.js','reina312-data.js','reina-view312.js','reina-dive313-data.js','reina-view313.js','unique311-data.js','unique-view311.js'}
h=(R/'dist/downtown360.html').read_text()
h=re.sub(r'<script src="([^"?]+)(?:\?[^\"]*)?"></script>',lambda m:'' if m[1] in exclude else m[0],h)
# Only the declared entry point ships. Unsupported legacy pages must not expose removed asset paths.
for f in out.glob('*.html'):f.unlink()
(out/'index.html').write_text(h);(out/'downtown360.html').write_text(h)
for name in ['hydro','subway','stadium','stadium313','style310']:
 p=out/'assets'/name
 if p.exists():shutil.rmtree(p)
# Other-level presentation stays in source; the Downtown review does not preload these estates.
for p in (out/'assets').glob('estates-*'):p.unlink()
# Superseded facade atlases are not preloaded by the350 entry. Historical source stays intact.
for name in ['streets.webp','nightstreets.webp','hotel.webp','frontages.webp']:
 p=out/'assets/downtown345'/name
 if p.exists():p.unlink()
for name in ['grand-hotel-lobby96.webp','hotel-kitchen72.webp']:
 p=out/'assets'/name
 if p.exists():p.unlink()
# Replaced Broxton atlases remain in source history, not the bounded review package.
for old in ['broxton356','broxton357','broxton358']:
 p=out/'assets'/old
 if p.exists():shutil.rmtree(p)
# Browser controller links point back to the same supported entry point.
(out/'START-WINDOWS.bat').write_text('@echo off\r\ncd /d "%~dp0"\r\necho Open http://127.0.0.1:8000/ in Chrome or Edge.\r\necho Keep this window open while playing. Press Ctrl+C to stop.\r\npy -m http.server 8000 --bind 127.0.0.1\r\npause\r\n')
(out/'START-MAC-LINUX.sh').write_text('#!/bin/sh\ncd "$(dirname "$0")"\npython3 -m http.server 8000 --bind 127.0.0.1\n')
(out/'READ-ME.txt').write_text('URBAN FRACTURE / DOWNTOWN / NIGHTSHADE360 REVIEW BUILD\nRequires Python 3 and Chrome/Edge. Unzip fully. Windows: double-click START-WINDOWS.bat, then open http://127.0.0.1:8000/ . macOS/Linux: run sh START-MAC-LINUX.sh. Do not use file://. Connect DualSense to YOUR computer, open this local URL in YOUR browser, press a face button, then Options. Use Auto layout; DSX users select virtual Xbox device. Physical hardware remains unverified.\n\nExperimental review build; not stable certification. Full game source is preserved separately. Downtown routes only. New animation poses still require complete artistic review.\n\nNightshade default: Square/J attack; X/K jump; Triangle/L special; Circle/Q dodge; L1/B block; R1/C counter; L2/G grab; R3/E pickup; hold/release Attack charge; Options/P pause. Existing Reina and Broxton selection remains available.\n')
proof={'scope':'Downtown-only review build; prior entry points retained; Backup371 Bruiser/Gunner combat and10% Cutter selection','excludedPresentationScripts':sorted(exclude),'expandedFilesBytes':sum(p.stat().st_size for p in out.rglob('*') if p.is_file()),'retainedImageCount':len(list((out/'assets').rglob('*.webp')))}
(R/'reports371/package.json').write_text(json.dumps(proof,indent=2)+'\n')
print(json.dumps(proof))

for path in ['assets/broxton359/walk.webp','assets/broxton359/run.webp','assets/backup365/call.webp']:
 p=out/path
 if p.exists():p.unlink()
proof['expandedFilesBytes']=sum(p.stat().st_size for p in out.rglob('*') if p.is_file())
(R/'reports371/package.json').write_text(json.dumps(proof,indent=2)+'\n')
print(json.dumps(proof))

# Superseded run artwork remains editable in dist, excluded only from bounded deployment.
p=out/'assets/broxton366/run.webp'
if p.exists():p.unlink()
proof['expandedFilesBytes']=sum(p.stat().st_size for p in out.rglob('*') if p.is_file())
(R/'reports371/package.json').write_text(json.dumps(proof,indent=2)+'\n')

p=out/'assets/broxton367/run.webp'
if p.exists():p.unlink()
proof['expandedFilesBytes']=sum(p.stat().st_size for p in out.rglob('*') if p.is_file())
(R/'reports371/package.json').write_text(json.dumps(proof,indent=2)+'\n')

for stale in ['assets/broxton366/walk.webp','assets/broxton368/run.webp']:
 p=out/stale
 if p.exists():p.unlink()
proof['expandedFilesBytes']=sum(p.stat().st_size for p in out.rglob('*') if p.is_file())
(R/'reports371/package.json').write_text(json.dumps(proof,indent=2)+'\n')

for directory in sorted((p for p in out.rglob('*') if p.is_dir()),key=lambda p:len(p.parts),reverse=True):
 if not any(directory.iterdir()):directory.rmdir()
proof['retainedImageCount']=len(list((out/'assets').rglob('*.webp')))
proof['expandedFilesBytes']=sum(p.stat().st_size for p in out.rglob('*') if p.is_file())
(R/'reports371/package.json').write_text(json.dumps(proof,indent=2)+'\n')

# Yacht presentation is outside this bounded Downtown review. Original art/code remain in dist.
for name in ['yacht-city195.webp','yacht-deck195.webp','yacht-lounge195.webp']:
 p=out/'assets'/name
 if p.exists():p.unlink()
proof['excludedLaterLevelPresentation']=['yacht-view195.js']
proof['expandedFilesBytes']=sum(p.stat().st_size for p in out.rglob('*') if p.is_file())
(R/'reports371/package.json').write_text(json.dumps(proof,indent=2)+'\n')
