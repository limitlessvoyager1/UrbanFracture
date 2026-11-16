from PIL import Image
from pathlib import Path
import json,math
D=json.loads(Path('dist/weapon-motion249.js').read_text().split('WeaponMotionArt249=',1)[1].rstrip(';\n'));checks=[]
for hero,poses in D.items():
 assert len(poses)==8
 for n,q in enumerate(poses):
  im=Image.open('dist/'+q['src'].split('?')[0]).convert('RGBA');assert im.size==(q['w'],q['h']);assert q['scale']==1
  alpha=im.getchannel('A');assert set(alpha.getdata())=={0,255};assert alpha.getbbox()[3]==im.height
  for grip in [q['hand']]+([q['secondHand']] if q.get('secondHand') else []):
   x,y=round(grip[0]+q['ax']),round(grip[1]+q['ay']);assert 0<=x<im.width and 0<=y<im.height,(hero,n,'grip bounds');assert alpha.crop((max(0,x-3),max(0,y-3),min(im.width,x+4),min(im.height,y+4))).getbbox(),(hero,n,'grip must touch authored hand')
  if hero=='broxton' and n>=4:
   assert 'secondHand' in q
   distance=math.dist(q['hand'],q['secondHand']);assert 5<distance<18,(hero,n,'two close grips on one handle')
  checks.append({'hero':hero,'pose':n,'size':list(im.size),'hand':q['hand']})
Path('reports249/art-validation.json').write_text(json.dumps({'passed':True,'checks':checks,'limits':'Technical import and authored-grip validation; new artwork remains review-required.'},indent=2)+'\n')
print('PASS249',len(checks),'fixed-scale poses, opaque ground anchors and hand attachment pixels; Broxton two grips')
