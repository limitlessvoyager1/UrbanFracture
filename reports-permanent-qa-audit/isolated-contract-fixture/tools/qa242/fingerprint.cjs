const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).filter(e=>!['__pycache__','node_modules'].includes(e.name)).sort((a,b)=>a.name.localeCompare(b.name)).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);}
function fingerprint(root=path.resolve(__dirname,'../..')){const h=crypto.createHash('sha256');for(const dir of['dist','tools/qa242','qa/system242','tests'])for(const p of walk(path.join(root,dir))){h.update(path.relative(root,p));h.update(fs.readFileSync(p));}return h.digest('hex');}
module.exports={fingerprint};
