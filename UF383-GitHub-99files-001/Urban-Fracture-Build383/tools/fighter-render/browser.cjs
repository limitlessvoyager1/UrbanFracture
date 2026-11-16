'use strict';
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),A=require('node:assert/strict'),{requireCanvas,root,sourceFingerprint}=require('./prerequisites.cjs'),C=require('./cases.cjs');
const output=path.join(root,'reports-fighter-render'),dist=path.join(root,'dist'),source=fs.readFileSync(path.join(__dirname,'cases.cjs'),'utf8');
const groups=process.argv.slice(2).length?process.argv.slice(2):['forest','niko','broxton','nightshade','shared'];
const types={'.js':'text/javascript','.html':'text/html','.css':'text/css','.json':'application/json','.webp':'image/webp','.png':'image/png'};
const report={status:'running',sourceFingerprint:sourceFingerprint(),backend:'shipping index.html / Chromium',comparisons:[],nativeFrames:[],pageErrors:[],failedRequests:[],tolerances:{alphaIoU:.96,boundsPixels:3,physicalEpsilon:1e-6}};
fs.mkdirSync(output,{recursive:true});const save=()=>fs.writeFileSync(path.join(output,'browser.json'),JSON.stringify(report,null,2)+'\n');
const server=http.createServer((req,res)=>{const url=new URL(req.url,'http://127.0.0.1'),file=path.resolve(dist,'.'+decodeURIComponent(url.pathname==='/'?'/index.html':url.pathname));if(!file.startsWith(dist+path.sep)){res.writeHead(403);res.end();return;}fs.readFile(file,(error,data)=>{if(error){res.writeHead(404);res.end();return;}res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');res.end(data);});});
async function compare(a,b){const{loadImage,createCanvas}=requireCanvas(),left=await loadImage(fs.readFileSync(a)),right=await loadImage(fs.readFileSync(b));A.equal(left.width,right.width);A.equal(left.height,right.height);const cv=createCanvas(left.width,left.height),ctx=cv.getContext('2d');ctx.drawImage(left,0,0);const p=ctx.getImageData(0,0,cv.width,cv.height).data;ctx.clearRect(0,0,cv.width,cv.height);ctx.drawImage(right,0,0);const q=ctx.getImageData(0,0,cv.width,cv.height).data;let intersection=0,union=0,error=0;for(let i=0;i<p.length;i+=4){const x=p[i+3]>96,y=q[i+3]>96;if(x&&y)intersection++;if(x||y){union++;for(let j=0;j<4;j++)error+=Math.abs(p[i+j]-q[i+j]);}}return{alphaIoU:intersection/union,rgbaMeanAbsoluteDifference:error/(union*4)};}
(async()=>{let browser;try{
 let chromium;try{({chromium}=require('playwright'));}catch(error){report.status='unavailable';report.reason='Pinned browser test dependency unavailable: '+error.message;save();process.exitCode=2;return;}
 A.equal(require('playwright/package.json').version,require('./package.json').devDependencies.playwright,'Browser test dependency differs from pinned version');
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 try{browser=await chromium.launch({headless:true,...(process.env.UF_CHROMIUM_EXECUTABLE?{executablePath:process.env.UF_CHROMIUM_EXECUTABLE}:{})});}catch(error){report.status='unavailable';report.reason='Chromium executable unavailable: '+error.message;save();process.exitCode=2;return;}
 report.browserVersion=browser.version();report.playwrightVersion=require('playwright/package.json').version;
 async function openPage(){const page=await browser.newPage({viewport:{width:1280,height:900}});page.on('pageerror',e=>report.pageErrors.push(e.message));page.on('response',r=>{if(r.status()>=400)report.failedRequests.push({status:r.status(),path:new URL(r.url()).pathname});});await page.goto('http://127.0.0.1:'+server.address().port,{waitUntil:'load',timeout:90000});await page.waitForFunction(()=>globalThis.PolishedSprites&&!document.querySelector('#play').disabled,{timeout:90000});await page.evaluate(()=>{started=false;paused=true;});return page;}
 report.isolatedFamilyContexts=true;
 for(const group of groups){const native=JSON.parse(fs.readFileSync(path.join(output,'node-'+group+'.json'),'utf8')),dir=path.join(output,'browser-'+group);A(native.status==='passed'&&native.rendered&&native.sourceFingerprint===report.sourceFingerprint,'current successful Node render receipt required: '+group);fs.mkdirSync(dir,{recursive:true});
  const page=await openPage();
  const result=await page.evaluate(({source,group})=>{const module={exports:{}};new Function('module',source)(module);const C=module.exports,N=NeonCombat,S=PolishedSprites,createCanvas=(w,h)=>{const c=document.createElement('canvas');c.width=w;c.height=h;return c;},rows=[];
   for(const spec of C.specifications(group)){const rng=C.seedMath(Math,923);try{const q=C.fixture(N,spec),frames=[];for(let tick=0;tick<=360;tick++){if(C.ticks.includes(tick)){const before=C.physical(q),frame=C.paint(N,S,createCanvas,q,ReviewView287);if(C.physical(q)!==before)throw Error('Browser render changed physical state');frames.push({tick,...frame});}if(tick<360)q.g.tick(1/60,q.input);}rows.push({spec,frames});}finally{rng.restore();}}return rows;
  },{source,group});
  for(let i=0;i<result.length;i++)for(let j=0;j<result[i].frames.length;j++){
   const spec=result[i].spec,b=result[i].frames[j],n=native.rows[i].frames[j],file=path.join(dir,[spec.move,spec.type||'thug',spec.dir,b.tick].join('_')+'.png');fs.writeFileSync(file,Buffer.from(b.image.split(',')[1],'base64'));
   const metrics=await compare(path.join(root,n.file),file),boundsDelta=Math.max(...['left','right','top','bottom'].map(k=>Math.abs(n.bounds[k]-b.bounds[k])));
   const physicalEqual=['time','heroHP','victimHP','heroZ','victimZ','nativeFrame'].every(k=>Math.abs(n.state[k]-b.state[k])<=report.tolerances.physicalEpsilon)&&['hero','victim','action'].every(k=>n.state[k]===b.state[k]);
   const row={spec,tick:b.tick,node:n.file,browser:path.relative(root,file),...metrics,boundsDelta,physicalEqual,passed:metrics.alphaIoU>=report.tolerances.alphaIoU&&boundsDelta<=report.tolerances.boundsPixels&&physicalEqual};if(!row.passed){row.nodeState=n.state;row.browserState=b.state;}report.comparisons.push(row);
  }await page.close();save();console.log('Compared shipping Chromium '+group+': '+result.length+' cases');
 }
 // Native game-canvas samples use the original game's instance and production draw().
 const sceneDir=path.join(output,'native-game');fs.mkdirSync(sceneDir,{recursive:true});
 const page=await openPage();
 const scenes=await page.evaluate(source=>{const module={exports:{}};new Function('module',source)(module);const C=module.exports,rows=[];started=false;paused=true;overlay.hidden=true;overlay.style.display='none';document.querySelector('#pauseLayer').hidden=true;
  for(const group of ['forest','niko','broxton','nightshade','shared'])for(const dir of [-1,1]){
   const spec={group,move:{forest:'special',niko:'reverse',broxton:'shield',nightshade:'leap',shared:'german'}[group],type:group==='nightshade'?'knifeThug':'thug',dir},rng=C.seedMath(Math,923);
   try{const q=C.fixture(NeonCombat,spec,game);for(let tick=0;tick<=154;tick++){if([12,44,86,154].includes(tick)){draw();rows.push({spec,tick,time:game.time,heroHP:q.p.hp,victimHP:q.e.hp,image:canvas.toDataURL('image/png')});}if(tick<154)game.tick(1/60,q.input);}}finally{rng.restore();}
  }return rows;
 },source);
 for(const row of scenes){const file=path.join(sceneDir,[row.spec.group,row.spec.move,row.spec.dir,row.tick].join('_')+'.png');fs.writeFileSync(file,Buffer.from(row.image.split(',')[1],'base64'));delete row.image;report.nativeFrames.push({...row,file:path.relative(root,file)});}
 A.equal(report.pageErrors.length,0,'shipping page JavaScript errors');A(report.comparisons.every(r=>r.passed),'Node/current shipping renderer comparison');report.status='passed';save();console.log('PASS shipping renderer comparisons '+report.comparisons.length+' / native game frames '+report.nativeFrames.length);
 }catch(error){report.status='failed';report.reason=error.stack;save();console.error(error);process.exitCode=1;}finally{if(browser)await browser.close();if(server.listening)server.close();}
})();
