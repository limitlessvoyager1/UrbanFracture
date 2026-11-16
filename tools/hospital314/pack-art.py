"""Pack original hospital background atlases; no existing production art is changed."""
from pathlib import Path
from PIL import Image
import json,shutil
ROOT=Path(__file__).resolve().parents[2]
src=ROOT/'source-art/hospital314';out=ROOT/'dist/assets/hospital314'
src.mkdir(exist_ok=True,parents=True);out.mkdir(exist_ok=True,parents=True)
inputs={'main':Path('/workspace/scratch/96a3e452279b/generated_images/exec-91060acf-b2e9-4228-a9d3-dbb153093c8b.png'),'services':Path('/workspace/scratch/96a3e452279b/generated_images/exec-a4fbff0b-4d82-48d8-8106-39ebcea8fa2a.png')}
keys={'main':['roof','ward','vip','rehab','cafeteria','diagnostics','garage','skybridge'],'services':['pharmacy','morgue','laundry','loading','surgery','oncology']}
data={'sheets':{},'scenes':{}}
for name,p in inputs.items():
 original=src/(name+'-original.png')
 if p.exists() and not original.exists():shutil.copy2(p,original)
 im=Image.open(original).convert('RGB');im.save(out/(name+'.webp'),quality=88,method=6)
 data['sheets'][name]={'src':'assets/hospital314/'+name+'.webp','width':im.width,'height':im.height}
 for i,key in enumerate(keys[name]):
  y=round(i*im.height/len(keys[name]))+2;y2=round((i+1)*im.height/len(keys[name]))-2
  data['scenes'][key]={'sheet':name,'rect':[2,y,im.width-4,y2-y],'floorRect':[32,y2-12,im.width-64,10],'floorY':430,'ceilingY':68,'tileOverlap':1}
(ROOT/'dist/hospital314-data.js').write_text('globalThis.Hospital314Art='+json.dumps(data,separators=(',',':'))+';\n')
(src/'metadata.json').write_text(json.dumps(data,indent=2)+'\n')
print({p.name:p.stat().st_size for p in out.iterdir()});print('TOTAL',sum(p.stat().st_size for p in out.iterdir()))
