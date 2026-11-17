"""Pack reviewed accessory edits with original source registration; no pose clocks."""
from pathlib import Path
from PIL import Image,ImageDraw
import numpy as np,json,hashlib,shutil
R=Path(__file__).resolve().parents[2];Q=R/'qa/system242/repair-references/reina389';O=R/'reports389';O.mkdir(exist_ok=True)
waists={q['key']:q['points'] for q in json.loads((Q/'waist-registration.json').read_text())}
specs=[('loc','reina381',6,[0,182,368,546,734,912,1086,1267,1448],list(range(48)),list(range(4))),('att','reina381',6,[0,178,368,548,723,907,1091,1274,1448],list(range(48)),list(range(42,48))),('corrections','reina382',6,[0,184,362,542,727,907,1085,1268,1448],list(range(4))+[4,7,9,10]+list(range(12,20))+list(range(20,28))+[28,29,30,31,20,24,26,27]+[28,32,33,34,35,36,37,39]+list(range(40,48)),list(range(4))),('extra','reina382',4,[0,222,444,666,888,1110,1332,1554,1774],list(range(32)),[0,7,8]),('motion','reina383',4,[0,216,427,640,844,1055,1210,1448],list(range(28)),list(range(4)))]
data381={};receipts=[]
for key,family,cols,bands,order,norm in specs:
 old=Image.open(Q/(key+'-original-source.png')).convert('RGBA');new=Image.open(Q/(key+'-scabbard-source.png')).convert('RGBA');assert old.size==new.size,(key,old.size,new.size)
 cells=[]
 for i in range(cols*(len(bands)-1)):
  box=(round(i%cols*old.width/cols),bands[i//cols],round((i%cols+1)*old.width/cols),bands[i//cols+1]);a=np.asarray(old.crop(box));ys,xs=np.where(a[:,:,3]>100);assert len(xs)>100;cells.append((box,(int(xs.min()),int(ys.min()),int(xs.max())+1,int(ys.max())+1)))
 factor=190/float(np.median([cells[i][1][3]-cells[i][1][1] for i in norm]));outcols=6 if family!='reina383' else 4;tw,th,ax,ay=(384,384,192,340);atlas=Image.new('RGBA',(outcols*tw,((len(order)+outcols-1)//outcols)*th));proof=Image.new('RGB',atlas.size,'#172433');pen=ImageDraw.Draw(proof);frames=[];rootrows=[]
 hips=[165,165,165,165,160,150,155,154,160,150,155,154,145,145,145,147,145,145,145,147,150,150,154,155,155,155,155,155]
 run_ground=max(166+[2,0,-4,-6,2,0,-4,-6][i-12]+round((cells[i][1][3]-cells[i][1][1])*factor) for i in range(12,20))-340 if key=='motion' else 0
 for j,i in enumerate(order):
  box,b=cells[i];cell=new.crop(box);w,h=round((b[2]-b[0])*factor),round((b[3]-b[1])*factor)
  # Reviewed neighboring-cell blade bleed, present in original (9 opaque px)
  # and edited source (32 px); outside the actor and corrected hip scabbard.
  if key=='loc' and i==40:cell.paste((0,0,0,0),(170,140,181,154))
  if family=='reina381':
   waist=waists[key][i];dx=ax-waist[0]*factor;dy=ay-b[3]*factor
   oldfactor=min(factor,234/(b[3]-b[1]));oldroot=(waist[0]-(b[0]+b[2])/2)*oldfactor*148/190
   rootrows.append({'frame':i,'waistSource':waist,'beforeLogicalWaistX':oldroot,'afterLogicalWaistX':0,'fixedImportScale':factor,'oldImportScale':oldfactor})
  else:
   x=192-w//2;y=340-h
   if key=='extra':
    a=np.asarray(old.crop(box));ys,xs=np.where((a[:,:,3]>100)&(np.indices(a.shape[:2])[0]>=b[3]-10));foot=(float(xs.min())+float(xs.max()))/2;x=round(192-(foot-b[0])*factor)
   if key=='motion':
    x=round(192-(hips[i]-b[0])*factor)
    if 4<=i<12:y=150+[0,1,0,-1,0,1,0,-1][i-4]
    if 12<=i<20:y=166+[2,0,-4,-6,2,0,-4,-6][i-12]-run_ground
   # The exact previous crop registration owns scale/rounding; expanded source
   # padding allows the corrected sheath outside the old opaque bounds.
   dx=x-b[0]*factor;dy=y-b[1]*factor
  tile=Image.new('RGBA',(tw,th));sized=cell.resize((round(cell.width*factor),round(cell.height*factor)),Image.Resampling.LANCZOS);tile.alpha_composite(sized,(round(dx),round(dy)));bb=tile.getbbox();assert bb and bb[0]>0 and bb[1]>0 and bb[2]<tw and bb[3]<th,(key,j,'clipped',bb)
  atlas.alpha_composite(tile,(j%outcols*tw,j//outcols*th));proof.paste(tile,(j%outcols*tw,j//outcols*th),tile);pen.text((j%outcols*tw+5,j//outcols*th+5),str(j),fill='white');frames.append({'rect':[j%outcols*tw,j//outcols*th,tw,th],'ax':ax,'ay':ay})
  if family=='reina381':
   xx=j%outcols*tw+ax;yy=j//outcols*th+ay-(b[3]-waists[key][i][1])*factor;pen.line((xx-5,yy,xx+5,yy),fill='#00ff99',width=2)
 out=R/f'dist/assets/{family}/{key}.webp';before=(Q/(key+'-before389.webp')).stat().st_size;atlas.save(out,quality=88 if family=='reina381' else 83 if key=='motion' else 80,method=6);proof.save(O/(key+'-after-atlas.webp'),quality=85)
 if family=='reina381':data381[key]={'src':f'assets/{family}/{key}.webp','frames':frames,'scale':148/190}
 receipts.append({'family':family,'key':key,'poses':len(order),'sourceSize':old.size,'importScale':factor,'beforeBytes':before,'afterBytes':out.stat().st_size,'originalSHA256':hashlib.sha256((Q/(key+'-original-source.png')).read_bytes()).hexdigest(),'editedSHA256':hashlib.sha256((Q/(key+'-scabbard-source.png')).read_bytes()).hexdigest(),'atlasSHA256':hashlib.sha256(out.read_bytes()).hexdigest(),'roots':rootrows,'certified':False})
(R/'dist/reina381-data.js').write_text('globalThis.Reina381Data='+json.dumps(data381,separators=(',',':'))+';\n');(O/'asset-import.json').write_text(json.dumps({'poses':sum(x['poses']for x in receipts),'receipts':receipts,'artisticApproval':False},indent=2));print(json.dumps({'poses':sum(x['poses']for x in receipts),'byteDelta':sum(x['afterBytes']-x['beforeBytes']for x in receipts),'maxOldWaistOffset':max(abs(q['beforeLogicalWaistX'])for r in receipts for q in r['roots']),'afterWaistOffset':0}))
