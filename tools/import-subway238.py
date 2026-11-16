from PIL import Image
from pathlib import Path
import sys,json
out=Path('dist/assets/subway');out.mkdir(exist_ok=True)
im=Image.open(sys.argv[1]).convert('RGB')
# Authored row boundaries, measured on the generated original rather than assuming equal cells.
for n,a,b in [('arrival',0,215),('maintenance',215,414),('departure',414,590),('car',590,724)]:
 p=im.crop((0,a,im.width,b));p.save(out/(n+'238.webp'),'WEBP',quality=90,method=6)
im=Image.open(sys.argv[2]).convert('RGBA');meta=[]
for n,a,b in [('train-closed',0,363),('train-open',363,im.height)]:
 p=im.crop((0,a,im.width,b));alpha=p.getchannel('A');bbox=alpha.getbbox();p=p.crop(bbox);p.save(out/(n+'238.webp'),'WEBP',quality=90,method=6);meta.append({'name':n,'size':p.size,'alphaExtrema':p.getchannel('A').getextrema()})
print(json.dumps(meta))
