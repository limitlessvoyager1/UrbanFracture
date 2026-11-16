from pathlib import Path
from PIL import Image
import json,re,numpy as np
R=Path(__file__).resolve().parents[1]
s=(R/'dist/reina-hook272-data.js').read_text();d=json.loads(re.search(r'=\s*(\[[\s\S]*\]);',s)[1]);assert len(d)==12
for q in d:
 im=Image.open(R/'dist'/q['src'].split('?')[0]).convert('RGBA');a=np.array(im);assert im.size==(q['w'],q['h']);assert set(np.unique(a[:,:,3]))<={0,255};assert im.getchannel('A').getbbox()[3]==q['h'];assert q['ay']==q['h'];assert 0<q['ax']<q['w'];assert abs(q['sourceScale']-138/324)<1e-9
assert len(set((R/'dist'/q['src'].split('?')[0]).read_bytes() for q in d))==12
print('PASS272 ASSETS twelve unique full-body frames, one fixed scale, binary transparent alpha, opaque support sole at anchor')
