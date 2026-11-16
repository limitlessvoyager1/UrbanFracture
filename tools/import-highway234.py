from PIL import Image
from pathlib import Path
from collections import deque
import sys,json
src=Path(sys.argv[1]);im=Image.open(src).convert('RGBA');w,h=im.size
for i,name in enumerate(['approach','roadworks','trailer','junction']):
 p=im.crop((round(i%2*w/2),round(i//2*h/2),round((i%2+1)*w/2),round((i//2+1)*h/2)))
 if i!=2:
  px=p.load();a,b=p.size;seen=set();q=deque((x,0) for x in range(a))
  while q:
   x,y=q.popleft()
   if (x,y) in seen or x<0 or x>=a or y<0 or y>=round(b*.55):continue
   seen.add((x,y));r,g,bl,al=px[x,y]
   if not (bl>220 and bl-r>60 and bl-g>25 and g>170 and r>120):continue
   px[x,y]=(r,g,bl,0)
   q.extend([(x+1,y),(x-1,y),(x,y+1)])
 p.save('dist/assets/highway/'+name+'234.webp',quality=87,method=6)
