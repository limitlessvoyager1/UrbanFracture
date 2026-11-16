"""Original fictional PCBI office atlas; no pre-existing assets are modified."""
from pathlib import Path
from PIL import Image
import shutil,json
ROOT=Path(__file__).resolve().parents[2];src=Path(__file__).with_name('office-original.png');cache=Path('/workspace/scratch/96a3e452279b/generated_images/exec-3ebadef3-d72b-47f5-9baa-cec337d69cd5.png')
if not src.exists():shutil.copy2(cache,src)
im=Image.open(src).convert('RGB');out=ROOT/'dist/assets/feds316/office.webp';out.parent.mkdir(parents=True,exist_ok=True);im.save(out,quality=90,method=6)
bands=[0,221,442,664,903,1142,1378,1604,1774]
keys=['exterior','lobby','squad','interrogation','evidence','command','armory','lab']
floors=['roof','skybridge','skybridge','skybridge','garage','skybridge','garage','service']
scenes={key:{'rect':[2,bands[i]+2,im.width-4,bands[i+1]-bands[i]-4],'floorY':430,'ceilingY':68,'floorMaterial':floors[i],'tileOverlap':1}for i,key in enumerate(keys)}
data={'src':'assets/feds316/office.webp','width':im.width,'height':im.height,'scenes':scenes,'exteriorLanding':{'center':[220,169],'grassRect':[20,144,525,44],'entryRect':[646,65,213,119]}}
(ROOT/'dist/feds316-data.js').write_text('globalThis.Feds316Art='+json.dumps(data,separators=(',',':'))+';\n')
Path(__file__).with_name('metadata.json').write_text(json.dumps(data,indent=2)+'\n')
assert 400000<=out.stat().st_size<=600000
print('PCBI original atlas bytes',out.stat().st_size);print(json.dumps(data,indent=2))
