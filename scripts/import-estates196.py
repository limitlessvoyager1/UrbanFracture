"""Rebuild Fairways runtime WebP backgrounds and transparent cutouts from archived PNGs."""
from pathlib import Path
from PIL import Image
from scipy import ndimage
import numpy as np,json
r=Path(__file__).resolve().parents[1];a=r/'art-archive196';data={'citizens':[],'carts':[]}
for key in ['avenue','front','spa','rear','club','golf','tennis','court']:
 Image.open(a/f'{key}196.png').convert('RGBA').save(r/'dist/assets'/f'estates-{key}196.webp',lossless=True,exact=True)
for key,source,rows,cols in [('citizens','citizens-repaired196.png',4,4),('cart','cart196.png',1,3)]:
 im=Image.open(a/source).convert('RGBA')
 for row in range(rows):
  for col in range(cols):
   q=im.crop((col*im.width//cols,row*im.height//rows,(col+1)*im.width//cols,(row+1)*im.height//rows));pix=np.array(q);labels,n=ndimage.label(pix[:,:,3]>110);counts=np.bincount(labels.ravel());counts[0]=0;mask=ndimage.binary_dilation(labels==counts.argmax(),iterations=2);pix[:,:,3]=np.where(mask,pix[:,:,3],0);q=Image.fromarray(pix);q=q.crop(q.getbbox());i=row*cols+col;src=f'assets/estates-{key}196-{i}.webp';q.save(r/'dist'/src,lossless=True,exact=True);data['citizens' if key=='citizens' else 'carts'].append({'src':src,'w':q.width,'h':q.height})
(r/'dist/estates196-data.js').write_text('window.Estates196Data='+json.dumps(data)+';\n')
