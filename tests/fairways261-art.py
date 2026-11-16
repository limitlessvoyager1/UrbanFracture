from PIL import Image,ImageChops
from pathlib import Path
import hashlib,json
r=Path(__file__).resolve().parents[1]
m=json.loads((r/'reports261/asset-migration.json').read_text())
before=r/m['previous'];after=r/m['asset'];source=r/m['source']
assert hashlib.sha256(before.read_bytes()).hexdigest()==m['before']['sha256']
shipping=after
if hashlib.sha256(shipping.read_bytes()).hexdigest()!=m['after']['sha256']:
 derivative=next(q for q in json.loads((r/'qa/system242/derivative-assets316.json').read_text())['assets'] if q['path']==m['asset'])
 assert derivative['originalSha256']==m['after']['sha256']
 assert hashlib.sha256(shipping.read_bytes()).hexdigest()==derivative['candidateSha256']
 after=r/derivative['backup']
 assert hashlib.sha256(after.read_bytes()).hexdigest()==derivative['originalSha256']
 a=Image.open(after).convert('RGBA');b=Image.open(shipping).convert('RGBA')
 assert a.size==b.size
 ext=ImageChops.difference(a,b).getextrema();assert max(v[1] for v in ext[:3])<=1 and ext[3][1]==0
else:
 assert hashlib.sha256(after.read_bytes()).hexdigest()==m['after']['sha256']

if m['after'].get('encodingEvidence264'):
 proof=json.loads((r/m['after']['encodingEvidence264']).read_text());q=next(q for q in proof['assets'] if q['path']==m['asset']);archived=r/'art-source264/storage-originals/estates-avenue196.webp';assert hashlib.sha256(archived.read_bytes()).hexdigest()==q['before']==m['after']['priorEncodingSha264'];assert Image.open(archived).convert('RGBA').tobytes()==Image.open(after).convert('RGBA').tobytes()
a=Image.open(source).convert('RGB');b=Image.open(after).convert('RGB')
assert a.size==b.size==(2172,724)
assert a.tobytes()==b.tobytes(), 'lossless import must preserve every generated RGB pixel'
assert m['after']['status']=='review-required'
print('PASS261 ART original lossless source dimensions/RGB/hash retained; shipping316 derivative separately verified at max RGB delta1 with unchanged alpha; artistic approval remains separate.')
