# Initial QA failures — candidate 338

No failures are waived. Detailed results: qa-initial/latest.json.

| Suite | Recorded error |
|---|---|
| image-certification | exit 1 |
| scene-scale-certification | exit 1 |
| broxton244 | exit 1 |
| worker-reaction246 | exit 1 |
| combat-art248 | exit 1 |
| weapon-render248 | exit 1 |
| worker-crew250 | exit 1 |
| nightshade-art252 | exit 1 |
| controls260-policy | exit 1 |
| repair262-asset-certification | exit 1 |
| stats266 | exit 1 |
| reina269-view | exit 1 |
| orion271-assets | exit 1 |
| reina278-assets | exit 1 |
| review280-runtime | exit 1 |
| casino293 | exit 1 |
| civilians305-runtime | exit 1 |
| recording306-runtime | exit 1 |
| diagnostics307-input | exit 1 |
| quality308-A | exit 1 |
| quality308-B | exit 1 |
| quality308-C | exit 1 |
| quality308-D | exit 1 |
| quality308-E | exit 1 |
| hospital315-render | exit 1 |
| energy316-baseline-comparison | exit 1 |
| reserve320-equivalence | exit 1 |
| home327-ui | exit 1 |
| home328-ui | exit 1 |

Home327/home328 UI fixtures require the retired room-selection UI; current physical UI is independently tested. Other failures require their own source/asset and test-contract investigation before release. This report does not infer that every failure is harmless.
