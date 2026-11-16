import pathlib,subprocess,difflib,json
rows={}
for file in subprocess.check_output(['git','diff','--name-only'],text=True).splitlines():
 if not file.startswith('dist/') or not file.endswith(('.js','.html','.css')):continue
 old=subprocess.check_output(['git','show','2d9ecd7e040eeb61901f8cbc3470f4d50faf03f6:'+file],text=True);new=pathlib.Path(file).read_text();a=old.splitlines(keepends=True);b=new.splitlines(keepends=True);edits=[]
 for tag,i,j,k,l in difflib.SequenceMatcher(None,a,b,autojunk=False).get_opcodes():
  if tag=='equal':continue
  before=''.join(a[i:j]);after=''.join(b[k:l]);assert after and new.count(after)==1,(file,tag);edits.append([before,after])
 rows[file.removeprefix('dist/')]=edits
pathlib.Path('tools/charge318/approved-source-lines.json').write_text(json.dumps(rows,indent=2))
