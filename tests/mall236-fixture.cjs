const fs=require('fs'),vm=require('vm'),f=require('./chinatown235-fixture.cjs');vm.runInContext(fs.readFileSync('dist/mall236.js','utf8'),f.sb,{filename:'mall236'});const{N}=f,H=N.Mall236;
function make(hero='reina',k=0){const g=new N.Brawler();g.selectHero(hero);H.start(g,k);g.player.hp=g.player.maxHp=10000;return g;}
function clear(g,hz=60){for(let i=0;i<18000;i++){f.defeat(g);g.player.inv=10;g.tick(1/hz,{right:!!g.pending.length&&!N.LockedBattles222.active(g)});if(g.transition)throw Error('unexpected transition '+H.section(g));if(g.zoneClear&&!N.LockedBattles222.active(g)&&g.settledDefeats()&&(!H.doors[H.section(g)]||g.mall236.rooms[H.section(g)]?.rewards))return;}throw Error('not clear '+H.section(g)+' '+JSON.stringify(N.Audit135.report(g).mall236));}
function travel(g,to,hz=60){if(!H.travel(g,to))throw Error('no door '+H.section(g)+'→'+to+' '+JSON.stringify(H.portals(g)));f.run(g,1.3,{},hz);}
module.exports={...f,H,make,clear,travel};
