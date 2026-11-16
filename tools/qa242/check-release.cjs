// Read-only release check: recompute results and verify source/log receipts.
'use strict';
const fs=require('node:fs'),path=require('node:path'),{fingerprint}=require('./fingerprint.cjs'),{validateRelease}=require('./release.cjs');
process.chdir(path.resolve(__dirname,'../..'));
try{
 const r=JSON.parse(fs.readFileSync('reports242/latest.json','utf8')),spec=require('../../qa/system242/suites.json');
 const criticalIssues=[...require('../../qa/system242/issues.json').issues.filter(q=>q.severity==='critical'&&q.status!=='resolved').map(q=>({...q,severity:'error'}))];
 for(const file of ['reports242/assets.json','reports242/scene-measurements.json'])if(fs.existsSync(file))criticalIssues.push(...JSON.parse(fs.readFileSync(file,'utf8')).issues);
 const result=validateRelease(r,{spec,sourceFingerprint:fingerprint(),criticalIssues,readLog:file=>fs.readFileSync(file)});
 if(!result.allowed){console.error('BLOCKED: '+JSON.stringify(result));process.exitCode=2;}
 else console.log('Automated stable-candidate gates satisfied. Human acceptance remains separate.');
}catch(error){console.error('BLOCKED: release evidence unavailable or malformed: '+error.message);process.exitCode=2;}
