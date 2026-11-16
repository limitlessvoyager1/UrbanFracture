from pathlib import Path
from PIL import Image
import json,numpy as np
R=Path(__file__).resolve().parents[1];d=json.loads((R/'dist/reina-grab279-data.js').read_text().split('=',1)[1].rstrip(';\n'));assert len(d)==8
for q in d:
 im=Image.open(R/'dist'/q['src'].split('?')[0]).convert('RGBA');a=np.array(im);assert im.size==(q['w'],q['h']);assert set(np.unique(a[:,:,3]))<={0,255};assert im.getchannel('A').getbbox()[3]==q['ay'];assert q['scale']==138/407;assert np.count_nonzero(a[:,:,3])>3500
m=json.loads((R/'art-source279/import.json').read_text());assert m['unusedPose']==[2];assert (R/'art-source279/reina-grab-crouch.png').is_file()
print('PASS279 assets8binary-alpha cutouts, one source scale, opaque sole anchors and archived draft')
