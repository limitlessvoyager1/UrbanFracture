from PIL import Image
from pathlib import Path
import json,shutil,statistics
p=Path('/workspace/scratch/96a3e452279b/generated_images/exec-a73c8e32-6543-4b40-b160-d25abdf2f1b2.png');src=Path('reports313/enemies/source');src.mkdir(exist_ok=True,parents=True);shutil.copy2(p,src/'baylor-walk-original.png');im=Image.open(p).convert('RGBA');pix=im.load()
for y in range(im.height):
 for x in range(im.width):
  if pix[x,y][3]<96:pix[x,y]=(0,0,0,0)
im=im.resize((1344,672),Image.Resampling.LANCZOS);frames=[];heights=[]
for i in range(8):
 x=i%4*336;y=i//4*336;rect=[x,y,336,336];q=im.crop((x,y,x+336,y+336)).getchannel('A').point(lambda a:255 if a>128 else 0).getbbox();heights.append(q[3]-q[1]);frames.append({'rect':rect,'ax':168,'ay':q[3]-1})
out=Path('dist/assets/enemies313');out.mkdir(exist_ok=True,parents=True);im.save(out/'baylor-walk.webp',quality=90,method=6);d={'baylorWalk':{'src':'assets/enemies313/baylor-walk.webp','scale':170/statistics.median(heights),'frames':frames,'anatomicalHeight':170,'sourceHeights':heights}}
Path('dist/enemy313-data.js').write_text('globalThis.Enemy313Data='+json.dumps(d,separators=(',',':'))+';\n');print('packed', (out/'baylor-walk.webp').stat().st_size,'bytes',d['baylorWalk']['scale'])
p=Path('/workspace/scratch/96a3e452279b/generated_images/exec-b44ed91f-8f3b-4262-b157-63ad82b34215.png');shutil.copy2(p,src/'baylor-helmet-original.png');im=Image.open(p).convert('RGBA');pix=im.load()
for y in range(im.height):
 for x in range(im.width):
  if pix[x,y][3]<96:pix[x,y]=(0,0,0,0)
im=im.resize((1600,680),Image.Resampling.LANCZOS);im.save(out/'baylor-helmet.webp',quality=90,method=6);native=json.loads(Path('dist/baylor-data237.js').read_text().split('=',1)[1].rstrip(';\n'));frames=[]
for j,i in enumerate(range(8,16)):
 x=j%4*400;y=j//4*340;q=native['frames'][i];b=im.crop((x,y,x+400,y+340)).getchannel('A').point(lambda a:255 if a>128 else 0).getbbox();frames.append({'rect':[x,y,400,340],'ax':200+q['root'][0]-q['width']/2,'ay':b[3]-1})
d['baylorHelmet']={'src':'assets/enemies313/baylor-helmet.webp','scale':170/296,'frames':frames,'nativeFirst':8,'anatomicalHeight':170}
Path('dist/enemy313-data.js').write_text('globalThis.Enemy313Data='+json.dumps(d,separators=(',',':'))+';\n');print('helmet packed', (out/'baylor-helmet.webp').stat().st_size,'bytes')
