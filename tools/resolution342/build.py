"""Lossless deployment packaging. dist remains the editable/tested source."""
from pathlib import Path
import json,lzma,hashlib,shutil
R=Path(__file__).resolve().parents[2];out=R/'out'
if out.exists():shutil.rmtree(out)
out.mkdir()
files={p.relative_to(R/'dist').as_posix():p.read_text() for p in sorted((R/'dist').rglob('*.js'))}
assert all((R/'dist'/p).read_bytes()==v.encode() for p,v in files.items())
raw=json.dumps(files,ensure_ascii=False,separators=(',',':')).encode();packed=lzma.compress(raw,format=lzma.FORMAT_ALONE,preset=9)
# Source identity is checked before any packaging output is accepted.
assert lzma.decompress(packed,format=lzma.FORMAT_ALONE)==raw
for p in (R/'dist').rglob('*'):
 if p.is_file():
  target=out/p.relative_to(R/'dist');target.parent.mkdir(parents=True,exist_ok=True)
  if p.suffix=='.js':
   key=json.dumps(p.relative_to(R/'dist').as_posix());call='UF342('+key+');'
   first='<script>'+call+'</script>'
   target.write_text('if(!globalThis.UF342){document.write('+json.dumps('<script src="__code342.js"></script>')+');document.write('+json.dumps(first)+');}else '+call)
  else:shutil.copy2(p,target)
shutil.copy2(R/'tools/resolution342/LICENSE-lzma.txt',out/'__lzma-license.txt')
(out/'__source342.lzma').write_bytes(packed)
lib=(R/'tools/resolution342/node_modules/lzma/src/lzma-d-min.js').read_text()
loader='''(function(){const api={};(function(){LIB}).call(api);const x=new XMLHttpRequest();x.open('GET',new URL('__source342.lzma',document.currentScript.src).href,false);x.overrideMimeType('text/plain; charset=x-user-defined');x.send();if(x.status!==200)throw Error('Source archive unavailable: '+x.status);const bytes=Array.from(x.responseText,c=>c.charCodeAt(0)&255),code=JSON.parse(api.LZMA.decompress(bytes));globalThis.UF342=function(file){if(!Object.prototype.hasOwnProperty.call(code,file))throw Error('Unknown compiled script '+file);document.write('<script>'+code[file].replace(/<\\/script/gi,'<\\\\/script')+'\\n//# sourceURL='+file+'<\\/script>');};})();'''.replace('LIB',lib)
(out/'__code342.js').write_text(loader)
proof={'format':'LZMA-alone JSON source table; synchronous parser-time script insertion','sourceFiles':len(files),'originalScriptBytes':sum(len(v.encode()) for v in files.values()),'packedScriptBytes':len(packed),'allSourceStringsEqual':True,'source':{k:hashlib.sha256(v.encode()).hexdigest() for k,v in files.items()},'artwork':'Every non-JavaScript dist file copied byte-for-byte.'}
(R/'reports342/package-source.json').write_text(json.dumps(proof,indent=2)+'\n')
print('BUILD342 scripts',len(files),'packed',len(packed),'of',proof['originalScriptBytes'])
