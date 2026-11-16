from PIL import Image
from pathlib import Path
from scipy.ndimage import label
import numpy as np,json,shutil
p=Path('/workspace/scratch/96a3e452279b/generated_images/exec-cea80e31-6492-402a-b0fa-e62c5ce6e6c7.png');out=Path('dist/assets/recording313');out.mkdir(exist_ok=True,parents=True);shutil.copy2(p,'source-art/recording313/downstab-original.png');im=Image.open(p).convert('RGBA');v=np.array(im);v[v[:,:,3]<128]=0;labs,n=label(v[:,:,3]>0);counts=np.bincount(labs.ravel());small=counts<32;small[0]=False;v[small[labs]]=0;im=Image.fromarray(v);im.save(out/'reina-downstab.webp',quality=92,method=6)
frames=[]
# Foot roots are separate from blade tips; all cells retain one anatomical scale.
roots=[365,360,378,420,440,440,440,440]
for i in range(8):
 x=round(i%4*im.width/4);y=round(i//4*im.height/2);x2=round((i%4+1)*im.width/4);y2=round((i//4+1)*im.height/2);box=im.crop((x,y,x2,y2)).getbbox();frames.append({'rect':[x,y,x2-x,y2-y],'ax':(x2-x)*.51,'ay':min(roots[i],box[3]-1),'bounds':box})
scale=148/(frames[7]['bounds'][3]-frames[7]['bounds'][1]);Path('dist/reina-dive313-data.js').write_text('globalThis.ReinaDive313Data='+json.dumps({'src':'assets/recording313/reina-downstab.webp','scale':scale,'frames':frames},separators=(',',':'))+';\n');print('Scale',scale)
