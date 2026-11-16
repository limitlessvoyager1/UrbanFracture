const assert=require('node:assert/strict');const{Brawler,actor}=require('../dist/core.js');
const step=(g,t,input={})=>{for(let i=0;i<t*60;i++)g.tick(1/60,input);};
function arena(type='thug'){let g=new Brawler();g.reset();g.player.x=150;g.player.y=450;g.items=[];g.props=[];g.enemies=[actor(type,195,450)];g.enemies[0].cd=99;return g;}
let g=arena();step(g,.15,{right:true});assert(g.player.hold,'Walking into thug acquires hold without G');assert.equal(g.enemies[0].heldBy,g.player);g.command('attack');step(g,.36);assert.equal(g.enemies[0].hp,54,'Contact grab supports knee attack');
g=arena();g.enemies[0].weapon='knife';step(g,.15,{right:true});assert(g.player.hold,'Armed regular thug does not require heavy-enemy stagger');
g=arena();step(g,.1);assert(!g.player.hold,'Standing near enemy does not trigger grab');
g=arena();g.enemies[0].y=490;step(g,.3,{right:true});assert(!g.player.hold,'Different lane does not trigger contact grab');
g=arena();step(g,.15,{right:true,attack:true});assert(!g.player.hold,'Holding attack preserves attack intent');
g=arena('enforcer');step(g,.15,{right:true});assert(!g.player.hold,'Unstaggered enforcer cannot be contact grabbed');g.enemies[0].stagger=.8;g.enemies[0].hp=26;step(g,.05,{right:true});assert(g.player.hold,'Low-health enforcer can be contact grabbed');
g=arena();g.command('attack');const attack=g.player.act;g.enemies[0].x=183;g.enemies[0].dir=-1;g.enemyHit(g.enemies[0],{name:'hook',damage:16,reach:65,knock:true});assert.equal(g.player.hp,96,'Thug still deals damage');assert.equal(g.player.act,attack,'Thug does not cancel player attack');assert.equal(g.player.down,0,'Thug does not knock down attacking player');
g=arena('enforcer');g.command('attack');g.enemies[0].x=183;g.enemies[0].dir=-1;g.enemyHit(g.enemies[0],{name:'hook',damage:20,reach:65,knock:true});assert(!g.player.act,'Enforcer can interrupt');assert(g.player.down>0);
g=arena();let e=g.enemies[0];g.enemyAct(e,'hook',1,.5,{damage:16});e.act.t=.3;g.damage(e,6,1);assert(!e.act,'Normal thug always loses its attack on hit');assert(e.stun>0);
g=arena('enforcer');e=g.enemies[0];g.enemyAct(e,'hook',1,.5,{damage:20});e.act.t=.3;g.damage(e,6,1);assert(e.act,'Committed enforcer hook resists interruption');assert.equal(e.hp,109,'Armor does not block damage');
g=arena();step(g,.1,{left:true});const phase=g.player.walkPhase;assert(phase>0);step(g,.3);assert.equal(g.player.walkPhase,phase,'Walking clock stops when actor stops');step(g,.1,{left:true});assert(g.player.walkPhase>phase,'Walking resumes at saved phase');
console.log('PASS contact grabs, lane/intent/heavy restrictions, normal-thug poise rules, heavy resistance, distance-based walk timing');

g=arena();g.enemies[0].cd=0;step(g,.15,{right:true});assert(g.player.hold,'Walking contact catches normal thug during its wind-up without needing stagger');console.log('PASS contact grabs against active ordinary AI wind-up');
