"""Slice authored whole-body atlases; retain one scale per actor and alpha."""
from pathlib import Path
from PIL import Image,ImageDraw
import numpy as np,json,shutil
R=Path(__file__).resolve().parents[2]
sources={'bruiser':'exec-b5d93d56-3eb9-467e-98c7-db077a79bce1.png','gunner':'exec-b6f68f53-aef7-41c0-add0-6f7d39cb9dda.png'}
data={};proof=Image.new('RGB',(1280,2220),'#172433');pen=ImageDraw.Draw(proof);receipts=[]
for ri,(role,name) in enumerate(sources.items()):
 p=R/'source-art/backup371'/f'{role}.png'
 if not p.exists():shutil.copy(R.parents[1]/'generated_images'/name,p)
 src=Image.open(p).convert('RGBA');cw,ch=src.width/4,src.height/8
 cells=[]
 for i in range(32):
  cell=src.crop((round(i%4*cw),round(i//4*ch),round((i%4+1)*cw),round((i//4+1)*ch)));a=np.asarray(cell);ys,xs=np.where(a[:,:,3]>96);assert len(xs)>500
  cells.append((cell,(int(xs.min()),int(ys.min()),int(xs.max())+1,int(ys.max())+1)))
 scale=202/float(np.median([b[3]-b[1] for _,b in cells[:12]]));atlas=Image.new('RGBA',(1024,2048));frames=[]
 for i,(cell,b) in enumerate(cells):
  # Same scale for every pose; floor alignment does not shrink falling/attack frames.
  x=round(128-(b[0]+b[2])/2*scale);y=round(239-b[3]*scale);canvas=Image.new('RGBA',(256,256));sized=cell.resize((round(cw*scale),round(ch*scale)),Image.Resampling.LANCZOS);canvas.alpha_composite(sized,(x,y));a=np.asarray(canvas);ys,xs=np.where(a[:,:,3]>96)
  assert xs.min()>0 and xs.max()<255 and ys.min()>0 and ys.max()<255,(role,i,'clipped')
  atlas.alpha_composite(canvas,(i%4*256,i//4*256));frames.append({'rect':[i%4*256,i//4*256,256,256],'ax':128,'ay':239})
  tile=canvas.resize((160,160),Image.Resampling.LANCZOS);px=ri*640+i%4*160;py=55+i//4*270;proof.paste(tile,(px,py),tile);pen.text((px+8,py+165),f'{role} {i}',fill='white');receipts.append({'role':role,'frame':i,'height':int(ys.max()-ys.min()+1),'pixels':len(xs),'scale':scale})
 atlas.save(R/'dist/assets/backup371'/f'{role}.webp',quality=88,method=6)
 data[role]={'src':f'assets/backup371/{role}.webp','frames':frames,'scale':(.79 if role=='bruiser' else .64),'bodyHeight':202}
pen.text((20,12),'BACKUP371 / BRUISER + GUNNER / WHOLE-BODY AUTHORED FRAMES',fill='white');proof.save(R/'reports371/atlas-review.png');(R/'reports371/art-registration.json').write_text(json.dumps(receipts,indent=2))
(R/'dist/backup371-data.js').write_text('globalThis.Backup371Data='+json.dumps(data,separators=(',',':'))+';\n')
