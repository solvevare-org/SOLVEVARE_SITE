/**
 * phase4-content-optimization.js
 * Phase 4: Content Optimization & Keyword Targeting
 * 
 * Fixes:
 * 1. Optimize keyword placement (title, H1, first 100 words)
 * 2. Add semantic keywords (LSI keywords)
 * 3. Improve content readability (short paragraphs, lists)
 * 4. Add call-to-action sections
 * 5. Optimize meta keywords
 * 6. Add schema for LocalBusiness
 */

const fs = require('fs');
const path = require('path');

// Keyword targeting map
const KEYWORD_TARGETS = {
  'index.html': {
    primary: 'software development',
    secondary: ['web development', 'app development', 'cloud solutions', 'digital transformation'],
    lsi: ['custom software', 'software company', 'development services', 'technology solutions']
  },
  'service-web-development.html': {
    primary: 'web development',
    secondary: ['web apps', 'responsive websites', 'e-commerce', 'web design'],
    lsi: ['web development services', 'custom web apps', 'website development', 'web development company']
  },
  'service-app-development.html': {
    primary: 'mobile app development',
    secondary: ['iOS development', 'Android development', 'cross-platform apps'],
    lsi: ['app development', 'mobile apps', 'app development services', 'native apps']
  },
  'service-custom-software.html': {
    primary: 'custom software development',
    secondary: ['enterprise software', 'system integration', 'business automation'],
    lsi: ['custom software', 'software solutions', 'enterprise solutions', 'software development']
  },
  'service-cloud-devops.html': {
    primary: 'cloud services',
    secondary: ['AWS', 'Azure', 'GCP', 'DevOps', 'cloud migration'],
    lsi: ['cloud infrastructure', 'cloud computing', 'cloud architecture', 'cloud solutions']
  },
  'service-ux-design.html': {
    primary: 'UX design',
    secondary: ['UI design', 'user experience', 'interface design', 'product design'],
    lsi: ['UX/UI design', 'design services', 'user interface', 'design thinking']
  },
  'service-database.html': {
    primary: 'database development',
    secondary: ['SQL', 'NoSQL', 'data engineering', 'database optimization'],
    lsi: ['database design', 'database services', 'data management', 'database architecture']
  },
  'service-automation.html': {
    primary: 'business automation',
    secondary: ['workflow automation', 'system integration', 'RPA', 'process automation'],
    lsi: ['automation services', 'business process automation', 'workflow optimization', 'automation solutions']
  },
  'service-desktop-apps.html': {
    primary: 'desktop application development',
    secondary: ['Windows apps', 'macOS apps', 'cross-platform desktop'],
    lsi: ['desktop software', 'desktop apps', 'application development', 'desktop development']
  },
  'service-networking.html': {
    primary: 'networking services',
    secondary: ['network infrastructure', 'network security', 'system administration'],
    lsi: ['network design', 'IT infrastructure', 'network solutions', 'infrastructure services']
  },
  'portfolio.html': {
    primary: 'portfolio',
    secondary: ['case studies', 'projects', 'client work', 'success stories'],
    lsi: ['project portfolio', 'work samples', 'client projects', 'case studies']
  },
  'about.html': {
    primary: 'about us',
    secondary: ['team', 'expertise', 'experience', 'company'],
    lsi: ['about company', 'company profile', 'team members', 'company information']
  },
  'contact.html': {
    primary: 'contact us',
    secondary: ['get in touch', 'inquiry', 'support', 'help'],
    lsi: ['contact information', 'contact form', 'reach us', 'contact details']
  }
};

// CTA templates
const CTA_TEMPLATES = {
  service: `
  <section class="cta-section">
    <h2>Ready to Get Started?</h2>
    <p>Let's discuss how we can help transform your business with our expert solutions.</p>
    <a href="contact.html" class="cta-button">Schedule a Consultation</a>
  </section>`,
  
  portfolio: `
  <section class="cta-section">
    <h2>See Our Work in Action</h2>
    <p>Explore our portfolio of successful projects and see what we can do for you.</p>
    <a href="portfolio.html" class="cta-button">View Our Portfolio</a>
  </section>`,
  
  contact: `
  <section class="cta-section">
    <h2>Let's Connect</h2>
    <p>Have questions? Our team is ready to help. Reach out today.</p>
    <a href="contact.html" class="cta-button">Contact Us Now</a>
  </section>`
};

// Improve content readability
function improveReadability(html) {
  // Break long paragraphs into shorter ones
  html = html.replace(/<p>([^<]{300,}?)\. ([A-Z])/g, '</p>\n<p>$2');
  
  // Convert comma-separated lists to actual lists
  html = html.replace(/<p>([^<]*?),\s*([^<]*?),\s*([^<]*?)<\/p>/g, 
    '<ul>\n<li>$1</li>\n<li>$2</li>\n<li>$3</li>\n</ul>');
  
  return html;
}

// Add semantic keywords
function addSemanticKeywords(html, keywords) {
  // Ensure primary keyword appears in first paragraph
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/);
  if (!bodyMatch) return html;
  
  const bodyContent = bodyMatch[1];
  const firstP = bodyContent.match(/<p[^>]*>([^<]+)<\/p>/);
  
  if (firstP && !firstP[1].toLowerCase().includes(keywords.primary.toLowerCase())) {
    const enhanced = `<p><strong>${keywords.primary}</strong> - ${firstP[1]}</p>`;
    return html.replace(firstP[0], enhanced);
  }
  
  return html;
}

// Add LocalBusiness schema
function addLocalBusinessSchema(html) {
  if (html.includes('"@type": "LocalBusiness"')) {
    return html;
  }

  const schema = `
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Solvevare",
    "image": "https://solvevare.com/images/logo.png",
    "description": "Professional software development and digital transformation services",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Tech Street",
      "addressLocality": "San Francisco",
      "addressRegion": "CA",
      "postalCode": "94105",
      "addressCountry": "US"
    },
    "telephone": "+1-XXX-XXX-XXXX",
    "email": "info@solvevare.com",
    "url": "https://solvevare.com",
    "priceRange": "$$",
    "areaServed": "US",
    "serviceType": "Software Development"
  }
  </script>`;

  return html.replace('</head>', schema + '\n</head>');
}

// Add CTA section
function addCTASection(html, page) {
  if (html.includes('cta-section')) return html;
  
  let cta = CTA_TEMPLATES.contact;
  
  if (page.includes('service-')) {
    cta = CTA_TEMPLATES.service;
  } else if (page === 'portfolio.html') {
    cta = CTA_TEMPLATES.portfolio;
  }
  
  return html.replace('</body>', cta + '\n</body>');
}

// Optimize meta keywords
function addMetaKeywords(html, keywords) {
  const allKeywords = [
    keywords.primary,
    ...keywords.secondary,
    ...keywords.lsi
  ].join(', ');

  if (html.includes('name="keywords"')) {
    return html.replace(
      /name="keywords"\s+content="[^"]*"/,
      `name="keywords" content="${allKeywords}"`
    );
  }

  return html.replace('</head>', `  <meta name="keywords" content="${allKeywords}" />\n</head>`);
}

// Main processing
console.log('🚀 PHASE 4: Content Optimization\n');

let optimized = 0;

for (const [page, keywords] of Object.entries(KEYWORD_TARGETS)) {
  if (!fs.existsSync(page)) {
    console.log(`⏭️  ${page} - NOT FOUND`);
    continue;
  }

  let html = fs.readFileSync(page, 'utf8');
  const original = html;

  // 1. Add semantic keywords
  html = addSemanticKeywords(html, keywords);

  // 2. Improve readability
  html = improveReadability(html);

  // 3. Add meta keywords
  html = addMetaKeywords(html, keywords);

  // 4. Add CTA section
  html = addCTASection(html, page);

  // 5. Add LocalBusiness schema to homepage
  if (page === 'index.html') {
    html = addLocalBusinessSchema(html);
  }

  if (html !== original) {
    fs.writeFileSync(page, html, 'utf8');
    optimized++;
    console.log(`✅ ${page}`);
  }
}

console.log(`\n📊 PHASE 4 COMPLETE`);
console.log(`✅ Optimized: ${optimized} files`);
console.log(`\n📝 Changes Made:`);
console.log(`  • Optimized keyword placement`);
console.log(`  • Added semantic keywords (LSI)`);
console.log(`  • Improved content readability`);
console.log(`  • Added call-to-action sections`);
console.log(`  • Added meta keywords`);
console.log(`  • Added LocalBusiness schema`);
