"""Lossless atlas import: authored crops/anchors, one scale, no pixel retouch/resampling."""
from pathlib import Path
from PIL import Image
import hashlib,json
root=Path(__file__).resolve().parents[2]
source=root/'source-art/nova437/kip-up-master.png'
im=Image.open(source).convert('RGBA')
assert im.size==(1448,1086)
rows=[(0,340),(340,680),(680,1086)]
phases=['prone','legs-drawn','legs-up','compress','leg-swing','spring-airborne','feet-under-airborne','sole-contact','landing-balance','rise','guard-balance','stance']
frames=[]
for i in range(12):
    x=(i%4)*362;y,b=rows[i//4];cell=im.crop((x,y,x+362,b));box=cell.getchannel('A').point(lambda a:255 if a>128 else 0).getbbox()
    assert box and box[0]>=4 and box[1]>=4 and box[2]<=358 and box[3]<=cell.height-4,(i,box)
    # Contact frames use the observed sole/palm/prone support line. These two
    # airborne poses retain a separate floor line, never bbox-bottom pinning.
    ground=317 if i==5 else 330 if i==6 else box[3]
    frames.append({'rect':[x,y,362,b-y],'anchor':[181,ground],'opaque':list(box),'phase':phases[i]})
scale=142.128/(frames[-1]['opaque'][3]-frames[-1]['opaque'][1])
dest=root/'dist/assets/nova437/kip-up.webp';im.save(dest,'WEBP',lossless=True,method=6)
data={'src':'assets/nova437/kip-up.webp','size':list(im.size),'scale':scale,'frames':frames,'sourceSha256':hashlib.sha256(source.read_bytes()).hexdigest()}
(root/'dist/showstopper437-data.js').write_text('globalThis.Nova437Data='+json.dumps(data,separators=(',',':'))+';\n')
(root/'source-art/nova437/import.json').write_text(json.dumps(data,indent=2)+'\n')
print(json.dumps({'frames':12,'scale':scale,'boxes':[f['opaque'] for f in frames],'ground':[f['anchor'][1] for f in frames]}))
