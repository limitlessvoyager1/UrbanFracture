from PIL import Image
import json,hashlib
from pathlib import Path
src=Image.open('source-art/home339/sitting-master.png').convert('RGBA');orion=Image.open('source-art/home339/orion-sitting-master.png').convert('RGBA')
names=['reina','broxton','niko','nightshade','nova','forest','orion'];bands=[0,235,471,707,944,1176,1408];heights=[199,229,217,210,221,223,211];sprites=[];heroes={}
for i,key in enumerate(names):
 im=orion if i==6 else src;top,bottom=(0,im.height) if i==6 else(bands[i],bands[i+1]);frames=[];body=[]
 for col in range(4):
  cell=im.crop((round(col*im.width/4),top,round((col+1)*im.width/4),bottom));a=cell.getchannel('A');box=a.point(lambda v:255 if v>=128 else 0).getbbox();assert box,key
  x0,y0,x1,y1=box;assert y0>0 and y1<cell.height,(key,col,'clipped vertically')
  cropbox=(max(0,x0-4),max(0,y0-4),min(cell.width,x1+4),min(cell.height,y1+4));sprite=cell.crop(cropbox);foot=a.crop((0,y1-8,cell.width,y1)).point(lambda v:255 if v>=128 else 0).getbbox();assert foot
  frame={'sourceFile':'source-art/home339/orion-sitting-master.png' if i==6 else 'source-art/home339/sitting-master.png','sourceRect':[round(col*im.width/4)+cropbox[0],top+cropbox[1],cropbox[2]-cropbox[0],cropbox[3]-cropbox[1]],'anchor':[(foot[0]+foot[2])/2-cropbox[0],y1-cropbox[1]],'sourceBodyHeight':y1-y0};body.append(y1-y0);frames.append(frame);sprites.append((sprite,frame))
 native=1.3362225912 if key=='reina' else 1.5384141675 if key=='broxton' else 1.46515635
 heroes[key]={'scale':heights[i]/body[0],'nativeScale':native,'frames':frames}
x=y=8;row=0;atlas=Image.new('RGBA',(1400,2500))
for im,f in sprites:
 if x+im.width+8>1400:x=8;y+=row+8;row=0
 atlas.paste(im,(x,y));f['rect']=[x,y,im.width,im.height];x+=im.width+8;row=max(row,im.height)
atlas=atlas.crop((0,0,1400,y+row+8));out='dist/assets/home339/sitting.webp';atlas.save(out,lossless=True,method=6,exact=True);decoded=Image.open(out).convert('RGBA');assert decoded.tobytes()==atlas.tobytes()
shipping=json.loads(json.dumps(heroes))
for h in shipping.values():
 for f in h['frames']:del f['sourceFile'];del f['sourceRect']
Path('dist/home339-data.js').write_text('globalThis.Home339Data='+json.dumps({'src':'assets/home339/sitting.webp','heroes':shipping},separators=(',',':'))+';\n')
report={'atlas':atlas.size,'bytes':Path(out).stat().st_size,'exactRGBA':True,'sources':{str(p):hashlib.sha256(p.read_bytes()).hexdigest() for p in Path('source-art/home339').glob('*.png')},'heroes':heroes,'policy':'Only crop/pack/encode. No alpha or anatomy alteration. Constant source scale per hero for four authored poses; reverse poses for standing.'};Path('reports339/art-import.json').write_text(json.dumps(report,indent=2));print(out,atlas.size,Path(out).stat().st_size)
