"""One character sheet, common anatomical scale and registration for idle/walk/run."""
from pathlib import Path
from PIL import Image,ImageDraw
import numpy as np,json,hashlib
R=Path(__file__).resolve().parents[2];dest=R/'dist/assets/broxton369';dest.mkdir(exist_ok=True)
src=Image.open(R/'source-art/broxton369/unified.png').convert('RGBA');a=np.array(src);a[a[:,:,3]<12]=0;src=Image.fromarray(a);cw,ch=src.width/4,src.height/7
cells=[]
for i in range(28):
 cell=src.crop((round(i%4*cw),round(i//4*ch),round((i%4+1)*cw),round((i//4+1)*ch)));a=np.asarray(cell);ys,xs=np.where(a[:,:,3]>96);b=(int(xs.min()),int(ys.min()),int(xs.max())+1,int(ys.max())+1);hx=float(np.where(a[b[1]:b[1]+max(8,round(ch*.04)),:,3]>96)[1].mean());cells.append((cell,b,hx))
# Every frame uses this same scalar; no independent height or body-width normalization.
scale=414/float(np.median([cells[i][1][3]-cells[i][1][1] for i in range(16)]))
data=json.loads((R/'dist/broxton359-data.js').read_text().split('=',1)[1].rstrip(';\n'));stats=[]
proof=Image.new('RGB',(1440,2820),'#172433');pen=ImageDraw.Draw(proof)
for mode,start,count in [('idle',0,4),('walk',4,12),('run',16,12)]:
 atlas=Image.new('RGBA',(2048,512*((count+3)//4)));frames=[]
 for j in range(count):
  i=start+j;cell,b,hx=cells[i];bob=0 if mode=='idle' else [0,1,0,-2,-3,-1,0,1,0,-2,-3,-1][j]
  dx=round(264-hx*scale);dy=round(43+bob-b[1]*scale)
  canvas=Image.new('RGBA',(512,512));sized=cell.resize((round(cell.width*scale),round(cell.height*scale)),Image.Resampling.LANCZOS);canvas.alpha_composite(sized,(dx,dy));a=np.asarray(canvas);ys,xs=np.where(a[:,:,3]>96);assert xs.min()>1 and xs.max()<510 and ys.min()>1 and ys.max()<510,'clipped '+mode+str(j)
  Y,X=np.indices(a.shape[:2]);target=(240 if mode!='run' else [180,192,235,280,325,350,360,350,325,280,235,192][j],180 if mode!='run' else [205,200,190,180,165,160,155,160,165,180,190,200][j]);mask=(a[:,:,3]>160)&(a[:,:,:3].max(axis=2)<100)&(Y>110)&(Y<300);gy,gx=np.where(mask);k=np.argmin((gx-target[0])**2+(gy-target[1])**2);hand=[int(gx[k]),int(gy[k])]
  atlas.alpha_composite(canvas,(j%4*512,j//4*512));frames.append({'rect':[j%4*512,j//4*512,512,512],'hand':hand,'ground':460});stats.append({'mode':mode,'frame':j,'w':int(xs.max()-xs.min()+1),'h':int(ys.max()-ys.min()+1),'top':int(ys.min()),'bottom':int(ys.max()),'headCenter':264,'scale':scale})
  tile=canvas.resize((360,360),Image.Resampling.LANCZOS);proof.paste(tile,(i%4*360,40+i//4*395),tile);pen.text((i%4*360+12,390+i//4*395),mode.upper()+' '+str(j+1),fill='white')
 atlas.save(dest/(mode+'.webp'),quality=92,method=4);data['gaits'][mode]={'src':'assets/broxton369/'+mode+'.webp','frames':frames,'scale':151.8/416,'identity':'one unified source/scale'}
(R/'dist/broxton359-data.js').write_text('globalThis.Broxton359Data='+json.dumps(data,separators=(',',':'))+';\n');pen.text((20,8),'BROXTON / UNIFIED IDLE-WALK-RUN / BUILD369',fill='#f2bd7f');proof.save(R/'reports369/unified.png');(R/'reports369/registration.json').write_text(json.dumps({'frames':stats,'commonScale':scale,'sourceLayout':[4,7],'independentBodyScaling':False},indent=2))
