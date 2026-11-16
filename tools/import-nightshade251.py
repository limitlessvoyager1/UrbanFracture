from pathlib import Path
from PIL import Image
import json
r=Path(__file__).resolve().parents[1];im=Image.open(r/'art-source251/foundation.png').convert('RGBA');w,h=im.size;cells=[]
for n in range(20):
 x0=round(n%5*w/5);y0=round(n//5*h/4);x1=round((n%5+1)*w/5);y1=round((n//5+1)*h/4)
 if n==15:x1+=35
 cell=im.crop((x0,y0,x1,y1));b=cell.getchannel('A').point(lambda a:255 if a>=64 else 0).getbbox();cells.append((cell,b))
scale=150/(cells[0][1][3]-cells[0][1][1]);D=[]
for n,(cell,b) in enumerate(cells):
 crop=cell.crop(b);crop=crop.resize((round(crop.width*scale),round(crop.height*scale)),Image.Resampling.NEAREST);crop.putalpha(crop.getchannel('A').point(lambda a:255 if a>=128 else 0));p=r/'dist/assets/nightshade251'/f'foundation-{n}.webp';p.parent.mkdir(exist_ok=True);crop.save(p,'WEBP',lossless=True,quality=100,method=6,exact=True)
 ax=crop.width/2;ay=crop.getchannel('A').getbbox()[3]+(8 if n in [6,8] else 0)
 D.append({'src':str(p.relative_to(r/'dist'))+'?v=251','w':crop.width,'h':crop.height,'ax':ax,'ay':ay,'scale':1})
(r/'dist/nightshade-art251.js').write_text('window.NightshadeArt251='+json.dumps(D,separators=(',',':'))+';\n');(r/'reports251/art-import.json').write_text(json.dumps({'sourceSize':[w,h],'fixedImportScale':scale,'frames':D},indent=2)+'\n');print('Imported20 poses;',sum(p.stat().st_size for p in (r/'dist/assets/nightshade251').glob('*')),'bytes')
