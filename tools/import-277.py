from PIL import Image
from scipy import ndimage
import numpy as np,json
from pathlib import Path
root=Path(__file__).resolve().parents[1];out=root/'dist/assets/repair277';out.mkdir(parents=True,exist_ok=True)
def parts(name,minimum):
 im=Image.open(root/'art-source277'/name).convert('RGBA');a=np.array(im);mask=a[:,:,3]>=200;labels,n=ndimage.label(mask);objects=[]
 for i,b in enumerate(ndimage.find_objects(labels),1):
  if b is None:continue
  area=np.sum(labels[b]==i)
  if area<minimum:continue
  y,x=b;objects.append((x.start,y.start,x.stop,y.stop))
 return im,objects
meta={}
for name,stem,columns,k in [('flint-ready.png','flint',2,140/766),('dodge-clean.png','dodge',3,.21)]:
 im,boxes=parts(name,6000);boxes.sort(key=lambda b:(int((b[1]+b[3])/2)//(im.height//(1 if stem=='flint' else 2)),b[0]));print(stem,boxes);rows=[]
 for i,b in enumerate(boxes):
  crop=im.crop(b);a=np.array(crop);a[:,:,3]=np.where(a[:,:,3]>=200,255,0);a[a[:,:,3]==0,:3]=0;crop=Image.fromarray(a).resize((round(crop.width*k),round(crop.height*k)),Image.Resampling.NEAREST);crop.save(out/f'{stem}-{i}.webp',quality=90,method=6,exact=True);w,h=crop.size
  ax=w*.5;d=dict(src=f'assets/repair277/{stem}-{i}.webp?v=277',w=w,h=h,ax=ax,ay=h,scale=1,kind=stem+'277')
  if stem=='flint':
   pelvis=[470,1290][i];hand=[[353,149],[1259,399]][i];d['ax']=(pelvis-b[0])*k;d['hand']=[(hand[0]-pelvis)*k,(hand[1]-b[3])*k]
  rows.append(d)
 meta[stem]=rows
assert len(meta['flint'])==2 and len(meta['dodge'])==6
base=json.JSONDecoder().raw_decode((root/'dist/nightshade-art252.js').read_text().split('=',1)[1])[0]
for n in [base['block'],base['land']]:meta['dodge'].append({**base['frames'][n],'kind':'dodge277'})
defs=json.JSONDecoder().raw_decode((root/'dist/enemies43-data.js').read_text().split('=',1)[1])[0]['flint']
source=np.array(Image.open(root/'dist/assets/sprites/flint-v1.webp').convert('RGBA'));hands={}
for n,(hx,hy) in {0:(241,114),3:(1178,84),4:(299,502),5:(465,524),6:(891,389),7:(1330,605)}.items():
 q=defs['frames'][n];x,y,w,h=q['rect'];a=source[y:y+h,x:x+w];labels,_=ndimage.label(a[:,:,3]>=80);sx,sy=q['seed'][0]-x,q['seed'][1]-y;mask=labels==labels[sy,sx];edge=mask|(ndimage.binary_dilation(mask)&(a[:,:,3]>18));rows=np.flatnonzero(np.sum(edge&(a[:,:,3]>=128),axis=1)>=6);fy=-int(rows[-1])-1;k=defs['scale'];fx=x-q['anchor'][0]
 hands[n]=[round(fx*k)+(hx-x)*round(w*k)/w,round(fy*k)+(hy-y)*round(h*k)/h]
meta['hands']=hands
(root/'dist/repair277-data.js').write_text('(function(r){r.FlintReady277Data='+json.dumps(meta['flint'],separators=(',',':'))+';r.NightshadeMeleeArt257.dodge277='+json.dumps(meta['dodge'],separators=(',',':'))+';r.NeonCombat.Flint211.hands277='+json.dumps(hands,separators=(',',':'))+';})(globalThis);\n')
(root/'reports277/import.json').write_text(json.dumps(meta,indent=2)+'\n')
print('assets bytes',sum(p.stat().st_size for p in out.glob('*.webp')))
