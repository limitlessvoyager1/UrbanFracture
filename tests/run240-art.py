import json
from pathlib import Path
from PIL import Image
raw=Path('dist/forest-run240-data.js').read_text();d=json.loads(raw.split('Object.assign(window.NeonForest125Data,')[1].split(');')[0])['forest-run240'];im=Image.open('dist/'+d['src']).convert('RGBA')
assert len(d['frames'])==8 and d['scale']==.36
seen=set()
for i,f in enumerate(d['frames']):
 x,y,w,h=f['rect'];sx,sy=f['seed'];assert im.getpixel((sx,sy))[3]>100,(i,'invalid component seed')
 cell=im.crop((x,y,x+w,y+h));box=cell.getchannel('A').point(lambda a:255 if a>100 else 0).getbbox();assert box[0]>5 and box[1]>5 and box[2]<w-5 and box[3]<h-5,(i,'clipped art')
 if i in [0,1,4,5]:assert abs(y+box[3]-f['anchor'][1])<2,(i,'planted foot anchor')
 seen.add(cell.tobytes())
assert len(seen)==8
print('PASS240 eight unique unclipped connected run cells, opaque import seeds, fixed scale and planted contact anchors')
