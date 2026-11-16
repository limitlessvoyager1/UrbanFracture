"""Register the complete sprint poses; preserve original masters and walk data."""
from pathlib import Path
from PIL import Image,ImageDraw,ImageFont
import numpy as np,json,hashlib
R=Path(__file__).resolve().parents[2];dest=R/'dist/assets/broxton367';dest.mkdir(exist_ok=True)
src=Image.open(R/'source-art/broxton367/run.png').convert('RGBA');clean=np.array(src);clean[clean[:,:,3]<12]=0;src=Image.fromarray(clean);cw,ch=src.width/4,src.height/3
atlas=Image.new('RGBA',(2048,1536));frames=[];proof=Image.new('RGB',(1440,1200),'#172433');pen=ImageDraw.Draw(proof)
for i in range(12):
 cell=src.crop((round(i%4*cw),round(i//4*ch),round((i%4+1)*cw),round((i//4+1)*ch)))
 a=np.asarray(cell);ys,xs=np.where(a[:,:,3]>96);b=(int(xs.min()),int(ys.min()),int(xs.max())+1,int(ys.max())+1);body=cell.crop(b)
 # Whole-body resampling only. Preserve joints, two legs, arm pump and figure silhouette.
 # Use the same height envelope as the established full-body locomotion registry.
 height=[410,414,404,388,402,412,414,400,388,402,410,414][i]
 scale=height/body.height;body=body.resize((round(body.width*scale),height),Image.Resampling.LANCZOS)
 x=256-body.width//2;y=460-height
 canvas=Image.new('RGBA',(512,512));canvas.alpha_composite(body,(x,y));atlas.alpha_composite(canvas,(i%4*512,i//4*512))
 # Choose the near dark glove inside the lower-rib/front-arm area for foreign props.
 a=np.array(canvas);mask=(a[:,:,3]>160)&(a[:,:,:3].max(axis=2)<90)&(np.indices(a.shape[:2])[1]>285)&(np.indices(a.shape[:2])[0]>155)&(np.indices(a.shape[:2])[0]<285)
 gy,gx=np.where(mask);assert len(gx)>0
 target=(320,215);j=np.argmin((gx-target[0])**2+(gy-target[1])**2);hand=[int(gx[j]),int(gy[j])]
 frames.append({'rect':[i%4*512,i//4*512,512,512],'hand':hand,'ground':460,'import':{'source':i,'scale':scale,'bodyBox':b}})
 tile=canvas.resize((360,360),Image.Resampling.LANCZOS);proof.paste(tile,(i%4*360,40+i//4*385),tile);pen.text((i%4*360+16,390+i//4*385),f'{i+1:02}',fill='white')
atlas.save(dest/'run.webp',quality=94,method=4);pen.text((20,8),'BROXTON / ATHLETIC SPRINT / 12 SUCCESSIVE POSES / BUILD 367',fill='#f2bd7f');proof.save(R/'reports367/run-cycle.png')
p=R/'dist/broxton359-data.js';data=json.loads(p.read_text().split('=',1)[1].rstrip(';\n'));data['gaits']['run']={'src':'assets/broxton367/run.webp','frames':frames};p.write_text('globalThis.Broxton359Data='+json.dumps(data,separators=(',',':'))+';\n')
(R/'reports367/registration.json').write_text(json.dumps({'frames':12,'source':str(src.size),'atlas':[2048,1536],'phone':{'bodyHeight':170,'widthMultiplier':1.10,'groundAnchor':248},'movementSpeedChanged':False},indent=2))
