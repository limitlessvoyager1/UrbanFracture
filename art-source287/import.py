from PIL import Image
import numpy as np,json
from scipy.ndimage import label
im=Image.open('art-source287/niko.png').convert('RGBA');cw,ch=im.width//4,im.height//2;k=148/420;out=[]
hands=[(257,147),(107,229),(276,118),(351,114),(327,246),(244,148),(320,156),(264,108)]
for i in range(8):
 q=im.crop((i%4*cw,i//4*ch,i%4*cw+cw,i//4*ch+ch));a=np.array(q.getchannel('A'));a=(a>=128);a[:3]=a[-3:]=0;a[:,:3]=a[:,-3:]=0;lab,n=label(a);sizes=np.bincount(lab.ravel());sizes[0]=0;q.putalpha(Image.fromarray((lab==sizes.argmax()).astype('uint8')*255));box=q.getbbox();l,t,r,b=box;q=q.crop(box);w,h=q.size;q=q.resize((round(w*k*.88),round(h*k*.88)),Image.Resampling.NEAREST);src=f'assets/review287/niko-{i}.webp';q.save('dist/'+src,'WEBP',quality=80,method=6);out.append(dict(src=src,w=w*k,h=h*k,ax=(210-l)*k,ay=h*k,hand=[(hands[i][0]-210)*k,(hands[i][1]-b)*k],sourceScale=k,sourceBox=box))
open('dist/recording287-art.js','w').write('globalThis.Review287Art='+json.dumps(out,separators=(',',':'))+';\n');open('reports287/asset-import.json','w').write(json.dumps(out,indent=2));print('art bytes',sum(__import__('os').path.getsize('dist/'+q['src']) for q in out))
