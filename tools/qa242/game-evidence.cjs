'use strict';
// Per-record human evidence approval. This never approves a full release.
const acknowledgement='Approve only this evidence category and scope; not full game certification; no gameplay changes; no branch protection; no merge';
const marker='QA242-GAME-EVIDENCE:';
function template(record,digest,{repository,pullRequest=record.approval?.pullRequest,action='ACCEPT'}={}){
 return[marker+' '+action,'Repository: '+repository,'PR: '+pullRequest,'Record: '+record.id,'Kind: '+record.kind,'Base: '+record.baseCommit,'Head: '+record.testedCommit,'Source-SHA256: '+record.sourceFingerprint,'Evidence-SHA256: '+digest,'Scope: '+JSON.stringify(record.scope),'Scenarios: '+JSON.stringify(record.scenarios),'Acknowledgement: '+acknowledgement].join('\n');
}
async function verify(record,digest,{repository=process.env.GITHUB_REPOSITORY,token=process.env.GITHUB_TOKEN,fetcher=globalThis.fetch}={}){
 if(!token||!repository)return{status:'blocked',reason:'Authenticated repository read access required'};
 try{
  const prNumber=record.approval?.pullRequest;
  if(!/^[\w.-]+\/[\w.-]+$/.test(repository)||!Number.isSafeInteger(prNumber)||prNumber<1||!/^[a-f0-9]{40}$/.test(record.baseCommit||'')||!record.id||/[\r\n]/.test(record.id))throw Error('Invalid owner-comment repository, PR, base or record ID');
  const get=async route=>{const response=await fetcher('https://api.github.com/repos/'+repository+route,{headers:{Authorization:'Bearer '+token,Accept:'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28'}});if(!response.ok)throw Error('GitHub evidence lookup HTTP '+response.status);return response.json();};
  const repo=await get(''),pr=await get('/pulls/'+prNumber);
  if(repo.full_name!==repository||repo.owner?.type!=='User'||!Number.isSafeInteger(repo.owner.id)||pr.number!==prNumber||pr.base?.repo?.id!==repo.id||pr.base?.sha!==record.baseCommit||pr.head?.sha!==record.testedCommit||record.approvedBy!==repo.owner.login)throw Error('Owner identity or evidence PR/base/head binding changed');
  const comments=[];for(let page=1;;page++){if(page>1000)throw Error('Comment pagination limit reached');const batch=await get('/issues/'+prNumber+'/comments?per_page=100&page='+page);if(!Array.isArray(batch))throw Error('Invalid comment lookup');comments.push(...batch);if(batch.length<100)break;}
  const candidates=comments.filter(q=>q.user?.id===repo.owner.id&&q.user?.login===repo.owner.login&&q.user?.type==='User'&&q.body?.includes(marker)&&q.body.replace(/\r\n/g,'\n').split('\n').includes('Record: '+record.id)).sort((a,b)=>Date.parse(b.updated_at)-Date.parse(a.updated_at)||b.id-a.id);
  const latest=candidates[0];if(!latest)return{status:'blocked',reason:'No repository-owner comment for evidence record '+record.id};
  if(latest.issue_url!=='https://api.github.com/repos/'+repository+'/issues/'+prNumber||!Number.isFinite(Date.parse(latest.updated_at))||Date.parse(record.approvedAt)!==Date.parse(latest.updated_at)||latest.body.replace(/\r\n/g,'\n').trim()!==template(record,digest,{repository}))throw Error('Latest owner comment is revoked, stale, malformed or has a different timestamp/category/scope/digest');
  return{status:'passed',method:'owner-comment',owner:repo.owner.login,ownerId:repo.owner.id,commentId:latest.id,comment:latest.html_url,approvedAt:latest.updated_at,kind:record.kind,digest,fullGameCertified:false};
 }catch(error){return{status:'blocked',reason:error.message};}
}
async function main(){
 const fs=require('node:fs'),E=require('./evidence.cjs'),args=process.argv.slice(2),arg=k=>args[args.indexOf(k)+1];
 if(!args.includes('--record')||!['template','verify'].includes(args[0]))throw Error('Use game-evidence.cjs template|verify --record FILE --repository OWNER/REPO');
 const record=JSON.parse(fs.readFileSync(arg('--record'))),repository=args.includes('--repository')?arg('--repository'):process.env.GITHUB_REPOSITORY;
 const errors=require('./schema.cjs').validate(record,require('../../qa/system242/certifications.schema.json').properties.records.items);
 if(errors.length||record.approval?.method!=='owner-comment'||!repository)throw Error('Valid owner-comment record and repository required: '+errors.join('; '));
 const digest=E.recordDigest(record);
 if(args[0]==='template'){console.log(template(record,digest,{repository}));return;}
 // Verify the actual artifacts as well as authenticated approval, with explicit expected source/scope.
 if(!args.includes('--commit')||!args.includes('--source')||!args.includes('--scope'))throw Error('Verification requires --commit SHA --source SHA256 --scope feature1,feature2');
 const result=await E.verifyRecord(record,{root:args.includes('--root')?arg('--root'):process.cwd(),commit:arg('--commit'),sourceFingerprint:arg('--source'),scope:arg('--scope').split(','),approvers:[record.approvedBy],verifyApproval:(r,d)=>E.githubApproval(r,d,{repository})});
 console.log(JSON.stringify(result));process.exitCode=result.status==='passed'?0:2;
}
if(require.main===module)main().catch(e=>{console.error(e.message);process.exitCode=2;});
module.exports={template,verify};
