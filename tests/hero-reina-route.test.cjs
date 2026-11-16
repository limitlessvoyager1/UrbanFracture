// Full route uses ordinary movement, blitz, cartwheel, ground attacks, throws and food; no HP or damage overrides.
const assert=require('node:assert/strict'),{Brawler,ZONES}=require('../dist/core.js');require('../dist/financial.js');require('../dist/broxton.js');require('../dist/paired-motion.js');require('../dist/counters.js');let seed=20;Math.random=()=>((seed=(seed*1664525+1013904223)>>>0)/4294967296);const g=new Brawler();g.reset(7);let retries=0,totalKills=0,elapsed=0;
for(let i=0;i<1200*60&&!g.won;i++){
 if(!g.playing){console.log('checkpoint retry',g.zone,g.kills);assert(retries++<5);totalKills+=g.kills;elapsed+=g.time;g.reset(g.zone);}
 const p=g.player;let input={};if(p.down)g.command('jump',{left:true});if(p.heldBy)g.command(i%2?'attack':'jump');
 if(p.hold){g.command('attack',{right:p.dir===1,left:p.dir===-1});}
 const e=g.enemies.filter(e=>e.hp>0&&!e.fleeing&&!e.dormant&&!e.entry).sort((a,b)=>(Math.abs(a.x-p.x)-(a.type==='robber'?220:0))-(Math.abs(b.x-p.x)-(b.type==='robber'?220:0)))[0];
 if(g.zoneClear||!e){input={left:!!ZONES[g.zone].reverse,right:!ZONES[g.zone].reverse,run:true};}else{
 const dx=e.x-p.x,dy=e.y-p.y,dir=Math.sign(dx)||p.dir;const incoming=g.enemies.find(o=>o.act&&o.act.hitAt-o.act.t>0&&o.act.hitAt-o.act.t<.35&&Math.abs(o.x-p.x)<130&&Math.abs(o.y-p.y)<25);if(incoming&&g.isFree(p)&&!p.hold&&!p.jump){p.dir=Math.sign(incoming.x-p.x)||p.dir;if(p.defense>=80&&p.counterCd<=0)g.command('counter',{right:p.dir>0,left:p.dir<0});else input.block=true;}const free=g.isFree(p)&&!p.hold;
 const food=p.hp<85?g.items.filter(it=>Math.abs(it.x-p.x)<160&&it.x>=g.bounds.min&&it.x<=g.bounds.max).sort((a,b)=>(Math.abs(a.x-p.x)-(a.type==='robber'?220:0))-(Math.abs(b.x-p.x)-(b.type==='robber'?220:0)))[0]:null;
 if(food){if(Math.abs(food.x-p.x)>10)input[food.x>p.x?'right':'left']=true;if(Math.abs(food.y-p.y)>7)input[food.y>p.y?'down':'up']=true;}
 else if(['robber','gangster'].includes(e.type)){if(Math.abs(dx)>38)input[dx>0?'right':'left']=true;input.run=true;const shooting=g.enemies.find(o=>o.act?.name==='gunFire'&&Math.abs(p.y-o.act.aimY)<23);if(shooting){const escape=shooting.act.aimY<465?1:-1;input[escape>0?'down':'up']=true;if(free&&p.dodgeCd<=0&&p.defense>=65&&Math.abs(dx)<240)g.command('dodge',{right:dir>0,left:dir<0});}else if(Math.abs(dy)>8)input[dy>0?'down':'up']=true;if(free&&Math.abs(dx)<90&&Math.abs(dy)<24){if(e.type==='gangster'&&p.blitzRecovery<=0){g.directionInput(0);g.directionInput(dir);g.directionInput(0);g.directionInput(dir);}g.command('attack');}}
 else if(p.blitzRecovery<=0&&!e.down&&!e.flight&&!g.bossProtected(e)){
 if(Math.abs(dy)>10)input[dy>0?'down':'up']=true;if(Math.abs(dx)>100)input[dx>0?'right':'left']=true;
 if(Math.abs(dx)<115&&Math.abs(dy)<25&&free){g.directionInput(0);g.directionInput(dir);g.directionInput(0);g.directionInput(dir);g.command('attack',input);}
 }else if(Math.abs(dx)<180&&!e.down&&!e.flight){let away=-dir;if((away<0&&p.x<g.bounds.min+45)||(away>0&&p.x>g.bounds.max-45)){input[dy>=0?'up':'down']=true;if(free&&p.dodgeCd<=0)g.command('dodge',{right:dir>0,left:dir<0});}else input[away>0?'right':'left']=true;}
 if(e.down&&Math.abs(dx)<60&&free)g.command('attack',{down:true});
 }
 g.tick(1/60,input);for(const type of ['biker','enforcer'])assert(g.enemies.filter(e=>e.type===type&&e.hp>0).length<=1);
}
console.log('PASS Reina 100-HP financial route with ordinary inputs: '+(totalKills+g.kills)+' enemies defeated, '+g.time.toFixed(1)+'s, '+g.player.hp+' HP, '+retries+' retries');assert(g.won);assert(g.player.hp>0);
