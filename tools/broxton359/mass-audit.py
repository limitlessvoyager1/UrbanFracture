from pathlib import Path
from PIL import Image,ImageDraw,ImageFont
import numpy as np,json
R=Path(__file__).resolve().parents[2]
def data(n):return json.loads((R/f'dist/broxton{n}-data.js').read_text().split('=',1)[1].rstrip(';\n'))
old,new=data(358),data(359);records=[]
def frame(d,mode,i):
 q=d['gaits'][mode];im=Image.open(R/'dist'/q['src']).convert('RGBA');x,y,w,h=q['frames'][i]['rect'];return im.crop((x,y,x+w,y+h))
for mode in ['walk','run']:
 ratios=[]
 for i in range(12):
  a,b=[np.array(frame(d,mode,i)) for d in [old,new]];areas=[int((x[95:235,140:370,3]>96).sum()) for x in [a,b]];ratios.append(areas[1]/areas[0])
 records.append({'mode':mode,'upperBodyAreaRatios':ratios,'meanRatio':float(np.mean(ratios)),'minRatio':float(min(ratios))})
# A numerical guard complements the visual proof; it cannot certify gait quality.
for q in records:assert q['meanRatio']>1.10,(q['mode'],'upper body still too narrow',q)
cv=Image.new('RGB',(960,1420),'#172435');p=ImageDraw.Draw(cv);font=ImageFont.truetype('DejaVuSans.ttf',23);small=ImageFont.truetype('DejaVuSans.ttf',18)
p.text((24,12),'BROXTON / BODY AND GAIT COMPARISON',font=font,fill='white');p.text((125,50),'BUILD358',font=font,fill='#9ba9bc');p.text((600,50),'BUILD359',font=font,fill='#a5e9cd')
for row,(mode,i,label) in enumerate([('walk',0,'Heel contact'),('walk',3,'Weight-bearing passing pose'),('walk',6,'Opposite-leg contact'),('run',0,'Running')]):
 base=105+row*320;p.text((15,base),label,font=small,fill='#dfd4ca')
 for col,d in enumerate([old,new]):
  im=frame(d,mode,i);im=im.resize((300,300),Image.Resampling.LANCZOS);x=90+col*480;y=base+23;cv.paste(im,(x,y),im);p.line((col*480+40,y+270,col*480+440,y+270),fill='#385065',width=1)
cv.save(R/'reports359/body-and-walk-comparison.png');(R/'reports359/mass-audit.json').write_text(json.dumps({'pass':True,'method':'Opaque upper-body area in common normalized staging; visual approval still required','results':records},indent=2)+'\n');print(json.dumps(records))
