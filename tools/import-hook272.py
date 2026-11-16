from pathlib import Path
import json
import numpy as np
from PIL import Image
from scipy.ndimage import label,find_objects
R=Path(__file__).resolve().parents[1];im=Image.open(R/'art-source272/hook-kick.png').convert('RGBA');a=np.array(im);l,n=label(a[:,:,3]>=128);cells={}
for j,b in enumerate(find_objects(l)):
 if not b:continue
 yy,xx=b;area=int((l[b]==j+1).sum())
 if area<500:continue
 i=int((yy.start+yy.stop)/2/im.height*3)*4+int((xx.start+xx.stop)/2/im.width*4)
 if i not in cells or area>cells[i][0]:cells[i]=(area,(xx.start,yy.start,xx.stop,yy.stop))
assert set(cells)==set(range(12));k=138/(cells[11][1][3]-cells[11][1][1]);out=R/'dist/assets/reina272';out.mkdir(exist_ok=True);D=[]
for n in range(12):
 box=cells[n][1];q=im.crop(box);ar=np.array(q);foot=ar[-5:,:,3]>=128;_,xx=np.where(foot);anchor=(int(xx.min())+int(xx.max()))/2;w,h=max(1,round(q.width*k)),max(1,round(q.height*k));q=q.resize((w,h),Image.Resampling.NEAREST);ar=np.array(q);ar[:,:,3]=np.where(ar[:,:,3]>=128,255,0);ar[ar[:,:,3]==0]=0;q=Image.fromarray(ar);b=q.getchannel('A').getbbox();q=q.crop((0,0,w,b[3]));h=q.height;p=out/f'hook-{n}.webp';q.save(p,'WEBP',quality=90,method=6);D.append(dict(src='assets/reina272/'+p.name+'?v=272',w=w,h=h,ax=anchor*k,ay=h,sourceBox=box,sourceScale=k))
(R/'dist/reina-hook272-data.js').write_text('window.ReinaHook272Data='+json.dumps(D,separators=(',',':'))+';\n');print('Imported12hook frames at one scale',k)
