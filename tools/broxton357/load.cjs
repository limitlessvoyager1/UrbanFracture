'use strict';
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path'),{load}=require('../qa242/runtime.cjs');
const prerequisites=require('../fighter-render/prerequisites.cjs');
async function renderLoad(seed=290,baseline=false,baseline297=false,flags={}){
 const {createCanvas,Image}=prerequisites.requireCanvas(),files=prerequisites.selectScripts().filter(f=>!['reina354-data.js','reina-bindings354.js','reina-view354.js','katana355-data.js','katana-view355.js','broxton357-data.js','broxton-bindings356.js','broxton-body357.js','broxton-gait357.js'].includes(f)).filter(f=>!JSON.parse(fs.readFileSync('reports354/package.json','utf8')).excludedPresentationScripts.includes(f)),r=load(seed,flags),sb=r.sb,waiting=[],images=[],errors=[],owners=[];
 const nativeDescriptors=Object.getOwnPropertyDescriptors(r.N.Brawler.prototype),nativeData=()=>JSON.stringify({heroes:r.N.HEROES,forest:r.N.Forest177.config,gunner:r.N.GunnerTactics173.profiles,niko:r.N.Niko185.config,broxton:r.N.Broxton179.config,director:r.N.Director148.config}),beforeData=nativeData();
 sb.window=sb;sb.reactionRosterBaseline290=baseline;sb.attackBaseline297=baseline297;
 // Scene helpers required by mixed scene/fighter modules; no general UI controllers.
 sb.NeonGovernmentView182={scene(){}};sb.SlumsView203={hud(){}};sb.SlumsView202={scene(){}};sb.CasinoView192={scene(){},foreground(){}};sb.UrbanEnvironmentView156={foreground(){}};
 sb.Image=class extends Image{
  get src(){return this.renderSource;}
  set src(value){
   const source=typeof value==='string'?value.split('?')[0]:value,receipt={source:typeof source==='string'?source:'[buffer]',status:'loading'};this.renderSource=value;images.push(receipt);
   const callback=this.onload,errorCallback=this.onerror;
   const done=new Promise(resolve=>{
    const failed=error=>{receipt.status='unavailable';receipt.reason=String(error?.message||error);errors.push(receipt);try{errorCallback?.call(this,error);}finally{resolve();}};
    super.onload=()=>{receipt.status='passed';receipt.width=this.width;receipt.height=this.height;try{callback?.call(this);}catch(error){receipt.status='failed';receipt.reason=error.message;errors.push(receipt);}finally{resolve();}};
    super.onerror=failed;
    try{super.src=typeof source==='string'&&!source.startsWith('data:')?fs.readFileSync(path.resolve(prerequisites.root,'dist',source)):source;}catch(error){failed(error);}
   });waiting.push(done);
  }
 };
 sb.document={createElement(kind){if(kind==='canvas')return createCanvas(300,150);return{style:{},append(){},addEventListener(){},querySelector(){return null}};},querySelector(){return null;},getElementById(){return null;},addEventListener(){}};
 sb.setTimeout=()=>0;sb.setInterval=()=>0;sb.requestAnimationFrame=()=>0;sb.addEventListener=()=>{};sb.matchMedia=()=>({matches:false});
 const observedReady=new WeakSet();
 function observeReady(file){const ready=sb.PolishedSprites?.ready;if(ready&&typeof ready.catch==='function'&&!observedReady.has(ready)){observedReady.add(ready);ready.catch(error=>errors.push({source:file+' readiness',status:errors.some(e=>e.status==='unavailable')?'unavailable':'failed',reason:error.message}));}}
 for(const file of files){const previous=sb.PolishedSprites?.draw;vm.runInContext(fs.readFileSync(path.join(prerequisites.root,'dist',file),'utf8'),sb,{filename:file});observeReady(file);checkErrors();if(prerequisites.manifest.drawOwners.includes(file)){if(typeof sb.PolishedSprites?.draw!=='function'||sb.PolishedSprites.draw===previous)throw Error('Fighter draw owner did not attach: '+file);owners.push(file);}}
 async function drain(){let n=0;while(n<waiting.length){const current=waiting.slice(n);n=waiting.length;await Promise.all(current);}}
 function checkErrors(){if(errors.length){const error=Error('Renderer images not ready: '+errors.map(e=>e.source+': '+e.reason).join('; '));error.renderStatus=errors.some(e=>e.status==='failed')?'failed':'unavailable';error.exitCode=error.renderStatus==='unavailable'?2:1;error.images=errors;throw error;}}
 async function waitForRenderReady(){await drain();checkErrors();let timer;try{await Promise.race([sb.PolishedSprites.ready,new Promise((_,reject)=>{timer=setTimeout(()=>{const error=Error('Fighter renderer readiness timed out');error.renderStatus='unavailable';error.exitCode=2;reject(error);},120000);})]);}finally{clearTimeout(timer);}await drain();checkErrors();}
 await waitForRenderReady();
 const afterDescriptors=Object.getOwnPropertyDescriptors(r.N.Brawler.prototype);
 if(Object.keys(nativeDescriptors).length!==Object.keys(afterDescriptors).length||Object.entries(nativeDescriptors).some(([key,d])=>Object.keys(d).some(k=>d[k]!==afterDescriptors[key]?.[k]))||nativeData()!==beforeData)throw Error('Fighter renderer bootstrap modified native combat prototype or configuration');
 const renderMetadata={files,owners,images,combatPreserved:true,get ready(){return images.every(i=>i.status==='passed');},canvas:prerequisites.canvasCheck()};
 async function ensureRenderModules(extra){for(const file of extra){if(files.includes(file))continue;const source=fs.readFileSync(path.join(prerequisites.root,'dist',file),'utf8');if(/PolishedSprites/.test(source)&&/\.draw\s*=/.test(source))throw Error('Additional fighter owner must be reviewed in manifest: '+file);vm.runInContext(source,sb,{filename:file});observeReady(file);checkErrors();files.push(file);}await waitForRenderReady();}
 return{...r,createCanvas,renderMetadata,waitForRenderReady,ensureRenderModules};
}
module.exports={renderLoad};
if(require.main===module)renderLoad().then(({renderMetadata:m})=>console.log('loaded current renderer',JSON.stringify({modules:m.files.length,owners:m.owners.length,images:m.images.length}))).catch(error=>{console.error(error);process.exitCode=error.exitCode||1;});
