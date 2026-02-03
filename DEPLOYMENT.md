# Deployment Guide

## Problem Solved

The site was showing a 404 error when trying to load `/src/main.tsx` because GitHub Pages was serving the raw `index.html` file from the main branch instead of the built application files.

## Solution

The deployment workflow has been updated to:
1. Build the Vite application using `npm run build`
2. Deploy the built files from the `./build` directory to a `gh-pages` branch
3. Include a `.nojekyll` file to prevent Jekyll processing

## How It Works

### Workflow Trigger
The deployment workflow (`.github/workflows/deploy.yml`) runs automatically when:
- Code is pushed to the `main` branch
- Manually triggered via the "Run workflow" button in the GitHub Actions tab

### Deployment Process
1. **Checkout**: Fetches the latest code from the repository
2. **Setup Node**: Installs Node.js 20 with npm caching for faster builds
3. **Install dependencies**: Runs `npm ci` to install exact versions from package-lock.json
4. **Build**: Runs `npm run build` to create optimized production files in `./build`
5. **Deploy**: Uses `peaceiris/actions-gh-pages@v4` to push built files to the `gh-pages` branch

### First-Time Setup

After these changes are merged to `main`, the workflow will:
1. Automatically create a `gh-pages` branch
2. Push the built files to that branch
3. GitHub Pages should auto-detect the `gh-pages` branch and serve from it

If the site doesn't update automatically, check GitHub Pages settings:
1. Go to repository Settings → Pages
2. Under "Build and deployment" → "Source"
3. Select "Deploy from a branch"
4. Under "Branch", select `gh-pages` and `/ (root)`
5. Click "Save"

## Verifying the Deployment

After the workflow runs successfully:

1. **Check the workflow run**: Go to the Actions tab and verify the "Deploy to GitHub Pages" workflow completed successfully

2. **Verify the gh-pages branch**: The `gh-pages` branch should contain:
   - `index.html` (processed by Vite with bundled JS/CSS references)
   - `assets/` directory with bundled JavaScript and CSS files
   - `.nojekyll` file

3. **Test the site**: Visit `https://hansmeuffels.github.io/LeaveValueAtTermination/`
   - The site should load without 404 errors
   - Open browser DevTools → Network tab
   - Refresh the page
   - Verify that `index-[hash].js` and `index-[hash].css` load successfully from `/LeaveValueAtTermination/assets/`

## Troubleshooting

### Workflow fails with "Dependencies lock file is not found"
- Ensure `package-lock.json` is committed to the repository
- Run `npm install` locally and commit the generated `package-lock.json`

### Site still shows 404 errors after successful deployment
- Check that GitHub Pages is set to deploy from the `gh-pages` branch (see First-Time Setup above)
- Clear browser cache and try again
- Check that the `gh-pages` branch contains the built files (not source files)

### Build fails during workflow run
- Check the workflow logs in the Actions tab for specific errors
- Ensure all dependencies in `package.json` are compatible
- Test the build locally with `npm install && npm run build`

## Manual Trigger

To manually trigger a deployment without pushing to main:
1. Go to the Actions tab in GitHub
2. Select "Deploy to GitHub Pages" workflow
3. Click "Run workflow" button
4. Select the `main` branch
5. Click "Run workflow"

## Technical Details

- **Build tool**: Vite 6.x
- **Base path**: `/LeaveValueAtTermination/` (configured in `vite.config.ts`)
- **Output directory**: `./build`
- **Node version**: 20
- **Deployment action**: [peaceiris/actions-gh-pages](https://github.com/peaceiris/actions-gh-pages)
