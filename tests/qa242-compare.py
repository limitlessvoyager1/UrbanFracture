import importlib.util,tempfile
from pathlib import Path
from PIL import Image
spec=importlib.util.spec_from_file_location('compare','tools/qa242/compare.py');m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
with tempfile.TemporaryDirectory() as d:
 p=Path(d);a=Image.new('RGBA',(80,60),'#23344f');a.save(p/'a.png');a.save(p/'b.png');assert m.compare(p/'a.png',p/'b.png',p/'diff.png')['passed']
 b=a.copy();b.paste('#ffffff',(5,5,25,25));b.save(p/'b.png');r=m.compare(p/'a.png',p/'b.png',p/'diff.png');assert not r['passed'] and r['changedPixels']==400
 Image.new('RGBA',(80,61)).save(p/'b.png');assert m.compare(p/'a.png',p/'b.png',p/'diff.png')['reason']=='capture-size-mismatch'
print('PASS242 comparator fixtures: identical images pass, unexplained400-pixel change and wrong geometry fail; real scene baselines remain unapproved.')
