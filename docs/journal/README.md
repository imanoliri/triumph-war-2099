# Session journal

Files use `YYYY-MM-DD-NNN-feature-name.md`, sorted by date and daily session number across all features. Dates use Europe/Berlin. Use each feature’s `docs/tasks/<slug>.md` Sessions section for the feature view.

Each record contains starting context, an ordered log of requests/decisions/actions, verification, unresolved work and an exact next-action handover. Read the task’s latest linked record when resuming. Create entries with `node tools/task.cjs start feature/<slug>` or `node tools/task.cjs session <slug>`; see [WORKFLOW](../WORKFLOW.md).

The first two entries were migrated from existing feature session records. Their numbers represent known task order; exact times were not recorded. Older gameplay history remains in DEVELOPMENT-NOTES.md. This journal does not claim to be a complete transcript of the initial conversation.
