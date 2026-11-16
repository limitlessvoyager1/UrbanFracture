'use strict';const fs=require('fs'),vm=require('vm'),sb={};sb.window=sb;sb.globalThis=sb;vm.createContext(sb);for(const f of ['nightshade-art252.js','nightshade-gun-art255.js','nightshade-melee-art257.js','nightshade-grab-art258.js','nightshade-special-art263.js','nightshade-counter-art264.js','nightshade-weapon276-data.js','nightshade-art344.js','nightshade-art349.js','nightshade-blitz352-data.js'])vm.runInContext(fs.readFileSync('dist/'+f,'utf8'),sb);
const rows=[];const add=(id,q,path,rect)=>{if(!path)return;rows.push({id,path:path.split('?')[0],rect:rect||q.rect||[0,0,q.w,q.h]});};
for(const [i,q]of sb.NightshadeArt252.frames.entries())add('base/'+i,q,q.src);
for(const [i,q]of sb.NightshadeGunArt255.frames.entries())add('gun/'+i,q,q.src);
for(const [key,list]of Object.entries(sb.NightshadeMeleeArt257))for(const [i,q]of list.entries())add('legacy-'+key+'/'+i,q,q.src);
for(const [i,q]of sb.NightshadeWeapon276Data.entries())add('weapon/'+i,q,q.src);
for(const [i,q]of sb.NightshadeWeapon276Motion.entries())add('weapon-motion/'+i,q,q.src);
const A=sb.NightshadeArt348;for(const [key,list]of Object.entries(A.frames)){if(!A.images[key]||key.includes('enemy')||key.includes('victim'))continue;for(const [i,q]of list.entries())add(key+'/'+i,q,A.images[key]);}
for(const [i,q]of sb.NightshadeArt344.entries())add('experimental/'+i,q,'assets/experimental344/nightshade.webp');
const unique=[];const seen=new Set();for(const q of rows){const key=q.path+'|'+q.rect.join(',');if(!seen.has(key)){seen.add(key);unique.push(q);}}
fs.writeFileSync('reports360/sources.json',JSON.stringify(unique,null,2));console.log('Nightshade source slots',unique.length,'masters',Math.ceil(unique.length/32));
