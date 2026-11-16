from PIL import Image
import json,pathlib
root=pathlib.Path('.')
result={}
for name,standing in [('kevin',137),('bruno',137)]:
 p=root/f'reports312/enemies/source/{name}-original.png'
 if not p.exists():continue
 im=Image.open(p).convert('RGBA');w,h=im.size;cw,ch=w//4,h//4;frames=[]
 for i in range(16):
  x,y=(i%4)*cw,(i//4)*ch;cell=im.crop((x,y,x+cw,y+ch));alpha=cell.getchannel('A');box=alpha.point(lambda a:255 if a>45 else 0).getbbox()
  if not box:raise ValueError(i)
  l,t,r,b=box;frames.append({'rect':[x+l,y+t,r-l,b-t],'ax':(r-l)/2,'ay':b-t})
 scale=standing/frames[15]['rect'][3]
 target=root/f'dist/assets/enemies312/{name}-reactions.webp';im.save(target,'WEBP',quality=86,method=6)
 result[name]={'src':f'assets/enemies312/{name}-reactions.webp','scale':scale,'frames':frames,'source':'original sixteen authored full-body poses'}
 print(name,im.size,scale,target.stat().st_size)
(root/'dist/enemies312-data.js').write_text('globalThis.Enemies312Data='+json.dumps(result,separators=(',',':'))+';\n')
