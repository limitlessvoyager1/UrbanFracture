from PIL import Image
from pathlib import Path
import json,hashlib
root=Path(__file__).resolve().parents[2]
im=Image.open(Path(__file__).parent/'items-original.png').convert('RGBA')
keys=['oneUp','fullHeal','healthPack','pizza','energyBattery','energyCanister','money','phone','jewelry','diamonds']
widths=[28,42,28,32,28,38,30,24,30,32]
regions=[(0,0,345,440),(345,0,735,440),(735,0,1060,440),(1060,0,1420,440),(1420,0,1774,440),(0,440,345,887),(345,440,735,887),(735,440,1060,887),(1060,440,1420,887),(1420,440,1774,887)]
atlas=Image.new('RGBA',(320,144));frames={};crops={}
for i,(key,reg,world) in enumerate(zip(keys,regions,widths)):
 part=im.crop(reg);bbox=part.getchannel('A').point(lambda a:255 if a>32 else 0).getbbox();assert bbox and bbox[0]>0 and bbox[1]>0 and bbox[2]<part.width and bbox[3]<part.height,(key,bbox)
 crop=part.crop((max(0,bbox[0]-2),max(0,bbox[1]-2),min(part.width,bbox[2]+2),min(part.height,bbox[3]+2)))
 source=[reg[0]+bbox[0],reg[1]+bbox[1],bbox[2]-bbox[0],bbox[3]-bbox[1]]
 crop.thumbnail((56,56),Image.Resampling.LANCZOS);x=(i%5)*64+(64-crop.width)//2;y=(i//5)*72+66-crop.height;atlas.alpha_composite(crop,(x,y))
 # Tight sprite rect with sole anchor, excluding opaque-neighbor content.
 opaque=crop.getchannel('A').point(lambda a:255 if a>32 else 0).getbbox();assert opaque
 frames[key]={'rect':[x,y,crop.width,crop.height],'ax':(opaque[0]+opaque[2])/2,'ay':opaque[3],'width':world}
 crops[key]={'sourceBounds':source,'packedSize':list(crop.size)}
folder=root/'dist/assets/items319';folder.mkdir(exist_ok=True,parents=True)
# Pick best supported quality under the strict19KB total item-art budget.
metadata={'src':'assets/items319/pickups.webp','width':320,'height':144,'frames':frames}
js='globalThis.Item319Art='+json.dumps(metadata,separators=(',',':'))+';\n'
(root/'dist/item319-data.js').write_text(js)
for quality in [85,80,75,70,65,60]:
 atlas.save(folder/'pickups.webp','WEBP',quality=quality,method=6,exact=True)
 if (folder/'pickups.webp').stat().st_size+len(js.encode())<=18500:break
n=(folder/'pickups.webp').stat().st_size+len(js.encode());assert n<=19000,n
atlas.save(Path(__file__).parent/'packed-review.png')
metrics={'atlasSize':[320,144],'atlasBytes':(folder/'pickups.webp').stat().st_size,'metadataBytes':len(js.encode()),'totalShippingBytes':n,'quality':quality,'source':list(im.size),'frames':crops,'atlasSHA256':hashlib.sha256((folder/'pickups.webp').read_bytes()).hexdigest()}
(Path(__file__).parent/'metrics.json').write_text(json.dumps(metrics,indent=2))
print(json.dumps({k:metrics[k] for k in ['atlasSize','atlasBytes','metadataBytes','totalShippingBytes','quality']}))
