"""Import generated, pose-matched replacement art. Uniform fit, existing canvas/anchors retained."""
from pathlib import Path
import json,hashlib,sys
from PIL import Image
import numpy as np
from scipy.ndimage import label,find_objects
R=Path(__file__).resolve().parents[1];oldProof={q['path']:q for q in json.loads((R/'reports271/import.json').read_text())['frames']} if (R/'reports271/import.json').exists() else {};manifest=json.loads(Path(sys.argv[1]).read_text());proof=[];seen=set()
def data(name):
 s=(R/'dist'/name).read_text();return json.loads(s[s.index('{'):s.rfind('}')+1])
def cells(path,rows):
 im=Image.open(path).convert('RGBA');a=np.array(im); mask=a[:,:,3]>=128;labels,n=label(mask);boxes=find_objects(labels);out={}
 # One connected full body per cell; weak edge/speck islands do not set crop bounds.
 for j,b in enumerate(boxes):
  if b is None:continue
  yy,xx=b;area=int((labels[b]==j+1).sum())
  if area<350:continue
  cx=(xx.start+xx.stop)/2;cy=(yy.start+yy.stop)/2;i=min(rows-1,int(cy/(im.height/rows)))*4+min(3,int(cx/(im.width/4)))
  if i in out and out[i][0]>=area:continue
  out[i]=(area,(xx.start,yy.start,xx.stop,yy.stop))
 return im,{i:im.crop(b) for i,(_,b) in out.items()}
def write(path,cell,w,h,key,n):
 if path in seen:return
 seen.add(path);p=R/'dist'/path;before=hashlib.sha256(p.read_bytes()).hexdigest();original=Image.open(p);assert original.height==h,(path,original.size,(w,h))
 k=(h-2)/cell.height;size=(max(1,round(cell.width*k)),max(1,round(cell.height*k)));q=cell.resize(size,Image.Resampling.NEAREST);qa=np.array(q);qa[:,:,3]=np.where(qa[:,:,3]>=128,255,0);qa[qa[:,:,3]==0]=0;q=Image.fromarray(qa);sole=q.getchannel('A').getbbox()[3];w=max(w,size[0]);out=Image.new('RGBA',(w,h));out.alpha_composite(q,((w-q.width)//2,h-sole));a=np.array(out);a[:,:,3]=np.where(a[:,:,3]>=128,255,0);a[a[:,:,3]==0]=0;out=Image.fromarray(a);out.save(p,'WEBP',quality=88,method=6,exact=True)
 proof.append(dict(path='dist/'+path,before=oldProof.get('dist/'+path,{}).get('before',before),after=hashlib.sha256(p.read_bytes()).hexdigest(),size=[w,h],source=key,frame=n,sourceCrop=list(cell.size),uniformScale=k,imported=list(size),groundGap=0))
D=data('orion205-data.js')
for key,frames in D.items():
 im,cs=cells(manifest[key],4)
 for n,f in enumerate(frames):
  if f:assert n in cs,(key,n);write(f['src'].split('?')[0],cs[n],f['w'],f['h'],key,n)
# Motion frames own reused attack images; art-only pickup/idle/throw uses separate frames.
for file,prefix in [('weapon-motion249.js','motion'),('weapon-art248.js','weapon')]:
 d=data(file)
 for hero in ['orion','orionLeft']:
  key=prefix+'-'+hero;im,cs=cells(manifest[key],2)
  for n,f in enumerate(d[hero]):assert n in cs,(key,n);write(f['src'].split('?')[0],cs[n],f['w'],f['h'],key,n)
(R/'reports271/import.json').write_text(json.dumps(dict(checkpoint='checkpoint-before-orion271',frames=proof),indent=2)+'\n');print('Imported',len(proof),'unique frames; existing dimensions/metadata untouched')
