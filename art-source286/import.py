from PIL import Image
from pathlib import Path
import json
import numpy as np
from scipy.ndimage import label
im=Image.open('art-source286/niko-legthrow.png').convert('RGBA');cw,ch=im.width//4,im.height//3;k=148/316
# Authored grip coordinates in each cell; one fixed anatomical scale for all twelve poses.
hands=[(292,175),(224,170),(120,210),(209,184),(188,151),(204,176),(241,157),(190,159),(245,238),(260,307),(263,183),(245,132)]
heads=[(206,65),(207,65),(208,91),(120,145),(78,228),(153,130),(160,120),(144,100),(172,164),(239,168),(231,83),(177,47)]
hips=[(157,214),(156,218),(165,229),(160,260),(143,309),(150,282),(171,276),(157,277),(149,293),(161,255),(174,223),(164,201)]
roots=[177,177,177,177,177,177,177,177,177,177,177,177];out=[]
for i in range(12):
 q=im.crop((i%4*cw,i//4*ch,i%4*cw+cw,i//4*ch+ch));q.putalpha(q.getchannel('A').point(lambda a:255 if a>=128 else 0));a=np.array(q.getchannel('A'));a[:4,:]=a[-4:,:]=0;a[:,:4]=a[:,-4:]=0;lab,count=label(a>128);sizes=np.bincount(lab.ravel());sizes[0]=0;a=(lab==sizes.argmax()).astype('uint8')*255;q.putalpha(Image.fromarray(a));box=q.getbbox();l,t,rr,b=box;q=q.crop(box);w,h=q.size;q=q.resize((round(w*k*.9),round(h*k*.9)),Image.Resampling.NEAREST);src=f'assets/legthrow286/niko-{i}.webp';q.save('dist/'+src,'WEBP',quality=84,method=6);out.append(dict(src=src,w=w*k,h=h*k,ax=(roots[i]-l)*k,ay=h*k,socket=[(hands[i][0]-roots[i])*k,(hands[i][1]-b)*k],head=[(heads[i][0]-roots[i])*k,(heads[i][1]-b)*k],hip=[(hips[i][0]-roots[i])*k,(hips[i][1]-b)*k],sourceBox=box,sourceScale=k))
Path('dist/legthrow-art286.js').write_text('globalThis.LegThrowArt286='+json.dumps(out,separators=(',',':'))+';\n');Path('reports286/asset-import.json').write_text(json.dumps(out,indent=2)+'\n')
print('assets',sum(Path('dist/'+q['src']).stat().st_size for q in out))
