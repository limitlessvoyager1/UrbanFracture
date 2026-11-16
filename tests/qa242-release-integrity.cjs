'use strict';
const {test}=require('node:test'),A=require('node:assert/strict'),crypto=require('node:crypto'),{validateRelease}=require('../tools/qa242/release.cjs');
const log=Buffer.from('fixture output'),hash=crypto.createHash('sha256').update(log).digest('hex');
const spec={suites:[{id:'combat',profiles:['release'],critical:true}],manualGates:[]};
function report(){return{profile:'release',sourceFingerprint:'source',sourceChangedDuringTests:false,results:[{id:'combat',status:'passed',exitCode:0,signal:null,error:null,log:'reports242/combat.log',logSha256:hash}],counts:{executed:1,passed:1,failed:0,notExecuted:0},decision:{status:'needs-review'}};}
function check(r,extra={}){return validateRelease(r,{spec,sourceFingerprint:'source',readLog:()=>log,...extra});}
test('honest incomplete receipt remains review; forged stable summary cannot promote it',()=>{
 const r=report();A.deepEqual(check(r).problems,[]);A.equal(check(r).allowed,false);r.results[0].status='failed';r.results[0].critical=false;r.decision.status='stable-candidate';const result=check(r);A.equal(result.allowed,false);A.equal(result.decision.status,'blocked');A.ok(result.problems.some(p=>p.includes('counts')));A.ok(result.problems.some(p=>p.includes('decision')));
});
test('missing, tampered, traversing and contradictory logs fail closed',()=>{
 const r=report();for(const mutate of [r=>r.results[0].logSha256='fake',r=>r.results[0].log='../other.log',r=>r.results[0].exitCode=1,r=>r.results[0].signal='SIGTERM',r=>r.results=[]]){const q=structuredClone(r);mutate(q);A.ok(check(q).problems.length);}
 A.ok(check(r,{readLog:()=>{throw Error('missing');}}).problems.length);
});
test('stale source, unknown and duplicate receipts cannot pass',()=>{
 const r=report();A.ok(check(r,{sourceFingerprint:'changed'}).problems.length);r.results.push({...r.results[0]});A.equal(check(r).decision.status,'blocked');r.results.pop();r.results.push({id:'unexpected',status:'passed'});A.ok(check(r).problems.some(p=>p.includes('Undeclared')));
});
test('manual approval cannot be manufactured by changing its result row',()=>{
 const r=report();r.results.push({id:'physical-dualsense',status:'passed'});const result=check(r,{spec:{...spec,manualGates:['physical-dualsense']}});A.ok(result.problems.some(p=>p.includes('Manual approval')));A.equal(result.allowed,false);
});
