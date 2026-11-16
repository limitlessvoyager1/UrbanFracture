const fs=require('fs'),vm=require('vm'),f=require('./docks231-fixture.cjs');vm.runInContext(fs.readFileSync('dist/highway234.js','utf8'),f.sb,{filename:'highway234'});const{N}=f,H=N.Highway234;
function make(hero='reina',k=0){const g=new N.Brawler();g.selectHero(hero);H.start(g,k);g.player.hp=g.player.maxHp=10000;return g;}
function clear(g){for(let i=0;i<18000;i++){f.defeat(g);g.player.inv=10;const move=g.pending.length&&!N.LockedBattles222.active(g);g.tick(1/60,{right:!!move});if(g.transition)throw Error('unexpected transition '+H.section(g));if(g.zoneClear&&!N.LockedBattles222.active(g)&&g.settledDefeats())return;}throw Error('no clear '+H.section(g)+' '+JSON.stringify({pending:g.pending,actors:g.enemies.map(e=>({hp:e.hp,entry:e.entry,pit:e.pitFall202,down:e.down}))}));}
function travel(g,to){if(!H.travel(g,to))throw Error('no portal '+H.section(g)+'→'+to);f.run(g,1.3);}
module.exports={...f,H,make,clear,travel};
