
  # User Departure Date Screen

  This is a code bundle for User Departure Date Screen. The original project is available at https://www.figma.com/design/TUxRtz1wA4EyoXLXrHFHk3/User-Departure-Date-Screen.

  ## Live Demo

  The app is deployed at: https://hansmeuffels.github.io/LeaveValueAtTermination/

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ## Deployment

  The app is automatically deployed to GitHub Pages when changes are pushed to the `main` branch. The deployment is handled by GitHub Actions workflow (`.github/workflows/deploy.yml`).

  ### Deployment Process

  1. On push to `main`, GitHub Actions runs `npm ci` and `npm run build`
  2. The build output is generated in the `build/` directory (configured in `vite.config.ts`)
  3. The workflow uploads the `build/` directory as a GitHub Pages artifact
  4. GitHub Pages serves the built application from this artifact

  ### Build Configuration

  - **Base URL**: `/LeaveValueAtTermination/` (configured in `vite.config.ts`)
  - **Output Directory**: `build/` (configured in `vite.config.ts`)
  - **Build Command**: `npm run build`
  