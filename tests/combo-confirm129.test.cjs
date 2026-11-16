const assert=require('node:assert/strict'),fs=require('node:fs');
const {Brawler,actor}=require('../dist/core.js');
const scripts=[...fs.readFileSync('dist/index.html','utf8').matchAll(/<script src="([^"?]+)\?v=/g)].map(m=>m[1]);
for(const file of scripts.slice(1,(scripts.includes('charge130.js')?scripts.indexOf('charge130.js'):scripts.indexOf('combo-confirm129.js'))+1))if(!file.includes('view'))require('../dist/'+file);
function setup(hero,dir=1,mode='hit') {const g=new Brawler();g.selectHero(hero);g.pending=[];g.props=[];g.items=[];g.enemies=[];g.ai=()=>{};g.reinforce=()=>{};g.zoneClear=true;const p=g.player;p.x=p.prevX=500;p.y=455;p.dir=dir;const e=actor('thug',500+dir*(mode==='miss'?400:60),mode==='plane'?500:455);e.hp=e.maxHp=1000;e.cd=999;e.inv=mode==='immune'?5:0;g.enemies=[e];if(mode==='block'){e.type='cop';e.dir=-dir;e.guarding=5;}return{g,p,e};}
function run(g,t){for(let i=0;i<Math.ceil(t*120);i++)g.tick(1/120,{});}
function tap(g){g.attackInput(true,{});g.attackInput(false,{});}
const stage=a=>['combo','broxCombo179'].includes(a?.name)?a.combo:a?.kind125==='combo'?a.stage125:null;
for(const hero of ['reina','broxton','nova','forest'])for(const dir of [1,-1]){
 for(const mode of ['miss','plane','immune']){const {g,p}=setup(hero,dir,mode);tap(g);assert.equal(stage(p.act),1,hero);const opener=p.act;for(let i=0;i<85;i++){if(i%7===0)tap(g);g.tick(1/120,{});assert(!stage(p.act)||stage(p.act)===1,`${hero} continued on ${mode}`);}run(g,.6);tap(g);assert.equal(stage(p.act),1,hero+' reset after whiff');}
 for(const mode of ['hit','block']){const {g,p,e}=setup(hero,dir,mode);tap(g);const a=p.act;for(let i=0;i<60&&p.act===a;i++)g.tick(1/120,{});assert(p.comboConfirmed129||a.confirmed125,hero+' '+mode+' not confirmed');p.stun=p.cd=0;tap(g);assert.equal(stage(p.act),2,hero+' cannot chain '+mode);}
 // A successful opener unlocks the string, even if a later strike misses.
 {const {g,p,e}=setup(hero,dir);tap(g);run(g,.5);e.x=1000;tap(g);run(g,.5);tap(g);assert.equal(stage(p.act),3,hero+' later miss should not invalidate opener');}
 // Empty-space queued presses never cancel Nova's opener early.
 if(hero==='nova'){const{g,p}=setup(hero,dir,'miss');tap(g);const a=p.act;tap(g);run(g,.17);assert.equal(p.act,a);run(g,.2);assert(!p.novaQueued);}
 // Props do not unlock a character combo.
 {const{g,p}=setup(hero,dir,'miss');g.props=[{x:500+dir*55,y:455,hp:100,kind:'crate'}];tap(g);run(g,.5);tap(g);assert.equal(stage(p.act),1);}
}
const {Reader}=require('../dist/gamepad.js');
for(const hero of ['reina','broxton','nova','forest'])for(const [mapping,button,id]of [['standard',2,'DualSense USB'],['',0,'DualSense Wireless Controller'],['standard',2,'Xbox 360 Controller (DSX)']])for(const mode of ['miss','hit']){
 const {g,p}=setup(hero,1,mode),reader=new Reader();const feed=pressed=>{const pad={index:0,id,mapping,connected:true,axes:[0,0],buttons:Array.from({length:18},(_,i)=>({pressed:pressed&&i===button,value:pressed&&i===button?1:0}))};const state=reader.sample([pad]);if(state.pressed.includes('attack'))g.attackInput(true,state.held);if(state.released.includes('attack'))g.attackInput(false,state.held);g.tick(1/120,{});};feed(false);let max=0;for(let i=0;i<100;i++){feed(i%28===0);max=Math.max(max,stage(p.act)||0);}assert(mode==='miss'?max===1:max>=2,hero+' '+id+' '+mode);
}
console.log('PASS all4 heroes / both facings: hit and guard contact unlock; distance, plane, immunity and prop whiffs cannot chain; queued Nova whiffs finish naturally; later misses retain confirmed string');
