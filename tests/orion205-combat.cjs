// Compatibility entry point; current acceptance timings are owned by Build228.
require('./orion228-physical.cjs');require('./orion228-grabs.cjs');
function enemy(g,type='thug',dx=70){const N=require('./orion205-foundation.cjs').N,e=N.actor(type,g.player.x+dx,480);Object.assign(e,{hp:500,maxHp:500,inv:0,wakeInv:0,activeAt:0,dir:-g.player.dir});g.enemies.push(e);return e;}module.exports={enemy};
