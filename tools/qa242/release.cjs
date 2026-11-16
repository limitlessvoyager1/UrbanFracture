'use strict';
const crypto=require('node:crypto'),V=require('./validators.cjs');
function validateRelease(report,{spec,sourceFingerprint,criticalIssues=[],readLog,manualEvidence={},performanceEvidence=null}){
 const problems=[];if(report?.acceptanceScope==='qa-infrastructure-pilot'||report?.impact?.acceptanceScope==='qa-infrastructure-pilot')problems.push('QA-only pilot acceptance cannot certify a game release.');const rows=Array.isArray(report?.results)?report.results:[];
 if(report?.profile!=='release')problems.push('Release profile required.');
 if(report?.sourceFingerprint!==sourceFingerprint||report?.sourceChangedDuringTests!==false)problems.push('Missing, changed or stale source fingerprint.');
 const declared=new Map(spec.suites.map(s=>[s.id,s])),manual=new Set(spec.manualGates),seen=new Set();
 for(const r of rows){
  if(!r||seen.has(r.id)){problems.push('Invalid or duplicate result.');continue;}seen.add(r.id);
  if(!declared.has(r.id)&&!manual.has(r.id)&&!['screenshot-comparator-evidence','performance-certification'].includes(r.id))problems.push('Undeclared result: '+r.id);
  if(manual.has(r.id)&&r.status==='passed'&&(!manualEvidence[r.id]||manualEvidence[r.id].status!=='passed'||!r.evidence?.some(q=>q.digest===manualEvidence[r.id].digest&&q.status==='passed')))problems.push('Manual approval is not authenticated: '+r.id);
  if(r.id==='performance-certification'&&(!performanceEvidence||r.status!==performanceEvidence.status))problems.push('Performance evidence is not independently verified');
  if(declared.has(r.id)&&['passed','failed','blocked'].includes(r.status)){
   const expected=report.runId?'reports242/runs/'+report.runId+'/logs/'+r.id+'.log':'reports242/'+r.id+'.log';
   if(r.log!==expected)problems.push('Unexpected log path: '+r.id);
   else try{const hash=crypto.createHash('sha256').update(readLog(expected)).digest('hex');if(hash!==r.logSha256)problems.push('Missing or changed log receipt: '+r.id);}catch{problems.push('Missing log: '+r.id);}
   if(r.status==='passed'&&(r.exitCode!==0||r.error||r.signal))problems.push('Contradictory process result: '+r.id);
   if(JSON.stringify(r.command)!==JSON.stringify(declared.get(r.id).command))problems.push('Suite command differs from current policy: '+r.id);
   for(const a of r.artifacts||[]){if(!report.runId||!a.path.startsWith('reports242/runs/'+report.runId+'/artifacts/'+r.id+'/')||a.path.includes('..')||a.path.includes('\\'))problems.push('Unexpected artifact path: '+r.id);else try{if(crypto.createHash('sha256').update(readLog(a.path)).digest('hex')!==a.sha256)problems.push('Changed artifact: '+a.path);}catch{problems.push('Missing artifact: '+a.path);}}
  }
 }
 for(const id of [...declared.keys(),...manual])if(!seen.has(id))problems.push('Missing result: '+id);
 if(report?.runId&&!/^[0-9TZ]+-[a-f0-9]{8}$/.test(report.runId))problems.push('Malformed immutable run ID');
 const counts={executed:rows.filter(r=>['passed','failed'].includes(r?.status)).length,passed:rows.filter(r=>r?.status==='passed').length,failed:rows.filter(r=>r?.status==='failed').length,notExecuted:rows.filter(r=>['not-tested','not-executed'].includes(r?.status)).length};
 if(Object.entries(counts).some(([k,v])=>report?.counts?.[k]!==v))problems.push('Summary counts contradict results.');
 const normalized=rows.map(r=>({...r,critical:declared.has(r?.id)?declared.get(r.id).critical!==false:r?.critical}));
 const decision=V.gate(normalized,{required:spec.suites.filter(s=>s.profiles.includes('release')).map(s=>s.id),criticalIssues});
 if(report?.decision?.status!==decision.status)problems.push('Stored decision contradicts recomputed gate.');
 if(report?.schema===2&&(!report.impact||report.impact.status!=='planned'||report.impact.coverage!=='complete'||report.recommendation!=='Approve'||report.uncommittedInputs?.length))problems.push('Policy/coverage/owner evidence is incomplete');
 return{allowed:problems.length===0&&decision.status==='stable-candidate',decision,problems};
}
module.exports={validateRelease};
