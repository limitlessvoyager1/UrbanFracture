from pathlib import Path
from PIL import Image
import json,numpy as np
D=json.loads(Path('reports281/asset-import.json').read_text()); count=0
for name,frames in D.items():
 assert len(frames)==8
 assert len({q['sourceScale'] for q in frames})==1,'no per-frame resize'
 assert max(q['h'] for q in frames)<=140.001 and min(q['h'] for q in frames)>132,'consistent proportions'
 hashes=set()
 for q in frames:
  im=Image.open(Path('dist')/q['src']).convert('RGBA');a=np.array(im)[:,:,3];assert set(np.unique(a)).issubset({0,255}),'no translucent ghosting';assert np.any(a==0) and np.any(a==255)
  ys,xs=np.where(a>96);bottom=(ys.max()+1)*q['h']/im.height-q['ay'];assert -1.6<=bottom<=.1,('opaque sole anchored',name,bottom)
  assert 0<q['ax']<q['w'];hashes.add(im.tobytes());count+=1
 assert len(hashes)==8,'eight distinct whole-body frames'
assert sum(p.stat().st_size for p in Path('dist/assets/sprites/enemy281').iterdir())<500000
print('PASS281 ASSETS',count,'distinct opaque-alpha cutouts; fixed sequence scale, pelvis/sole anchors, consistent body envelope')
