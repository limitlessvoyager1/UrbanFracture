from PIL import Image
from pathlib import Path
import sys
im=Image.open(sys.argv[1]).convert('RGBA'); names=sys.argv[2:]; rows=len(names)//2
out=Path('dist/assets/mall');out.mkdir(exist_ok=True)
for i,n in enumerate(names):
 x=i%2;y=i//2
 p=im.crop((round(x*im.width/2),round(y*im.height/rows),round((x+1)*im.width/2),round((y+1)*im.height/rows)))
 if n in ['lot','roof']:
  # Only top-connected exterior blue sky is transparent; architecture stays intact.
  px=p.load(); seen=set();stack=[(x,0) for x in range(p.width)]
  while stack:
   x,y=stack.pop()
   if not(0<=x<p.width and 0<=y<p.height) or (x,y) in seen:continue
   seen.add((x,y));r,g,b,a=px[x,y]
   if b>155 and b-r>27 and b-g>4:
    px[x,y]=(0,0,0,0);stack.extend([(x-1,y),(x+1,y),(x,y+1)])
 p.save(out/(n+'236.webp'),'WEBP',quality=89,method=6)
 print(n,p.size,(out/(n+'236.webp')).stat().st_size)
