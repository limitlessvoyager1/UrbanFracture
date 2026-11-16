'use strict';
// One QA242 orchestrator. It publishes no deployment and changes no GitHub settings.
const fs=require('node:fs'),path=require('node:path'),cp=require('node:child_process'),I=require('./impact.cjs'),{run}=require('./run.cjs');
async function main(){
 const root=path.resolve(__dirname,'../..'),dir=path.join(root,'reports242');fs.mkdirSync(dir,{recursive:true});
 const event=JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH,'utf8')),pr=event.pull_request,head=cp.execFileSync('git',['rev-parse','HEAD'],{cwd:root,encoding:'utf8'}).trim(),base=pr?.base.sha||event.inputs?.base_commit;
 const status={schema:1,baseCommit:base,testedCommit:head,status:'blocked',enforcement:'No branch protection enabled; pilot coverage and owner gates remain explicit'};
 try{
  if(pr&&head!==pr.head.sha)throw Error('Checkout does not match PR head');
  if(!/^[a-f0-9]{40,64}$/.test(base||''))throw Error('An exact comparison base commit is required');
  const changes=I.diff(root,base,head),candidates=changes.map(c=>c.path).filter(p=>/^qa\/system242\/changes\/[^/]+\.json$/.test(p)&&fs.existsSync(path.join(root,p))),changeFile=event.inputs?.change_file||(candidates.length===1?candidates[0]:null);
  if(!changeFile)throw Error('Exactly one changed declaration, or an explicit dispatch change_file, is required');
  const plan=I.createPlan({root,base,head,changeFile});fs.writeFileSync(path.join(dir,'impact-plan.json'),JSON.stringify(plan,null,2)+'\n');
  const major=plan.fullReleaseRequired||pr?.labels?.some(q=>['qa:major-integration','qa:release-candidate'].includes(q.name))||!pr;
  const result=await run({root,profile:major?'release':'initial',plan,baseCommit:base});status.status=result.report.recommendation==='Approve'?'passed':result.report.counts.failed?'failed':'needs-review';status.report='reports242/runs/'+result.report.runId+'/report.json';status.counts=result.report.counts;status.recommendation=result.report.recommendation;
  if(plan.acceptanceScope==='qa-infrastructure-pilot'&&pr){
   const P=require('./pilot.cjs'),E=require('./evidence.cjs'),report=result.report,checks=P.automated(report,require('../../qa/system242/suites.json'),{readArtifact:a=>E.artifact(root,a)});status.status=checks.status;status.changeAcceptance=checks;status.gameCertification=report.gameCertification;
   if(checks.status==='passed'){const runDir=path.join(root,'reports242/runs',report.runId),m=P.manifest(report,{repository:process.env.GITHUB_REPOSITORY,pullRequest:pr.number,workflowRun:process.env.GITHUB_RUN_ID,reportSha256:E.hash(fs.readFileSync(path.join(root,status.report)))}),bytes=JSON.stringify(m,null,2)+'\n',digest=E.hash(bytes);fs.writeFileSync(path.join(runDir,'pilot-evidence.json'),bytes,{flag:'wx'});fs.writeFileSync(path.join(runDir,'OWNER-ACCEPTANCE.txt'),P.template(m,digest)+'\n',{flag:'wx'});if(process.env.GITHUB_STEP_SUMMARY)fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY,'## QA pilot automation passed\n\nOwner comment required after evidence review. Game certification remains incomplete.\n\n```text\n'+P.template(m,digest)+'\n```\n');}
   process.exitCode=checks.status==='passed'?0:2;
  }else process.exitCode=result.exitCode|| (status.status==='passed'?0:2);
 }catch(error){status.reason=error.message;
  // Invalid declarations never suppress the mandatory shared checks.
  try{const registry=JSON.parse(fs.readFileSync(path.join(root,'qa/system242/features.json'))),result=await run({root,profile:'initial',selection:new Set(registry.mandatorySmoke),baseCommit:/^[a-f0-9]{40,64}$/.test(base||'')?base:head});status.smokeReport='reports242/runs/'+result.report.runId+'/report.json';}catch(smoke){status.smokeError=smoke.message;}
  process.exitCode=2;
 }finally{fs.writeFileSync(path.join(dir,'ci-status.json'),JSON.stringify(status,null,2)+'\n');console.log(JSON.stringify(status));}
}
if(require.main===module)main().catch(e=>{console.error(e.stack);process.exitCode=2;});
module.exports={main};
