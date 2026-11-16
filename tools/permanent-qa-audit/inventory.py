"""Assignment1 evidence only; no permanent QA feature or source restoration."""
from pathlib import Path
import hashlib,json,collections
root=Path(__file__).resolve().parents[2]; out=root/'reports-permanent-qa-audit';out.mkdir(exist_ok=True)
m=json.loads((root/'EXPORT-MANIFEST.json').read_text()); rows=[]
for item in m['files']:
    p=(root/item['path']).resolve()
    if not p.is_relative_to(root.resolve()):raise ValueError('Manifest path outside project: '+item['path'])
    row={'path':item['path'],'originalBytes':item['bytes']}
    if not p.is_file():row['status']='missing'
    else:
        content=p.read_bytes(); digest=hashlib.sha256(content).hexdigest()
        row.update(status='original-match' if len(content)==item['bytes'] and digest==item['sha256'] else 'changed',currentBytes=len(content),sha256=digest)
    rows.append(row)
counts=collections.Counter(x['status'] for x in rows)
missing=collections.Counter(x['path'].split('/')[0] for x in rows if x['status']=='missing')
report={'manifestCommit':m['commit'],'snapshot':m['snapshot'],'declaredFiles':m['originalTrackedFiles'],'listedFiles':len(rows),'counts':dict(counts),'missingByTopDirectory':dict(missing),'missingBytes':sum(x['originalBytes'] for x in rows if x['status']=='missing'),'rows':rows,'scope':'Original export completeness/hash audit. Changed is not automatically defective: approved repairs must be compared separately. No restoration or checkout performed.'}
(out/'completeness.json').write_text(json.dumps(report,indent=2)+'\n',encoding='utf-8')
print(json.dumps({k:v for k,v in report.items() if k!='rows'},indent=2))
