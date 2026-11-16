"""Pack original hospital floors/access art from retained sources."""
from PIL import Image
from pathlib import Path
import shutil,json
ROOT=Path(__file__).resolve().parents[2];src=ROOT/'source-art/hospital314';out=ROOT/'dist/assets/hospital314'
inputs={'floors':'exec-14899198-3991-4f38-bc8b-aff2b47cd4fd.png','doors':'exec-8548e275-8caf-4124-877c-3b5f7566706a.png'}
for key,name in inputs.items():
 p=src/(key+'-original.png');cache=Path('/workspace/scratch/96a3e452279b/generated_images')/name
 if not p.exists():shutil.copy2(cache,p)
 Image.open(p).convert('RGB').resize((900,900) if key=='floors' else (600,400),Image.Resampling.LANCZOS).save(out/(key+'.webp'),quality=87 if key=='floors' else 88,method=6)
floors={'src':'assets/hospital314/floors.webp','width':900,'height':900,'rows':{key:[0,i*150+1,900,148] for i,key in enumerate(['clinical','vip','roof','garage','service','skybridge'])}}
doors={'src':'assets/hospital314/doors.webp','width':600,'height':400,'frames':{'stairs':[29,5,250,380],'elevator':[311,5,287,380]},'baseline':385}
(ROOT/'dist/hospital314-materials.js').write_text('globalThis.Hospital314Materials='+json.dumps({'floors':floors,'doors':doors},separators=(',',':'))+';\n')
(src/'materials-metadata.json').write_text(json.dumps({'floors':floors,'doors':doors},indent=2)+'\n')
print({k:(out/(k+'.webp')).stat().st_size for k in inputs})
assert (out/'floors.webp').stat().st_size<=160000
assert (out/'doors.webp').stat().st_size<=70000
