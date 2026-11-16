const assert=require('assert'),fs=require('fs');const {make,run}=require('./grab223-fixture.cjs');
let cases=0;
for(const hz of [30,60,120])for(const dir of [-1,1]){
 const q=make('nova','enforcer',1,dir),{g,p,e}=q;
 e.x=p.x+dir*70;e.guarding=3;e.dir=-dir;
 let attempts=0;g.damage=function(v){attempts++;v.blockFlash=.14;return false;};
 g.start(p,'blitzKick',1,99,{});const x=e.x;run(g,1.5,{},hz);
 assert(attempts<=3&&attempts>=1,'one attempt per contact stage');assert.equal(e.x,x,'blocked target never dragged');assert.equal(e.hp,115);assert(!p.act);cases++;
}
const source=fs.readFileSync('dist/encounter222.js','utf8');assert(source.includes('if(!e.entry&&!e.entering&&!e.liftEntry)'));assert(source.includes('a.camera+1140'));assert(fs.readFileSync('dist/game.js','utf8').includes("f.act.name==='guardRaise210'"));
console.log('Playtest225: '+cases+' blocked Blitz timing/facing cases passed; entry and grounding integration present.');
const {N}=require('./grab223-fixture.cjs');
for(const adaptive of [false,true]){
 const g=new N.Brawler();g.selectHero('nova');g.startUptown(true);if(!adaptive)g.encounters222Enabled=false;g.player.hp=g.player.maxHp=10000;g.player.inv=10;
 let spawned=null;
 for(let i=0;i<200&&!spawned;i++){g.tick(1/60,{right:true});spawned=g.enemies.find(e=>e.entry);}
 assert(spawned,'park produces native moving entry');assert(spawned.entry.fromX>=g.camera+1100||spawned.entry.fromX<=g.camera-140,'entry begins entirely beyond side');
 const a=spawned.entry;assert.equal(spawned.act,null);const x=spawned.x;g.advanceEntry(spawned,.1);assert.notEqual(spawned.x,x);assert.equal(spawned.act,null);
 g.advanceEntry(spawned,1.2);assert.equal(spawned.entry,null);assert.equal(spawned.x,a.toX);
}
console.log('PASS225 park native/adaptive entrances: offscreen origin, physical walk-in, no entry attacks, exact endpoint.');
for(const hz of [30,60,120])for(const dir of [-1,1]){const{g,p,e}=make('nova','thug',1,dir);e.x=p.x+dir*70;e.guarding=0;g.start(p,'blitzKick',1,99,{});run(g,1.0,{},hz);assert.equal(e.maxHp-e.hp,30,'clean Blitz retains 8+8+14');assert(e.down||e.flight,'clean finish retains knockdown');}
console.log('PASS225 clean Blitz retains full damage and knockdown at three tick rates and both facings.');
