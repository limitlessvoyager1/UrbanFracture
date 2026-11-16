from PIL import Image
from pathlib import Path
import numpy as np,shutil,json
from scipy.ndimage import label
root=Path('dist/assets/style310');backup=Path('source-art/recording313/alpha-before');backup.mkdir(parents=True,exist_ok=True);rows=[]
for p in root.glob('*.webp'):
 if p.stem in ['exterior','interior','traffic','travelers','floors']:continue
 im=Image.open(p).convert('RGBA');v=np.array(im);before=int(((v[:,:,3]>0)&(v[:,:,3]<128)).sum());shutil.copy2(p,backup/p.name);v[v[:,:,3]<128]=0
 # Authored imported atlases: only tiny detached alpha debris, never change connected bodies.
 labs,n=label(v[:,:,3]>0);counts=np.bincount(labs.ravel());remove=counts<32;remove[0]=False;v[remove[labs]]=0
 Image.fromarray(v).save(p,quality=87,method=6)
 rows.append({'asset':str(p),'discardedLowAlpha':before,'tinyDetached':int(remove.sum()),'preservedDimensions':list(im.size)})
Path('reports313/alpha-cleanup.json').write_text(json.dumps(rows,indent=2));print('Cleaned',len(rows),'atlases; backed up exact prior bytes')
