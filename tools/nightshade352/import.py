from pathlib import Path
from PIL import Image
import json
R=Path(__file__).resolve().parents[2];im=Image.open(R/'source-art/nightshade352/blitz.png').convert('RGBA');w,h=im.size
hips=[(.46,.55),(.40,.62),(.39,.56),(.39,.58),(.43,.58),(.39,.57),(.40,.57),(.38,.58),(.29,.56),(.34,.57),(.33,.57),(.39,.57),(.45,.61),(.40,.63),(.42,.63),(.52,.57)]
toes={5:(.84,.17),6:(.70,.02),7:(.90,.20),8:(.96,.32),9:(.97,.40),10:(.97,.54)}
frames=[];baseline=None;scale=None;hip_height=None
for j,(hx,hy) in enumerate(hips):
 x0=round(j%4*w/4);y0=round(j//4*h/4);x1=round((j%4+1)*w/4);y1=round((j//4+1)*h/4);cw,ch=x1-x0,y1-y0
 crop_y=y0-6 if j==6 else y0
 b=im.crop((x0,crop_y,x1,y1)).getchannel('A').point(lambda a:255 if a>96 else 0).getbbox();assert b
 l,t,r,bottom=b;t+=crop_y-y0;bottom+=crop_y-y0;hx*=cw;hy*=ch
 if j==0:scale=134/(bottom-t);hip_height=bottom-2-hy
 ax=hx-l;ay=(bottom-t-2) if j in [0,1,2,3,13,14,15] else hy-t+hip_height
 tx,ty=toes.get(j,(hx/cw,(bottom-2)/ch));tx*=cw;ty*=ch
 frames.append({'rect':[x0+l,y0+t,r-l,bottom-t],'ax':ax,'ay':ay,'scale':scale,'hip':[(hx-l-ax)*scale,(hy-t-ay)*scale],'toe':[(tx-l-ax)*scale,(ty-t-ay)*scale]})
im.save(R/'dist/assets/nightshade352/blitz.webp',quality=94,method=6)
data={'image':'assets/nightshade352/blitz.webp','frames':frames,'rootTravel':400,'poseFrames':[0,4,8,12,16,19,22,26,30,35,41,50,55,61,68,76]}
(R/'dist/nightshade-blitz352-data.js').write_text('(function(r){const A=r.NightshadeArt348,B=r.NightshadeBlitz352='+json.dumps(data,separators=(',',':'))+';delete A.images.blitz349;A.images.blitz352=B.image;A.frames.blitz352=B.frames;})(globalThis);\n')
