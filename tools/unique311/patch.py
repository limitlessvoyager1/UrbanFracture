from pathlib import Path
import json
p=Path('dist/game.js');s=p.read_text();patches=[("if(game.player.type==='nightshade'&&state.held.unique)input.run=false;","if(state.held.unique)input.run=false;"),("healthBar(73,55,124,7,p.defense,p.maxDefense,p.defense<100/3?'#efad62':'#68dfc5','#b7fff0');","healthBar(73,55,170,7,p.defense,p.maxDefense,'#efc13b','#fff0a1');"),("text(p.guardBreak>0?'BROKEN':p.defense<100/3?'GUARD LOW':p.hold?.counter?(p.type==='reina'?'COUNTER CONFIRMED':'COUNTER FOLLOW-UP'):game.time<=p.catchUntil?'COUNTER READY':'DEFENSE',205,62,p.defense<100/3?'#ffc68f':'#aeeadd',8);","text(p.guardBreak>0?'BROKEN':p.defense<p.maxDefense*.25?'ENERGY LOW':'ENERGY',252,62,'#f5d464',8);"),("health. Defense '+Math.ceil(p.defense)","health. Energy '+Math.ceil(p.defense)")]
for a,b in patches:
 assert s.count(a)==1,a;s=s.replace(a,b)
p.write_text(s);Path('tools/unique311/game-patches.json').write_text(json.dumps(patches,indent=2))
p=Path('dist/index.html');s=p.read_text().replace('<script src="airport309.js?v=309"></script>','<script src="airport309.js?v=309"></script><script src="unique311.js?v=311"></script>');assert 'unique311.js' in s;s=s.replace('<script src="game.js?v=307">','<script src="game.js?v=311">');s=s.replace('<script src="game.js?v=308">','<script src="game.js?v=311">');s=s.replace('HAND-DRAWN AIRPORT 310','UNIQUE ACTION / ENERGY 311');p.write_text(s)
