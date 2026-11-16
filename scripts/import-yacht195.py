"""Rebuild runtime yacht cutouts from original source art; Pillow + scipy required."""
from PIL import Image
from scipy import ndimage
import numpy as np,json
from pathlib import Path
root=Path(__file__).resolve().parents[1]
a=root/'art-archive195'; out=root/'dist/assets'; data={'frames':[]}
for name in ['deck','lounge','city']:
 im=Image.open(a/(name+'195.png')).convert('RGBA'); im.save(out/('yacht-'+name+'195.webp'),lossless=True,exact=True)
im=Image.open(a/'arthur195.png').convert('RGBA')
# Actual generated atlas layout: 5 columns / 4 rows, with longer weapons given wider boxes.
rects=[]
for i in range(5):rects.append((i*im.width//5,0,(i+1)*im.width//5,280))
rects += [(0,280,365,575),(365,280,570,575),(575,280,845,575),(845,280,1100,575),(1100,280,1374,575),(0,575,325,850),(325,575,580,850),(585,575,845,850),(850,575,1100,850),(1100,575,1374,850),(0,850,274,1145),(274,850,550,1145),(550,850,845,1145),(845,850,1100,1145),(1100,850,1374,1145)]
for i,box in enumerate(rects):
 q=im.crop(box); pix=np.array(q); labels,n=ndimage.label(pix[:,:,3]>110); counts=np.bincount(labels.ravel());counts[0]=0;mask=ndimage.binary_dilation(labels==counts.argmax(),iterations=2);pix[:,:,3]=np.where(mask,pix[:,:,3],0);q=Image.fromarray(pix);trim=q.getbbox();q=q.crop(trim);src=f'assets/arthur195-{i}.webp';q.save(root/'dist'/src,lossless=True,exact=True);data['frames'].append({'src':src,'w':q.width,'h':q.height,'sourceRect':box,'trim':trim})
run=Image.open(a/'arthur-run195.png').convert('RGBA')
for i in range(3):
 q=run.crop((i*run.width//3,0,(i+1)*run.width//3,run.height));trim=q.getbbox();q=q.crop(trim);src=f'assets/arthur195-{20+i}.webp';q.save(root/'dist'/src,lossless=True,exact=True);data['frames'].append({'src':src,'w':q.width,'h':q.height,'run195':True})
(root/'dist/yacht195-data.js').write_text('window.Yacht195Data='+json.dumps(data)+';\n')
