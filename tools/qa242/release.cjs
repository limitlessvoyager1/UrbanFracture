'use strict';
const crypto=require('node:crypto'),V=require('./validators.cjs');
function validateRelease(report,{spec,sourceFingerprint,criticalIssues=[],readLog}){
 const problems=[],rows=Array.isArray(report?.results)?report.results:[];
 if(report?.profile!=='release')problems.push('Release profile required.');
 if(report?.sourceFingerprint!==sourceFingerprint||report?.sourceChangedDuringTests!==false)problems.push('Missing, changed or stale source fingerprint.');
 const declared=new Map(spec.suites.map(s=>[s.id,s])),manual=new Set(spec.manualGates),seen=new Set();
 for(const r of rows){
  if(!r||seen.has(r.id)){problems.push('Invalid or duplicate result.');continue;}seen.add(r.id);
  if(!declared.has(r.id)&&!manual.has(r.id)&&r.id!=='screenshot-comparator-evidence')problems.push('Undeclared result: '+r.id);
  if(manual.has(r.id)&&r.status==='passed')problems.push('Manual approval ingestion is not implemented: '+r.id);
  if(declared.has(r.id)&&['passed','failed'].includes(r.status)){
   const expected='reports242/'+r.id+'.log';
   if(r.log!==expected)problems.push('Unexpected log path: '+r.id);
   else try{const hash=crypto.createHash('sha256').update(readLog(expected)).digest('hex');if(hash!==r.logSha256)problems.push('Missing or changed log receipt: '+r.id);}catch{problems.push('Missing log: '+r.id);}
   if(r.status==='passed'&&(r.exitCode!==0||r.error||r.signal))problems.push('Contradictory process result: '+r.id);
  }
 }
 for(const id of [...declared.keys(),...manual])if(!seen.has(id))problems.push('Missing result: '+id);
 const counts={executed:rows.filter(r=>['passed','failed'].includes(r?.status)).length,passed:rows.filter(r=>r?.status==='passed').length,failed:rows.filter(r=>r?.status==='failed').length,notExecuted:rows.filter(r=>r?.status==='not-executed').length};
 if(Object.entries(counts).some(([k,v])=>report?.counts?.[k]!==v))problems.push('Summary counts contradict results.');
 const normalized=rows.map(r=>({...r,critical:declared.has(r?.id)?declared.get(r.id).critical!==false:r?.critical}));
 const decision=V.gate(normalized,{required:spec.suites.filter(s=>s.profiles.includes('release')).map(s=>s.id),criticalIssues});
 if(report?.decision?.status!==decision.status)problems.push('Stored decision contradicts recomputed gate.');
 return{allowed:problems.length===0&&decision.status==='stable-candidate',decision,problems};
}
module.exports={validateRelease};
