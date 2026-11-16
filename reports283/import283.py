from pathlib import Path
from PIL import Image
import numpy as np,json,shutil
from scipy.ndimage import label
root=Path(__file__).resolve().parents[1];src=root/'art-source283';out=root/'dist/assets/niko283';src.mkdir(exist_ok=True);out.mkdir(exist_ok=True)
gen=Path('/workspace/scratch/96a3e452279b/generated_images')
files={'niko':'exec-d9bf9335-386e-4afb-a8d1-31301100386b.png','marcus':'exec-dad8114c-1e25-454f-b363-f643f9596e61.png','kick':'exec-2353bbeb-d15e-4c65-a5f4-a6f2a6e32a36.png','stomp':'exec-a148fc56-b22d-4627-bd0b-0fe4ac026015.png'}
# Anatomical source scale and local contact sockets, authored against the original cells.
points={'niko':[(224,99),(192,99),(201,54),(182,41),(223,174),(160,210),(196,181),(157,129),(196,104),(137,159),(89,166),(118,221),(205,235),(85,155),(80,165),(194,173)],'marcus':[(145,100),(145,102),(135,20),(136,18),(69,23),(57,55),(100,150),(105,246),(56,130),(75,138),(86,133),(150,150),(195,150),(106,72),(147,184),(53,113)]}
roots={'niko':[150,156,143,151,137,150,155,150,151,151,144,146,150,150,149,150], 'marcus':[151,151,151,155,149,149,155,155,151,151,151,151,151,151,151,151]}
D={}
for key,name in files.items():
 shutil.copy(gen/name,src/(key+'.png'));im=Image.open(src/(key+'.png')).convert('RGBA');rows=2 if key in ['kick','stomp'] else 4;cols=2 if key=='stomp' else 4;cw=im.width/cols;ch=im.height/rows;k={'niko':150/310,'marcus':140/283,'kick':140/421,'stomp':150/565}[key];D[key]=[]
 for n in range(rows*cols):
  cell=im.crop((round(n%cols*cw),round(n//cols*ch),round((n%cols+1)*cw),round((n//cols+1)*ch)));arr=np.array(cell);mask=arr[:,:,3]>128;labs,num=label(mask);sizes=np.bincount(labs.ravel());sizes[0]=0;keep=sizes>=35;mask=keep[labs];arr[:,:,3]=np.where(mask,255,0);ys,xs=np.where(mask);l,r,t,b=int(xs.min()),int(xs.max()+1),int(ys.min()),int(ys.max()+1);crop=Image.fromarray(arr).crop((l,t,r,b));factor=min(1,224/(310 if key=='niko' else 283 if key=='marcus' else 565 if key=='stomp' else 421));crop=crop.resize((round(crop.width*factor),round(crop.height*factor)),Image.Resampling.LANCZOS);crop.putalpha(crop.getchannel('A').point(lambda a:255 if a>=128 else 0));p=out/f'{key}-{n}.webp';crop.save(p,quality=88,method=6,exact=True)
  ax=([330,350,330,320][n] if key=='stomp' else roots.get(key,[225]*8)[n]);q=dict(src=str(p.relative_to(root/'dist')),w=(r-l)*k,h=(b-t)*k,ax=(ax-l)*k,ay=(b-t)*k,sourceBox=[l,t,r,b],sourceScale=k,sourceRoot=[ax,b],facing=-1 if key=='marcus' and n in [0,1,5,6,7,13,14,15] else 1)
  if key in points:q['hand']=[(points[key][n][0]-ax)*k,(points[key][n][1]-b)*k];q['contactSource']=points[key][n]
  if key=='marcus' and n==12:q['head']=[(275-ax)*k,(205-b)*k]
  if key=='niko' and n==0:q['grip']=[q['hand'][0]+4,q['hand'][1]+17]
  D[key].append(q)
(root/'dist/niko283-data.js').write_text('/* Fixed anatomical source scales and authored wrist/grip sockets; no per-pose fit. */\n(function(r){r.Niko283Data='+json.dumps(D,separators=(',',':'))+';})(globalThis);\n');(root/'reports283/asset-import.json').write_text(json.dumps(D,indent=2)+'\n');print(sum(p.stat().st_size for p in out.iterdir()),'bytes')

# Pack only the two affected legacy Niko atlases, preserving uniform aspect and cell layout.
for name,cols,rows in [('niko-motion185',4,4),('niko-grapples185',4,3)]:
 original=src/(name+'-original.webp');im=Image.open(original).convert('RGBA');dims=(round(im.width*.75/cols)*cols,round(im.height*.75/rows)*rows);assert abs(dims[0]/im.width-dims[1]/im.height)<1e-8
 im=im.resize(dims,Image.Resampling.LANCZOS);im.putalpha(im.getchannel('A').point(lambda a:255 if a>=128 else 0));im.save(root/'dist/assets/sprites'/(name+'.webp'),quality=90,method=6,exact=True)
