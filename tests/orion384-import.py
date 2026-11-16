"""QA242 source-pixel regression for the original Orion motion-sheet defect."""
from pathlib import Path
import sys,json,unittest
R=Path(__file__).resolve().parents[1];sys.path.insert(0,str(R/'tools/orion384'))
from motion_import import load_layout,validate_crop
from PIL import Image

class MotionImport(unittest.TestCase):
 def test_reviewed_source_crops_and_fixed_sequence_scales(self):
  image,spec=load_layout(R)
  self.assertEqual(len(spec['frames']),48)
  for f in spec['frames']:
   with self.subTest(frame=f['index']):validate_crop(image,f['sourceRect'])

 def test_original_uniform_get_up_cut_is_rejected(self):
  image,_=load_layout(R)
  # Original frame18: grid row4 spans y724..905 and cuts the next pose.
  with self.assertRaisesRegex(ValueError,'cuts through'):
   validate_crop(image,[362,724,543,905])

 def test_missing_or_neighboring_body_is_rejected(self):
  image,_=load_layout(R)
  with self.assertRaises(ValueError):validate_crop(image,[0,720,724,1050])
  with self.assertRaises(ValueError):validate_crop(image,[0,0,2,2])

 def test_shipped_motion_receipts_follow_reviewed_source(self):
  _,spec=load_layout(R)
  receipts=json.loads((R/'reports384/import.json').read_text(encoding='utf-8'))
  rows=[r for r in receipts['receipts'] if r['family']=='motion']
  self.assertEqual(len(rows),48)
  for f,r in zip(spec['frames'],rows):
   with self.subTest(frame=f['index']):
    self.assertEqual(r.get('sourceRect'),f['sourceRect'])
    self.assertEqual(r['familyScale'],f['scale'])
    self.assertEqual(r.get('sequence'),f['sequence'])

 def test_get_up_standing_height_and_dispatch_order(self):
  _,spec=load_layout(R)
  for last in [23,47]:
   f=spec['frames'][last];self.assertAlmostEqual((f['floorY']-f['sourceRect'][1]-4)*f['scale'],190)
  # The repair must not alter either runtime's native phase clock or order.
  source=(R/'dist/orion384.js').read_text(encoding='utf-8')
  self.assertIn('motion+16+Math.min(7,Math.floor((.64-Math.max(0,left))/.64*8))',source)

if __name__=='__main__':unittest.main(verbosity=2)
