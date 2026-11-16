'use strict';
const fs=require('node:fs'),path=require('node:path'),cp=require('node:child_process'),A=require('node:assert/strict'),E=require('./evidence.cjs'),C=require('./coverage.cjs');
const contractPath='qa/system242/history-replacement-v1.json';
const expected=[['orion271-assets','orion-current-assets-v1','orion','8422de5a7b201bf3f72d58d1235e19ecb2d5537d'],['nightshade276-runtime','nightshade-current-behavior-v1','nightshade','fb436742c9b821a9f9d8d9a1363e93c98afca946'],['diagnostics307-input','diagnostics-current-preservation-v1','diagnostics','09bb59f80b054cbd2bacdfa0840cecc74cae2027'],['energy316-baseline-comparison','energy-current-measurements-v1','energy','4808adc0f7f1e4ecfd35d747f17aec3db4b40b19']];
const acknowledgement='I accept the four current-only replacement evidence contracts for QA pilot acceptance; historical before/after claims remain unverified; this does not certify the game';
function load(root){
 const read=p=>fs.readFileSync(path.join(root,p)),bytes=read(contractPath),c=JSON.parse(bytes);
 A.deepEqual(Object.keys(c).sort(),['schema','id','version','scope','ownerAcceptance','gameCertified','runtimeAnchor','lossReceipt','mappings','unverifiedClaims','limits'].sort());
 A.equal(c.schema,1);A.equal(c.id,'qa242-missing-history-v1');A.equal(c.version,1);A.equal(c.scope,'qa-infrastructure-pilot');A.equal(c.gameCertified,false);A.equal(c.ownerAcceptance,'pending-exact-source-bound-comment');
 A.deepEqual(c.mappings.map(m=>[m.historicalSuite,m.currentSuite,m.mode,m.missingCommit]),expected);
 A.equal(c.runtimeAnchor.commit,'023bef18915ea8ec2bc9c71c1b0c374e17488fc9');A.equal(c.runtimeAnchor.tree,'893ef481dd7ec7f7d399a5e1ca1136840018431c');A.equal(c.runtimeAnchor.gameFile,'dist/game.js');A.equal(C.blob(read(c.runtimeAnchor.gameFile)),c.runtimeAnchor.gameBlob);
 A.equal(c.lossReceipt.path,'qa/system242/history-loss-v1/receipt.json');const receiptBytes=read(c.lossReceipt.path);A.equal(E.hash(receiptBytes),c.lossReceipt.sha256);const receipt=JSON.parse(receiptBytes);A.equal(receipt.workflowRun,'43914636396');A.equal(receipt.testedCommit,c.runtimeAnchor.commit);A.equal(receipt.artifactSha256,'45aba74f2b02fb4c4717190f36c69eecb729513d8f8d7e07c9cd080c71fb4b53');A.equal(receipt.results.length,4);
 const sources=['tests/orion271-assets.py','tests/nightshade276.cjs','tests/diagnostics307-input.cjs','tools/energy316/balance.cjs'];
 for(const [i,m] of c.mappings.entries()){A.deepEqual(Object.keys(m).sort(),['historicalSuite','currentSuite','mode','missingCommit','originalCommand','sourcePath','sourceBlob','inputs'].sort());A.equal(m.sourcePath,sources[i]);A.deepEqual(m.originalCommand,[i===0?'python':'node',sources[i]]);A.deepEqual(m.inputs.map(q=>q.path),i===0?['reports271/import.json']:[]);const r=receipt.results.find(q=>q.id===m.historicalSuite);A(r);A.equal(r.status,'failed');A.equal(r.exitCode,1);A.deepEqual(r.command,m.originalCommand);A.equal(r.log,'qa/system242/history-loss-v1/'+m.historicalSuite+'.log');A.equal(E.hash(read(r.log)),r.sha256);A.equal(C.blob(read(m.sourcePath)),m.sourceBlob);for(const input of m.inputs)A.equal(C.blob(read(input.path)),input.blob);}
 A.equal(c.unverifiedClaims.length,4);A.equal(c.limits.length,3);
 return {id:c.id,version:c.version,path:contractPath,sha256:E.hash(bytes),scope:c.scope,status:'owner-review-pending',historicalEvidence:'blocked',gameCertified:false,runtimeAnchor:c.runtimeAnchor,lossReceipt:c.lossReceipt,mappings:c.mappings,unverifiedClaims:c.unverifiedClaims,limits:c.limits};
}
function apply(plan,{root,declaration,catalog,runtimeTree}){
 if(!declaration.replacementContract)return plan;
 A.equal(declaration.replacementContract,contractPath);A.equal(plan.acceptanceScope,'qa-infrastructure-pilot');A.equal(plan.fullReleaseRequired,false);A.equal(plan.problems.length,0,'Invalid impact plan cannot replace requirements');
 const h=load(root);A.equal(runtimeTree,h.runtimeAnchor.tree,'Replacement restricted to unchanged imported production tree');
 const selection=new Set(plan.selection),originalSelection=[...selection];
 for(const m of h.mappings){const old=catalog.suites.find(q=>q.id===m.historicalSuite),current=catalog.suites.find(q=>q.id===m.currentSuite);A(old&&current);A.deepEqual(old.command,m.originalCommand);A(old.profiles.includes('release'));A.deepEqual(current.command,['node','tools/qa242/current-evidence.cjs',m.mode]);A.deepEqual(current.profiles,['initial']);if(selection.delete(m.historicalSuite)){selection.add(m.currentSuite);plan.reasons[m.currentSuite]=['Proposed current-only pilot contract '+h.id+' replaces '+m.historicalSuite+'; historical claim remains unavailable'];}}
 plan.historyReplacement={...h,originalSelection};plan.selection=[...selection].sort();plan.review.push('Exact owner acknowledgement required for current-only replacement contract; four historical claims remain unverified');return plan;
}
module.exports={contractPath,expected,acknowledgement,load,apply};
