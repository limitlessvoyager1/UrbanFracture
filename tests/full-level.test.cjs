// Full route uses ordinary movement, blitz, cartwheel, ground attacks, throws and food; no HP or damage overrides.
const assert=require('node:assert/strict'),{Brawler,ZONES}=require('../dist/core.js');let seed=20;Math.random=()=>((seed=(seed*1664525+1013904223)>>>0)/4294967296);const g=new Brawler();g.reset();let retries=0,totalKills=0,elapsed=0;
for(let i=0;i<1200*60&&!g.won;i++){
 if(!g.playing){assert(retries++<5);totalKills+=g.kills;elapsed+=g.time;g.reset(g.zone);}
 const p=g.player;let input={};if(p.down)g.command('jump',{left:true});if(p.heldBy)g.command(i%2?'attack':'jump');
 if(p.hold){g.command('attack',{right:p.dir===1,left:p.dir===-1});}
 const e=g.enemies.filter(e=>e.hp>0&&!e.fleeing&&!e.dormant).sort((a,b)=>Math.abs(a.x-p.x)-Math.abs(b.x-p.x))[0]||g.enemies.find(e=>e.hp>0&&e.dormant);
 if(g.zoneClear||!e){input={right:true,run:true};}else{
 const dx=e.x-p.x,dy=e.y-p.y,dir=Math.sign(dx)||p.dir;const free=g.isFree(p)&&!p.hold;
 const food=p.hp<85?g.items.filter(it=>Math.abs(it.x-p.x)<160&&it.x>=g.bounds.min&&it.x<=g.bounds.max).sort((a,b)=>Math.abs(a.x-p.x)-Math.abs(b.x-p.x))[0]:null;
 if(food){if(Math.abs(food.x-p.x)>10)input[food.x>p.x?'right':'left']=true;if(Math.abs(food.y-p.y)>7)input[food.y>p.y?'down':'up']=true;}
 else if(p.blitzRecovery<=0&&!e.down&&!e.flight&&!g.bossProtected(e)){
 if(Math.abs(dy)>10)input[dy>0?'down':'up']=true;if(Math.abs(dx)>100)input[dx>0?'right':'left']=true;
 if(Math.abs(dx)<115&&Math.abs(dy)<25&&free){g.directionInput(0);g.directionInput(dir);g.directionInput(0);g.directionInput(dir);g.command('attack',input);}
 }else if(Math.abs(dx)<180&&!e.down&&!e.flight){let away=-dir;if((away<0&&p.x<g.bounds.min+45)||(away>0&&p.x>g.bounds.max-45)){input[dy>=0?'up':'down']=true;if(free&&p.dodgeCd<=0)g.command('dodge',{right:dir>0,left:dir<0});}else input[away>0?'right':'left']=true;}
 if(e.down&&Math.abs(dx)<60&&free)g.command('attack',{down:true});
 }
 g.tick(1/60,input);for(const type of ['biker','enforcer'])assert(g.enemies.filter(e=>e.type===type&&e.hp>0).length<=1);
}
console.log('PASS full route with ordinary inputs: '+(totalKills+g.kills)+' enemies defeated, '+g.time.toFixed(1)+'s, '+g.player.hp+' HP, '+retries+' retries');assert(g.won);assert(g.player.hp>0);
