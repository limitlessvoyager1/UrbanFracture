/* Developer-only player resources; native damage still owns reactions and recovery. */
(function(r){'use strict';const N=r.NeonCombat,P=N.Brawler.prototype,states=new WeakMap();
function state(g){let s=states.get(g);if(!s){s={health:false,energy:false,queryRead:false,record:null};states.set(g,s);}return s;}
function enabled(g){const s=states.get(g);return !!(s&&(s.health||s.energy));}
function detach(s){const q=s.record;if(!q)return;for(const k of ['hp','defense'])Object.defineProperty(q.p,k,{configurable:true,enumerable:true,writable:true,value:q[k]});s.record=null;}
function sync(g){const s=states.get(g);if(!s)return;const p=g.player;if(s.record&&s.record.p!==p)detach(s);if(!p||!enabled(g)){detach(s);return;}let q=s.record;if(!q){q={p,hp:p.hp,defense:p.defense,damageDepth:0,alive:p.hp>0};s.record=q;const active=()=>g.player===p;
Object.defineProperty(p,'hp',{configurable:true,enumerable:true,get(){return active()&&s.health&&q.alive&&!q.damageDepth?p.maxHp:q.hp;},set(v){if(!s.health||!active()||!q.alive)q.alive=v>0;q.hp=active()&&s.health&&q.alive?(q.damageDepth?Math.max(1,v):p.maxHp):v;}});
Object.defineProperty(p,'defense',{configurable:true,enumerable:true,get(){return active()&&s.energy?p.maxDefense:q.defense;},set(v){q.defense=active()&&s.energy?p.maxDefense:v;}});}
if(s.health&&q.alive&&!q.damageDepth)q.hp=p.maxHp;if(s.energy)q.defense=p.maxDefense;}
function set(g,key,value){if(!['health','energy'].includes(key)||typeof value!=='boolean')throw Error('Invalid player resource option');const s=state(g);s.queryRead=true;s[key]=value;sync(g);return info(g);}
function info(g){const s=state(g);return{health:s.health,energy:s.energy,hero:g.player?.type,hp:g.player?.hp,maxHp:g.player?.maxHp,energyCurrent:g.player?.defense,maxEnergy:g.player?.maxDefense,restartRequired:s.health&&g.player?.hp<=0};}
function bootstrap(g){if(!g.practice278)return;const s=state(g);if(s.queryRead)return;s.queryRead=true;if(!r.location||!r.URL)return;try{const url=new r.URL(r.location.href);if(!url.searchParams.has('practice278'))return;s.health=url.searchParams.get('playerHealth340')==='1';s.energy=url.searchParams.get('playerEnergy340')==='1';sync(g);}catch{}}
for(const key of ['tick','command','attackInput','spendDefense','event','reset','selectHero']){const base=P[key];if(typeof base!=='function')continue;P[key]=function(...args){bootstrap(this);if(!enabled(this))return base.apply(this,args);sync(this);try{return base.apply(this,args);}finally{sync(this);}};}
const damage=P.damage;P.damage=function(actor,...args){if(!enabled(this))return damage.call(this,actor,...args);sync(this);const s=state(this),q=s.record,guard=s.health&&actor===this.player&&q?.alive;if(guard)q.damageDepth++;try{return damage.call(this,actor,...args);}finally{if(guard)q.damageDepth--;sync(this);}};
N.PlayerResources340=r.PlayerResources340={state,set,sync,info};
})(globalThis);
