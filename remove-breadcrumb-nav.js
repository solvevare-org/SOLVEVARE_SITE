const fs = require('fs');
const path = require('path');

const LOCATIONS_DIR = path.join(__dirname, 'locations');
const files = fs.readdirSync(LOCATIONS_DIR).filter(f => f.endsWith('.html'));

let fixed = 0;

for (const file of files) {
  const filePath = path.join(LOCATIONS_DIR, file);
  let html = fs.readFileSync(filePath, 'utf8');
  const original = html;

  // Remove the breadcrumb nav block inserted by fix-location-pages.js
  html = html.replace(
    /\n\s*<!-- Breadcrumb Navigation -->\s*\n\s*<nav aria-label="Breadcrumb" class="breadcrumb-nav"[\s\S]*?<\/nav>/,
    ''
  );

  if (html !== original) {
    fs.writeFileSync(filePath, html, 'utf8');
    fixed++;
  }
}

console.log(`Done. Removed breadcrumb nav from ${fixed} files.`);
