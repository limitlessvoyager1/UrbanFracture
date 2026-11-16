from PIL import Image
from pathlib import Path
import json,shutil,statistics
B=Path(__file__).resolve().parents[2];S=B/'source-art/style310';O=B/'dist/assets/style310';d=json.loads((S/'packing.json').read_text());paths=json.loads((S/'generated-paths.json').read_text())
files={'cartwheel':'exec-b874a5ed-346c-4fc3-a4b2-04ba03aea81e.png','kip':'exec-1685ee7a-3e28-40c4-a689-3356dc90c176.png','armed':'exec-53f84681-77f6-4df7-9376-930149d3c32b.png'}
for key,file in files.items():
 p=B.parents[1]/'generated_images'/file;shutil.copy2(p,S/(key+'-original.png'));im=Image.open(p).convert('RGBA');w,h=im.size;assert im.getchannel('A').getextrema()[0]==0
 im.putalpha(im.getchannel('A').point(lambda a:0 if a<32 else a));cols=4 if key=='armed' else 2;rows=4;frames=[]
 for i in range(cols*rows):
  x,y=round(i%cols*w/cols),round(i//cols*h/rows);x1,y1=round((i%cols+1)*w/cols),round((i//cols+1)*h/rows);f=im.crop((x,y,x1,y1));b=f.getchannel('A').point(lambda a:255 if a>96 else 0).getbbox();assert b
  frames.append({'rect':[x,y,x1-x,y1-y],'ax':(x1-x)*.45,'ay':b[3],'bounds':list(b)})
 scale=d['gait']['scale'] if key=='armed' else 148/(h/4*.96)
 if key=='kip':
  ground=statistics.median(frames[i]['bounds'][3] for i in [0,5,6,7])
  for f in frames:f['ay']=ground
 im.save(O/(key+'.webp'),quality=87,method=4)
 d[key]={'src':'assets/style310/'+key+'.webp','scale':scale,'canonicalHeight':148,'frames':frames,'sourceSize':[w,h],'calibration':[7] if key!='armed' else list(range(8))};paths[key]=str(p)
(S/'packing.json').write_text(json.dumps(d,indent=2));(S/'generated-paths.json').write_text(json.dumps(paths,indent=2));(B/'dist/style310-data.js').write_text('globalThis.Style310Data='+json.dumps(d,separators=(',',':'))+';\n')
