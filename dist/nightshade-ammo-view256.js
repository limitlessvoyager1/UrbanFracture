
(function(root){'use strict';function item(c,g,it){const A=root.NeonCombat.NightshadeAmmo256;if(!A.isAmmo(it))return false;if(it.gone||g.player.type!=='nightshade')return true;return true;}
root.NightshadeAmmoView256={item,items(c,g){for(const it of g.items||[])item(c,g,it);}};
})(window);
