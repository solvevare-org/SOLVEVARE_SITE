const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const CLEANCSS = path.join(__dirname, 'node_modules', '.bin', 'cleancss.cmd');
const TERSER   = path.join(__dirname, 'node_modules', '.bin', 'terser.cmd');

function size(f) { try { return fs.statSync(f).size; } catch { return 0; } }
function kb(b) { return (b/1024).toFixed(1) + ' KB'; }

// ── CSS Files ────────────────────────────────────────────────
const cssFiles = [
  'css/style.css',
  'css/navigation.css',
  'css/back-to-top.css',
  'css/animations.css',
  'css/contact.css',
  'css/portfolio.css',
  'css/project-details.css',
  'css/industry-details.css',
  'css/technologies.css',
  'css/technology-details.css',
  'css/style-new.css',
];

console.log('=== CSS Minification ===');
for (const f of cssFiles) {
  if (!fs.existsSync(f)) continue;
  const before = size(f);
  try {
    execSync(`"${CLEANCSS}" -o "${f}" "${f}"`, { stdio: 'pipe' });
    const after = size(f);
    const saved = ((before - after) / before * 100).toFixed(0);
    console.log(`  ${f}: ${kb(before)} → ${kb(after)} (-${saved}%)`);
  } catch(e) {
    console.log(`  ERROR ${f}: ${e.message.slice(0,80)}`);
  }
}

// ── JS Files ─────────────────────────────────────────────────
const jsFiles = [
  'js/navigation.js',
  'js/script.js',
  'js/back-to-top.js',
  'js/animations.js',
  'js/scroll-animations.js',
  'js/locations-nav.js',
  'js/industriesData.js',
  'js/technologiesData.js',
  'js/locationsData.js',
  'js/servicesData.js',
  'js/projectDetailsData.js',
  'js/technologyDetailsData.js',
  'js/industries.js',
  'js/technologies.js',
  'js/contact.js',
  'js/serviceDetail.js',
  'js/industry-details.js',
  'js/technology-details.js',
  'js/project-details.js',
];

console.log('\n=== JS Minification ===');
for (const f of jsFiles) {
  if (!fs.existsSync(f)) continue;
  const before = size(f);
  try {
    execSync(`"${TERSER}" "${f}" --compress --mangle -o "${f}"`, { stdio: 'pipe' });
    const after = size(f);
    const saved = ((before - after) / before * 100).toFixed(0);
    console.log(`  ${f}: ${kb(before)} → ${kb(after)} (-${saved}%)`);
  } catch(e) {
    console.log(`  ERROR ${f}: ${e.message.slice(0,80)}`);
  }
}

console.log('\n=== Minification Complete ===');
