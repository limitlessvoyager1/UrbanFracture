from pathlib import Path
import json
from pack import pack,R
src=R.parents[1]/'generated_images/exec-84c0da23-005f-44ea-b306-a474f113405b.png'
# Source has4columns,8rows. Hands remain in one waist-level grip through armed walking.
hands={24:([139,99],[126,105]),25:([139,99],[128,107]),26:([146,100],[134,107]),27:([145,100],[132,107]),28:([150,99],[137,106]),29:([145,100],[133,107]),30:([146,100],[133,107]),31:([148,101],[137,108])}
d=pack('extra',src,4,8,[0,222,444,666,888,1110,1332,1554,1774],list(range(32)),[0,7,8],hands)
p=R/'dist/reina382-data.js';v=json.loads(p.read_text().split('=',1)[1].rstrip(';\n'));v['extra']=d;p.write_text('globalThis.Reina382Data='+json.dumps(v,separators=(',',':'))+';\n')
