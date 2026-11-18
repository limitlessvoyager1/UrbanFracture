from pathlib import Path
from PIL import Image
import sys
root=Path(sys.argv[1]);src=Path(sys.argv[2]);dest=root/'source-art/reina399/powerbomb-victim-master.png';dest.write_bytes(src.read_bytes())
im=Image.open(src).convert('RGBA').resize((768,512),Image.Resampling.LANCZOS)
im.save(root/'dist/assets/reina399/powerbomb-victim.avif',quality=80,speed=6,subsampling='4:4:4')
print((root/'dist/assets/reina399/powerbomb-victim.avif').stat().st_size)
