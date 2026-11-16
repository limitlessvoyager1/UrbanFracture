"""Import approved original generated masters without per-pose resizing or anatomy edits."""
from pathlib import Path
from PIL import Image
import json, shutil
R=Path(__file__).resolve().parents[2]; src=R/'source-art/downtown345'; dst=R/'dist/assets/downtown345'
paths=json.loads((Path(__file__).with_name('import-paths.json')).read_text());src.mkdir(exist_ok=True);dst.mkdir(exist_ok=True)
data={'images':{},'frames':{},'enemies':{}}
def save(key,path):
 path=Path(path)
 if not path.exists():path=src/(key+'.png')
 im=Image.open(path)
 if path.resolve()!=(src/(key+'.png')).resolve():shutil.copy2(path,src/(key+'.png'))
 im.save(dst/(key+'.webp'),'WEBP',quality=94,method=4);data['images'][key]='assets/downtown345/'+key+'.webp';return im
for key in ['streets','nightstreets','rooms','club']:
 Image.open(src/'english'/(key+'.png')).save(dst/(key+'.webp'),'WEBP',quality=94,method=4)
 data['images'][key]='assets/downtown345/'+key+'.webp'
save('hotel',paths['bg345-hotel']);save('frontages',paths['frontages345'])
def frames(im,cols,rows,heights):
 w,h=im.size;cw,ch=w//cols,h//rows;out=[]
 for i in range(cols*rows):
  x,y=i%cols*cw,i//cols*ch;tile=im.crop((x,y,x+cw,y+ch));bb=tile.getchannel('A').point(lambda a:255 if a>80 else 0).getbbox();assert bb,(i,'empty frame')
  group=i//18 if len(heights)>1 else 0;start=group*18;ref=im.crop((start%cols*cw,start//cols*ch,start%cols*cw+cw,start//cols*ch+ch)).getchannel('A').point(lambda a:255 if a>80 else 0).getbbox();scale=heights[group]/(ref[3]-ref[1]);out.append({'rect':[x,y,cw,ch],'ax':(bb[0]+bb[2])/2,'ay':bb[3],'scale':scale})
 return out
for key,types,heights in [('marcus-kevin',['thug','knifeThug'],[132,132]),('bruno-frankie',['enforcer','biker'],[145,134]),('carmen-flint',['cop','flint'],[129,133]),('saito-akari',['sato','akari'],[132,127]),('brick-jackal',['bouncer','boss'],[149,136])]:
 im=save(key,paths['enemy345-'+key]);data['frames'][key]=frames(im,6,6,heights)
 for i,t in enumerate(types):data['enemies'][t]={'sheet':key,'start':i*18}
im=save('heroBase',R/'source-art/nightshade344/poses.png');data['frames']['heroBase']=frames(im,4,4,[134])
if 'heroAlpha345b' in paths:
 im=save('heroExtra',paths['heroAlpha345b']);data['frames']['heroExtra']=frames(im,6,4,[134])
(R/'dist/downtown-art345.js').write_text('globalThis.DowntownArt345='+json.dumps(data,separators=(',',':'))+';\n')
print('Imported',len(data['images']),'masters; same fixed scale per character across every frame')
