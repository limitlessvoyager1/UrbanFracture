from pathlib import Path
from PIL import Image
import json,numpy as np
R=Path(__file__).resolve().parents[2];out=R/'dist/assets/broxton366';out.mkdir(exist_ok=True)
d=json.loads((R/'dist/broxton359-data.js').read_text().split('=',1)[1].rstrip(';\n'))
guides=json.loads((R/'reports359/guides.json').read_text());gaits={}
sockets=json.loads((R/'reports366/sockets.json').read_text())
for mode in ['walk','run']:
 source=Image.open(R/f'source-art/broxton366/{mode}.png').convert('RGBA');a=np.array(source);a[a[:,:,3]<12]=0;source=Image.fromarray(a);cw,ch=source.width/4,source.height/3;atlas=Image.new('RGBA',(2048,1536));frames=[]
 for i,guide in enumerate(guides[mode]):
  cell=source.crop((round(i%4*cw),round(i//4*ch),round((i%4+1)*cw),round((i//4+1)*ch))).resize((512,512),Image.Resampling.LANCZOS);a=np.array(cell);a[a[:,:,3]<12]=0;cell=Image.fromarray(a);ys,xs=np.where(a[:,:,3]>96);top,bottom=int(ys.min()),int(ys.max());head=a[top:top+25,:,3]>96;hx=float(np.where(head)[1].mean());targetTop=43+guide['bob'];targetBottom=max(guide['nearFoot'][1],guide['farFoot'][1]);scale=(targetBottom-targetTop)/(bottom-top);dx=256+(0 if mode=='walk' else 24)-hx*scale;dy=targetTop-top*scale
  normalized=Image.new('RGBA',(512,512));sized=cell.resize((round(512*scale),round(512*scale)),Image.Resampling.LANCZOS);normalized.alpha_composite(sized,(round(dx),round(dy)));atlas.alpha_composite(normalized,(i%4*512,i//4*512));frames.append({'rect':[i%4*512,i//4*512,512,512],'hand':sockets[mode][i],'ground':targetBottom,'import':{'scale':scale,'dx':dx,'dy':dy}})
 atlas.save(out/f'{mode}.webp',quality=94,method=4);gaits[mode]={'src':f'assets/broxton366/{mode}.webp','frames':frames}
 # User-facing proof shows the exact atlas order used by the runtime.
 from PIL import ImageDraw,ImageFont
 proof=Image.new('RGB',(1440,1200),'#152131');pen=ImageDraw.Draw(proof);pen.text((22,8),f'BROXTON / FULL {mode.upper()} CYCLE / 12 FRAMES / BUILD 366',fill='#f2bd7f',font=ImageFont.truetype('DejaVuSans.ttf',23))
 for i in range(12):
  c=atlas.crop((i%4*512,i//4*512,i%4*512+512,i//4*512+512)).resize((360,360),Image.Resampling.LANCZOS);x=i%4*360;y=40+i//4*385;proof.paste(c,(x,y),c);pen.text((x+16,y+350),str(i+1).zfill(2),fill='white',font=ImageFont.truetype('DejaVuSans.ttf',20))
 proof.save(R/f'reports366/broxton-{mode}-full.png')

d['gaits']=gaits
(R/'dist/broxton359-data.js').write_text('globalThis.Broxton359Data='+json.dumps(d,separators=(',',':'))+';\n')
# Each phone pose remains a complete figure. Use one common scale across the sheet.
source=Image.open(R/'source-art/broxton366/call.png').convert('RGBA');atlas=Image.new('RGBA',(1536,1024));boxes=[]
for i in range(24):
 cell=source.crop((i%6*256,i//6*256,i%6*256+256,i//6*256+256));a=np.array(cell);a[a[:,:,3]<24]=0;cell=Image.fromarray(a);ys,xs=np.where(a[:,:,3]>96);boxes.append((cell,(int(xs.min()),int(ys.min()),int(xs.max())+1,int(ys.max())+1)))
height=sorted(b[3]-b[1] for _,b in boxes)[12];scale=240/height
for i,(cell,b) in enumerate(boxes):
 body=cell.crop(b);body=body.resize((round(body.width*scale),round(body.height*scale)),Image.Resampling.LANCZOS);atlas.alpha_composite(body,(i%6*256+128-body.width//2,i//6*256+248-body.height))
atlas.save(out/'call.webp',quality=94,method=4)
(R/'reports366/registration.json').write_text(json.dumps({'gaits':24,'phone':24,'phoneSourceHeight':height,'phoneScale':scale,'size':.95,'buildWidth':.95},indent=2))
