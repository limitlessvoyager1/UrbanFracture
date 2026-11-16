from pathlib import Path
from PIL import Image
from scipy.ndimage import label,find_objects
import numpy as np,json
im=Image.open('art-source276/weapons.png').convert('RGBA');a=np.array(im);lab,n=label(a[:,:,3]>=160);B=[]
for i,b in enumerate(find_objects(lab)):
 if b and (lab[b]==i+1).sum()>9000:B.append((b[1].start,b[0].start,b[1].stop,b[0].stop))
B.sort(key=lambda q:(int((q[1]+q[3])/2/(a.shape[0]/2)),int((q[0]+q[2])/2/(a.shape[1]/4))))
assert len(B)==8
k=144/(B[1][3]-B[1][1]);hips=[210,652,1095,1554,205,651,1108,1557];hands=[(325,393),(607,190),(1036,96),(1659,185),(200,583),(590,485),(1200,569),(1704,560)];D=[]
for i,(x,y,r,b) in enumerate(B):
 q=im.crop((x,y,r,b));q=q.resize((round(q.width*.7),round(q.height*.7)),Image.Resampling.LANCZOS);p=Path(f'dist/assets/nightshade276/weapon-{i}.webp');q.save(p,'WEBP',quality=86,method=6);D.append(dict(src=f'assets/nightshade276/weapon-{i}.webp?v=330',w=q.width,h=q.height,ax=(hips[i]-x)*.7,ay=q.height,scale=k/.7,hand=[(hands[i][0]-hips[i])*k,(hands[i][1]-b)*k]))
I=json.loads(Path('reports252/art-import.json').read_text())['frames']
# Track the same near anatomical arm throughout the stride, not whichever fist is forward.
walk=[(165,225),(610,220),(1132,200),(1619,190),(290,630),(744,614),(1175,628),(1623,638)]
run=[(150,225),(590,225),(1035,200),(1458,220),(128,650),(590,655),(1040,655),(1470,638)];H=[]
for n,h in enumerate(walk+run):
 q=I[n];x=q['sourceRect'][0]+q['componentRect'][0];y=q['sourceRect'][1]+q['componentRect'][1];s=q['scale']*144/123;H.append([round((h[0]-x-q['ax'])*s,3),round((h[1]-y-q['ay'])*s,3)])
Path('dist/nightshade-weapon276-data.js').write_text('(function(r){r.NightshadeWeapon276Data='+json.dumps(D,separators=(',',':'))+';r.NightshadeWeapon276Motion=[2,3,3,1,5,6,6,4].map(n=>r.NightshadeWeapon276Data[n]);if(r.WeaponMotionArt249)r.WeaponMotionArt249.nightshade=r.NightshadeWeapon276Motion;r.NightshadeCarry276='+json.dumps(H,separators=(',',':'))+';})(globalThis);')
Path('reports330/weapon-import.json').write_text(json.dumps(dict(frames=D,carry=H,sourceScale=k),indent=2))
