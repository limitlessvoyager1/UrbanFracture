'use strict';
const fs=require('node:fs'),path=require('node:path'),cp=require('node:child_process'),crypto=require('node:crypto'),{validate}=require('./schema.cjs');
const sha=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
function relative(p){return typeof p==='string'&&p.length>0&&!p.includes('\\')&&!p.startsWith('/')&&!/^[A-Za-z]:/.test(p)&&!p.split('/').some(q=>q==='..'||q==='.'||!q);}
function owns(pattern,file){if(pattern.endsWith('/**'))return file.startsWith(pattern.slice(0,-2));return pattern===file;}
function closure(features,seeds){const found=new Set(seeds);let changed=true;while(changed){changed=false;for(const f of features)if(!found.has(f.id)&&f.dependsOn.some(id=>found.has(id))){found.add(f.id);changed=true;}}return [...found];}
function planChange({registry,catalog,declaration,changes,baseCommit,testedCommit,registryOrigin='approved-base'}){
 const problems=[],review=[],ids=new Set(registry.features.map(f=>f.id)),suiteIds=new Set(catalog.suites.map(s=>s.id));
 if(ids.size!==registry.features.length)problems.push('Duplicate feature ID');
 for(const f of registry.features){
  for(const d of f.dependsOn)if(!ids.has(d))problems.push('Unknown dependency '+f.id+' -> '+d);
  for(const s of f.suites)if(!suiteIds.has(s))problems.push('Unknown suite '+s);
  for(const p of f.sources)if(!relative(p.replace(/\/\*\*$/,'')))problems.push('Unsafe feature path '+p);
 }
 const visit=(id,stack=[])=>{if(stack.includes(id)){problems.push('Dependency cycle '+[...stack,id].join(' -> '));return;}for(const d of registry.features.find(f=>f.id===id)?.dependsOn||[])if(ids.has(d))visit(d,[...stack,id]);};for(const id of ids)visit(id);
 for(const s of registry.mandatorySmoke)if(!suiteIds.has(s))problems.push('Unknown mandatory suite '+s);
 const declared=new Set(declaration.files),actual=new Set(changes.flatMap(c=>[c.path,c.previousPath].filter(Boolean)));
 for(const p of [...declared,...actual])if(!relative(p))problems.push('Unsafe changed path '+p);
 for(const p of actual)if(!declared.has(p))problems.push('Changed file omitted from declaration: '+p);
 for(const p of declared)if(!actual.has(p))problems.push('Declared file absent from diff: '+p);
 for(const id of declaration.features)if(!ids.has(id))problems.push('Unknown declared feature '+id);
 problems.push(...require('./pilot.cjs').scopeProblems(declaration,[...actual]));
 const direct=new Set(),ownership=[];
 for(const p of actual){const owners=registry.features.filter(f=>f.sources.some(pattern=>owns(pattern,p))).map(f=>f.id);ownership.push({path:p,features:owners});if(!owners.length)problems.push('Unmapped changed file: '+p);for(const id of owners){direct.add(id);if(!declaration.features.includes(id))problems.push('Affected feature omitted: '+id);}}
 const affected=closure(registry.features,[...direct]),selected=new Set(registry.mandatorySmoke),reasons={};
 function select(id,reason){selected.add(id);(reasons[id]??=[]).push(reason);}
 for(const id of registry.mandatorySmoke)select(id,'Mandatory shared-system smoke');
 for(const id of affected){const f=registry.features.find(f=>f.id===id);for(const s of f.suites)select(s,'Semantic feature/dependent: '+id);}
 for(const id of affected)if(registry.features.find(f=>f.id===id).certification!=='approved')review.push('Feature coverage/certification remains incomplete: '+id);
 const requiredEntities={characters:new Set(),moves:new Set(),systems:new Set(),levels:new Set()};
 for(const id of direct){const f=registry.features.find(f=>f.id===id);for(const k of Object.keys(requiredEntities))for(const q of f.entities[k])requiredEntities[k].add(q);}
 for(const [k,values]of Object.entries(requiredEntities))for(const q of values)if(!declaration.entities[k].includes(q))problems.push('Affected '+k+' omitted: '+q);
 for(const q of declaration.newContent){
  const feature=registry.features.find(f=>f.contentIds.includes(q.id));
  if(!feature)problems.push('New content is not registered: '+q.id);
  if(feature&&(q.suites.some(s=>!feature.suites.includes(s))||q.visualScenarios.some(s=>!feature.visualScenarios.includes(s))||!feature.specs.includes(q.spec)))problems.push('New content does not match reviewed feature tests/scenarios/spec: '+q.id);
  if(!q.spec||!q.suites.length||!q.visualScenarios.length)problems.push('New content lacks source-specific tests/visuals/spec: '+q.id);
  for(const s of q.suites){if(!suiteIds.has(s))problems.push('New content unknown suite '+s);else select(s,'New content: '+q.id);}
  review.push('New content requires owner certification: '+q.id);
 }
 if(registry.coverage!=='complete')review.push('Semantic registry is a pilot, not repository-wide certification');
 if(registryOrigin!=='approved-base')review.push('Bootstrap policy from PR head requires owner review');
 if(declaration.risks.majorIntegration)for(const s of catalog.suites.filter(s=>s.profiles.includes('release')))select(s.id,'Major integration: full release required');
 const visualScenarios=[...new Set(affected.flatMap(id=>registry.features.find(f=>f.id===id).visualScenarios))];
 for(const c of changes)if(c.status==='A'&&c.path.startsWith('dist/')&&!declaration.newContent.length)problems.push('Added production content requires a registration: '+c.path);
 const requirements={visual:declaration.risks.visual||visualScenarios.length>0,performance:declaration.risks.performance||affected.some(id=>registry.features.find(f=>f.id===id).performanceRisk),physicalController:!!declaration.risks.physicalController,visualScenarios};
 return{schema:1,acceptanceScope:declaration.acceptanceScope||'game-change',baseCommit,testedCommit,declarationId:declaration.id,registryOrigin,coverage:registry.coverage,approvers:[...new Set(affected.map(id=>registry.features.find(f=>f.id===id).owner))],status:problems.length?'blocked':review.length?'needs-review':'planned',problems,review,changedFiles:changes,ownership,directFeatures:[...direct],affectedFeatures:affected,declaredEntities:declaration.entities,entities:Object.fromEntries(Object.keys(requiredEntities).map(k=>[k,[...new Set([...declaration.entities[k],...affected.flatMap(id=>registry.features.find(f=>f.id===id).entities[k])])]])),selection:[...selected].sort(),reasons,requirements,fullReleaseRequired:declaration.risks.majorIntegration,issues:declaration.issues};
}
function git(root,args){return cp.execFileSync('git',args,{cwd:root,encoding:'utf8',maxBuffer:20000000}).trim();}
function diff(root,base,head){const raw=cp.execFileSync('git',['diff','--name-status','-z','--find-renames',base,head],{cwd:root,encoding:'utf8',maxBuffer:20000000}).split('\0'),rows=[];for(let i=0;i<raw.length&&raw[i];){const status=raw[i++],first=raw[i++];rows.push(/^[RC]/.test(status)?{status,previousPath:first,path:raw[i++]}:{status,path:first});}return rows;}
function createPlan({root,base,head,changeFile}){
 if(!/^[a-f0-9]{40,64}$/.test(base)||!/^[a-f0-9]{40,64}$/.test(head))throw Error('Use exact base/head commit IDs');
 if(!relative(changeFile))throw Error('Unsafe declaration path');
 const declarationBytes=fs.readFileSync(path.join(root,changeFile)),declaration=JSON.parse(declarationBytes),schema=JSON.parse(fs.readFileSync(path.join(root,'qa/system242/change.schema.json')));
 const errors=validate(declaration,schema);if(errors.length)throw Error(errors.join('\n'));
 let registry,registryBytes,registryOrigin='approved-base';try{registryBytes=cp.execFileSync('git',['show',base+':qa/system242/features.json'],{cwd:root,maxBuffer:20000000});registry=JSON.parse(registryBytes);}catch{registryBytes=fs.readFileSync(path.join(root,'qa/system242/features.json'));registry=JSON.parse(registryBytes);registryOrigin='bootstrap-head';}
 const registryErrors=validate(registry,JSON.parse(fs.readFileSync(path.join(root,'qa/system242/features.schema.json'))));if(registryErrors.length)throw Error(registryErrors.join('\n'));
 const catalog=JSON.parse(fs.readFileSync(path.join(root,'qa/system242/suites.json'))),changes=diff(root,base,head);
 let registryReview=null;
 if(registryOrigin==='approved-base'){
  const proposedBytes=fs.readFileSync(path.join(root,'qa/system242/features.json'));
  if(!proposedBytes.equals(registryBytes)){
   const proposed=JSON.parse(proposedBytes),errors=validate(proposed,JSON.parse(fs.readFileSync(path.join(root,'qa/system242/features.schema.json'))));if(errors.length)throw Error(errors.join('; '));
   const baseCatalog=JSON.parse(cp.execFileSync('git',['show',base+':qa/system242/suites.json'],{cwd:root,maxBuffer:20000000}));
   const proposal=require('./registry-extension.cjs').extend({base:registry,candidate:proposed,baseCatalog,catalog,read:p=>fs.readFileSync(path.join(root,p))});
   registryReview={status:'needs-review',baseRegistrySha256:sha(registryBytes),proposedRegistrySha256:sha(proposedBytes),baseCommit:base,testedCommit:head,changes:proposal.changes,ownerReviewRequired:true,certified:false};
   registry=proposal.registry;registryOrigin='additive-head-review-pending';
  }
 }
 const plan=planChange({registry,catalog,declaration,changes,baseCommit:base,testedCommit:head,registryOrigin});
 if(registryReview){plan.registryReview=registryReview;plan.review.push('Additive registry proposal retains base mappings and suites; authenticated owner review remains required.');}
 plan.declaration={path:changeFile,sha256:sha(declarationBytes)};plan.registrySha256=registryReview?.proposedRegistrySha256||sha(registryBytes);plan.catalogSha256=sha(fs.readFileSync(path.join(root,'qa/system242/suites.json')));
 if(declaration.replacementContract)require('./history-contract.cjs').apply(plan,{root,declaration,catalog,runtimeTree:git(root,['rev-parse',head+':dist'])});
 return plan;
}
if(require.main===module){try{const args=process.argv.slice(2),arg=(id,fallback)=>args.includes(id)?args[args.indexOf(id)+1]:fallback,root=path.resolve(arg('--root',path.join(__dirname,'../..'))),plan=createPlan({root,base:arg('--base'),head:arg('--head',git(root,['rev-parse','HEAD'])),changeFile:arg('--change')});const output=arg('--output');if(output){fs.mkdirSync(path.dirname(path.resolve(output)),{recursive:true});fs.writeFileSync(output,JSON.stringify(plan,null,2)+'\n');}console.log(JSON.stringify(plan));process.exitCode=plan.status==='blocked'?1:plan.status==='needs-review'?2:0;}catch(e){console.error(e.message);process.exitCode=1;}}
module.exports={relative,owns,closure,planChange,createPlan,diff};
