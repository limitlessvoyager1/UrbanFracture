# Recoverable checkpoint before encounter architecture changes

Git tag `checkpoint-before-encounter222` identifies Build 221 at `8494527778aec2fabeef4844aac37669598e1434`.

Restore into a separate checkout with `git worktree add ../urban-fracture-before222 checkpoint-before-encounter222`. This preserves subsequent work and permits comparison or redeployment of the previous source.

Implementation order: audit → shared controllers → Downtown section 0 pilot with transition/combat tests → configuration rollout → campaign/script/controller regressions → publication.
