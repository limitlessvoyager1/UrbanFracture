"""Whole-body sprint registration with a shared scale and fixed head/ground reference."""
from pathlib import Path
from PIL import Image,ImageDraw
import numpy as np,json
R=Path(__file__).resolve().parents[2];dest=R/'dist/assets/broxton368';dest.mkdir(exist_ok=True)
src=Image.open(R/'source-art/broxton368/run.png').convert('RGBA');a=np.array(src);a[a[:,:,3]<12]=0;src=Image.fromarray(a);cw,ch=src.width/4,src.height/3
cells=[]
for i in range(12):
 cell=src.crop((round(i%4*cw),round(i//4*ch),round((i%4+1)*cw),round((i//4+1)*ch)))
 a=np.asarray(cell);ys,xs=np.where(a[:,:,3]>96);b=(int(xs.min()),int(ys.min()),int(xs.max())+1,int(ys.max())+1);head=np.where(a[b[1]:b[1]+20,:,3]>96)[1];cells.append((cell,b,float(head.mean())))
scale=414/float(np.median([cells[i][1][3]-cells[i][1][1] for i in [0,1,2,6,7,8]]))
atlas=Image.new('RGBA',(2048,1536));frames=[];proof=Image.new('RGB',(1440,1200),'#172433');pen=ImageDraw.Draw(proof)
for i,(cell,b,hx) in enumerate(cells):
 bob=[0,2,0,-4,-6,-3,0,2,0,-4,-6,-3][i];x=round(278-hx*scale);y=round(43+bob-b[1]*scale)
 sized=cell.resize((round(cell.width*scale),round(cell.height*scale)),Image.Resampling.LANCZOS);canvas=Image.new('RGBA',(512,512));canvas.alpha_composite(sized,(x,y));a=np.asarray(canvas);ys,xs=np.where(a[:,:,3]>96);assert xs.min()>1 and xs.max()<510 and ys.min()>1 and ys.max()<510,'clipped frame '+str(i)
 # The same near hand follows the near shoulder's motion, including the back swing.
 target=([180,192,235,280,325,350,360,350,325,280,235,192][i],[205,200,190,180,165,160,155,160,165,180,190,200][i]);Y,X=np.indices(a.shape[:2]);mask=(a[:,:,3]>160)&(a[:,:,:3].max(axis=2)<100)&(Y>115)&(Y<300);gy,gx=np.where(mask);j=np.argmin((gx-target[0])**2+(gy-target[1])**2);hand=[int(gx[j]),int(gy[j])]
 atlas.alpha_composite(canvas,(i%4*512,i//4*512));frames.append({'rect':[i%4*512,i//4*512,512,512],'hand':hand,'ground':460,'import':{'source':i,'scale':scale,'dx':x,'dy':y}})
 tile=canvas.resize((360,360),Image.Resampling.LANCZOS);proof.paste(tile,(i%4*360,40+i//4*385),tile);pen.text((i%4*360+16,390+i//4*385),f'{i+1:02}',fill='white')
atlas.save(dest/'run.webp',quality=94,method=4);pen.text((20,8),'BROXTON / OPPOSING ARM-LEG RUN / 12 POSES / BUILD 368',fill='#f2bd7f');proof.save(R/'reports368/run-cycle.png')
p=R/'dist/broxton359-data.js';data=json.loads(p.read_text().split('=',1)[1].rstrip(';\n'));data['gaits']['run']={'src':'assets/broxton368/run.webp','frames':frames};p.write_text('globalThis.Broxton359Data='+json.dumps(data,separators=(',',':'))+';\n');(R/'reports368/registration.json').write_text(json.dumps({'frames':12,'sharedScale':scale,'bodyRegistration':'head reference plus authored bob; contact baseline460; flight feet allowed above ground','nativeSpeedChanged':False},indent=2))
