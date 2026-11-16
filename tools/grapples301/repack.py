from pathlib import Path
from PIL import Image
import numpy as np,json,hashlib,re,shutil
from scipy import ndimage as nd
p=Path('dist/reactions130-data.js');s=p.read_text();m=re.search(r'window.NeonGerman130Data=(.*?);\n',s);D=json.loads(m[1]);src=Path('dist/'+D['src']);archive=Path('source-archive/build301/reina-german130-original.webp');shutil.copy2(src,archive);im=Image.open(src).convert('RGBA');oldframes=json.loads(json.dumps(D['frames']));items=[]
for f in D['frames']:
 x,y,w,h=f['rect'];a=np.array(im.crop((x,y,x+w,y+h)));lab,n=nd.label(a[:,:,3]>60);label=lab[f['seed'][1]-y,f['seed'][0]-x];assert label>0;keep=lab==label;a[~keep,3]=0;a[~keep,:3]=0;yy,xx=np.nonzero(keep);box=[int(xx.min()),int(yy.min()),int(xx.max()+1),int(yy.max()+1)];items.append((a,box))
cw=max(b[2]-b[0] for a,b in items)+8;ch=max(b[3]-b[1] for a,b in items)+8;out=Image.new('RGBA',(cw*4,ch*3));proof=[]
for i,((a,b),f) in enumerate(zip(items,D['frames'])):
 ox,oy,w,h=f['rect'];nx=i%4*cw+4;ny=i//4*ch+4;piece=Image.fromarray(a).crop(b);out.paste(piece,(nx,ny));delta=[nx-ox-b[0],ny-oy-b[1]]
 for k in ['seed','anchor','hand']:f[k]=[f[k][j]+delta[j] for j in [0,1]]
 f['rect']=[nx,ny,piece.width,piece.height];proof.append(dict(frame=i,sourceBodyPixels=int((a[:,:,3]>0).sum())))
out.save(src,lossless=True,method=6,exact=True);p.write_text(s[:m.start(1)]+json.dumps(D,separators=(',',':'))+s[m.end(1):]);check=Image.open(src).convert('RGBA')
for i,(old,f,(a,b)) in enumerate(zip(oldframes,D['frames'],items)):
 x,y,w,h=f['rect'];v=np.array(check.crop((x,y,x+w,y+h)));expected=a[b[1]:b[3],b[0]:b[2]];assert np.array_equal(v,expected),(i,'pixel mismatch')
 for k in ['hand','seed']:assert [f[k][j]-f['anchor'][j] for j in [0,1]]==[old[k][j]-old['anchor'][j] for j in [0,1]]
Path('reports301/repack-validation.json').write_text(json.dumps(dict(originalBytes=archive.stat().st_size,newBytes=src.stat().st_size,originalSHA256=hashlib.sha256(archive.read_bytes()).hexdigest(),decodedBodyPixelsIdentical=True,anchorsIdentical=True,frames=proof),indent=2)+'\n');print('Lossless visible-body repack:',archive.stat().st_size,'->',src.stat().st_size)
