from pathlib import Path
from PIL import Image
from collections import deque
import sys
im=Image.open(sys.argv[1]).convert('RGBA');w,h=im.size
for i,name in enumerate(['gate','market','approach','dojo']):
 p=im.crop((round(i%2*w/2),round(i//2*h/2),round((i%2+1)*w/2),round((i//2+1)*h/2)))
 if i<3:
  a,b=p.size;px=p.load();seen=set();q=deque((x,0) for x in range(a))
  while q:
   x,y=q.popleft()
   if (x,y) in seen or x<0 or x>=a or y<0 or y>b*.61:continue
   seen.add((x,y));r,g,bl,al=px[x,y]
   if not(bl>190 and bl-r>75 and bl-g>40):continue
   px[x,y]=(r,g,bl,0);q.extend([(x+1,y),(x-1,y),(x,y+1)])
 p.save('dist/assets/chinatown/'+name+'235.webp',quality=88,method=6)
