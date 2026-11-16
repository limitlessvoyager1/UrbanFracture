from pathlib import Path
from PIL import Image
from scipy.ndimage import label,find_objects
import numpy as np,json
R=Path(__file__).resolve().parents[1];out=R/'dist/assets/nightshade276';out.mkdir(exist_ok=True)
def boxes(path,cols,rows):
 a=np.array(Image.open(path).convert('RGBA'));l,n=label(a[:,:,3]>=160);B=[]
 for i,b in enumerate(find_objects(l)):
  if b and (l[b]==i+1).sum()>9000:B.append((b[1].start,b[0].start,b[1].stop,b[0].stop))
 B.sort(key=lambda q:(int((q[1]+q[3])/2/(a.shape[0]/rows)),int((q[0]+q[2])/2/(a.shape[1]/cols))))
 assert len(B)==cols*rows,(path,len(B));return a,B
A,B=boxes(R/'art-source276/blitz.png',4,3);print('blitz boxes',B);k=123/(B[11][3]-B[11][1]);hips=[220,548,938,1262,215,525,910,1265,220,556,906,1271];contacts={5:([584,502],[681,457]),6:([984,477],[1048,445]),7:([1326,503],[1405,520])};D=[]
for i,(x,y,r,b) in enumerate(B):
 q=A[y:b,x:r].copy();q[:,:,3]=np.where(q[:,:,3]>=160,255,0);q[q[:,:,3]==0]=0;im=Image.fromarray(q).resize((round((r-x)*k),round((b-y)*k)),Image.Resampling.NEAREST);h=im.getchannel('A').getbbox()[3];im=im.crop((0,0,im.width,h));p=out/f'blitz-{i}.webp';im.save(p,'WEBP',quality=85,method=6)
 d=dict(src='assets/nightshade276/'+p.name+'?v=276',w=im.width,h=im.height,ax=(hips[i]-x)*k,ay=im.height,scale=1,kind='blitz276',sourceBox=[x,y,r,b],importScale=k)
 if i in contacts:
  for name,point in zip(['knee','toe'],contacts[i]):d[name]=[(point[0]-x)*k,(point[1]-y)*k]
 D.append(d)
(R/'dist/nightshade-blitz276-data.js').write_text('(function(r){r.NightshadeMeleeArt257.blitz276='+json.dumps(D,separators=(',',':'))+';})(typeof window!=="undefined"?window:globalThis);\n')
A,B=boxes(R/'art-source276/weapons.png',4,2);print('weapon boxes',B);k=144/(B[1][3]-B[1][1]);hips=[210,652,1095,1554,205,651,1108,1557];hands=[(325,393),(607,190),(1036,96),(1659,185),(200,583),(590,485),(1200,569),(1704,560)];D=[]
for i,(x,y,r,b) in enumerate(B):
 q=A[y:b,x:r].copy();q[:,:,3]=np.where(q[:,:,3]>=160,255,0);q[q[:,:,3]==0]=0;im=Image.fromarray(q).resize((round((r-x)*k),round((b-y)*k)),Image.Resampling.NEAREST);h=im.getchannel('A').getbbox()[3];im=im.crop((0,0,im.width,h));p=out/f'weapon-{i}.webp';im.save(p,'WEBP',quality=85,method=6);ax=(hips[i]-x)*k;ay=im.height;D.append(dict(src='assets/nightshade276/'+p.name+'?v=276',w=im.width,h=im.height,ax=ax,ay=ay,scale=1,hand=[(hands[i][0]-x)*k-ax,(hands[i][1]-y)*k-ay],sourceBox=[x,y,r,b],importScale=k))
(R/'dist/nightshade-weapon276-data.js').write_text('(function(r){r.NightshadeWeapon276Data='+json.dumps(D,separators=(',',':'))+';r.NightshadeWeapon276Motion=[2,3,3,1,5,6,6,4].map(n=>r.NightshadeWeapon276Data[n]);if(r.WeaponMotionArt249)r.WeaponMotionArt249.nightshade=r.NightshadeWeapon276Motion;})(typeof window!=="undefined"?window:globalThis);\n')
# Reuse approved startup/landing/guard art; keep generated air and weapon handling art only.
A=json.loads((R/'dist/nightshade-art252.js').read_text().split('=',1)[1].strip().rstrip(';'))
p=R/'dist/nightshade-blitz276-data.js';D=json.loads(p.read_text().split('blitz276=',1)[1].split(';})(typeof',1)[0]);aliases={0:A['run'][1],1:A['land'],9:A['jumpDown'],10:A['land'],11:A['block']}
for i,n in aliases.items():
 D[i]={**A['frames'][n], 'kind':'blitz276','reused276':n};(out/f'blitz-{i}.webp').unlink(missing_ok=True)
for q in D:
 q.pop('sourceBox',None);q.pop('importScale',None)
p.write_text('(function(r){r.NightshadeMeleeArt257.blitz276='+json.dumps(D,separators=(',',':'))+';})(typeof window!=="undefined"?window:globalThis);\n')
p=R/'dist/nightshade-weapon276-data.js';D=json.loads(p.read_text().split('NightshadeWeapon276Data=',1)[1].split(';r.NightshadeWeapon276Motion=',1)[0]);D[4]=dict(D[1]);D[6]=dict(D[3]);(out/'weapon-4.webp').unlink(missing_ok=True);(out/'weapon-6.webp').unlink(missing_ok=True)
for q in D:
 q.pop('sourceBox',None);q.pop('importScale',None)
p.write_text('(function(r){r.NightshadeWeapon276Data='+json.dumps(D,separators=(',',':'))+';r.NightshadeWeapon276Motion=[2,3,3,1,5,6,6,4].map(n=>r.NightshadeWeapon276Data[n]);if(r.WeaponMotionArt249)r.WeaponMotionArt249.nightshade=r.NightshadeWeapon276Motion;})(typeof window!=="undefined"?window:globalThis);\n')
# Source-pixel glove centers, carried through existing fixed gait atlas transforms.
I=json.loads((R/'reports252/art-import.json').read_text())['frames'];walk=[(310,200),(754,192),(1178,199),(1619,190),(290,630),(744,614),(1175,628),(1623,638)];run=[(337,173),(752,185),(1182,176),(1647,169),(336,617),(765,612),(1199,626),(1658,613)];hands=[]
for n,h in enumerate(walk+run):
 q=I[n];x=q['sourceRect'][0]+q['componentRect'][0];y=q['sourceRect'][1]+q['componentRect'][1];s=q['scale']*144/123;hands.append([round((h[0]-x-q['ax'])*s,3),round((h[1]-y-q['ay'])*s,3)])
p.write_text(p.read_text().replace('})(typeof window', 'r.NightshadeCarry276='+json.dumps(hands,separators=(',',':'))+';})(typeof window'))
print('Deploy13new sprites',sum(p.stat().st_size for p in out.glob('*.webp')))
