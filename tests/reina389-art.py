"""Source-bound atlas integrity, not artistic approval."""
from pathlib import Path
from PIL import Image
import json,hashlib,numpy as np
R=Path(__file__).resolve().parents[1];Q=R/'qa/system242/repair-references/reina389';C=json.loads((Q/'asset-contract.json').read_text())
def data(name):return json.loads((R/'dist'/name).read_text().split('=',1)[1].rstrip(';\n'))
defs={'reina381':data('reina381-data.js'),'reina382':data('reina382-data.js'),'reina383':data('reina383-data.js')}
count=0
for row in C['images']:
 for item in ['original','edited','compiled','baseline']:
  q=row[item];assert hashlib.sha256((R/q['path']).read_bytes()).hexdigest()==q['sha256'],(row['key'],item,'source bytes changed')
 family,key=row['family'],row['key'];d=defs[family][key] if family=='reina381' else defs[family]['extra'] if key=='extra' else defs[family];im=Image.open(R/row['compiled']['path']).convert('RGBA');assert len(d['frames'])==row['frames'];assert d['scale']==148/190
 for i,f in enumerate(d['frames']):
  x,y,w,h=f['rect'];assert x>=0 and y>=0 and x+w<=im.width and y+h<=im.height,(key,i,'atlas cell missing or clipped');a=np.asarray(im.crop((x,y,x+w,y+h)));ys,xs=np.where(a[:,:,3]>100);assert len(xs)>100,(key,i,'empty pose');assert xs.min()>0 and ys.min()>0 and xs.max()<w-1 and ys.max()<h-1,(key,i,'opaque body clipped');assert np.count_nonzero((a[:,:,3]>128)&(a[:,:,0]>220)&(a[:,:,1]<55)&(a[:,:,2]<55))<8,(key,i,'stray opaque red pixels')
  if key=='motion' and 12<=i<20:assert ys.max()<=f['ay']+1,(i,'run contact falls below ground')
  count+=1
assert count==204
# Runtime weapon sockets must remain byte-for-byte the reviewed native source metadata.
old=json.loads((Q/'reina382-data-before389.js.txt').read_text().split('=',1)[1].rstrip(';\n'));assert defs['reina382']==old
assert C['artisticApproval'] is False and C['physicalController'] is False
print(json.dumps({'passed':True,'atlasFrames':count,'sourceAndOutputHashesVerified':True,'weaponMetadataUnchanged':True,'artisticApproval':False,'physicalController':False}))
