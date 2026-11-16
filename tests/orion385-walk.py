from pathlib import Path
from PIL import Image
import json,unittest,hashlib,sys
R=Path(__file__).resolve().parents[1];sys.path.insert(0,str(R/'tools/orion384'))
from motion_import import load_layout,validate_crop
def data(path):return json.loads(path.read_text(encoding='utf-8').split('=',1)[1].strip().removesuffix(';'))
class Walk(unittest.TestCase):
 def test_retained_independently_authored_facings_and_complete_bodies(self):
  source,layout=load_layout(R);proof=json.loads((R/'reports385/walk-import.json').read_text())
  self.assertFalse(proof['generatedArtwork']);self.assertEqual(proof['sourceSha256'],hashlib.sha256((R/proof['source']).read_bytes()).hexdigest())
  self.assertEqual([r['sourceFrame'] for r in proof['rows']],list(range(8))+list(range(24,32)))
  for row in proof['rows']:
   validate_crop(source,row['sourceRect']);self.assertEqual(row['fixedScale'],proof['fixedFamilyScale']);self.assertTrue(122<row['bodyHeight']<132)
   x,y=row['sourceHandInCrop'];l,t,rr,bottom=row['sourceRect'];self.assertGreater(source.getpixel((l+x,t+y))[3],100,'Visible hand socket '+str(row['frame']))
 def test_only_walk_family_changes(self):
  before=data(R/'source-archive/orion384-before385-data.js');after=data(R/'dist/orion384-data.js')
  self.assertEqual(before['scale'],after['scale']);self.assertEqual(len(after['families']['walk']['frames']),16)
  before['families'].pop('walk');after['families'].pop('walk');self.assertEqual(before,after)
 def test_registered_atlas_and_source_ground_anchors(self):
  d=data(R/'dist/orion384-data.js');walk=d['families']['walk'];self.assertEqual(walk['src'],'assets/orion385/walk.webp')
  with Image.open(R/'dist'/walk['src']) as atlas:self.assertEqual(atlas.size,(1280,1280))
  for f in walk['frames']:
   self.assertEqual([f['ax'],f['ay']],[160,280]);self.assertEqual(f['rect'][2:],[320,320]);self.assertTrue(all(abs(v)<140 for v in f['hand']))
if __name__=='__main__':unittest.main(verbosity=2)
