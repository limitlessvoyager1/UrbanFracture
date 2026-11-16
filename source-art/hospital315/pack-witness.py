"""Pack three original witness poses with a common anatomical scale and ground anchor."""
from pathlib import Path
from PIL import Image
from scipy.ndimage import label,find_objects
import numpy as np,json,shutil
ROOT=Path(__file__).resolve().parents[2];src=Path(__file__).with_name('witness-original.png')
cache=Path('/workspace/scratch/96a3e452279b/generated_images/exec-33cdfbdf-a6d0-4a78-9e8b-33d81c12e90f.png')
if not src.exists():shutil.copy2(cache,src)
a=np.array(Image.open(src).convert('RGBA'));a[a[:,:,3]<128]=0;l,n=label(a[:,:,3]>128);counts=np.bincount(l.ravel());keep=sorted(range(1,n+1),key=lambda j:counts[j],reverse=True)[:3];a[~np.isin(l,keep)]=0
objects=find_objects(l);poses=sorted(keep,key=lambda j:objects[j-1][1].start);scale=160/692;atlas=Image.new('RGBA',(540,176),(0,0,0,0));frames=[]
for i,(j,key,root) in enumerate(zip(poses,['hostage','speaking','deceased'],[362,1045,1794])):
 y,x=objects[j-1];im=Image.fromarray(a[y.start:y.stop,x.start:x.stop]);w=round(im.width*scale);h=round(im.height*scale);im=im.resize((w,h),Image.Resampling.LANCZOS);pix=np.array(im);pix[pix[:,:,3]<64]=0;im=Image.fromarray(pix)
 ax=round((root-x.start)*scale);left=i*180+90-ax;top=170-h;atlas.alpha_composite(im,(left,top));frames.append({'key':key,'rect':[i*180,0,180,176],'ax':90,'ay':170,'bounds':[left-i*180,top,w,h],'sourceBounds':[x.start,y.start,x.stop,y.stop],'sourceGroundRoot':[root,y.stop]})
p=ROOT/'dist/assets/hospital315-witness.webp';atlas.save(p,quality=88,method=6)
data={'src':'assets/hospital315-witness.webp','width':540,'height':176,'scale':148/160,'anatomicalHeight':148,'frames':frames}
(ROOT/'dist/hospital315-witness-data.js').write_text('globalThis.Hospital315WitnessArt='+json.dumps(data,separators=(',',':'))+';\n')
Path(__file__).with_name('witness-metadata.json').write_text(json.dumps(data,indent=2)+'\n')
assert p.stat().st_size<=38000,p.stat().st_size
print('witness bytes',p.stat().st_size);print(json.dumps(data,indent=2))
