#!/usr/bin/env bash
set -euo pipefail
for suite in current150 quality169 render169 grapple145 reina-german123.test cabin168 lab-fighters166 quality167 environment156 environment162 environment-integration156 gamepad.test controller157; do
  printf '\nRunning tests/%s.cjs\n' "$suite"
  node "tests/$suite.cjs"
done
