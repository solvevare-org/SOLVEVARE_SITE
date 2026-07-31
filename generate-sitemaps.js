/**
 * generate-sitemaps.js
 * Builds a sitemap index + per-state child sitemaps + a core sitemap.
 * Run: node generate-sitemaps.js
 *
 * Output:
 *   sitemap-index.xml          ← sitemap index (submit this to GSC)
 *   sitemap-core.xml           ← homepage, services, about, etc.
 *   sitemaps/sitemap-{state}.xml  ← one per state
 */

const fs   = require('fs');
const path = require('path');

const BASE_URL      = 'https://www.solvevare.com';
const LOCATIONS_DIR = path.join(__dirname, 'locations');
const SITEMAPS_DIR  = path.join(__dirname, 'sitemaps');
const TODAY         = new Date().toISOString().split('T')[0];

// ── Ensure output directory exists ───────────────────────────
if (!fs.existsSync(SITEMAPS_DIR)) fs.mkdirSync(SITEMAPS_DIR);

// ── Core pages ───────────────────────────────────────────────
const corePages = [
  { loc: '/',                          priority: '1.0', changefreq: 'weekly'  },
  { loc: '/about.html',                priority: '0.8', changefreq: 'monthly' },
  { loc: '/contact.html',              priority: '0.8', changefreq: 'monthly' },
  { loc: '/blog.html',                 priority: '0.8', changefreq: 'weekly'  },
  { loc: '/portfolio.html',            priority: '0.8', changefreq: 'monthly' },
  { loc: '/technologies.html',         priority: '0.8', changefreq: 'monthly' },
  { loc: '/industries.html',           priority: '0.8', changefreq: 'monthly' },
  { loc: '/location.html',             priority: '0.9', changefreq: 'weekly'  },
  { loc: '/services.html',             priority: '0.8', changefreq: 'monthly' },
  { loc: '/service-web-development.html',    priority: '0.8', changefreq: 'monthly' },
  { loc: '/service-app-development.html',    priority: '0.8', changefreq: 'monthly' },
  { loc: '/service-custom-software.html',    priority: '0.8', changefreq: 'monthly' },
  { loc: '/service-cloud-devops.html',       priority: '0.8', changefreq: 'monthly' },
  { loc: '/service-ux-design.html',          priority: '0.8', changefreq: 'monthly' },
  { loc: '/service-database.html',           priority: '0.8', changefreq: 'monthly' },
  { loc: '/service-automation.html',         priority: '0.8', changefreq: 'monthly' },
  { loc: '/service-desktop-apps.html',       priority: '0.8', changefreq: 'monthly' },
  { loc: '/service-networking.html',         priority: '0.8', changefreq: 'monthly' },
  { loc: '/privacy-policy.html',       priority: '0.5', changefreq: 'yearly'  },
  { loc: '/terms-of-service.html',     priority: '0.5', changefreq: 'yearly'  },
];

function urlEntry({ loc, priority, changefreq }) {
  return `  <url>\n    <loc>${BASE_URL}${loc}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}

function xmlHeader() {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
}

// ── Write core sitemap ────────────────────────────────────────
const coreXml = [xmlHeader(), ...corePages.map(urlEntry), '</urlset>'].join('\n');
fs.writeFileSync(path.join(__dirname, 'sitemap-core.xml'), coreXml, 'utf8');
console.log(`sitemap-core.xml written (${corePages.length} URLs)`);

// ── Group location files by state ────────────────────────────
const locationFiles = fs.readdirSync(LOCATIONS_DIR).filter(f => f.endsWith('.html'));
const byState = {};

for (const file of locationFiles) {
  const m = file.match(/^([a-z-]+)-in-[a-z-]+\.html$/);
  if (!m) continue;
  const state = m[1];
  if (!byState[state]) byState[state] = [];
  byState[state].push(file);
}

// ── Write per-state sitemaps ──────────────────────────────────
const stateNames = Object.keys(byState).sort();
let totalLocationUrls = 0;

for (const state of stateNames) {
  const entries = byState[state].map(file => urlEntry({
    loc:         `/locations/${file}`,
    priority:    '0.7',
    changefreq:  'monthly',
  }));
  const xml = [xmlHeader(), ...entries, '</urlset>'].join('\n');
  fs.writeFileSync(path.join(SITEMAPS_DIR, `sitemap-${state}.xml`), xml, 'utf8');
  totalLocationUrls += entries.length;
}
console.log(`${stateNames.length} state sitemaps written (${totalLocationUrls} location URLs)`);

// ── Write sitemap index ───────────────────────────────────────
const indexEntries = [
  // Core sitemap first
  `  <sitemap>\n    <loc>${BASE_URL}/sitemap-core.xml</loc>\n    <lastmod>${TODAY}</lastmod>\n  </sitemap>`,
  // State sitemaps
  ...stateNames.map(state =>
    `  <sitemap>\n    <loc>${BASE_URL}/sitemaps/sitemap-${state}.xml</loc>\n    <lastmod>${TODAY}</lastmod>\n  </sitemap>`
  ),
];

const indexXml = [
  `<?xml version="1.0" encoding="UTF-8"?>`,
  `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
  ...indexEntries,
  `</sitemapindex>`,
].join('\n');

fs.writeFileSync(path.join(__dirname, 'sitemap-index.xml'), indexXml, 'utf8');
console.log(`sitemap-index.xml written (1 core + ${stateNames.length} state sitemaps)`);
console.log(`Total URLs indexed: ${corePages.length + totalLocationUrls}`);
console.log('\nNext step: Update robots.txt Sitemap directive to point to sitemap-index.xml');
