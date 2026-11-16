from PIL import Image
from pathlib import Path
import json,re,numpy as np
R=Path(__file__).resolve().parents[1];s=(R/'dist/carmen-recoil274-data.js').read_text();d=json.loads(s[s.index('['):s.rindex(']')+1]);assert len(d)==3
for q in d:
 im=Image.open(R/'dist'/q['src'].split('?')[0]).convert('RGBA');a=np.array(im);assert im.size==(q['w'],q['h']);assert set(np.unique(a[:,:,3]))<={0,255};assert im.getchannel('A').getbbox()[3]==im.height;assert q['ay']==im.height;assert 0<q['ax']<im.width;assert q['scale']==d[0]['scale'];assert 120<=im.height<=140
print('PASS274 three grounded Carmen frames, same source scale, binary alpha, sole anchors and approved human-size envelope')
