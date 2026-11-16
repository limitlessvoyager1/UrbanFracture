# Storage-only: preserve every line break and all non-comment bytes; save reversible evidence.
from pathlib import Path
import re,json,hashlib
R=Path(__file__).resolve().parents[1]
if (R/'reports269/comment-storage.json').exists():raise SystemExit('Evidence exists; do not overwrite archived comments.')
proof=R/'reports266/header-storage.json';d=json.loads(proof.read_text());rows=[]
for p in (R/'dist').glob('*.js'):
 s=p.read_text();lines=s.splitlines(keepends=True);removed=[]
 for n,line in enumerate(lines):
  if line.lstrip().startswith('//') and not re.search('copyright|license|sourceMappingURL',line,re.I):
   removed.append({'line':n,'text':line.rstrip('\r\n')});lines[n]='\n' if line.endswith('\n') else ''
 if not removed:continue
 new=''.join(lines);path=str(p.relative_to(R));q=next((q for q in d['files'] if q['path']==path),None)
 if q:d['files'].remove(q);d['savedBytes']-=q['savedBytes']
 p.write_text(new);rows.append({'path':path,'before':hashlib.sha256(s.encode()).hexdigest(),'after':hashlib.sha256(new.encode()).hexdigest(),'removed':removed,'saved':len(s.encode())-len(new.encode())})
(R/'reports269/comment-storage.json').write_text(json.dumps({'reason':'Hosting cap. Project-internal full-line comments archived, line breaks/non-comment bytes retained. No license removal.','files':rows},indent=2)+'\n');proof.write_text(json.dumps(d,indent=2)+'\n');print('saved',sum(q['saved'] for q in rows),'bytes; retained header proofs',len(d['files']))
