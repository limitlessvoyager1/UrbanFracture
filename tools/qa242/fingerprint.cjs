const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).filter(e=>!['__pycache__','node_modules'].includes(e.name)).sort((a,b)=>a.name.localeCompare(b.name)).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);}
function fingerprint(root=path.resolve(__dirname,'../..')){
 const h=crypto.createHash('sha256'),files=[];
 // Helpers outside qa242 and render package policies are actual test inputs.
 for(const dir of ['dist','tools','qa','tests','design','templates'])if(fs.existsSync(path.join(root,dir)))files.push(...walk(path.join(root,dir)));
 for(const entry of fs.readdirSync(root,{withFileTypes:true})){
  if(entry.isFile()&&(/\.md$/.test(entry.name)||/^(?:package(?:-lock)?\.json|PACKAGE-MANIFEST\.json)$/.test(entry.name)))files.push(path.join(root,entry.name));
  if(entry.isDirectory()&&/^reports\d+$/.test(entry.name)&&fs.existsSync(path.join(root,entry.name,'package.json')))files.push(path.join(root,entry.name,'package.json'));
 }
 for(const p of files.sort()){const bytes=fs.readFileSync(p);h.update(path.relative(root,p).split(path.sep).join('/')+'\0'+bytes.length+'\0');h.update(bytes);}
 return h.digest('hex');
}
module.exports={fingerprint};
