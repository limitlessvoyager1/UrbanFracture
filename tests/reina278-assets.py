from metadata342 import metadata
from pathlib import Path
from PIL import Image
import numpy as np,json,hashlib
R=Path(__file__).resolve().parents[1];d=metadata('dist/repair134-data.js','NeonRepair134Data');r=d['reina'];a=Image.open(R/'dist'/r['src'].split('?')[0]).convert('RGBA');v=np.array(a);assert set(np.unique(v[:,:,3]))<={0,255};assert r['scale']==1 and len(r['frames'])==16
for f in r['frames']:
 x,y,w,h=f['rect'];q=v[y:y+h,x:x+w];assert np.count_nonzero(q[:,:,3])>3000;assert v[f['seed'][1],f['seed'][0],3]==255;assert w/h>1 and .8<w/h<1.6
m=json.loads((R/'art-source278/import.json').read_text());assert m['fixedScale'] and m['sourceScale']==138/262
assert (R/'dist/assets/sprites/reina-repair134.webp').stat().st_size<150000
print('PASS278 clean alpha,16 complete poses,fixed shared scale,source metadata,compact atlas')
