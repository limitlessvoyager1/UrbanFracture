from pathlib import Path
from PIL import Image
import json,sys
r=Path(__file__).resolve().parents[1]
hands={
'niko':[(294,72),(782,202),(1215,287),(1597,180),(268,468),(724,626),(1197,708),(1600,625)],
'orion':[(174,45),(680,139),(1135,228),(1505,253),(187,463),(609,512),(1251,600),(1494,705)],
'orionLeft':[(279,42),(623,150),(963,259),(1570,221),(255,469),(568,570),(918,635),(1575,703)],
'reina':[(215,164),(700,160),(1273,145),(1544,169),(181,558),(688,652),(1213,666),(1543,570)],
'broxton':[(220,181),(687,182),(1237,157),(1540,183),(149,522),(573,612),(1270,598),(1468,528)],
'nova':[(174,89),(620,52),(1260,308),(1508,195),(143,459),(620,486),(1283,728),(1662,724)]}
second={'broxton':{4:(132,536),5:(551,597),6:(1253,607),7:(1482,541)}}
selected=set(sys.argv[1:]);existing=r/'dist/weapon-motion249.js';D=json.loads(existing.read_text().split('WeaponMotionArt249=',1)[1].rstrip(';\n')) if selected and existing.exists() else {}
for hero,H in hands.items():
 if selected and hero not in selected:continue
 im=Image.open(r/'art-source249'/f'{hero}-motion.png').convert('RGBA');w,h=im.size;cells=[]
 for n in range(8):
  x0=round(n%4*w/4);y0=round(n//4*h/2);cell=im.crop((x0,y0,round((n%4+1)*w/4),round((n//4+1)*h/2)));box=cell.getchannel('A').point(lambda a:255 if a>=64 else 0).getbbox();cells.append((cell,box,x0,y0))
 # Fixed scale for the atlas. No runtime sprite resizing between attack frames.
 height=cells[0][1][3]-cells[0][1][1];scale={'reina':148,'broxton':152,'nova':150,'niko':150,'orion':150,'orionLeft':150}[hero]/height
 D[hero]=[]
 for n,(cell,b,x0,y0) in enumerate(cells):
  crop=cell.crop(b);crop=crop.resize((round(crop.width*scale),round(crop.height*scale)),Image.Resampling.NEAREST);crop.putalpha(crop.getchannel('A').point(lambda a:255 if a>=128 else 0));p=r/'dist/assets/combat249'/f'{hero}-{n}.webp';p.parent.mkdir(exist_ok=True);crop.save(p,'WEBP',lossless=True,quality=100,method=6,exact=True)
  # Hips remain rooted at cell center, feet at local ground0.
  ax=(w/8-b[0])*scale;ay=crop.height
  def point(P):return[(P[0]-x0-b[0])*scale-ax,(P[1]-y0-b[1])*scale-ay]
  q={'src':str(p.relative_to(r/'dist'))+'?v=249','w':crop.width,'h':crop.height,'ax':ax,'ay':ay,'scale':1,'hand':point(H[n])}
  if hero in second and n in second[hero]:q['secondHand']=point(second[hero][n])
  D[hero].append(q)
(r/'dist/weapon-motion249.js').write_text("(typeof window!=='undefined'?window:globalThis).WeaponMotionArt249="+json.dumps(D,separators=(',',':'))+';\n')
(r/'reports249/art-import.json').write_text(json.dumps(D,indent=2))
print('Imported',sum(map(len,D.values())),'poses',sum(p.stat().st_size for p in (r/'dist/assets/combat249').glob('*')),'bytes')

# Replaced attack sprites are retained in source atlases/history, not duplicated in the hosted bundle.
p=r/'dist/weapon-art248.js';base=json.loads(p.read_text().split('=',1)[1].rstrip(';\n'));migration=[]
for hero in D:
 for old,new in [(2,0),(3,2),(5,4),(6,6)]:
  oldpath=r/'dist/assets/combat248'/f'{hero}-weapon-{old}.webp'
  migration.append({'old':str(oldpath.relative_to(r)),'replacement':D[hero][new]['src'].split('?')[0],'reason':'Superseded single attack pose replaced by the proficiency animation; source atlas retained.'})
  if oldpath.exists():oldpath.unlink()
  base[hero][old]=D[hero][new]
p.write_text('window.WeaponArt248='+json.dumps(base,separators=(',',':'))+';\n')
(r/'reports249/asset-migration.json').write_text(json.dumps(migration,indent=2)+'\n')
inv=r/'qa/system242/asset-inventory.json';data=json.loads(inv.read_text());gone={m['old'] for m in migration};data['assets']=[q for q in data['assets'] if q['path'] not in gone];inv.write_text(json.dumps(data,indent=2)+'\n')
