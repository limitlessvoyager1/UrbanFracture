from PIL import Image,ImageDraw
# Broad glass regions are color-graded, never punched out. Existing planes, skyline,
# glazing bars and reflections remain intact. Indoor furniture is explicitly excluded.
m=Image.new('L',(1536,1024));d=ImageDraw.Draw(m)
for q in [(112,0,475,123),(530,0,1288,207),(1288,0,1400,116),(232,336,1204,409),(85,337,183,485),(1327,331,1392,408),(1422,316,1456,408),(1468,321,1493,404),(93,529,425,652),(1157,528,1535,675),(632,820,1106,901),(1177,799,1510,953),(0,529,1012,550)]:d.rectangle(q,fill=255)
for q in [(130,14,174,107),(195,18,404,117),(540,18,1000,95),(1130,18,1335,117),(1357,10,1395,111),(480,123,788,209),(738,801,875,918),(605,849,693,955),(868,856,966,921),(1044,848,1170,950),(1187,820,1519,847),(1327,612,1485,632),(123,563,257,734),(264,614,472,737),(0,0,114,245)]:d.rectangle(q,fill=0)
d.rectangle((1288,0,1535,212),fill=255)
d.polygon([(1288,251),(1354,251),(1535,55),(1535,14),(1494,47),(1308,212)],fill=0)
a=Image.new('RGBA',m.size,(255,255,255,0));a.putalpha(m);a.save('dist/assets/recording312/interior-windows.png')

# Shipping masks are lossless WebP; retain decoded RGBA exactly.
from pathlib import Path
for name in ['interior-windows','terminal-windows']:
 p=Path('dist/assets/recording312')/(name+'.png')
 if p.exists():
  Image.open(p).save(p.with_suffix('.webp'),lossless=True,exact=True)
  p.unlink()
