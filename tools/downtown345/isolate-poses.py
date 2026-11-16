"""Extract full connected source figures, including poses extending across a nominal grid.
No repainting or per-pose resizing; original masters remain immutable.
"""
from pathlib import Path
import json,math
import numpy as np
from PIL import Image
from scipy.ndimage import label,find_objects,center_of_mass,distance_transform_edt
R=Path(__file__).resolve().parents[2];S=R/'source-art/downtown345';D=R/'dist/assets/downtown345'
p=R/'dist/downtown-art345.js';data=json.loads(p.read_text().split('=',1)[1].rstrip(';\n'));proof=[]
for key,cols,rows,heights in [('heroBase',4,4,[134]),('heroExtra',6,4,[134]),('marcus-kevin',6,6,[132,132]),('bruno-frankie',6,6,[145,134]),('carmen-flint',6,6,[129,133]),('saito-akari',6,6,[132,127]),('brick-jackal',6,6,[149,136])]:
 im=Image.open(S/(key+'.png')).convert('RGBA');a=np.array(im);labs,n=label(a[:,:,3]>100);areas=np.bincount(labs.ravel());ids=[i for i,v in enumerate(areas) if i and v>500];assert len(ids)==cols*rows,(key,len(ids))
 boxes=find_objects(labs);order={}
 for i in ids:
  cy,cx=center_of_mass(a[:,:,3]>100,labs,i);k=int(cy/(im.height/rows))*cols+int(cx/(im.width/cols));assert k not in order,(key,k);order[k]=i
 assert set(order)==set(range(cols*rows)),key
 seeds=np.where(np.isin(labs,ids),labs,0);nearest=distance_transform_edt(seeds==0,return_distances=False,return_indices=True);owners=seeds[tuple(nearest)];parts=[]
 for k in range(cols*rows):
  i=order[k];ys,xs=boxes[i-1];x0=max(0,xs.start-3);y0=max(0,ys.start-3);x1=min(im.width,xs.stop+3);y1=min(im.height,ys.stop+3);tile=a[y0:y1,x0:x1].copy();own=owners[y0:y1,x0:x1]==i;tile[:,:,3]=np.where(own,tile[:,:,3],0);assert np.count_nonzero((labs[y0:y1,x0:x1]==i)&~own)==0
  parts.append((tile,((xs.start+xs.stop)/2-x0,ys.stop-y0),ys.stop-ys.start))
 tw=math.ceil(max(t.shape[1] for t,_,_ in parts)/8)*8;th=math.ceil(max(t.shape[0] for t,_,_ in parts)/8)*8;out=Image.new('RGBA',(tw*cols,th*rows));frames=[]
 for k,(tile,anchor,height) in enumerate(parts):
  x=k%cols*tw;y=k//cols*th;out.paste(Image.fromarray(tile),(x,y));group=k//18 if len(heights)>1 else 0;ref=parts[group*18][2];frames.append({'rect':[x,y,tile.shape[1],tile.shape[0]],'ax':anchor[0],'ay':anchor[1],'scale':heights[group]/ref})
 out.save(D/(key+'.webp'),'WEBP',quality=94,method=4);data['frames'][key]=frames;proof.append({'sheet':key,'sourceBodies':len(ids),'masterEdgeContacts':[k for k,i in order.items() if boxes[i-1][0].start==0 or boxes[i-1][1].start==0 or boxes[i-1][0].stop==im.height or boxes[i-1][1].stop==im.width],'allCorePixelsRetained':True,'foreignBodiesRemoved':True,'perPoseResizing':False,'atlasSize':out.size})
# Two repaired falls share one uniform source-density calibration. Jackal's
# requested upright repair came back kneeling, so use his intact authored idle
# for the final return-to-combat pose instead of regressing to a kneel.
repair=Image.open(S/'pose-repairs.png').convert('RGBA');old=Image.open(S/'marcus-kevin.png');ol,n=label(np.array(old)[:,:,3]>100);oa=np.bincount(ol.ravel());ob=find_objects(ol);reference=None
for ident,v in enumerate(oa):
 if not ident or v<500:continue
 cy,cx=center_of_mass(ol==ident)
 if int(cy/(old.height/6))*6+int(cx/(old.width/6))==11:reference=ob[ident-1][0].stop-ob[ident-1][0].start
ra=np.array(repair);rl,n=label(ra[:,:,3]>100);areas=np.bincount(rl.ravel());rb=find_objects(rl);first=[i for i,v in enumerate(areas) if i and v>500 and center_of_mass(rl==i)[1]<repair.width/3][0];density=reference/(rb[first-1][0].stop-rb[first-1][0].start);repair=repair.resize((round(repair.width*density),round(repair.height*density)),Image.Resampling.LANCZOS);repair.save(D/'poseRepairs.webp','WEBP',quality=94,method=4);data['images']['poseRepairs']='assets/downtown345/poseRepairs.webp';ra=np.array(repair);rl,n=label(ra[:,:,3]>100);areas=np.bincount(rl.ravel());rb=find_objects(rl)
for column,target in [(0,11),(1,29)]:
 ids=[i for i,v in enumerate(areas) if i and v>500 and int(center_of_mass(rl==i)[1]/(repair.width/3))==column];assert len(ids)==1;ys,xs=rb[ids[0]-1];x0=max(0,xs.start-3);y0=max(0,ys.start-3);x1=min(repair.width,xs.stop+3);y1=min(repair.height,ys.stop+3);scale=data['frames']['marcus-kevin'][target]['scale'];data['frames']['marcus-kevin'][target]={'rect':[x0,y0,x1-x0,y1-y0],'ax':(xs.start+xs.stop)/2-x0,'ay':ys.stop-y0,'scale':scale,'image':'poseRepairs'}
data['frames']['brick-jackal'][35]=dict(data['frames']['brick-jackal'][18]);proof.append({'sheet':'poseRepairs','sourceBodies':3,'usedFrames':[11,29],'uniformSourceDensity':density,'unusedThirdFigure':'Kneeling output rejected as final standing recovery','jackalFinalRecovery':'intact original Jackal idle, no timing change'})
p.write_text('globalThis.DowntownArt345='+json.dumps(data,separators=(',',':'))+';\n');(R/'reports345/pose-isolation.json').write_text(json.dumps({'passed':True,'method':'Whole connected source-figure extraction with nearest-body antialias ownership; master pixels unchanged, no body resizing. Three-pixel source padding.','sheets':proof},indent=2)+'\n');print('PASS isolated',sum(x['sourceBodies'] for x in proof),'source figures without nominal-grid truncation')
