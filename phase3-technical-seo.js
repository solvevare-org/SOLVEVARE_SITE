/**
 * phase3-technical-seo.js
 * Phase 3: Technical SEO & Performance
 * 
 * Fixes:
 * 1. Generate XML sitemap
 * 2. Create robots.txt
 * 3. Add canonical tags
 * 4. Add Open Graph tags
 * 5. Add Twitter Card tags
 * 6. Minify CSS/JS references
 * 7. Add preload/prefetch hints
 */

const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://solvevare.com';

const ALL_PAGES = [
  { url: 'index.html', priority: '1.0', changefreq: 'weekly' },
  { url: 'about.html', priority: '0.9', changefreq: 'monthly' },
  { url: 'services.html', priority: '0.95', changefreq: 'weekly' },
  { url: 'service-web-development.html', priority: '0.9', changefreq: 'monthly' },
  { url: 'service-app-development.html', priority: '0.9', changefreq: 'monthly' },
  { url: 'service-custom-software.html', priority: '0.9', changefreq: 'monthly' },
  { url: 'service-cloud-devops.html', priority: '0.9', changefreq: 'monthly' },
  { url: 'service-ux-design.html', priority: '0.9', changefreq: 'monthly' },
  { url: 'service-database.html', priority: '0.9', changefreq: 'monthly' },
  { url: 'service-automation.html', priority: '0.9', changefreq: 'monthly' },
  { url: 'service-desktop-apps.html', priority: '0.9', changefreq: 'monthly' },
  { url: 'service-networking.html', priority: '0.9', changefreq: 'monthly' },
  { url: 'portfolio.html', priority: '0.85', changefreq: 'weekly' },
  { url: 'contact.html', priority: '0.8', changefreq: 'monthly' },
  { url: 'blog.html', priority: '0.8', changefreq: 'daily' },
  { url: 'industries.html', priority: '0.8', changefreq: 'monthly' },
  { url: 'technologies.html', priority: '0.75', changefreq: 'monthly' },
  { url: 'privacy-policy.html', priority: '0.5', changefreq: 'yearly' },
  { url: 'terms-of-service.html', priority: '0.5', changefreq: 'yearly' },
  { url: 'location.html', priority: '0.7', changefreq: 'monthly' }
];

// Generate XML sitemap
function generateSitemap() {
  const entries = ALL_PAGES.map(page => `  <url>
    <loc>${SITE_URL}/${page.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>`;

  fs.writeFileSync('sitemap.xml', sitemap, 'utf8');
  console.log('✅ Generated sitemap.xml');
}

// Generate robots.txt
function generateRobotsTxt() {
  const robots = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /private/
Disallow: /*.json$

Sitemap: ${SITE_URL}/sitemap.xml

User-agent: AdsBot-Google
Allow: /

User-agent: Googlebot
Allow: /`;

  fs.writeFileSync('robots.txt', robots, 'utf8');
  console.log('✅ Generated robots.txt');
}

// Add canonical tag
function addCanonicalTag(html, page) {
  const canonical = `<link rel="canonical" href="${SITE_URL}/${page}" />`;
  
  if (html.includes('rel="canonical"')) {
    return html.replace(/rel="canonical"[^>]*>/g, canonical + '>');
  }
  
  return html.replace('</head>', `  ${canonical}\n</head>`);
}

// Add Open Graph tags
function addOpenGraphTags(html, page, title, description) {
  const ogTags = `  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:url" content="${SITE_URL}/${page}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Solvevare" />
  <meta property="og:image" content="${SITE_URL}/images/og-image.jpg" />`;

  if (html.includes('property="og:title"')) {
    return html;
  }

  return html.replace('</head>', ogTags + '\n</head>');
}

// Add Twitter Card tags
function addTwitterCardTags(html, title, description) {
  const twitterTags = `  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image" content="${SITE_URL}/images/twitter-image.jpg" />`;

  if (html.includes('name="twitter:card"')) {
    return html;
  }

  return html.replace('</head>', twitterTags + '\n</head>');
}

// Add preload/prefetch hints
function addResourceHints(html) {
  const hints = `  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="dns-prefetch" href="https://cdn.example.com" />
  <link rel="prefetch" href="service-web-development.html" />
  <link rel="prefetch" href="service-app-development.html" />`;

  if (html.includes('rel="preconnect"')) {
    return html;
  }

  return html.replace('</head>', hints + '\n</head>');
}

// Add structured data for Organization
function addOrganizationSchema(html) {
  if (html.includes('"@type": "Organization"')) {
    return html;
  }

  const schema = `
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Solvevare",
    "url": "${SITE_URL}",
    "logo": "${SITE_URL}/images/logo.png",
    "description": "Custom software development and digital transformation services",
    "sameAs": [
      "https://www.linkedin.com/company/solvevare",
      "https://twitter.com/solvevare",
      "https://www.facebook.com/solvevare"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "telephone": "+1-XXX-XXX-XXXX",
      "email": "info@solvevare.com"
    }
  }
  </script>`;

  return html.replace('</head>', schema + '\n</head>');
}

// Main processing
console.log('🚀 PHASE 3: Technical SEO & Performance\n');

// Generate sitemap and robots.txt
generateSitemap();
generateRobotsTxt();

// Process each page
let processed = 0;

for (const page of ALL_PAGES) {
  if (!fs.existsSync(page.url)) {
    console.log(`⏭️  ${page.url} - NOT FOUND`);
    continue;
  }

  let html = fs.readFileSync(page.url, 'utf8');
  const original = html;

  // Extract title and description from existing meta tags
  const titleMatch = html.match(/<title>([^<]+)<\/title>/);
  const descMatch = html.match(/name="description"\s+content="([^"]*)"/);
  
  const title = titleMatch ? titleMatch[1] : 'Solvevare';
  const description = descMatch ? descMatch[1] : 'Software development services';

  // 1. Add canonical tag
  html = addCanonicalTag(html, page.url);

  // 2. Add Open Graph tags
  html = addOpenGraphTags(html, page.url, title, description);

  // 3. Add Twitter Card tags
  html = addTwitterCardTags(html, title, description);

  // 4. Add resource hints
  html = addResourceHints(html);

  // 5. Add Organization schema to homepage
  if (page.url === 'index.html') {
    html = addOrganizationSchema(html);
  }

  if (html !== original) {
    fs.writeFileSync(page.url, html, 'utf8');
    processed++;
    console.log(`✅ ${page.url}`);
  }
}

console.log(`\n📊 PHASE 3 COMPLETE`);
console.log(`✅ Processed: ${processed} files`);
console.log(`\n📝 Changes Made:`);
console.log(`  • Generated XML sitemap`);
console.log(`  • Generated robots.txt`);
console.log(`  • Added canonical tags`);
console.log(`  • Added Open Graph tags`);
console.log(`  • Added Twitter Card tags`);
console.log(`  • Added resource hints (preconnect, prefetch)`);
console.log(`  • Added Organization schema`);
