/* Departure subtitles always work; system speech follows the existing Sound switch. */
(function(r){'use strict';let active=false;
function say(e){if(!(e?.departure375||e?.callVoice365)||!r.speechSynthesis||typeof r.SpeechSynthesisUtterance!=='function')return false;try{const u=new r.SpeechSynthesisUtterance(e.text);u.lang='en-US';u.rate=.98;u.volume=.8;u.pitch=e.operator365?1:e.role375==='gunner'||e.speaker==='MICHELLE ROXX'?1.1:.85;u.onend=u.onerror=()=>{active=!!(r.speechSynthesis.pending||r.speechSynthesis.speaking);};active=true;r.speechSynthesis.speak(u);return true;}catch{return false;}}
function stop(){if(active&&r.speechSynthesis){r.speechSynthesis.cancel();active=false;}}
r.BackupVoice375={say,stop};
})(globalThis);

