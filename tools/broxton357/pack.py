from pathlib import Path
from PIL import Image
import json,numpy as np
R=Path(__file__).resolve().parents[2];out=R/'dist/assets/broxton357';out.mkdir(exist_ok=True)
rows=json.loads((R/'reports356/sources.json').read_text());sheets=[];dims=[]
for n in range(6):
 im=Image.open(R/f'source-art/broxton357/redraw-{n}.png').convert('RGBA');a=np.array(im);a[a[:,:,3]<12]=0;im=Image.fromarray(a);im.save(out/f'poses-{n}.webp',quality=94,method=4);sheets.append(f'assets/broxton357/poses-{n}.webp');dims.append(im.size)
frames={}
for q in rows:
 W,H=dims[q['group']];cw,ch=W/4,H/8;s=450/max(q['w'],q['h']);w=q['w']*s/512*cw;h=q['h']*s/512*ch;i=q['cell'];frames[q['id']]={'sheet':q['group'],'rect':[i%4*cw+(cw-w)/2,i//4*ch+(ch-h)/2,w,h]}
p=R/'source-art/broxton357/pool.png'
if p.exists():
 im=Image.open(p).convert('RGBA');a=np.array(im);a[a[:,:,3]<12]=0;im=Image.fromarray(a);im.save(out/'pool.webp',quality=94,method=4);sheet=len(sheets);sheets.append('assets/broxton357/pool.webp');cw,ch=im.width/2,im.height
 for i in range(2):
  q=next(q for q in rows if q['id']=='pool/'+str(i));s=450/max(q['w'],q['h']);w=q['w']*s/512*cw;h=q['h']*s/512*ch;frames[q['id']]={'sheet':sheet,'rect':[i*cw+(cw-w)/2,(ch-h)/2,w,h]}
d={'count':len(rows),'sheets':sheets,'frames':frames}
(R/'dist/broxton357-data.js').write_text('globalThis.Broxton357Data='+json.dumps(d,separators=(',',':'))+';\n')
print('Packed',len(rows),'Broxton pose slots')
# Shared 512px staging preserves the authored bob and airborne phases. One
# uniform scale per cell; never independently stretch limbs or crop anatomy.
guides=json.loads((R/'reports357/guides.json').read_text());gaits={}
sockets={'walk':[[195,250],[213,248],[222,246],[242,246],[265,235],[288,231],[282,234],[279,230],[264,240],[236,241],[208,243],[199,242]],'run':[[177,201],[222,201],[263,181],[283,176],[300,164],[302,164],[277,178],[210,181],[191,185],[181,187],[166,194],[199,199]]}
for mode in ['walk','run']:
 source=Image.open(R/f'source-art/broxton357/{mode}.png').convert('RGBA');a=np.array(source);a[a[:,:,3]<12]=0;source=Image.fromarray(a);cw,ch=source.width/4,source.height/3;atlas=Image.new('RGBA',(2048,1536));frames=[]
 for i,guide in enumerate(guides[mode]):
  cell=source.crop((round(i%4*cw),round(i//4*ch),round((i%4+1)*cw),round((i//4+1)*ch))).resize((512,512),Image.Resampling.LANCZOS);a=np.array(cell);a[a[:,:,3]<12]=0;cell=Image.fromarray(a);ys,xs=np.where(a[:,:,3]>96);top,bottom=int(ys.min()),int(ys.max());head=a[top:top+25,:,3]>96;hx=float(np.where(head)[1].mean());targetTop=43+guide['bob'];targetBottom=max(guide['nearFoot'][1],guide['farFoot'][1]);scale=(targetBottom-targetTop)/(bottom-top);dx=256+(0 if mode=='walk' else 24)-hx*scale;dy=targetTop-top*scale
  normalized=Image.new('RGBA',(512,512));sized=cell.resize((round(512*scale),round(512*scale)),Image.Resampling.LANCZOS);normalized.alpha_composite(sized,(round(dx),round(dy)));atlas.alpha_composite(normalized,(i%4*512,i//4*512));frames.append({'rect':[i%4*512,i//4*512,512,512],'hand':sockets[mode][i],'ground':targetBottom,'import':{'scale':scale,'dx':dx,'dy':dy}})
 atlas.save(out/f'{mode}.webp',quality=94,method=4);gaits[mode]={'src':f'assets/broxton357/{mode}.webp','frames':frames}
 # User-facing proof shows the exact atlas order used by the runtime.
 from PIL import ImageDraw,ImageFont
 proof=Image.new('RGB',(1440,1200),'#152131');pen=ImageDraw.Draw(proof);pen.text((22,8),f'BROXTON / FULL {mode.upper()} CYCLE / 12 FRAMES / BUILD 357',fill='#f2bd7f',font=ImageFont.truetype('DejaVuSans.ttf',23))
 for i in range(12):
  c=atlas.crop((i%4*512,i//4*512,i%4*512+512,i//4*512+512)).resize((360,360),Image.Resampling.LANCZOS);x=i%4*360;y=40+i//4*385;proof.paste(c,(x,y),c);pen.text((x+16,y+350),str(i+1).zfill(2),fill='white',font=ImageFont.truetype('DejaVuSans.ttf',20))
 proof.save(R/f'reports357/broxton-{mode}-full.png')
d['gaits']=gaits
(R/'dist/broxton357-data.js').write_text('globalThis.Broxton357Data='+json.dumps(d,separators=(',',':'))+';\n')
print('Packed complete 12-frame walk and run cycles')
