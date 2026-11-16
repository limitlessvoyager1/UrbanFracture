from PIL import Image
from pathlib import Path
from scipy import ndimage
import numpy as np,json
im=Image.open('art-source331/guard.png').convert('RGBA');W,H=im.size;cells=[]
for n in range(32):
 a=np.array(im.crop((round(n%4*W/4),round(n//4*H/8),round((n%4+1)*W/4),round((n//4+1)*H/8)))); lab,_=ndimage.label(a[:,:,3]>100,np.ones((3,3)));cnt=np.bincount(lab.ravel());cnt[0]=0;keep=lab==cnt.argmax();a[~keep]=0;ys,xs=np.where(keep);q=Image.fromarray(a).crop((xs.min(),ys.min(),xs.max()+1,ys.max()+1));cells.append(q)
cw=max(q.width for q in cells)+4;ch=max(q.height for q in cells)+4;atlas=Image.new('RGBA',(cw*4,ch*8));frames=[]
for n,q in enumerate(cells):
 x=n%4*cw;y=n//4*ch;atlas.paste(q,(x,y));frames.append(dict(rect=[x,y,q.width,q.height],ax=q.width*.5,ay=q.height))
atlas.save('dist/assets/prison/guard331.webp','WEBP',quality=88,method=6)
Path('dist/guard331-data.js').write_text('globalThis.Guard331Data='+json.dumps(dict(src='assets/prison/guard331.webp?v=331',scale=140/cells[0].height,frames=frames),separators=(',',':'))+';')
print(atlas.size,Path('dist/assets/prison/guard331.webp').stat().st_size)
