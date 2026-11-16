from pathlib import Path
from PIL import Image
import json,hashlib,subprocess
r=Path(__file__).resolve().parents[1];D=json.loads((r/'reports277/import.json').read_text());n=0
for typ,rows in D.items():
 if typ=='hands':continue
 for q in rows:
  p=r/'dist'/q['src'].split('?')[0];im=Image.open(p).convert('RGBA');assert im.size==(q['w'],q['h']);assert q['ay']==q['h'];assert q['scale']>0;n+=3
  if 'repair277' in str(p):
   assert set(im.getchannel('A').get_flattened_data())<={0,255};assert im.getchannel('A').getbbox();n+=2
  if typ=='flint':
   x=round(q['ax']+q['hand'][0]);y=round(q['ay']+q['hand'][1]);assert 0<=x<im.width and 0<=y<im.height
   assert im.getchannel('A').crop((max(0,x-3),max(0,y-3),min(im.width,x+4),min(im.height,y+4))).getbbox();assert 138<=q['h']<=141;n+=3
assert len(D['dodge'])==8 and len(D['flint'])==2;n+=2
# No recolor/recompression of the existing Flint bodies to make room for new poses.
p=r/'dist/assets/sprites/flint-v1.webp';old=subprocess.check_output(['git','show','793905d83012bee9648aeb2f05982f1a2b646782:dist/assets/sprites/flint-v1.webp'],cwd=r);assert p.read_bytes()==old;n+=1
# Retired arc-only poses remain losslessly recoverable with source, and no active asset reference dangles.
for i in [1,2,3]:
 p=r/f'art-source277/retired-arc263/special-{i}.webp';assert p.read_bytes()==subprocess.check_output(['git','show',f'793905d83012bee9648aeb2f05982f1a2b646782:dist/assets/nightshade263/special-{i}.webp'],cwd=r);n+=1
print('PASS277 ASSETS',n,'eight new cutouts, fixed original aspect, binary alpha, authored fist pixels, matching140-unit Flint, two reused transitions; existing Flint atlas unchanged and retired arc sources preserved')
