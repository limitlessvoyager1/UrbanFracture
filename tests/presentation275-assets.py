from pathlib import Path
from PIL import Image
import re,json
D=json.loads(re.search(r'=(\[.*\]);',Path('dist/reina-idle-walk275-data.js').read_text())[1])
for q in D:
 im=Image.open(Path('dist')/q['src'].split('?')[0]).convert('RGBA')
 assert im.size==(q['w'],q['h'])
 assert set(im.getchannel('A').getdata()) <= {0,255}
 assert im.getchannel('A').getbbox()[3]==q['h']
 x,y=q['hand'];assert 0<=x+q['ax']<q['w'] and 0<=y+q['ay']<q['h']
print('PASS275 ten binary-alpha, uncropped, fixed-scale gait sprites and valid glove anchors')
