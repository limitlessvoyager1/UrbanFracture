from pathlib import Path
from PIL import Image,ImageDraw,ImageFont
import json,numpy as np
R=Path(__file__).resolve().parents[2];out=R/'dist/assets/agent363';out.mkdir(exist_ok=True);guides=json.loads((R/'reports363/guides.json').read_text());socketpath=R/'reports363/sockets.json';sockets=json.loads(socketpath.read_text()) if socketpath.exists() else {m:[q['hand'] for q in qs] for m,qs in guides.items()};D=json.loads((R/'dist/nightshade360-data.js').read_text().split('=',1)[1].rstrip(';\n'))
for mode in ['walk','run']:
 source=Image.open(R/f'source-art/agent363/{mode}.png').convert('RGBA');a=np.array(source);a[a[:,:,3]<32]=0;source=Image.fromarray(a);cw,ch=source.width/4,source.height/3;atlas=Image.new('RGBA',(2560,1536));meta=[]
 for i,g in enumerate(guides[mode]):
  cell=source.crop((round(i%4*cw),round(i//4*ch),round((i%4+1)*cw),round((i//4+1)*ch))).resize((512,512),Image.Resampling.LANCZOS);a=np.array(cell);a[a[:,:,3]<32]=0;cell=Image.fromarray(a);ys,xs=np.where(a[:,:,3]>96);top,bottom=int(ys.min()),int(ys.max());hx=float(np.where(a[top:top+25,:,3]>96)[1].mean());tt=43+g['bob'];tb=max(g['nearFoot'][1],g['farFoot'][1]);scale=(tb-tt)/(bottom-top);dx=320+(0 if mode=='walk' else 18)-hx*scale;dy=tt-top*scale;norm=Image.new('RGBA',(640,512));norm.alpha_composite(cell.resize((round(512*scale),round(512*scale)),Image.Resampling.LANCZOS),(round(dx),round(dy)));atlas.alpha_composite(norm,(i%4*640,i//4*512));meta.append({'rect':[i%4*640,i//4*512,640,512],'hand':[sockets[mode][i][0]+64,sockets[mode][i][1]],'handRole':'dominant-near-hand','ground':tb,'motion363':'agent-'+mode})
 atlas.save(out/f'{mode}.webp',quality=94,method=4);D['gaits'][mode]={'src':f'assets/agent363/{mode}.webp','frames':meta}
 proof=Image.new('RGB',(1760,1200),'#182032');p=ImageDraw.Draw(proof);font=ImageFont.truetype('DejaVuSans.ttf',23);p.text((22,8),f'NIGHTSHADE / CONFIDENT AGENT {mode.upper()} / 12 FRAMES / BUILD363',font=font,fill='#ff82cd')
 for i in range(12):
  c=atlas.crop((i%4*640,i//4*512,i%4*640+640,i//4*512+512)).resize((440,352));x=i%4*440;y=40+i//4*385;proof.paste(c,(x,y),c);p.text((x+15,y+350),str(i+1).zfill(2),font=font,fill='white')
 proof.save(R/f'reports363/nightshade-{mode}-full.png')
(R/'dist/nightshade360-data.js').write_text('globalThis.Nightshade360Data='+json.dumps(D,separators=(',',':'))+';\n')
im=Image.open(R/'source-art/agent363/knife.png').convert('RGBA');a=np.array(im);a[a[:,:,3]<32]=0;im=Image.fromarray(a);im=im.crop(im.getbbox());im.thumbnail((1024,220));im.save(out/'knife.webp',quality=95,method=4)
im=Image.open(R/'source-art/agent363/upper.png').convert('RGB');ys=[0,155,311,468,614,751,887];atlas=Image.new('RGB',(im.width,148*6))
for i in range(6):atlas.paste(im.crop((0,round(ys[i]*im.height/887),im.width,round(ys[i+1]*im.height/887))).resize((im.width,148),Image.Resampling.LANCZOS),(0,i*148))
atlas.save(out/'upper.webp',quality=94,method=4)
print('Packed24 agent frames, reference knife and6 upper stories')
