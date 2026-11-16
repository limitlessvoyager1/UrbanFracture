from metadata342 import metadata
from pathlib import Path
from PIL import Image
import json,hashlib,subprocess,numpy as np
R=Path(__file__).resolve().parents[1];proof=json.loads((R/'reports271/import.json').read_text())['frames'];assert len(proof)==116;seen=set()
for q in proof:
 p=R/q['path'];im=Image.open(p).convert('RGBA');a=np.array(im);assert list(im.size)==q['size'];assert set(np.unique(a[:,:,3]))<={0,255},q['path'];assert a[:,:,3].max()==255 and a[:,:,3].min()==0;assert im.getchannel('A').getbbox()[3]==im.height,q['path'];assert hashlib.sha256(p.read_bytes()).hexdigest()==q['after'];assert q['before']!=q['after'];assert q['path'] not in seen;seen.add(q['path']);blue=(a[:,:,2].astype(float)>a[:,:,0]*1.3)&(a[:,:,2]>a[:,:,1])&(a[:,:,3]>0);assert blue.sum()>20,q['path'];old=Image.open(__import__('io').BytesIO(subprocess.check_output(['git','show','8422de5a7b201bf3f72d58d1235e19ecb2d5537d:'+q['path']],cwd=R)));assert im.height==old.height,'unchanged pose height'
for name in ['orion205-data.js','weapon-art248.js','weapon-motion249.js']:
 expression={'orion205-data.js':'Orion205Data','weapon-art248.js':'WeaponArt248','weapon-motion249.js':'WeaponMotionArt249'}[name];d=metadata('dist/'+name,expression);old=metadata('dist/'+name,expression,'8422de5a7b201bf3f72d58d1235e19ecb2d5537d')
 for key,rows in d.items():
  for n,f in enumerate(rows):
   if not f:assert old[key][n] is None;continue
   o=old[key][n]
   if name=='weapon-motion249.js' and key=='reina' and n in [5,6]:
    assert {k:v for k,v in f.items() if k!='hand'}=={k:v for k,v in o.items() if k!='hand'}
    xy={5:(98,84),6:(110,90)}[n];assert f['hand']==[xy[0]-f['ax'],xy[1]-f['ay']];continue
   if name!='orion205-data.js' and not key.startswith('orion'):assert f==o;continue
   assert f['h']==o['h'];assert abs((f['ax']-o['ax'])-(f['w']-o['w'])/2)<1e-6
   for prop in ['hand','secondHand','scale','ay']:
    assert f.get(prop)==o.get(prop),(name,key,n,prop)
   im=Image.open(R/'dist'/f['src'].split('?')[0]);assert im.size==(f['w'],f['h']);assert '?v=271' in f['src']
print('PASS271 all116 art frames: complete replacement/alpha/palette/sole/source hashes; unchanged height/world origin/weapon hands, other heroes unchanged')
