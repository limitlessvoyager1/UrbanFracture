from PIL import Image
from pathlib import Path
import json
root=Path(__file__).resolve().parents[2];text=(root/'dist/item319-data.js').read_text();d=json.loads(text.split('=',1)[1].rstrip(';\n'));im=Image.open(root/'dist'/d['src']).convert('RGBA');checks=0
assert len(d['frames'])==10;checks+=1
assert im.size==(d['width'],d['height']);checks+=1
assert im.getchannel('A').getextrema()==(0,255);checks+=1
for key,f in d['frames'].items():
 x,y,w,h=f['rect'];assert 0<=x<x+w<=im.width and 0<=y<y+h<=im.height;checks+=1
 crop=im.crop((x,y,x+w,y+h));box=crop.getchannel('A').point(lambda a:255 if a>32 else 0).getbbox();assert box;checks+=1
 assert f['ay']==box[3] and f['ax']==(box[0]+box[2])/2;checks+=1
 assert 0<f['width']<=42;checks+=1
for key,test in [('fullHeal',lambda r,g,b:r>120 and r>g*1.4 and r>b*1.4),('healthPack',lambda r,g,b:g>40 and g>r*1.2 and g>b*1.1)]:
 x,y,w,h=d['frames'][key]['rect'];n=sum(1 for r,g,b,a in im.crop((x,y,x+w,y+h)).getdata() if a>128 and test(r,g,b));assert n>=30,(key,n);checks+=1
assert d['frames']['fullHeal']['width']>d['frames']['healthPack']['width'];checks+=1
n=(root/'dist'/d['src']).stat().st_size+(root/'dist/item319-data.js').stat().st_size;assert n<=19000;checks+=1
q={'passed':True,'checks':checks,'shippingBytes':n,'scope':'10 complete isolated crops, true alpha, measured source sole anchors, distinguishable red/green medical symbols and first-aid world-size priority; final native placement remains runtime-owner verification'}
(Path(__file__).parent/'validation.json').write_text(json.dumps(q,indent=2));print(json.dumps(q))
