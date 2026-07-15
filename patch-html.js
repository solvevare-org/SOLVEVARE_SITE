const fs = require('fs');

// ── index.html ────────────────────────────────────────────────────────────────
let html = fs.readFileSync('index.html', 'utf8');

// 1. Favicon → optimized
html = html.replace(
  /assets\/favicon\.png" type="image\/png"/g,
  'assets/favicon-opt.png" type="image/png"'
);
html = html.replace(
  /assets\/favicon\.png" alt="Solvevare Logo"/g,
  'assets/favicon-opt.png" alt="Solvevare Logo"'
);
html = html.replace(
  /<link rel="apple-touch-icon" href="assets\/favicon\.png">/g,
  '<link rel="apple-touch-icon" href="assets/favicon-opt.png">'
);

// 2. Add hero image preload hints (insert after </title> if not already present)
if (!html.includes('hero-bg-768.webp')) {
  html = html.replace(
    /(<link rel="preconnect" href="https:\/\/fonts\.googleapis\.com")/,
    `<link rel="preload" as="image" href="assets/hero-bg-768.webp" media="(max-width:767px)" type="image/webp">
  <link rel="preload" as="image" href="assets/hero-bg-1920.webp" media="(min-width:768px)" type="image/webp">
  $1`
  );
}

// 3. Hero video: use compressed version + poster + preload=metadata
html = html.replace(
  /preload="none" poster="assets\/3d-background-blue-6016x3384-11033\.jpg"/,
  'preload="metadata" poster="assets/hero-video-compressed-poster.webp"'
);
html = html.replace(
  /<source src="assets\/Diagonal_Tile_Animation_Abstract_flowing_metallic_shapes_with_neon_blue_-JXeluF1\.mp4"\s*\n\s*type="video\/mp4">/,
  `<source src="assets/hero-video-mobile.mp4" type="video/mp4" media="(max-width:767px)">
        <source src="assets/hero-video-compressed.mp4" type="video/mp4">`
);

// 4. Case study image in nav mega menu → WebP
html = html.replace(
  /<img src="assets\/Screenshot 2025-12-15 203923\.png" alt="Healthcare Case Study" width="600" height="400" loading="lazy">/,
  `<picture>
                <source srcset="assets/case-study-healthcare.webp" type="image/webp">
                <img src="assets/Screenshot 2025-12-15 203923.png" alt="Healthcare Case Study" width="400" height="267" loading="lazy" decoding="async">
              </picture>`
);

// 5. Portfolio card 1 (Ticketing System) → WebP with picture element
html = html.replace(
  /<img src="assets\/Screenshot 2025-12-15 203923\.png" alt="Ticketing System" width="600" height="400" loading="lazy">/,
  `<picture>
                  <source srcset="assets/portfolio-ticketing-mobile.webp 400w, assets/portfolio-ticketing.webp 600w" sizes="(max-width:767px) 400px, 600px" type="image/webp">
                  <img src="assets/Screenshot 2025-12-15 203923.png" alt="Ticketing System" width="600" height="400" loading="lazy" decoding="async">
                </picture>`
);

// 6. Portfolio card 2 (NORIGHTWAY) → WebP
html = html.replace(
  /<img src="assets\/Screenshot 2025-12-15 213248\.png" alt="NORIGHTWAY" width="600" height="400" loading="lazy">/,
  `<picture>
                  <source srcset="assets/portfolio-norightway-mobile.webp 400w, assets/portfolio-norightway.webp 600w" sizes="(max-width:767px) 400px, 600px" type="image/webp">
                  <img src="assets/Screenshot 2025-12-15 213248.png" alt="NORIGHTWAY" width="600" height="400" loading="lazy" decoding="async">
                </picture>`
);

// 7. Portfolio card 3 (Chem Publishers) → WebP
html = html.replace(
  /<img src="assets\/Screenshot 2025-12-15 225523\.png" alt="Chem Publishers" width="600" height="400" loading="lazy">/,
  `<picture>
                  <source srcset="assets/portfolio-chem-mobile.webp 400w, assets/portfolio-chem.webp 600w" sizes="(max-width:767px) 400px, 600px" type="image/webp">
                  <img src="assets/Screenshot 2025-12-15 225523.png" alt="Chem Publishers" width="600" height="400" loading="lazy" decoding="async">
                </picture>`
);

// 8. Logo images → WebP with picture elements
const logos = [
  { png: 'AWS_logo.png',         webp: 'AWS_logo.webp',         alt: 'AWS' },
  { png: 'Cloudflare_logo.png',  webp: 'Cloudflare_logo.webp',  alt: 'Cloudflare' },
  { png: 'googlecloud_logo.png', webp: 'googlecloud_logo.webp', alt: 'Google Cloud' },
  { png: 'Azure_logo.png',       webp: 'Azure_logo.webp',       alt: 'Azure' },
  { png: 'Supabase.png',         webp: 'Supabase.webp',         alt: 'Supabase' },
  { png: 'Firebase_logo.png',    webp: 'Firebase_logo.webp',    alt: 'Firebase' },
];

for (const logo of logos) {
  // Match with optional style attribute
  const re = new RegExp(
    `<img src="assets/logos/${logo.png}" alt="${logo.alt}"([^>]*)>`,
    'g'
  );
  html = html.replace(re, (match, attrs) => {
    return `<picture>
            <source srcset="assets/logos/${logo.webp}" type="image/webp">
            <img src="assets/logos/${logo.png}" alt="${logo.alt}"${attrs} loading="lazy" decoding="async">
          </picture>`;
  });
}

// 9. Footer copyright fix (corrupted © char)
html = html.replace(/Â©/g, '©');

// 10. Footer "View All States →" fix (corrupted arrow)
html = html.replace(/View All States â†'/g, 'View All States →');

// 11. Partnership list arrows fix
html = html.replace(/â†'/g, '→');

// 12. App description fix (corrupted em-dash)
html = html.replace(/â€"/g, '–');

fs.writeFileSync('index.html', html, 'utf8');
console.log('index.html patched successfully');

// ── Also patch portfolio.html if it exists ────────────────────────────────────
if (fs.existsSync('portfolio.html')) {
  let ph = fs.readFileSync('portfolio.html', 'utf8');
  const portfolioReplacements = [
    ['Screenshot 2025-12-15 203923.png', 'portfolio-ticketing.webp'],
    ['Screenshot 2025-12-15 213248.png', 'portfolio-norightway.webp'],
    ['Screenshot 2025-12-15 225523.png', 'portfolio-chem.webp'],
    ['Screenshot 2025-12-15 215615.png', 'Screenshot 2025-12-15 215615.webp'],
    ['Screenshot 2025-12-15 215823.png', 'Screenshot 2025-12-15 215823.webp'],
    ['Screenshot 2025-12-15 215842.png', 'Screenshot 2025-12-15 215842.webp'],
    ['Screenshot 2025-12-15 215916.png', 'Screenshot 2025-12-15 215916.webp'],
    ['Screenshot 2025-12-15 215957.png', 'Screenshot 2025-12-15 215957.webp'],
    ['Screenshot 2025-12-15 220024.png', 'Screenshot 2025-12-15 220024.webp'],
    ['Screenshot 2025-12-15 231159.png', 'Screenshot 2025-12-15 231159.webp'],
    ['Screenshot 2025-12-15 231217.png', 'Screenshot 2025-12-15 231217.webp'],
    ['Screenshot 2025-12-15 231230.png', 'Screenshot 2025-12-15 231230.webp'],
    ['Screenshot 2025-12-15 231949.png', 'Screenshot 2025-12-15 231949.webp'],
    ['Screenshot 2025-12-15 233204.png', 'Screenshot 2025-12-15 233204.webp'],
    ['Screenshot 2025-12-15 233700.png', 'Screenshot 2025-12-15 233700.webp'],
    ['Screenshot 2025-12-15 234109.png', 'Screenshot 2025-12-15 234109.webp'],
    ['Screenshot 2025-12-15 234130.png', 'Screenshot 2025-12-15 234130.webp'],
    ['Screenshot 2025-12-15 234221.png', 'Screenshot 2025-12-15 234221.webp'],
    ['Screenshot 2025-12-15 234303.png', 'Screenshot 2025-12-15 234303.webp'],
    ['Screenshot 2025-12-16 003928.png', 'Screenshot 2025-12-16 003928.webp'],
    ['Screenshot 2025-12-16 005831.png', 'Screenshot 2025-12-16 005831.webp'],
    ['Screenshot 2025-12-16 005853.png', 'Screenshot 2025-12-16 005853.webp'],
    ['Screenshot 2025-12-16 005905.png', 'Screenshot 2025-12-16 005905.webp'],
    ['Screenshot 2025-12-16 005936.png', 'Screenshot 2025-12-16 005936.webp'],
    ['Screenshot 2025-12-16 005947.png', 'Screenshot 2025-12-16 005947.webp'],
    ['Screenshot 2025-12-16 010037.png', 'Screenshot 2025-12-16 010037.webp'],
    ['Screenshot 2025-12-16 010055.png', 'Screenshot 2025-12-16 010055.webp'],
    ['Screenshot 2025-12-16 012240.png', 'Screenshot 2025-12-16 012240.webp'],
    ['Screenshot 2025-12-16 012337.png', 'Screenshot 2025-12-16 012337.webp'],
    ['Screenshot 2025-12-16 012347.png', 'Screenshot 2025-12-16 012347.webp'],
    ['Screenshot 2025-12-16 012500.png', 'Screenshot 2025-12-16 012500.webp'],
    ['Screenshot 2025-12-16 013852.png', 'Screenshot 2025-12-16 013852.webp'],
    ['Screenshot 2025-12-16 013905.png', 'Screenshot 2025-12-16 013905.webp'],
    ['Screenshot 2025-12-16 013918.png', 'Screenshot 2025-12-16 013918.webp'],
    ['Screenshot 2025-12-16 013929.png', 'Screenshot 2025-12-16 013929.webp'],
    ['Screenshot 2025-12-16 013941.png', 'Screenshot 2025-12-16 013941.webp'],
    ['Screenshot 2025-12-16 014007.png', 'Screenshot 2025-12-16 014007.webp'],
  ];
  for (const [from, to] of portfolioReplacements) {
    ph = ph.split(from).join(to);
  }
  // Fix screencapture images
  ph = ph.replace(/screencapture-([^"]+)\.png/g, 'screencapture-$1.webp');
  ph = ph.replace(/Â©/g, '©');
  ph = ph.replace(/â†'/g, '→');
  ph = ph.replace(/â€"/g, '–');
  fs.writeFileSync('portfolio.html', ph, 'utf8');
  console.log('portfolio.html patched');
}

// ── Patch all other HTML files for corrupted chars + favicon ─────────────────
const htmlFiles = require('fs').readdirSync('.').filter(f => f.endsWith('.html') && f !== 'index.html' && f !== 'portfolio.html');
for (const file of htmlFiles) {
  try {
    let c = fs.readFileSync(file, 'utf8');
    let changed = false;
    const orig = c;
    c = c.replace(/Â©/g, '©');
    c = c.replace(/â†'/g, '→');
    c = c.replace(/â€"/g, '–');
    c = c.replace(/assets\/favicon\.png" type="image\/png"/g, 'assets/favicon-opt.png" type="image/png"');
    c = c.replace(/assets\/favicon\.png" alt="Solvevare Logo"/g, 'assets/favicon-opt.png" alt="Solvevare Logo"');
    // Fix screencapture images in any HTML file
    c = c.replace(/screencapture-([^"]+)\.png/g, 'screencapture-$1.webp');
    if (c !== orig) { fs.writeFileSync(file, c, 'utf8'); console.log(`Patched: ${file}`); }
  } catch(e) { /* skip */ }
}
console.log('All HTML files patched');
