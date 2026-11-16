from PIL import Image
import numpy as np,json
from scipy.ndimage import label
im=Image.open('art-source287/falls.png').convert('RGBA');a=np.array(im.getchannel('A'))>=128;lab,n=label(a);sizes=np.bincount(lab.ravel());big=np.where(sizes>2500)[0];big=big[big>0];items=[]
for j in big:
 ys,xs=np.where(lab==j);items.append((int(ys.min()),int(xs.min()),int(xs.max()+1),int(ys.max()+1),int(j)))
items=sorted(items,key=lambda q:(q[0]>360,q[1]));print(len(items),items);assert len(items)==12
out={};k=140/330
for i,(t,l,r,b,j) in enumerate(items):
 q=im.copy();q.putalpha(Image.fromarray((lab==j).astype('uint8')*255));q=q.crop((l,t,r,b));w,h=q.size;q=q.resize((round(w*k*.9),round(h*k*.9)),Image.Resampling.NEAREST);src=f'assets/review287/fall-{i}.webp';q.save('dist/'+src,'WEBP',quality=80,method=6);out.setdefault('knifeThug' if i<6 else 'sato',[]).append(dict(src=src,w=w*k,h=h*k,ax=w*k*.5,ay=h*k,sourceScale=k))
open('dist/review287-falls.js','w').write('globalThis.Review287Falls='+json.dumps(out,separators=(',',':'))+';\n');open('reports287/falls-import.json','w').write(json.dumps(out,indent=2))
