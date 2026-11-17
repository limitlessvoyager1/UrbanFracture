'use strict';
const fs=require('node:fs'),A=require('node:assert/strict'),crypto=require('node:crypto'),{renderLoad}=require('./reina389-render-runtime.cjs');
const keep=setInterval(()=>{},1000);
(async()=>{
 const {N,sb,createCanvas,randomState}=await renderLoad(394,false,false,{publishedDowntown:true,nativeFlint394:true});
 const sources=['reina-view382.js','reina-view383.js','combat-view248.js','downtown-view351.js','flint351.js'],hashes=()=>Object.fromEntries(sources.map(f=>[f,crypto.createHash('sha256').update(fs.readFileSync('dist/'+f)).digest('hex')])),before=hashes(),rows=[];let samples=0,frames=0;
 fs.mkdirSync('reports394',{recursive:true});
 const names=['normal-idle','pipe-idle','pipe-walk','pipe-run','chain-attack','kevin-throw','native-flint-pipe'];
 for(const dir of[-1,1]){
  const sheet=createCanvas(8*600,names.length*330),pen=sheet.getContext('2d');
  for(const [row,name]of names.entries()){
   const g=new N.Brawler();g.selectHero('reina');N.Practice282.setup(g,{id:'thug',scene284:'restaurant'});g.ai=g.reinforce=g.reinforceFinancial=()=>{};g.pending=[];g.props=[];g.enemies=[];g.encounters222Enabled=false;g.downtown345=true;g.nightshade348=true;sb.DowntownRuntime345=g;
   const p=g.player;Object.assign(p,{x:450,y:475,dir,inv:999,cd:0});let e;
   if(name.startsWith('pipe')||name==='chain-attack')p.heldWeapon248={kind:name.startsWith('pipe')?'pipe':'chain',category:'long',uses:5};
   if(name==='chain-attack')g.command('attack',{});
   if(name==='kevin-throw'||name==='native-flint-pipe'){
    e=N.actor(name==='kevin-throw'?'knifeThug':'flint',p.x+dir*(name==='kevin-throw'?330:125),p.y);Object.assign(e,{weapon:name==='kevin-throw'?'knife':'pipe',hp:name==='kevin-throw'?60:1000,maxHp:name==='kevin-throw'?60:1000,dir:-dir,cd:0,standingLock:0,inv:0,wakeInv:0,throwCd:0,activeAt:0});g.enemies=[e];
    if(name==='kevin-throw'){g.enemyAct(e,'knifeThrow',36/60,17/60,{street209:true});A.equal(e.act?.name,'knifeThrow',JSON.stringify(e.street209));}
   }
   const throwFrames=new Set(),chainPhases=new Set();let pipeSamples=0,projectileSamples=0,nativePipeSamples=0;
   for(let i=0;i<120;i++){
    if(i%5===0){
     const cv=createCanvas(600,330),c=cv.getContext('2d');c.fillStyle='#203344';c.fillRect(0,0,600,330);const pipeWidths=[],round=c.roundRect.bind(c);c.roundRect=function(x,y,w,h,...r){const m=c.getTransform();if(w===72&&h===8)pipeWidths.push(Math.hypot(m.a*w,m.b*w));return round(x,y,w,h,...r);};const state=JSON.stringify([p.x,p.y,p.hp,p.act?.name,p.act?.t,e?.x,e?.hp,e?.act?.t,g.projectiles.map(k=>[k.x,k.y,k.life])]),rng=randomState();
     for(const f of[...g.enemies,p]){const k=N.Forest125.scale(f);c.save();c.translate(180+f.x-p.x,300+f.y-p.y);c.scale(f.dir*k,k);sb.PolishedSprites.draw(c,f,g.time,k);c.restore();}
     c.save();c.translate(0,300-p.y);for(const k of g.projectiles){N.Street209.drawProjectile(c,{...g,camera:p.x-180},k);if(k.knifeVisual394)projectileSamples++;}c.restore();if(name.startsWith('pipe')||name==='native-flint-pipe'){A.equal(pipeWidths.length,1,'Exactly one pipe must be painted');A.ok(Math.abs(pipeWidths[0]-72*N.Forest125.scale({type:'flint'}))<1e-5,'Actual pipe raster transform must preserve world length');}
     if(e?.act?.name==='knifeThrow'){A.equal(e.throwVisual394.release,17/60);A.equal(e.throwVisual394.knifeReleased,e.act.t>=17/60);throwFrames.add(e.throwVisual394.frame);}
     if(name==='native-flint-pipe'){A.ok(e.weaponVisual351,'Actual native Flint prop owner must render');A.ok(!e.pipe393,'Generic-atlas socket must not paint a second pipe');nativePipeSamples++;}
     if(name.startsWith('pipe')){A.equal(p.pipeWorldLength394,72*N.Forest125.scale({type:'flint'}));pipeSamples++;}
     if(p.act?.weaponInfo248?.kind==='chain'){A.equal(p.chainPose394.nativeContactUnchanged,true);chainPhases.add(Math.floor(p.chainPose394.phase));}
     A.equal(randomState(),rng);A.equal(JSON.stringify([p.x,p.y,p.hp,p.act?.name,p.act?.t,e?.x,e?.hp,e?.act?.t,g.projectiles.map(k=>[k.x,k.y,k.life])]),state,'Rendering must not change native state');
     const display=[0,5,10,15,20,25,35,50].indexOf(i);if(display>=0)pen.drawImage(cv,display*600,row*330);samples++;
    }
    g.tick(1/60,/walk|run/.test(name)?{[dir>0?'right':'left']:true,run:name.endsWith('run')}:{});frames++;
   }
   if(name==='kevin-throw'){A.equal(throwFrames.size,4);A.ok(projectileSamples>0);}
   if(name==='chain-attack')A.ok(chainPhases.size>=3);
   rows.push({name,dir,throwFrames:[...throwFrames],chainPhases:[...chainPhases],pipeSamples,projectileSamples,nativePipeSamples});
  }
  fs.writeFileSync('reports394/native-'+(dir>0?'R':'L')+'.webp',sheet.toBuffer('image/webp',{quality:88}));
 }
 const g=new N.Brawler();g.selectHero('reina');g.downtown345=true;g.zone=2;g.camera=4560;g.items=[];sb.DowntownRuntime345=g;const c=createCanvas(960,540).getContext('2d'),camera=g.camera;A.equal(sb.DowntownView348.scene(c,g),true);A.equal(g.facadeJoin394.worldX,5040);A.equal(g.camera,camera);fs.writeFileSync('reports394/facade-join.webp',c.canvas.toBuffer('image/webp',{quality:90}));
 A.deepEqual(hashes(),before);fs.writeFileSync('reports394/native.json',JSON.stringify({passed:true,frames,samples,rows,sourceAssets:before,publishedModuleSet:true,nativeFlintOwner:true,physicalController:false,artisticApproval:false},null,2));console.log(JSON.stringify({passed:true,frames,samples,cases:rows.length,facade:true}));
})().catch(error=>{console.error(error);process.exitCode=1;}).finally(()=>clearInterval(keep));

