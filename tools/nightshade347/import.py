from pathlib import Path
import json,math
import numpy as np
from PIL import Image
from scipy.ndimage import label,find_objects,center_of_mass,distance_transform_edt
R=Path(__file__).resolve().parents[2];S=R/'source-art/nightshade347';D=R/'dist/assets/nightshade347';D.mkdir(parents=True,exist_ok=True)
data=json.loads((R/'dist/nightshade-art346.js').read_text().split('=',1)[1].rstrip(';\n'));proof=[]
def extract(im,cols,rows):
 a=np.array(im.convert('RGBA'));labs,n=label(a[:,:,3]>100);areas=np.bincount(labs.ravel());ids=[i for i,v in enumerate(areas) if i and v>500];assert len(ids)==cols*rows,(len(ids),cols,rows);boxes=find_objects(labs);order={}
 for i in ids:
  cy,cx=center_of_mass(a[:,:,3]>100,labs,i);k=int(cy/(im.height/rows))*cols+int(cx/(im.width/cols));assert k not in order,k;order[k]=i
 assert len(order)==cols*rows
 seeds=np.where(np.isin(labs,ids),labs,0);near=distance_transform_edt(seeds==0,return_distances=False,return_indices=True);owners=seeds[tuple(near)];parts=[]
 for k in range(cols*rows):
  ident=order[k];ys,xs=boxes[ident-1];x0=max(0,xs.start-3);y0=max(0,ys.start-3);x1=min(im.width,xs.stop+3);y1=min(im.height,ys.stop+3);tile=a[y0:y1,x0:x1].copy();tile[:,:,3]=np.where(owners[y0:y1,x0:x1]==ident,tile[:,:,3],0);parts.append((tile,((xs.start+xs.stop)/2-x0,ys.stop-y0),ys.stop-ys.start))
 return parts
for key,cols,rows,reference in [('hero-sweep347',6,4,0),('hero-step347',6,4,0),('hero-beat347',6,4,None),('hero-vault347',6,4,0),('heroBase347',4,4,0),('heroExtra347',6,4,23),('hero-rise347',4,2,7)]:
 parts=extract(Image.open(S/(key+'.png')),cols,rows)
 if key=='hero-vault347':
  candidate=extract(Image.open(S/'hero-vault347-grip.png'),6,4);parts[6:10]=candidate[6:10]
 scale=134/parts[reference][2] if reference is not None else data['frames']['hero-sweep347'][0]['scale']
 tw=math.ceil(max(t.shape[1] for t,_,_ in parts)/8)*8;th=math.ceil(max(t.shape[0] for t,_,_ in parts)/8)*8;out=Image.new('RGBA',(tw*cols,th*rows));frames=[]
 for k,(tile,anchor,h) in enumerate(parts):
  x=k%cols*tw;y=k//cols*th;out.paste(Image.fromarray(tile),(x,y));frames.append({'rect':[x,y,tile.shape[1],tile.shape[0]],'ax':anchor[0],'ay':anchor[1],'scale':scale})
 out.save(D/(key+'.webp'),'WEBP',quality=94,method=4);data['images'][key]='assets/nightshade347/'+key+'.webp';data['frames'][key]=frames;proof.append({'sheet':key,'wholeBodies':len(parts),'scale':scale,'referencePose':reference,'crouchNormalizedToStanding':False,'perPoseScale':False})
for key in ['hero-sweep','hero-baton-stroke','grapple-vault']:
 data['images'].pop(key,None);data['frames'].pop(key,None)
(R/'dist/nightshade-art347.js').write_text('globalThis.NightshadeArt347='+json.dumps(data,separators=(',',':'))+';\n');(R/'reports347/import.json').write_text(json.dumps(proof,indent=2)+'\n');print('Imported',sum(x['wholeBodies'] for x in proof),'new whole hero poses')
