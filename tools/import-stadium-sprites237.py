from pathlib import Path
from PIL import Image
import numpy as np,json,sys
im=Image.open(sys.argv[1]).convert('RGBA');name=sys.argv[2];cols=4;rows=4 if name=='baylor' else 2;frames=[]
for i in range(cols*rows):
 x=round(i%cols*im.width/cols);y=round(i//cols*im.height/rows);p=im.crop((x,y,round((i%cols+1)*im.width/cols),round((i//cols+1)*im.height/rows)));a=np.array(p);alpha=a[:,:,3];alpha[alpha<128]=0;yy,xx=np.where(alpha>=200)
 if not len(xx):raise Exception('empty sprite')
 bb=(int(xx.min()),int(yy.min()),int(xx.max()+1),int(yy.max()+1));p=Image.fromarray(a).crop(bb);p.save(f'dist/assets/stadium/{name}-{i}237.webp',quality=91,method=6)
 # Root follows the middle of the opaque sole-contact span rather than a cell center.
 q=np.array(p);foot=q[-max(3,int(p.height*.025)):,:,3]>200;fy,fx=np.where(foot);rx=float((fx.min()+fx.max())/2) if len(fx) else p.width/2
 frames.append({'src':f'assets/stadium/{name}-{i}237.webp','width':p.width,'height':p.height,'root':[rx,p.height]})
Path(f'dist/{name}-data237.js').write_text('window.'+('BaylorArt237' if name=='baylor' else 'StadiumFans237')+'='+json.dumps({'frames':frames,'baseHeight':frames[0]['height']},separators=(',',':'))+';\n')
