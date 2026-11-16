from pathlib import Path
import re,json,lzma,hashlib
R=Path(__file__).resolve().parents[2];O=R/'out';D=R/'dist';table=json.loads(lzma.decompress((O/'__source342.lzma').read_bytes(),format=lzma.FORMAT_ALONE));count=0
for key,code in table.items():assert (D/key).read_bytes()==code.encode(),key;count+=1
h=(O/'index.html').read_text();scripts=re.findall(r'<script src="([^"?]+)',h)
for name in scripts:assert (O/name).exists(),name
imageCount=0
for p in (O/'assets').rglob('*'):
 if p.is_file():assert p.read_bytes()==(D/p.relative_to(O)).read_bytes(),str(p);imageCount+=1
assert (O/'downtown360.html').read_text()==h
assert 'game360.js' in scripts and 'game.js' not in scripts and 'game344.js' not in scripts
for key in ['gamepad.js','backup365.js','support370.js','backup371.js','backup371-data.js','backup-view371.js','backup-view365.js','broxton-gait359.js']:assert key in scripts,key
for name in ['hydro-view243.js','subway-view238.js','stadium-view237.js','style310.js','airport-view309.js','yacht-view195.js']:assert name not in scripts,name
expanded=sum(((p.stat().st_size+511)//512)*512+512 for p in O.rglob('*') if p.is_file())+sum(512 for p in O.rglob('*') if p.is_dir())+1024
assert expanded<268435456,expanded
q={'passed':True,'exactSourceStrings':count,'retainedScripts':len(scripts),'exactRetainedAssetFiles':imageCount,'expandedTarEstimateBytes':expanded,'capBytes':268435456,'zipScope':'Downtown-only; no full-game asset deletion in dist','physicalController':'not tested'}
(R/'reports371/package-verification.json').write_text(json.dumps(q,indent=2)+'\n');print(json.dumps(q))
