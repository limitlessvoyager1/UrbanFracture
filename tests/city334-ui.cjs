'use strict';const fs=require('node:fs'),path=require('node:path'),{createRequire}=require('node:module');const source=path.resolve('tests/home328-ui.cjs');new Function('require',fs.readFileSync(source,'utf8')+`
run('started=false;sceneMenuOpen=false;');doc.getElementById('playHome331').click();
btn328('Command center').click();btn328('Living City status').click();
const cityText=testBox328.querySelectorAll('*').map(e=>e.textContent).join(' ' );
ok(cityText.includes('Living City · runtime state'),'actual HQ status heading');
ok(cityText.includes('Unknown conditions remain unknown'),'no fabricated city scores');
ok(cityText.includes('Offscreen hero activity'),'offscreen activity section');
ok(cityText.includes('Active threats')&&cityText.includes('Transportation alerts'),'world threat sections');
ok(cityText.includes('Side missions')&&cityText.includes('Discovered caches'),'future authored systems represented');
ok(cityText.includes('No confirmed records.'),'empty records explicitly unknown');
btn328('Save city & supplies checkpoint').click();ok(testBox328.querySelectorAll('*').map(e=>e.textContent).join(' ').includes('City and supplies checkpoint saved'),'actual journal action');
btn328('Back to investigation board').click();ok(testBox328.querySelectorAll('*').map(e=>e.textContent).join(' ').includes('Investigation board'),'back navigation');
btn328('Return to title').click();ok(!sb.HomeUI327.openState,'close returns safely');
console.log('PASS334 HQ Living City status, truthful empty states, save and back controls');
`)(createRequire(source));
