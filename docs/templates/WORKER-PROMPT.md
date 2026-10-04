# Worker dispatch contract

Use the contract printed by `tools/task.cjs prepare` or `tools/board.cjs dispatch`: ticket, checkout, branch, task/session pointers and expected Review return. Scope lives in the task; policy lives in AGENTS and WORKER. Do not copy them into the prompt.

The director spawns a fresh minimal-context collaboration worker for a new bounded ticket, then binds its actual returned ID with dispatch. CLI helpers never launch agents or invent IDs. Prepared workers use their initial journal; recovery follows WORKER in the preserved checkout.
