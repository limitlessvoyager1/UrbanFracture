from pathlib import Path
from PIL import Image
import json
R=Path(__file__).resolve().parents[2];rows=json.loads((R/'reports360/sources.json').read_text());images={}
for j in range((len(rows)+31)//32):
 cv=Image.new('RGBA',(2048,4096))
 for i,q in enumerate(rows[j*32:j*32+32]):
  path=q['path'];im=images.setdefault(path,Image.open(R/'dist'/path).convert('RGBA'));x,y,w,h=q['rect'];tile=im.crop((round(x),round(y),round(x+w),round(y+h)));s=450/max(w,h);tile=tile.resize((round(w*s),round(h*s)),Image.Resampling.LANCZOS);cv.alpha_composite(tile,(i%4*512+(512-tile.width)//2,i//4*512+(512-tile.height)//2));q.update(group=j,cell=i,w=w,h=h)
 cv.save(R/f'source-art/nightshade360/template-{j}.png')
(R/'reports360/sources.json').write_text(json.dumps(rows,indent=2));print('Prepared',len(rows),'pose slots')
