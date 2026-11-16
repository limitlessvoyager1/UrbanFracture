from pathlib import Path
import json,math
import numpy as np
from PIL import Image
from scipy.ndimage import label,find_objects,center_of_mass,distance_transform_edt
R=Path(__file__).resolve().parents[2];S=R/'source-art/nightshade346';D=R/'dist/assets/nightshade346';D.mkdir(parents=True,exist_ok=True)
data={'images':{},'frames':{},'enemies':{}};proof=[]
spec=[('hero-sweep',[134]),('hero-baton-stroke',[134]),('hero-melee',[134]),('hero-command',[134]),('grapple-vault',[134]),('grapple-backroll',[134]),('grapple-combo',[134]),('enemy-marcus-kevin',[132,132]),('enemy-bruno-frankie',[145,134]),('enemy-carmen-flint',[129,133]),('enemy-saito-akari',[132,127]),('enemy-brick-jackal',[149,136])]
for key,heights in spec:
 im=Image.open(S/(key+'.png')).convert('RGBA');a=np.array(im);labs,n=label(a[:,:,3]>100);areas=np.bincount(labs.ravel());ids=[i for i,v in enumerate(areas) if i and v>500];assert len(ids)==24,(key,len(ids));boxes=find_objects(labs);order={}
 for i in ids:
  cy,cx=center_of_mass(a[:,:,3]>100,labs,i);k=int(cy/(im.height/4))*6+int(cx/(im.width/6));assert k not in order,(key,k);order[k]=i
 assert set(order)==set(range(24)),key
 seeds=np.where(np.isin(labs,ids),labs,0);near=distance_transform_edt(seeds==0,return_distances=False,return_indices=True);owners=seeds[tuple(near)];parts=[]
 for k in range(24):
  ident=order[k];ys,xs=boxes[ident-1];x0=max(0,xs.start-3);y0=max(0,ys.start-3);x1=min(im.width,xs.stop+3);y1=min(im.height,ys.stop+3);tile=a[y0:y1,x0:x1].copy();tile[:,:,3]=np.where(owners[y0:y1,x0:x1]==ident,tile[:,:,3],0);parts.append((tile,((xs.start+xs.stop)/2-x0,ys.stop-y0),ys.stop-ys.start,x0,y0))
 tw=math.ceil(max(t.shape[1] for t,*_ in parts)/8)*8;th=math.ceil(max(t.shape[0] for t,*_ in parts)/8)*8;out=Image.new('RGBA',(tw*6,th*4));frames=[]
 for k,(tile,anchor,height,x0,y0) in enumerate(parts):
  x=k%6*tw;y=k//6*th;out.paste(Image.fromarray(tile),(x,y));group=k//12 if len(heights)>1 else 0;ref=parts[group*12][2];frames.append({'rect':[x,y,tile.shape[1],tile.shape[0]],'ax':anchor[0],'ay':anchor[1],'scale':data['frames']['hero-sweep'][0]['scale'] if key=='hero-baton-stroke' else heights[group]/ref});
  if key=='hero-melee' and k in [14,15]:
   px,py={14:(690,628),15:(949,627)}[k];frames[-1]['device']=[(px-x0-anchor[0])*heights[group]/ref,(py-y0-anchor[1])*heights[group]/ref]
 out.save(D/(key+'.webp'),'WEBP',quality=94,method=4);data['images'][key]='assets/nightshade346/'+key+'.webp';data['frames'][key]=frames;proof.append({'sheet':key,'wholeFigures':24,'edgeContacts':[k for k,i in order.items() if boxes[i-1][0].start==0 or boxes[i-1][1].start==0 or boxes[i-1][0].stop==im.height or boxes[i-1][1].stop==im.width],'fixedScalePerCharacter':True,'perPoseResize':False})
for sheet,types in [('marcus-kevin',['thug','knifeThug']),('bruno-frankie',['enforcer','biker']),('carmen-flint',['cop','flint']),('saito-akari',['sato','akari']),('brick-jackal',['bouncer','boss'])]:
 for i,t in enumerate(types):data['enemies'][t]={'sheet':'enemy-'+sheet,'start':i*12}
(R/'dist/nightshade-art346.js').write_text('globalThis.NightshadeArt346='+json.dumps(data,separators=(',',':'))+';\n');(R/'reports346/asset-import.json').write_text(json.dumps(proof,indent=2)+'\n');print('Imported',len(proof)*24,'whole authored figures')
