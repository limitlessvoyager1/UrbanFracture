from pathlib import Path
from PIL import Image
import numpy as np,json,shutil
root=Path(__file__).resolve().parents[1]; out=root/'dist/assets/sprites/enemy281';out.mkdir(exist_ok=True); source=root/'art-source281';source.mkdir(exist_ok=True)
sets=[('bikerWalk','exec-9a48aeea-615f-4729-9b3c-3d4faa7e6b74.png',2,0,8),('kevinWalk','exec-e870270d-553e-4b33-b2cc-5bd0317a5053.png',2,0,8),('marcusPunch','exec-023465cd-b558-4466-b1b0-33f761df2182.png',4,0,8),('brunoPunch','exec-023465cd-b558-4466-b1b0-33f761df2182.png',4,8,8)]
sets += [('kevinKnife','exec-b6d209f2-b5ff-4461-8141-31254911b671.png',4,0,8),('bikerChain','exec-b6d209f2-b5ff-4461-8141-31254911b671.png',4,8,8)]
data={}
hands=[(245,110),(153,55),(148,12),(265,77),(322,81),(242,81),(231,89),(237,86)]
for name,filename,rows,start,count in sets:
 src=source/filename;im=Image.open(src).convert('RGBA');cw,ch=im.width//4,im.height//rows; cells=[]
 for n in range(start,start+count):
  cell=im.crop(((n%4)*cw+4,(n//4)*ch+5,(n%4+1)*cw-4,(n//4+1)*ch-5)); a=np.array(cell);mask=a[:,:,3]>96; ys,xs=np.where(mask); # grid borders excluded by cell inset
  l,r,t,b=int(xs.min()),int(xs.max()+1),int(ys.min()),int(ys.max()+1)
  # Waist center is stable pelvis anchor; body root is opaque boot sole.
  waist=mask[t+int((b-t)*.46):t+int((b-t)*.53)]; xx=np.where(waist)[1];ax=float(np.median(xx));cells.append((cell,l,r,t,b,ax))
 fixed=max(b-t for _,l,r,t,b,ax in cells);factor=192/fixed;data[name]=[]
 for i,(cell,l,r,t,b,ax) in enumerate(cells):
  crop=cell.crop((l,t,r,b));w,h=round(crop.width*factor),round(crop.height*factor);crop=crop.resize((w,h),Image.Resampling.LANCZOS); crop.putalpha(crop.getchannel('A').point(lambda a:255 if a>=128 else 0)); path=out/f'{name}-{i}.webp';crop.save(path,quality=85,method=6,exact=True)
  data[name].append(dict(src=str(path.relative_to(root/'dist')),w=w*140/192,h=h*140/192,ax=(ax-l)*factor*140/192,ay=h*140/192,sourceHeight=b-t,sourceScale=factor*140/192))
  if name=='bikerChain':
   hx,hy=hands[i];data[name][-1]['hand']=[(hx-4-ax)*140/fixed,(hy-5-b)*140/fixed]
(root/'dist/enemy281-data.js').write_text('/* Fixed scale per sequence; opaque sole and pelvis roots from source atlas. */\nwindow.Enemy281Data='+json.dumps(data,separators=(',',':'))+';\n')
(root/'reports281').mkdir(exist_ok=True);(root/'reports281/asset-import.json').write_text(json.dumps(data,indent=2)+'\n');print('cutouts',sum(p.stat().st_size for p in out.iterdir()),'bytes')
