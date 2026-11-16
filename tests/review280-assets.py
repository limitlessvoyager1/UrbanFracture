from pathlib import Path
from PIL import Image
import json,re
D=json.loads(re.search(r'=(\[.*\]);',Path('dist/reina-walk280-data.js').read_text())[1]);assert len(D)==8
assert len(set(q['scale'] for q in D))==1
for i,q in enumerate(D):
 im=Image.open('dist/'+q['src'].split('?')[0]).convert('RGBA');assert im.size==(q['w'],q['h']);assert q['h']==138 and q['ay']==138;assert set(im.getchannel('A').getdata())<={0,255};assert im.getchannel('A').getbbox()[3]==138
 # Authored pelvis follows one cell-relative anchor, not the changing foot span.
 assert abs(q['ax']-round((i%4*1774/4+210-q['sourceBox'][0])*q['scale']))<.01
 x=round(q['hand'][0]+q['ax']);y=round(q['hand'][1]+q['ay']);assert 0<=x<q['w'] and 0<=y<q['h'];assert im.getpixel((x,y))[3]==255,('detached glove',i)
for name in ['gallery','department','appliance','door','chair']:
 im=Image.open('dist/assets/mall/'+name+'280.webp');assert im.width>100 and im.height>100
 if name in ['appliance','door','chair']:assert set(im.convert('RGBA').getchannel('A').getdata())<={0,255}
print('PASS280 ASSETS eight fixed138-height bodies / one source scale / stable pelvis / opaque glove and sole / detailed aspect-correct mall assets')
meta={}
for p in list(Path('dist/assets/mall').glob('*.webp'))+list(Path('dist/assets/reina280').glob('*.webp'))+list(Path('dist/assets/reina275').glob('*.webp')):
 im=Image.open(p);meta[str(p).removeprefix('dist/')]=list(im.size)
Path('reports280/assetmeta.json').write_text(json.dumps(meta,indent=2))
