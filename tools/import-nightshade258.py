from pathlib import Path
from PIL import Image
from scipy import ndimage
import numpy as np,json,hashlib
R=Path(__file__).resolve().parents[1];im=Image.open(R/'art-source258/grabs.png').convert('RGBA');W,H=im.size;out=R/'dist/assets/nightshade258';out.mkdir(exist_ok=True);cells=[]
for n in range(12):
 rect=[round(n%4*W/4),round(n//4*H/3),round((n%4+1)*W/4),round((n//4+1)*H/3)];a=np.array(im.crop(rect));lab,_=ndimage.label(a[:,:,3]>=128,np.ones((3,3)));counts=np.bincount(lab.ravel());counts[0]=0;keep=lab==counts.argmax();a[~keep]=0;ys,xs=np.where(keep);box=[int(xs.min()),int(ys.min()),int(xs.max()+1),int(ys.max()+1)];cells.append((Image.fromarray(a).crop(box),rect,box))
ref=cells[0][0].height;D=[];proof=[]
hips=[(.44,.57),(.40,.68),(.43,.56),(.45,.65),(.45,.64),(.45,.60),(.48,.66),(.45,.67),(.40,.64),(.49,.40),(.53,.78),(.46,.78)]
grips=[(.65,.47),(.57,.73),(.72,.50),(.60,.76),(.75,.53),(.25,.18),(.59,.41),(.80,.50),(.22,.70),(.12,.58),(.68,.68),(.68,.70)]
for n,(crop,rect,box) in enumerate(cells):
 cw,ch=rect[2]-rect[0],rect[3]-rect[1];local=lambda p:[p[0]*cw-box[0],p[1]*ch-box[1]];hip=local(hips[n]);ax=hip[0];ay=crop.height
 if n in [8,9]:ay=hip[1]+ref*.43
 q=dict(src=f'assets/nightshade258/grab-{n}.webp?v=258',w=crop.width,h=crop.height,ax=ax,ay=ay,scale=123/ref,kind='grabs258',index=n)
 ys,xs=np.where(np.array(crop)[:,:,3]>=128);v=local(grips[n]);j=int(((xs-v[0])**2+(ys-v[1])**2).argmin());q['grip']=[int(xs[j]),int(ys[j])]
 p=out/f'grab-{n}.webp';crop.save(p,'WEBP',quality=84,method=6);D.append(q);proof.append(dict(**q,bytes=p.stat().st_size,sha256=hashlib.sha256(p.read_bytes()).hexdigest(),sourceCell=rect,crop=box))
(R/'dist/nightshade-grab-art258.js').write_text('(function(r){r.NightshadeMeleeArt257.grabs258='+json.dumps(D,separators=(',',':'))+';})(typeof window!=="undefined"?window:globalThis);\n')
(R/'reports258/art-import.json').write_text(json.dumps(dict(frames=proof,totalBytes=sum(q['bytes'] for q in proof),referenceHeight=ref,policy='One fixed source scale, approved144 presentation factor; no per-pose normalization. Review candidates, not approved baselines.'),indent=2)+'\n')
print('12 combat frames:',sum(q['bytes'] for q in proof),'bytes')
# Two-frame elbow revision; standing reference establishes a single scale for this source atlas.
src=R/'art-source258/elbow.png';im=Image.open(src).convert('RGBA');im=im.resize((round(im.width*.55),round(im.height*.55)),Image.Resampling.LANCZOS);W,H=im.size;extra=[]
for n in range(3):
 rect=[round(n*W/3),0,round((n+1)*W/3),H];a=np.array(im.crop(rect));lab,_=ndimage.label(a[:,:,3]>=128,np.ones((3,3)));cnt=np.bincount(lab.ravel());cnt[0]=0;keep=lab==cnt.argmax();a[~keep]=0;ys,xs=np.where(keep);box=[int(xs.min()),int(ys.min()),int(xs.max()+1),int(ys.max()+1)];extra.append((Image.fromarray(a).crop(box),rect,box))
for n in [1,2]:
 crop,rect,box=extra[n];idx=11+n;ax=crop.width*.48;ay=crop.height;q=dict(src=f'assets/nightshade258/grab-{idx}.webp?v=258',w=crop.width,h=crop.height,ax=ax,ay=ay,scale=123/extra[0][0].height,kind='grabs258',atlas='elbow',index=idx,grip=[crop.width*.7,crop.height*.7]);p=out/f'grab-{idx}.webp';crop.save(p,'WEBP',quality=84,method=6);D.append(q);proof.append(dict(**q,bytes=p.stat().st_size,sha256=hashlib.sha256(p.read_bytes()).hexdigest(),sourceCell=rect,crop=box))
for q in D:q.setdefault('atlas','grabs')
(R/'dist/nightshade-grab-art258.js').write_text('(function(r){r.NightshadeMeleeArt257.grabs258='+json.dumps(D,separators=(',',':'))+';})(typeof window!=="undefined"?window:globalThis);\n')
(R/'reports258/art-import.json').write_text(json.dumps(dict(frames=proof,totalBytes=sum(q['bytes'] for q in proof),referenceHeight=ref,elbowReference=extra[0][0].height,policy='Fixed scale per source atlas from standing reference; approved144 factor. No per-pose normalization or baseline approval.'),indent=2)+'\n')
print('14 final combat frames:',sum(q['bytes'] for q in proof),'bytes')
