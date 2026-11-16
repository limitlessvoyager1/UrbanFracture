from pathlib import Path
import json,math
import numpy as np
from PIL import Image
from scipy.ndimage import label,find_objects,center_of_mass,distance_transform_edt
R=Path(__file__).resolve().parents[2];S=R/'source-art/nightshade346';D=R/'dist/assets/nightshade346';p=R/'dist/nightshade-art346.js';data=json.loads(p.read_text().split('=',1)[1].rstrip(';\n'));data['motions']={};proof=[]
def extract(im,cols,rows):
 a=np.array(im.convert('RGBA'));labs,n=label(a[:,:,3]>100);areas=np.bincount(labs.ravel());ids=[i for i,v in enumerate(areas) if i and v>500];boxes=find_objects(labs);order={};columns={i:[] for i in range(cols)}
 for i in ids:
  cy,cx=center_of_mass(a[:,:,3]>100,labs,i);columns[min(cols-1,int(cx/(im.width/cols)))].append((cy,i))
 for col,items in columns.items():
  assert len(items)==rows,(col,len(items),rows)
  for row,(_,ident) in enumerate(sorted(items)):order[row*cols+col]=ident
 assert set(order)==set(range(cols*rows)),(len(ids),cols,rows)
 seeds=np.where(np.isin(labs,ids),labs,0);near=distance_transform_edt(seeds==0,return_distances=False,return_indices=True);owners=seeds[tuple(near)];parts=[]
 for k in range(cols*rows):
  ident=order[k];ys,xs=boxes[ident-1];x0=max(0,xs.start-3);y0=max(0,ys.start-3);x1=min(im.width,xs.stop+3);y1=min(im.height,ys.stop+3);tile=a[y0:y1,x0:x1].copy();tile[:,:,3]=np.where(owners[y0:y1,x0:x1]==ident,tile[:,:,3],0);parts.append((tile,((xs.start+xs.stop)/2-x0,ys.stop-y0),ys.stop-ys.start))
 return parts
for pair,heights,types in [('marcus-kevin',[132,132],['thug','knifeThug']),('bruno-frankie',[145,134],['enforcer','biker']),('carmen-flint',[129,133],['cop','flint']),('saito-akari',[132,127],['sato','akari']),('brick-jackal',[149,136],['bouncer','boss'])]:
 key='victim-motion-'+pair;im=Image.open(S/(key+'.png'));tail=S/(key+'-tail.png');parts=extract(im,6,7 if tail.exists() else 8);ratio=1
 if tail.exists():
  ti=Image.open(tail);tp=extract(ti,4,2);ratio=parts[24][2]/tp[6][2];ti=ti.resize((round(ti.width*ratio),round(ti.height*ratio)),Image.Resampling.LANCZOS);parts=parts[:41]+extract(ti,4,2)[:7]
 assert len(parts)==48
 tw=math.ceil(max(t.shape[1] for t,_,_ in parts)/8)*8;th=math.ceil(max(t.shape[0] for t,_,_ in parts)/8)*8;out=Image.new('RGBA',(tw*6,th*8));frames=[]
 for k,(tile,anchor,h) in enumerate(parts):
  x=k%6*tw;y=k//6*th;out.paste(Image.fromarray(tile),(x,y));group=k//24;frames.append({'rect':[x,y,tile.shape[1],tile.shape[0]],'ax':anchor[0],'ay':anchor[1],'scale':heights[group]/parts[group*24][2]})
 out.save(D/(key+'.webp'),'WEBP',quality=94,method=4);data['images'][key]='assets/nightshade346/'+key+'.webp';data['frames'][key]=frames
 for i,t in enumerate(types):data['motions'][t]={'sheet':key,'start':i*24}
 proof.append({'sheet':key,'authoredBodies':48,'mainPosesUsed':41 if tail.exists() else 48,'companionPosesUsed':7 if tail.exists() else 0,'wholeCompanionDensityCalibration':ratio,'perPoseResize':False,'fixedPerCharacterScale':True})
p.write_text('globalThis.NightshadeArt346='+json.dumps(data,separators=(',',':'))+';\n');(R/'reports346/motion-import.json').write_text(json.dumps(proof,indent=2)+'\n');print('Imported240 authored victim motion poses')
