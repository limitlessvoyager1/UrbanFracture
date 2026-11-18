'use strict';
// Additions are review proposals, never an approved replacement for the base.
const A=require('node:assert/strict');
const equal=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
function extend({base,candidate,baseCatalog,catalog,read}){
 const changes=[],knownSuites=new Set(catalog.suites.map(s=>s.id)),owners=new Set(base.features.map(f=>f.owner));
 function append(old,next,label){A.ok(Array.isArray(next)&&next.length>=old.length&&equal(next.slice(0,old.length),old),'Base registry removal/reorder: '+label);const extra=next.slice(old.length);A.equal(new Set(next).size,next.length,'Duplicate registry value: '+label);if(extra.length)changes.push({field:label,added:extra});return extra;}
 function file(p){A.ok(typeof p==='string'&&p.length&&!p.includes('\\')&&!p.startsWith('/')&&!/^[A-Za-z]:/.test(p)&&!p.split('/').some(x=>!x||x==='.'||x==='..')&&!/[?*]/.test(p),'Registry additions require explicit safe paths: '+p);A.ok(Buffer.isBuffer(read(p)),'Proposed path is not a readable file: '+p);}
 for(const k of Object.keys(base))if(!['features','mandatorySmoke'].includes(k))A.ok(equal(candidate[k],base[k]),'Base registry field changed: '+k);
 A.deepEqual(Object.keys(candidate).sort(),Object.keys(base).sort(),'Registry structure changed');
 for(const s of baseCatalog.suites)A.ok(equal(catalog.suites.find(q=>q.id===s.id),s),'Existing suite definition changed: '+s.id);
 for(const id of append(base.mandatorySmoke,candidate.mandatorySmoke,'mandatorySmoke'))A.ok(knownSuites.has(id),'Unknown added mandatory suite '+id);
 const featureIds=new Set(candidate.features.map(f=>f.id));A.equal(featureIds.size,candidate.features.length,'Duplicate proposed feature');
 for(const old of base.features){const next=candidate.features.find(f=>f.id===old.id);A.ok(next,'Base feature removed: '+old.id);A.deepEqual(Object.keys(next).sort(),Object.keys(old).sort(),'Base feature shape changed: '+old.id);
  for(const k of Object.keys(old)){if(k==='entities'){A.deepEqual(Object.keys(next.entities).sort(),Object.keys(old.entities).sort());for(const e of Object.keys(old.entities))append(old.entities[e],next.entities[e],old.id+'.entities.'+e);}else if(Array.isArray(old[k])){const added=append(old[k],next[k],old.id+'.'+k);if(['sources','specs'].includes(k))for(const p of added)file(p);if(k==='suites')for(const id of added)A.ok(knownSuites.has(id),'Unknown added suite '+id);}else A.ok(equal(next[k],old[k]),'Base feature field changed: '+old.id+'.'+k);}
 }
 for(const f of candidate.features.filter(f=>!base.features.some(x=>x.id===f.id))){A.ok(owners.has(f.owner),'Unreviewed new feature owner: '+f.id);A.equal(f.certification,'partial','New content cannot approve itself');A.ok(f.sources.length&&f.specs.length&&f.suites.length&&f.visualScenarios.length&&f.contentIds.length,'Incomplete new feature '+f.id);for(const p of [...f.sources,...f.specs])file(p);for(const id of f.suites)A.ok(knownSuites.has(id),'Unknown new feature suite '+id);changes.push({feature:f.id,owner:f.owner,certification:'partial'});}
 return{registry:candidate,changes,ownerReviewRequired:true,certified:false};
}
module.exports={extend};
