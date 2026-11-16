from pathlib import Path
from PIL import Image
import json
R=Path(__file__).resolve().parents[2];im=Image.open(R/'source-art/flint351/armed.png').convert('RGBA');w,h=im.size
hands=[(225,184),(173,70),(180,30),(40,145),(345,126),(405,122),(335,210),(221,180)]
frames=[]
for j,(hx,hy) in enumerate(hands):
 x0=round(j%4*w/4);y0=round(j//4*h/2);x1=round((j%4+1)*w/4);y1=round((j//4+1)*h/2);b=im.crop((x0,y0,x1,y1)).getchannel('A').point(lambda a:255 if a>96 else 0).getbbox();l,t,r,bottom=b
 frames.append({'rect':[x0+l,y0+t,r-l,bottom-t],'ax':(x1-x0)*.44-l,'ay':bottom-t-2,'handPixels':[hx-(x1-x0)*.44,hy-bottom+2]})
k=144/frames[0]['rect'][3]
for q in frames:q['scale']=k;q['hand']=[v*k for v in q.pop('handPixels')]
im.save(R/'dist/assets/flint351/armed.webp',quality=92,method=6)
(R/'dist/flint351-art.js').write_text('globalThis.FlintArmed351='+json.dumps({'frames':frames,'image':'assets/flint351/armed.webp'})+';\n')
for name in ['lobby','kitchen']:
 Image.open(R/'source-art/hotel351'/f'{name}.png').convert('RGB').save(R/'dist/assets/downtown351'/f'{name}.webp',quality=92,method=6)
