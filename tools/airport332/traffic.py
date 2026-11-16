from PIL import Image
from pathlib import Path
import json,numpy as np
p=Path('/workspace/scratch/96a3e452279b/generated_images/exec-07b3e01b-f596-49c0-a5f3-6f8b4d429ace.png');Path('art-source332/traffic.png').write_bytes(p.read_bytes());im=Image.open(p).convert('RGBA');a=np.array(im);a[:,:,3]=np.where(a[:,:,3]>240,255,np.where(a[:,:,3]<32,0,a[:,:,3]));im=Image.fromarray(a);bands=[(0,258),(258,522),(522,832),(832,1024)];frames=[]
for top,bottom in bands:
 aa=np.array(im.crop((0,top,im.width,bottom)))[:,:,3];ys,xs=np.where(aa>100);frames.append({'rect':[int(xs.min()),int(top+ys.min()),int(xs.max()-xs.min()+1),int(ys.max()-ys.min()+1)]})
im.save('dist/assets/style310/traffic.webp','WEBP',quality=94,method=6)
wheels=[[[574,197,50],[949,197,50]],[[573,463,54],[970,463,54]],[[344,765,56],[1104,765,56]],[[364,982,42],[1204,982,42]]]
Path('dist/airport332-data.js').write_text('globalThis.Style310Data.traffic='+json.dumps({'src':'assets/style310/traffic.webp?v=332','frames':frames,'wheels332':wheels},separators=(',',':'))+';')
print(frames)
