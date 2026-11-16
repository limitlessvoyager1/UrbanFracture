'use strict';
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),{relative}=require('./impact.cjs');
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const canonical=q=>q===null||typeof q!=='object'?JSON.stringify(q):Array.isArray(q)?'['+q.map(canonical).join(',')+']':'{'+Object.keys(q).sort().map(k=>JSON.stringify(k)+':'+canonical(q[k])).join(',')+'}';
function safeReportPath(root,file,{realpath=fs.realpathSync,lstat=fs.lstatSync}={}){
 if(!relative(file)||!/^reports[^/]*\//.test(file))throw Error('Unsafe generated artifact '+file);
 let current=realpath(root);for(const part of file.split('/')){current=path.join(current,part);try{if(lstat(current).isSymbolicLink())throw Error('Report path contains a symlink/junction: '+file);}catch(error){if(error.code!=='ENOENT')throw error;}}
 return current;
}
function recordDigest(record){const {approval,approvedAt,...evidence}=record;return hash(canonical(evidence));}
function artifact(root,record){
 if(!relative(record.path)||!/^[a-f0-9]{64}$/.test(record.sha256))throw Error('Unsafe/malformed evidence artifact');
 const base=fs.realpathSync(root),file=fs.realpathSync(path.join(root,record.path));
 if(!file.startsWith(base+path.sep))throw Error('Evidence escapes workspace');
 const bytes=fs.readFileSync(file);if(hash(bytes)!==record.sha256)throw Error('Evidence hash mismatch: '+record.path);return bytes;
}
async function githubApproval(record,digest,{repository=process.env.GITHUB_REPOSITORY,token=process.env.GITHUB_TOKEN,fetcher=globalThis.fetch}={}){
 if(record.approval?.method==='owner-comment')return require('./game-evidence.cjs').verify(record,digest,{repository,token,fetcher});
 if(record.approval?.method&&record.approval.method!=='review')return{status:'blocked',reason:'Unknown approval method'};
 if(!repository||!token||!record.approval||!Number.isSafeInteger(record.approval.pullRequest)||record.approval.pullRequest<=0||!Number.isSafeInteger(record.approval.reviewId)||record.approval.reviewId<=0)return{status:'blocked',reason:'Authenticated review lookup unavailable'};
 if(!/^[\w.-]+\/[\w.-]+$/.test(repository))return{status:'blocked',reason:'Invalid repository identity'};
 try{
  const response=await fetcher('https://api.github.com/repos/'+repository+'/pulls/'+record.approval.pullRequest+'/reviews/'+record.approval.reviewId,{headers:{Authorization:'Bearer '+token,Accept:'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28'}});
  if(!response.ok)return{status:'blocked',reason:'Review lookup HTTP '+response.status};
  const review=await response.json(),marker='QA242-EVIDENCE: '+digest;
  return review.id===record.approval.reviewId&&review.user?.login===record.approvedBy&&review.state==='APPROVED'&&review.commit_id===record.testedCommit&&Number.isFinite(Date.parse(review.submitted_at))&&Date.parse(review.submitted_at)===Date.parse(record.approvedAt)&&review.body?.split(/\r?\n/).includes(marker)?{status:'passed',reviewId:review.id,approvedBy:review.user.login,approvedAt:review.submitted_at}:{status:'failed',reason:'Review identity, state, date, commit or evidence digest does not match'};
 }catch(error){return{status:'blocked',reason:'Review lookup unavailable: '+error.message};}
}
async function verifyRecord(record,{root,commit,sourceFingerprint,scope,approvers,scenarios=[],verifyApproval=githubApproval,readArtifact=a=>artifact(root,a)}){
 try{
  const errors=require('./schema.cjs').validate(record,require('../../qa/system242/certifications.schema.json').properties.records.items);if(errors.length)throw Error(errors.join('; '));
  if(record.testedCommit!==commit||record.sourceFingerprint!==sourceFingerprint)throw Error('Stale certification source');
  if(!approvers.includes(record.approvedBy)||!record.approvedAt||!Number.isFinite(Date.parse(record.approvedAt)))throw Error('Missing authorized approver/date');
  if(!Array.isArray(record.scope)||scope.some(id=>!record.scope.includes(id)))throw Error('Incomplete certification scope');
  if(scenarios.some(id=>!record.scenarios?.includes(id)))throw Error('Missing rendered scenario');
  if(!Array.isArray(record.artifacts)||!record.artifacts.length)throw Error('Missing actual evidence');
  const bytes=record.artifacts.map(a=>{if(!relative(a.path)||!/^[a-f0-9]{64}$/.test(a.sha256))throw Error('Malformed evidence path/hash');const b=readArtifact(a);if(hash(b)!==a.sha256)throw Error('Evidence hash mismatch');return b;});
  if(record.kind==='performance'||record.kind==='performance-baseline'){
   const benchmarks=record.artifacts.map((a,i)=>a.kind==='benchmark-json'?JSON.parse(bytes[i]):null).filter(Boolean);
   if(!benchmarks.some(q=>canonical(q.metrics)===canonical(record.metrics)&&q.samples===record.samples&&q.targetHash===record.targetHash&&q.environmentHash===record.environmentHash))throw Error('Benchmark fields do not match measured artifact');
  }
  if(record.kind==='visual'&&!bytes.some(b=>b.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]))||b.subarray(0,4).toString()==='RIFF'&&b.subarray(8,12).toString()==='WEBP'))throw Error('Visual certification needs actual raster capture');
  const approval=await verifyApproval(record,recordDigest(record));
  return approval.status==='passed'?{status:'passed',id:record.id,kind:record.kind,digest:recordDigest(record),approval}:{status:approval.status==='blocked'?'blocked':'failed',id:record.id,reason:approval.reason};
 }catch(error){return{status:'failed',id:record?.id,reason:error.message};}
}
const metrics=['meanMs','p95Ms','worstMs','memoryBytes','renderMs','aiMs'];
function comparePerformance(candidate,baseline,target){
 const problems=[],targetHash=hash(canonical(target));
 if(!target?.id||candidate.targetId!==target.id||baseline.targetId!==target.id||candidate.targetHash!==targetHash||baseline.targetHash!==targetHash||!(/^[a-f0-9]{64}$/.test(candidate.environmentHash))||candidate.environmentHash!==baseline.environmentHash)problems.push('Pinned hardware/environment/approved target does not match');
 for(const key of metrics){const a=candidate.metrics?.[key],b=baseline.metrics?.[key],limit=target?.maximumRatios?.[key];if(!Number.isFinite(a)||a<0||!Number.isFinite(b)||b<0||!Number.isFinite(limit)||limit<=0)problems.push('Missing/invalid metric or approved limit: '+key);else if(a>b*limit)problems.push('Performance regression: '+key);}
 if(!Number.isSafeInteger(target?.minimumSamples)||target.minimumSamples<1||candidate.samples<target.minimumSamples||baseline.samples<target.minimumSamples||!Number.isSafeInteger(candidate.samples)||!Number.isSafeInteger(baseline.samples))problems.push('Insufficient benchmark samples');
 return{status:problems.length?'failed':'passed',problems,candidate:candidate.metrics,baseline:baseline.metrics,targetId:target?.id};
}
async function assess({root,plan,sourceFingerprint,records=[],baselines={target:null,approved:[]},verifyApproval=githubApproval,readArtifact}){
 const rows=[],verified={};
 const requirements=[['approved-screenshots','visual',plan.requirements.visual],['art-style-review','art-style',plan.requirements.visual],['all-moves-coverage','all-moves',true],['physical-dualsense','physical-controller',plan.requirements.physicalController],['human-balance','human-balance',plan.affectedFeatures.includes('shared-combat-admission')]];
 for(const [id,kind,required]of requirements){
  const matching=records.filter(r=>r.kind===kind);
  if(!matching.length){rows.push({id,status:required?'blocked':'not-tested',critical:false,reason:'No owner-approved '+kind+' evidence; not automatically certified'});continue;}
  const checks=await Promise.all(matching.map(record=>verifyRecord(record,{root,commit:plan.testedCommit,sourceFingerprint,scope:plan.affectedFeatures,approvers:plan.approvers,scenarios:kind==='visual'?plan.requirements.visualScenarios:[],verifyApproval,readArtifact})));
  const passed=checks.find(q=>q.status==='passed');rows.push({id,status:passed?'passed':checks.some(q=>q.status==='failed')?'failed':'blocked',critical:required,evidence:checks});if(passed)verified[id]=passed;
 }
 let performance={status:'not-tested',reason:'No applicable performance requirement'};
 if(plan.requirements.performance){
  const candidate=records.find(r=>r.kind==='performance'),baseline=baselines.approved.find(r=>r.id===candidate?.baselineId);
  performance={status:'blocked',reason:'Approved hardware target, baseline and candidate evidence are required'};
  if(candidate&&baseline&&baselines.target){
   const c=await verifyRecord(candidate,{root,commit:plan.testedCommit,sourceFingerprint,scope:plan.affectedFeatures,approvers:plan.approvers,verifyApproval,readArtifact}),b=await verifyRecord(baseline,{root,commit:baseline.testedCommit,sourceFingerprint:baseline.sourceFingerprint,scope:plan.affectedFeatures,approvers:plan.approvers,verifyApproval,readArtifact});
   if(c.status==='passed'&&b.status==='passed')performance=comparePerformance(candidate,baseline,baselines.target);else performance={status:c.status==='failed'||b.status==='failed'?'failed':'blocked',reason:'Benchmark approval/artifacts unavailable or invalid',checks:[c,b]};
  }
 }
 return{rows,verified,performance};
}
function classifyProcess(r){return r.error||r.signal||r.status===null||r.status===2||r.status===0&&/^# (?:skipped|todo) [1-9][0-9]*\s*$/m.test(r.stdout||'')?'blocked':r.status===0?'passed':'failed';}
async function verifyBaselineEnvelope(envelope,{root,baseCommit,scope,approvers,verifyApproval=githubApproval}){
 const report=envelope?.report,certificate=envelope?.certificate;
 if(!report||!certificate||certificate.kind!=='baseline-report'||report.testedCommit!==baseCommit||report.sourceChangedDuringTests!==false)return{verified:false,reason:'No authenticated, source-bound baseline report'};
 const check=await verifyRecord(certificate,{root,commit:baseCommit,sourceFingerprint:report.sourceFingerprint,scope,approvers,verifyApproval});
 const matches=check.status==='passed'&&certificate.artifacts.some(a=>{try{return a.kind==='qa-report-json'&&canonical(JSON.parse(artifact(root,a)))===canonical(report);}catch{return false;}});
 return{verified:!!matches,report:matches?report:null,reason:matches?'Authenticated base report':'Baseline approval/report receipt unavailable or mismatched'};
}
function attribution(result,baseline,{baseCommit,environment,baselineVerified=false}){
 if(result.status!=='failed')return'not-applicable';
 if(!baselineVerified||!baseline||baseline.testedCommit!==baseCommit||canonical(baseline.environment)!==canonical(environment))return'unknown';
 const previous=baseline.results?.find(r=>r.id===result.id&&canonical(r.command)===canonical(result.command));
 if(previous?.status==='passed')return'new';
 return previous?.status==='failed'&&previous.logSha256===result.logSha256?'preexisting':'unknown';
}
module.exports={hash,canonical,recordDigest,artifact,githubApproval,verifyRecord,comparePerformance,assess,classifyProcess,attribution,verifyBaselineEnvelope,safeReportPath};
