from pathlib import Path
from PIL import Image
import json,hashlib,subprocess,io
from metadata342 import metadata

def components(im,rect):
 x,y,w,h=rect;a=im.crop((x,y,x+w,y+h)).getchannel('A');seen=set();parts=[]
 for yy in range(h):
  for xx in range(w):
   if (xx,yy) in seen or a.getpixel((xx,yy))<=100:continue
   todo=[(xx,yy)];seen.add((xx,yy));pts=[]
   while todo:
    u,v=todo.pop();pts.append((u,v))
    for q,r in [(u-1,v),(u+1,v),(u,v-1),(u,v+1)]:
     if 0<=q<w and 0<=r<h and (q,r) not in seen and a.getpixel((q,r))>100:seen.add((q,r));todo.append((q,r))
   if len(pts)>100:parts.append(dict(pixels=len(pts),bounds=[min(q[0] for q in pts),min(q[1] for q in pts),max(q[0] for q in pts)+1,max(q[1] for q in pts)+1]))
 return sorted(parts,key=lambda q:-q['pixels'])
def probe(im,f):
 x,y,w,h=f['rect'];hx,hy,r=f['head'];parts=components(im,f['rect']);headOpaque=0<=hx<w and 0<=hy<h and im.getpixel((x+hx,y+hy))[3]>100
 return parts,headOpaque
refs=json.loads(Path('qa/system242/workers246-reference.json').read_text())['rows'];old=json.loads(Path('reports246/worker-metadata-corrections.json').read_text());rows=[];fail=[];detected=[]
for name in ['regular','heavy']:
 p=Path(f'dist/worker-{name}233-data.js');d=metadata(str(p),f'WorkerArt233.{name}','44d5352a');src='dist/'+d['src'];source_bytes=subprocess.check_output(['git','show','44d5352a:'+src]);im=Image.open(io.BytesIO(source_bytes)).convert('RGBA');digest=hashlib.sha256(source_bytes).hexdigest()
 for i,f in enumerate(d['frames']):
  ref=next(q for q in refs if q['variant']==name and q['frame']==i);parts,headOpaque=probe(im,f);x,y,w,h=f['rect'];world=[x+f['root'][0],y+f['root'][1]];key=name+':'+str(i)
  if len(parts)!=1:fail.append(key+' detached sprite component')
  if not parts or parts[0]['pixels']!=ref['opaqueBodyPixels']:fail.append(key+' connected body pixels changed')
  if world!=ref['worldRoot']:fail.append(key+' ground root changed')
  if digest!=ref['sourceSHA256']:fail.append(key+' source pixels changed; review required')
  if not headOpaque:fail.append(key+' head accessory anchor is transparent/outside frame')
  if f['head']!=ref['head']:fail.append(key+' measured head anchor changed')
  before=next(q['before'] for q in old if q['variant']==name and q['frame']==i);bp,bh=probe(im,before)
  if len(bp)>1 or not bh:detected.append(dict(id=key,detached=len(bp)>1,headInTransparentPixels=not bh))
  rows.append(dict(variant=name,frame=i,rect=f['rect'],root=f['root'],head=f['head'],components=parts,headOpaque=headOpaque,worldRoot=world,sourceSHA256=digest))
assert any(q['detached'] for q in detected),'known adjacent-feet mutation must be detected'
assert any(q['headInTransparentPixels'] for q in detected),'known floating accessory mutation must be detected'
Path('reports246/worker-reaction-components.json').write_text(json.dumps(dict(rows=rows,failures=fail,knownDefectsDetected=detected),indent=2)+'\n');print(json.dumps(dict(frames=len(rows),failures=fail,knownDefectsDetected=len(detected))));assert not fail,fail
# Current330 artwork supersedes the246 sheet. Preserve current pixels and inspect
# every current pose for the same connected-body and ground-root invariants.
import numpy as np
from scipy import ndimage
current=[]
for name in ['regular','heavy']:
 d=metadata(f'dist/worker-{name}233-data.js',f'WorkerArt233.{name}');src='dist/'+d['src'].split('?')[0];b=Path(src).read_bytes();assert b==subprocess.check_output(['git','show','09bb59f80b054cbd2bacdfa0840cecc74cae2027:'+src]),'current art changed without review'
 im=Image.open(io.BytesIO(b)).convert('RGBA');assert len(d['frames330'])==32
 for i,f in enumerate(d['frames330']):
  x,y,w,h=f['rect'];a=np.array(im.crop((x,y,x+w,y+h)))[:,:,3]>100;lab,n=ndimage.label(a,np.ones((3,3)));sizes=np.bincount(lab.ravel())[1:];assert sum(sizes>100)==1,(name,i,'detached body');assert f['root'][1]==h and 0<=f['root'][0]<=w,(name,i,'invalid sole root');assert a[-1].any(),(name,i,'floating last row');current.append(dict(variant=name,frame=i,bodyPixels=int(a.sum()),ground=f['root']))
Path('reports342/worker-current.json').write_text(json.dumps(dict(historical246NegativeControls=True,currentFrames=current,artUnchanged=True,artisticReview='not granted by this structural test'),indent=2)+'\n');print('PASS current330 worker structural continuity: 64 poses; historical246 negative controls retained')
