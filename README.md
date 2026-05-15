<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/93efec4b-0654-4581-9fca-e937c50aa81d

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Fully automatic GitHub flow

After this setup, you do not need to run checks/build manually:

- **CI** runs automatically on every push and pull request (`.github/workflows/ci.yml`).
- **Deploy** runs automatically on every push to `main` and publishes `dist` to GitHub Pages (`.github/workflows/deploy-pages.yml`).

One-time GitHub setting required:
1. Open **Repository Settings → Pages**
2. Source: **GitHub Actions**

After that, deployment is fully automatic.
