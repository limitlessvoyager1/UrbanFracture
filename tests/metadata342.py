from pathlib import Path
import subprocess,json
ROOT=Path(__file__).resolve().parents[1]
def metadata(file,expression,ref=None):
    args=['node',str(ROOT/'tools/resolution342/data.cjs'),file,expression]
    if ref:args.append(ref)
    return json.loads(subprocess.check_output(args,cwd=ROOT))
