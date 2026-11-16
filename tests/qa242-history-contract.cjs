'use strict';
const {test}=require('node:test'),A=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),os=require('node:os');
const H=require('../tools/qa242/history-contract.cjs'),P=require('../tools/qa242/pilot.cjs'),E=require('../tools/qa242/evidence.cjs'),W=require('../tools/qa242/current-evidence.cjs');
const root=path.resolve(__dirname,'..'),catalog=require('../qa/system242/suites.json');
function plan(){return{acceptanceScope:P.scope,fullReleaseRequired:false,problems:[],review:[],selection:H.expected.map(q=>q[0]),reasons:{}};}
function mapped(){return H.apply(plan(),{root,declaration:{replacementContract:H.contractPath},catalog,runtimeTree:'893ef481dd7ec7f7d399a5e1ca1136840018431c'});}
test('replacement is explicit, source-bound, pilot-only and keeps originals mandatory for release',()=>{
 const p=mapped();A.equal(p.selection.length,4);A.equal(p.historyReplacement.historicalEvidence,'blocked');A.equal(p.historyReplacement.gameCertified,false);
 for(const [old,current]of H.expected){A(!p.selection.includes(old));A(p.selection.includes(current));const suite=catalog.suites.find(q=>q.id===old);A(suite.profiles.includes('release'));A.equal(require('../tools/qa242/run.cjs').shouldRun(suite,'release',new Set([old]),true),true);}
 for(const changes of [{acceptanceScope:'game-change'},{fullReleaseRequired:true},{problems:['invalid']}])A.throws(()=>H.apply({...plan(),...changes},{root,declaration:{replacementContract:H.contractPath},catalog,runtimeTree:'893ef481dd7ec7f7d399a5e1ca1136840018431c'}));
 A.throws(()=>H.apply(plan(),{root,declaration:{replacementContract:H.contractPath},catalog,runtimeTree:'a'.repeat(40)}));
 A.deepEqual(H.apply(plan(),{root,declaration:{},catalog}),plan());
});
test('missing/altered frozen receipts and source anchors fail closed',()=>{
 const c=require('../qa/system242/history-replacement-v1.json'),dir=fs.mkdtempSync(path.join(os.tmpdir(),'uf-history-contract-'));
 try{for(const file of [H.contractPath,c.lossReceipt.path,...JSON.parse(fs.readFileSync(c.lossReceipt.path)).results.map(q=>q.log),...c.mappings.flatMap(m=>[m.sourcePath,...m.inputs.map(q=>q.path)]),c.runtimeAnchor.gameFile]){const dest=path.join(dir,file);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.copyFileSync(path.join(root,file),dest);}H.load(dir);const log=JSON.parse(fs.readFileSync(c.lossReceipt.path)).results[0].log;fs.appendFileSync(path.join(dir,log),'altered');A.throws(()=>H.load(dir));fs.copyFileSync(path.join(root,log),path.join(dir,log));fs.appendFileSync(path.join(dir,'dist/game.js'),'\n');A.throws(()=>H.load(dir));}
 finally{A.equal(path.dirname(dir),os.tmpdir());fs.rmSync(dir,{recursive:true,force:true});}
});
function report(){const p=mapped(),runId='20261116T000000Z-aabbccdd';return{runId,impact:p,historyReplacement:p.historyReplacement,sourceChangedDuringTests:false,uncommittedInputs:[],results:[...p.selection.map(id=>({...catalog.suites.find(q=>q.id===id),status:'passed',exitCode:0,log:'reports242/runs/'+runId+'/logs/'+id+'.log',logSha256:E.hash('ok'),artifacts:[]})),...H.expected.map(q=>({...catalog.suites.find(s=>s.id===q[0]),status:'not-tested',reason:'Historical evidence unavailable; frozen failed receipt retained'}))]};}
test('pilot requires replacement execution and never relabels a historical check passed',()=>{
 A.equal(P.automated(report(),catalog).status,'passed');
 for(const mutate of [r=>r.results[0].status='failed',r=>r.results[0].status='blocked',r=>r.results[4].status='passed',r=>r.historyReplacement=null,r=>r.impact.selection.push(H.expected[0][0]),r=>r.results[4].reason='outside selection']){const r=report();mutate(r);A.equal(P.automated(r,catalog).status,'blocked');}
 const r=report();r.profile='release';A.equal(require('../tools/qa242/release.cjs').validateRelease(r,{spec:catalog,sourceFingerprint:'unused',readLog:()=>''}).allowed,false);
});
test('owner must explicitly acknowledge the exact replacement contract; stale/ordinary comments and revocation cannot accept',async()=>{
 const r=report(),m=P.manifest(r,{repository:'owner/repo',pullRequest:13,workflowRun:'42',reportSha256:'c'.repeat(64)});m.baseCommit='a'.repeat(40);m.testedCommit='b'.repeat(40);const digest='d'.repeat(64),body=P.template(m,digest);A(body.includes('Missing-History-Acknowledgement: '+H.acknowledgement));A(body.includes('Replacement-Contract-SHA256: '+m.historyReplacement.sha256));
 const comment=b=>({id:1,body:b,user:{id:2,login:'owner',type:'User'},updated_at:'2026-11-16T00:00:00Z',issue_url:'https://api.github.com/repos/owner/repo/issues/13',html_url:'https://github.com/owner/repo/issues/13#issuecomment-1'});
 const api=b=>async route=>route===''?{id:1,full_name:'owner/repo',owner:{id:2,login:'owner',type:'User'}}:route.startsWith('/pulls/')?{number:13,state:'open',base:{sha:m.baseCommit,repo:{id:1}},head:{sha:m.testedCommit}}:[comment(b)];
 A.equal((await P.ownerComment(m,digest,{token:'fixture',get:api(body)})).status,'passed');
 for(const b of [P.template({...m,historyReplacement:undefined},digest),body.replace(m.historyReplacement.sha256,'e'.repeat(64)),P.template(m,digest,'REVOKE')])A.notEqual((await P.ownerComment(m,digest,{token:'fixture',get:api(b)})).status,'passed');
});
test('current-only preparations remove only historical execution; original files stay pinned',()=>{
 const c=H.load(root);for(const m of c.mappings.filter(q=>q.mode!=='orion')){const source=fs.readFileSync(m.sourcePath,'utf8'),prepared=W.prepare(m.mode,source);A.notEqual(prepared,source);if(m.mode==='nightshade'){A(!prepared.includes('const old=baseline()'));A(prepared.includes("ok(whiff(load(276)).queued"));A(prepared.includes('e.hp===278'));}if(m.mode==='diagnostics'){A(!prepared.includes("preserved.cjs').verify"));A(prepared.includes('exactly one whole native simulation tick'));}if(m.mode==='energy'){A(prepared.includes('for(const baseline of[false])'));A(prepared.includes('historicalComparison:false'));}A.throws(()=>W.prepare(m.mode,'changed source'));}
 A.throws(()=>W.validateEnergy({historicalComparison:true,certified:false,results:[]}));
});

test('current energy measurements require complete paired labels and finite metrics without a historical claim',()=>{
 const make=()=>({historicalComparison:false,certified:false,results:['reina','niko','orion'].flatMap(hero=>['thug','enforcer','boss'].map(enemy=>({hero,enemy,mode:'energy316',seed:316,duration:1,completed:false,heroHP:100,enemyHP:100,specials:0,counters:0,dodges:0,blocks:0,secondsAtZero:0,generated:0,spent:0,pickups:0,damageTaken:0,hpOverflow:0,energyPerMinute:0,energySpentPerMinute:0})))});
 A.equal(W.validateEnergy(make()),true);
 for(const mutate of [q=>q.historicalComparison=true,q=>q.certified=true,q=>q.results.pop(),q=>q.results[0].generated=NaN,q=>q.results[0].duration=0,q=>q.results[0].mode='approved315',q=>q.results[0].hero='invented']){const q=make();mutate(q);A.throws(()=>W.validateEnergy(q));}
});
