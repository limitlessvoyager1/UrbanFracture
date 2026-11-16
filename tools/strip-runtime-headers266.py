# Packaging storage only: remove leading project comments, preserve executable source byte-for-byte.
from pathlib import Path
import re,json,hashlib
r=Path(__file__).resolve().parents[1];rows=[]
if (r/'reports266/header-storage.json').exists():raise SystemExit('Storage proof already exists; retain its original headers rather than overwriting it.')
for p in sorted((r/'dist').glob('*.js')):
 if p.name in ['game.js','audit-view135.js','stats266.js','stats-ui266.js','playback265.js']:continue
 data=p.read_text();m=re.match(r'\s*/\*.*?\*/',data,re.S)
 if not m or re.search('copyright|license|SPDX',m[0],re.I):continue
 body=data[m.end():];p.write_text(body);rows.append(dict(path=str(p.relative_to(r)),header=m[0],bodySHA256=hashlib.sha256(body.encode()).hexdigest(),savedBytes=len(m[0].encode())))
(r/'reports266/header-storage.json').write_text(json.dumps(dict(reason='Hosting expanded-tar cap. Leading internal comments only; all executable body bytes unchanged. Headers retained here and prior Git checkpoint.',savedBytes=sum(q['savedBytes'] for q in rows),files=rows),indent=2)+'\n')
print(len(rows),sum(q['savedBytes'] for q in rows))
