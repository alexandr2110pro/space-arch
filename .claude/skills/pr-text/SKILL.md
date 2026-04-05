---
name: pr-text
description: Generate a PR title and description for the current branch against the origin/main branch.
disable-model-invocation: true
allowed-tools: Bash(git log:*), Bash(git diff:*), Bash(gh pr:*), Read, AskUserQuestion
---

Generate a PR title and description for the current branch against the origin/main branch.

## Steps

1. Run `git log origin/main..HEAD --oneline` to see all commits on the branch.
2. Run `git diff origin/main...HEAD --stat` to see the scope of changes.
3. If needed, read specific changed files or diffs to understand the intent.
4. Present the title and description to the user.
5. Ask the user for confirmation before proceeding.
6. If confirmed, get the current PR number with `gh pr view --json number --jq '.number'` and update the PR with `gh pr edit <number> --title "<title>" --body "<body>"`.

## Output format

Produce a concise title and a markdown description body. Example:

**Title:** `feat: short summary under 70 chars`

**Description:**

```
## Summary

- Bullet points capturing the essence of what changed and why
- Focus on user/developer-facing impact, not implementation minutiae
- Group related changes into single bullets
```

## Rules

- The title must be under 70 characters and use conventional commit format.
- The description should have a `## Summary` section with concise bullet points.
- Capture the *why* and *what*, not the *how*. Avoid listing every file touched.
- Do not include testing/verification/QA instructions.
- Do not include a "Test plan" section.
- Do not add `Co-Authored-By` lines or mention Claude.
- Never update the PR without explicit user confirmation.
