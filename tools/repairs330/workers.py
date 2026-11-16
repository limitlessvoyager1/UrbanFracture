from PIL import Image
from pathlib import Path
from scipy import ndimage
import numpy as np,json
sources={'regular':'exec-8ae91c38-700c-48d9-96a0-fab4faa3b049.png','heavy':'exec-af65a232-477f-4a47-a89e-3724c9cc2944.png'}
hands=[(.75,.45),(.85,.48),(.65,.42),(.88,.30),(.85,.4),(.82,.36),(.72,.4),(.80,.37),(.67,.40),(.22,.17),(.90,.18),(.3,.31),(.24,.16),(.55,.06),(.96,.30),(.90,.50),(.70,.35),(.90,.2)]+[(.7,.4)]*14
allhands={}
for variant,file in sources.items():
 p=Path('/workspace/scratch/96a3e452279b/generated_images')/file;Path(f'art-source330/worker-{variant}.png').write_bytes(p.read_bytes());im=Image.open(p).convert('RGBA');im=im.resize((round(im.width*.65),round(im.height*.65)),Image.Resampling.LANCZOS);W,H=im.size;cells=[]
 for n in range(32):
  rect=[round(n%4*W/4),round(n//4*H/8),round((n%4+1)*W/4),round((n//4+1)*H/8)];a=np.array(im.crop(rect));lab,_=ndimage.label(a[:,:,3]>100,np.ones((3,3)));counts=np.bincount(lab.ravel());counts[0]=0;keep=lab==counts.argmax();a[~keep]=0;ys,xs=np.where(keep);crop=Image.fromarray(a).crop((xs.min(),ys.min(),xs.max()+1,ys.max()+1));cells.append(crop)
 cw=max(q.width for q in cells)+4;ch=max(q.height for q in cells)+4;atlas=Image.new('RGBA',(cw*4,ch*8));frames=[];base=cells[0].height;k=(157 if variant=='heavy' else 140)/base;hdata=[]
 for n,q in enumerate(cells):
  x=n%4*cw;y=n//4*ch;atlas.paste(q,(x,y));ax=q.width*.45;ay=q.height;hx=q.width*hands[n][0];hy=q.height*hands[n][1];frames.append(dict(rect=[x,y,q.width,q.height],root=[ax,ay],head=[q.width*.52,q.height*.12,q.height*.10],hand=[hx,hy]));hdata.append([(hx-ax)*k,(hy-ay)*k])
 path=f'dist/assets/workers/worker-{variant}233.webp';atlas.save(path,'WEBP',quality=88,method=6)
 legacy=[0,1,3,5,9,10,17,14,28,11,28,30,18,22,25,13];data=dict(src=f'assets/workers/worker-{variant}233.webp?v=330',baseHeight=base,frames=[frames[i] for i in legacy],frames330=frames)
 Path(f'dist/worker-{variant}233-data.js').write_text('window.WorkerArt233=window.WorkerArt233||{};window.WorkerArt233['+json.dumps(variant)+']='+json.dumps(data,separators=(',',':'))+';')
 allhands[variant]=hdata
Path('reports330/worker-sockets.json').write_text(json.dumps(allhands,indent=2))
Path('tools/repairs330/worker-sockets.js').write_text('const sockets330='+json.dumps(allhands,separators=(',',':'))+';\n')
