from pathlib import Path
from PIL import Image
import numpy as np,json,hashlib
R=Path(__file__).resolve().parents[2];d=json.loads((R/'dist/broxton359-data.js').read_text().split('=',1)[1].rstrip(';\n'));images=[Image.open(R/'dist'/p).convert('RGBA') for p in d['sheets']];records=[]
def audit(label,im):
 a=np.array(im).astype(float);r,g,b,alpha=[a[:,:,i] for i in range(4)];n=int(((r>45)&(r>g*1.5)&(b>g*.9)&(r>b*1.25)&(b>12)&(alpha>96)).sum());assert n>10,(label,'missing burgundy top',n);assert (alpha>96).sum()>80,(label,'empty pose');records.append({'pose':label,'burgundyPixels':n,'nonempty':True})
for label,q in d['frames'].items():
 x,y,w,h=q['rect'];audit(label,images[q['sheet']].crop((round(x),round(y),round(x+w),round(y+h))))
for mode,q in d['gaits'].items():
 im=Image.open(R/'dist'/q['src']).convert('RGBA');hashes=set()
 for i,f in enumerate(q['frames']):
  x,y,w,h=f['rect'];crop=im.crop((x,y,x+w,y+h));audit(mode+'/'+str(i),crop);hashes.add(hashlib.sha256(crop.tobytes()).hexdigest());p=crop.getpixel(tuple(f['hand']));assert p[3]>96 and max(p[:3])<150 and max(p[:3])-min(p[:3])<45,(mode,i,'black glove socket',p)
 assert len(hashes)==12,(mode,'must be twelve unique full-body frames')
assert len(records)==205
(R/'reports359/asset-audit.json').write_text(json.dumps({'pass':True,'poseSlots':181,'uniqueWalkFrames':12,'uniqueRunFrames':12,'blackGloveSockets':24,'records':records},indent=2)+'\n')
print('PASS359 all205 pose/gait slots contain burgundy; 24 black glove sockets; 12 unique frames per gait')
