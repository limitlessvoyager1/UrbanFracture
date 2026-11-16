from pathlib import Path
from PIL import Image,ImageDraw,ImageFont
import json,numpy as np
R=Path(__file__).resolve().parents[2];out=R/'dist/assets/nightshade360';out.mkdir(exist_ok=True);rows=json.loads((R/'reports360/sources.json').read_text());masters=[];dims=[]
for n in range(13):
 im=Image.open(R/f'source-art/nightshade360/redraw-{n}.png').convert('RGBA');a=np.array(im);a[a[:,:,3]<32]=0
 for i in set(range(32))-{q['cell'] for q in rows if q['group']==n}:a[round(i//4*im.height/8):round((i//4+1)*im.height/8),round(i%4*im.width/4):round((i%4+1)*im.width/4)]=0
 im=Image.fromarray(a);im.save(out/f'poses-{n}.webp',quality=94,method=4);masters.append(f'assets/nightshade360/poses-{n}.webp');dims.append(im.size)
frames=[]
for q in rows:
 W,H=dims[q['group']];cw,ch=W/4,H/8;s=450/max(q['w'],q['h']);w,h=q['w']*s/512*cw,q['h']*s/512*ch;i=q['cell'];frames.append({**q,'master':q['group'],'edited':[i%4*cw+(cw-w)/2,i//4*ch+(ch-h)/2,w,h]})
D={'count':len(frames),'masters':masters,'frames':frames,'gaits':{},'drone':'assets/nightshade360/drone.webp'}
guides=json.loads((R/'reports360/guides.json').read_text());socketfile=R/'reports360/sockets.json';sockets=json.loads(socketfile.read_text()) if socketfile.exists() else {m:[q['hand'] for q in qs] for m,qs in guides.items()}
for mode in ['walk','run']:
 source=Image.open(R/f'source-art/nightshade360/{mode}.png').convert('RGBA');a=np.array(source);a[a[:,:,3]<32]=0;source=Image.fromarray(a);cw,ch=source.width/4,source.height/3;atlas=Image.new('RGBA',(2560,1536));meta=[]
 for i,g in enumerate(guides[mode]):
  cell=source.crop((round(i%4*cw),round(i//4*ch),round((i%4+1)*cw),round((i//4+1)*ch))).resize((512,512),Image.Resampling.LANCZOS);a=np.array(cell);a[a[:,:,3]<32]=0;cell=Image.fromarray(a);ys,xs=np.where(a[:,:,3]>96);top,bottom=int(ys.min()),int(ys.max());hx=float(np.where(a[top:top+25,:,3]>96)[1].mean());tt=43+g['bob'];tb=max(g['nearFoot'][1],g['farFoot'][1]);scale=(tb-tt)/(bottom-top);dx=320+(0 if mode=='walk' else 24)-hx*scale;dy=tt-top*scale;norm=Image.new('RGBA',(640,512));sized=cell.resize((round(512*scale),round(512*scale)),Image.Resampling.LANCZOS);norm.alpha_composite(sized,(round(dx),round(dy)));atlas.alpha_composite(norm,(i%4*640,i//4*512));meta.append({'rect':[i%4*640,i//4*512,640,512],'hand':[sockets[mode][i][0]+64,sockets[mode][i][1]],'handRole':'dominant-near-hand','ground':tb})
 atlas.save(out/f'{mode}.webp',quality=94,method=4);D['gaits'][mode]={'src':f'assets/nightshade360/{mode}.webp','frames':meta};proof=Image.new('RGB',(1760,1200),'#182032');p=ImageDraw.Draw(proof);font=ImageFont.truetype('DejaVuSans.ttf',23);p.text((22,8),f'NIGHTSHADE / FULL {mode.upper()} CYCLE / 12 FRAMES / BUILD360',font=font,fill='#ff82cd')
 for i in range(12):
  c=atlas.crop((i%4*640,i//4*512,i%4*640+640,i//4*512+512)).resize((440,352));x=i%4*440;y=40+i//4*385;proof.paste(c,(x,y),c);p.text((x+15,y+350),str(i+1).zfill(2),font=font,fill='white')
 proof.save(R/f'reports360/nightshade-{mode}-full.png')
im=Image.open(R/'source-art/nightshade360/drone.png').convert('RGBA');a=np.array(im);a[a[:,:,3]<32]=0;im=Image.fromarray(a);im.save(out/'drone.webp',quality=94,method=4)
(R/'dist/nightshade360-data.js').write_text('globalThis.Nightshade360Data='+json.dumps(D,separators=(',',':'))+';\n');print('Packed',D['count'],'mapped poses and24 gait frames')
