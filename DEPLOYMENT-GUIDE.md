# Barakah Agro — VS Code → GitHub → Live Website

This project is prepared so you can keep editing the existing HTML/CSS/JS in VS Code and automatically deploy changes after pushing to GitHub through a connected Render web service.

## 1. Local development

```bash
npm install
npm start
```

Open:
- Shop: http://localhost:3000
- Admin: http://localhost:3000/admin

Create `.env` locally from `.env.example` and set your own `ADMIN_PASSWORD`.

## 2. Put the project on GitHub

Create a new GitHub repository and upload/push this project folder. Do NOT upload `.env`, `node_modules`, or real credentials. They are excluded by `.gitignore`.

Typical commands:

```bash
git init
git add .
git commit -m "Initial Barakah Agro website"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

## 3. Deploy on Render

Create a Render Web Service from the GitHub repository. The included `render.yaml` contains the build/start/health-check settings.

Set these environment variables in Render:

- `ADMIN_USERNAME` = `admin` (or your chosen username)
- `ADMIN_PASSWORD` = your strong admin password
- `APP_URL` = your Render service URL
- `PORT` is provided by Render automatically; the app also defaults to 3000 locally.

Keep `ADMIN_PASSWORD` as a secret in Render. Never commit it to GitHub.

## 4. Automatic updates

With the Render service connected to your GitHub repository and automatic deploys enabled:

1. Edit HTML/CSS/JS in VS Code.
2. Save your changes.
3. Commit and push to GitHub:

```bash
git add .
git commit -m "Update website"
git push
```

4. Render detects the new commit and deploys it automatically.

The live website then uses the new code.

## Important: order data in production

The current project stores orders in `server/data/orders.json`, which is fine for local development. Before relying on this for a real production store, move order storage to a managed database (such as PostgreSQL) or configure persistent storage on your hosting provider. Otherwise a redeploy/restart on some hosts may not preserve local files.
