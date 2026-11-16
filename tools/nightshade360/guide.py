from PIL import Image,ImageDraw
from pathlib import Path
import math,json
R=Path(__file__).resolve().parents[2];meta={}
def joint(A,B,L1,L2,sign=1):
 dx,dy=B[0]-A[0],B[1]-A[1];d=min(L1+L2-.01,max(.01,math.hypot(dx,dy)));u=(L1*L1-L2*L2+d*d)/(2*d);v=math.sqrt(max(0,L1*L1-u*u));return(A[0]+dx/d*u-dy/d*v*sign,A[1]+dy/d*u+dx/d*v*sign)
for mode in ['walk','run']:
 im=Image.new('RGBA',(2048,1536));pen=ImageDraw.Draw(im);rows=[]
 for i in range(12):
  cv=Image.new('RGBA',(512,512));d=ImageDraw.Draw(cv);bob=-10*math.sin(math.pi*(i%6)/6) if mode=='walk' else -10*math.sin(math.pi*(i%6)/6);hip=(256,244+bob);lean=0 if mode=='walk' else 24
  if mode=='walk':
   X=[60,40,20,0,-20,-40,-60,-48,-24,0,24,48];Y=[0,0,0,0,0,-2,-4,-10,-16,-18,-12,-4]
  else:X=[45,22,-4,-30,-48,-30,-6,12,30,45,55,52];Y=[0,0,0,-10,-35,-75,-90,-70,-45,-25,-12,-4]
  X=[x*(1 if mode=='walk' else 1.8) for x in X]
  hands=[]
  for side,phase,color in [('far',(i+6)%12,'#557fbc'),('near',i,'#e89450')]:
   ankle=(256+X[phase],450+Y[phase]);knee=joint(hip,ankle,108,108,-1);d.line([hip,knee,ankle],fill=color,width=19);d.line([(ankle[0]-12,ankle[1]+8),(ankle[0]+27,ankle[1]+8)],fill=color,width=14)
   shoulder=(256+lean+(-26 if side=='near' else 23),127+bob);wrist=(256+lean+(-26 if side=='near' else 23)-X[phase]*(.6 if mode=='walk' else .6),(267 if mode=='walk' else 210)+bob);elbow=joint(shoulder,wrist,83,77,1 if side=='near' else -1);d.line([shoulder,elbow,wrist],fill=color,width=15);d.ellipse((wrist[0]-9,wrist[1]-9,wrist[0]+9,wrist[1]+9),fill=color)
   if side=='near':hands=list(wrist);nearArm=[shoulder,elbow,wrist]
  d.polygon([(216+lean,110+bob),(296+lean,110+bob),(282,246+bob),(230,246+bob)],fill='#647078');d.ellipse((232+lean,43+bob,280+lean,93+bob),fill='#ccd2d5');d.polygon([(279+lean,64+bob),(289+lean,70+bob),(278+lean,75+bob)],fill='#ccd2d5');d.line([(256+lean,92+bob),(256+lean,120+bob)],fill='#ccd2d5',width=18)
  d.line(nearArm,fill='#e89450',width=15);d.ellipse((hands[0]-9,hands[1]-9,hands[0]+9,hands[1]+9),fill='#e89450')
  # Repeat near arm/leg structure is a pose guide, never production art.
  im.alpha_composite(cv,(i%4*512,i//4*512));rows.append({'index':i,'hand':hands,'nearFoot':[256+X[i],460+Y[i]],'farFoot':[256+X[(i+6)%12],460+Y[(i+6)%12]],'bob':bob})
 im.save(R/f'source-art/nightshade360/{mode}-guide-final.png');meta[mode]=rows
(R/'reports360/guides.json').write_text(json.dumps(meta,indent=2))
