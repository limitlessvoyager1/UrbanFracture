from pathlib import Path
from PIL import Image
import json
R=Path(__file__).resolve().parents[2]
im=Image.open(R/'source-art/flint350/attacks.png').convert('RGBA');w,h=im.size
frames=[]
for j in range(16):
 x0=round(j%4*w/4);y0=round(j//4*h/4);x1=round((j%4+1)*w/4);y1=round((j//4+1)*h/4)
 c=im.crop((x0,y0,x1,y1));b=c.getchannel('A').point(lambda x:255 if x>96 else 0).getbbox();assert b
 l,t,r,bottom=b
 frames.append({'rect':[x0+l,y0+t,r-l,bottom-t],'ax':(x1-x0)*.44-l,'ay':bottom-t-2})
k=144/frames[0]['rect'][3]
for q in frames:q['scale']=k
im.save(R/'dist/assets/flint350/attacks.webp',quality=92,method=6)
(R/'dist/flint350-art.js').write_text('globalThis.FlintArt350='+json.dumps({'frames':frames,'image':'assets/flint350/attacks.webp'})+';\n')
