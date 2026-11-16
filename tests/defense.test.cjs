const assert=require('node:assert/strict'),{Brawler,actor}=require('../dist/core.js');
function setup(type='thug'){const g=new Brawler();g.reset();g.enemies=[actor(type,173,454)];g.ai=()=>{};g.enemyAct(g.enemies[0],'oneTwo',1,.34,{damage:8,reach:70});return g;}
function step(g,n,input={}){for(let i=0;i<n;i++)g.tick(1/60,input);}
let g=setup();g.enemies[0].act.hitAt=.6;g.command('block');step(g,40,{block:true});assert.equal(g.player.hp,108,'Late guard takes 25 percent damage');assert(!g.player.down);assert(!g.player.hold);assert(g.player.blocking);step(g,1);assert(!g.player.blocking,'Release cancels block');
for(const kind of ['combo','kick','forward','back']){g=setup();step(g,12);g.command('counter');step(g,10);assert(g.player.hold?.counter,'Timed block catches punch');assert.equal(g.player.hp,110);const e=g.enemies[0];g.command(kind==='kick'?'jump':'attack',kind==='forward'?{right:true}:kind==='back'?{left:true}:{});step(g,65);assert(!g.player.hold&&!e.heldBy,'Finisher unlinks pair');assert(e.down||e.flight,'Finisher knocks down');assert.equal(e.hp,kind==='combo'?32:kind==='kick'?32:kind==='forward'?38:39);}
g=setup();g.enemies[0].weapon='knife';step(g,12);g.command('counter');step(g,10);assert(g.player.hold?.counter,'Knife arm can be caught');assert.equal(g.player.defense,50);
g=setup();g.player.dir=-1;step(g,12);g.command('counter');step(g,10);assert(!g.player.hold);assert.equal(g.player.hp,103,'Rear hit bypasses front guard');
g=setup();step(g,12);g.command('counter');step(g,10);step(g,175);assert(!g.player.hold&&!g.enemies[0].heldBy,'Unused arm catch expires cleanly');
g=setup();g.command('attack');g.command('block');assert(!g.player.blocking,'Cannot cancel committed attack into block');
console.log('PASS frontal guard damage, release, timed punch catch, four finishers, weapon/rear rejection, timeout and attack commitment');
