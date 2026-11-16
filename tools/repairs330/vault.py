from pathlib import Path
from PIL import Image
from scipy import ndimage
import numpy as np,json
im=Image.open('art-source330/vault.png').convert('RGBA');im=im.resize((round(im.width*.60),round(im.height*.60)),Image.Resampling.LANCZOS);W,H=im.size;cells=[]
for n in range(12):
 rect=[round(n%4*W/4),round(n//4*H/3),round((n%4+1)*W/4),round((n//4+1)*H/3)];a=np.array(im.crop(rect));lab,_=ndimage.label(a[:,:,3]>=128,np.ones((3,3)));cnt=np.bincount(lab.ravel());cnt[0]=0;a[lab!=cnt.argmax()]=0;ys,xs=np.where(a[:,:,3]>=128);box=[int(xs.min()),int(ys.min()),int(xs.max()+1),int(ys.max()+1)];cells.append(Image.fromarray(a).crop(box))
ref=cells[0].height;out=Path('dist/assets/nightshade329');out.mkdir(exist_ok=True);data=[]
# Anatomical hip anchors and paired upper-back attachment points, manually reviewed.
hips=[.41,.46,.43,.49,.40,.43,.43,.43,.43,.43,.43,.43]
for n,q in enumerate(cells):
 path=out/f'{n}.webp';q.save(path,'WEBP',quality=78,method=6)
 data.append(dict(src=f'assets/nightshade329/{n}.webp?v=330',w=q.width,h=q.height,ax=q.width*hips[n],ay=q.height,scale=123/ref,kind='throw329',grip=[q.width*.88,q.height*(.32 if n<3 else .43 if n<5 else .28)]))
atlas=Image.new('RGBA',(max(q.width for q in cells)*4,max(q.height for q in cells)*3));cw=atlas.width//4;ch=atlas.height//3
for n,q in enumerate(cells):
 atlas.paste(q,((n%4)*cw,(n//4)*ch));data[n]['src']='assets/nightshade329/throw.webp?v=330';data[n]['rect']=[(n%4)*cw,(n//4)*ch,q.width,q.height]
atlas.save(out/'throw.webp','WEBP',quality=78,method=6)
for old in out.glob('[0-9]*.webp'):old.unlink()
p=Path('dist/nightshade-grab-art258.js');p.write_text(p.read_text().split('\nNightshadeMeleeArt257.throw329=')[0]+'\nNightshadeMeleeArt257.throw329='+json.dumps(data,separators=(',',':'))+';\n')
Path('reports330/vault-import.json').write_text(json.dumps(data,indent=2));print('New assets',sum(p.stat().st_size for p in out.iterdir()))
