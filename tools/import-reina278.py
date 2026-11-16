from pathlib import Path
from PIL import Image
import numpy as np,json
R=Path(__file__).resolve().parents[1]
a=Image.open(R/'art-source278/reina-three-kicks.png').convert('RGBA');W,H=a.size;k=138/262
hips=[180,524,877,1243,180,552,891,1244,173,529,898,1253,177,528,894,1262]
canvas=Image.new('RGBA',(800,608));frames=[]
for i in range(16):
 col,row=i%4,i//4;x0,x1=round(col*W/4),round((col+1)*W/4);y0,y1=round(row*H/4),round((row+1)*H/4)
 q=np.array(a.crop((x0,y0,x1,y1)));q[:,:,3]=np.where(q[:,:,3]>=200,255,0);q[q[:,:,3]==0]=0
 im=Image.fromarray(q).resize((round((x1-x0)*k),round((y1-y0)*k)),Image.Resampling.NEAREST)
 dx,dy=col*200,row*152;canvas.paste(im,(dx,dy));v=np.array(im);ys,xs=np.where(v[:,:,3]>0);seed=(int(np.median(xs)),int(np.median(ys)))
 # Seed must be an opaque body pixel, not transparent space between limbs.
 j=int(np.argmin((xs-seed[0])**2+(ys-seed[1])**2));seed=(int(xs[j]),int(ys[j]))
 frames.append(dict(rect=[dx,dy,im.width,im.height],seed=[dx+seed[0],dy+seed[1]],anchor=[dx+(hips[i]-x0)*k,dy+im.height]))
canvas.save(R/'dist/assets/sprites/reina-repair134.webp','WEBP',quality=92,method=6)
p=R/'dist/repair134-data.js';d=json.loads(p.read_text().split('=',1)[1].rstrip(';\n'));d['reina']={'src':'assets/sprites/reina-repair134.webp?v=278','scale':1,'frames':frames};p.write_text('window.NeonRepair134Data='+json.dumps(d,separators=(',',':'))+';\n')
(R/'art-source278/import.json').write_text(json.dumps({'sourceScale':k,'frames':frames,'fixedScale':True},indent=2))
print('Imported16 poses, fixed scale',k)
