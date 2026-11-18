'use strict';
const fs=require('fs'),A=require('node:assert/strict'),crypto=require('crypto');
const {renderLoad}=require('./reina389-render-runtime.cjs');
const keep=setInterval(()=>{},1000),out='reports-reina399';fs.mkdirSync(out,{recursive:true});
(async()=>{
 const {N,sb,createCanvas,randomState,ensureRenderModules}=await renderLoad(399,false,false,{publishedDowntown:true,nativeFlint394:true});
 await ensureRenderModules(['reina-uniform-data.js','reina-costume.js']);A.equal(await sb.ReinaCostume.ready,true);
 const rows=[];
 const allSpecs=[{type:'thug',move:'combo'},...['thug','knifeThug','sato','enforcer'].flatMap(type=>['hip','reap','front-hold','front-knee','hook'].map(move=>({type,move}))),...['walk','run','knife-walk','knife-run'].map(move=>({type:'thug',move})),...['thug','knifeThug','sato','akari','enforcer','bouncer','cop','flint'].map(type=>({type,move:'enemy-walk'})),{type:'enforcer',move:'enemy-bomb'},{type:'enforcer',move:'enemy-bomb',outfit:'royal-uniform'}];
 const only=process.argv.find(a=>a.startsWith('--only='))?.slice(7);if(only)A.ok(allSpecs.some(x=>x.move===only),'Known development subset');const specs=only?allSpecs.filter(x=>x.move===only):allSpecs;
 const native=g=>JSON.stringify([g.time,...[g.player,...g.enemies].map(f=>[f.id,f.x,f.y,f.dir,f.hp,f.defense,f.stun,f.down,f.downAge,f.jump,f.flight?.t,f.act?.name,f.act?.t,f.act?.hitAt,f.hold?.age,f.hold?.victim?.id,f.heldBy?.id])]);
 for(const dir of[-1,1])for(const spec of specs){
  const g=new N.Brawler();g.selectHero('reina');N.Practice282.setup(g,{id:'thug',scene284:'restaurant'});g.pending=[];g.props=[];g.items=[];g.encounters222Enabled=false;g.encounter222=null;g.reinforce=g.reinforceFinancial=()=>{};const nativeAI=g.ai;g.ai=()=>{};g.downtown345=g.nightshade348=true;sb.DowntownRuntime345=g;
  const p=g.player;if(spec.outfit)p.costume=spec.outfit;Object.assign(p,{x:450,y:475,dir,cd:0,inv:0,defense:100});const e=N.actor(spec.type,p.x+dir*40,p.y);Object.assign(e,{dir:-dir,hp:spec.type==="enforcer"?40:e.maxHp,maxHp:e.maxHp,inv:0,wakeInv:0,cd:999,activeAt:0});g.enemies=[e];
  const move=spec.move;if(/walk|run/.test(move))e.x=p.x+dir*600;if(move==="enemy-walk"){g.ai=nativeAI;e.cd=0;e.x=p.x+dir*280;}const moving=/walk|run/.test(move),input=moving&&!move.startsWith('enemy')?{[dir>0?'right':'left']:true,run:move.endsWith('run')}:{};
  if(move==='combo')g.command('attack',{});if(move.startsWith('knife'))p.heldWeapon248={kind:'knife',category:'short',uses:5};
  if(['hip','reap','front-hold','front-knee','hook'].includes(move)){e.dir=move==='hook'?dir:-dir;A.ok(g.acquireGrab(e,move==='hook',false,true));if(move!=='front-hold')g.command('attack',move==='hip'?{[dir>0?'left':'right']:true}:['reap','hook'].includes(move)?{[dir>0?'right':'left']:true}:{});}
  if(move==='enemy-walk'&&N.Martial212.is(e)){g.ai=()=>{};A.ok(N.Martial212.begin(g,e,'martialStep212',{dx212:-e.dir*15,dy212:35}),'Native martial step request');}
  if(move==='enemy-bomb'){e.cd=0;p.inv=0;g.enemyAct(e,'bombGrab',.68,.34);}
  let comboStages=new Set(),victimPoses=new Set(),poses=new Set(),grip=0,punch=0,held=0,draws=0,walkSamples=0;const fromEnemyX=e.x;const sheet=createCanvas(8*420,2*280),pen=sheet.getContext('2d');const captures=new Set();
  for(let tick=0;tick<180;tick++){if(move==='combo'&&[18,40].includes(tick))g.command('attack',{});if(p.act?.reina134)comboStages.add(p.act.combo);
   
   if(tick%3===0){
    const cv=createCanvas(420,280),c=cv.getContext('2d');c.fillStyle='#263846';c.fillRect(0,0,420,280);c.strokeStyle='#d4b889';c.beginPath();c.moveTo(0,250);c.lineTo(420,250);c.stroke();
    const before=native(g),rng=randomState();
    for(const f of [e,p]){const pv=f.pairVisual,k=N.Forest125.scale(f),d=pv?.sourceDir||f.dir;c.save();c.translate(170+(pv?pv.cx:f.x)-(move==='enemy-walk'?e.x:p.x),250+(pv?pv.cy:f.y)-p.y-(pv?0:N.Plane304.height(g,f)));c.scale(d*k,k);if(pv){c.rotate(pv.angle*d);c.translate(0,pv.pivot);}sb.ReinaCostume.scope(c,f,()=>sb.PolishedSprites.draw(c,f,g.time,k));c.restore();}
    A.equal(native(g),before,'Renderer changed native state '+move);A.equal(randomState(),rng,'Renderer consumed RNG');
    if(e.walk)walkSamples++;if(p.heldBy&&p.powerbombVictim399)victimPoses.add(p.powerbombVictim399.frame);if(e.grabReaction381?.restrained)grip++;if(p.act?.punched119)punch++;if(p.heldBy)held++;
    poses.add(crypto.createHash('sha256').update(cv.toBuffer('image/png')).digest('hex'));if(e.hookFloor399)A.ok(e.hookFloor399.visibleBottom<=e.hookFloor399.floor+.01,'Victim stays on floor');
    const snap=Math.floor(tick/12);if(snap<16&&!captures.has(snap)){captures.add(snap);pen.drawImage(cv,(snap%8)*420,Math.floor(snap/8)*280);}
    draws++;
   }
   g.tick(1/60,input);
  }
  if(move==='combo')A.deepEqual([...comboStages].sort(),[1,2,3],'All native combo stages exercised');if(move==='enemy-walk')A.ok(walkSamples>0&&Math.abs(e.x-fromEnemyX)>10,'Native walking route exercised '+spec.type);if(move==='front-hold')A.ok(grip>0,'Restrained pose '+spec.type);
  if(move==='enemy-bomb'){A.ok(held>0,'Native Bruno powerbomb must connect');A.equal(victimPoses.size,3,'All current-design captured poses');}if(move==='reap')A.ok(punch>0,'Ground face punch must still happen '+spec.type);
  const name=[spec.type,move,dir,spec.outfit||'default'].join('-');fs.writeFileSync(out+'/'+name+'.webp',sheet.toBuffer('image/webp',{quality:87}));rows.push({...spec,dir,draws,comboStages:[...comboStages],victimPoses:[...victimPoses],walkSamples,enemyTravel:Math.abs(e.x-fromEnemyX),distinctPoses:poses.size,grip,punch,held});console.log(name,JSON.stringify(rows.at(-1)));
 }
 const paths=['dist/downtown-view351.js','dist/reina-view381.js','dist/reina-view382.js','dist/reina-view383.js','dist/reina-costume.js','dist/reina-uniform-data.js'];
 fs.writeFileSync(out+'/native-render'+(only?'-'+only:'')+'.json',JSON.stringify({scope:only?'Development subset: '+only:'Complete recording matrix',rows,sourceHashes:Object.fromEntries(paths.map(p=>[p,crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex')])),physicalController:false,artisticApproval:false,certified:false},null,2));
})().catch(e=>{console.error(e);process.exitCode=1;}).finally(()=>clearInterval(keep));
