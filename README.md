# Infinite Theater

This repo is set up so you can keep editing locally and publish from GitHub without using Manus credits.

## Workflow

1. Modify the code in your local repo.
2. Commit and push to GitHub:

```bash
git add .
git commit -m "Update game"
git push origin main
```

3. Render auto-deploys the `main` branch from `render.yaml`.

## Deployment

The repo includes a Render Blueprint in [`render.yaml`](./render.yaml). It starts the app as a Node web service and redeploys on every push to `main`.

If you create the service manually on Render, select:

- GitHub repo: `Enoch-aiyinuo/infinite-theater`
- Blueprint source: `render.yaml`
- Branch: `main`

## Environment variables

The game can boot without backend credentials, but some login, sync, and AI-backed features will stay disabled until you fill these values in Render or in a local `.env` file based on [`.env.example`](./.env.example):

- `VITE_APP_ID`
- `VITE_OAUTH_PORTAL_URL`
- `JWT_SECRET`
- `DATABASE_URL`
- `OAUTH_SERVER_URL`
- `OWNER_OPEN_ID`
- `BUILT_IN_FORGE_API_URL`
- `BUILT_IN_FORGE_API_KEY`

## Local development

```bash
pnpm install
pnpm dev
```
