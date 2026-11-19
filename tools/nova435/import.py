"""Pack eight native alpha cells without resampling; shared scale and sole anchor."""
from pathlib import Path
from PIL import Image
import json, hashlib
root=Path(__file__).resolve().parents[2]
src=root/'source-art/nova435/taunt-master.png'
im=Image.open(src).convert('RGBA'); w,h=im.size
frames=[]
for i in range(8):
    x0=round((i%4)*w/4); x1=round((i%4+1)*w/4)
    y0=round((i//4)*h/2); y1=round((i//4+1)*h/2)
    cell=im.crop((x0,y0,x1,y1)); alpha=cell.getchannel('A')
    box=alpha.point(lambda a:255 if a>128 else 0).getbbox()
    if not box: raise ValueError('Empty taunt frame')
    # Authored planted soles; no per-frame body-height normalization.
    sole=box[3]; feet=alpha.crop((0,max(0,sole-12),cell.width,sole)).point(lambda a:255 if a>128 else 0).getbbox()
    anchor=(feet[0]+feet[2])/2 if feet else (box[0]+box[2])/2
    frames.append({'rect':[x0,y0,x1-x0,y1-y0],'anchor':[anchor,sole],'opaque':list(box)})
dest=root/'dist/assets/nova435/taunt.webp';dest.parent.mkdir(parents=True,exist_ok=True)
im.save(dest,'WEBP',lossless=True,method=6)
# Existing Nova333 gait97 measures 142.128 logical units before the caller's world scale.
heights=[f['opaque'][3]-f['opaque'][1] for f in frames];scale=142.128/(sum(heights)/len(heights))
data={'src':'assets/nova435/taunt.webp','scale':scale,'frames':frames,'sourceSha256':hashlib.sha256(src.read_bytes()).hexdigest(),'size':[w,h]}
(root/'dist/showstopper435-data.js').write_text('globalThis.Nova435Data='+json.dumps(data,separators=(',',':'))+';\n')
(root/'source-art/nova435/import.json').write_text(json.dumps(data,indent=2))
print(json.dumps({'frames':8,'heights':heights,'sharedScale':scale,'nativeSize':[w,h]}))
