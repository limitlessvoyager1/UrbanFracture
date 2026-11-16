from pathlib import Path
from PIL import Image
from scipy import ndimage
import numpy as np,json
p=Path('/workspace/scratch/96a3e452279b/generated_images/exec-6a433551-d7e8-4913-ac6d-51af2946150f.png');Path('art-source333/traffic.png').write_bytes(p.read_bytes());im=Image.open(p).convert('RGBA');a=np.array(im);lab,n=ndimage.label(a[:,:,3]>100,np.ones((3,3)));cnt=np.bincount(lab.ravel());cnt[0]=0;ids=sorted(np.argsort(cnt)[-5:],key=lambda j:np.where(lab==j)[0].min());cells=[];boxes=[]
for j in ids:
 keep=lab==j;ys,xs=np.where(keep);b=(xs.min(),ys.min(),xs.max()+1,ys.max()+1);q=a[b[1]:b[3],b[0]:b[2]].copy();q[:,:,3]=np.where(keep[b[1]:b[3],b[0]:b[2]],q[:,:,3],0);cells.append(Image.fromarray(q));boxes.append(list(map(int,b)))
cw=max(q.width for q in cells)+4;ch=max(q.height for q in cells)+4;out=Image.new('RGBA',(cw,ch*5));frames=[];raw=[[[x,y,r*.82] for x,y,r in row] for row in json.loads(Path('tools/nova333/wheels.json').read_text())]
for i,(q,b) in enumerate(zip(cells,boxes)):
 out.paste(q,(0,i*ch));frames.append(dict(rect=[0,i*ch,q.width,q.height],bottom=q.height,wheels=[[x-b[0],y-b[1],r] for x,y,r in raw[i]]))
out.save('dist/assets/traffic333.webp','WEBP',quality=91,method=6);Path('dist/traffic333-data.js').write_text('globalThis.UptownTraffic333='+json.dumps(dict(src='assets/traffic333.webp?v=333',frames=frames),separators=(',',':'))+';');print(boxes,Path('dist/assets/traffic333.webp').stat().st_size)
