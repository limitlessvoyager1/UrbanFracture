from pathlib import Path
from PIL import Image
import json,numpy as np
R=Path(__file__).resolve().parents[2];out=R/'dist/assets/broxton356';out.mkdir(exist_ok=True)
rows=json.loads((R/'reports356/sources.json').read_text());sheets=[];dims=[]
for n in range(6):
 im=Image.open(R/f'source-art/broxton356/redraw-{n}.png').convert('RGBA');a=np.array(im);a[a[:,:,3]<12]=0;im=Image.fromarray(a);im.save(out/f'poses-{n}.webp',quality=94,method=4);sheets.append(f'assets/broxton356/poses-{n}.webp');dims.append(im.size)
frames={}
for q in rows:
 W,H=dims[q['group']];cw,ch=W/4,H/8;s=450/max(q['w'],q['h']);w=q['w']*s/512*cw;h=q['h']*s/512*ch;i=q['cell'];frames[q['id']]={'sheet':q['group'],'rect':[i%4*cw+(cw-w)/2,i//4*ch+(ch-h)/2,w,h]}
p=R/'source-art/broxton356/pool.png'
if p.exists():
 im=Image.open(p).convert('RGBA');a=np.array(im);a[a[:,:,3]<12]=0;im=Image.fromarray(a);im.save(out/'pool.webp',quality=94,method=4);sheet=len(sheets);sheets.append('assets/broxton356/pool.webp');cw,ch=im.width/2,im.height
 for i in range(2):
  q=next(q for q in rows if q['id']=='pool/'+str(i));s=450/max(q['w'],q['h']);w=q['w']*s/512*cw;h=q['h']*s/512*ch;frames[q['id']]={'sheet':sheet,'rect':[i*cw+(cw-w)/2,(ch-h)/2,w,h]}
d={'count':len(rows),'sheets':sheets,'frames':frames}
(R/'dist/broxton356-data.js').write_text('globalThis.Broxton356Data='+json.dumps(d,separators=(',',':'))+';\n')
print('Packed',len(rows),'Broxton pose slots')
