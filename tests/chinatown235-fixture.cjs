const fs=require('fs'),vm=require('vm'),f=require('./highway234-fixture.cjs');vm.runInContext(fs.readFileSync('dist/chinatown235.js','utf8'),f.sb,{filename:'chinatown235'});const{N}=f,H=N.Chinatown235;
function make(hero='reina',k=0){const g=new N.Brawler();g.selectHero(hero);H.start(g,k);g.player.hp=g.player.maxHp=10000;return g;}
function clear(g){for(let i=0;i<16000;i++){f.defeat(g);g.player.inv=10;g.tick(1/60,{right:!!g.pending.length&&!N.LockedBattles222.active(g)});if(g.transition)throw Error('unexpected transition');if(g.zoneClear&&!N.LockedBattles222.active(g)&&g.settledDefeats())return;}throw Error('not clear '+H.section(g)+' '+JSON.stringify(N.Audit135.report(g).chinatown235));}
function travel(g,to){if(!H.travel(g,to))throw Error('no door '+H.section(g)+'→'+to);f.run(g,1.3);}
module.exports={...f,H,make,clear,travel};
