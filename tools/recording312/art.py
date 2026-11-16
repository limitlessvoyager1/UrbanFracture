from PIL import Image,ImageDraw
from pathlib import Path
import shutil,json
out=Path('dist/assets/recording312');out.mkdir(exist_ok=True)
src=Path('source-art/recording312');src.mkdir(exist_ok=True)
for key,name in [('terminal','exec-bce9c169-6096-4ab1-b1f6-395d42dc71d5.png'),('shuttle','exec-f462282e-fa7a-4ac6-a5e8-0ca57e695fe7.png'),('weapons','exec-5a2667ea-dda9-46e4-8f83-5c20235b609a.png')]:
 p=Path('/workspace/scratch/96a3e452279b/generated_images')/name
 shutil.copyfile(p,src/(key+'-original.png'))
 im=Image.open(p).convert('RGBA')
 if key!='weapons':im=im.resize((1536,512),Image.Resampling.LANCZOS)
 else:
  print('weapon alpha corners',im.getpixel((0,0)), 'bounds',im.getbbox())
 im.save(out/(key+'.webp'),quality=91,method=6)
# Window mattes preserve structural members and exclude counters, occupants, plants and signs.
im=Image.open('dist/assets/style310/interior.webp').convert('RGB');mask=Image.new('L',im.size);d=ImageDraw.Draw(mask)
rects=[(112,0,475,125),(530,0,1410,208),(231,336,1204,409),(85,335,183,486),(0,526,1535,554),(1327,328,1390,409),(1420,315,1458,409),(90,526,425,650),(1152,526,1535,674),(630,816,1110,901),(1174,795,1510,952)]
for q in rects:d.rectangle(q,fill=255)
for q in [(130,15,174,106),(195,18,404,116),(541,18,1000,93),(1130,18,1335,116),(1357,10,1395,110),(1290,115,1535,276),(1049,541,1091,635),(1110,539,1151,633),(1328,611,1485,716),(738,801,875,916),(605,849,693,955),(868,856,966,921),(1044,848,1170,950),(1187,820,1519,846),(0,278,233,525)]:d.rectangle(q,fill=0)
pix=mask.load();colors=im.load()
for y in range(im.height):
 for x in range(im.width):
  if pix[x,y]:
   r,g,b=colors[x,y]
   # Keep dark frames, gilded poles, and high-saturation purple architectural surfaces.
   if max(r,g,b)<120 or (r>g*1.38 and b>g*1.25) or (r>g*1.1 and g>b*1.15):pix[x,y]=0
alpha=Image.new('RGBA',mask.size,(255,255,255,0));alpha.putalpha(mask);alpha.save(out/'interior-windows.png')
im=Image.open(out/'terminal.webp').convert('RGB');mask=Image.new('L',im.size);p=mask.load();v=im.load()
for y in range(75,324):
 for x in range(65,1471):
  r,g,b=v[x,y]
  if b>125 and g>100 and b>r*1.24 and g>r*1.2:p[x,y]=255
alpha=Image.new('RGBA',mask.size,(255,255,255,0));alpha.putalpha(mask);alpha.save(out/'terminal-windows.png')
im=Image.open(src/'weapons-original.png').convert('RGBA');px=im.load()
for y in range(im.height):
 for x in range(im.width):
  r,g,b,a=px[x,y]
  if a<96:px[x,y]=(0,0,0,0)
im.save(out/'weapons.webp',quality=94,method=6)
frames=[]
for i in range(16):
 x=round((i%4)*im.width/4);y=round((i//4)*im.height/4);x2=round((i%4+1)*im.width/4);y2=round((i//4+1)*im.height/4)
 b=im.crop((x,y,x2,y2)).getbbox();frames.append({'rect':[x,y,x2-x,y2-y],'ax':(x2-x)*.45,'ay':b[3]-1})
Path('dist/reina312-data.js').write_text('globalThis.Reina312Data='+json.dumps({'src':'assets/recording312/weapons.webp','scale':148/310,'frames':frames})+';\n')

# Final authored glass masks supersede the preliminary color-selection matte.
import runpy
runpy.run_path("tools/recording312/window-masks.py")
