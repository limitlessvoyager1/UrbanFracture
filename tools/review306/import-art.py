from PIL import Image
from pathlib import Path
import json,shutil
out=Path('dist/assets/review306');out.mkdir(exist_ok=True)
src=Path('source-art/review306');src.mkdir(parents=True,exist_ok=True)
for name,path in [('upper','exec-0ff4d128-b4a4-4218-a6f7-64fbcabb91d5.png'),('table','exec-f8c84a87-b9f9-421f-b19c-84cafd6dd50d.png'),('reina-recoil','exec-42a0c0fd-4c17-46d9-92c9-384e2b564c94.png')]:
 shutil.copyfile('/workspace/scratch/96a3e452279b/generated_images/'+path,src/(name+'.png'))
im=Image.open(src/'table.png').convert('RGBA');box=im.getbbox();im.crop(box).resize((260,155),Image.Resampling.LANCZOS).save('dist/assets/mall/table306.webp',lossless=True,method=6)
im=Image.open(src/'reina-recoil.png').convert('RGBA');w,h=im.size;data=[];scale=148/610
for i in range(4):
 left=i*w//4;right=(i+1)*w//4;a=im.crop((left,0,right,h));box=a.getbbox();a=a.crop(box);a.save(out/f'reina-recoil-{i}.webp',lossless=True,method=6);data.append({'src':f'assets/review306/reina-recoil-{i}.webp?v=306','w':a.width,'h':a.height,'ax':(right-left)/2-box[0],'ay':675-box[1],'scale':scale,'sourceBox':[left+box[0],box[1],left+box[2],box[3]]})
Path('dist/recoil306-data.js').write_text('globalThis.Recoil306Data='+json.dumps(data,separators=(',',':'))+';\n')
# Fixed 4:1 import reduction for the entire recoil family; never normalize individual poses.
for q in data:
 f=Path('dist')/q['src'].split('?')[0];a=Image.open(f);a=a.resize((round(a.width/4),round(a.height/4)),Image.Resampling.NEAREST);a.save(f,lossless=True,method=6)
 for key in ['w','h','ax','ay']:q[key]/=4
 q['scale']*=4
Path('dist/recoil306-data.js').write_text('globalThis.Recoil306Data='+json.dumps(data,separators=(',',':'))+';\n')
a=Image.open(src/'upper.png');a.crop((0,92,2170,633)).resize((887,222),Image.Resampling.LANCZOS).save('dist/assets/mall/upper306.webp',quality=92,method=6)

a=Image.open("dist/assets/mall/table306.webp");a.save("dist/assets/mall/table306.webp",quality=92,method=6,exact=True)

a=Image.open("source-art/review306/carmen-held.png").convert("RGBA");a=a.crop(a.getbbox());a.resize((round(a.width*133/a.height),133),Image.Resampling.NEAREST).save("dist/assets/review306/carmen-held.webp",lossless=True,method=6)
