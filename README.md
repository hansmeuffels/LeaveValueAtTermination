
  # User Departure Date Screen

  This is a code bundle for User Departure Date Screen. The original project is available at https://www.figma.com/design/TUxRtz1wA4EyoXLXrHFHk3/User-Departure-Date-Screen.

  ## Live Demo

  The app is deployed at: https://hansmeuffels.github.io/LeaveValueAtTermination/

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ## Building

  Run `npm run build` to create a production build. The output will be in the `build/` directory.

  ## Deployment

  The app is automatically deployed to GitHub Pages when changes are pushed to the `main` branch. The deployment is handled by GitHub Actions workflow (`.github/workflows/deploy.yml`).

  The workflow:
  1. Installs dependencies with `npm ci`
  2. Builds the project with `npm run build`
  3. Deploys the `build/` directory to GitHub Pages

  The production site uses the built JavaScript bundle from the `build/` directory, not the TypeScript source files.
  