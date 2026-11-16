from pathlib import Path
from PIL import Image
import json
# One shared palette across every pose preserves costume colors and crisp pixel edges.
paths=sorted(Path('design/orion205').glob('*-[RL].png'))
samples=Image.new('RGB',(512,len(paths)*128))
for n,path in enumerate(paths):
 im=Image.open(path).convert('RGBA');im.thumbnail((512,128));samples.paste(im.convert('RGB'),(0,n*128))
palette=samples.quantize(colors=28,method=Image.Quantize.MEDIANCUT)
pal=palette.getpalette();pal[84:96]=[255,216,62,218,166,25,255,237,128,155,113,18];palette.putpalette(pal)
out={}
for path in paths:
 name=path.stem;im=Image.open(path).convert('RGBA');frames=[]
 for i in range(16):
  if name.startswith('locomotion') and i in (12,15):
   # Unused studies: personality uses combat15; no duplicate idle resources.
   (Path('dist/assets/orion205')/f'{name}-{i}.webp').unlink(missing_ok=True)
   frames.append(None);continue
  x=i%4*im.width//4;y=i//4*im.height//4;cw=(i%4+1)*im.width//4-x;ch=(i//4+1)*im.height//4-y
  cell=im.crop((x,y,x+cw,y+ch));a=cell.getchannel('A').point(lambda p:255 if p>32 else 0);cell=cell.convert('RGB').quantize(palette=palette,dither=Image.Dither.NONE).convert('RGBA');cell.putalpha(a);box=cell.getbbox();f=cell.crop(box)
  # Runtime cells use the native 150-pixel character grid; originals remain editable.
  k=.5;f=f.resize((max(1,round(f.width*k)),max(1,round(f.height*k))),Image.Resampling.NEAREST)
  src=f'assets/orion205/{name}-{i}.webp';Path('dist/assets/orion205').mkdir(exist_ok=True);f.save('dist/'+src,lossless=True)
  frames.append({'src':src,'w':f.width,'h':f.height,'ax':(cw/2-box[0])*k,'baseline':box[3],'box':box})
 out[name]=frames
Path('dist/orion205-data.js').write_text('window.Orion205Data='+json.dumps(out)+';')
