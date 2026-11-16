from pathlib import Path
from PIL import Image,ImageDraw
import numpy as np,json
R=Path(__file__).resolve().parents[2];im=Image.open(R/'source-art/reina383/motion.png').convert('RGBA');bands=[0,216,427,640,844,1055,1210,1448];cells=[]
for i in range(28):
 c=im.crop((round(i%4*im.width/4),bands[i//4],round((i%4+1)*im.width/4),bands[i//4+1]));a=np.asarray(c);ys,xs=np.where(a[:,:,3]>100);b=(int(xs.min()),int(ys.min()),int(xs.max())+1,int(ys.max())+1);cells.append((c,b))
factor=190/np.median([b[3]-b[1] for c,b in cells[:4]]);out=Image.new('RGBA',(1536,2688));proof=Image.new('RGB',out.size,'#172433');d=ImageDraw.Draw(proof);frames=[]
# Body root stays under the pelvis rather than following changing hair/foot bounds.
hips=[165,165,165,165,160,150,155,154,160,150,155,154,145,145,145,147,145,145,145,147,150,150,154,155,155,155,155,155]
for i,(c,b) in enumerate(cells):
 p=c.crop(b);w,h=round(p.width*factor),round(p.height*factor);x=round(192-(hips[i]-b[0])*factor);y=340-h
 if 4<=i<12:y=150+[0,1,0,-1,0,1,0,-1][i-4]
 if 12<=i<20:y=166+[2,0,-4,-6,2,0,-4,-6][i-12]
 tile=Image.new('RGBA',(384,384));tile.alpha_composite(p.resize((w,h),Image.Resampling.LANCZOS),(x,y));out.alpha_composite(tile,(i%4*384,i//4*384));proof.paste(tile,(i%4*384,i//4*384),tile);d.text((i%4*384+6,i//4*384+6),str(i),fill='white');frames.append({'rect':[i%4*384,i//4*384,384,384],'ax':192,'ay':340})
out.save(R/'dist/assets/reina383/motion.webp',quality=83,method=6);proof.save(R/'reports383/motion-atlas.png');(R/'dist/reina383-data.js').write_text('globalThis.Reina383Data='+json.dumps({'src':'assets/reina383/motion.webp','scale':148/190,'frames':frames},separators=(',',':'))+';\n')
