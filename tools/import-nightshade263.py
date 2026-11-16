from pathlib import Path
from PIL import Image
import numpy as np,json,hashlib
from scipy import ndimage
R=Path(__file__).resolve().parents[1];im=Image.open(R/'art-source263/specials.png').convert('RGBA');W,H=im.size;cells=[]
for n in range(12):
 rect=[round(n%4*W/4),round(n//4*H/3),round((n%4+1)*W/4),round((n//4+1)*H/3)];a=np.array(im.crop(rect));lab,_=ndimage.label(a[:,:,3]>=128,np.ones((3,3)));cnt=np.bincount(lab.ravel());cnt[0]=0;keep=lab==cnt.argmax();a[~keep]=0;ys,xs=np.where(keep);box=[int(xs.min()),int(ys.min()),int(xs.max()+1),int(ys.max()+1)];cells.append((Image.fromarray(a).crop(box),rect,box))
out=R/'dist/assets/nightshade263';out.mkdir(exist_ok=True);D=[]
# One source scale from standing reference; source anatomy, not per-pose normalized heights.
for n,(crop,rect,box) in enumerate(cells):
 q=dict(src=f'assets/nightshade263/special-{n}.webp?v=263',w=crop.width,h=crop.height,ax=crop.width*.46,ay=crop.height,scale=123/cells[0][0].height,kind='special263',index=n)
 if n==3:q.update(knee=[crop.width*.63,crop.height*.53],toe=[crop.width*.96,crop.height*.94])
 if n==6:q.update(leftHand=[crop.width*.06,crop.height*.30],rightHand=[crop.width*.93,crop.height*.30])
 if n==7:q['muzzle']=[crop.width*.99,crop.height*.17]
 if n==8:q['grip']=[crop.width*.9,crop.height*.20]
 if n==11:
  pts=np.argwhere(np.array(crop)[:,:,3]>=128);hull=__import__('scipy').spatial.ConvexHull(pts[:,::-1]);q['hull262']=pts[:,::-1][hull.vertices].tolist()
 crop.save(out/f'special-{n}.webp','WEBP',quality=84,method=6);D.append(q)
(R/'dist/nightshade-special-art263.js').write_text('(function(r){r.NightshadeMeleeArt257.special263='+json.dumps(D,separators=(',',':'))+';})(typeof window!=="undefined"?window:globalThis);\n')
(R/'reports263/art-import.json').write_text(json.dumps(dict(referenceHeight=cells[0][0].height,frames=D,policy='Fixed scale from standing reference; candidate art, not approved baseline.'),indent=2))
print('Imported12frames',sum(p.stat().st_size for p in out.iterdir()))
