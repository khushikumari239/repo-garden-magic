# Connect Repo Garden to GitHub (two-way sync)

No code changes are needed — this is a workspace connection you set up once in the Lovable editor. After it's connected, every change in Lovable pushes to GitHub automatically, and pushes to GitHub sync back into Lovable.

## Steps (you do these in the editor UI)

1. In the Lovable editor, click the **+** in the chat input (bottom left).
2. Choose **GitHub** → **Connect project**.
3. Authorize the **Lovable GitHub App** on GitHub (one-time OAuth).
4. Select the GitHub account or organization to create the repository under.
5. Name the repository (e.g. `repo-garden`) and click **Create Repository**.

## After connecting

- Your code lives at `github.com/<you>/repo-garden` and stays in sync both ways in real time.
- You can clone it locally, open pull requests, and use GitHub Actions for CI/CD while continuing to build in Lovable.
- Lovable's version history still works independently of Git.

## Notes

- Only one GitHub account can be connected to a Lovable account at a time.
- Database data (if you add Lovable Cloud later) is exported separately and is not part of the Git sync.
