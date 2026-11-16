'use strict';
// Shared deterministic fixture/capture code, also evaluated in the shipping browser.
// No gameplay implementation or replacement renderer is defined here.
const ticks=[0,12,28,44,62,86,116,154,220,300];
function specifications(group){const rows=[];for(const dir of [-1,1]){
 if(group==='forest')for(const move of ['combo','poison','spine','legs','overhead','special'])rows.push({group,move,dir});
 if(group==='niko')for(const move of ['throat','armbar','rearLeg','reverse','ground','special','mount'])rows.push({group,move,dir});
 if(group==='broxton')for(const move of ['forward','back','choke','shield'])rows.push({group,move,dir});
 if(group==='nightshade')for(const type of ['thug','knifeThug'])rows.push({group,move:'leap',type,dir});
 if(group==='shared')for(const move of ['reap','german','powerbomb'])for(const type of move==='powerbomb'?['enforcer']:['thug','enforcer'])rows.push({group,move,type,dir});
 }return rows;}
function seedMath(math,seed){const previous=math.random;let state=seed>>>0;math.random=()=>((state=Math.imul(state,1664525)+1013904223>>>0)/4294967296);return{state:()=>state,restore:()=>math.random=previous};}
function fixture(N,spec,provided){
 const {group,move,dir}=spec,g=provided||new N.Brawler();if(provided)g.reset(0);g.newEnvironment156('UF-render-923');g.nikoRandom185=null;
 if(group==='shared'){
  const type=spec.type;g.selectHero('reina');N.Practice282.setup(g,{id:type,scene284:'restaurant'});g.ai=()=>{};g.reinforce=()=>{};g.props=[];g.pending=[];
  const p=g.player,e=g.enemies[0];p.tactic=e.tactic='rush';Object.assign(p,{x:650,y:470,dir,inv:0,cd:0});Object.assign(e,{x:650+dir*32,y:470,dir:move==='german'?dir:-dir,inv:0,cd:0,activeAt:0,hp:type==='enforcer'?40:e.maxHp});
  if(move==='powerbomb'){e.x=650;e.dir=dir;p.x=650+dir*50;p.dir=-dir;g.enemyAct(e,'bombGrab',1,.3,{enemies210:true});for(let i=0;i<60&&e.act?.name!=='powerBomb';i++)g.tick(1/60,{});}else{if(!g.acquireGrab(e,move==='german',false,true))throw Error('shared grab denied');g.holdAction('attack',move==='german'?(dir===1?{left:true}:{right:true}):(dir===1?{right:true}:{left:true}));}
  const owner=move==='powerbomb'?e:p;return{g,p,e,a:owner.act,owner,origin:p.x,input:{}};
 }
 const hero=group;g.selectHero(hero);g.startUptown(3);g.playing=true;g.ai=g.reinforce=g.reinforceFinancial=()=>{};g.pending=[];g.props=[];g.items=[];g.enemies=[];g.encounters222Enabled=false;g.encounter222=null;
 const p=g.player;p.tactic='rush';Object.assign(p,{x:g.camera+460,prevX:g.camera+460,y:475,dir,inv:0,wakeInv:0,cd:0});
 const rear=group==='forest'?['legs','overhead'].includes(move):group==='niko'?['rearLeg','reverse'].includes(move):group==='broxton'?['forward','back'].includes(move):true;
 const e=N.actor(spec.type||'thug',p.x+dir*(group==='nightshade'?35:55),p.y);Object.assign(e,{hp:1000,maxHp:1000,tactic:'rush',dir:rear?dir:-dir,inv:0,wakeInv:0,cd:999,activeAt:0});g.enemies=[e];
 let started=false,input={};
 if(group==='forest'){N.Forest125.makeDog(g);g.gunner125.x=p.x-dir*85;g.gunner125.y=p.y;N.GunnerTactics173.setMode(g,'balanced');started=g.acquireGrab(e,rear)&&N.Forest177.begin(g,move);}
 if(group==='niko'){if(move==='ground'){g.knockDown(e,dir,3,true);e.inv=0;e.downAge=.5;e.down=2.5;}else if(move!=='mount'&&!g.acquireGrab(e,rear))throw Error('Niko grab denied');started=N.Niko185.beginPair(g,move,e);if(move==='mount')input=dir>0?{right:true}:{left:true};}
 if(group==='broxton'){started=g.acquireGrab(e,rear)&&(move==='shield'?N.Shield181.start(g):N.Broxton179.beginGrab(g,move));if(move==='shield')input={jump:true};}
 if(group==='nightshade'){g.command('grab',{});for(let i=0;i<15;i++)g.tick(1/60,{});g.command('attack',dir>0?{right:true}:{left:true});started=p.act?.grab258&&p.act.move258==='leap';}
 if(!started||!p.act)throw Error('Native grapple did not start: '+JSON.stringify(spec));
 return{g,p,e,a:p.act,owner:p,origin:p.x,input};
}
function physical(q){const{g,p,e}=q;const actor=f=>({fields:['x','y','hp','maxHp','defense','maxDefense','dir','stun','stagger','down','downAge','downTotal','recovering','standingLock','wakeInv','wakeArmor','inv','jump','grappleZ','grappleAngle','grapplePivot','recoveryNotBefore119','reassessUntil274'].map(k=>[k,f[k]??null]),held:f.heldBy?.id??null,holding:f.hold?.victim?.id??null,act:f.act?['name','t','total','hitAt','damage','move177','kind185','move179','move258','done'].map(k=>[k,f.act[k]??null]):null,flight:f.flight?['t','total','from','to','damage','dir','bornAt','nightshade329'].map(k=>[k,f.flight[k]??null]):null});return JSON.stringify({time:g.time,events:g.events.length,actors:g.enemies.length,p:actor(p),e:actor(e),dog:g.gunner125?actor(g.gunner125):null});}
function paint(N,S,createCanvas,q,review){
 const width=1600,height=900,cv=createCanvas(width,height),ctx=cv.getContext('2d'),rendered=new Map();ctx.imageSmoothingEnabled=false;
 // Mirror game.js fighter-root transforms and its grounded114 render-copy contract.
 // Weather/HUD/world layers are checked separately in native game-canvas captures.
 for(const f of [q.p,q.e,...(q.g.gunner125?[q.g.gunner125]:[])]){
  const pv=f.pairVisual,k=N.Forest125.scale(f),dir=pv?.sourceDir||f.dir,z=N.Plane304.height(q.g,f);
  const adjust=(pv?.action?.name==='backThrow'||pv?.action?.counterStyle==='knife')&&pv.action?.pair?.actor?.type==='reina'?(k-1)*pv.pivot*Math.cos(pv.angle):0;
  ctx.save();ctx.translate((pv?pv.cx:f.x)-q.origin+800,(pv?pv.cy-adjust:f.y-z)-q.p.y+600);ctx.scale(dir*k*(f.type==='security'?1.08:1),k);
  if(pv){ctx.rotate(pv.angle*dir);ctx.translate(0,pv.pivot);}else if(f.flight&&!review?.fallActive(f))ctx.rotate((f.flight.startAngle||0)*f.dir*Math.max(0,1-f.flight.t/.18));else if(f.grappleAngle){ctx.translate(0,-(f.grapplePivot||0));ctx.rotate(f.grappleAngle*f.dir);ctx.translate(0,f.grapplePivot||0);}else if(f.heldBy?.act&&['slam','powerSlam','powerBomb','suplex','backThrow','throw'].includes(f.heldBy.act.name)){const a=f.heldBy.act,u=Math.max(0,Math.min(1,a.t/a.hitAt)),angle=a.name==='powerBomb'?(u<.5?-Math.PI*u*2:-Math.PI+(u-.5)*Math.PI):(a.throwDir||-1)*(a.name==='throw'?.65:Math.PI/2)*u;ctx.rotate(angle*f.dir);}
  const argument=(q.g.uptown||f.type==='enforcer'&&(f.guarding>0||f.blockFlash>0||f.act?.name==='guardRaise210')||(f.hipGround118||f.reapGround119)&&f.down)?{...f,grounded114:!z&&!pv&&!f.heldBy&&!f.hold&&!f.grappleAngle&&(!f.act||f.act.name==='guardRaise210'||f.guarding>0||f.blockFlash>0||f.down||f.hp<=0)}:f;
  S.draw(ctx,argument,q.g.time,k);rendered.set(f,argument);ctx.restore();
 }
 const data=ctx.getImageData(0,0,width,height).data;let count=0,left=width,right=-1,top=height,bottom=-1;
 for(let y=0;y<height;y++)for(let x=0;x<width;x++)if(data[(y*width+x)*4+3]>96){count++;left=Math.min(left,x);right=Math.max(right,x);top=Math.min(top,y);bottom=Math.max(bottom,y);}
 const e=q.e,p=q.p,primitive=f=>Object.fromEntries(Object.entries(f).filter(([k,v])=>v==null||['string','number','boolean'].includes(typeof v))),phase=f=>f.flight?'flight':f.down?'down':f.act?'action':f.stun?'stun':'standing';
 return{image:cv.toDataURL('image/png'),bounds:{count,left,right,top,bottom},state:{time:q.g.time,primitive:{hero:primitive(p),victim:primitive(e)},hero:phase(p),victim:phase(e),heroHP:p.hp,victimHP:e.hp,heroZ:p.grappleZ||0,victimZ:e.grappleZ||0,action:p.act?.name||null,nativeFrame:q.a.t*60,throw:rendered.get(e)?.throwVisual329||e.throwVisual329||null,joint:p.grappleRender301||e.grappleRender301?{hero:p.grappleRender301?.mode||null,victim:e.grappleRender301?.mode||null}:null}};
}
module.exports={ticks,specifications,seedMath,fixture,physical,paint};
