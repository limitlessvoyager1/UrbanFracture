import json,hashlib,subprocess
from pathlib import Path
from PIL import Image
im=Image.open('source-archive/build296/bruno-reactions-source.png').convert('RGBA')
# Atlas import only: isolate generated-alpha bodies, keep a fixed source/anatomical scale.
px=im.load();frames=[];cells=[]
for i in range(24):
 x,y=i%6*256,i//6*256;c=im.crop((x,y,x+256,y+256));a=c.getchannel('A');mask=a.point(lambda v:255 if v>=96 else 0);box=mask.getbbox()
 if not box:raise ValueError(i)
 # Reject detached subpixel alpha around otherwise complete body; no per-pose resizing.
 c.putalpha(mask);cells.append(c);frames.append({'rect':[x,y,256,256],'ax':128,'ay':box[3],'bounds':list(box)})
scale=137/(frames[0]['bounds'][3]-frames[0]['bounds'][1]);out=Image.new('RGBA',im.size)
for i,c in enumerate(cells):out.paste(c,(i%6*256,i//6*256))
p=Path('dist/assets/sprites/bruno-reactions296.webp');out.save(p,quality=94,method=6)
D={'src':'assets/sprites/bruno-reactions296.webp','scale':scale,'frames':frames}
Path('dist/bruno296-data.js').write_text('globalThis.Bruno296Data='+json.dumps(D,separators=(',',':'))+';\n')
Path('reports296/art-import.json').write_text(json.dumps({'sourceSha256':hashlib.sha256(im.tobytes()).hexdigest(),'scale':scale,'frames':frames,'bytes':p.stat().st_size,'policy':'One fixed scale; source aspect and all limb dimensions retained. Alpha threshold96 from generated transparency, no anatomy changes.'},indent=2))
# Retire the old fallback gait; every live gait now uses the existing unchanged130 asset.
p=Path('dist/walk-data.js');s=subprocess.check_output(['git','show','a33670a76f4b5b1a0f42a34f63b54b9ee863e459:dist/walk-data.js']).decode();D=json.loads(s[s.index('=')+1:].rstrip(';\n'));old=D['enforcer'];r=Path('dist/reactions130-data.js').read_text();br=json.loads(r.split('window.NeonBruno130Data=')[1].split(';')[0]);new={'src':br['src'],'scale':br['scale'],'width':1792,'height':896,'frames':[]}
for fr,prior in zip(br['frames'],old['frames']):
 q=dict(fr);local=[(prior['hand'][j]-prior['anchor'][j])*old['scale'] for j in range(2)];q['hand']=[q['anchor'][j]+local[j]/new['scale'] for j in range(2)];new['frames'].append(q)
D['enforcer']=new;p.write_text('window.NeonWalkData='+json.dumps(D,separators=(',',':'))+';\n')
oldpath=Path('dist/assets/sprites/enforcer-walk-v1.webp');original=Path('source-archive/build296/assets/sprites/enforcer-walk-v1.webp').read_bytes();Path('reports296/asset-migration.json').write_text(json.dumps({'retired':str(oldpath),'archived':'source-archive/build296/assets/sprites/enforcer-walk-v1.webp','sha256':hashlib.sha256(original).hexdigest(),'replacementFallbackSource':br['src'],'reason':'Unify legacy fallback with the already-active native eight-frame Bruno130 gait; preserve all source art in archive and checkpoint.','newReactionAsset':'dist/assets/sprites/bruno-reactions296.webp'},indent=2));oldpath.unlink(missing_ok=True)
