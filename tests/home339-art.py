from PIL import Image
from pathlib import Path
import json,copy
r=json.loads(Path('reports339/art-import.json').read_text());atlas=Image.open('dist/assets/home339/sitting.webp').convert('RGBA');count=0
def validate(frame):
 x,y,w,h=frame['rect'];a=atlas.crop((x,y,x+w,y+h));sx,sy,sw,sh=frame['sourceRect'];s=Image.open(frame['sourceFile']).convert('RGBA').crop((sx,sy,sx+sw,sy+sh));assert a.size==s.size and a.tobytes()==s.tobytes(),'Source pixel mismatch';box=a.getchannel('A').point(lambda v:255 if v>=128 else 0).getbbox();assert box and box[1]>0 and box[3]<h,'Clipped head/feet';assert abs(frame['anchor'][1]-box[3])<=0.1,'Invalid sole anchor';assert 0<frame['anchor'][0]<w,'Invalid anchor';return True
for hero,h in r['heroes'].items():
 assert h['scale']>0 and len(h['frames'])==4
 for f in h['frames']:assert validate(f);count+=1
bad=copy.deepcopy(r['heroes']['reina']['frames'][0]);bad['anchor'][1]-=8
try:validate(bad);raise RuntimeError('Detector accepted floating fixture')
except AssertionError:count+=1
bad=copy.deepcopy(r['heroes']['orion']['frames'][3]);bad['rect'][2]-=10
try:validate(bad);raise RuntimeError('Detector accepted cropped fixture')
except AssertionError:count+=1
Path('reports339/art-checks.json').write_text(json.dumps({'passed':True,'checks':count,'scope':'28 source-exact poses, sole anchors and two rejected mutations'},indent=2));print('PASS339 ART',count)
