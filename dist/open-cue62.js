
(function(root){'use strict';const {Brawler}=root.NeonCombat,P=Brawler.prototype,old={damage:P.damage,acquireGrab:P.acquireGrab,catchPunch:P.catchPunch,tick:P.tick};
const heavy=new Set(['enforcer','bouncer','security','boss','gangster']);
P.damage=function(a,amount,dir=1,knock=false,opts={}){const before=a?.hp,ok=old.damage.call(this,a,amount,dir,knock,opts);if(!ok||!a||!heavy.has(a.type)||a.hp<=0||!a.maxHp)return ok;const crossed=[];if(before>a.maxHp*.5&&a.hp<=a.maxHp*.5&&!a.counterOpenCue){a.counterOpenCue=true;crossed.push('COUNTER');}const grabLimit=root.NeonCombat.Grab198?.strong(a)?.4:['enforcer','bouncer'].includes(a.type)?.4:a.type==='security'?.75:null;if(grabLimit!==null&&(a.type==='security'?before>=a.maxHp*grabLimit&&a.hp<a.maxHp*grabLimit:before>a.maxHp*grabLimit&&a.hp<=a.maxHp*grabLimit)&&!a.grabOpenCue){a.grabOpenCue=true;crossed.push('GRAB');}if(crossed.length){a.pendingOpenCue??=new Set();for(const label of crossed)a.pendingOpenCue.add(label);}return ok;};
P.acquireGrab=function(e,...args){return old.acquireGrab.call(this,e,...args);};
P.catchPunch=function(e,...args){return old.catchPunch.call(this,e,...args);};
P.tick=function(dt,input={}){for(const e of this.enemies||[]){if(!e.pendingOpenCue?.size||e.hp<=0||e.down||e.flight||e.heldBy||e.hold||e.act||e.stun>0||e.dormant||e.wakeInv>0||e.wakeArmor>0)continue;const label=Array.from(e.pendingOpenCue).join(' + ');e.pendingOpenCue.clear();e.guarding=0;e.walk=0;this.fx(e.x,e.y-155,label+' OPEN','#ffdf92');this.event('vulnerabilityCue',{enemy:e.type,label});}return old.tick.call(this,dt,input);};
if(typeof module!=='undefined')module.exports={heavy};
})(typeof window!=='undefined'?window:globalThis);
