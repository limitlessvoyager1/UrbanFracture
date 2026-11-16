const assert=require('node:assert/strict');
const {Brawler,actor}=require('../dist/core.js');
for(const f of ['financial','broxton','paired-motion','counters','encounters','balance48','balance49','broxton-counters51','broxton-shuffle52','open-cue62','weather67','club76','nova77','jackal100','pressure101','leroy102'])require('../dist/'+f+'.js');
for(const hero of ['reina','nova','broxton'])for(const rear of [false,true])for(const automatic of [false,true]){
 const g=new Brawler();g.selectHero(hero);g.enemies=[];g.pending=[];const p=g.player;p.x=400;p.y=455;p.dir=1;p.cd=p.inv=p.wakeInv=0;const e=actor('gangster',430,455);e.dir=rear?1:-1;e.stagger=0;g.enemies.push(e);
 assert(g.tryGrab(automatic),hero+' grab starts');if(!automatic)g.hitPlayerAttack(p.act);
 assert.equal(p.hold?.victim,e,hero+' holds full-health Leroy');assert.equal(p.hold.rear,rear);assert.equal(e.heldBy,p);
}
{const g=new Brawler();g.selectHero('nova');const e=actor('gangster',g.player.x+30,g.player.y);e.dormant=true;assert.equal(g.acquireGrab(e),false);e.dormant=false;e.down=1;assert.equal(g.acquireGrab(e),false);}
console.log('PASS all three heroes grab full-health Leroy from front/rear using manual and automatic grabs; protected states retained');
