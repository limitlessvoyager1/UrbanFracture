from pathlib import Path
from PIL import Image
import numpy as np,json,re
from scipy.ndimage import binary_erosion
s=Path('dist/woods139.js').read_text();P=json.loads(re.search(r'const streamRegions282=(\[.*?\]);',s).group(1));im=np.array(Image.open('dist/assets/deep-woods147.webp').convert('RGB'));h,w=im.shape[:2];yy,xx=np.mgrid[:h,:w];region=np.zeros((h,w),bool)
for p in P:
 inside=np.zeros((h,w),bool)
 for a,b in zip(p,p[-1:]+p[:-1]):
  ay,by=a[1],b[1]
  if ay!=by:inside ^= ((ay>yy)!=(by>yy))&(xx<(b[0]-a[0])*(yy-ay)/(by-ay)+a[0])
 region |= inside
r,g,b=[im[:,:,i].astype(float) for i in range(3)];candidate=((b>r*1.07)&(g>r*1.08)&(b>=g*.96))|((r>182)&(g>193)&(b>202));mask=binary_erosion(region&candidate,structure=np.array([[0,1,0],[1,1,1],[0,1,0]],bool));assert mask.sum()>1000
assert not mask[:185].any(),'canopy static';assert not mask[391:475].any(),'bridge static';assert not mask[:,1400:].any(),'trees and cabin static';assert mask[480:560,570:750].any(),'lower stream animates';assert mask[240:310,750:960].any(),'upper falls animate'
assert 'p.globalAlpha=1-u' not in s and 'p.globalAlpha=u;' not in s,'no translated texture crossfade';assert 'c.imageSmoothingEnabled=false' in s
assert 'b>=g*.96' in s,'green foliage cannot qualify as blue water'
Image.fromarray((mask*255).astype('uint8')).save('reports282/stream-mask.png')
print('PASS282 WATER',int(mask.sum()),'real source pixels; canopy/bridge/trees/cabin rejected, current retained, no texture crossfade or smoothing')
