"""Bind retained side-facing whole-body poses; never mirror or redraw anatomy."""
from pathlib import Path
from PIL import Image,ImageDraw
import json,statistics,hashlib
from motion_import import load_layout
R=Path(__file__).resolve().parents[2]
image,layout=load_layout(R)
indices=list(range(8))+list(range(24,32))
# Reviewed visible near-hand points in each explicit source crop (not uniform cells).
hands=[[66,97],[57,98],[48,99],[92,61],[110,75],[65,95],[47,98],[47,92],
       [44,85],[14,83],[8,88],[30,85],[15,85],[13,92],[30,98],[30,98]]
source=[]
for index in indices:
 f=layout['frames'][index];cell=image.crop(f['sourceRect']);bounds=cell.getchannel('A').point(lambda v:255 if v>100 else 0).getbbox();source.append((f,cell,bounds))
factor=190/statistics.median(b[3]-b[1] for _,_,b in source)
atlas=Image.new('RGBA',(1280,1280));proof=Image.new('RGB',atlas.size,'#243442');pen=ImageDraw.Draw(proof);frames=[];rows=[]
for n,((f,cell,b),hand) in enumerate(zip(source,hands)):
 rect=f['sourceRect'];root=f['rootX']-rect[0];floor=f['floorY']-rect[1];pose=cell.crop(b);w=round(pose.width*factor);h=round(pose.height*factor);x=round(160-(root-b[0])*factor);y=round(280-(floor-b[1])*factor)
 assert x>=0 and y>=0 and x+w<=320 and y+h<=320,(n,x,y,w,h)
 tile=Image.new('RGBA',(320,320));tile.alpha_composite(pose.resize((w,h),Image.Resampling.LANCZOS),(x,y));atlas.alpha_composite(tile,((n%4)*320,(n//4)*320));proof.paste(tile,((n%4)*320,(n//4)*320),tile);pen.text(((n%4)*320+6,(n//4)*320+6),str(n),fill='white')
 grip=[round((hand[0]-root)*factor*128/190,4),round((hand[1]-floor)*factor*128/190,4)]
 frames.append({'rect':[(n%4)*320,(n//4)*320,320,320],'ax':160,'ay':280,'hand':grip})
 rows.append({'frame':n,'sourceFrame':f['index'],'sourceRect':rect,'sourceRoot':f['rootX'],'floorY':f['floorY'],'fixedScale':factor,'sourceHandInCrop':hand,'hand':grip,'bodyHeight':h*128/190})
output=R/'dist/assets/orion385';output.mkdir(exist_ok=True,parents=True);atlas.save(output/'walk.webp',quality=79,method=6)
dataFile=R/'dist/orion384-data.js';data=json.loads(dataFile.read_text(encoding='utf-8').split('=',1)[1].strip().removesuffix(';'));data['families']['walk']={'src':'assets/orion385/walk.webp','frames':frames};dataFile.write_bytes(('globalThis.Orion384Data='+json.dumps(data,separators=(',',':'))+';\n').encode('utf-8'))
reports=R/'reports385';reports.mkdir(exist_ok=True,parents=True);proof.save(reports/'walk-atlas.png')
(reports/'walk-import.json').write_bytes((json.dumps({'schema':1,'source':layout['source'],'sourceSha256':layout['sourceSha256'],'fixedFamilyScale':factor,'logicalStandingHeight':128,'independentFacings':True,'generatedArtwork':False,'rows':rows},indent=2)+'\n').encode('utf-8'))
print('Imported16 retained side-facing whole-body walk poses; fixed scale',factor)
