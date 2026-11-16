"""Register generated full-body sprites into fixed 256px runtime cells; preserve alpha."""
from pathlib import Path
from PIL import Image,ImageDraw
import numpy as np,json,shutil
R=Path(__file__).resolve().parents[2]
def pack(role,source,cols,rows,bands=None):
 p=R/'source-art/backup377'/f'{role}.png';shutil.copy(source,p)
 im=Image.open(p).convert('RGBA');cw=im.width/cols
 if bands is None:bands=[round(i*im.height/rows) for i in range(rows+1)]
 cells=[]
 for i in range(cols*rows):
  cell=im.crop((round(i%cols*cw),bands[i//cols],round((i%cols+1)*cw),bands[i//cols+1]));a=np.asarray(cell);ys,xs=np.where(a[:,:,3]>100);assert len(xs)>100,(role,i)
  box=(int(xs.min()),int(ys.min()),int(xs.max())+1,int(ys.max())+1);cells.append((cell,box))
 scale=190/np.median([b[3]-b[1] for _,b in cells[:12]])
 atlas=Image.new('RGBA',(1536,2048));frames=[];metrics=[];proof=Image.new('RGB',(1536,2112),'#172433');pen=ImageDraw.Draw(proof)
 for i,(cell,b) in enumerate(cells):
  pose=cell.crop(b);w,h=pose.size;factor=scale
  # Source Hammer rows are packed with gradually tighter vertical gutters.
  # A row-wide registration factor keeps artwork anatomy on one body scale.
  if role=='hammer':factor*= [1,1.02,1.01,1.04,1.08,1.13,1.19,1.12,1.18,1.16,1.21,1.24][i//4]
  factor=min(factor,242/w,234/h);sized=pose.resize((round(w*factor),round(h*factor)),Image.Resampling.LANCZOS)
  tile=Image.new('RGBA',(256,256));tile.alpha_composite(sized,(128-sized.width//2,240-sized.height));atlas.alpha_composite(tile,(i%6*256,i//6*256));frames.append({'rect':[i%6*256,i//6*256,256,256],'ax':128,'ay':240});proof.paste(tile,(i%6*256,64+i//6*256),tile);pen.text((i%6*256+6,64+i//6*256+4),str(i),fill='white');metrics.append({'frame':i,'width':sized.width,'height':sized.height,'scale':factor})
 target=R/'dist/assets/backup377'/f'{role}.webp';atlas.save(target,quality=88,method=6);proof.save(R/'reports377'/f'{role}-atlas.png');(R/'reports377'/f'{role}-registration.json').write_text(json.dumps(metrics,indent=2))
 return {'src':f'assets/backup377/{role}.webp','frames':frames,'scale':.71 if role=='hammer' else .75,'bodyHeight':190}
if __name__=='__main__':
 import sys
 data={}
 data['hammer']=pack('hammer',sys.argv[1],4,12,[0,170,334,503,662,820,968,1108,1259,1400,1525,1647,1774])
 data['enforcer']=pack('enforcer',sys.argv[2],6,8)
 (R/'dist/backup377-data.js').write_text('globalThis.Backup377Data='+json.dumps(data,separators=(',',':'))+';\n')
