'use strict';
function counts(rows){return{executed:rows.filter(r=>['passed','failed'].includes(r.status)).length,passed:rows.filter(r=>r.status==='passed').length,failed:rows.filter(r=>r.status==='failed').length,blocked:rows.filter(r=>r.status==='blocked').length,notExecuted:rows.filter(r=>['not-tested','not-executed'].includes(r.status)).length,needsReview:rows.filter(r=>r.status==='needs-review').length};}
function recommendation({results,issues=[],plan,sourceChanged=false,dirty=false}){
 if(sourceChanged||results.some(r=>r.status==='failed'&&r.critical!==false)||issues.some(q=>q.severity==='error'))return'Reject';
 if(dirty||!plan||plan.status!=='planned'||plan.coverage!=='complete'||results.some(r=>r.status!=='passed')||issues.some(q=>q.severity==='review'))return'Needs Review';
 return'Approve';
}
function validateReport(r){const errors=require('./schema.cjs').validate(r,require('../../qa/system242/report.schema.json'));if(Array.isArray(r.results)){if(new Set(r.results.map(q=>q.id)).size!==r.results.length)errors.push('Duplicate report result');if(Object.entries(counts(r.results)).some(([k,v])=>r.counts?.[k]!==v))errors.push('Report counts contradict rows');}return errors;}
module.exports={counts,recommendation,validateReport};
