from pathlib import Path
from PIL import Image,ImageDraw
from scipy.ndimage import label,find_objects,binary_dilation
import numpy as np,json,shutil,hashlib
root=Path('source-art/pcbi316');src=root/'jaguar-repair-rejected.png';shutil.copy2(src,root/'jaguar-bridge-original.png');im=Image.open(src).convert('RGBA');a=np.array(im);z,n=label(a[:,:,3]>128);parts=[]
for i,s in enumerate(find_objects(z),1):
 if s and (z[s]==i).sum()>10000:parts.append((s,i))
parts.sort(key=lambda x:(x[0][0].start//512,x[0][1].start));assert len(parts)==6
base=json.loads((root/'base48-approved.json').read_text());d=json.loads(json.dumps(base));j=d['jaguar'];k=165.5/421;atlas=Image.new('RGBA',(672,448));names=['backwardFallHalf','backwardFallPreImpact','sideBracedRise','halfStandingRise','secureGripTaserDraw','punchAnticipation'];frames=[]
for i,(s,lab) in enumerate(parts):
 mask=binary_dilation(z==lab,iterations=2);r=a.copy();r[~mask]=0;r[r[:,:,3]<96]=0;q=Image.fromarray(r);bb=q.getbbox();cut=q.crop(bb);cut=cut.resize((round(cut.width*k),round(cut.height*k)),Image.Resampling.LANCZOS);dx=112-cut.width//2;dy=220-cut.height;assert 0<dx and dx+cut.width<224 and dy>0;atlas.alpha_composite(cut,(i%3*224+dx,i//3*224+dy));f={'src':'assets/pcbi316/jaguar-bridge.webp','assetField':'continuityBridge316','pose':names[i],'rect':[i%3*224,i//3*224,224,224],'ax':112,'ay':220,'sourceBounds':list(bb),'opaqueBounds':[dx,dy,dx+cut.width,220],'weaponsBaked':i==4,'sockets':{}}
 if i==4:
  # Source wrist socket at compact contact taser; shoulder grip open hand.
  f['sockets']={'hand':[round(dx+(695-bb[0])*k,2),round(dy+(729-bb[1])*k,2)],'grip':[round(dx+(930-bb[0])*k,2),round(dy+(645-bb[1])*k,2)]}
 frames.append(f)
j['frames']+=frames;j['animations']['fall']=[43,48,44,49];j['animations']['getup']=[50,46,51,47];j['animations']['grab']=[33,34,52];j['animations']['taserContact']=[52,35,36];j['animations']['punchCombo']=[53,25,26,27,28,29,30];j['bridgeReference']={'sourceAnticipationHeight':421,'uniformImportScale':k,'anatomicalSourceTarget':165.5,'noIndependentFrameScaling':True};out=Path('dist/assets/pcbi316/jaguar-bridge.webp');atlas.save(out,quality=82,method=6);assert out.stat().st_size<=100000;j['bridgeShippingBytes']=out.stat().st_size
assert d['talon']==base['talon'] and j['frames'][:48]==base['jaguar']['frames']
for name,h in json.loads((root/'base-atlas-hashes.json').read_text()).items():assert hashlib.sha256(Path('dist/'+d[name]['src']).read_bytes()).hexdigest()==h
Path('dist/pcbi316-data.js').write_text('globalThis.PCBI316Data='+json.dumps(d,separators=(',',':'))+';\n');(root/'metadata.json').write_text(json.dumps(d,indent=2));p=Image.new('RGBA',atlas.size,'#31424d');p.alpha_composite(atlas);dr=ImageDraw.Draw(p)
for i in range(6):dr.text((i%3*224+3,i//3*224+3),str(48+i),fill='white')
p.convert('RGB').save('reports316/pcbi-art/jaguar-bridge-compiled.jpg',quality=90);print('PASS six Jaguar bridges; unchanged base96 and sourcehashes; bytes',out.stat().st_size)
