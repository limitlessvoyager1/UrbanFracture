from pathlib import Path
from PIL import Image
from scipy.ndimage import uniform_filter
import numpy as np,json,math,hashlib
base=Path('/workspace/scratch/96a3e452279b/urban-fracture-airport-recovery/.sites-checkout/dist/assets');out=Path('/workspace/scratch/96a3e452279b/budget316/near-lossless');out.mkdir(exist_ok=True);rows=[]
for f in ['estates-avenue196.webp','uptown-block-c155.webp','uptown-block-a155.webp','grand-hotel-lobby96.webp']:
 p=base/f;a=np.asarray(Image.open(p).convert('RGB'));b=a&254;q=out/f;Image.fromarray(b).save(q,format='WEBP',lossless=True,method=6,exact=True)
 b=np.asarray(Image.open(q).convert('RGB'));x=a.astype(np.float64);y=b.astype(np.float64);C1=(.01*255)**2;C2=(.03*255)**2;u=uniform_filter(x,size=(7,7,1));v=uniform_filter(y,size=(7,7,1));xx=(uniform_filter(x*x,size=(7,7,1))-u*u)*49/48;yy=(uniform_filter(y*y,size=(7,7,1))-v*v)*49/48;xy=(uniform_filter(x*y,size=(7,7,1))-u*v)*49/48;s=((2*u*v+C1)*(2*xy+C2))/((u*u+v*v+C1)*(xx+yy+C2));delta=x-y;mse=np.mean(delta*delta)
 r=dict(file=f,originalBytes=p.stat().st_size,newBytes=q.stat().st_size,saved=p.stat().st_size-q.stat().st_size,dimensions=Image.open(p).size,ssim=float(s[3:-3,3:-3].mean()),psnr=10*math.log10(255**2/mse),meanAbs=float(abs(delta).mean()),maxAbs=float(abs(delta).max()),method='Clear one least-significant RGB bit, then exact lossless WebP; no resizing, chroma subsampling or spatial filter',originalSha256=hashlib.sha256(p.read_bytes()).hexdigest(),candidateSha256=hashlib.sha256(q.read_bytes()).hexdigest());assert r['maxAbs']<=1;rows.append(r);print(json.dumps(r),flush=True)
(out/'metrics.json').write_text(json.dumps(rows,indent=2))
