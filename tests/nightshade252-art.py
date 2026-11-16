from metadata342 import metadata
from pathlib import Path
from PIL import Image
from scipy import ndimage
import numpy as np,json,hashlib
D=metadata('dist/nightshade-art252.js','NightshadeArt252');assert len(D['frames'])==28;unique=set()
def connected(a):return ndimage.label(a>0,np.ones((3,3)))[1]==1
# Deliberate bad fixture verifies that isolated get-up debris is actually detected.
bad=np.zeros((15,15),dtype=np.uint8);bad[5:10,5:10]=255;assert connected(bad);bad[1,1]=255;assert not connected(bad)
scales={}
for n,q in enumerate(D['frames']):
 im=Image.open('dist/'+q['src'].split('?')[0]).convert('RGBA');a=np.array(im.getchannel('A'));assert im.size==(q['w'],q['h']);assert connected(a),('detached pixels',n);assert im.getchannel('A').getbbox()[3]==q['ay']==q['h'];assert 0<q['ax']<q['w'];scales.setdefault(q['kind'],set()).add(q['scale']);unique.add(hashlib.sha256(im.tobytes()).hexdigest())
 if q['kind'] in ['walk','run']:assert im.height>=350,'Do not downsample then enlarge';assert 120<=im.height*q['scale']<=125
assert len(unique)==28;assert all(len(s)==1 for s in scales.values());idle=D['frames'][D['idle']];height=idle['h']*idle['scale'];assert height==123
# User254 supersedes253 size:144logical idle height; latest request favors a larger sprite.
for file in ['sprite-data.js','walk-data.js']:
 data=metadata('dist/'+file,'NeonSpriteData' if file=='sprite-data.js' else 'NeonWalkData')['thug'];enemy=data['frames'][0]['rect'][3]*data['scale'];assert .85<enemy*.92/(height*D['presentationScale253'])<.95
for k in ['walk','run']:
 a=[q['h']*q['scale'] for q in D['frames'] if q['kind']==k];assert max(a)-min(a)<2
assert abs(height*D['presentationScale253']-144)<1e-9
print('PASS252 28 connected native-resolution silhouettes; detached-pixel detector rejects bad fixture; one scale/atlas, no running foot offsets, <=2px gait-height variation and current254 relative size.')
