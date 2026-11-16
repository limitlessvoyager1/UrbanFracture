from pathlib import Path
from PIL import Image
from scipy import ndimage
import numpy as np,json,hashlib
R=Path(__file__).resolve().parents[1];out=R/'dist/assets/nightshade257';out.mkdir(exist_ok=True);D={};proof=[]
# Source-cell authored root and contact anchors, not invented radius-only contacts.
hips=[(.46,.55),(.43,.60),(.44,.58),(.44,.60),(.44,.58),(.42,.60),(.42,.60),(.46,.60),(.40,.55),(.42,.65),(.44,.52),(.42,.60),(.44,.62),(.44,.64)]
contacts={0:((.29,.55),(.14,.76)),1:((.23,.22),(.52,.01)),2:((.67,.30),(.90,.16)),3:((.28,.49),(.10,.63)),4:((.68,.30),(.96,.30)),8:((.40,.55),(.91,.48)),10:((.44,.52),(.82,.44)),11:((.42,.60),(.86,.32)),12:((.28,.15),(.59,.01)),13:((.58,.63),(.97,.96))}
for kind,rows,cols,count in [('main',4,4,14),('grab',2,4,8),('pen',1,2,2)]:
 source=R/('art-source257/melee.png' if kind=='main' else f'art-source257/{kind}.png');im=Image.open(source).convert('RGBA')
 # New pen artwork is twice the other source atlases' density. One uniform atlas reduction,
 # still ~430px/adult; no accepted art or per-frame anatomy normalization is changed.
 if kind=='pen':im=im.resize((im.width//2,im.height//2),Image.Resampling.LANCZOS)
 W,H=im.size;cells=[]
 for n in range(count):
  rect=[round(n%cols*W/cols),round(n//cols*H/rows),round((n%cols+1)*W/cols),round((n//cols+1)*H/rows)];a=np.array(im.crop(rect));mask=a[:,:,3]>=128;labels,_=ndimage.label(mask,np.ones((3,3)));sizes=np.bincount(labels.ravel());sizes[0]=0;keep=labels==sizes.argmax();a[~keep]=0;ys,xs=np.where(keep);box=[int(xs.min()),int(ys.min()),int(xs.max()+1),int(ys.max()+1)];crop=Image.fromarray(a).crop(box);cells.append((crop,rect,box))
 ref=cells[0][0].height;scale=123/ref;D[kind]=[]
 for n,(crop,rect,box) in enumerate(cells):
  cw,ch=rect[2]-rect[0],rect[3]-rect[1]
  local=lambda xy:[xy[0]*cw-box[0],xy[1]*ch-box[1]]
  hip=local(hips[n] if kind=='main' else (.46,.48) if kind=='grab' else (.53,.45) if n==0 else (.60,.45))
  ax=hip[0];ay=crop.height
  if kind in ['grab','pen'] or kind=='main' and n not in [7,8,10,11,12]:
   row=np.array(crop)[:,:,3][round(crop.height*(.60 if kind=='main' and n==9 else .50 if kind=='main' else .45))]>128;xs=np.where(row)[0];groups=np.split(xs,np.where(np.diff(xs)>1)[0]+1);waist=max(groups,key=len);ax=float((waist[0]+waist[-1])/2)
  if kind=='main' and n in [7,8,10,11,12]:ay=hip[1]+(cells[0][0].height-(.55*ch-cells[0][2][1]))
  q=dict(src=f'assets/nightshade257/{kind}-{n}.webp?v=257',w=crop.width,h=crop.height,ax=ax,ay=ay,scale=scale,kind=kind,index=n)
  if kind=='main':
   if n in contacts:q['hand'],q['tip']=map(local,contacts[n])
   if n in [5,6]:q['wrist']=local((.68,.30))
  elif kind=='grab':q['grip']=local((.84,.25));q['hand']=local((.73,.30))
  else:q['hand']=local((.62,.28) if n==0 else (.58,.20));q['tip']=local((.71,.22) if n==0 else (.70,.20))
  ys,xs=np.where(np.array(crop)[:,:,3]>128);snap={}
  for key in ['hand','tip','wrist','grip']:
   if key in q:
    v=q[key];dist=(xs-v[0])**2+(ys-v[1])**2;j=int(dist.argmin());q[key]=[int(xs[j]),int(ys[j])];snap[key]=round(float(dist[j]**.5),2)
  p=R/'dist'/q['src'].split('?')[0];crop.save(p,'WEBP',quality=90,method=6,exact=False);D[kind].append(q);proof.append(dict(**q,source=str(source.relative_to(R)),sourceSHA256=hashlib.sha256(source.read_bytes()).hexdigest(),sourceRect=rect,componentRect=box,sourceDensityFactor=.5 if kind=='pen' else 1,anchorSnapDistances=snap))
(R/'dist/nightshade-melee-art257.js').write_text('(function(r){r.NightshadeMeleeArt257='+json.dumps(D,separators=(',',':'))+';})(typeof window!=="undefined"?window:globalThis);\n');(R/'reports257/art-import.json').write_text(json.dumps(dict(frames=proof,encoding='WebP90 with alpha; new review-candidate artwork only; approved artwork unchanged.'),indent=2)+'\n');print('frames',len(proof),'runtimeBytes',sum(p.stat().st_size for p in out.glob('*.webp')))
