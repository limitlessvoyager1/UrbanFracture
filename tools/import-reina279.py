from pathlib import Path
from PIL import Image
import numpy as np,json
R=Path(__file__).resolve().parents[1];a=Image.open(R/'art-source279/reina-grab-crouch.png').convert('RGBA');W,H=a.size;k=138/407
roots=[205,625,1067,1510,196,626,1067,1510];out=R/'dist/assets/reina279';out.mkdir(exist_ok=True);rows=[]
for i in range(8):
 c,r=i%4,i//4;x0,x1=round(W*c/4),round(W*(c+1)/4);y0,y1=round(H*r/2),round(H*(r+1)/2)
 q=np.array(a.crop((x0,y0,x1,y1)));q[:,:,3]=np.where(q[:,:,3]>=200,255,0);q[q[:,:,3]==0]=0;im=Image.fromarray(q);box=im.getbbox();im=im.crop(box);im=im.resize((round(im.width*k),round(im.height*k)),Image.Resampling.NEAREST);b=im.getchannel('A').getbbox();im=im.crop((0,0,im.width,b[3]));p=out/f'grab-{i}.webp';im.save(p,'WEBP',quality=92,method=6)
 rows.append(dict(src='assets/reina279/'+p.name+'?v=279',w=im.width,h=im.height,ax=(roots[i]-x0-box[0])*k,ay=im.height,sourceBox=[x0+box[0],y0+box[1],x0+box[2],y0+box[3]],scale=k))
# Pose2 reads as an extended kick, so the native knee action uses bent-knee pose1 instead.
(R/'dist/reina-grab279-data.js').write_text('window.ReinaGrab279Data='+json.dumps(rows,separators=(',',':'))+';\n')
(R/'art-source279/import.json').write_text(json.dumps({'sourceSize':[W,H],'scale':k,'frames':rows,'unusedPose':[2]},indent=2));print('Imported',W,H,k)
