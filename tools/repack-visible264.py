from pathlib import Path
from PIL import Image
import hashlib,json,io
R=Path(__file__).resolve().parents[1];dest=R/'art-source264/storage-originals';dest.mkdir(exist_ok=True);rows=[];saved=0
# Storage-only encoder optimization; all visible RGBA and alpha must be byte-identical.
paths=['financial-crash-frontage-v1.webp','estates-avenue196.webp','estates-rear196.webp','hydro/pressure-gallery243.webp','estates-front196.webp','downtown-night-stage-v1.webp','mall-b155.webp','hotel-back-alley66.webp','uptown-block-c155.webp','uptown-block-a155.webp','grand-hotel-lobby96.webp','uptown-block-b155.webp','estates-spa196.webp']
for name in paths:
 p=R/'dist/assets'/name;old=p.read_bytes();im=Image.open(p).convert('RGBA');b=io.BytesIO();im.save(b,'WEBP',lossless=True,quality=100,method=6,exact=True);data=b.getvalue()
 if len(data)>=len(old):continue
 candidate=Image.open(io.BytesIO(data)).convert('RGBA');assert candidate.size==im.size and candidate.tobytes()==im.tobytes()
 (dest/name.replace('/','-')).write_bytes(old);p.write_bytes(data);saved+=len(old)-len(data);rows.append(dict(path=str(p.relative_to(R)),before=hashlib.sha256(old).hexdigest(),after=hashlib.sha256(data).hexdigest(),saved=len(old)-len(data),rgbaIdentical=True,width=im.width,height=im.height));print(name,saved,flush=True)
 if saved>=300000:break
(R/'reports264/lossless-storage.json').write_text(json.dumps(dict(savedBytes=saved,proof='Identical decoded full RGBA, alpha and dimensions; no art/screenshot approval.',assets=rows),indent=2))
p=R/'qa/system242/asset-inventory.json';d=json.loads(p.read_text())
for q in rows:
 for a in d['assets']:
  if a['path']==q['path']:a['sha256']=q['after'];a['storageEvidence264']='reports264/lossless-storage.json'
p.write_text(json.dumps(d,indent=2)+'\n')
