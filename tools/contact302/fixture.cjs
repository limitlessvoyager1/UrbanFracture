'use strict';
function fixture(N,kind='clean',dir=1){const g=new N.Brawler();g.selectHero('reina');N.Practice282.setup(g,{id:kind==='block'?'sato':kind==='armor'?'enforcer':kind==='knife'?'knifeThug':'thug',scene284:'restaurant'});g.ai=()=>{};g.props=[];g.pending=[];g.reinforce=()=>{};const p=g.player,e=g.enemies[0];Object.assign(p,{x:450,y:470,dir,inv:0,wakeInv:0,cd:0});Object.assign(e,{x:p.x+dir*80,y:470,dir:-dir,inv:0,wakeInv:0,wakeArmor:0,cd:0,activeAt:0});g.events=[];g.command('attack',{});if(!p.act)throw Error('native attack did not start');p.act.t=Math.max(0,p.act.hitAt-1/60);g.advanceHeroAction(p,p.act,0);
if(kind==='armor'){g.enemyAct(e,'hook',1,.3,{enemies210:true});if(!e.act)throw Error('native hook did not start');e.act.t=e.act.hitAt;}
if(kind==='block'){g.enemyAct(e,'martialBlock',1,.2);e.act.t=.15;}
if(kind==='hero-block'){p.act=null;p.blocking=true;g.enemyAct(e,'oneTwo',.8,.24,{street209:true,damage:8,reach:100,active:.08});e.act.t=e.act.hitAt;}
if(kind==='counter'){p.act=null;p.defense=p.maxDefense;e.x=p.x+dir*54;g.enemyAct(e,'oneTwo',.8,.24,{street209:true,damage:8,reach:100,active:.08});if(!e.act)throw Error('native punch did not start');e.act.t=e.act.hitAt-2/60;}
return{g,p,e,contact(){if(kind==='counter'){N.Counter248.arm(g,{});return N.Counter248.capture(g,e,e.act);}if(kind==='hero-block')return g.damage(p,8,-dir,false,{attacker:e});if(kind==='miss'){e.x=p.x+dir*400;g.hitPlayerAttack(p.act);return;}if(kind==='protected')e.inv=1;return g.damage(e,4,dir,false,{attacker:p});}};}
module.exports={fixture};
