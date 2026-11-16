/* Presentation templates normalized to native state durations; no gameplay clock or balance data. */
(function(r){'use strict';const clamp=x=>Math.max(0,Math.min(1,x));
const templates=Object.freeze({light:Object.freeze([[0,1],[.15,2],[.4,4],[.65,5],[.87,0]]),medium:Object.freeze([[0,1],[.13,2],[.30,3],[.50,4],[.70,5],[.90,0]]),heavy:Object.freeze([[0,2],[.08,3],[.19,6],[.30,7],[.47,6],[.61,4],[.76,5],[.91,0]]),fall:Object.freeze([[0,6],[.13,7],[.29,8],[.47,9],[.67,10],[.86,11]]),rise:Object.freeze([[0,13],[.07,14],[.17,15],[.27,16],[.37,18],[.47,19],[.57,20],[.68,21],[.80,22],[.93,0]])});
function pose(name,u){const list=templates[name];if(!list)return null;u=clamp(u);let out=list[0][1];for(const[t,p]of list){if(t>u+1e-8)break;out=p}return out}
function excluded(f){return !!(f.heldBy||f.hold||f.pairVisual||f.grappleSession119?.active||f.forestLock125||f.leg286||f.reverse285||f.niko283||f.legGround286||f.reverseGround285||f.nikoGround283||f.grounded114||f.ddtLock116||f.hipLock118||f.shock||f.jump||f.grappleZ||f.grappleAngle);}
function sample(f,time){if(excluded(f))return null;const a=f.reaction274;
 if(f.flight){if(f.flight.style!=='palm')return null;return{phase:'fall',pose:pose('fall',f.flight.t/f.flight.total),u:clamp(f.flight.t/f.flight.total),sourceDir:f.fall287?.sourceDir??f.dir};}
 if(f.down>0||f.hp<=0){if(!f.fall287?.back)return null;const age=f.downAge||0,total=f.downTotal||0;
  if(!f.fall287.landed&&age<.32)return{phase:'fall',pose:pose('fall',age/.32),u:clamp(age/.32),sourceDir:f.fall287.sourceDir};
  if(f.hp>0&&total>0&&age>=total-.35){const u=clamp((age-total+.35)/.35);return{phase:'rise',pose:pose('rise',u),u,sourceDir:f.fall287.sourceDir};}
  const impact=age<.40;return{phase:impact?'impact':'ground',pose:impact?12:13,u:clamp((age-.32)/.08),sourceDir:f.fall287.sourceDir};}
 if(a?.result==='clean'&&!a.resisted&&f.stun>0&&!f.act&&!f.guarding){const u=r.NeonCombat.HitReactions298?.visual(f,time,a)?.u??clamp((time-a.at)/(a.duration||f.stun||.5)),kind=templates[a.kind]?a.kind:'medium';return{phase:kind+'-recoil',pose:pose(kind,u),u,sourceDir:f.dir};}
 return null;
}
r.ReactionTemplates289=Object.freeze({templates,pose,sample,excluded});})(globalThis);
