from PIL import Image
from pathlib import Path
import sys
out=Path('dist/assets/stadium')
for src,name,end in [(sys.argv[1],'outer-tailgate239',480),(sys.argv[2],'single-approach239',520)]:
 im=Image.open(src).convert('RGB');im=im.crop((0,0,im.width,end));im.save(out/(name+'.webp'),'WEBP',quality=90,method=6);print(name,im.size)
