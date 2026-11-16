const fs=require('fs'),vm=require('vm'),{N,sb,run}=require('./orion205-foundation.cjs');for(const f of ['taser206','video207','flint208','street209','enemies210','flint211','martial212','jesse213','chemical214','security216','gus219','aidan221','encounter222','encounter-config222'])vm.runInContext(fs.readFileSync('dist/'+f+'.js','utf8'),sb,{filename:f});
function make(hero='reina'){const g=new N.Brawler();g.selectHero(hero);g.reset(0);g.player.hp=g.player.maxHp=10000;return g;}
function defeat(g){for(const e of g.enemies)if(e.hp>0&&!e.dormant){e.inv=0;g.damage(e,99999,1,true,{attacker:g.player,force:true});}}
module.exports={N,sb,run,make,defeat,A:N.Adaptive222,L:N.LockedBattles222};
