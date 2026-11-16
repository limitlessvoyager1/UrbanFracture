const fs=require('fs'),vm=require('vm'),cp=require('child_process'),assert=require('assert/strict');
const current=fs.readFileSync('dist/game.js','utf8'),before=cp.execFileSync('git',['show','1b4352222a6bfe1970ef5be463326e8e0a213a9f:dist/game.js'],{encoding:'utf8'});
function load(src){const begin=src.indexOf('function zheight(f)'),end=src.indexOf('\n}',begin)+2,sb={game:{player:{type:'reina'}},clamp:(v,a,b)=>Math.max(a,Math.min(b,v)),Math};vm.createContext(sb);vm.runInContext(src.slice(begin,end),sb);return sb;}
const a=load(current),b=load(before);let checks=0;
for(const age of[0,.04,.08,.16,.24,.31,.5,1.8]){const f={type:'flint',hp:95,down:1,downAge:age};assert.equal(a.zheight(f),0);checks++;}
for(const f of[{type:'flint',hp:95,down:1,downAge:.16,flight:{t:.2,total:.6,arc:65}},{type:'flint',hp:95,down:0,jump:.34},{type:'flint',hp:95,down:1,heldBy:{act:{name:'slam'}}},{type:'gunner125',hp:1,z:30}]){assert.equal(a.zheight(f),b.zheight(f));checks++;}
for(const s of[a,b])Object.assign(s.game.player,{hp:105,down:1,downAge:.16});assert.equal(a.zheight(a.game.player),b.zheight(b.game.player));checks++;
fs.writeFileSync('reports294/world-anchor.json',JSON.stringify({checks,oldFlintDownLift:b.zheight({type:'flint',hp:95,down:1,downAge:.16}),correctedFlintDownLift:a.zheight({type:'flint',hp:95,down:1,downAge:.16}),scope:'Production game.js function; grounded enemy height, airborne/held/Gunner/hero behavior preserved.'},null,2));console.log('PASS294 WORLD ANCHOR',checks);
