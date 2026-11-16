from pathlib import Path
from PIL import Image
from scipy import ndimage
import numpy as np,json
R=Path(__file__).resolve().parents[1];im=Image.open(R/'art-source264/counters.png').convert('RGBA');W,H=im.size;cells=[]
for n in range(8):
 rect=[round(n%4*W/4),round(n//4*H/2),round((n%4+1)*W/4),round((n//4+1)*H/2)];a=np.array(im.crop(rect));lab,_=ndimage.label(a[:,:,3]>=128,np.ones((3,3)));cnt=np.bincount(lab.ravel());cnt[0]=0;keep=lab==cnt.argmax();a[~keep]=0;ys,xs=np.where(keep);box=[int(xs.min()),int(ys.min()),int(xs.max()+1),int(ys.max()+1)];crop=Image.fromarray(a).crop(box);cells.append((crop,rect,box))
# Reuse approved idle, existing baton windup and existing wrist laser; only new choreography needs new art.
import re
def jsdata(name,marker):
 text=(R/'dist'/name).read_text();return json.JSONDecoder().raw_decode(text.split(marker,1)[1])[0]
base=jsdata('nightshade-art252.js','window.NightshadeArt252=');melee=jsdata('nightshade-melee-art257.js','NightshadeMeleeArt257=')
grabs=jsdata('nightshade-grab-art258.js','NightshadeMeleeArt257.grabs258=')
alias={0:base['frames'][base['idle']],1:melee['grab'][0],3:grabs[4],5:melee['main'][3],7:melee['main'][6]}
out=R/'dist/assets/nightshade264';out.mkdir(exist_ok=True);D=[]
for n,(crop,rect,box)in enumerate(cells):
 q=dict(src=f'assets/nightshade264/counter-{n}.webp?v=264',w=crop.width,h=crop.height,ax=crop.width*(.46 if n!=4 else .35),ay=crop.height,scale=123/cells[0][0].height,kind='counter264',index=n)
 if n==4:q['taser']=[crop.width*.94,crop.height*.9]
 if n==7:q['wrist']=[crop.width*.86,crop.height*.21]
 if n==6:q['tip']=[crop.width*.98,crop.height*.89]
 if n in alias:
  q={**alias[n], 'kind':'counter264','index':n,'reused264':True}
  if n==7:q['wrist']=alias[n]['wrist']
  (out/f'counter-{n}.webp').unlink(missing_ok=True)
 else:crop.save(out/f'counter-{n}.webp','WEBP',quality=84,method=6)
 D.append(q)
(R/'dist/nightshade-counter-art264.js').write_text('(function(r){r.NightshadeMeleeArt257.counter264='+json.dumps(D,separators=(',',':'))+';})(typeof window!=="undefined"?window:globalThis);\n')
(R/'reports264/art-import.json').write_text(json.dumps(dict(frames=D,referenceHeight=cells[0][0].height,policy='Fixed source scale/standing reference, approved144 presentation. Art-review candidates only.'),indent=2))
print('3 new frames /5 reused poses',sum(p.stat().st_size for p in out.iterdir()))
