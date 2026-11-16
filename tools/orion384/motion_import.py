"""Source-bound motion crops; no inference from uniform cells or per-pose resizing."""
import hashlib,json
from pathlib import Path
from collections import deque
from PIL import Image

def load_layout(root):
 spec=json.loads((root/'source-art/orion384/motion-layout.json').read_text(encoding='utf-8'))
 source=root/spec['source']
 if hashlib.sha256(source.read_bytes()).hexdigest()!=spec['sourceSha256']:raise ValueError('Motion source changed: re-review explicit rectangles')
 image=Image.open(source).convert('RGBA')
 if list(image.size)!=spec['sourceSize']:raise ValueError('Motion source dimensions changed')
 if [f['index'] for f in spec['frames']]!=list(range(48)):raise ValueError('Motion frame order incomplete')
 for f in spec['frames']:validate_crop(image,f['sourceRect'])
 for sequence in {f['sequence'] for f in spec['frames']}:
  if len({f['scale'] for f in spec['frames'] if f['sequence']==sequence})!=1:raise ValueError('Per-pose scale is forbidden')
 return image,spec

def validate_crop(image,rect):
 x,y,right,bottom=rect
 if not (0<=x<right<=image.width and 0<=y<bottom<=image.height):raise ValueError('Source rectangle outside image')
 a=image.crop(rect).getchannel('A');w,h=a.size;mask=bytearray(1 if v>100 else 0 for v in a.get_flattened_data())
 if any(mask[i] for i in range(w)) or any(mask[(h-1)*w+i] for i in range(w)) or any(mask[j*w] or mask[j*w+w-1] for j in range(h)):raise ValueError('Source crop cuts through opaque artwork')
 bodies=0
 for n in range(w*h):
  if not mask[n]:continue
  mask[n]=0;queue=deque([n]);area=0
  while queue:
   at=queue.pop();area+=1;xx=at%w;yy=at//w
   for dx,dy in [(1,0),(-1,0),(0,1),(0,-1)]:
    nx=xx+dx;ny=yy+dy
    if 0<=nx<w and 0<=ny<h and mask[ny*w+nx]:mask[ny*w+nx]=0;queue.append(ny*w+nx)
  bodies+=area>500
 if bodies!=1:raise ValueError('Source crop must contain exactly one complete body')

def motion_cells(root):
 image,spec=load_layout(root);cells=[]
 for f in spec['frames']:
  rect=f['sourceRect'];cell=image.crop(rect);alpha=cell.getchannel('A').point(lambda v:255 if v>100 else 0);b=alpha.getbbox()
  cells.append((cell,b,{'root':f['rootX']-rect[0],'base':f['floorY']-rect[1],'factor':f['scale'],'lift':f['liftPx'],'sourceRect':rect,'sequence':f['sequence']}))
 return cells,spec
