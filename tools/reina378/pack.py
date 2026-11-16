from pathlib import Path
from PIL import Image,ImageDraw
import numpy as np,json,shutil
R=Path(__file__).resolve().parents[2];p=R/'source-art/reina378/foundation.png';shutil.copy(R.parents[1]/'generated_images/exec-de26fe5c-cd94-413e-adae-61e7641b2f97.png',p)
im=Image.open(p).convert('RGBA');bands=[0,220,412,598,780,955,1128,1301,1448];cw=im.width/6;cells=[]
for i in range(48):
 cell=im.crop((round(i%6*cw),bands[i//6],round((i%6+1)*cw),bands[i//6+1]));a=np.asarray(cell);ys,xs=np.where(a[:,:,3]>100);assert len(xs)>100;cells.append((cell,(int(xs.min()),int(ys.min()),int(xs.max())+1,int(ys.max())+1)))
scale=190/float(np.median([b[3]-b[1] for _,b in cells[:4]]));atlas=Image.new('RGBA',(1536,2048));proof=Image.new('RGB',(1536,2112),'#172433');pen=ImageDraw.Draw(proof);frames=[];metrics=[]
for i,(cell,b)in enumerate(cells):
 pose=cell.crop(b);w,h=pose.size;factor=scale;assert w*factor<250 and h*factor<238,(i,w,h)
 tile=Image.new('RGBA',(256,256));sized=pose.resize((round(w*factor),round(h*factor)),Image.Resampling.LANCZOS);tile.alpha_composite(sized,(128-sized.width//2,240-sized.height));atlas.alpha_composite(tile,(i%6*256,i//6*256));proof.paste(tile,(i%6*256,64+i//6*256),tile);pen.text((i%6*256+5,64+i//6*256+5),str(i),fill='white');frames.append({'rect':[i%6*256,i//6*256,256,256],'ax':128,'ay':240});metrics.append({'frame':i,'width':sized.width,'height':sized.height,'scale':factor})
atlas.save(R/'dist/assets/reina378/foundation.webp',quality=90,method=6);proof.save(R/'reports378/atlas-review.png');(R/'reports378/registration.json').write_text(json.dumps(metrics,indent=2));(R/'dist/reina-stance378-data.js').write_text('globalThis.ReinaStance378Data='+json.dumps({'src':'assets/reina378/foundation.webp','frames':frames,'scale':.75,'authoredHeight':190},separators=(',',':'))+';\n');print('Registered48 foundation poses, single scale',scale)
