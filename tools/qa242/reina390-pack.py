from pathlib import Path
from PIL import Image,ImageDraw
import numpy as np,json,hashlib
R=Path(__file__).resolve().parents[2];Q=R/'qa/system242/repair-references/reina390';Q.mkdir(parents=True,exist_ok=True);O=R/'reports390';O.mkdir(exist_ok=True)
old=Image.open(R/'qa/system242/repair-references/reina389/motion-original-source.png').convert('RGBA');new=Image.open(R/'qa/system242/repair-references/reina389/motion-scabbard-source.png').convert('RGBA');bands=[0,216,427,640,844,1055,1210,1448];factor=190/206
# Reviewed white-sash/pelvis x landmarks. Y landmarks on running figures are
# retained as explicit review coordinates; no frame-by-frame body resizing.
points=[[174,82],[155,82],[135,82],[113,83],[164,80],[146,79],[130,78],[108,78],[169,80],[152,79],[135,80],[116,78],[170,85],[166,85],[139,79],[131,74],[174,81],[169,83],[145,74],[132,74]]
base=R/'dist/assets/reina383/motion.webp';atlas=Image.open(Q/'motion-before390.webp').convert('RGBA');data=json.loads((R/'dist/reina383-data.js').read_text().split('=',1)[1].rstrip(';\n'));frameScale=data['scale'];rows=[]
# Existing source import factor is measured from the four standing source poses.
heights=[]
for i in range(4):
 a=np.asarray(old.crop((round(i*old.width/4),0,round((i+1)*old.width/4),216)));ys,xs=np.where(a[:,:,3]>100);heights.append(int(ys.max()-ys.min()+1))
factor=190/float(np.median(heights));contact=[]
for i in [12,16]:
 a=np.asarray(old.crop((round(i%4*old.width/4),bands[i//4],round((i%4+1)*old.width/4),bands[i//4+1])));ys,xs=np.where(a[:,:,3]>100);contact.append((int(ys.max())-points[i][1])*factor*frameScale)
runHip=max((int(np.where(np.asarray(new.crop((round(i%4*new.width/4),bands[i//4],round((i%4+1)*new.width/4),bands[i//4+1])))[:,:,3]>100)[0].max())-points[i][1])*factor*frameScale-[0,-1,-2,-1,0,-1,-2,-1][i-12] for i in range(12,20))+1
for i,point in enumerate(points):
 box=(round(i%4*old.width/4),bands[i//4],round((i%4+1)*old.width/4),bands[i//4+1]);a=np.asarray(old.crop(box));ys,xs=np.where(a[:,:,3]>100);top,left,bottom,right=int(ys.min()),int(xs.min()),int(ys.max())+1,int(xs.max())+1;f=data['frames'][i];w,h=f['rect'][2:];sized=new.crop(box).resize((round((box[2]-box[0])*factor),round((box[3]-box[1])*factor)),Image.Resampling.LANCZOS);dx=f['ax']-point[0]*factor
 # Keep original authored walk vertical registration; running shares one hip
 # height with a small paired bob. Flight feet remain naturally airborne.
 hh=round((bottom-top)*factor);dy=340-hh-top*factor
 if 4<=i<12:dy=150+[0,1,0,-1,0,1,0,-1][i-4]-top*factor
 if 12<=i<20:dy=f['ay']-(runHip+[0,-1,-2,-1,0,-1,-2,-1][i-12])/frameScale-point[1]*factor
 tile=Image.new('RGBA',(w,h));tile.alpha_composite(sized,(round(dx),round(dy)));bb=tile.getbbox();assert bb and bb[0]>0 and bb[1]>0 and bb[2]<w and bb[3]<h
 atlas.paste(tile,(f['rect'][0],f['rect'][1]));rows.append({'frame':i,'sourceWaist':point,'registrationX':round(dx),'registrationY':round(dy),'logicalWaistX':(round(dx)+point[0]*factor-f['ax'])*frameScale})
atlas.save(base,quality=83,method=6);portrait=Image.open(Q/'portrait-source.png').convert('RGB');portrait.resize((256,256),Image.Resampling.LANCZOS).save(R/'dist/assets/reina-concept-v1.webp',quality=88,method=6)
report={'fixedFamilyScale':factor,'logicalScale':frameScale,'runHip':runHip,'rows':rows,'atlasSHA256':hashlib.sha256(base.read_bytes()).hexdigest(),'portraitSHA256':hashlib.sha256((R/'dist/assets/reina-concept-v1.webp').read_bytes()).hexdigest(),'approved':False};(Q/'gait-registration.json').write_text(json.dumps(report,indent=2));print(json.dumps({'framesRegistered':len(rows),'maximumWaistError':max(abs(q['logicalWaistX'])for q in rows),'runHip':runHip,'familyScale':factor}))
