'use strict';
// Audit only. Default page serves unchanged production bytes. Instrumented pages
// expose/observe the existing cache in the HTTP response; no dist file is edited.
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),crypto=require('node:crypto'),A=require('node:assert/strict');
const P=require('../fighter-render/prerequisites.cjs'),{chromium}=require('../fighter-render/node_modules/playwright'),root=P.root,dist=path.join(root,'dist'),out=path.join(root,'reports-grounded-cache-audit');
fs.mkdirSync(out,{recursive:true});const casesSource=fs.readFileSync(path.join(root,'tools/fighter-render/cases.cjs'),'utf8'),original=fs.readFileSync(path.join(dist,'sprites.js'),'utf8');
const hook="const cached=$13.get(key);",end=original.lastIndexOf('})(window);');A.equal(original.split(hook).length,2);A(end>0);
let instrumented=original.replace(hook,"root.__groundedAudit?.observe({key,time,type:f.type,id:f.id,nativeIndex:frameIndex(f,time),hit:$13.has(key),hitFlash:f.hitFlash||0,label:root.__groundedAudit.label});"+hook);
const at=instrumented.lastIndexOf('})(window);');instrumented=instrumented.slice(0,at)+"root.__groundedAudit={cache:$13,frameIndex,trace:[],label:null,observe(row){this.trace.push(row);}};\n"+instrumented.slice(at);
const report={baseline:'858e7392743cbff9649a547f25db2db47232856d',sourceFingerprint:P.sourceFingerprint(),productionSpriteSHA256:crypto.createHash('sha256').update(original).digest('hex'),instrumentedResponseSHA256:crypto.createHash('sha256').update(instrumented).digest('hex'),primary:[],probes:[],errors:[],requests:[]};
const mime={'.js':'text/javascript','.html':'text/html','.css':'text/css','.json':'application/json','.png':'image/png','.webp':'image/webp'};
const server=http.createServer((req,res)=>{const u=new URL(req.url,'http://127.0.0.1'),file=path.resolve(dist,'.'+decodeURIComponent(u.pathname==='/'?'/index.html':u.pathname));if(!file.startsWith(dist+path.sep)){res.writeHead(403);res.end();return;}fs.readFile(file,(error,bytes)=>{if(error){res.writeHead(404);res.end();return;}res.setHeader('Content-Type',mime[path.extname(file)]||'application/octet-stream');res.end(bytes);});});
function saveImage(name,url){const file=path.join(out,name+'.png'),data=Buffer.from(url.split(',')[1],'base64');fs.writeFileSync(file,data);return{file:path.relative(root,file),sha256:crypto.createHash('sha256').update(data).digest('hex')};}
function save(){fs.writeFileSync(path.join(out,'browser.json'),JSON.stringify(report,null,2)+'\n');}
async function pageFor(browser,traced=false){const page=await browser.newPage({viewport:{width:1280,height:900}});page.on('pageerror',e=>report.errors.push(e.message));page.on('response',r=>{if(r.status()>=400)report.requests.push({status:r.status(),path:new URL(r.url()).pathname});});
 // Keep startup/preview render history out of the controlled primary experiments.
 await page.addInitScript(()=>{window.requestAnimationFrame=()=>0;});
 if(traced)await page.route('**/sprites.js?*',route=>route.fulfill({contentType:'text/javascript',body:instrumented}));
 await page.goto('http://127.0.0.1:'+server.address().port,{waitUntil:'load',timeout:90000});await page.waitForFunction(()=>globalThis.PolishedSprites&&!document.querySelector('#play').disabled,{timeout:90000});return page;}
function primaryTrial({warm,query=2.8166666666666615,type='thug',flash=0,mode='native'}){
 started=false;paused=true;game.reset(0);game.selectHero('reina');game.startUptown(3);game.newEnvironment156('UF-cache-audit');game.ai=game.reinforce=game.reinforceFinancial=()=>{};game.enemies=[];game.pending=[];game.props=[];game.items=[];game.encounters222Enabled=false;game.encounter222=null;
 const f=NeonCombat.actor(type,game.camera+440,475);Object.assign(f,{prevX:f.x,prevY:475,dir:1,hp:60,maxHp:60,inv:0,wakeInv:0,cd:999,tactic:'rush',wetness:0,wetness156:0,act:null,walk:0,down:0,stun:0,blocking:false,guarding:0,hitFlash:0});game.enemies=[f];
 const physical=()=>JSON.stringify({x:f.x,y:f.y,hp:f.hp,defense:f.defense,act:f.act,down:f.down,stun:f.stun,cd:f.cd,events:game.events.length});
 function paint(t,hitFlash=0){game.time=t;f.hitFlash=hitFlash;ctx.setTransform(canvas.width/960,0,0,canvas.height/540,0,0);ctx.clearRect(0,0,960,540);if(mode==='native')drawActor(f);else{ctx.save();ctx.translate(440,475);const k=NeonCombat.Forest125.scale(f);ctx.scale(k,k);PolishedSprites.draw(ctx,{...f,grounded114:true},t,k);ctx.restore();}return canvas.toDataURL('image/png');}
 const before=physical();if(warm!=null)paint(warm,flash);const image=paint(query,0),after=physical();
 return{image,before,after,query,primitive:Object.fromEntries(Object.entries(f).filter(([key,value])=>value==null||['string','number','boolean'].includes(typeof value))),nativePipeline:mode==='native',gameSourceUnmodified:true};
}
(async()=>{let browser;try{await new Promise(r=>server.listen(0,'127.0.0.1',r));browser=await chromium.launch({headless:true,...(process.env.UF_CHROMIUM_EXECUTABLE?{executablePath:process.env.UF_CHROMIUM_EXECUTABLE}:{})});report.browser=browser.version();
 for(const trial of [{name:'cold',warm:null},{name:'matching-warm',warm:.8},{name:'opposite-warm',warm:.9},{name:'same-bucket-opposite',warm:2.8,query:2.9}]){
  const page=await pageFor(browser);const value=await page.evaluate(primaryTrial,trial);const image=saveImage('primary-'+trial.name,value.image);delete value.image;A.equal(value.before,value.after,'native actor render changed physical state');report.primary.push({...trial,...value,...image});await page.close();save();console.log('Primary shipping '+trial.name);
 }
 // Fresh instrumented context: isolated cache probes across current render families.
 const page=await pageFor(browser,true);const probes=await page.evaluate(()=>{
  const R=__groundedAudit,N=NeonCombat,rows=[];started=false;paused=true;R.trace=[];
  function paint(f,time){const c=document.createElement('canvas');c.width=640;c.height=420;const p=c.getContext('2d');p.imageSmoothingEnabled=false;p.translate(320,380);p.scale(f.dir,1);PolishedSprites.draw(p,{...f,grounded114:true},time,1);return c.toDataURL('image/png');}
  for(const type of ['thug','knifeThug','enforcer','biker','sato','akari','flint','bouncer','broxton','forest','reina'])for(const variant of ['idle-clock','hit-flash']){
   const f=N.actor(type,0,475);Object.assign(f,{dir:1,hp:120,maxHp:120,act:null,walk:0,down:0,flight:null,stun:0,shock:0,inv:0,wakeInv:0,weapon:null,tactic:'rush',hitFlash:0});const q=variant==='idle-clock'?2.8166666666666615:.9,w=variant==='idle-clock'?.9:q;
   R.cache.clear();R.label=type+'/'+variant+'/cold';const cold=paint(f,q);R.cache.clear();R.label=type+'/'+variant+'/warm';f.hitFlash=variant==='hit-flash'?.2:0;const warm=paint(f,w);f.hitFlash=0;R.label=type+'/'+variant+'/query';const query=paint(f,q);
   rows.push({type,variant,queryTime:q,warmTime:w,cold,warm,query});
  }return{rows,trace:R.trace};
 });
 report.probeTrace=probes.trace;for(const q of probes.rows){const prefix='probe-'+q.type+'-'+q.variant;report.probes.push({type:q.type,variant:q.variant,queryTime:q.queryTime,warmTime:q.warmTime,cold:saveImage(prefix+'-cold',q.cold),warm:saveImage(prefix+'-warm',q.warm),query:saveImage(prefix+'-query',q.query)});}await page.close();save();
 // Replay the previously mismatched mixed-family history; inspect cache warmers,
 // then briefly cold-render each affected frame and restore cache contents/order.
 const replay=await pageFor(browser,true);const value=await replay.evaluate(source=>{
  const module={exports:{}};new Function('module',source)(module);const C=module.exports,R=__groundedAudit,N=NeonCombat,rows=[];started=false;paused=true;R.trace=[];
  const create=(w,h)=>{const c=document.createElement('canvas');c.width=w;c.height=h;return c;};
  for(const group of ['forest','niko','broxton','nightshade','shared'])for(const spec of C.specifications(group)){const rng=C.seedMath(Math,923);try{const q=C.fixture(N,spec);for(let tick=0;tick<=360;tick++){if(C.ticks.includes(tick)){
   R.label={...spec,tick};const before=C.physical(q),cached=C.paint(N,PolishedSprites,create,q,ReviewView287);if(C.physical(q)!==before)throw Error('Replay draw changed physical fields');
   if(group==='nightshade'&&spec.type==='thug'&&tick===154){const snapshot=[...R.cache];R.cache.clear();R.label={...spec,tick,counterfactual:'cold cache'};const cold=C.paint(N,PolishedSprites,create,q,ReviewView287);R.cache.clear();for(const[k,v]of snapshot)R.cache.set(k,v);if(C.physical(q)!==before)throw Error('Cold probe changed physical fields');rows.push({spec,tick,cached,cold,physicalUnchanged:true});}
  }if(tick<360)q.g.tick(1/60,q.input);} }finally{rng.restore();}}
  return{rows,trace:R.trace};
 },casesSource);report.replayTrace=value.trace;report.replay=[];for(const q of value.rows){const prefix='replay-nightshade-dir'+q.spec.dir;const cached=saveImage(prefix+'-cached',q.cached.image),cold=saveImage(prefix+'-cold',q.cold.image);delete q.cached.image;delete q.cold.image;report.replay.push({...q,cached:{...q.cached,...cached},cold:{...q.cold,...cold}});}await replay.close();
 report.completed=true;save();console.log('Audit completed: '+report.primary.length+' primary histories, '+report.probes.length+' instrumented controls, '+report.replay.length+' mixed-history counterfactuals');
 }catch(error){report.failure=error.stack;save();console.error(error);process.exitCode=1;}finally{if(browser)await browser.close();if(server.listening)server.close();}})();
