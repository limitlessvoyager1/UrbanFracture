from PIL import Image
import numpy as np
from scipy.ndimage import label,find_objects
import sys
im=Image.open(sys.argv[1]).convert('RGBA')
for i,n in enumerate(['cologne','sunglasses','shirts','popcorn','cabinet','pinball','racing','basketball']):
 p=im.crop((round(i%4*im.width/4),round(i//4*im.height/2),round((i%4+1)*im.width/4),round((i//4+1)*im.height/2)))
 a=np.array(p);a[:,:,3][a[:,:,3]<128]=0
 labs,count=label(a[:,:,3]>=128);sizes=np.bincount(labs.ravel());sizes[0]=0;key=sizes.argmax();yy,xx=np.where(labs==key);sl=(slice(yy.min(),yy.max()+1),slice(xx.min(),xx.max()+1))
 # Bound the main connected object. Keep detached details inside its silhouette bounds.
 p=Image.fromarray(a[sl]);p.save('dist/assets/mall/prop-'+n+'236.webp',quality=90,method=6)
 print(n,p.size,flush=True)
