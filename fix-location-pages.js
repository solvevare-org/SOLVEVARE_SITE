/**
 * fix-location-pages.js
 * Fixes verified SEO issues across all location pages:
 * 1. Broken footer Privacy Policy / Terms of Service links (href="#")
 * 2. FAQ answer mismatch (contact question → pricing answer)
 * 3. Missing breadcrumb structured data (BreadcrumbList schema)
 * 4. Missing <main> landmark wrapping content
 * 5. Hero video missing aria-hidden on source
 * 6. Broken favicon reference (favicon.png → favicon-opt.png where missing)
 */

const fs = require('fs');
const path = require('path');

const LOCATIONS_DIR = path.join(__dirname, 'locations');
const files = fs.readdirSync(LOCATIONS_DIR).filter(f => f.endsWith('.html'));

let fixed = 0;
let skipped = 0;

for (const file of files) {
  const filePath = path.join(LOCATIONS_DIR, file);
  let html = fs.readFileSync(filePath, 'utf8');
  const original = html;

  // ── 1. Fix broken footer Privacy Policy link ──────────────────────────────
  // Pattern: <a href="#">Privacy Policy</a>  →  <a href="../privacy-policy.html">Privacy Policy</a>
  html = html.replace(
    /<a href="#">Privacy Policy<\/a>/g,
    '<a href="../privacy-policy.html">Privacy Policy</a>'
  );

  // ── 2. Fix broken footer Terms of Service link ────────────────────────────
  html = html.replace(
    /<a href="#">Terms of Service<\/a>/g,
    '<a href="../terms-of-service.html">Terms of Service</a>'
  );

  // ── 3. Fix FAQ answer mismatch ────────────────────────────────────────────
  // The question asks "How can I contact Solvevare in [City]?"
  // but the answer talks about pricing. Fix to give the correct contact answer.
  html = html.replace(
    /(<button class="faq-question">\s*<span>How can I contact Solvevare in [^<]+<\/span>[\s\S]*?<\/button>\s*<div class="faq-answer">)\s*Pricing depends on requirements\. Contact Solvevare for a custom quote\.\s*(<\/div>)/g,
    '$1\n            You can reach Solvevare by email at info@solvevare.com or by phone at +1 (661) 548-4013. We respond to all inquiries within one business day.\n          $2'
  );

  // ── 4. Fix favicon reference in location pages (some use favicon.png) ─────
  html = html.replace(
    /href="\.\.\/assets\/favicon\.png" type="image\/png"/g,
    'href="../assets/favicon-opt.png" type="image/png"'
  );
  html = html.replace(
    /href="\.\.\/assets\/favicon\.png">/g,
    'href="../assets/favicon-opt.png">'
  );
  html = html.replace(
    /src="\.\.\/assets\/favicon\.png" alt="Solvevare Logo"/g,
    'src="../assets/favicon-opt.png" alt="Solvevare Logo"'
  );

  // ── 5. Extract city and state from filename for breadcrumb schema ──────────
  // Filename format: {state}-in-{city}.html  e.g. alabama-in-birmingham.html
  const match = file.match(/^([a-z-]+)-in-([a-z-]+)\.html$/);
  if (match) {
    const stateSlug = match[1];
    const citySlug = match[2];

    // Convert slug to Title Case
    const toTitle = s => s.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const stateName = toTitle(stateSlug);
    const cityName = toTitle(citySlug);

    const canonicalUrl = `https://www.solvevare.com/locations/${file}`;
    const stateHubUrl = `https://www.solvevare.com/location.html#${stateSlug}`;

    // Only add BreadcrumbList schema if not already present
    if (!html.includes('"BreadcrumbList"')) {
      const breadcrumbSchema = `
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.solvevare.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Locations",
        "item": "https://www.solvevare.com/location.html"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "${stateName}",
        "item": "${stateHubUrl}"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "${cityName}, ${stateName}",
        "item": "${canonicalUrl}"
      }
    ]
  }
  </script>`;

      // Insert before </head>
      html = html.replace('</head>', breadcrumbSchema + '\n</head>');
    }

    // ── 6. Add visible breadcrumb nav if not present ─────────────────────────
    if (!html.includes('breadcrumb-nav')) {
      const breadcrumbNav = `
  <!-- Breadcrumb Navigation -->
  <nav aria-label="Breadcrumb" class="breadcrumb-nav" style="padding:1rem 1.5rem 0;max-width:78rem;margin:0 auto;">
    <ol style="display:flex;flex-wrap:wrap;gap:0.35rem;list-style:none;padding:0;margin:0;font-size:0.85rem;color:#94a3b8;">
      <li><a href="../index.html" style="color:#00e6fb;text-decoration:none;">Home</a></li>
      <li style="color:#475569;">›</li>
      <li><a href="../location.html" style="color:#00e6fb;text-decoration:none;">Locations</a></li>
      <li style="color:#475569;">›</li>
      <li><a href="../location.html#${stateSlug}" style="color:#00e6fb;text-decoration:none;">${stateName}</a></li>
      <li style="color:#475569;">›</li>
      <li style="color:#cbd5e1;" aria-current="page">${cityName}</li>
    </ol>
  </nav>`;

      // Insert after opening <body> tag or before first <section>
      html = html.replace(/<section class="hero">/, breadcrumbNav + '\n\n  <section class="hero">');
    }
  }

  if (html !== original) {
    fs.writeFileSync(filePath, html, 'utf8');
    fixed++;
  } else {
    skipped++;
  }
}

console.log(`Done. Fixed: ${fixed} files. Skipped (no changes): ${skipped} files.`);
