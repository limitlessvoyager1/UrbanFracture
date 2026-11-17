from pathlib import Path
from PIL import Image
import json,hashlib
R=Path(__file__).resolve().parents[1];Q=R/'qa/system242/repair-references/reina390';d=json.loads((Q/'gait-registration.json').read_text());a=R/'dist/assets/reina383/motion.webp';p=R/'dist/assets/reina-concept-v1.webp'
assert hashlib.sha256(a.read_bytes()).hexdigest()==d['atlasSHA256']
assert hashlib.sha256(p.read_bytes()).hexdigest()==d['portraitSHA256']
assert len(d['rows'])==20 and all(abs(r['logicalWaistX'])<.5 for r in d['rows'])
for start,end in [(0,4),(4,12),(12,20)]:
 xs=[r['logicalWaistX']for r in d['rows'][start:end]];assert max(xs)-min(xs)<.8
assert Image.open(p).size==(256,256)
assert Image.open(a).size==Image.open(Q/'motion-before390.webp').size
print(json.dumps({'passed':True,'reviewedPelvisAnchors':20,'maxRootError':max(abs(r['logicalWaistX'])for r in d['rows']),'portrait':'close scar headshot; artistic approval pending','physicalController':False}))
