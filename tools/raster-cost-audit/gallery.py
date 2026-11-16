from pathlib import Path
import json
from PIL import Image, ImageDraw, ImageFont
root=Path(__file__).resolve().parents[2]; out=root/'reports-raster-cost-audit'
r=json.loads((out/'profile.json').read_text())
font=ImageFont.truetype('C:/Windows/Fonts/arial.ttf',16)
items=[(root/'reports-raster-cost-audit/mixed-8-shipping.png','Shipping bytes: eight visible enemies + hero'),(root/'reports-raster-cost-audit/mixed-8-observed.png','Observer only: pixel-identical full scene')]
for kind,variant in [('thug','idle'),('cop','down'),('cop','getup'),('cop','dead')]:
    a=next(x for x in r['captures'] if x['label']=={'type':kind,'variant':variant,'dir':1})
    items.append((root/a['image'],f'API {kind}/{variant}: sole={a["sole"]}, bottom={a["bottom"]}'))
c=Image.new('RGB',(1350,650),'#edf3f7'); d=ImageDraw.Draw(c)
d.text((12,8),'Audit only — unchanged shipping renderer / lower-level synthetic API controls',font=font,fill='#20364b')
for i,(file,label) in enumerate(items):
    im=Image.open(file).convert('RGBA'); im.thumbnail((430,265))
    x=(i%3)*450+(450-im.width)//2; y=44+(i//3)*300
    c.paste(im,(x,y),im);d.text(((i%3)*450+10,y+269),label,font=font,fill='#20364b')
c.save(out/'audit-visuals.png')
