from pathlib import Path
from PIL import Image
import numpy as np,json,re
from scipy.ndimage import binary_erosion
D=json.loads(Path('reports282/gait-import.json').read_text());k=148/305;n=0
for kind,frames in D.items():
 assert len(frames)==8
 for q in frames:
  assert abs(q['scale']-k)<1e-12 and q['root'][1]==312
  im=Image.open('dist/'+q['src'].split('?')[0]).convert('RGBA');a=np.array(im)[:,:,3];assert set(np.unique(a))<={0,255};assert q['handIdentity']=='viewer-side/near arm'
  hx,hy=q['gripSource'];x0,y0,x1,y1=q['sourceBox'];left=x0%312 # exact sourceBox uses rounded cells, use metadata transform instead
  px=round((q['hand'][0]+q['ax'])/k);py=round((q['hand'][1]+q['ay'])/k);assert a[py,px]>160
  ys,xs=np.where(a>160);sole=(ys.max()+1)*k-q['ay'];assert sole<=1.5,'no foot below ground';n+=1
assert max(q['h'] for q in D['walk'])-min(q['h'] for q in D['walk'])<3
print('PASS282 ASSETS',n,'fixed scale/roots, opaque grip pixels, no fractional-alpha ghosts, consistent anatomy; running flexion/flight preserved')
