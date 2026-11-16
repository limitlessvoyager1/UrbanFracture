from pathlib import Path
from PIL import Image
p=Path('dist/stadium-view237.js');s=p.read_text();s=s.replace("+'.webp?v=313'","+'.webp?v=331'")
a=s.index("if(e.phase!=='select'){const open=");b=s.index('\nfunction picture',a)
s=s[:a]+"doors331(c,art['elevator-cabin'],357,94,245,218,357,68+94*364/312,245,218*364/312,e.phase==='closing'?1-(e.progress||0):e.phase==='arrival'?(e.progress||0):0);}\nfunction doors331(c,im,sx,sy,sw,sh,x,y,w,h,open){if(!im||open<=0)return;c.save();c.beginPath();c.rect(x,y,w,h);c.clip();rect(c,x,y,w,h,'#25354a');rect(c,x,y+h*.84,w,h*.16,'#9fa9ae');for(let side=0;side<2;side++)c.drawImage(im,sx+side*sw/2,sy,sw/2,sh,x+side*w/2+(side?1:-1)*open*w/2,y,w/2,h);c.restore();}\n"+s[b:]
s=s.replace("else if(k===6){", "else if(k===4){if(art.vip)c.drawImage(art.vip,0,68,d.end,472);}else if(k===6){")
a=s.index("rect(c,0,207,252,180,'#142132')");b=s.index(';}}}',a)
s=s[:a]+"doors331(c,art['elevator-lobby'],368,142,224,173,18,68+142*364/362,224,173*364/362,open)"+s[b:]
s=s.replace('spectators,field,runArt,runData','spectators,field,runArt,runData,doors331');p.write_text(s)
p=Path('dist/stadium237.js');s=p.read_text().replace('panes:[[780,120,640,200]]','clearGlass:true,panes:[[714,137,796,176]]');p.write_text(s)
p=Path('dist/environment-view156.js');s=p.read_text().replace("Math.min(.76,L.night*.88+s.cloud*.08)","(w.clearGlass?0:Math.min(.76,L.night*.88+s.cloud*.08))");p.write_text(s)
p=Path('dist/index.html');s=p.read_text().replace('<option value="restaurant">','<option value="restaurant" selected>');p.write_text(s)
source=Path('/workspace/scratch/96a3e452279b/generated_images/exec-351a3439-3284-4d3c-bbf5-0eb166515dae.png');Path('art-source331/vip.png').write_bytes(source.read_bytes());im=Image.open(source);im=im.crop((0,73,im.width,im.height)).resize((1700,472),Image.Resampling.LANCZOS);im.save('dist/assets/stadium/vip237.webp','WEBP',quality=90,method=6)
