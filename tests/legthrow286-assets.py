from PIL import Image
from pathlib import Path
import json
D=json.load(open('reports286/asset-import.json'))
assert len(D)==12 and len({q['sourceScale'] for q in D})==1
for q in D:
 im=Image.open('dist/'+q['src']).convert('RGBA');a=im.getchannel('A');assert set(a.getdata())<={0,255};assert sum(v>0 for v in a.getdata())>1500
 assert q['ay']==q['h'] and q['w']>0 and q['h']>0
 assert all(len(q[k])==2 for k in ['socket','head','hip'])
assert len(list(Path('art-source286/retired-throat283').glob('*.webp')))==13
print('PASS286 ASSETS:12 fixed-anatomical-scale wholebody poses, hand/head/hip metadata, binary alpha;13 superseded poses recoverable outside deployment')
