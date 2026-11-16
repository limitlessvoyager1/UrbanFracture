'use strict';
const A=require('node:assert/strict'),fs=require('node:fs'),{spawnSync}=require('node:child_process');
let checks=0;const eq=(a,b,m)=>{checks++;A.equal(a,b,m)},ok=(v,m)=>{checks++;A.ok(v,m)};
// A new process rejects every executable test import, including transitive imports.
const child=spawnSync(process.execPath,['-e',`
const A=require('node:assert/strict'),M=require('node:module'),old=M._load;
M._load=function(id,parent,...args){const file=M._resolveFilename(id,parent);if(/[\\\\/]tests[\\\\/]/.test(file))throw Error('Executable test imported: '+file);return old.call(this,id,parent,...args);};
const f=require('./tools/forest177/fixture.cjs');
A(!Object.keys(require.cache).some(f=>/[\\\\/]tests[\\\\/]/.test(f)));
console.log('fixture import isolated');
`],{encoding:'utf8',windowsHide:true,timeout:30000});
eq(child.status,0,child.stderr);ok(child.stdout.includes('fixture import isolated'),'fixture imports no test entries');
const hostRandom=Math.random;
const{N,F,C,setup,make,run,runtime,sb}=require('../tools/forest177/fixture.cjs');
eq(Math.random,hostRandom,'fixture does not replace host RNG');ok(sb.Math!==Math,'private simulation RNG');
const independent=require('../tools/qa242/runtime.cjs').load(177);
eq(runtime.loadHash,independent.loadHash,'fixture uses unmodified current loader');eq(runtime.randomState(),independent.randomState(),'deterministic initialization');
for(const file of ['forest-grapples177.js','grab223.js','recording287.js','energy316.js','repairs330.js'])ok(runtime.files.includes(file),'current dependency '+file);
const nativeAI=N.Brawler.prototype.ai;
const expected={combo:[5,104,14,30],poison:[6,68,18,20],spine:[7,110,22,24],legs:[5,66,14,28],overhead:[7,70,20,30],special:[5,86,24,46]};
eq(Object.keys(F.config.moves).join(','),Object.keys(expected).join(','),'six registered moves');
for(const[move,values]of Object.entries(expected)){
 const d=F.config.moves[move];eq([d.start,d.mandatory,d.recovery,d.damage].join(','),values.join(','),'approved frame/damage data '+move);
 for(const dir of [-1,1])for(const hz of [30,60,120]){
  const{g,p,e,a}=make(move,dir);eq(a.total,(d.mandatory+d.recovery)/60,'native action duration');
  run(g,hz*6,hz);const log=g.grappleLog177.filter(v=>v.session===a.id177),at=type=>log.find(v=>v.type===type)?.time;
  const wait=a.wait177||0,quantum=2/hz+1e-7;
  for(const[type,frame]of [['GrappleProtectionStarted',d.start],['GrappleProtectionEnded',d.mandatory],['GrappleAttackerReleased',d.mandatory],['GrappleRecoveryCompleted',d.mandatory+d.recovery]]){
   const t=at(type);ok(Number.isFinite(t)&&t>=frame/60-1e-7&&t<=frame/60+wait+quantum,move+' '+dir+'/'+hz+' '+type+' native deadline');
  }
  eq(1000-e.hp,d.damage,'current exact damage '+move);ok(!p.hold&&!e.heldBy&&!e.grappleOwner177&&!e.maulOwner175&&!e.forestLock125&&!e.grappleSession119?.active,'current ownership cleanup '+move);
 }
 // Native target HP, rather than only a high-HP nonlethal fixture.
 for(const dir of [-1,1]){const hp=N.actor('thug',0,475).maxHp,{g,p,e}=make(move,dir,hp);run(g,720);eq(hp-e.hp,d.damage,'native-HP budget '+move);ok(!p.act&&!p.hold&&!e.heldBy&&!e.grappleOwner177&&!e.maulOwner175,'native-HP cleanup '+move);}
 for(const dir of [-1,1]){const{g,p,e}=make(move,dir,8);run(g,720);ok(e.hp<=0,'lethal completion '+move);ok(!p.act&&!p.hold&&!e.heldBy&&!e.grappleOwner177&&!e.maulOwner175&&!e.forestLock125&&!e.deferredDamage97,'lethal ownership/debt cleanup '+move);}
}
// Energy316 supersedes historical direct HP costs: accepted, rejected and overflow paths.
function special(energy,hp,available=true){const q=setup();Object.assign(q.p,{defense:energy,hp});const e=N.actor('thug',q.p.x+55,q.p.y);e.inv=e.wakeInv=0;e.dir=-1;q.g.enemies=[e];ok(q.g.acquireGrab(e),'cost fixture native hold');if(!available)C.init(q.g).recoverUntil=10;return{...q,e};}
for(const[energy,hp,accepted,afterEnergy,afterHP]of [[100,120,true,75,120],[0,120,true,0,107],[0,13,false,0,13]]){const{g,p}=special(energy,hp);eq(F.begin(g,'special'),accepted,'native special affordability');eq(p.defense,afterEnergy,'approved grab energy cost');eq(p.hp,afterHP,'approved HP overflow/floor');}
{const{g,p}=special(100,120,false);eq(F.begin(g,'special'),false,'unavailable companion');eq(p.hp,120,'unavailable HP unchanged');eq(p.defense,100,'unavailable energy unchanged');}
eq(N.Brawler.prototype.ai,nativeAI,'fixture leaves native AI implementation untouched');
const registry=JSON.parse(fs.readFileSync('qa/system242/suites.json')).suites;
for(const name of ['forest177','forest-protection177','forest-balance177','forest-fixture177']){const entries=registry.filter(s=>s.command?.includes('tests/'+name+'.cjs'));eq(entries.length,1,'one direct QA entry '+name);ok(entries[0].critical&&entries[0].profiles.includes('initial')&&entries[0].profiles.includes('release'),'critical QA profiles '+name);}
console.log('PASS Forest fixture/current runtime '+checks+' checks; isolated imports, 36 mirrored/rate timing cases, 12 native-HP + 12 lethal cases, energy and ownership');
