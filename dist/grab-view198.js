
(function(root){'use strict';const S=root.PolishedSprites,old=S.draw;
S.draw=function(c,e,t,...rest){const a=e.act;if(!a?.reversal198)return old(c,e,t,...rest);const hitAt=a.times198[a.times198.length-1],cl={...e,hold:null,act:{...a,name:a.kind198==='grab'?'clinchKnee':'powerSlam',hitAt:hitAt-(a.delay223||0),t:Math.max(0,a.t-(a.delay223||0))}};
if(e.routeTruck197)Object.assign(cl.act,{truck197:true,kind197:'toss'});else if(e.sterlingBoss195)Object.assign(cl.act,{sterling195:true,kind195:'shove'});else if(e.poolBoss193)Object.assign(cl.act,{pool193:true,kind193:e.poolBoss193==='ophelia'?'tackle':'grabCombo',times:a.times198,events193:a.events198});else if(e.type==='dorian')Object.assign(cl.act,{name:a.kind198==='grab'?'oneTwo':'uppercut',second:a.t>.5});return old(c,cl,t,...rest);};
})(window);
