from pathlib import Path
from PIL import Image
from scipy.ndimage import label,find_objects
import numpy as np,json
R=Path(__file__).resolve().parents[1];a=np.array(Image.open(R/'art-source274/carmen-recoil.png').convert('RGBA'));l,n=label(a[:,:,3]>=128);boxes=[]
for j,b in enumerate(find_objects(l)):
 if b and (l[b]==j+1).sum()>10000:boxes.append((b[1].start,b[0].start,b[1].stop,b[0].stop))
boxes.sort();assert len(boxes)==3;k=135.3/(boxes[2][3]-boxes[2][1]);out=R/'dist/assets/reaction274';out.mkdir(exist_ok=True);d=[]
for i,b in enumerate(boxes):
 x,y,r,z=b;q=a[y:z,x:r].copy();q[:,:,3]=np.where(q[:,:,3]>=128,255,0);q[q[:,:,3]==0]=0;_,foot=np.where(q[-5:,:,3]>0);ax=(foot.min()+foot.max())/2*k;im=Image.fromarray(q).resize((round((r-x)*k),round((z-y)*k)),Image.Resampling.NEAREST);bb=im.getchannel('A').getbbox();im=im.crop((0,0,im.width,bb[3]));p=out/f'carmen-{i}.webp';im.save(p,'WEBP',quality=90,method=6);d.append(dict(src='assets/reaction274/'+p.name+'?v=274',w=im.width,h=im.height,ax=ax,ay=im.height,scale=k,sourceBox=b))
(R/'dist/carmen-recoil274-data.js').write_text('window.CarmenRecoil274Data='+json.dumps(d,separators=(',',':'))+';\n');print(d)
