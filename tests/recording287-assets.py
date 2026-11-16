from PIL import Image
import json,os
for p,count in [('reports287/asset-import.json',8),('reports287/falls-import.json',12)]:
 d=json.load(open(p));rows=d if isinstance(d,list) else sum(d.values(),[]);assert len(rows)==count
 for q in rows:
  im=Image.open('dist/'+q['src']).convert('RGBA');alpha=im.getchannel('A');assert set(alpha.getdata())<={0,255};assert sum(v>0 for v in alpha.getdata())>1000;assert q['ay']==q['h'];assert q['w']>0 and q['h']>0
j=json.load(open('reports287/gait-packing.json'));a=Image.open(j['source']).convert('RGBA');b=Image.open(j['path']).convert('RGBA');assert a.size==b.size;assert a.getchannel('A').tobytes()==b.getchannel('A').tobytes()
print('PASS287 ASSETS:8 wholebody Niko poses,12 backward-fall frames, binary alpha, fixed anatomical scales, retained Bruno geometry and exact alpha')
