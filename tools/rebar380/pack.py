"""Register weapon-edited Ty Sly art at the previous body's height and foot anchor."""
from pathlib import Path
from PIL import Image,ImageDraw
import numpy as np,json,shutil,sys
R=Path(__file__).resolve().parents[2];dst=R/'source-art/rebar380/enforcer.png';shutil.copy(sys.argv[1],dst)
new=Image.open(dst).convert('RGBA');old=Image.open(R/'source-art/backup377/enforcer.png').convert('RGBA');metrics=json.loads((R/'reports377/enforcer-registration.json').read_text());atlas=Image.new('RGBA',(2304,2048));proof=Image.new('RGB',(2304,2112),'#172433');pen=ImageDraw.Draw(proof);frames=[];rows=[]
def cell(im,i):return im.crop((round(i%6*im.width/6),round(i//6*im.height/8),round((i%6+1)*im.width/6),round((i//6+1)*im.height/8)))
def bounds(im):
 a=np.asarray(im);ys,xs=np.where(a[:,:,3]>100);assert len(xs)>100;return(int(xs.min()),int(ys.min()),int(xs.max())+1,int(ys.max())+1)
def foot(im,b):
 a=np.asarray(im);ys,xs=np.where((a[:,:,3]>100)&(np.indices(a.shape[:2])[0]>=b[3]-max(8,round((b[3]-b[1])*.1))));return(float(xs.min()+xs.max())/2)
for i in range(48):
 nc,oc=cell(new,i),cell(old,i);nb,ob=bounds(nc),bounds(oc);pose=nc.crop(nb);factor=metrics[i]['height']/pose.height;w,h=round(pose.width*factor),metrics[i]['height'];oldFoot=(foot(oc,ob)-(ob[0]+ob[2])/2)*metrics[i]['scale'];newFoot=(foot(nc,nb)-nb[0])*factor;x=round(192+oldFoot-newFoot);y=240-h;assert x>=1 and x+w<383 and y>0,(i,x,w,h)
 tile=Image.new('RGBA',(384,256));tile.alpha_composite(pose.resize((w,h),Image.Resampling.LANCZOS),(x,y));atlas.alpha_composite(tile,(i%6*384,i//6*256));proof.paste(tile,(i%6*384,64+i//6*256),tile);pen.text((i%6*384+5,64+i//6*256+5),str(i),fill='white');frames.append({'rect':[i%6*384,i//6*256,384,256],'ax':192,'ay':240});rows.append({'frame':i,'bodyHeight':h,'previousHeight':metrics[i]['height'],'scale':factor,'clipped':False})
atlas.save(R/'dist/assets/rebar380/enforcer.webp',quality=88,method=6);proof.save(R/'reports380/atlas-review.png');p=R/'dist/backup377-data.js';s=p.read_text();d=json.loads(s.split('=',1)[1].rstrip(';\n'));d['enforcer'].update(src='assets/rebar380/enforcer.webp',frames=frames);p.write_text('globalThis.Backup377Data='+json.dumps(d,separators=(',',':'))+';\n');(R/'reports380/registration.json').write_text(json.dumps(rows,indent=2));print('Registered48 revised poses with prior body heights and foot anchors')
