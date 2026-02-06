#!/usr/bin/env node

/**
 * Verify that the build output is correct for GitHub Pages deployment
 * This script checks that:
 * 1. The build directory exists
 * 2. The built index.html contains references to bundled assets (not /src/main.tsx)
 * 3. The built index.html uses the correct base path
 */

const fs = require('fs');
const path = require('path');

const BUILD_DIR = path.join(__dirname, '..', 'build');
const INDEX_HTML = path.join(BUILD_DIR, 'index.html');
const EXPECTED_BASE = '/LeaveValueAtTermination/';

console.log('🔍 Verifying build output...\n');

// Check if build directory exists
if (!fs.existsSync(BUILD_DIR)) {
  console.error('❌ Build directory does not exist: ' + BUILD_DIR);
  console.error('   Run "npm run build" first');
  process.exit(1);
}

// Check if index.html exists
if (!fs.existsSync(INDEX_HTML)) {
  console.error('❌ index.html does not exist in build directory');
  process.exit(1);
}

// Read the built index.html
const indexContent = fs.readFileSync(INDEX_HTML, 'utf-8');

// Check that it doesn't contain reference to /src/main.tsx (source file)
if (indexContent.includes('/src/main.tsx')) {
  console.error('❌ FAIL: Built index.html still contains reference to /src/main.tsx');
  console.error('   This means the build process did not properly bundle the application.');
  console.error('   The source file reference should be replaced with a bundled asset reference.');
  process.exit(1);
}

// Check that it contains the correct base path in asset references
if (!indexContent.includes(EXPECTED_BASE + 'assets/')) {
  console.error('❌ FAIL: Built index.html does not contain correct base path: ' + EXPECTED_BASE);
  console.error('   Asset references should use ' + EXPECTED_BASE + 'assets/...');
  console.error('   Check vite.config.ts base setting.');
  process.exit(1);
}

// Check that it contains bundled JS
if (!indexContent.includes('<script type="module"') || !indexContent.includes('.js')) {
  console.error('❌ FAIL: Built index.html does not contain bundled JavaScript');
  console.error('   The build should create a bundled JS file.');
  process.exit(1);
}

// Check that .nojekyll exists
const nojekyllPath = path.join(BUILD_DIR, '.nojekyll');
if (!fs.existsSync(nojekyllPath)) {
  console.error('❌ FAIL: .nojekyll file is missing in build directory');
  console.error('   This file is needed to prevent Jekyll processing on GitHub Pages.');
  process.exit(1);
}

console.log('✅ Build directory exists: ' + BUILD_DIR);
console.log('✅ index.html exists and is correctly built');
console.log('✅ No reference to source files (/src/main.tsx) found');
console.log('✅ Correct base path (' + EXPECTED_BASE + ') found in asset references');
console.log('✅ Bundled JavaScript found');
console.log('✅ .nojekyll file exists');
console.log('\n✨ Build verification passed! The build is ready for deployment.');
console.log('\n📝 Note: Make sure GitHub Pages is configured to deploy from the "gh-pages" branch,');
console.log('   not from the "main" branch, to serve the built files correctly.');
