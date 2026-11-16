from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
root=Path(__file__).resolve().parents[2]; out=root/'reports-grounded-surfaces'
font=ImageFont.truetype('C:/Windows/Fonts/arial.ttf',16)
groups=[
 ('Native full-scene matrix: original025 / pooled027, identical final pixels',[
  ('matrix-1-baseline-mixed-8.png','Original: eight visible mixed enemies + hero'),
  ('matrix-2-candidate-mixed-8.png','Pooled: exact same native output'),
  ('matrix-2-candidate-changing-8.png','Synthetic changing-graphic stress')]),
 ('Persistent shipping-page native paired poses, pool enabled',[
  ('native-forest/spine_thug_1_86.png','Forest native spine pair'),
  ('native-niko/reverse_thug_1_62.png','Niko native reverse pair; existing art retained'),
  ('native-nightshade/leap_thug_1_154.png','Nightshade target: native grounded pose')]),
 ('Lower-level API controls: native crop/sole metadata and RGBA matched exactly',[
  ('cop-down.png','Cop/down API control'),
  ('cop-getup.png','Cop/get-up API control'),
  ('enforcer-flash.png','Enforcer flash API control')]),
 ('Chromium retained-output lifetime: earlier canvas unchanged after64later draws',[
  ('lifetime-initial.png','Initial retained output'),
  ('lifetime-retained.png','After reuse: identical pixels'),
  ('lifetime-flash.png','Separate later flash draw')]),
]
c=Image.new('RGB',(1350,320*len(groups)),'#edf3f7');d=ImageDraw.Draw(c)
for row,(title,items) in enumerate(groups):
    d.text((10,row*320+8),title,font=font,fill='#20364b')
    for col,(file,label) in enumerate(items):
        im=Image.open(out/file).convert('RGBA')
        if row in [1,2,3]:
            box=im.getbbox()
            if box:im=im.crop(box)
        im.thumbnail((430,240));x=col*450+(450-im.width)//2;y=row*320+42
        c.paste(im,(x,y),im);d.text((col*450+10,row*320+286),label,font=font,fill='#20364b')
c.save(out/'visual-verification.png')
