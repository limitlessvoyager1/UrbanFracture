'use strict';
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const digest=(kind,b)=>crypto.createHash(kind).update(b).digest('hex');
function safe(p){return typeof p==='string'&&p.length>0&&!p.includes('\\')&&!path.isAbsolute(p)&&!p.split('/').some(q=>['.','..',''].includes(q))&&!/^[A-Za-z]:/.test(p);}
function canonical(file,bytes){if(!/\.(?:js|cjs|json|md|py)$/.test(file))return bytes;const s=bytes.toString('utf8');if(!Buffer.from(s).equals(bytes))throw Error('Invalid UTF8 planned source '+file);return Buffer.from(s.replace(/\r\n/g,'\n'));}
function pin(file,bytes){bytes=canonical(file,bytes);return{path:file,gitBlob:digest('sha1',Buffer.concat([Buffer.from('blob '+bytes.length+'\0'),bytes])),sha256:digest('sha256',bytes)};}
function inspect(root,registry,{exists=p=>fs.existsSync(p),read=p=>fs.readFileSync(p)}={}){
 const errors=[],pending=[],pins=new Map(),seen=new Set();
 for(const f of registry.features){const list=f.plannedSources||[];if(list.length&&f.certification!=='partial')errors.push('Planned-source feature must remain partial: '+f.id);
  for(const p of list){if(!p||Object.keys(p).sort().join(',')!=='gitBlob,path,sha256'||!safe(p.path)||!/^[a-f0-9]{40}$/.test(p.gitBlob)||!/^[a-f0-9]{64}$/.test(p.sha256)){errors.push('Invalid planned-source pin: '+f.id);continue;}
   const key=p.path.toLowerCase();if(seen.has(key)){errors.push('Duplicate planned-source path '+p.path);continue;}seen.add(key);if(!f.sources.some(s=>s===p.path||s.endsWith('/**')&&p.path.startsWith(s.slice(0,-2)))){errors.push('Planned-source path is not owned by '+f.id+': '+p.path);continue;}
   pins.set(p.path,p);const file=path.join(root,p.path);if(!exists(file)){pending.push({feature:f.id,path:p.path,status:'not-tested',reason:'Explicit hash-pinned source registration precedes implementation'});continue;}
   try{const actual=pin(p.path,read(file));if(actual.gitBlob!==p.gitBlob||actual.sha256!==p.sha256)errors.push('Planned-source content mismatch '+p.path);}catch(e){errors.push(e.message);}
  }
 }
 return{errors,pending,pins};
}
module.exports={inspect,pin,canonical};
