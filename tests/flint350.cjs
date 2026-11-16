'use strict';const A=require('assert/strict'),fs=require('fs'),{fixture,draw}=require('../tools/flint350/render.cjs');let checks=0;const rows=[],ok=(x,m)=>{checks++;A.ok(x,m)};
const step=(g,n)=>{for(let i=0;i<n;i++)g.tick(1/60,{})};
const keepAlive=setInterval(()=>{},1000);
(async()=>{
for(const dir of [-1,1])for(const name of ['hook','oneTwo','frontKick','uppercut'])for(const distance of [65,220,480]){
 const{g,N,p,e}=await fixture('flint',dir);e.weapon=null;e.cd=0;e.x=480;p.x=e.x+dir*distance;e.dir=dir;g.enemyAct(e,name,1,.3);const a=e.act;ok(a?.flint350,'dedicated action '+name);ok(a.total<1,'subsecond sequence');
 const hp=p.hp;step(g,65);const damage=hp-p.hp;ok(distance===65?damage>0:damage===0,'contact '+name+' '+dir+' '+distance);rows.push({name,dir,distance,damage,totalFrames:Math.round(a.total*60)});
}
for(const dir of [-1,1])for(const weapon of ['knife','pipe','plank','woodBat']){
 const{g,N,p,e}=await fixture('flint',dir);e.weapon=weapon;e.cd=0;e.x=480;p.x=e.x+dir*70;e.dir=dir;g.enemyAct(e,'flintWild',1,.3);const a=e.act;ok(a?.flint211,'original armed sequence');p.x=e.x+dir*480;const hp=p.hp;step(g,360);ok(p.hp===hp,'escape armed '+weapon);ok(a.def211.recover===180,'preserved armed punish recovery');
}
for(const dir of [-1,1]){
 const{g,N,p,e}=await fixture('flint',dir);e.weapon=null;e.cd=0;e.x=480;p.x=e.x+dir*65;g.enemyAct(e,'hook',1,.2);step(g,7);p.x=e.x+dir*480;const hp=p.hp;step(g,50);ok(p.hp===hp,'retreat during startup');
 e.act=null;ok(!g.damage(p,22,dir,false,{attacker:e}),'stale direct receipt rejected');
}
{const{g,N,p,e}=await fixture('flint');e.weapon=null;e.cd=0;e.x=p.x+65;g.enemyAct(e,'hook',1,.2);p.y=e.y-50;step(g,50);ok(p.hp===110,'off-plane misses');}
{const{g,N,p,e}=await fixture('flint');e.weapon=null;e.cd=0;e.x=p.x+65;g.enemyAct(e,'hook',1,.2);const a=e.act;g.damage(e,6,1,false,{attacker:p,force:true});step(g,50);ok(e.act!==a&&p.hp===110,'interrupted attack cannot connect');}
// Actual native AI and production sprite calls, fixed time step; not browser/hardware proof.
{const f=await fixture('flint'),{g,N,p,e}=f;e.weapon=null;e.cd=0;e.x=p.x+65;g.ai=N.Brawler.prototype.ai.bind(g);fs.mkdirSync('reports350/frames',{recursive:true});const poses=new Set(),actions=new Set();for(let i=0;i<240;i++){if(e.act)actions.add(e.act.name);const c=draw(f);if(e.flintPose350)poses.add(e.flintPose350.index);fs.writeFileSync('reports350/frames/'+String(i).padStart(4,'0')+'.jpg',c.toBuffer('image/jpeg',85));g.tick(1/60,{});p.hp=110;p.inv=0;p.down=0;p.flight=null;p.stun=0;p.x=e.x-65;}ok(poses.size>=4,'four connected attack poses');ok(actions.size>=2,'live AI varies attacks');}
fs.writeFileSync('reports350/flint-tests.json',JSON.stringify({pass:true,checks,rows},null,2));console.log('PASS Flint350',checks);
})().catch(e=>{console.error(e);process.exitCode=1}).finally(()=>clearInterval(keepAlive));
