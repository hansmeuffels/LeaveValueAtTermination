
# User Departure Date Screen

This is a code bundle for User Departure Date Screen. The original project is available at https://www.figma.com/design/TUxRtz1wA4EyoXLXrHFHk3/User-Departure-Date-Screen.

## Live Demo

The app is deployed at: https://hansmeuffels.github.io/LeaveValueAtTermination/

## Prerequisites

- [Node.js](https://nodejs.org/) (version 20 or higher)
- npm (comes with Node.js)

## Getting Started

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

### Running the Development Server

To start the development server:

```bash
npm run dev
```

The app will open in your browser at http://localhost:3000

### Building for Production

To create a production build:

```bash
npm run build
```

The build output will be in the `build` directory.

### Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

## Windows Setup

If you're on Windows and encounter the error `'vite' is not recognized as an internal or external command`:

1. Make sure you've installed dependencies first:
   ```powershell
   npm install
   ```

2. Then run the build:
   ```powershell
   npm run build
   ```

**Note**: You must run `npm install` before running any build or dev commands. This installs the required tools (including Vite) locally in the `node_modules` folder.

## Deployment

The app is automatically deployed to GitHub Pages when changes are pushed to the `main` branch. The deployment is handled by GitHub Actions workflow located in `.github/workflows/deploy.yml`.

The workflow:
1. Checks out the code
2. Sets up Node.js 20
3. Installs dependencies with `npm ci`
4. Builds the project with `npm run build`
5. Deploys the `build` directory to GitHub Pages
