"""Import authored animation cells without downsample/re-enlarge or detached atlas debris."""
from pathlib import Path
from PIL import Image
from scipy import ndimage
import numpy as np,json,hashlib,shutil
R=Path(__file__).resolve().parents[1];D=[];report=[]
for kind,rows,target in [('walk',2,123),('run',2,122),('foundation',3,123)]:
 im=Image.open(R/f'art-source252/{kind}.png').convert('RGBA');W,H=im.size;cells=[]
 for n in range(4*rows):
  rect=[round(n%4*W/4),round(n//4*H/rows),round((n%4+1)*W/4),round((n//4+1)*H/rows)];
  if kind=='foundation' and n==3:rect[0]-=42
  if kind=='foundation' and n==4:rect[2]+=35
  a=np.array(im.crop(rect));mask=a[:,:,3]>=128;labels,total=ndimage.label(mask,np.ones((3,3)));sizes=np.bincount(labels.ravel());sizes[0]=0;keep=labels==sizes.argmax();removed=int(np.count_nonzero(mask&~keep));a[~keep]=0;ys,xs=np.where(keep);b=[int(xs.min()),int(ys.min()),int(xs.max()+1),int(ys.max()+1)];crop=Image.fromarray(a).crop(b);cells.append((crop,b,rect,removed))
 # Single fixed scale for an atlas; never stretch or normalize individual poses.
 ref=cells[0][0].height if kind=='foundation' else float(np.median([q[0].height for q in cells]));scale=target/ref
 for n,(crop,b,rect,removed) in enumerate(cells):
  p=R/f'dist/assets/nightshade252/{kind}-{n}.webp';p.parent.mkdir(exist_ok=True);crop.save(p,'WEBP',lossless=True,quality=100,method=6,exact=False)
  # Measured waist root inside each authored gait cell, avoiding bounding-box root shifts.
  # Grounded gait uses opaque sole contact; no alternating arbitrary vertical offsets.
  ax=crop.width/2
  if kind in ['walk','run']:
   row=np.array(crop.getchannel('A'))[round(crop.height*.48)]>0;xs=np.where(row)[0];groups=np.split(xs,np.where(np.diff(xs)>1)[0]+1);waist=max(groups,key=len);ax=float((waist[0]+waist[-1])/2)
  ay=crop.getchannel('A').getbbox()[3]
  q=dict(src=str(p.relative_to(R/'dist'))+'?v=252',w=crop.width,h=crop.height,ax=ax,ay=ay,scale=scale,kind=kind,index=n);D.append(q);report.append(dict(**q,sourceRect=rect,componentRect=b,detachedPixelsRemoved=removed,sourceSHA256=hashlib.sha256((R/f'art-source252/{kind}.png').read_bytes()).hexdigest()))
meta=dict(frames=D,walk=list(range(8)),run=list(range(8,16)),idle=16,hit=17,fall=18,prone=19,getup=[20,21,22],block=23,jumpUp=24,jumpDown=25,land=26,wrist=27,targetIdleHeight=123,presentationScale253=144/123,presentationHeight253=144)
(R/'dist/nightshade-art252.js').write_text('window.NightshadeArt252='+json.dumps(meta,separators=(',',':'))+';\n');(R/'reports252/art-import.json').write_text(json.dumps(dict(frames=report,policy='Largest connected opaque sprite per authored cell; original native resolution retained; fixed scale per atlas; no per-pose resizing.'),indent=2)+'\n');print('Imported28 native-resolution frames;',sum(p.stat().st_size for p in (R/'dist/assets/nightshade252').glob('*')),'bytes')
