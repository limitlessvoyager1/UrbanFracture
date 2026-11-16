const assert=require('node:assert/strict');const {Brawler}=require('../dist/core.js');for(const f of ['financial','broxton','paired-motion','counters','encounters','balance48','balance49','broxton-counters51','broxton-shuffle52','open-cue62','weather67','club76','nova77'])require('../dist/'+f+'.js');
const g=new Brawler();g.selectHero('nova');g.playing=true;g.pending=[];g.enemies=[];g.reinforce=()=>{};const p=g.player;
g.start(p,'combo',1,.1,{combo:5});const fifth=p.act;
for(let i=0;i<10;i++){g.attackInput(true,{});g.attackInput(false,{});g.tick(.02,{});assert.equal(p.act,fifth,'taps must not cancel fifth hit');}
while(p.act)g.tick(.02,{});const ready=p.novaComboReadyAt;assert(ready>=g.time+.999);
while(g.time<ready-.04){g.attackInput(true,{});g.attackInput(false,{});g.tick(.02,{});assert.notEqual(p.act?.name,'combo','combo restarted during recovery');}
while(g.time<ready+.04)g.tick(.02,{});g.attackInput(true,{});g.attackInput(false,{});assert.equal(p.act?.name,'combo');assert.equal(p.act.combo,1);
console.log('PASS fifth hit cannot be tap-canceled; one-second combo restart cooldown rejects spam and restarts at hit one');
