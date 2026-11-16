from PIL import Image
from pathlib import Path
import io,json,math
im=Image.open('source-art/frankie322/getup-original.png').convert('RGBA')
frames=[];crops=[]
for i in range(8):
 x=i%4*384;y=i//4*512;cell=im.crop((x,y,x+384,y+512));b=cell.getchannel('A').point(lambda a:255 if a>32 else 0).getbbox();b=(max(0,b[0]-2),max(0,b[1]-2),min(384,b[2]+2),min(512,b[3]+2));crops.append(cell.crop(b))
for height in [160,180,200]:
 ratio=height/crops[-1].height;atlas=Image.new('RGBA',(768,512));rows=[]
 for i,p in enumerate(crops):
  w=round(p.width*ratio);h=round(p.height*ratio);p=p.resize((w,h),Image.Resampling.LANCZOS);x=i%4*192+3;y=i//4*256+252-h;atlas.alpha_composite(p,(x,y));b=p.getchannel('A').point(lambda a:255 if a>32 else 0).getbbox();rows.append({'rect':[x,y,w,h],'ax':w/2,'ay':b[3]})
 for quality in [55,70]:
  out=io.BytesIO();atlas.save(out,format='WEBP',quality=quality,method=6);print(height,quality,len(out.getvalue()));Path('/workspace/scratch/96a3e452279b/frankie322-'+str(height)+'-'+str(quality)+'.webp').write_bytes(out.getvalue())
  Path('/workspace/scratch/96a3e452279b/frankie322-'+str(height)+'.json').write_text(json.dumps({'frames':rows,'scale':140/height}))
