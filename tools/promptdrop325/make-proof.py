from pathlib import Path
import subprocess,json
base='9676a3ad95b7a000d326fd8d54a5bf91a38f87b1';rows={}
for name in subprocess.check_output(['git','diff',base,'--name-only'],text=True).splitlines():
 if name.startswith('dist/') and name.endswith(('.js','.html','.css')):
  old=subprocess.check_output(['git','show',base+':'+name],text=True);new=Path(name).read_text();rows[name[5:]]=[[old,new]]
Path('tools/promptdrop325/approved-source-lines.json').write_text(json.dumps(rows,indent=2))
