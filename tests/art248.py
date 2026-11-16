from metadata342 import metadata
from PIL import Image
from pathlib import Path
import json
D=metadata('dist/weapon-art248.js','WeaponArt248');checks=[]
for hero,poses in D.items():
 assert len(poses)==8
 for n,q in enumerate(poses):
  im=Image.open('dist/'+q['src'].split('?')[0]).convert('RGBA');assert im.size==(q['w'],q['h']);assert im.getextrema()[3]==(0,255),(hero,n,im.getextrema()[3]);assert len(q['hand'])==2;assert q['scale']==1;assert 90<=q['h']<=(180 if '/combat249/' in '/'+q['src'] else 160),(hero,n,'native pixel density');checks.append({'hero':hero,'pose':n,'size':list(im.size),'alpha':'0..255','hand':q['hand']})
Path('reports248/art-validation.json').write_text(json.dumps({'passed':True,'frames':checks,'limit':'Technical alpha, dimension and attachment metadata checks; not an artistic certification.'},indent=2)+'\n');print('PASS248',len(checks),'transparent native-density sprite frames, fixed scale and hand metadata')
