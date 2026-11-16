from pathlib import Path
from PIL import Image
from scipy import ndimage
import numpy as np,json
R=Path(__file__).resolve().parents[1];im=Image.open(R/'art-source255/handgun.png').convert('RGBA');W,H=im.size;cells=[]
for n in range(8):
 rect=[round(n%4*W/4),round(n//4*H/2),round((n%4+1)*W/4),round((n//4+1)*H/2)]
 a=np.array(im.crop(rect));labels,_=ndimage.label(a[:,:,3]>=128,np.ones((3,3)));sizes=np.bincount(labels.ravel());sizes[0]=0;keep=labels==sizes.argmax();a[~keep]=0;ys,xs=np.where(keep);box=[int(xs.min()),int(ys.min()),int(xs.max()+1),int(ys.max()+1)];crop=Image.fromarray(a).crop(box);cells.append((crop,rect,box))
scale=123/cells[0][0].height;frames=[]
for n,(crop,rect,box) in enumerate(cells):
 if n==7:
  frames.append(json.loads((R/'dist/nightshade-art252.js').read_text().split('=',1)[1].strip().rstrip(';'))['frames'][16]);continue
 p=R/f'dist/assets/nightshade255/gun-{n}.webp';p.parent.mkdir(exist_ok=True);crop.save(p,'WEBP',lossless=True,quality=100,method=6,exact=False)
 # Waist root is independent of the extended pistol and reaches.
 row=np.array(crop)[:,:,3][round(crop.height*.48)]>0;xs=np.where(row)[0];groups=np.split(xs,np.where(np.diff(xs)>1)[0]+1);waist=max(groups,key=len);ax=float((waist[0]+waist[-1])/2)
 frames.append(dict(src=str(p.relative_to(R/'dist'))+'?v=255',w=crop.width,h=crop.height,ax=ax,ay=crop.height,scale=scale,kind='handgun',index=n))
# Authored horizontal aim barrel tip in source frame3: last opaque barrel pixels at local y~65.
q=frames[3];q['mx']=q['w']-2;q['my']=67
meta=dict(frames=frames,policy='Fixed source-atlas scale; root at waist; sole anchor; muzzle authored on aim frame3.')
(R/'dist/nightshade-gun-art255.js').write_text('(function(r){r.NightshadeGunArt255='+json.dumps(meta,separators=(',',':'))+';})(typeof window!=="undefined"?window:globalThis);\n')
(R/'reports255/art-import.json').write_text(json.dumps(dict(**meta,cells=[dict(rect=r,component=b) for _,r,b in cells]),indent=2))
print(sum(p.stat().st_size for p in (R/'dist/assets/nightshade255').glob('*')))
