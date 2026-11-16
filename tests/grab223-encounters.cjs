// Run established encounter acceptance against the complete current grab policy.
require('./grab223-fixture.cjs');
require('./encounter222-contracts.cjs');
require('./encounter222-scripts.cjs');
require('./encounter222-mixed.cjs');
require('./encounter222-rollout.cjs');
const assert=require('assert/strict'),{N,U,make,run}=require('./grab223-fixture.cjs');
for(const hero of ['reina','nova','broxton','forest','niko','orion']){
 const g=new N.Brawler();g.selectHero(hero);g.reset(0);g.tick(1/60,{});const L=N.LockedBattles222,a=L.active(g),e=g.enemies[0],q=U.state(e);assert(a.members.has(e));q.history=[g.time,g.time,g.time];q.protectionUntil=g.time+2;q.lastHero=g.player.id;e.entry=null;e.entering=false;e.activeAt=0;e.x=a.bounds.max+150;e.down=.5;e.downAge=0;e.downTotal=.5;e.act=null;e.recovering=e.cd=e.stagger=e.standingLock=0;const id=e.id;assert(!g.enemyAct(e,'hook',.8,.3,{damage:10}));const x=e.x;L.reentry(g,e,1/60);assert.equal(e.x,x);e.down=0;const until=q.protectionUntil;for(let i=0;i<240&&!L.visible(g,e);i++)L.reentry(g,e,1/60);assert(L.visible(g,e));assert.equal(U.state(e),q);assert.equal(q.protectionUntil,until);assert.equal(q.history.length,3);assert.equal(e.id,id);assert.equal(g.enemies.filter(v=>v===e).length,1);assert(a.members.has(e));
}
console.log('PASS223 six-hero locked reentry preserves enemy identity, shared protection deadline and repetition memory; no offscreen attack or duplication');
