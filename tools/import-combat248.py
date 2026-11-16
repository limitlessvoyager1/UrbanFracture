from PIL import Image
from pathlib import Path
import json
root=Path(__file__).resolve().parents[1]
files={'reina':'074c869c-c42f-4dc9-80ae-ced0fdda3399','broxton':'b971e6ad-a7f0-4597-89b8-4e81ffd04c4f','nova':'9420f3f1-4608-4d02-83ec-2f552d922e04','niko':'925493c4-2189-436b-8e3d-07f383398679','orion':'a35e14b5-08ba-4bbf-afa7-180b132dbe21','orionLeft':'5340e7da-9cf1-4daa-baf4-9e90e66ffa8d'}
D={}
hands={'reina':[(270,390),(645,172),(1005,154),(1690,155),(190,665),(607,550),(1207,613),(1700,590)],'broxton':[(350,392),(640,165),(984,202),(1670,155),(160,663),(558,515),(1183,615),(1700,580)],'nova':[(345,405),(650,155),(948,210),(1679,150),(180,662),(595,525),(1183,592),(1690,610)],'niko':[(220,390),(650,165),(965,195),(1670,146),(153,681),(560,520),(1165,603),(1700,582)],'orion':[(240,370),(625,140),(960,140),(1670,140),(150,660),(550,510),(1160,610),(1660,565)]}

hands['orionLeft']=[(225,370),(610,140),(1115,145),(1345,140),(255,660),(670,500),(880,600),(1350,560)]
for hero,code in files.items():
 im=Image.open(root/'art-source248'/f'{hero}-grips.png').convert('RGBA');w,h=im.size
 assert im.getchannel('A').getextrema()[0]<8
 boxes=[]
 for n in range(8):
  x0=round((n%4)*w/4);y0=round((n//4)*h/2);x1=round((n%4+1)*w/4);y1=round((n//4+1)*h/2)
  cell=im.crop((x0,y0,x1,y1));box=cell.getchannel('A').point(lambda x:255 if x>=64 else 0).getbbox();boxes.append((cell,box))
 # One scale per hero, using standing knife-ready pose. No dynamic rescaling.
 height=boxes[1][1][3]-boxes[1][1][1];scale={'reina':148,'broxton':152,'nova':150,'niko':150,'orion':150,'orionLeft':150}[hero]/height
 D[hero]=[]
 for n,(cell,b) in enumerate(boxes):
  crop=cell.crop(b);crop=crop.resize((round(crop.width*scale),round(crop.height*scale)),Image.Resampling.NEAREST);p=root/'dist/assets/combat248'/f'{hero}-weapon-{n}.webp';p.parent.mkdir(exist_ok=True);crop.putalpha(crop.getchannel('A').point(lambda a:255 if a>=128 else 0));crop.save(p,'WEBP',lossless=True,quality=100,method=6,exact=True)
  # Align hips over support foot; fixed cell center defines horizontal root.
  D[hero].append({'src':str(p.relative_to(root/'dist'))+'?v=248-final','w':crop.width,'h':crop.height,'ax':(cell.width/2-b[0])*scale,'ay':crop.height,'scale':1,'hand':[(hands[hero][n][0]-(n%4+.5)*w/4)*scale,(hands[hero][n][1]-(n//4)*h/2-b[3])*scale]})
(root/'dist/weapon-art248.js').write_text('window.WeaponArt248='+json.dumps(D,separators=(',',':'))+';\n')
(root/'reports248/art-import.json').write_text(json.dumps(D,indent=2))
print('Imported',sum(map(len,D.values())),'frames;',sum(p.stat().st_size for p in (root/'dist/assets/combat248').glob('*')),'bytes')
