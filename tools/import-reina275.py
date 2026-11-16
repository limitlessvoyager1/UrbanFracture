from pathlib import Path
from PIL import Image
from scipy.ndimage import label,find_objects
import numpy as np,json
R=Path(__file__).resolve().parents[1];a=np.array(Image.open(R/'art-source275/reina-idle-walk.png').convert('RGBA'));l,n=label(a[:,:,3]>=128);boxes=[]
for j,b in enumerate(find_objects(l)):
 if b and (l[b]==j+1).sum()>10000:boxes.append((b[1].start,b[0].start,b[1].stop,b[0].stop))
boxes.sort(key=lambda b:(b[1]//390,b[0]));assert len(boxes)==10;k=138/(boxes[0][3]-boxes[0][1]);hands=[(303,137),(700,137),(1067,137),(1462,139),(1855,145),(290,540),(686,541),(1080,543),(1477,546),(1872,546)];out=R/'dist/assets/reina275';out.mkdir(exist_ok=True);D=[]
for i,b in enumerate(boxes):
 x,y,r,z=b;q=a[y:z,x:r].copy();q[:,:,3]=np.where(q[:,:,3]>=128,255,0);q[q[:,:,3]==0]=0;_,foot=np.where(q[-5:,:,3]>0);anchor=(foot.min()+foot.max())/2;im=Image.fromarray(q).resize((round((r-x)*k),round((z-y)*k)),Image.Resampling.NEAREST);bb=im.getchannel('A').getbbox();im=im.crop((0,0,im.width,bb[3]));p=out/f'reina-{i}.webp';im.save(p,'WEBP',quality=90,method=6);D.append(dict(src='assets/reina275/'+p.name+'?v=275',w=im.width,h=im.height,ax=anchor*k,ay=im.height,hand=[(hands[i][0]-x-anchor)*k,(hands[i][1]-z)*k],sourceBox=b,scale=k))
(R/'dist/reina-idle-walk275-data.js').write_text('window.ReinaGait275Data='+json.dumps(D,separators=(',',':'))+';\n');print('Imported10frames at one scale',k,[q['h'] for q in D])
