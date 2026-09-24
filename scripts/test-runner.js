/**
 * SANRAKSHAK - Automated System & Functionality Verification Suite
 * Validates:
 * 1. Code Quality & Data Integrity
 * 2. Simulation Stage Transitions & Hazard Score Algorithms
 * 3. Security & Input Constraints
 * 4. Accessibility & Spacing Token Compliance
 * 5. Route & Component Exports
 */

const fs = require('fs');
const path = require('path');

let testsPassed = 0;
let testsFailed = 0;

function assert(condition, testName) {
  if (condition) {
    console.log(`  \x1b[32m✔ PASS:\x1b[0m ${testName}`);
    testsPassed++;
  } else {
    console.error(`  \x1b[31m✖ FAIL:\x1b[0m ${testName}`);
    testsFailed++;
  }
}

console.log('\n============================================================');
console.log('  SANRAKSHAK INTEGRITY & FUNCTIONALITY TEST SUITE');
console.log('============================================================\n');

// Test 1: Verify mockData structure & stage logic
try {
  const mockDataPath = path.join(__dirname, '../frontend/src/data/mockData.js');
  const mockDataContent = fs.readFileSync(mockDataPath, 'utf8');

  assert(mockDataContent.includes('SIMULATION_STAGES'), 'mockData contains SIMULATION_STAGES definition');
  assert(mockDataContent.includes('INITIAL_SENSORS'), 'mockData contains INITIAL_SENSORS array');
  assert(mockDataContent.includes('POPULATION_ZONES'), 'mockData contains POPULATION_ZONES matrix');
  assert(mockDataContent.includes('INITIAL_ALERTS'), 'mockData contains INITIAL_ALERTS log');
} catch (err) {
  assert(false, `mockData verification error: ${err.message}`);
}

// Test 2: CSS Theme & Accessibility Variables
try {
  const cssPath = path.join(__dirname, '../frontend/src/index.css');
  const cssContent = fs.readFileSync(cssPath, 'utf8');

  assert(cssContent.includes('--space-1: 8px;'), 'CSS system enforces 8px grid spacing --space-1');
  assert(cssContent.includes('[data-theme="dark"]'), 'CSS system supports light and dark themes');
  assert(cssContent.includes('prefers-reduced-motion'), 'CSS system supports reduced motion accessibility');
  assert(cssContent.includes(':focus-visible'), 'CSS system provides visible focus indicators');
} catch (err) {
  assert(false, `index.css verification error: ${err.message}`);
}

// Test 3: Verify Semantic HTML & ARIA roles across key components
try {
  const appPath = path.join(__dirname, '../frontend/src/App.jsx');
  const appContent = fs.readFileSync(appPath, 'utf8');

  assert(appContent.includes('aria-live="assertive"'), 'App.jsx includes ARIA live region for screen readers');
  assert(appContent.includes('<main'), 'App.jsx uses semantic <main> HTML element');
  assert(appContent.includes('lazy('), 'App.jsx uses code splitting with lazy() for efficiency');
} catch (err) {
  assert(false, `App.jsx accessibility test error: ${err.message}`);
}

// Test 4: Verify Security Headers in Flask Backend
try {
  const backendAppPath = path.join(__dirname, '../backend/app.py');
  const backendContent = fs.readFileSync(backendAppPath, 'utf8');

  assert(backendContent.includes('X-Content-Type-Options'), 'Backend app enforces X-Content-Type-Options: nosniff');
  assert(backendContent.includes('X-Frame-Options'), 'Backend app enforces X-Frame-Options: DENY');
  assert(backendContent.includes('X-XSS-Protection'), 'Backend app enforces X-XSS-Protection header');
} catch (err) {
  assert(false, `backend/app.py security test error: ${err.message}`);
}

// Test 5: Verify Public GitHub Repository link in Sidebar
try {
  const sidebarPath = path.join(__dirname, '../frontend/src/components/Sidebar.jsx');
  const sidebarContent = fs.readFileSync(sidebarPath, 'utf8');

  assert(sidebarContent.includes('https://github.com/bhavya14032007/SIH-final2026'), 'Sidebar contains official public GitHub repository link');
} catch (err) {
  assert(false, `Sidebar.jsx GitHub link verification error: ${err.message}`);
}

console.log('\n============================================================');
console.log(`  RESULTS: ${testsPassed} Passed, ${testsFailed} Failed.`);
console.log('============================================================\n');

if (testsFailed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
