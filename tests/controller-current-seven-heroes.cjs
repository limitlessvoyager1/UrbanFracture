'use strict';
// Build318 approved charge contract; simulated production gamepad routes, not hardware proof.
// Uses the 219-module simulation boundary plus the native gamepad/game shell; not full renderer or hardware proof.
// Expected thresholds are independent of runtime introspection.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');const noop=()=>{},ctx=new Proxy({},{get:(o,k)=>o[k]??noop,set:(o,k,v)=>(o[k]=v,true)}),els={},el=()=>({style:{},textContent:'',dataset:{},value:'auto',getContext:()=>ctx,setAttribute:noop,append:noop,after:noop,querySelectorAll:()=>[el()],querySelector:()=>el(),replaceChildren:noop,addEventListener:noop,focus:noop,dispatchEvent:noop});let pads=[];const listeners={},calls=[];
class CombatAudio{impact(k){calls.push(k);}voice(k){calls.push(k);}camera128(){}gunshot(){}}
const sb={console,Event:class{},NeonAudio:{CombatAudio},document:{hidden:false,body:el(),head:el(),querySelector:s=>els[s]??=el(),querySelectorAll:()=>[],createElement:el,addEventListener:noop},navigator:{getGamepads:()=>pads},matchMedia:()=>({matches:true}),addEventListener:(k,f)=>listeners[k]=f,requestAnimationFrame:noop,HTMLButtonElement:class{},Image:class{},PolishedSprites:{ready:new Promise(noop),draw:()=>true}};vm.createContext(sb);const scripts=[...fs.readFileSync('dist/index.html','utf8').matchAll(/<script src="([^"?]+)\?v=/g)].map(m=>m[1]);for(const f of [...scripts.slice(0,scripts.indexOf('woods139.js')).filter(f=>!f.includes('view')),...scripts.filter(f=>['environment217.js','environment218.js','stabilization241.js'].includes(f)),'gamepad.js','game.js'])vm.runInContext(fs.readFileSync('dist/'+f,'utf8'),sb);const run=s=>vm.runInContext(s,sb),pad=(buttons=[],mapping='standard',id='DualSense USB',axes=[0,0])=>({index:0,id,mapping,connected:true,axes,buttons:Array.from({length:18},(_,i)=>({pressed:buttons.includes(i),value:buttons.includes(i)?1:0}))});
function setup(hero){run(`ready=true;started=true;paused=false;windowFocused=true;padConnected=false;padUsed=false;game.selectHero('${hero}');game.ai=()=>{};game.reinforce=()=>{};game.pending=[];game.props=[];game.items=[];game.player.x=650;game.player.y=455;game.player.dir=1;game.enemies=[NeonCombat.actor('thug',785,455)];game.enemies[0].hp=game.enemies[0].maxHp=1000;game.enemies[0].cd=999;padReader.previous={};padNeutral=false;for(const k of Object.keys(held))delete held[k];`);}
const contracts={reina:{seconds:1,action:'tornadoKick130'},nova:{seconds:2,action:'hypeFlex'},broxton:{seconds:3,action:'ironWill179'},forest:{seconds:1,action:'maulCommand175'},niko:{seconds:1,action:'niko185'},orion:{seconds:3,action:'orion205'},nightshade:{seconds:1,action:'nightshade257'}};
let cases=0;
for(const [hero,contract] of Object.entries(contracts))for(const [mapping,button,id]of [['standard',2,'DualSense USB'],['',0,'DualSense Wireless Controller'],['standard',2,'Xbox 360 Controller (DSX)']])for(const ticks of [1,Math.round(contract.seconds*60)-1,Math.round(contract.seconds*60),Math.round(contract.seconds*60)+1,300]){
 const label=JSON.stringify({hero,mapping,id,ticks,expectedSeconds:contract.seconds}),ready=ticks>=contract.seconds*60;
 setup(hero);assert.equal(run('game.player.type'),hero,label+' selected actual hero');pads=[pad([],mapping,id)];run('pollGamepad()');pads=[pad([button],mapping,id)];run('pollGamepad()');assert(run('!!game.player.act'),label+' immediate ordinary attack');
 for(let i=0;i<ticks;i++)run('game.tick(1/60,pollGamepad())');
 assert.equal(run("game.events.filter(e=>e.type==='chargeReady130').length"),ready?1:0,label+' single ready cue');
 assert.equal(run('NeonCombat.Charge130.seconds(game.player)'),contract.seconds,label+' approved threshold');
 if(hero==='nova'&&ready)assert(run('game.player.hypeUntil>game.time'),label+' automatic Nova activation');else assert.equal(run('!!game.player.charge130.ready'),ready,label+' held readiness');
 if(hero!=='nova')assert.equal(run("game.events.filter(e=>e.type==='chargeRelease130').length"),0,label+' release only');
 pads=[pad([],mapping,id)];run('pollGamepad()');
 assert.equal(run("game.events.filter(e=>e.type==='chargeRelease130').length"),ready?1:0,label+' release event');
 if(ready&&hero!=='nova')assert.equal(run('game.player.act?.name'),contract.action,label+' release action');
 cases++;
}
console.log('PASS seven-hero current controller charge: '+cases+' cases, approved 1/2/3-second thresholds, before/at/after boundary, single cue and release semantics; simulated standard/raw Sony/DSX only');
