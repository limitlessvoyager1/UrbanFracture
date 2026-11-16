from PIL import Image
from pathlib import Path
import json,statistics,shutil
B=Path(__file__).resolve().parents[2];src=Path('/workspace/scratch/96a3e452279b/generated_images/exec-e0277f9d-387c-40eb-af94-94ab1d5e6593.png');shutil.copy2(src,B/'source-art/unique311/sword-original.png');im=Image.open(src).convert('RGBA');im.putalpha(im.getchannel('A').point(lambda a:0 if a<32 else a));w,h=im.size;frames=[]
for i in range(24):
 x=round(i%8*w/8);y=round(i//8*h/3);x1=round((i%8+1)*w/8);y1=round((i//8+1)*h/3);originalX=x;cellWidth=x1-x
 if i==11:x1+=16
 if i==12:x+=16
 cv=im.crop((x,y,x1,y1));b=cv.getchannel('A').point(lambda a:255 if a>96 else 0).getbbox();assert b;frames.append({'rect':[x,y,x1-x,y1-y],'ax':cellWidth*.45+originalX-x,'ay':b[3],'bounds':list(b)})
scale=148/statistics.median(frames[i]['bounds'][3]-frames[i]['bounds'][1] for i in [7,8,15,23]);out=B/'dist/assets/style310/unique311.webp';im.save(out,quality=90,method=4);data={'src':'assets/style310/unique311.webp','frames':frames,'scale':scale,'canonicalHeight':148};(B/'dist/unique311-data.js').write_text('globalThis.UniqueArt311='+json.dumps(data,separators=(',',':'))+';\n');(B/'source-art/unique311/packing.json').write_text(json.dumps(data,indent=2));print('Packed24 frames',scale,out.stat().st_size)
