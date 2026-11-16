// Fixed Build338 renderer fallback contract, extracted from supplied source; not a missing historical Git receipt.
function zheight(f){if(f.type==='gunner125')return f.z||0;if(f!==game.player&&(f.down||f.hp<=0)&&!f.flight&&!f.jump&&!f.heldBy&&!f.pairVisual&&!f.grappleSession119?.active)return 0;if(f.act?.name==='martialFlip')return Math.sin(clamp((f.act.t-.02)/.42,0,1)*Math.PI)*62;if(f.act?.name==='martialFly')return Math.sin(clamp((f.act.t-.02)/.42,0,1)*Math.PI)*58;if(f.act?.name==='saitoKipUp'){const a=f.act;return Math.sin(clamp((a.t-.04)/.30,0,1)*Math.PI)*38;}if(f.grappleZ)return f.grappleZ;if(f.type==='broxton'&&['broxAirPress','broxElbow'].includes(f.act?.name)){const a=f.act,u=clamp(a.t/a.hitAt,0,1);return(a.dive?.startZ||a.startZ||55)*(1-u*u);}if(f.act?.name==='bodySplash'){const a=f.act,u=clamp((a.t-.12)/(a.hitAt-.12),0,1);return Math.sin(u*Math.PI)*80;}if(f.act?.name==='copLeap')return Math.sin(clamp(f.act.t/.64,0,1)*Math.PI)*74;
if(f.flight){const u=clamp(f.flight.t/f.flight.total,0,1);if(f.flight.descending)return(f.flight.startZ||0)*(1-u);return Math.sin(u*Math.PI)*(f.flight.arc??65)+(f.flight.startZ||0)*(1-u);}
if(f.act?.name==='airKnee'){const a=f.act,u=clamp(a.t/a.hitAt,0,1);return a.startZ*(1-u*u);}
if(f.act?.name==='airSword'&&f.act.dive){const u=clamp(f.act.t/f.act.hitAt,0,1);return f.act.dive.startZ*(1-u*u);}
if(f.act?.name==='blitzKick'){const u=clamp(f.act.t/.78,0,1);return Math.sin(u*Math.PI)*58;}
if(f.act?.name==='vault')return Math.sin(f.act.t/f.act.total*Math.PI)*68;
const $5=f.heldBy?.act?.name;
if($5==='powerBomb'){const a=f.heldBy.act;return Math.sin(clamp(a.t/a.hitAt,0,1)*Math.PI)*160;}
if($5==='clinchKnee')return 12;
if($5==='slam'||$5==='powerSlam')return 90;
if($5==='suplex'){const a=f.heldBy.act;return Math.sin(throwProgress(a)*Math.PI)*65+throwProgress(a)*45;}
if($5==='backThrow'){const a=f.heldBy.act;return Math.sin(throwProgress(a)*Math.PI)*55+throwProgress(a)*40;}
if(['throw','backThrow','rearThrow'].includes($5))return 12;
if((f.down||f.hp<=0)&&!f.noBounce&&f.downAge<.32)return Math.sin(f.downAge/.32*Math.PI)*20;
if(f.jump)return Math.sin(f.jump/.68*Math.PI)*(f.jumpApex||104);
return 0;
}
