# Controller repair — Build 157

Checkpoint: checkpoint-before-controller157 (Build156).

Confirmed defects repaired:
- Controller separate-tab links used a historical hostname; all now target the actual production game.
- Automatic selection could swap an idle selected controller for an asynchronously echoing physical/DSX device. An engaged controller now remains selected until disconnected or explicitly reselected/reset. Initial active-device discovery is preserved.
- The controller path treated a permissions-policy hint as authoritative before calling the actual Gamepad API. It now uses the API result, preserving the blocked-access banner and own-tab recovery on real denial.
- Explicit Standard/Sony layout selection now overrides saved custom calibration; Auto retains calibration.
- A focused visible document can recover a stale blur flag. Hidden/unfocused protection remains.

Controls and environment156 code unchanged. Controller Check and Reset permit fresh automatic discovery. Native standard, raw Sony, DSX, custom profiles, L1 block, R1 counter, L2 grab, two-second charge and neutral rearming remain supported.

Passed: gamepad.test.cjs (including actual denial versus false policy hint), controller-recovery.test.cjs, controller157.cjs (duplicate devices, hotplug and explicit layout), current150.cjs (26 suites including current-chain controller144 with 72 charge fixtures), environment156.cjs and environment-integration156.cjs.

Validation uses simulated Gamepad API devices; no physical DualSense is available in this environment. A user's OS/browser may still require the game in its own focused tab and a controller button press for device exposure. No claim of hardware certification or definitive identification of the user's exact device failure.
