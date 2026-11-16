'use strict';
// Pilot acceptance never certifies a game release or changes repository settings.
const fs=require('node:fs'),path=require('node:path');
const scope='qa-infrastructure-pilot';
function scopeProblems(declaration,files){
 if(declaration.acceptanceScope!==scope)return[];
 const allowed=p=>['AGENTS.md','QA242-POLICY.md','QA242-RUNBOOK.md','QA242-ARCHITECTURE.md','.github/workflows/qa242.yml'].includes(p)||/^(?:tools\/qa242\/|qa\/system242\/)/.test(p)||/^tests\/qa242[^/]*\.cjs$/.test(p);
 const problems=files.filter(p=>!allowed(p)||p.split('/').some(q=>['..','.',''].includes(q))||p.includes('\\')).map(p=>'Outside QA-only pilot scope: '+p);
 if(declaration.newContent.length||Object.values(declaration.risks).some(Boolean)||declaration.features.some(q=>q!=='qa242')||['characters','moves','levels'].some(k=>declaration.entities[k].length)||declaration.entities.systems.some(q=>q!=='qa242'))problems.push('QA-only pilot cannot include game content, entities or risk flags');
 return problems;
}
function automated(report,spec,{readArtifact}={}){
 const E=require('./evidence.cjs');
 const problems=[],plan=report.impact,rows=report.results||[];
 if(plan?.historyReplacement){const h=plan.historyReplacement;try{if(E.canonical(report.historyReplacement)!==E.canonical(h))throw Error('Replacement report binding changed');if(h.id!=='qa242-missing-history-v1'||h.gameCertified!==false||h.historicalEvidence!=='blocked'||h.status!=='owner-review-pending'||!/^[a-f0-9]{64}$/.test(h.sha256)||h.mappings.length!==4)throw Error('Malformed replacement contract');const expected=require('./history-contract.cjs').expected;if(E.canonical(h.mappings.map(m=>[m.historicalSuite,m.currentSuite,m.mode,m.missingCommit]))!==E.canonical(expected))throw Error('Unknown replacement mapping');for(const m of h.mappings){const old=rows.find(q=>q.id===m.historicalSuite);if(plan.selection.includes(m.historicalSuite)||!plan.selection.includes(m.currentSuite)||old?.status!=='not-tested'||!old.reason?.startsWith('Historical evidence unavailable;'))throw Error('Historical replacement selection/result changed');}}catch(e){problems.push(e.message);}}
 if(plan?.acceptanceScope!==scope||plan.status==='blocked'||plan.problems?.length)problems.push('Valid QA-only pilot plan required');
 if(!plan?.selection?.length)problems.push('Required suite selection is missing');
 if(report.sourceChangedDuringTests!==false||report.uncommittedInputs?.length||!Array.isArray(report.uncommittedInputs))problems.push('Clean unchanged source required');
 if(report.visualIssues?.some(q=>['error','critical'].includes(q.severity)))problems.push('Unresolved critical findings');
 if(new Set(rows.map(q=>q.id)).size!==rows.length)problems.push('Duplicate results');
 for(const id of plan?.selection||[]){
  const row=rows.find(q=>q.id===id),suite=spec.suites.find(q=>q.id===id);
  if(!suite||!row||row.status!=='passed'||row.exitCode!==0||row.signal||row.error||E.canonical(row.command)!==E.canonical(suite.command)){problems.push('Required suite did not pass: '+id);continue;}
  if(row.log!=='reports242/runs/'+report.runId+'/logs/'+id+'.log'||!/^[a-f0-9]{64}$/.test(row.logSha256||'')){problems.push('Missing bound log: '+id);continue;}
  if(readArtifact)try{const log=readArtifact({path:row.log,sha256:row.logSha256});if(E.classifyProcess({status:0,stdout:log.toString()})!=='passed'||/^# fail [1-9][0-9]*\s*$/m.test(log.toString()))throw Error('Failed or skipped nested checks');for(const a of row.artifacts||[])readArtifact(a);}catch(e){problems.push(id+': '+e.message);}
 }
 for(const row of rows)if(row.command&&['failed','blocked'].includes(row.status))problems.push('Executed suite did not pass: '+row.id);
 return{status:problems.length?'blocked':'passed',problems,scope,gameCertified:false,ownerAcceptance:'pending'};
}
function manifest(report,context){
 return{schema:1,scope,repository:context.repository,pullRequest:Number(context.pullRequest),workflowRun:String(context.workflowRun),baseCommit:report.baseCommit,testedCommit:report.testedCommit,sourceFingerprint:report.sourceFingerprint,runId:report.runId,reportSha256:context.reportSha256,impact:report.impact,requiredResults:report.results.filter(q=>report.impact.selection.includes(q.id)),limitations:report.remainingRisks,gameCertified:false,...(report.impact?.historyReplacement?{historyReplacement:report.impact.historyReplacement}:{})};
}
const acknowledgement='QA-only pilot; game certification remains incomplete; no gameplay changes; no branch protection; no merge';
function template(m,digest,action='ACCEPT'){return['QA242-PILOT-ACCEPTANCE: '+action,'Repository: '+m.repository,'PR: '+m.pullRequest,'Base: '+m.baseCommit,'Head: '+m.testedCommit,'Evidence-SHA256: '+digest,'Scope: '+scope,'Acknowledgement: '+acknowledgement,...(m.historyReplacement?['Replacement-Contract: '+m.historyReplacement.id,'Replacement-Contract-SHA256: '+m.historyReplacement.sha256,'Missing-History-Acknowledgement: '+require('./history-contract.cjs').acknowledgement]:[])].join('\n');}
async function ownerComment(m,digest,{get,token=process.env.GITHUB_TOKEN}={}){
 if(!token)return{status:'blocked',reason:'Authenticated GitHub read access required'};
 get=get||(async route=>{const r=await fetch('https://api.github.com/repos/'+m.repository+route,{headers:{Authorization:'Bearer '+token,Accept:'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28'}});if(!r.ok)throw Error('GitHub read failed: '+r.status);return r.json();});
 try{
  if(!/^[\w.-]+\/[\w.-]+$/.test(m.repository)||!Number.isSafeInteger(m.pullRequest)||m.pullRequest<1)throw Error('Invalid repository/PR');
  const repo=await get(''),pr=await get('/pulls/'+m.pullRequest);
  if(repo.full_name!==m.repository||repo.owner?.type!=='User'||pr.number!==m.pullRequest||pr.state!=='open'||pr.base?.repo?.id!==repo.id||pr.head?.sha!==m.testedCommit||pr.base?.sha!==m.baseCommit)throw Error('Repository/PR source binding changed');
  let comments=[];for(let page=1;;page++){if(page>1000)throw Error('Comment pagination limit');const batch=await get('/issues/'+m.pullRequest+'/comments?per_page=100&page='+page);if(!Array.isArray(batch))throw Error('Invalid comments response');comments.push(...batch);if(batch.length<100)break;}
  const candidates=comments.filter(q=>q.user?.id===repo.owner.id&&q.user?.login===repo.owner.login&&q.user?.type==='User'&&q.body?.includes('QA242-PILOT-ACCEPTANCE:')).sort((a,b)=>Date.parse(b.updated_at)-Date.parse(a.updated_at)||b.id-a.id);
  const latest=candidates[0];if(!latest)return{status:'needs-review',reason:'Repository owner must post the exact acceptance template'};
  if(latest.issue_url!=='https://api.github.com/repos/'+m.repository+'/issues/'+m.pullRequest||latest.body.replace(/\r\n/g,'\n').trim()!==template(m,digest))return{status:'blocked',reason:'Latest owner signoff is revoked, malformed or bound to different evidence/source',comment:latest.html_url};
  return{status:'passed',comment:latest.html_url,commentId:latest.id,owner:repo.owner.login,scope,gameCertified:false};
 }catch(error){return{status:'blocked',reason:error.message};}
}
function selectArtifact(dir,run){const matches=fs.readdirSync(dir).map(name=>({name,match:name.match(/^qa242-([0-9]+)-([0-9]+)$/)})).filter(q=>q.match&&q.match[1]===String(run)).sort((a,b)=>Number(b.match[2])-Number(a.match[2]));if(!matches.length)throw Error('No automated evidence artifact for this workflow run');return path.join(dir,matches[0].name);}
module.exports={scope,scopeProblems,automated,manifest,template,ownerComment,selectArtifact};
