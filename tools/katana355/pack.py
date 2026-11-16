from pathlib import Path
from PIL import Image
import json
import numpy as np
R=Path(__file__).resolve().parents[2];out=R/'dist/assets/katana355';out.mkdir(exist_ok=True)
for n in range(3):
 im=Image.open(R/f'source-art/katana355/swords-{n}.png').convert('RGBA');a=np.array(im);a[a[:,:,3]<12]=0;im=Image.fromarray(a);im.save(out/f'swords-{n}.webp',quality=95,method=4)
d={'sheets':[f'assets/katana355/swords-{n}.webp' for n in range(3)],'poses':json.loads((R/'reports355/poses.json').read_text())}
(R/'dist/katana355-data.js').write_text('globalThis.Katana355Data='+json.dumps(d,separators=(',',':'))+';\n')
