"""Pack generated assets without changing their painted content; preserve original sources."""
from PIL import Image
from pathlib import Path
import json,shutil,statistics
BASE=Path(__file__).resolve().parents[2]
S=BASE/'source-art/style310';O=BASE/'dist/assets/style310';S.mkdir(exist_ok=True);O.mkdir(exist_ok=True)
calibration={'gait':list(range(8)), 'combat':[0,1,2,3], 'reaction':[15], 'mobility':[7], 'weapons':[0,7,8,15], 'special':[0,3,4,7], 'grab':[0,1,4,7,8,11], 'throws':[0,1,4], 'counter':[0,3,4,7,8,11], 'utility':[7,8,9,11,12]}
def bounds(im):
 a=im.getchannel('A').point(lambda x:255 if x>96 else 0)
 return a.getbbox()
def pack(key,file):
 src=Path(file);shutil.copy2(src,S/(key+'-original.png'));im=Image.open(src).convert('RGBA');w,h=im.size
 # Generated transparency includes invisible matte RGB at alpha1/2. Remove only low-alpha fringe.
 if key not in ['exterior','interior']:
  a=im.getchannel('A').point(lambda v:0 if v<32 else v);im.putalpha(a)
 if key in ['exterior','interior']:
  im.save(O/(key+'.webp'),quality=92,method=6);return None
 if key=='traffic':
  # Authoring may place a wheel across a nominal strip: derive actual separated vehicle bands.
  a=im.getchannel('A');runs=[];rows=[];start=None;last=0
  for yy in range(h):
   count=sum(v>96 for v in a.crop((0,yy,w,yy+1)).getdata())
   if count>12:
    if start is None:start=yy
    last=yy
   elif start is not None and yy-last>8:
    runs.append((start,last+1));start=None
  if start is not None:runs.append((start,last+1))
  runs=sorted(sorted(runs,key=lambda q:q[1]-q[0],reverse=True)[:4])
  assert len(runs)==4,('vehicle bands',runs)
  for top,bottom in runs:
   f=im.crop((0,top,w,bottom));b=bounds(f);rows.append({'rect':[b[0],top+b[1],b[2]-b[0],b[3]-b[1]]})
  im.save(O/(key+'.webp'),quality=93,method=6);return {'src':'assets/style310/'+key+'.webp','frames':rows}
 cols=4;rows=2 if key=='travelers' else 4;cw=w//cols;ch=h//rows;frames=[];heights=[]
 for i in range(cols*rows):
  x=round((i%cols)*w/cols);y=round((i//cols)*h/rows);x1=round((i%cols+1)*w/cols);y1=round((i//cols+1)*h/rows);fw=x1-x;fh=y1-y;f=im.crop((x,y,x1,y1));b=bounds(f)
  assert b,('empty cell',key,i)
  frames.append({'rect':[x,y,fw,fh],'ax':fw*.45,'ay':b[3],'bounds':list(b)})
  heights.append(b[3]-b[1])
 if key=='travelers':scale=151/statistics.median(heights)
 else:scale=148/(ch*.96) # one fixed anatomical scale, never normalize each compressed pose
 im.save(O/(key+'.webp'),quality=95,method=6)
 return {'src':'assets/style310/'+key+'.webp','scale':scale,'canonicalHeight':148,'frames':frames,'sourceSize':[w,h],'calibration':calibration.get(key,[])}
if __name__=='__main__':
 paths=json.loads((S/'generated-paths.json').read_text());data={}
 for key,path in paths.items():
  if key.startswith('joint-'):
   src=Image.open(path).convert('RGBA');shutil.copy2(path,S/(key+'-original.png'));src.putalpha(src.getchannel('A').point(lambda v:0 if v<32 else v));src.save(O/(key+'.webp'),quality=95,method=6);data[key]={'src':'assets/style310/'+key+'.webp'};continue
  q=pack(key,path)
  if q:data[key]=q
 (BASE/'dist/style310-data.js').write_text('globalThis.Style310Data='+json.dumps(data,separators=(',',':'))+';\n')
 (S/'packing.json').write_text(json.dumps(data,indent=2))
 print('Packed',len(paths),'assets')
