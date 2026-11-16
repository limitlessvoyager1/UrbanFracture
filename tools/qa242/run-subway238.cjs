'use strict';
// Current completion-choice contract; retained Subway assertions stay source-pinned.
const fs=require('node:fs'),path=require('node:path'),Module=require('node:module'),assert=require('node:assert/strict'),C=require('./coverage.cjs');
const anchor='for(let i=0;i<300&&!H.active(g);i++)N.Slums204.advanceClear(g,.04);';
const replacement="require('../tools/qa242/run-subway238.cjs').continueRoute(N,H,g);";
function prepare(source,index){
 const pinned=index.entries.find(q=>q.path==='tests/subway238.cjs');
 if(!pinned||C.blob(Buffer.from(source))!==pinned.sha)throw Error('Retained subway238 differs from pinned source');
 if(source.split(anchor).length!==2)throw Error('Subway completion timer anchor changed');
 return source.replace(anchor,replacement);
}
function continueRoute(N,H,g,hz=60){
 assert(g.levelClear?.slums204,'actual Colt outro must reach Slums completion');
 assert(g.homeOffer327,'completion choice must be offered');
 assert(N.Home327.blocked(g),'completion offer must block gameplay');
 const time=g.time,clearTime=g.levelClear.t,player=g.player,world=g.environment156;
 for(let i=0;i<hz;i++)g.tick(1/hz,{});
 assert.equal(g.time,time,'game clock pauses before continuation choice');
 assert.equal(g.levelClear.t,clearTime,'clear clock pauses before continuation choice');
 assert(!H.active(g),'no Subway arrival before continuation choice');
 N.Home327.resume(g); // Native backend used by HomeUI327's Continue selected route.
 assert(!N.Home327.blocked(g));
 assert.equal(g.levelClear.homeContinue327,true);
 for(let i=0;i<hz*10&&!H.active(g);i++)g.tick(1/hz,{});
 assert(H.active(g),'ordinary ticks must reach Subway after continuation');
 assert(g.transition?.slums202,'arrival must retain the native fade transition');
 assert.equal(g.player,player);assert.equal(g.environment156,world);
 return {arrivalTime:g.time,player,world};
}
function main(){
 const root=path.resolve(__dirname,'../..'),file=path.join(root,'tests/subway238.cjs');
 const source=prepare(fs.readFileSync(file,'utf8'),require('../../qa/system242/coverage-source-index.json'));
 console.log('QA242 Subway: explicit native completion choice replaces direct clear-timer calls; all retained route and final transition assertions remain');
 const m=new Module(file);m.filename=file;m.paths=Module._nodeModulePaths(path.dirname(file));m._compile(source,file);
}
module.exports={prepare,continueRoute,anchor,replacement};
if(require.main===module)main();
