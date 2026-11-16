"""Import the original alpha fire atlas, preserving complete cells and nozzle anchors."""
from pathlib import Path
from PIL import Image
import numpy as np,json
R=Path(__file__).resolve().parents[2]
im=Image.open(R/'source-art/nightshade348/flame.png').convert('RGBA')
(R/'dist/assets/nightshade348').mkdir(parents=True,exist_ok=True)
im.save(R/'dist/assets/nightshade348/flame.webp','WEBP',quality=94,method=4)
a=np.array(im);w,h=im.size;frames=[]
for i in range(8):
 x=i%2*(w//2);y=i//2*(h//4);tile=a[y:y+h//4,x:x+w//2]
 weights=np.maximum(0,tile[:,25:100,1].astype(float)-180)*(tile[:,25:100,3]/255)
 ys=weights.sum(axis=1);origin=float((np.arange(len(ys))*ys).sum()/ys.sum())
 frames.append({'rect':[x,y,w//2,h//4],'origin':[25,round(origin,2)]})
(R/'dist/nightshade-fire348.js').write_text('globalThis.NightshadeFire348='+json.dumps({'src':'assets/nightshade348/flame.webp','frames':frames},separators=(',',':'))+';\n')
