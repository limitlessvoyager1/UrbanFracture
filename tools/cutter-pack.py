"""Register authored source poses without uniform-grid clipping or per-pose body scaling."""
from pathlib import Path
from PIL import Image,ImageDraw
from scipy.ndimage import label,find_objects
import numpy as np,json,hashlib
R=Path(__file__).resolve().parents[1]
source=R/'source-art/backup-cutter/frames.png'
im=Image.open(source).convert('RGBA');a=np.asarray(im)
bands=[0,183,367,546,727,909,1090,1267,1448]
assert im.size==(1086,1448)
rects=[]
for row in range(8):
 mask=a[bands[row]:bands[row+1],:,3]>100;labels,n=label(mask);parts=[]
 for number,slices in enumerate(find_objects(labels),1):
  area=int((labels[slices]==number).sum())
  if area>1200:parts.append((slices[1].start,slices[0].start+bands[row],slices[1].stop,slices[0].stop+bands[row]))
 assert len(parts)==6,(row,len(parts))
 rects.extend(sorted(parts))
scale=min(190/np.median([y1-y0 for x0,y0,x1,y1 in rects[:12]]),238/max(x1-x0 for x0,y0,x1,y1 in rects),230/max(y1-y0 for x0,y0,x1,y1 in rects))
atlas=Image.new('RGBA',(1536,2048));proof=Image.new('RGB',(1536,2112),'#172433');pen=ImageDraw.Draw(proof);frames=[];records=[]
for i,(x0,y0,x1,y1) in enumerate(rects):
 # Two transparent-edge pixels retain source antialiasing. The exact source
 # bounds include the entire prone body and the extended slash blade.
 box=(max(0,x0-2),max(bands[i//6],y0-2),min(im.width,x1+2),min(bands[i//6+1],y1+2))
 pose=im.crop(box);size=(round(pose.width*scale),round(pose.height*scale));pose=pose.resize(size,Image.Resampling.LANCZOS)
 assert size[0]<=246 and size[1]<=238,(i,size)
 tile=Image.new('RGBA',(256,256));tile.alpha_composite(pose,(128-size[0]//2,240-size[1]));atlas.alpha_composite(tile,(i%6*256,i//6*256));proof.paste(tile,(i%6*256,64+i//6*256),tile);pen.text((i%6*256+6,64+i//6*256+4),str(i),fill='white')
 frames.append({'rect':[i%6*256,i//6*256,256,256],'ax':128,'ay':240})
 records.append({'frame':i,'sourceRect':list(box),'opaqueBounds':[x0,y0,x1,y1],'scale':scale,'width':size[0],'height':size[1],'sha256':hashlib.sha256(tile.tobytes()).hexdigest()})
target=R/'dist/assets/backup-cutter/cutter.webp';atlas.save(target,quality=88,method=6)
data={'src':'assets/backup-cutter/cutter.webp','frames':frames,'scale':.71,'bodyHeight':190}
(R/'dist/cutter-support-data.js').write_text('globalThis.CutterSupportData='+json.dumps(data,separators=(',',':'))+';\n')
proof.save(R/'reports/cutter-support/atlas.png');(R/'reports/cutter-support/registration.json').write_text(json.dumps({'sourceSha256':hashlib.sha256(source.read_bytes()).hexdigest(),'bands':bands,'fixedScale':scale,'poses':records,'webpBytes':target.stat().st_size},indent=2)+'\n')
print(json.dumps({'frames':len(frames),'fixedScale':scale,'bytes':target.stat().st_size}))
