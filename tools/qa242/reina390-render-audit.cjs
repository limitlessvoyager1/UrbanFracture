'use strict';
const fs=require('node:fs'),crypto=require('node:crypto'),A=require('node:assert/strict'),{renderLoad}=require('./reina389-render-runtime.cjs');
const keep=setInterval(()=>{},1000);
(async()=>{
 const {N,sb,createCanvas,randomState}=await renderLoad(390);fs.mkdirSync('reports390',{recursive:true});
 const production=['dist/gamepad.js','dist/reina-view382.js','dist/reina-view383.js','dist/assets/reina383/motion.webp','dist/assets/reina-concept-v1.webp'];
 const hashes=()=>Object.fromEntries(production.map(p=>[p,crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex')]));const beforeHashes=hashes(),rows=[];let frames=0,samples=0;
 for(const dir of[-1,1]){
  const names=['idle','walk-run-stop','hip','reap','german','neutral','forward','down'],sheet=createCanvas(9*330,names.length*330),pen=sheet.getContext('2d');
  for(const[row,name]of names.entries()){
   const g=new N.Brawler();g.selectHero('reina');N.Practice282.setup(g,{id:'thug',scene284:'restaurant'});g.ai=g.reinforce=g.reinforceFinancial=()=>{};g.enemies=[];g.pending=[];g.props=[];g.encounters222Enabled=false;
   const p=g.player;Object.assign(p,{x:450,y:475,prevX:450,prevY:475,dir,cd:0,inv:0,wakeInv:0});sb.DowntownRuntime345=g;
   if(['hip','reap','german'].includes(name)){const e=N.actor('thug',p.x+dir*36,p.y);Object.assign(e,{hp:1000,maxHp:1000,dir:name==='german'?dir:-dir,cd:999,inv:0,wakeInv:0,activeAt:0});g.enemies=[e];A.ok(g.acquireGrab(e,name==='german',false,true));g.command('attack',{[(name==='reap'?dir:-dir)>0?'right':'left']:true});}
   if(['neutral','forward','down'].includes(name)){g.command('jump',name==='forward'?{[dir>0?'right':'left']:true}:{});for(let i=0;i<8;i++)g.tick(1/60,{});g.attackInput(true,name==='down'?{down:true}:name==='forward'?{[dir>0?'right':'left']:true}:{});A.equal(p.act?.name,name==='down'?'airKnee':name==='neutral'?'neutralAirKick':'airKick');}
   const actions=new Set(),states=new Set();let activeDive=0;
   for(let f=0;f<150;f++){
    if(f%20===0||f===149){const cv=createCanvas(330,330),c=cv.getContext('2d'),state=JSON.stringify([p.x,p.y,p.jump,p.grappleZ,p.hp,p.defense,p.act?.name,p.act?.t,p.act?.hitAt,p.act?.total]),rng=randomState();c.fillStyle='#172433';c.fillRect(0,0,330,330);c.save();c.translate(165,290-N.Plane304.height(g,p));c.scale(dir,1);sb.PolishedSprites.draw(c,p,g.time,1);c.restore();A.equal(JSON.stringify([p.x,p.y,p.jump,p.grappleZ,p.hp,p.defense,p.act?.name,p.act?.t,p.act?.hitAt,p.act?.total]),state);A.equal(randomState(),rng);A.equal(p.render383.bodyScale,.9555);if(p.act?.swordDive313){A.equal(p.render382?.state,'legacy-downward-stab');activeDive++;}c.fillStyle='white';c.font='11px monospace';c.fillText(name+' '+(dir>0?'R':'L')+' f'+f,4,14);pen.drawImage(cv,(f===149?8:Math.floor(f/20))*330,row*330);samples++;}
    actions.add(p.act?.name||'idle');states.add(p.render382?.state||p.render383?.state);const input=name==='walk-run-stop'&&f<120?{[dir>0?'right':'left']:true,...(f>=45?{run:true}:{})}:{};g.tick(1/60,input);frames++;
   }
   if(name==='down')A.ok(activeDive>0);g.enemies=[];const quiet=[p.x,p.y,p.jump,p.grappleZ||0];for(let f=0;f<120;f++){g.tick(1/60,{});A.deepEqual([p.x,p.y,p.jump,p.grappleZ||0],quiet);frames++;}rows.push({name,dir,actions:[...actions],states:[...states],quietAfterAction:true});
  }
  fs.writeFileSync('reports390/native-'+(dir>0?'R':'L')+'.webp',sheet.toBuffer('image/webp',{quality:87}));
 }
 A.deepEqual(hashes(),beforeHashes);const report={passed:true,frames,samples,bodyScale:.9555,sourceAssets:beforeHashes,readOnlyState:true,unchangedRenderRNG:true,physicalController:false,browser:false,artisticApproval:false,rows};fs.writeFileSync('reports390/native-render.json',JSON.stringify(report,null,2));console.log(JSON.stringify({...report,rows:rows.length}));
})().catch(e=>{console.error(e);process.exitCode=1}).finally(()=>clearInterval(keep));
