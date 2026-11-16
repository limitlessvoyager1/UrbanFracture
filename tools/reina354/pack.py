from pathlib import Path
from PIL import Image
import json,math,numpy as np
R=Path(__file__).resolve().parents[2];src=R/'source-art/reina354';out=R/'dist/assets/reina354';out.mkdir(exist_ok=True)
rows=json.loads((R/'reports354/sources.json').read_text());sheets=[];dims=[]
for n in range(13):
 p=src/f'redraw-{n}.png'
 if not p.exists():continue
 im=Image.open(p).convert('RGBA');a=np.array(im);a[a[:,:,3]<12]=0;im=Image.fromarray(a);
 target=out/f'poses-{n}.webp'
 if not target.exists() or target.stat().st_mtime<p.stat().st_mtime:im.save(target,quality=90,method=4)
 sheets.append(f'assets/reina354/poses-{n}.webp');dims.append(im.size)
frames={}
for q in rows:
 n=q['group']
 if n>=len(dims):continue
 W,H=dims[n];cw,ch=W/4,H/8;ratio=min(450/q['w'],450/q['h']);w=q['w']*ratio/512*cw;h=q['h']*ratio/512*ch
 rect=[q['cell']%4*cw+(cw-w)/2,q['cell']//4*ch+(ch-h)/2,w,h]
 frames[q['id']]={'sheet':n,'rect':rect}
# Dedicated high-detail weapon poses preserve the native grip coordinates.
p=src/'weapons.png'
if p.exists():
 im=Image.open(p).convert('RGBA');a=np.array(im);a[a[:,:,3]<12]=0;im=Image.fromarray(a);target=out/'weapons.webp'
 if not target.exists() or target.stat().st_mtime<p.stat().st_mtime:im.save(target,quality=90,method=4)
 sheet=len(sheets);sheets.append('assets/reina354/weapons.webp');cw,ch=im.width/4,im.height/4
 for i,q in enumerate(json.loads((R/'reports354/weapon-sockets.json').read_text())):
  old=next(x for x in rows if x['id']==q['id']);ratio=min(450/old['w'],450/old['h']);w=old['w']*ratio/512*cw;h=old['h']*ratio/512*ch
  frames[q['id']]={'sheet':sheet,'rect':[i%4*cw+(cw-w)/2,i//4*ch+(ch-h)/2,w,h]}
dive=None
p=src/'dive.png'
if p.exists():
 im=Image.open(p).convert('RGBA');a=np.array(im);a[a[:,:,3]<12]=0;im=Image.fromarray(a);target=out/'dive.webp'
 if not target.exists() or target.stat().st_mtime<p.stat().st_mtime:im.save(target,quality=90,method=4)
 sheet=len(sheets);sheets.append('assets/reina354/dive.webp');D=json.loads((R/'reports354/audit-data.json').read_text())['ReinaDive313Data'];old=Image.open(R/'dist'/D['src']);rx,ry=im.width/old.width,im.height/old.height
 dive={'sheet':sheet,'scale':D['scale'],'frames':[{'rect':[q['rect'][0]*rx,q['rect'][1]*ry,q['rect'][2]*rx,q['rect'][3]*ry],'ax':q['ax'],'ay':q['ay'],'w':q['rect'][2],'h':q['rect'][3],'oldBounds':[q['bounds'][0],q['bounds'][1],q['bounds'][2]-1,q['bounds'][3]-1]} for q in D['frames']]}
# Explicit rare/interruption pose paths; preserve their original source anchors.
extra_path=R/'reports354/extra-frames.json'
if extra_path.exists():
 extras=json.loads(extra_path.read_text())
 for n in range(2):
  p=src/f'extra-{n}.png'
  if not p.exists():continue
  im=Image.open(p).convert('RGBA');a=np.array(im);a[a[:,:,3]<12]=0;im=Image.fromarray(a);target=out/f'extra-{n}.webp'
  if not target.exists() or target.stat().st_mtime<p.stat().st_mtime:im.save(target,quality=90,method=4)
  sheet=len(sheets);sheets.append(f'assets/reina354/extra-{n}.webp');cw,ch=im.width/4,im.height/8
  for q in extras:
   if q['sheet']!=n:continue
   orig=Image.open(R/'dist'/q['source']).convert('RGBA');x0,y0,W,H=q['rect'];original=np.array(orig.crop((round(x0),round(y0),round(x0+W),round(y0+H))))[:,:,3];ys,xs=np.nonzero(original>96);oldbounds=[int(xs.min()),int(ys.min()),int(xs.max()),int(ys.max())];ratio=min(450/W,450/H);w=W*ratio/512*cw;h=H*ratio/512*ch;i=q['cell'];frames[q['id']]={'sheet':sheet,'rect':[i%4*cw+(cw-w)/2,i//4*ch+(ch-h)/2,w,h],'w':W,'h':H,'ax':q['ax'],'ay':q['ay'],'scale':q['scale'],'oldBounds':oldbounds}
# Portrait crops the same new idle sprite; no costume/identity mismatch with the fighter.
d=frames['native-base/0'];x,y,w,h=d['rect'];portrait={'sheet':0,'rect':[x+w*.36,y+h*.02,w*.29,h*.29]}
(R/'dist/reina354-data.js').write_text('globalThis.Reina354Data='+json.dumps({'count':len(frames),'boundCount':397+sum(k.startswith('repair/') for k in frames),'sheets':sheets,'frames':frames,'portrait':portrait,'dive':dive},separators=(',',':'))+';\n')
print('Packed',len(frames),'of',len(rows),'poses;',sum(p.stat().st_size for p in out.glob('*.webp')),'bytes')
