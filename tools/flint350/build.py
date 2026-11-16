"""Reproducible Nightshade348 Downtown review artifact; full campaign stays in editable dist."""
from pathlib import Path
import subprocess,re,json,shutil
R=Path(__file__).resolve().parents[2]
subprocess.run(['python',str(R/'tools/resolution342/build.py')],cwd=R,check=True)
out=R/'out'
exclude={'hydro-view243.js','subway-view238.js','subway-ui238.js','subway-audio238.js','baylor-data237.js','baylor-view237.js','fans-data237.js','fans332-data.js','stadium313-data.js','stadium-view237.js','style310-data.js','style310.js','airport332-data.js','airport-view309.js','airport-weather312.js','airport-view312.js','reina312-data.js','reina-view312.js','reina-dive313-data.js','reina-view313.js','unique311-data.js','unique-view311.js'}
h=(R/'dist/downtown350.html').read_text()
h=re.sub(r'<script src="([^"?]+)(?:\?[^\"]*)?"></script>',lambda m:'' if m[1] in exclude else m[0],h)
# Only the declared entry point ships. Unsupported legacy pages must not expose removed asset paths.
for f in out.glob('*.html'):f.unlink()
(out/'index.html').write_text(h);(out/'downtown350.html').write_text(h)
for name in ['hydro','subway','stadium','stadium313','style310']:
 p=out/'assets'/name
 if p.exists():shutil.rmtree(p)
# Superseded facade atlases are not preloaded by the350 entry. Historical source stays intact.
for name in ['streets.webp','nightstreets.webp','hotel.webp','frontages.webp']:
 p=out/'assets/downtown345'/name
 if p.exists():p.unlink()
# Browser controller links point back to the same supported entry point.
(out/'START-WINDOWS.bat').write_text('@echo off\r\ncd /d "%~dp0"\r\necho Open http://127.0.0.1:8000/ in Chrome or Edge.\r\necho Keep this window open while playing. Press Ctrl+C to stop.\r\npy -m http.server 8000 --bind 127.0.0.1\r\npause\r\n')
(out/'START-MAC-LINUX.sh').write_text('#!/bin/sh\ncd "$(dirname "$0")"\npython3 -m http.server 8000 --bind 127.0.0.1\n')
(out/'READ-ME.txt').write_text('URBAN FRACTURE / DOWNTOWN / NIGHTSHADE 350 REVIEW BUILD\nRequires Python 3 and Chrome/Edge. Unzip fully. Windows: double-click START-WINDOWS.bat, then open http://127.0.0.1:8000/ . macOS/Linux: run sh START-MAC-LINUX.sh. Do not use file://. Connect DualSense to YOUR computer, open this local URL in YOUR browser, press a face button, then Options. Use Auto layout; DSX users select virtual Xbox device. Physical hardware remains unverified.\n\nExperimental review build; not stable certification. Full game source is preserved separately. Downtown routes only. New animation poses still require complete artistic review.\n\nSquare/J melee; X/K jump; Triangle/L heal; forward+Triangle flame; Circle/Q drone dodge; tap/release R2/F shot; hold R2+Square/F+J drone charge; hold R2+Circle/F+Q rear missile; L2/G grab; Options/P pause. No Nightshade block/counter. Melee generates energy; drone abilities spend energy.\n')
proof={'scope':'Downtown-only review build; original dist unchanged','excludedPresentationScripts':sorted(exclude),'expandedFilesBytes':sum(p.stat().st_size for p in out.rglob('*') if p.is_file()),'retainedImageCount':len(list((out/'assets').rglob('*.webp')))}
(R/'reports350/package.json').write_text(json.dumps(proof,indent=2)+'\n')
print(json.dumps(proof))
