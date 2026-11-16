from pathlib import Path
from PIL import Image
import numpy as np,json,hashlib
from scipy import ndimage as nd
D={};proof={}
for name,height in [('german-marcus',216),('german-bruno',216),('reap-marcus',262),('reap-bruno',259),('powerbomb',241)]:
 p=Path('source-archive/build301/'+name+'.png');im=Image.open(p).convert('RGBA');sourceSize=list(im.size);raw=np.array(im);rawlab,_=nd.label(raw[:,:,3]>96);regions=[]
 for j,sl in enumerate(nd.find_objects(rawlab),1):
  if sl is None:continue
  yy,xx=sl
  if (xx.start+xx.stop)/2<im.width/4 and (yy.start+yy.stop)/2<im.height/4:regions.append((int((rawlab[sl]==j).sum()),j))
 main=max(regions)[1];mask=rawlab==main;blue=(raw[:,:,2]>raw[:,:,0]*1.5)&(raw[:,:,2]>raw[:,:,1]*1.1)&(raw[:,:,1]>45)&mask;by,bx=np.nonzero(blue);ys,xs=np.nonzero(mask);left=mask&(np.indices(mask.shape)[1]<np.median(bx));ly,lx=np.nonzero(left);height=int(ys.max()-ly.min()+1) if name!='powerbomb' else int(ys.max()-ys.min()+1);uniform=(137 if name=='powerbomb' else 138)/height;im=im.resize((round(im.width*uniform),round(im.height*uniform)),Image.Resampling.NEAREST);a=np.array(im);H,W=a.shape[:2];lab,n=nd.label(a[:,:,3]>96);groups=[[] for _ in range(16)]
 for j,sl in enumerate(nd.find_objects(lab),1):
  if sl is None:continue
  ys,xs=sl;count=int((lab[sl]==j).sum());w=xs.stop-xs.start;h=ys.stop-ys.start
  if count<300 or w<8 or h<8 or max(w/h,h/w)>25:continue
  cy=(ys.start+ys.stop)/2;cx=(xs.start+xs.stop)/2;col=max(0,min(3,int(cx*4/W)));row=max(0,min(3,int(cy*4/H)));groups[row*4+col].append((j,sl,count))
 items=[];frames=[];sc=1
 for i,group in enumerate(groups):
  assert group,(name,i,'empty');x0=min(s[1].start for j,s,c in group);y0=min(s[0].start for j,s,c in group);x1=max(s[1].stop for j,s,c in group);y1=max(s[0].stop for j,s,c in group);piece=a[y0:y1,x0:x1].copy();keep=np.isin(lab[y0:y1,x0:x1],[j for j,s,c in group]);piece[:,:,3]=np.where(keep,255,0);piece[~keep,:3]=0
  blue=(piece[:,:,2]>piece[:,:,0]*1.5)&(piece[:,:,2]>piece[:,:,1]*1.1)&(piece[:,:,1]>45)&keep;by,bx=np.nonzero(blue);floor=y1-y0
  if name=='powerbomb':
   mask=keep&(np.indices(keep.shape)[0]>=floor-16)&(np.indices(keep.shape)[1]<piece.shape[1]*.60)&(piece[:,:,0]<85)&(piece[:,:,1]<85)&(piece[:,:,2]<100);yy,xx=np.nonzero(mask);root=float(np.median(xx))
  else:
   blueBottom=int(by.max());root=float(np.median(bx[by>=blueBottom-7]))
  comps=[]
  for j,sl,count in group:
   sy,sx=np.nonzero(lab==j);at=len(sx)//2;comps.append(dict(pixels=count,box=[sl[1].start-x0,sl[0].start-y0,sl[1].stop-x0,sl[0].stop-y0],seed=[int(sx[at]-x0),int(sy[at]-y0)],label=j))
  frames.append(dict(cell=i,root=[round(root,2),floor],components=comps,sourceBounds=[x0,y0,x1,y1],edgeClipped=x0==0 or y0==0 or x1==W or y1==H));items.append(piece)
 cw=max(p.shape[1] for p in items)+8;ch=max(p.shape[0] for p in items)+8;canvas=Image.new('RGBA',(cw*4,ch*4))
 for i,(a,q) in enumerate(zip(items,frames)):
  canvas.alpha_composite(Image.fromarray(a),(i%4*cw+4,i//4*ch+4));q['rect']=[i%4*cw+4,i//4*ch+4,a.shape[1],a.shape[0]]
 path=Path('dist/assets/sprites/grapple301-'+name+'.webp');canvas.save(path,quality=92,method=6)
 D[name]=dict(src=str(path.relative_to('dist'))+'?v=301',scale=sc,frames=frames)
 proof[name]=dict(sourceSha256=hashlib.sha256(p.read_bytes()).hexdigest(),sourceSize=sourceSize,uniformImportScale=uniform,calibratedHeight=height,importSize=list(canvas.size),fixedScale=sc,bytes=path.stat().st_size,frames=frames)
Path('dist/grapple301-data.js').write_text('globalThis.Grapple301Data='+json.dumps(D,separators=(',',':'))+';\n')
Path('reports301/art-import.json').write_text(json.dumps(proof,indent=2)+'\n');print(json.dumps({k:dict(scale=v['fixedScale'],bytes=v['bytes'],clipped=[i for i,f in enumerate(v['frames']) if f['edgeClipped']],components=[len(f['components']) for f in v['frames']]) for k,v in proof.items()},indent=2))
