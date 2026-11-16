const assert=require('node:assert/strict');
const {Brawler,actor}=require('../dist/core.js');
for(const f of ['financial','broxton','paired-motion','counters','encounters','balance48','balance49','broxton-counters51','broxton-shuffle52'])require('../dist/'+f+'.js');
for(const type of ['enforcer','bouncer','boss','security'])for(const dir of [-1,1]){
 const g=new Brawler();g.reset();g.player.x=800;g.player.y=480;g.player.dir=dir;g.pending=[];g.props=[];g.items=[];g.ai=()=>{};g.reinforce=()=>{};
 const e=actor(type,800+dir*32,480);e.hp=e.maxHp*.3;e.guarding=0;e.dormant=false;g.enemies=[e];
 assert(g.acquireGrab(e,false),type+' can be grabbed when weakened');g.command('attack',dir===1?{left:true}:{right:true});
 assert.equal(g.player.act.name,'backThrow',type+' away input selects hip throw');assert.equal(g.player.act.damage,21);
 let previous=e.pairVisual.cx,observedFlight=false;
 for(let i=0;i<65;i++){g.tick(1/60,{});assert.equal(e.y,480,type+' remains on the same depth plane');if(e.pairVisual){assert(Math.abs(e.pairVisual.cx-previous)<30,'paired movement is continuous');previous=e.pairVisual.cx;}if(e.flight){observedFlight=true;assert((e.flight.to-e.flight.from)*dir<0,'throw travels behind Reina');}}
 assert(observedFlight);assert(e.down&&e.landed);assert((e.x-g.player.x)*dir<0,'lands behind Reina');assert.equal(g.events.filter(x=>x.type==='land'&&!x.player).length,1);
}
console.log('PASS Reina back hip throw on heavy enemies, both facings, same depth plane and single landing');
