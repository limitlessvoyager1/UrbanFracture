from pathlib import Path
from PIL import Image
import numpy as np,json,shutil
from scipy.ndimage import label,find_objects
R=Path(__file__).resolve().parents[1];S=Path('/workspace/scratch/96a3e452279b/generated_images');A=R/'art-source280';A.mkdir(exist_ok=True);O=R/'dist/assets/mall'
for key,name in [('gallery','exec-780569d1-cdcd-4e09-adc9-206f6ea8f9ac.png'),('department','exec-f111378b-3add-4070-9e2c-b6b5c7ce40fa.png'),('appliance','exec-62d34e24-6483-44f1-9b08-4fd41cde0492.png'),('door','exec-75284812-d0d7-4c39-a279-094a76148087.png'),('chair','exec-40afc099-2360-4a12-8fc6-5c29a11e1441.png')]:
 shutil.copy2(S/name,A/(key+'.png'));im=Image.open(S/name).convert('RGBA')
 if key=='department':im=im.crop((0,88,im.width,655))
 if key in ['appliance','door','chair']:
  a=np.array(im);a[:,:,3]=np.where(a[:,:,3]>=160,255,0);a[a[:,:,3]==0]=0;im=Image.fromarray(a);im=im.crop(im.getchannel('A').getbbox());im.thumbnail((300,450) if key=='door' else (300,300) if key=='chair' else (250,260),Image.Resampling.NEAREST)
 else:im.thumbnail((1500,600),Image.Resampling.LANCZOS)
 im.save(O/(key+'280.webp'),'WEBP',quality=90,method=6)
name='exec-7a9115f0-1099-4595-82b7-d6d8c2fba921.png';shutil.copy2(S/name,A/'reina-walk.png');a=np.array(Image.open(S/name).convert('RGBA'));h,w=a.shape[:2];D=[];out=R/'dist/assets/reina280';out.mkdir(exist_ok=True)
# Use one scale for all frames; fixed grid extraction, opaque soles, no independent resizing.
boxes=[]
for i in range(8):
 col=i%4;row=i//4;x0=round(col*w/4);x1=round((col+1)*w/4);y0=round(row*h/2);y1=round((row+1)*h/2);q=a[y0:y1,x0:x1];ys,xs=np.where(q[:,:,3]>=160);boxes.append((x0+xs.min(),y0+ys.min(),x0+xs.max()+1,y0+ys.max()+1))
k=138/(boxes[0][3]-boxes[0][1])
for i,(x,y,r,z) in enumerate(boxes):
 q=a[y:z,x:r].copy();q[:,:,3]=np.where(q[:,:,3]>=160,255,0);q[q[:,:,3]==0]=0;im=Image.fromarray(q).resize((round((r-x)*k),round((z-y)*k)),Image.Resampling.NEAREST);b=im.getchannel('A').getbbox();im=im.crop((0,0,im.width,b[3]));_,foot=np.where(np.array(im)[-4:,:,3]>0);anchor=round((i%4*w/4+210-x)*k);im.save(out/f'walk-{i}.webp','WEBP',quality=90,method=6)
 # Authored leading glove points from the generated source, independent of foot width.
 hx,hy=[(300,230),(744,230),(1187,230),(1630,232),(310,657),(751,652),(1192,655),(1632,654)][i]
 mask=np.array(im)[:,:,3];tx=(hx-x)*k;ty=(hy-z)*k+im.height;ys,xs=np.where(mask>0);j=np.argmin((xs-tx)**2+(ys-ty)**2);px,py=int(xs[j]),int(ys[j]);assert (px-tx)**2+(py-ty)**2<36
 D.append(dict(src=f'assets/reina280/walk-{i}.webp?v=280',w=im.width,h=im.height,ax=anchor,ay=im.height,hand=[px-anchor,py-im.height],scale=k,sourceBox=[x,y,r,z]))
(R/'dist/reina-walk280-data.js').write_text('window.ReinaWalk280Data='+json.dumps(D,default=lambda x:x.item(),separators=(',',':'))+';\n');(A/'import.json').write_text(json.dumps({'scale':k,'boxes':boxes,'frames':D},default=lambda x:x.item(),indent=2));print('Imported280',k,[q['h'] for q in D])
