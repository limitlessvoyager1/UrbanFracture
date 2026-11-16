'use strict';
const fs=require('node:fs'),path=require('node:path'),cp=require('node:child_process'),P=require('./pilot.cjs'),E=require('./evidence.cjs'),I=require('./impact.cjs'),{fingerprint}=require('./fingerprint.cjs');
async function main(){
 const root=path.resolve(__dirname,'../..'),args=process.argv.slice(2),dir=args[0];
 const selected=P.selectArtifact(dir,process.env.GITHUB_RUN_ID),roots=[selected,path.join(selected,'reports242')].filter(p=>fs.existsSync(path.join(p,'latest-run.json')));
 if(roots.length!==1)throw Error('Missing or ambiguous latest evidence pointer');
 const evidence=roots[0],read=a=>{if(!I.relative(a.path)||!a.path.startsWith('reports242/'))throw Error('Unsafe evidence path');const relative=a.path.slice('reports242/'.length),file=path.resolve(evidence,relative),resolved=fs.realpathSync(file);if(!resolved.startsWith(fs.realpathSync(evidence)+path.sep))throw Error('Evidence escapes artifact');const bytes=fs.readFileSync(file);if(E.hash(bytes)!==a.sha256)throw Error('Evidence hash mismatch: '+a.path);return bytes;};
 const pointer=JSON.parse(fs.readFileSync(path.join(evidence,'latest-run.json')));if(pointer.status!=='complete'||pointer.report!=='reports242/runs/'+pointer.runId+'/report.json')throw Error('Incomplete/stale evidence pointer');
 const reportBytes=read({path:pointer.report,sha256:pointer.sha256}),report=JSON.parse(reportBytes),head=cp.execFileSync('git',['rev-parse','HEAD'],{cwd:root,encoding:'utf8'}).trim();
 const event=JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH)),pr=event.pull_request;if(!pr||head!==pr.head.sha||report.testedCommit!==head||report.baseCommit!==pr.base.sha||pointer.runId!==report.runId||fingerprint(root)!==report.sourceFingerprint)throw Error('Evidence source/PR changed');
 const actual=I.createPlan({root,base:pr.base.sha,head,changeFile:report.impact.declaration.path});if(E.canonical(actual)!==E.canonical(report.impact))throw Error('Impact plan changed');
 const checks=P.automated(report,require('../../qa/system242/suites.json'),{readArtifact:read});if(checks.status!=='passed')throw Error(checks.problems.join('; '));
 const context={repository:process.env.GITHUB_REPOSITORY,pullRequest:pr.number,workflowRun:process.env.GITHUB_RUN_ID,reportSha256:pointer.sha256},expected=P.manifest(report,context),manifestPath=path.join(evidence,'runs',report.runId,'pilot-evidence.json'),bytes=fs.readFileSync(manifestPath);
 if(bytes.toString()!==JSON.stringify(expected,null,2)+'\n')throw Error('Pilot evidence manifest changed');
 const digest=E.hash(bytes),result=await P.ownerComment(expected,digest);console.log(JSON.stringify({automated:checks.status,ownerAcceptance:result,gameCertification:{certified:false,decision:report.decision},evidenceSha256:digest}));
 if(process.env.GITHUB_STEP_SUMMARY)fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY,'## QA-only pilot owner acceptance\n\n'+result.status+': '+(result.reason||result.comment)+'\n\nPost this exact comment on the PR after reviewing the evidence, then rerun this failed job only:\n\n```text\n'+P.template(expected,digest)+'\n```\n\nGame certification remains incomplete.\n');
 process.exitCode=result.status==='passed'?0:2;
}
if(require.main===module)main().catch(e=>{console.error(e.stack);process.exitCode=2;});
module.exports={main};
