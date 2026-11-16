from pathlib import Path
from PIL import Image
import json,hashlib,numpy as np
R=Path(__file__).resolve().parents[1];proof=json.loads((R/'reports262/art-import.json').read_text());checks=0
for q in proof:
 p=R/'dist'/q['src'].split('?')[0];assert p.exists();im=Image.open(p).convert('RGBA');assert im.size==(q['w'],q['h']);assert hashlib.sha256(p.read_bytes()).hexdigest()==q['sha256'];a=np.array(im)[:,:,3];assert (a>=250).sum()>a.size*.12;assert a[0].max()<200 or a[-1].max()<200;assert q['review']=='required';checks+=6
 if '/prone-' in q['src']:assert q['w']/q['h']>2.6;checks+=1
# All generated atlas source cells have complete heads and actual transparency, not opaque white rectangles.
for name,cols,rows in [('red-run.png',4,2),('head-repair.png',4,2),('kevin-throw.png',4,1),('vault.png',3,1),('taser.png',3,1),('fearful.png',4,1),('prone.png',4,3)]:
 im=Image.open(R/'art-source262'/name).convert('RGBA');a=np.array(im)[:,:,3];W,H=im.size;assert a[0,0]<10
 for y in range(rows):
  for x in range(cols):
   cuts=[0,515,1045,1640,2172] if name=='kevin-throw.png' else [round(i*W/cols) for i in range(cols+1)];cell=a[round(y*H/rows):round((y+1)*H/rows),cuts[x]:cuts[x+1]];ys,xs=np.where(cell>200);assert ys.min()>=3,'head clipped '+name;assert xs.min()>=3 and xs.max()<cell.shape[1]-3,'body clipped '+name;checks+=3
# Actual old truncated heads are detected in the preserved originals.
for n in [8,9,10,11,12,13]:
 a=np.array(Image.open(R/f'art-source262/originals/estates-citizens196-{n}.webp').convert('RGBA'))[:,:,3];assert (a[0]>128).any();checks+=1
im=Image.open(R/'dist/assets/estates-tennis196.webp').convert('RGB');src=Image.open(R/'art-source262/pool.png').convert('RGB');assert im.size==(2172,724);assert np.array_equal(np.array(im),np.array(src));checks+=2
print('PASS262 ART',checks,'complete generated heads/alpha/cell margins, known clipped-head originals, fixed imported dimensions/hashes and lossless recreational pool. Art review separate.')
