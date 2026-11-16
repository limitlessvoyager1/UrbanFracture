from pathlib import Path
import subprocess,json
base='6b6a5d42c48e80bf59b7be1871845b76f5695865';rows={}
for name in subprocess.check_output(['git','diff',base,'--name-only'],text=True).splitlines():
 if name.startswith('dist/') and name.endswith(('.js','.html','.css')) and subprocess.run(['git','cat-file','-e',base+':'+name],capture_output=True).returncode==0:
  old=subprocess.check_output(['git','show',base+':'+name],text=True);new=Path(name).read_text();rows[name[5:]]=[[old,new]]
Path('tools/astro326/approved-source-lines.json').write_text(json.dumps(rows,indent=2))
