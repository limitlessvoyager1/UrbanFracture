from PIL import Image
from pathlib import Path
src=Image.open('/workspace/scratch/96a3e452279b/generated_images/exec-fa9fbc5a-5322-4ebc-9513-77bb2e846073.png')
for i,n in enumerate(['elevator-lobby240','elevator-cabin240']):
 h=src.height//2;x=(src.width-960)//2
 src.crop((x,i*h,x+960,(i+1)*h)).save(Path('dist/assets/stadium')/(n+'.webp'),quality=92,method=6)
