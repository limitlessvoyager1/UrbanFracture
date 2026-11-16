/* Restore native leaping sword-uppercut counter through the current counter admission system. */
(function(r){'use strict';const N=r.NeonCombat,P=N.Brawler.prototype;
N.Counter248.moves.reina.special={label:'DRAGON TAIL / LEAPING SWORD UPPERCUT',events:[[30,56]],frames:64,pose:'grabSword'};
const advance=P.advanceHeroAction;P.advanceHeroAction=function(p,a,dt){if(p===this.player&&p.type==='reina'&&a.counter248&&a.special248&&a.name==='counterMove248'){a.dragonTail382=true;return N.Counter248.advance(this,p,a,dt);}return advance.call(this,p,a,dt);};
N.ReinaCorrection382={neutralReach:155,counterFrame:30,counterDamage:56,counterFrames:64};
})(globalThis);
