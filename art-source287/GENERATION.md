# Retained generation inputs

Built-in image generation produced the Niko8-pose sheet and the Kevin/Saito12-pose backward-fall sheet. Both use transparent backgrounds and preserve the supplied character identities and detailed16-bit arcade style. Importers retain fixed anatomical scales, binary alpha, and complete connected character components.

Niko request: eight consistent full-body poses matching the approved bald, sunglass-wearing Niko in a dark red shirt, black tactical vest and charcoal trousers; guard, draw-back, chamber, slash, low follow-through, retract, rear wrap/clasp, reverse headlock. No weapon baked into the sprite; attach the actual game weapon at authored hand sockets. One head, two arms, two legs, no ghost limbs, no motion blur, no labels.

Fall request: exactly12 full-body separate frames in a6-column2-row atlas. Top row Kevin (green tank, tattooed arms, charcoal trousers, brown boots); bottom row Saito (long black hair, muscular bare chest, charcoal martial trousers, bare feet). Six consecutive backward-knockdown poses per character: recoil, knees buckle, backward descent, nearly horizontal, upper-back landing, flat supine rest. Begin facing right, final head left/feet right. Constant anatomy and costume, no weapon, floor shadow, blur or extra limbs. References: the existing Kevin atlas and Saito prone identity. The output was imported by connected component, avoiding frame-cell cropping.

`import.py` and `import-falls.py` are deterministic packaging/metadata scripts. Keep the source PNGs and original Bruno gait for recovery.
