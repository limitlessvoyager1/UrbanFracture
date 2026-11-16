'use strict';
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const packageSpec=require('./package.json'),manifest=require('./manifest.json'),root=path.resolve(__dirname,'../..');
function canvasCheck(resolve=()=>require.resolve('@napi-rs/canvas'),load=require,metadataFor=file=>JSON.parse(fs.readFileSync(path.join(path.dirname(file),'package.json'),'utf8'))){
 const expected=packageSpec.devDependencies['@napi-rs/canvas'];let file;
 try{file=resolve();}catch(error){return{status:'unavailable',expected,reason:'Canvas dependency unavailable: '+error.message,install:'cd tools/fighter-render && npm ci --ignore-scripts'};}
 try{
  const metadata=metadataFor(file);
  if(metadata.version!==expected)return{status:'failed',expected,actual:metadata.version,reason:'Canvas version differs from pinned test dependency'};
  const api=load(file),c=api.createCanvas(8,8),ctx=c.getContext('2d');
  for(const key of ['drawImage','getImageData','putImageData','getTransform','resetTransform','clip','ellipse','measureText'])if(typeof ctx[key]!=='function')throw Error('Missing Canvas2D API '+key);
  ctx.fillStyle='#ff0000';ctx.fillRect(1,1,4,4);ctx.save();ctx.translate(1,0);ctx.restore();
  if(ctx.getImageData(2,2,1,1).data[0]!==255||c.toBuffer('image/png').length<40)throw Error('Canvas2D pixel/PNG smoke failed');
  return{status:'passed',expected,actual:metadata.version,file,node:process.version,platform:process.platform,arch:process.arch};
 }catch(error){return{status:['MODULE_NOT_FOUND','ERR_DLOPEN_FAILED'].includes(error.code)||/Cannot find native binding|Failed to load native binding/.test(error.message)?'unavailable':'failed',expected,file,reason:error.message};}
}
function indexScripts(){return[...fs.readFileSync(path.join(root,'dist/index.html'),'utf8').matchAll(/<script src="([^"?]+)\?v=/g)].map(m=>m[1]);}
function sourceFingerprint(){const hash=crypto.createHash('sha256');for(const file of ['dist/index.html',...indexScripts().map(f=>'dist/'+f),'tools/fighter-render/manifest.json','tools/fighter-render/package-lock.json','tools/fighter-render/load.cjs','tools/fighter-render/cases.cjs'])hash.update(file+'\0').update(fs.readFileSync(path.join(root,file)));return hash.digest('hex');}
function selectScripts(scripts=indexScripts(),m=manifest){
 const start=scripts.indexOf(m.start),end=scripts.indexOf(m.end);
 if(start<0||end<=start)throw Error('Fighter render boundaries missing from production index');
 const region=scripts.slice(start,end),selected=new Set([...m.dataModules,...m.renderModules]);
 if(selected.size!==m.dataModules.length+m.renderModules.length)throw Error('Duplicate manifest module');
 for(const file of selected)if(!region.includes(file)||!fs.existsSync(path.join(root,'dist',file)))throw Error('Required render module missing: '+file);
 for(const file of m.lateRequired)if(!selected.has(file))throw Error('Required current fighter renderer omitted: '+file);
 for(const file of region){
  const source=fs.readFileSync(path.join(root,'dist',file),'utf8');
  if(/PolishedSprites/.test(source)&&/\.draw\s*=/.test(source)&&!selected.has(file)&&!m.excludedDrawModules[file])throw Error('Unreviewed render dispatcher: '+file);
  if((file.includes('data')||/art\d|art\.js|falls\.js/.test(file))&&!selected.has(file))throw Error('Unreviewed render data dependency: '+file);
 }
 for(const file of m.drawOwners)if(!selected.has(file))throw Error('Declared draw owner omitted: '+file);
 return region.filter(file=>selected.has(file));
}
function inspect(){const canvas=canvasCheck();let bootstrap;try{const files=selectScripts();bootstrap={status:'passed',files,drawOwners:manifest.drawOwners};}catch(error){bootstrap={status:'failed',reason:error.message};}return{status:bootstrap.status==='failed'||canvas.status==='failed'?'failed':canvas.status,canvas,bootstrap};}
function requireCanvas(){const result=canvasCheck();if(result.status!=='passed'){const error=Error(result.reason);error.renderStatus=result.status;error.exitCode=result.status==='unavailable'?2:1;error.prerequisite=result;throw error;}return require(result.file);}
if(require.main===module){const report=inspect();fs.mkdirSync('reports-fighter-render',{recursive:true});fs.writeFileSync('reports-fighter-render/prerequisites.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report));process.exitCode=report.status==='passed'?0:report.status==='unavailable'?2:1;}
module.exports={canvasCheck,selectScripts,indexScripts,sourceFingerprint,inspect,requireCanvas,manifest,root};
