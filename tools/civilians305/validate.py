import json,subprocess,shutil,sys
from pathlib import Path
root=Path.cwd()
def run(args,log):
 print('Running '+' '.join(args),flush=True)
 with open(log,'w') as out:r=subprocess.run(args,stdout=out,stderr=subprocess.STDOUT)
 assert r.returncode==0,(args,r.returncode)
if '--existing-media' not in sys.argv:
 for phase in ['before','after']:
  run(['node','--expose-gc','tools/civilians305/capture.cjs',phase],f'reports305/{phase}-capture.log')
run(['node','tools/civilians305/verify-captures.cjs'],'reports305/capture-validation.log')
kinds=['subway','mall','fairways','uptown']
for k in kinds:
 subprocess.run(['ffmpeg','-y','-loglevel','error','-i',f'reports305/before/{k}.mp4','-i',f'reports305/after/{k}.mp4','-filter_complex','[0:v][1:v]hstack=inputs=2[v]','-map','[v]','-an','-c:v','libx264','-threads','2','-crf','25',f'reports305/{k}-compare.mp4'],check=True)
Path('reports305/comparison-clips.txt').write_text(''.join("file '"+str(root/'reports305'/f'{k}-compare.mp4')+"'\n" for k in kinds))
subprocess.run(['ffmpeg','-y','-loglevel','error','-f','concat','-safe','0','-i','reports305/comparison-clips.txt','-c','copy','reports305/before-after-1x.mp4'],check=True)
for speed,name in [(2,'05x'),(4,'025x')]:
 subprocess.run(['ffmpeg','-y','-loglevel','error','-i','reports305/before-after-1x.mp4','-vf',f'setpts={speed}*PTS','-an','-c:v','libx264','-threads','2','-crf','25',f'reports305/before-after-{name}.mp4'],check=True)
print('Running fresh full release (includes all initial-profile cases)',flush=True)
with open('reports305/release-run.log','w') as out:r=subprocess.run(['node','tools/qa242/run.cjs','--profile','release'],stdout=out,stderr=subprocess.STDOUT)
report=json.loads(Path('reports242/latest.json').read_text());shutil.copyfile('reports242/latest.json','reports305/release-validation.json')
print(json.dumps({'exit':r.returncode,'counts':report['counts'],'changed':report['sourceChangedDuringTests'],'decision':report['decision']}),flush=True)
assert r.returncode in [0,2] and report['counts']['failed']==0 and not report['sourceChangedDuringTests']
