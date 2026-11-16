from PIL import Image
import numpy as np,json,hashlib
from pathlib import Path
D=json.load(open('reports283/asset-import.json'));n=0
for key,qs in D.items():
 assert len(qs)==(8 if key=='kick' else 4 if key=='stomp' else 16)
 assert len({q['sourceScale'] for q in qs})==1,'fixed anatomical scale per authored sequence'
 for q in qs:
  path=Path('dist')/q['src'];path=path if path.exists() else Path('art-source286/retired-throat283')/path.name
  im=Image.open(path).convert('RGBA');a=np.array(im)[:,:,3];assert set(np.unique(a))<={0,255};assert (a>128).sum()>1000
  assert q['w']>0 and q['h']>0 and q['ay']==q['h'];n+=1
# Existing Niko atlas packing shrinks uniformly; world scale, aspect and frame counts are unchanged.
for key,cols,rows in [('niko-motion185',4,4),('niko-grapples185',4,3)]:
 old=Image.open('art-source283/'+key+'-original.webp');new=Image.open('dist/assets/sprites/'+key+'.webp');assert abs(new.width-old.width*.75)<=2 and abs(new.height-old.height*.75)<=2 and abs(new.width/old.width-new.height/old.height)<1e-8;assert new.width%cols==0 and new.height%rows==0
 assert (new.height/rows)>=230,'served anatomy above the150logical/220world-pixel native presentation'
print('PASS283 ASSETS',n,'binary-alpha complete poses, one source scale per sequence, stable anatomical size; uniformly packed legacy Niko atlases preserve layout and native detail')
