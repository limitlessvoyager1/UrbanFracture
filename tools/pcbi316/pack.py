from PIL import Image,ImageDraw
from scipy.ndimage import label,find_objects,binary_dilation
import numpy as np,json,shutil,statistics
from pathlib import Path
SRC=Path('source-art/pcbi316');OUT=Path('dist/assets/pcbi316');REPORT=Path('reports316/pcbi-art');CELL=224
sources={'talon':'exec-81e3036c-8cf9-4e53-85f0-26c8bc8f71c2.png','jaguar':'exec-1e9d76dc-3aba-4328-b978-f6f712e8c560.png'}
common={'walk':list(range(8)),'run':list(range(8,14)),'idle':[14],'rearIdle':[15],'reload':[20,21,22],'lightRecoil':[40],'mediumRecoil':[41],'heavyStagger':[42],'fall':[43,44],'prone':[45],'getup':[46,47],'defeat':[43,44,45]}
extras={'talon':{'drawGun':[16],'aim':[17],'fire':[18],'lowerGun':[19],'drawBaton':[23],'batonIdle':[24],'batonCombo':[25,26,27],'thrust':[28,29],'sweep':[30,31],'punch':[32,33,34],'grab':[35,36],'throw':[37,38],'sidestep':[39],'intercept':[28,29]},'jaguar':{'drawGun':[16,17],'aim':[18],'fire':[19],'holster':[23],'unarmedIdle':[24],'punchCombo':[25,26,27,28,29,30],'retreat':[31],'drawTaser':[32],'grab':[33,34],'taserContact':[35,36],'taserRelease':[37],'sidestep':[38,39]}}
# Original source-space socket coordinates, calibrated from authored poses.
sockets={'talon':{17:{'hand':[312,400],'muzzle':[346,397]},18:{'hand':[491,400],'muzzle':[524,398]},24:{'hand':[52,641],'weaponTip':[108,617]},25:{'hand':[228,586],'weaponTip':[280,562]},26:{'hand':[481,657],'weaponTip':[523,680]},27:{'hand':[670,657],'weaponTip':[707,669]},28:{'hand':[794,620],'weaponTip':[853,610]},29:{'hand':[1035,614],'weaponTip':[1094,614]},30:{'hand':[1206,697],'weaponTip':[1247,713]},31:{'hand':[1389,696],'weaponTip':[1430,707]},35:{'hand':[684,781]},36:{'hand':[859,784]}},'jaguar':{18:{'hand':[475,402],'muzzle':[511,395]},19:{'hand':[657,403],'muzzle':[695,398]},32:{'hand':[111,821]},33:{'hand':[326,783]},34:{'hand':[505,775]},35:{'hand':[683,775],'weaponTip':[706,770]},36:{'hand':[859,788],'weaponTip':[887,780]},37:{'hand':[1031,802]}}}
data={};qa={}
for name,file in sources.items():
 src=Path('/workspace/scratch/96a3e452279b/generated_images')/file;shutil.copy2(src,SRC/f'{name}-original.png');im=Image.open(src).convert('RGBA');a=np.array(im);atlas=Image.new('RGBA',(CELL*8,CELL*6));frames=[];checks=[]
 for row in range(6):
  slab=a[row*181:(row+1)*181];z,n=label(slab[:,:,3]>128);objects=[]
  for lab,s in enumerate(find_objects(z),1):
   if s and (z[s]==lab).sum()>600:objects.append((s,lab))
  objects.sort(key=lambda v:v[0][1].start);assert len(objects)==8,(name,row,len(objects))
  for col,(s,lab) in enumerate(objects):
   idx=row*8+col;mask=binary_dilation(z==lab,iterations=2);rgba=slab.copy();rgba[~mask]=0;rgba[rgba[:,:,3]<96]=0
   bb=Image.fromarray(rgba).getbbox();assert bb
   left,top,right,bottom=bb;cut=Image.fromarray(rgba).crop(bb);assert cut.width<CELL-4 and cut.height<CELL-4
   dx=112-cut.width//2;dy=220-cut.height;atlas.alpha_composite(cut,(col*CELL+dx,row*CELL+dy));frame={'rect':[col*CELL,row*CELL,CELL,CELL],'ax':112,'ay':220,'sourceBounds':[left,row*181+top,right,row*181+bottom],'opaqueBounds':[dx,dy,dx+cut.width,dy+cut.height],'weaponsBaked':(name=='talon' and 16<=idx<=31) or(name=='jaguar' and (14<=idx<=23 or 32<=idx<=37)),'sockets':{}}
   for key,pos in sockets.get(name,{}).get(idx,{}).items():frame['sockets'][key]=[round(dx+pos[0]-left,2),round(dy+pos[1]-(row*181+top),2)]
   # Coordinates above are sprite-cell pixels. Consumers subtract ax/ay and multiply uniform scale.
   frames.append(frame);checks.append({'index':idx,'sourceComponentPixels':int((z==lab).sum()),'isolated':True,'size':[cut.width,cut.height]})
 ref=statistics.median([f['sourceBounds'][3]-f['sourceBounds'][1] for f in frames[:8]]);path=OUT/f'{name}.webp';atlas.save(path,quality=84,method=6);anims=dict(common);anims.update(extras[name]);data[name]={'src':f'assets/pcbi316/{name}.webp','frames':frames,'animations':anims,'anatomicalHeight':170,'referenceSourceHeight':ref,'scale':170/ref,'cellSize':CELL,'alpha':True,'weaponPolicy':'weapons baked in listed frames; no detached overlay necessary; runtime effects from sockets','socketSpace':'cell pixels; world=(socket-[ax,ay])*scale','frontMarking':'yellow PCBI chest','rearMarking':'yellow PCBI back','shippingBytes':path.stat().st_size};qa[name]={'frames':len(frames),'sourceSize':im.size,'sourceAlpha':im.mode,'referenceSourceHeight':ref,'shippingBytes':path.stat().st_size,'crops':checks}
 preview=Image.new('RGB',atlas.size,'#31424d');preview.paste(atlas,mask=atlas.getchannel('A'));d=ImageDraw.Draw(preview)
 for i in range(48):d.text((i%8*CELL+4,i//8*CELL+4),str(i),fill='white')
 preview.save(REPORT/f'{name}-compiled.jpg',quality=90)
Path('dist/pcbi316-data.js').write_text('globalThis.PCBI316Data='+json.dumps(data,separators=(',',':'))+';\n');(REPORT/'crop-checks.json').write_text(json.dumps(qa,indent=2));(SRC/'metadata.json').write_text(json.dumps(data,indent=2));print(json.dumps({n:{k:v for k,v in q.items() if k!='crops'}for n,q in qa.items()},indent=2));print('TOTAL',sum(q['shippingBytes']for q in qa.values()))
