const fs=require('fs'),vm=require('vm'),assert=require('assert'),{make,run,N}=require('./grab223-fixture.cjs');
for(const hero of ['reina','nova','broxton','forest','niko','orion'])for(const hz of [30,60,120]){
 const {g,p}=make(hero);g.enemies=[];g.props=[];g.start(p,'testRecovery226',.10,99,{});g.attackInput(true,{attack:true});g.attackInput(false,{});run(g,.14,{},hz);assert(p.act&&p.act.name!=='testRecovery226',hero+' buffered attack');
 const q=make(hero),h=q.p;q.g.enemies=[];q.g.start(h,'testRecovery226',.1,99,{});q.g.command('special',{right:true});const hp=h.hp;run(q.g,.28,{},hz);assert(h.act&&h.act.name!=='testRecovery226',hero+' buffered special');assert(h.hp<hp,hero+' special charges only at execution');
}
for(const hz of [30,60,120]){const{g,p}=make('nova');g.enemies=[];const x=p.x,y=p.y;g.attackInput(true,{attack:true,right:true});for(let i=0;i<1.8*hz;i++){g.tick(1/hz,{attack:true,right:true,down:true,run:true});assert.equal(p.x,x);assert.equal(p.y,y);assert.equal(p.walk,0);}assert(!p.hypeUsed);run(g,.3,{attack:true,right:true},hz);assert(p.hypeUsed,'Hype completes');}
for(const hero of ['reina','nova','broxton','forest','niko','orion']){const{g,p}=make(hero);g.enemies=[];g.attackInput(true,{attack:true});run(g,.6,{attack:true});g.command('special',{right:true});run(g,.25,{attack:false});assert(!['Charging','FullyCharged','Releasing'].includes(p.charge130.state),hero+' special cancels charge');assert(p.specialCd>0,hero+' special is executed');}
console.log('PASS226 six heroes x30/60/120Hz attack/special recovery buffering; Nova planted charge; six-hero Special overrides charge.');

for(const hero of ['reina','nova','broxton','forest','niko','orion'])for(const hz of [30,60,120]){const{g,p}=make(hero);g.enemies=[];g.start(p,'testRecovery226',.1,99,{});p.blitzUntil=g.time+.05;p.blitzDir=1;g.attackInput(true,{attack:true,right:true});g.attackInput(false,{});run(g,.18,{},hz);assert(p.act&&/blitz|novaBlitz|Clothesline|Rush|blur|boost|meteor/i.test(p.act.kind185||p.act.kind205||p.act.name),hero+' latched Blitz '+p.act?.name);}
console.log('PASS226 six-hero buffered Blitz intent persists through valid final recovery.');

{const{g,p}=make('nova');g.enemies=[];p.specialCd=1;const hp=p.hp;g.command('special',{right:true});run(g,1.4);assert.equal(p.hp,hp,'expired cooldown input never auto-fires');assert(!p.act);}
{const{g,p}=make('nova');g.enemies=[];p.specialCd=.1;const hp=p.hp;g.command('special',{right:true});run(g,.2);assert(p.hp<hp,'short cooldown tail buffers');const after=p.hp;run(g,1);assert.equal(p.hp,after,'one press one cost');}
console.log('PASS226 buffered Special waits for eligible cooldown, expires, and never repeats or cancels recovery.');
