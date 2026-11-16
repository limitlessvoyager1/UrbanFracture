from pathlib import Path
from PIL import Image
import numpy as np,json,shutil
from scipy.ndimage import label
R=Path(__file__).resolve().parents[1];S=R/'art-source282';S.mkdir(exist_ok=True);name='exec-231684df-bb4b-48a5-8ed2-8bdb2da4ceaa.png';src=S/'reina-gaits.png'
if not src.exists():shutil.copy2(Path('/workspace/scratch/96a3e452279b/generated_images')/name,src)
im=Image.open(src).convert('RGBA');w,h=im.size;out=R/'dist/assets/reina282';out.mkdir(exist_ok=True);data={'walk':[],'run':[]}
# Same anatomical hand throughout both gait cycles, connected to viewer-side shoulder.
hands=[(166,137),(158,137),(159,137),(157,137),(171,134),(170,137),(169,136),(165,139),(172,126),(176,122),(181,127),(185,124),(174,125),(177,129),(177,133),(185,131)]
pelvis=[178,170,170,169,183,181,180,176,181,180,183,176,184,179,180,182]
scale=148/305
for n in range(16):
 x0=round(n%4*w/4);y0=round(n//4*h/4);x1=round((n%4+1)*w/4);y1=round((n//4+1)*h/4);a=np.array(im.crop((x0,y0,x1,y1)));opaque=a[:,:,3]>=160;components,count=label(opaque);sizes=np.bincount(components.flat);sizes[0]=0;mask=sizes[components]>40;a[:,:,3]=np.where(mask,255,0);a[~mask]=0;ys,xs=np.where(mask);l,t,r,b=int(xs.min()),int(ys.min()),int(xs.max()+1),int(ys.max()+1)
 # Fixed ground line for walk, per-pose foot flight in running; pelvis roots never depend on foot spread.
 rootY=312;rootX=pelvis[n];hx,hy=hands[n];yy,xx=np.where(mask);near=(xx-hx)**2+(yy-hy)**2;j=np.argmin(near);assert near[j]<100,(n,'authored hand misses glove');hx,hy=int(xx[j]),int(yy[j]);q=Image.fromarray(a[t:b,l:r]);q.save(out/f'{n}.webp',quality=87,method=6,exact=True)
 data['walk' if n<8 else 'run'].append(dict(src=f'assets/reina282/{n}.webp?v=282',w=(r-l)*scale,h=(b-t)*scale,ax=(rootX-l)*scale,ay=(rootY-t)*scale,hand=[(hx-rootX)*scale,(hy-rootY)*scale],scale=scale,sourceBox=[x0+l,y0+t,x0+r,y0+b],root=[rootX,rootY],gripSource=[hx,hy],handIdentity='viewer-side/near arm'))
(R/'dist/reina282-data.js').write_text('/* One anatomical import scale and fixed ground line for both gaits. */\nwindow.Reina282Data='+json.dumps(data,separators=(',',':'))+';\n');(R/'reports282/gait-import.json').write_text(json.dumps(data,indent=2)+'\n');print('Gait bytes',sum(p.stat().st_size for p in out.iterdir()))
