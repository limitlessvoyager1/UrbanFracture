import pathlib,subprocess,difflib,json
rows={}
for file in subprocess.check_output(['git','diff','e66d709716a6f32b073777eedeec59d12ced3656','--name-only'],text=True).splitlines():
 if not file.startswith('dist/') or not file.endswith(('.js','.html','.css')):continue
 old=subprocess.check_output(['git','show','e66d709716a6f32b073777eedeec59d12ced3656:'+file],text=True);new=pathlib.Path(file).read_text();a=old.splitlines(keepends=True);b=new.splitlines(keepends=True);edits=[]
 for tag,i,j,k,l in difflib.SequenceMatcher(None,a,b,autojunk=False).get_opcodes():
  if tag=='equal':continue
  before=''.join(a[i:j]);after=''.join(b[k:l]);assert after and new.count(after)==1,(file,tag);edits.append([before,after])
 rows[file.removeprefix('dist/')]=edits
pathlib.Path('tools/industrial324/approved-source-lines.json').write_text(json.dumps(rows,indent=2))
