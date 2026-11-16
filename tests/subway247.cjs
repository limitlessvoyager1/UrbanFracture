const assert=require('node:assert/strict'),{N,H,make,clear,run}=require('./subway238-fixture.cjs');
for(const hz of[30,60,120])for(const hero of['reina','nova','broxton','forest','niko','orion']){
 const g=make(hero,3),p=g.player,world=g.environment156;
 assert(!H.menu(g),'destination menu cannot open on boarding');assert(g.pending.length>=6);assert(!H.choose(g));
 const x=p.x;run(g,.5,{right:true},hz);assert(p.x>x,'train combat movement enabled');
 g.attackInput(true,{attack:true});g.attackInput(false,{});assert(p.act,'native attacks enabled in train');run(g,2,{},hz);
 clear(g,hz);assert(g.encounter222.locks<=2);assert(!H.menu(g),'clearing alone does not skip the walk to front');
 for(let i=0;i<hz*30&&!H.menu(g);i++)g.tick(1/hz,{right:true});assert(H.menu(g));assert.equal(g.player,p);assert.equal(g.environment156,world);
 const menuX=p.x;run(g,.3,{right:true,attack:true},hz);assert.equal(p.x,menuX);assert(H.choose(g,H.destinations.length));assert.equal(H.section(g),2);
 p.y=455;run(g,1.4,{up:true},hz);assert.equal(H.section(g),3);assert(H.menu(g),'cleared train stays cleared on return');assert(!g.pending.length);
}
console.log('PASS247 18 hero/rate train combat, native waves, all-clear AND front gate, locked count, input gate and cleared reboard');
