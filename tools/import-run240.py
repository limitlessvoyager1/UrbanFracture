from PIL import Image
from pathlib import Path
from collections import deque
import json
src=Path('/workspace/scratch/96a3e452279b/generated_images/exec-cf7bdebb-661e-4b70-bcc2-6027c880f48d.png')
im=Image.open(src).convert('RGBA');frames=[]
for i in range(8):
 col,row=i%4,i//4;x=round(col*im.width/4);y=round(row*im.height/2);r=round((col+1)*im.width/4);b=round((row+1)*im.height/2);w,h=r-x,b-y
 frames.append({'rect':[x,y,w,h],'seed':[x+w//2,y+h//2],'anchor':[x+w*.54,y+(432 if row==0 else 415)]})
# Runtime connected-component import already removes disconnected background; retain generated alpha.
im.save('dist/assets/sprites/forest-run240.webp',lossless=True,method=6)
definition={'src':'assets/sprites/forest-run240.webp','scale':.36,'frames':frames}
Path('dist/forest-run240-data.js').write_text('Object.assign(window.NeonForest125Data,'+json.dumps({'forest-run240':definition},separators=(',',':'))+');\n')
