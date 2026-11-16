"""Pack three distinct original energy props; no runtime or existing art changes."""
from pathlib import Path
from PIL import Image
from scipy.ndimage import label,find_objects
import numpy as np,json,shutil
ROOT=Path(__file__).resolve().parents[2];src=Path(__file__).with_name('pickups-original.png');cache=Path('/workspace/scratch/96a3e452279b/generated_images/exec-7f6550d1-d6f3-4d3b-8461-aa35d2d82943.png')
if not src.exists():shutil.copy2(cache,src)
a=np.array(Image.open(src).convert('RGBA'));a[a[:,:,3]<128]=0;l,n=label(a[:,:,3]>128);counts=np.bincount(l.ravel());keep=sorted(range(1,n+1),key=lambda j:counts[j],reverse=True)[:3];a[~np.isin(l,keep)]=0;obs=find_objects(l);poses=sorted(keep,key=lambda j:obs[j-1][1].start)
atlas=Image.new('RGBA',(288,96),(0,0,0,0));frames=[]
for i,(j,key,energy,worldSize) in enumerate(zip(poses,['cell','battery','canister'],[15,35,60],[18,24,30])):
 y,x=obs[j-1];im=Image.fromarray(a[y.start:y.stop,x.start:x.stop]);q=80/max(im.size);w=round(im.width*q);h=round(im.height*q);im=im.resize((w,h),Image.Resampling.LANCZOS);p=np.array(im);p[p[:,:,3]<64]=0;im=Image.fromarray(p);left=i*96+48-w//2;top=90-h;atlas.alpha_composite(im,(left,top));frames.append({'key':key,'energy':energy,'rect':[i*96,0,96,96],'ax':48,'ay':90,'bounds':[left-i*96,top,w,h],'worldSize':worldSize,'scale':worldSize/max(w,h),'sourceBounds':[x.start,y.start,x.stop,y.stop]})
p=ROOT/'dist/assets/energy316-pickups.webp';atlas.save(p,quality=90,method=6);assert p.stat().st_size<=20000,p.stat().st_size
data={'src':'assets/energy316-pickups.webp','width':288,'height':96,'frames':frames,'units':'worldSize is longest opaque edge; common sole anchor is90sourcepixels'}
(ROOT/'dist/energy316-data.js').write_text('globalThis.Energy316Art='+json.dumps(data,separators=(',',':'))+';\n');Path(__file__).with_name('metadata.json').write_text(json.dumps(data,indent=2)+'\n');print('energy pickup bytes',p.stat().st_size);print(json.dumps(data,indent=2))
