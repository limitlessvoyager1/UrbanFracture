"""Import generated transparent sprite sheets; constant scale and source-space anchors."""
from PIL import Image
from pathlib import Path
import json,sys
source,variant=sys.argv[1:3];im=Image.open(source).convert('RGBA');w,h=im.size;frames=[]
for i in range(16):
 x0=round(i%4*w/4);y0=round(i//4*h/4);x1=round((i%4+1)*w/4);y1=round((i//4+1)*h/4)
 if i==13:x0,y0,x1,y1=round(w*.22),round(h*.88),round(w*.50),h
 cell=im.crop((x0,y0,x1,y1));alpha=cell.getchannel('A').point(lambda a:255 if a>90 else 0);b=alpha.getbbox()
 if not b:raise ValueError((i,'empty'))
 bx,by,X,Y=b;foot=alpha.crop((bx,max(by,Y-8),X,Y));box=foot.getbbox();root=(bx+X)/2 if i==13 else bx+(box[0]+box[2])/2
 frames.append({'rect':[x0+bx,y0+by,X-bx,Y-by],'root':[root-bx,Y-by],'head':[round((X-bx)*(.17 if i==13 else .6)),round((Y-by)*(.45 if i==13 else .10)),max(16,round((Y-by)*.10))]})
name='worker-'+variant+'233';im.save('dist/assets/workers/'+name+'.webp',quality=45,method=6)
Path('dist/'+name+'-data.js').write_text('window.WorkerArt233=window.WorkerArt233||{};window.WorkerArt233['+json.dumps(variant)+']='+json.dumps({'src':'assets/workers/'+name+'.webp','frames':frames,'baseHeight':frames[0]['rect'][3]},separators=(',',':'))+';\n')
