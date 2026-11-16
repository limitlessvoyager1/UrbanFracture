from pathlib import Path
from PIL import Image
import numpy as np,json,hashlib
from scipy import ndimage as nd
src=Path('dist/assets/sprites/reina-rear-grab59.webp');original=src.read_bytes();Path('source-archive/build301/reina-rear-grab59-original.webp').write_bytes(original);im=Image.open(src).convert('RGBA').crop((197,48,1140,1199));a=np.array(im);lab,n=nd.label(a[:,:,3]>60);keep=lab==lab[500-48,650-197];a[~keep]=0;im=Image.fromarray(a).resize((472,576),Image.Resampling.NEAREST);im.save(src,lossless=True,method=6,exact=True)
p=Path('dist/sprites.js');s=p.read_text().replace("rect:[197,48,943,1151],seed:[650,500],anchor:[650,1199]","rect:[0,0,472,576],seed:[227,226],anchor:[226.5,575.5]").replace('drawFrame(c,$35,138.3/1151)','drawFrame(c,$35,138.3/1151*2)');p.write_text(s)
Path('reports301/rear-import.json').write_text(json.dumps(dict(originalSHA256=hashlib.sha256(original).hexdigest(),originalBytes=len(original),newBytes=src.stat().st_size,uniformImportScale=.5,worldImportScale=138.3/1151*2,originalWorldImportScale=138.3/1151,worldAnchorPreserved=True,reason='Related rear-grip source remains over twice the rendered height; one uniform native import, no per-pose resizing. Original bytes archived.'),indent=2));print('Rear-grip import',len(original),'->',src.stat().st_size)
