// Read-only validation; no publication or protection side effects.
'use strict';
const fs=require('node:fs'),path=require('node:path'),{fingerprint}=require('./fingerprint.cjs'),{validateRelease}=require('./release.cjs'),E=require('./evidence.cjs'),I=require('./impact.cjs'),R=require('./report.cjs');
process.chdir(path.resolve(__dirname,'../..'));
(async()=>{try{
 const root=process.cwd(),args=process.argv.slice(2),reportPath=args.includes('--report')?args[args.indexOf('--report')+1]:'reports242/latest.json';if(!I.relative(reportPath))throw Error('Unsafe report path');
 const reportBytes=fs.readFileSync(reportPath),r=JSON.parse(reportBytes);if(!args.includes('--report')&&fs.existsSync('reports242/latest-run.json')){const latest=JSON.parse(fs.readFileSync('reports242/latest-run.json'));if(latest.status!=='complete'||latest.runId!==r.runId||latest.sha256!==E.hash(reportBytes))throw Error('Newest run is incomplete or report pointer is stale');}const spec=require('../../qa/system242/suites.json'),criticalIssues=require('../../qa/system242/issues.json').issues.filter(q=>q.severity==='critical'&&q.status!=='resolved').map(q=>({...q,severity:'error'}));
 let manualEvidence={},performanceEvidence=null;
 if(r.schema===2){
  const errors=R.validateReport(r);if(errors.length)throw Error(errors.join('; '));
  const declared=r.results.flatMap(q=>q.artifacts||[]);
  for(const a of r.findingEvidence||[]){if(!declared.some(q=>q.path===a.path&&q.sha256===a.sha256))throw Error('Unbound finding evidence');const data=JSON.parse(E.artifact(root,a));criticalIssues.push(...data.issues);}
  if(r.impact){const actual=I.createPlan({root,base:r.baseCommit,head:r.testedCommit,changeFile:r.impact.declaration.path});if(E.canonical(actual)!==E.canonical(r.impact))throw Error('Impact evidence changed');
   const bundle=JSON.parse(E.artifact(root,r.certificationBundle)),assessment=await E.assess({root,plan:actual,sourceFingerprint:fingerprint(),records:bundle.records,baselines:require('../../qa/system242/performance-baselines.json')});manualEvidence=assessment.verified;performanceEvidence=assessment.performance;
  }
 }else for(const file of ['reports242/assets.json','reports242/scene-measurements.json'])if(fs.existsSync(file))criticalIssues.push(...JSON.parse(fs.readFileSync(file,'utf8')).issues);
 const result=validateRelease(r,{spec,sourceFingerprint:fingerprint(),criticalIssues,manualEvidence,performanceEvidence,readLog:file=>{if(!I.relative(file))throw Error('Unsafe evidence path');return fs.readFileSync(E.safeReportPath(root,file));}});
 if(!result.allowed){console.error('BLOCKED: '+JSON.stringify(result));process.exitCode=2;}else console.log('All required source-bound gates and owner evidence verified; no merge or deployment performed.');
}catch(error){console.error('BLOCKED: release evidence unavailable or malformed: '+error.message);process.exitCode=2;}})();
