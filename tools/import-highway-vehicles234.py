from PIL import Image
from pathlib import Path
import sys,json
im=Image.open(sys.argv[1]).convert('RGBA');w,h=im.size;frames=[]
for i in range(8):
 x0=round(i%2*w/2);y0=round(i//2*h/4);x1=round((i%2+1)*w/2);y1=round((i//2+1)*h/4)
 cell=im.crop((x0,y0,x1,y1));a=cell.getchannel('A').point(lambda v:255 if v>90 else 0);b=a.getbbox();frames.append([x0+b[0],y0+b[1],b[2]-b[0],b[3]-b[1]])
im.save('dist/assets/highway/vehicles234.webp',quality=87,method=6)
Path('dist/highway-vehicles234-data.js').write_text('window.HighwayVehicleArt234='+json.dumps(frames,separators=(',',':'))+';\n')
