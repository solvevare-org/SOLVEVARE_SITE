const fs = require('fs');

// Remove Google Fonts @import from style.css (already loaded in HTML <head>)
const stylePath = 'css/style.css';
let css = fs.readFileSync(stylePath, 'utf8');
const before = css.length;
// Remove all @import url(...googleapis...) lines
css = css.replace(/@import url\(https:\/\/fonts\.googleapis\.com[^)]+\);/g, '');
css = css.replace(/@import url\('https:\/\/fonts\.googleapis\.com[^']+'\);/g, '');
css = css.replace(/@import url\("https:\/\/fonts\.googleapis\.com[^"]+"\);/g, '');
fs.writeFileSync(stylePath, css, 'utf8');
console.log(`style.css: removed @import, ${(before/1024).toFixed(1)} KB → ${(css.length/1024).toFixed(1)} KB`);

// Check locationsData.js size - it's 3.5MB which is huge
const locPath = 'js/locationsData.js';
if (fs.existsSync(locPath)) {
  const locSize = fs.statSync(locPath).size;
  console.log(`locationsData.js: ${(locSize/1024/1024).toFixed(2)} MB`);
  // Check first 500 chars to understand structure
  const sample = fs.readFileSync(locPath, 'utf8').slice(0, 500);
  console.log('Sample:', sample);
}
