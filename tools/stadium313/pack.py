from PIL import Image
from pathlib import Path
import shutil,json,statistics
root=Path('.');src=root/'source-art/stadium313';src.mkdir(exist_ok=True);assets=root/'dist/assets/stadium';new=root/'dist/assets/stadium313';new.mkdir(exist_ok=True)
files={'background':'exec-53f0aa80-4fb5-4f57-b990-1322e6110f85.png','run':'exec-36a4bbec-0b06-4a13-b88d-812faf927083.png','idle':'exec-9b0d1c17-e912-4df3-b7d2-95a917ea59c3.png'}
for k,n in files.items():shutil.copy2(Path('/workspace/scratch/96a3e452279b/generated_images')/n,src/(k+'-original.png'))
im=Image.open(src/'background-original.png');rows=[('concourse',0,258),('lockers',258,530),('field',530,772),('endzone',772,1024)]
for key,y,y2 in rows:
 p=assets/(key+'237.webp');shutil.copy2(p,src/p.name);im.crop((1,y,1535,y2)).save(p,quality=91,method=6)
data={}
for key,ncol,nrow in [('run',4,4),('idle',2,2)]:
 im=Image.open(src/(key+'-original.png')).convert('RGBA');pix=im.load()
 for y in range(im.height):
  for x in range(im.width):
   r,g,b,a=pix[x,y]
   if a<128:pix[x,y]=(0,0,0,0)
 frames=[];heights=[]
 for i in range(ncol*nrow):
  x=round(i%ncol*im.width/ncol);x2=round((i%ncol+1)*im.width/ncol);y=round(i//ncol*im.height/nrow);y2=round((i//ncol+1)*im.height/nrow);b=im.crop((x,y,x2,y2)).getbbox();frames.append({'rect':[x,y,x2-x,y2-y],'root':[(x2-x)*.5,(y2-y)*.985]});heights.append(b[3]-b[1])
 im.save(new/(key+'.webp'),quality=91,method=6)
 data[key]={'src':'assets/stadium313/'+key+'.webp','frames':frames,'scale':193/statistics.median(heights)}
Path('dist/stadium313-data.js').write_text('globalThis.Stadium313Art='+json.dumps(data,separators=(',',':'))+';\n')
# The new complete cycles replace the old two-pose run exports, which contain RGB trails.
p=Path('dist/fans-data237.js');shutil.copy2(p,src/p.name);d=json.loads(p.read_text().split('=',1)[1].rstrip(';\n'));d['frames']=d['frames'][:4];p.write_text('window.StadiumFans237='+json.dumps(d,separators=(',',':'))+';\n')
for i in range(4,8):
 p=assets/f'fans-{i}237.webp';shutil.copy2(p,src/p.name);p.unlink()
print('new assets',[(p.name,p.stat().st_size)for p in new.iterdir()])
