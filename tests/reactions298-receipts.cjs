'use strict';
const A=require('node:assert/strict'),{test}=require('node:test'),R=require('../tools/reactions298/receipts.cjs');
const bytes=Buffer.from('approved source\n'),response=(stdout='',status=0,stderr='')=>({status,stdout:Buffer.from(stdout),stderr:Buffer.from(stderr)});
function fixture({missing=[],changed=[],readError=false,adapterError=false,showError=false,queryError=false}={}){
 let reads=0,adapters=0;const calls=[];
 const result=R.collect({
  run(command,args,options){calls.push({command,args,input:options.input});if(args[0]==='cat-file')return response(queryError?'bad response\n':[R.commit+' commit 12',...R.files.map(file=>missing.includes(file)?R.commit+':dist/'+file+' missing':'a'.repeat(40)+' blob '+bytes.length)].join('\n')+'\n');if(showError)return response('',1,'permission denied');return response(bytes);},
  readFile(file){reads++;if(readError)throw Error('source read failed');return changed.includes(file.slice(5))?'changed source\n':bytes.toString();},
  approved(file,source){adapters++;if(adapterError)throw Error('approved adapter mismatch');return source;}
 });return{result,calls,reads,adapters};
}
test('missing Git is unavailable, never historical approval',()=>{const q=R.collect({run:()=>({error:{code:'ENOENT'}}),approved:()=>{throw Error('must not normalize without history');}});A.equal(q.status,'unavailable');A.deepEqual(q.counts,{passed:0,failed:0,unavailable:9});A(q.files.every(f=>f.reason==='Git executable unavailable'));A.equal(R.exitCode(q),2);});
test('ZIP export without a repository is explicitly unavailable',()=>{const q=R.collect({run:()=>response('',128,'fatal: not a git repository (or any parent directories): .git')});A.equal(q.status,'unavailable');A.equal(R.exitCode(q),2);});
test('missing historical commit is unavailable and skips source adapters',()=>{const q=R.collect({run:()=>response(R.commit+' missing\n'),readFile:()=>{throw Error('must not read');}});A.equal(q.status,'unavailable');A.equal(q.counts.unavailable,9);A(q.files.every(f=>f.reason.includes(R.commit)));});
test('all available equal receipts pass and contain both hashes',()=>{const{result:q,calls,reads,adapters}=fixture();A.equal(q.status,'passed');A.equal(R.exitCode(q),0);A.deepEqual(q.counts,{passed:9,failed:0,unavailable:0});A.equal(calls.length,10);A.equal(reads,9);A.equal(adapters,9);A(q.files.every(f=>f.historicalSha256===f.normalizedCurrentSha256&&f.historicalSha256.length===64));A.equal(calls[0].command,'git');A.equal(calls[0].input.split('\n')[1],R.commit+':dist/core.js');});
test('missing source blob remains unavailable alongside verified receipts',()=>{const{result:q,reads}=fixture({missing:['core.js']});A.equal(q.status,'unavailable');A.deepEqual(q.counts,{passed:8,failed:0,unavailable:1});A.equal(reads,8);A.equal(q.files[0].status,'unavailable');A.equal(R.exitCode(q),2);});
test('available byte mismatch fails, never unavailable or skipped',()=>{const{result:q}=fixture({changed:['core.js']});A.equal(q.status,'failed');A.equal(q.counts.failed,1);A.equal(R.exitCode(q),1);A.notEqual(q.files[0].historicalSha256,q.files[0].normalizedCurrentSha256);});
test('mismatch still fails when another receipt is unavailable',()=>{const{result:q}=fixture({changed:['core.js'],missing:['audit135.js']});A.equal(q.status,'failed');A.deepEqual(q.counts,{passed:7,failed:1,unavailable:1});A.equal(R.exitCode(q),1);});
test('normalizer failure is a failed proof, not missing history',()=>{const{result:q}=fixture({adapterError:true});A.equal(q.status,'failed');A.equal(q.counts.failed,9);A(q.files.every(f=>f.reason==='approved adapter mismatch'));});
test('source read errors and historical blob read errors fail',()=>{for(const options of [{readError:true},{showError:true}]){const{result:q}=fixture(options);A.equal(q.status,'failed');A.equal(q.counts.failed,9);}});
test('unexpected Git failures are not treated as unavailable',()=>{for(const value of [{error:{code:'EACCES',message:'permission denied'}},response('',128,'fatal: permission denied'),response('',null,'terminated')]){const q=R.collect({run:()=>value});A.equal(q.status,'failed');A.equal(q.counts.failed,9);A.equal(R.exitCode(q),1);}});
test('malformed object responses fail closed',()=>{const{result:q}=fixture({queryError:true});A.equal(q.status,'failed');A.equal(q.counts.failed,9);});
