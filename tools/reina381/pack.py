from pathlib import Path
from PIL import Image,ImageDraw
import numpy as np,json,shutil
R=Path(__file__).resolve().parents[2];data={}
for name,file,bands,norm in [('loc','exec-c23c2ab4-8092-43c8-a95c-5cda7e10e524.png',[0,182,368,546,734,912,1086,1267,1448],range(4)),('att','exec-689baddf-a691-4f1d-8f11-588b8ea54d7f.png',[0,178,368,548,723,907,1091,1274,1448],range(42,48))]:
 p=R/'source-art/reina381'/f'{name}.png';shutil.copy(R.parents[1]/'generated_images'/file,p);im=Image.open(p).convert('RGBA');cells=[];cw=im.width/6
 for i in range(48):
  cell=im.crop((round(i%6*cw),bands[i//6],round((i%6+1)*cw),bands[i//6+1]));a=np.asarray(cell);ys,xs=np.where(a[:,:,3]>100);b=(int(xs.min()),int(ys.min()),int(xs.max())+1,int(ys.max())+1);cells.append((cell,b))
 scale=190/np.median([cells[i][1][3]-cells[i][1][1]for i in norm]);out=Image.new('RGBA',(2304,2048));proof=Image.new('RGB',(2304,2112),'#172433');pen=ImageDraw.Draw(proof);frames=[]
 for i,(cell,b)in enumerate(cells):
  pose=cell.crop(b);factor=min(scale,234/pose.height);sized=pose.resize((round(pose.width*factor),round(pose.height*factor)),Image.Resampling.LANCZOS);assert sized.width<380;tile=Image.new('RGBA',(384,256));tile.alpha_composite(sized,(192-sized.width//2,240-sized.height));out.alpha_composite(tile,(i%6*384,i//6*256));proof.paste(tile,(i%6*384,64+i//6*256),tile);pen.text((i%6*384+5,64+i//6*256+5),str(i),fill='white');frames.append({'rect':[i%6*384,i//6*256,384,256],'ax':192,'ay':240})
 out.save(R/'dist/assets/reina381'/f'{name}.webp',quality=88,method=6);proof.save(R/'reports381'/f'{name}-atlas.png');data[name]={'src':f'assets/reina381/{name}.webp','frames':frames,'scale':148/190}
(R/'dist/reina381-data.js').write_text('globalThis.Reina381Data='+json.dumps(data,separators=(',',':'))+';\n')
