from PIL import Image
from pathlib import Path
from scipy import ndimage
import numpy as np,json
p=Path('/workspace/scratch/96a3e452279b/generated_images/exec-148e0b0c-3171-4954-af89-cade0c12ad46.png');Path('art-source332/fans.png').write_bytes(p.read_bytes());im=Image.open(p).convert('RGBA');W,H=im.size;cells=[]
for i in range(4):
 a=np.array(im.crop((round(i*W/4),0,round((i+1)*W/4),310)));lab,_=ndimage.label(a[:,:,3]>100,np.ones((3,3)));cnt=np.bincount(lab.ravel());cnt[0]=0;keep=lab==cnt.argmax();a[~keep]=0;ys,xs=np.where(keep);cells.append(Image.fromarray(a).crop((xs.min(),ys.min(),xs.max()+1,ys.max()+1)))
cw=max(q.width for q in cells)+4;ch=max(q.height for q in cells)+4;out=Image.new('RGBA',(cw*4,ch));frames=[]
for i,q in enumerate(cells):
 out.paste(q,(i*cw,0));frames.append(dict(rect=[i*cw,0,q.width,q.height],root=[q.width*.5,q.height],scale=193/q.height))
out.save('dist/assets/stadium/fans332.webp','WEBP',quality=90,method=6);Path('dist/fans332-data.js').write_text('globalThis.Stadium332Art='+json.dumps(dict(src='assets/stadium/fans332.webp?v=332',frames=frames),separators=(',',':'))+';')
print(out.size,Path('dist/assets/stadium/fans332.webp').stat().st_size)
