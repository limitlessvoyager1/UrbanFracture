# Current-only Orion271 asset evidence. No historical image or metadata is substituted.
from pathlib import Path
from PIL import Image
import json, hashlib, subprocess, math, numpy as np
R=Path(__file__).resolve().parents[2]
proof=json.loads((R/'reports271/import.json').read_text())['frames']
assert len(proof)==116
seen=set()
for q in proof:
 p=R/q['path']; assert p.resolve().is_relative_to((R/'dist/assets').resolve())
 im=Image.open(p).convert('RGBA'); a=np.array(im)
 assert list(im.size)==q['size']; assert set(np.unique(a[:,:,3]))<={0,255}
 assert a[:,:,3].max()==255 and a[:,:,3].min()==0
 assert im.getchannel('A').getbbox()[3]==im.height
 assert hashlib.sha256(p.read_bytes()).hexdigest()==q['after']
 assert q['path'] not in seen; seen.add(q['path'])
 blue=(a[:,:,2].astype(float)>a[:,:,0]*1.3)&(a[:,:,2]>a[:,:,1])&(a[:,:,3]>0)
 assert blue.sum()>20
metadata_frames=0
for name,expression in [('orion205-data.js','Orion205Data'),('weapon-art248.js','WeaponArt248'),('weapon-motion249.js','WeaponMotionArt249')]:
 d=json.loads(subprocess.check_output(['node',str(R/'tools/resolution342/data.cjs'),'dist/'+name,expression],cwd=R))
 for key,rows in d.items():
  if name!='orion205-data.js' and not key.startswith('orion'): continue
  for f in rows:
   if not f: continue
   p=(R/'dist'/f['src'].split('?')[0]).resolve(); assert p.is_relative_to((R/'dist/assets').resolve())
   assert Image.open(p).size==(f['w'],f['h']); assert '?v=271' in f['src']
   assert math.isfinite(f['ax'])
   if name=='orion205-data.js':
    assert math.isfinite(f['baseline']) and len(f['box'])==4 and all(math.isfinite(v) for v in f['box'])
   else: assert math.isfinite(f['ay'])
   for hand in ['hand','secondHand']:
    if hand in f: assert len(f[hand])==2 and all(math.isfinite(v) for v in f[hand])
   if 'scale' in f: assert math.isfinite(f['scale']) and f['scale']>0
   metadata_frames+=1
assert metadata_frames>0
print(json.dumps({'contract':'qa242-missing-history-v1','evidence':'current-only','frames':len(seen),'metadataFrames':metadata_frames,'historicalComparison':False,'certified':False}))
