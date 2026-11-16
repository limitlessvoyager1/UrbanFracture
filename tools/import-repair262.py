# Import/crop generated sprites. One uniform density factor per source; no per-pose resizing.
from pathlib import Path
from PIL import Image
from scipy import ndimage
import numpy as np,json,shutil,hashlib
R=Path(__file__).resolve().parents[1];out=R/'dist/assets/repair262';archive=R/'art-source262/originals';archive.mkdir(exist_ok=True)
proof=[]
def cells(src,cols,rows,density=1,rectangles=None):
 im=Image.open(R/'art-source262'/src).convert('RGBA')
 if density!=1:im=im.resize((round(im.width*density),round(im.height*density)),Image.Resampling.LANCZOS)
 W,H=im.size;ret=[]
 for n in range(cols*rows):
  rect=[round(n%cols*W/cols),round(n//cols*H/rows),round((n%cols+1)*W/cols),round((n//cols+1)*H/rows)] if rectangles is None else [round(v*density) for v in rectangles[n]];a=np.array(im.crop(rect));lab,_=ndimage.label(a[:,:,3]>=128,np.ones((3,3)));counts=np.bincount(lab.ravel());counts[0]=0;keep=lab==counts.argmax();keep=ndimage.binary_dilation(keep,iterations=1)&(a[:,:,3]>0);a[~keep]=0;ys,xs=np.where(keep);box=[int(xs.min()),int(ys.min()),int(xs.max()+1),int(ys.max()+1)];ret.append((Image.fromarray(a).crop(box),rect,box))
 return ret
def save(im,name,**meta):
 p=out/name;im.save(p,'WEBP',quality=84,method=6);q={'src':'assets/repair262/'+name+'?v=262','w':im.width,'h':im.height,**meta};proof.append({**q,'bytes':p.stat().st_size,'sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'review':'required'});return q
def archive_old(path):
 p=R/'dist'/path
 if p.exists():shutil.copy2(p,archive/p.name);p.unlink()
# Four genuinely different stride stages replace the old near-identical red pair.
red=cells('red-run.png',4,2,.74);runs=[]
ref=max(c[0].height for c in red[:4])
for n,(im,rect,box) in enumerate(red[:4]):
 runs.append(save(im,f'red-{n}.webp',variant=3,phase=n,referenceHeight262=ref,ax262=round(260*.74)-box[0],ay262=round(420*.74)-box[1]))
# Only the defective vault/pull poses are superseded; all other258 artwork remains.
vault=cells('vault.png',3,1,.47);ref=vault[0][0].height
text=(R/'dist/nightshade-grab-art258.js').read_text();data=json.loads(text.split('grabs258=')[1].split(';})')[0])
for n in [1,2]:
 im,rect,box=vault[n];idx=7+n;ax=im.width*(.5 if n==1 else .40);ay=im.height
 q=save(im,f'vault-{idx}.webp',ax=ax,ay=ay,scale=123/ref,kind='grabs258',index=idx,atlas='vault262',grip=[im.width*(.10 if n==1 else .72),im.height*(.91 if n==1 else .32)])
 data[idx]=q;archive_old(f'assets/nightshade258/grab-{idx}.webp')
(R/'dist/nightshade-grab-art258.js').write_text('(function(r){r.NightshadeMeleeArt257.grabs258='+json.dumps(data,separators=(',',':'))+';})(typeof window!=="undefined"?window:globalThis);\n')
# Optional second source after verified transparent extraction.
if (R/'art-source262/head-repair.png').exists():
 head=cells('head-repair.png',4,2,.74)
 for row,variant,name in [(0,4,'green'),(1,5,'purple')]:
  ref=max(c[0].height for c in head[row*4:row*4+4])
  for n,(im,rect,box) in enumerate(head[row*4:row*4+4]):runs.append(save(im,f'{name}-{n}.webp',variant=variant,phase=n,referenceHeight262=ref,ax262=round(238*.74)-box[0],ay262=im.height))
text=(R/'dist/estates196-data.js').read_text();d=json.loads(text.split('=',1)[1].rstrip().rstrip(';'));d['run262']=runs
for variant in sorted(set(q['variant'] for q in runs)):
 qs=[q for q in runs if q['variant']==variant]
 for i in [0,1]:
  archive_old(f'assets/estates-citizens196-{variant*2+i}.webp');d['citizens'][variant*2+i]=qs[i]
# Complete heads in every stationary fear pose; one canonical standing scale.
fear=cells('fearful.png',4,1,.47);ref=fear[0][0].height
for n,(im,rect,box) in enumerate(fear):
 q=save(im,f'fear-{n}.webp',referenceHeight262=ref,ax262=im.width*.5,ay262=im.height)
 archive_old(f'assets/estates-citizens196-{12+n}.webp');d['citizens'][12+n]=q
(R/'dist/estates196-data.js').write_text('window.Estates196Data='+json.dumps(d,separators=(',',':'))+';\n')
# Explicit belt draw and contact sprites supersede only the old taser pose.
taser=cells('taser.png',3,1,.47);ref=taser[0][0].height
p=R/'dist/nightshade-melee-art257.js';d=json.loads(p.read_text().split('=',1)[1].split(';})')[0])
for n,idx in [(1,8),(2,5)]:
 im,rect,box=taser[n];q=save(im,f'taser-{idx}.webp',ax=im.width*.45,ay=im.height,scale=123/ref,kind='grab',index=idx,atlas='taser262',grip=[im.width-4,im.height*.25],hand=[im.width*.80,im.height*.38])
 if idx<len(d['grab']):d['grab'][idx]=q
 else:d['grab'].append(q)
archive_old('assets/nightshade257/grab-5.webp')
p.write_text('(function(r){r.NightshadeMeleeArt257='+json.dumps(d,separators=(',',':'))+';})(typeof window!=="undefined"?window:globalThis);\n')
# Fixed-scale complete knife-throw bodies, matching original137.2 logical Kevin height.
kevin=cells('kevin-throw.png',4,1,.56,[[0,0,515,724],[515,0,1045,724],[1045,0,1640,724],[1640,0,2172,724]]);ref=kevin[0][0].height;rows=[]
for n,(im,rect,box) in enumerate(kevin):
 q=save(im,f'kevin-{n}.webp',ax=im.width*(.44 if n==2 else .48),ay=im.height,scale=137.2/ref,index=n);rows.append(q)
rows[2]['hand']=[rows[2]['w']-3,rows[2]['h']*.12]
prone=cells('prone.png',4,3);types=['thug','knifeThug','biker','enforcer','cop','security','sato','akari','flint','bouncer','boss','gangster'];ref=prone[0][0].width;ground={}
for n,(im,rect,box) in enumerate(prone):ground[types[n]]=save(im,f'prone-{n}.webp',ax=im.width*.92,ay=im.height,scale=137.2/ref,type=types[n],head=[im.width*.92,im.height*.55])
(R/'dist/repair262-data.js').write_text('globalThis.Repair262Data='+json.dumps({'kevin':rows,'prone':ground},separators=(',',':'))+';\n')
# Hull is measured from source alpha, used only for grounded roll support geometry.
p=R/'dist/nightshade-grab-art258.js';d=json.loads(p.read_text().split('grabs258=')[1].split(';})')[0]);from scipy.spatial import ConvexHull
for n in [10]:
 im=Image.open(R/'dist'/d[n]['src'].split('?')[0]).convert('RGBA');ys,xs=np.where(np.array(im)[:,:,3]>=128);pts=np.column_stack((xs,ys));hull=ConvexHull(pts);d[n]['hull262']=pts[hull.vertices].tolist()
p.write_text('(function(r){r.NightshadeMeleeArt257.grabs258='+json.dumps(d,separators=(',',':'))+';})(typeof window!=="undefined"?window:globalThis);\n')
# User-requested recreational pool, same panorama dimensions, lossless imported RGB.
p=R/'dist/assets/estates-tennis196.webp'
if not (archive/'estates-tennis196.webp').exists():shutil.copy2(p,archive/p.name)
im=Image.open(R/'art-source262/pool.png').convert('RGB');assert im.size==(2172,724);im.save(p,'WEBP',lossless=True,method=6)
(R/'reports262/art-import.json').write_text(json.dumps(proof,indent=2)+'\n')
print('Imported',len(proof),'frames',sum(p['bytes'] for p in proof),'bytes')
