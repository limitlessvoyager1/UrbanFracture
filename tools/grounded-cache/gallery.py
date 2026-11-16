from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
root=Path(__file__).resolve().parents[2]
out=root/'reports-grounded-cache'
font=ImageFont.truetype('C:/Windows/Fonts/arial.ttf',17)
def sheet(groups, name, width=1350, rowheight=310):
    c=Image.new('RGB',(width,rowheight*len(groups)), '#edf3f7')
    d=ImageDraw.Draw(c)
    for row,(title,items) in enumerate(groups):
        y=row*rowheight;d.text((12,y+8),title,font=font,fill='#20364b')
        for col,(file,label) in enumerate(items):
            im=Image.open(root/file).convert('RGBA')
            box=im.getbbox()
            if box:im=im.crop(box)
            im.thumbnail((420,rowheight-85))
            x=col*450+(450-im.width)//2
            c.paste(im,(x,y+42),im)
            d.text((col*450+12,y+rowheight-36),label,font=font,fill='#20364b')
    c.save(out/name)
sheet([
 ('Native shipping drawActor, same query t=2.8166666666666615',[
  ('reports-grounded-cache-audit/primary-opposite-warm.png','Audited original: stale earlier pose'),
  ('reports-grounded-cache/native-1-pose.png','Repair after warm .9: current pose'),
  ('reports-grounded-cache/native-1-pose-cold.png','Fresh cold reference: identical pixels')]),
 ('Native shipping drawActor, clean query t=.9 after flashed draw',[
  ('reports-grounded-cache-audit/primary-flash-warm.png','Audited original: stale brightness'),
  ('reports-grounded-cache/native-1-flash-clean.png','Repair: clean current pixels'),
  ('reports-grounded-cache/native-1-clean-flash.png','Opposite order: flash still visible')]),
 ('Persistent Forest -> Niko -> Broxton -> Nightshade page, tick154',[
  ('reports-grounded-cache/mixed-nightshade/leap_thug_-1_154.png','Facing -1: current grounded pose'),
  ('reports-grounded-cache/mixed-nightshade/leap_thug_1_154.png','Facing +1: current grounded pose'),
  ('reports-grounded-cache/mixed-nightshade/leap_thug_1_44.png','Native launch retained')]),
], 'pose-verification.png')
groups=[]
for roster in ['same','mixed']:
    for version in ['baseline','current']:
        groups.append((f'Native full scene: {version}, {roster} enemy roster + hero',[
         (f'reports-grounded-cache/scene-{version}-{roster}-{count}.png',f'{count} enemies + hero') for count in [1,4,8]]))
sheet(groups,'scene-verification.png',rowheight=330)
