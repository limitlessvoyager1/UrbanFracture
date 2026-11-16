from pathlib import Path
from PIL import Image
import numpy as np,json,hashlib
from scipy import ndimage
out={};proof={}
for key,cols,rows,height in [('marcus',6,4,137),('bruno',8,4,137),('reina',8,3,138),('reinaExtra',8,4,138),('reinaDash',4,2,138),('marcusSlash',4,2,137)]:
 p=Path('source-archive/build297/marcus-slash-attacks.png') if key=='marcusSlash' else Path('source-archive/build297/reina-dash-attacks.png') if key=='reinaDash' else Path('source-archive/build297/reina-extra-attacks.png') if key=='reinaExtra' else Path(f'source-archive/build297/{key}-'+('kicks.png' if key=='reina' else 'attacks.png'))
 im=Image.open(p).convert('RGBA');source_size=im.size;uniform=1
 if key.startswith('reina'):
  alpha=Image.open(f'source-archive/build297/{key}-alpha-reference.png').getchannel('A');assert alpha.size==im.size;im.putalpha(alpha)
 if key in ['reinaDash','marcusSlash']:
  first=np.array(im.crop((0,0,im.width//cols,im.height//rows)).getchannel('A'))>96;lab,_=ndimage.label(first);sizes=np.bincount(lab.ravel());sizes[0]=0;ys,xs=np.nonzero(lab==sizes.argmax());native_height=int(ys.max()-ys.min()+1);uniform=min(1,round(256/native_height*32)/32);im=im.resize((round(im.width*uniform),round(im.height*uniform)),Image.Resampling.NEAREST)
 if key=='bruno':
  # Compile the replacement short-clinch row without touching punch/uppercut pixels.
  close_path=Path('source-archive/build297/bruno-grab-close.png');close=Image.open(close_path).convert('RGBA')
  factor=181/314;tile_w=im.width//8;tile_h=im.height//4
  for i in range(8):
   cell=close.crop((i*close.width//8,0,(i+1)*close.width//8,close.height));cell=cell.resize((round(cell.width*factor),round(cell.height*factor)),Image.Resampling.NEAREST)
   im.paste((0,0,0,0),(i*tile_w,3*tile_h,(i+1)*tile_w,4*tile_h))
   # Source soles y525, same source root x136 in each cell. Fixed per-row transform.
   im.alpha_composite(cell,(round((i+.5)*tile_w-cell.width/2),round(3*tile_h+202-525*factor)))
 a=np.array(im);a[:,:,3]=np.where(a[:,:,3]>96,255,0);a[a[:,:,3]==0,:3]=0;im=Image.fromarray(a);W,H=im.size
 labels,count=ndimage.label(a[:,:,3]>96);objects=ndimage.find_objects(labels);chosen=[]
 for i in range(cols*rows):
  candidates=[]
  for n,o in enumerate(objects,1):
   if o is None:continue
   sy,sx=o;cx=(sx.start+sx.stop)/2;cy=(sy.start+sy.stop)/2
   if int(cx*cols/W)==i%cols and int(cy*rows/H)==i//cols:
    size=np.count_nonzero(labels[sy,sx]==n);candidates.append((size,n,o))
  assert candidates,(key,i,im.size,count);size,n,o=max(candidates);assert size>3000,(key,i,size);chosen.append((n,o))
 clean=np.zeros_like(a);frames=[]
 for i,(n,(sy,sx)) in enumerate(chosen):
  mask=labels[sy,sx]==n;clean[sy,sx][mask]=a[sy,sx][mask];x,y=sx.start,sy.start;w,h=sx.stop-x,sy.stop-y
  assert x>0 and y>0 and sx.stop<W and sy.stop<H,(key,i,'source edge clipped')
  frames.append(dict(rect=[x,y,w,h],ax=round((i%cols+.5)*W/cols)-x,ay=h,bounds=[0,0,w,h],sourceCell=i,componentPixels=int(mask.sum())))
 im=Image.fromarray(clean)
 if key=='reina':
  ground=frames[15]['rect'][1]+frames[15]['rect'][3]
  for i in [11,12,13]:frames[i]['airLift']=max(0,ground-frames[i]['rect'][1]-frames[i]['rect'][3])
 scale=height/frames[7 if key=='reinaExtra' else 0]['rect'][3];path=Path(f'dist/assets/sprites/attack297-{key}.webp');im.save(path,quality=86,method=6)
 out[key]=dict(src=str(path.relative_to('dist'))+'?v=297',scale=scale,frames=frames)
 proof[key]=dict(sourceSha256=hashlib.sha256(p.read_bytes()).hexdigest(),sourceSize=source_size,importSize=[W,H],uniformImportScale=uniform,fixedScale=scale,approvedAnatomicalHeight=height,bytes=path.stat().st_size)
 if key=='bruno':proof[key]['closeGrabSourceSha256']=hashlib.sha256(close_path.read_bytes()).hexdigest();proof[key]['closeGrabUniformScale']=factor
Path('dist/attack297-data.js').write_text('window.Attack297Data='+json.dumps(out,separators=(',',':'),default=int)+';\n')
Path('reports297/art-import.json').write_text(json.dumps(proof,indent=2,default=int)+'\n');print(proof)
