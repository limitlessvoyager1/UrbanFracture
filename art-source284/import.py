from PIL import Image
import json,os
im=Image.open('art-source284/niko-gaits.png').convert('RGBA'); w,h=im.size
# Authored visible forward fist locations, in 320-pixel source cells.
hands=[(141,161),(215,185),(211,179),(203,128),(222,132),(219,200),(215,175),(210,128),(224,122),(228,147),(205,154),(223,129),(220,135),(212,169),(201,177),(208,125)]
frames=[]
for i in range(16):
 x=i%4*320;y=i//4*320;q=im.crop((x,y,x+320,y+320));a=q.getchannel('A').point(lambda p:255 if p>=128 else 0);q.putalpha(a);q=q.resize((160,160),Image.Resampling.NEAREST);src=f'assets/niko284/gait-{i}.webp';q.save('dist/'+src,'WEBP',quality=88,method=6)
 frames.append(dict(src=src,w=160,h=160,ax=80,ay=156,hand=[round(hands[i][0]/2-80,2),round(hands[i][1]/2-156,2)]))
open('dist/niko284-data.js','w').write(open('art-source284/approved-import-data.js').read())
print('asset bytes',sum(os.path.getsize('dist/'+q['src']) for q in frames))
