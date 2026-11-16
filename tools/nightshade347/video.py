from pathlib import Path
import subprocess,json
R=Path(__file__).resolve().parents[2];D=R/'reports347/rendered';O=R/'reports347/video';O.mkdir(exist_ok=True)
clips=[]
for move in ['sweep','vault','vault-collateral','roll','grab','melee','gun','charge','flame','heal','missile']:
 out=O/(move+'.mp4');vf='crop=840:335:60:205,scale=1344:536:flags=lanczos,drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf:text=Nightshade347 '+move+' - native simulation frame %{n}:x=18:y=18:fontsize=18:fontcolor=white:box=1:boxcolor=black@0.7'
 subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-y','-framerate','60','-i',str(D/move/'%04d.jpg'),'-vf',vf,'-c:v','libx264','-preset','fast','-crf','20','-pix_fmt','yuv420p','-movflags','+faststart',str(out)],check=True);clips.append(out)
listing=O/'concat.txt';listing.write_text(''.join("file '"+str(x)+"'\n" for x in clips));normal=O/'Nightshade347-Native-Frames-1x.mp4';subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-y','-f','concat','-safe','0','-i',str(listing),'-c','copy',str(normal)],check=True)
for factor,name in [(2,'0.5x'),(4,'0.25x')]:subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-y','-i',str(normal),'-vf','setpts='+str(factor)+'*PTS','-r','60','-c:v','libx264','-preset','fast','-crf','20','-pix_fmt','yuv420p','-movflags','+faststart',str(O/('Nightshade347-Native-Frames-'+name+'.mp4'))],check=True)
listing.unlink();(R/'reports347/video-method.json').write_text(json.dumps({'source':'Every native Brawler simulation frame rendered through current illustrated sprite adapters with @napi-rs/canvas1.1.1; fixed seed347, passive target. Cropped/enlarged from960x540 for inspection.','audio':'Silent frame capture; synthesized in-game impact/groan audio requires browser playback.','speeds':[1,.5,.25],'moves':[x.stem for x in clips]},indent=2)+'\n');print('Created native-frame videos at1x/.5x/.25x')
