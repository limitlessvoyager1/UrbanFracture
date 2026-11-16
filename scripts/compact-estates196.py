"""Exact visible RGBA legacy PNG→lossless WebP migration for static package capacity."""
from pathlib import Path
from PIL import Image
import numpy as np,json,shutil,re
r=Path(__file__).resolve().parents[1];dist=r/'dist';total=sum(p.stat().st_size for p in dist.rglob('*') if p.is_file());manifest=[];changed=set()
for p in sorted((dist/'assets').rglob('*.png'),key=lambda p:p.stat().st_size,reverse=True):
 if total<261500000:break
 q=p.with_suffix('.webp')
 if q.exists():continue
 im=Image.open(p).convert('RGBA');im.save(q,lossless=True,exact=True);a=np.array(im);b=np.array(Image.open(q).convert('RGBA'));assert np.array_equal(a[:,:,3],b[:,:,3]);mask=a[:,:,3]>0;assert np.array_equal(a[:,:,:3][mask],b[:,:,:3][mask])
 delta=p.stat().st_size-q.stat().st_size
 if delta<100000:q.unlink();continue
 old=p.relative_to(dist).as_posix();new=q.relative_to(dist).as_posix()
 for f in dist.rglob('*'):
  if f.suffix in ['.js','.html','.css']:
   s=f.read_text();t=s.replace(p.name,q.name)
   if t!=s:f.write_text(t);changed.add(f.name)
 dest=r/'art-archive196/lossless-originals'/p.relative_to(dist/'assets');dest.parent.mkdir(parents=True,exist_ok=True);shutil.move(p,dest);total-=delta;manifest.append({'from':old,'to':new,'saved':delta})
for f in dist.rglob('*.html'):
 s=f.read_text()
 for name in changed:
  if name.endswith('.js'):s=re.sub(re.escape(name)+r'\?v=\d+',name+'?v=196',s)
 f.write_text(s)
(r/'art-archive196/lossless-conversions.json').write_text(json.dumps(manifest,indent=2));print('files',len(manifest),'dist bytes',total,'saved',sum(x['saved'] for x in manifest))
