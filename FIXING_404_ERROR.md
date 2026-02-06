# Fixing the main.tsx 404 Error

## Het Probleem / The Problem

**Nederlands:**
De foutmelding was:
```
LeaveValueAtTermination/:12  GET https://hansmeuffels.github.io/src/main.tsx net::ERR_ABORTED 404 (Not Found)
```

Dit gebeurt wanneer GitHub Pages de **bron** `index.html` bestand serveert in plaats van het **gebouwde** `index.html` bestand. Het bron `index.html` bestand (in de root van de repository) bevat een referentie naar `/src/main.tsx` - een ontwikkel bestand dat niet bestaat in productie.

**English:**
The error message was:
```
LeaveValueAtTermination/:12  GET https://hansmeuffels.github.io/src/main.tsx net::ERR_ABORTED 404 (Not Found)
```

This happens when GitHub Pages serves the **source** `index.html` file instead of the **built** `index.html` file. The source `index.html` file (in the repository root) contains a reference to `/src/main.tsx` - a development file that doesn't exist in production.

## De Oplossing / The Solution

### 1. GitHub Pages Configuratie / GitHub Pages Configuration

**Nederlands:** GitHub Pages MOET geconfigureerd zijn om te deployen vanuit de `gh-pages` branch, NIET vanuit de `main` branch.

**English:** GitHub Pages MUST be configured to deploy from the `gh-pages` branch, NOT from the `main` branch.

**Stappen / Steps:**

1. Ga naar repository Settings → Pages
2. Onder "Build and deployment" → "Source"
3. Selecteer "Deploy from a branch"
4. Onder "Branch", selecteer **`gh-pages`** en **`/ (root)`**
5. Klik "Save"

### 2. Hoe Het Werkt / How It Works

**Nederlands:**
- Het `index.html` bestand in de repository root is voor **ontwikkeling** (lokaal gebruik met `npm run dev`)
- Vite gebruikt dit bestand en verwerkt het tijdens de build
- De GitHub Actions workflow (`deploy.yml`) bouwt de applicatie en deployt de gebouwde bestanden naar de `gh-pages` branch
- GitHub Pages moet ingesteld zijn om vanuit de `gh-pages` branch te serveren
- Het gebouwde `index.html` bestand bevat gebundelde JavaScript en CSS, niet de bron `/src/main.tsx` referentie

**English:**
- The `index.html` file in the repository root is for **development** (local use with `npm run dev`)
- Vite uses this file and processes it during build
- The GitHub Actions workflow (`deploy.yml`) builds the application and deploys built files to the `gh-pages` branch
- GitHub Pages must be set to serve from the `gh-pages` branch
- The built `index.html` contains bundled JavaScript and CSS, not the source `/src/main.tsx` reference

### 3. Verificatie / Verification

**Nederlands:**
Er is een test script toegevoegd om te verifiëren dat de build correct is:

**English:**
A test script has been added to verify that the build is correct:

```bash
npm test
```

Dit script controleert:
- ✅ Build directory bestaat
- ✅ index.html is correct gebouwd
- ✅ Geen referentie naar bron bestanden (`/src/main.tsx`)
- ✅ Correct base path (`/LeaveValueAtTermination/`) in asset referenties
- ✅ Gebundelde JavaScript is aanwezig
- ✅ `.nojekyll` bestand bestaat

This script checks:
- ✅ Build directory exists
- ✅ index.html is correctly built
- ✅ No reference to source files (`/src/main.tsx`)
- ✅ Correct base path (`/LeaveValueAtTermination/`) in asset references
- ✅ Bundled JavaScript is present
- ✅ `.nojekyll` file exists

### 4. Deployment Workflow

De deployment workflow (`.github/workflows/deploy.yml`) doet automatisch:

The deployment workflow (`.github/workflows/deploy.yml`) automatically:

1. Installeert dependencies / Installs dependencies
2. Bouwt de applicatie: `npm run build` / Builds the application: `npm run build`
3. Deployt de gebouwde bestanden naar `gh-pages` branch / Deploys built files to `gh-pages` branch

### 5. Lokale Ontwikkeling / Local Development

**Ontwikkeling / Development:**
```bash
npm run dev
```

**Bouwen / Build:**
```bash
npm run build
```

**Verificatie / Verification:**
```bash
npm run verify-build
```

**Testen (bouwen + verificatie) / Testing (build + verification):**
```bash
npm test
```

## Waarom Dit Probleem Ontstond / Why This Problem Occurred

**Nederlands:**
Als GitHub Pages niet correct geconfigureerd is, kan het proberen de website te serveren vanuit de `main` branch in plaats van de `gh-pages` branch. Dan serveert het de bron bestanden in plaats van de gebouwde bestanden, wat resulteert in de 404 fout voor `/src/main.tsx`.

**English:**
If GitHub Pages is not correctly configured, it may try to serve the website from the `main` branch instead of the `gh-pages` branch. This causes it to serve the source files instead of the built files, resulting in the 404 error for `/src/main.tsx`.

## Samenvatting / Summary

**Nederlands:**
- ✅ `index.html` in repository root is correct (nodig voor Vite ontwikkeling)
- ✅ Build process is correct (genereert gebouwde bestanden in `./build`)
- ✅ Deployment workflow is correct (deployt naar `gh-pages`)
- ⚠️ **GitHub Pages configuratie moet naar `gh-pages` branch wijzen**
- ✅ Test script toegevoegd om build output te verifiëren

**English:**
- ✅ `index.html` in repository root is correct (needed for Vite development)
- ✅ Build process is correct (generates built files in `./build`)
- ✅ Deployment workflow is correct (deploys to `gh-pages`)
- ⚠️ **GitHub Pages configuration must point to `gh-pages` branch**
- ✅ Test script added to verify build output

## Zie Ook / See Also

- [DEPLOYMENT.md](./DEPLOYMENT.md) - Volledige deployment documentatie / Complete deployment documentation
- [vite.config.ts](./vite.config.ts) - Vite configuratie met base path / Vite configuration with base path
- [.github/workflows/deploy.yml](./.github/workflows/deploy.yml) - Deployment workflow
