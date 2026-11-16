const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const sb={console,Math,performance,Date};sb.window=sb;vm.createContext(sb);
const files=[...fs.readFileSync('dist/index.html','utf8').matchAll(/<script src="([^"?]+)\?v=/g)].map(m=>m[1]);
for(const f of files.slice(0,files.indexOf('rising-blade187.js')+1).filter(f=>!f.includes('view')))vm.runInContext(fs.readFileSync('dist/'+f,'utf8'),sb,{filename:f});
for(const hero of ['reina','broxton','nova','forest','niko'])for(const section of [1,3]){
 const g=new sb.NeonCombat.Brawler();g.selectHero(hero);g.startGovernment182(section);g.pending=[];g.enemies=[];g.player.inv=100;
 for(let i=0;i<180;i++)g.tick(1/60,{up:true});assert.equal(g.player.y,458,hero+' rear floor boundary');
 for(let i=0;i<180;i++)g.tick(1/60,{down:true});assert.equal(g.player.y,510);
 const m=sb.Government182.markers(g)[0];g.player.x=g.player.prevX=m.x;g.camera=g.zoneDefinition.end-960;
 for(let i=0;i<180;i++)g.tick(1/60,{up:true});assert(g.transition||g.zone===18,hero+' floor-safe door reachable');
}
{const g=new sb.NeonCombat.Brawler();g.startGovernment182(1);for(const p of g.pending)assert(p.y>=458);g.startGovernment182(0);assert.equal(g.groundBounds.min,420);g.startUptown(2);assert.equal(g.groundBounds.min,438);}
console.log('PASS188 five heroes stay on lobby/approach floor, front-to-back movement, reachable courtroom transitions, floor-safe reinforcement lanes and other-stage bounds unchanged');
