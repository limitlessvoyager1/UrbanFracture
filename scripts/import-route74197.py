"""Rebuild Route74 lossless artwork from archived PNG source atlases."""
from pathlib import Path
from PIL import Image
from scipy import ndimage
import numpy as np,json
r=Path(__file__).resolve().parents[1];a=r/'art-archive197';data={}
for key in ['woods','stop','homes']:Image.open(a/f'{key}197.png').convert('RGBA').save(r/'dist/assets'/f'route74-{key}197.webp',lossless=True,exact=True)
for key,rows,cols in [('gus',4,4),('charlie',4,4),('charlie-unarmed',4,4),('cars',2,2)]:
 im=Image.open(a/f'{key}197.png').convert('RGBA');data[key]=[]
 for row in range(rows):
  for col in range(cols):
   q=im.crop((col*im.width//cols,row*im.height//rows,(col+1)*im.width//cols,(row+1)*im.height//rows));pix=np.array(q);labels,n=ndimage.label(pix[:,:,3]>170);counts=np.bincount(labels.ravel());counts[0]=0;mask=ndimage.binary_dilation(labels==counts.argmax(),iterations=1);pix[:,:,3]=np.where(mask,pix[:,:,3],0);q=Image.fromarray(pix);trim=q.getbbox();q=q.crop(trim);i=row*cols+col;src=f'assets/route74-{key}197-{i}.webp';q.save(r/'dist'/src,lossless=True,exact=True);data[key].append({'src':src,'w':q.width,'h':q.height,'trim':trim})
(r/'dist/route74197-data.js').write_text('window.Route74197Data='+json.dumps(data)+';\n')
print({k:[(x['w'],x['h']) for x in v[:4]] for k,v in data.items()})
