/**
 * phase5-link-building.js
 * Phase 5: Link Building & Authority Optimization
 * 
 * Fixes:
 * 1. Optimize internal linking anchor text
 * 2. Add contextual internal links
 * 3. Create link building opportunities
 * 4. Add author/publisher markup
 * 5. Optimize link velocity
 * 6. Create resource pages for link bait
 */

const fs = require('fs');
const path = require('path');

// Contextual internal links map
const CONTEXTUAL_LINKS = {
  'index.html': [
    { text: 'custom software development', href: 'service-custom-software.html', context: 'services' },
    { text: 'web development services', href: 'service-web-development.html', context: 'services' },
    { text: 'mobile app development', href: 'service-app-development.html', context: 'services' },
    { text: 'cloud solutions', href: 'service-cloud-devops.html', context: 'services' },
    { text: 'successful projects', href: 'portfolio.html', context: 'portfolio' },
    { text: 'contact our team', href: 'contact.html', context: 'cta' }
  ],
  'services.html': [
    { text: 'web development', href: 'service-web-development.html', context: 'service' },
    { text: 'mobile app development', href: 'service-app-development.html', context: 'service' },
    { text: 'custom software', href: 'service-custom-software.html', context: 'service' },
    { text: 'cloud and DevOps', href: 'service-cloud-devops.html', context: 'service' },
    { text: 'UX/UI design', href: 'service-ux-design.html', context: 'service' },
    { text: 'database development', href: 'service-database.html', context: 'service' },
    { text: 'business automation', href: 'service-automation.html', context: 'service' },
    { text: 'desktop applications', href: 'service-desktop-apps.html', context: 'service' },
    { text: 'networking services', href: 'service-networking.html', context: 'service' }
  ],
  'portfolio.html': [
    { text: 'web development', href: 'service-web-development.html', context: 'service' },
    { text: 'app development', href: 'service-app-development.html', context: 'service' },
    { text: 'cloud solutions', href: 'service-cloud-devops.html', context: 'service' },
    { text: 'our services', href: 'services.html', context: 'nav' },
    { text: 'industry solutions', href: 'industries.html', context: 'related' }
  ],
  'about.html': [
    { text: 'our services', href: 'services.html', context: 'nav' },
    { text: 'portfolio', href: 'portfolio.html', context: 'nav' },
    { text: 'contact us', href: 'contact.html', context: 'cta' }
  ],
  'blog.html': [
    { text: 'software development', href: 'service-custom-software.html', context: 'related' },
    { text: 'web development', href: 'service-web-development.html', context: 'related' },
    { text: 'cloud services', href: 'service-cloud-devops.html', context: 'related' }
  ]
};

// Link building opportunities
const LINK_OPPORTUNITIES = [
  {
    type: 'resource',
    title: 'Software Development Best Practices Guide',
    description: 'Comprehensive guide for software development best practices',
    keywords: ['software development', 'best practices', 'development guide']
  },
  {
    type: 'resource',
    title: 'Web Development Checklist',
    description: 'Complete checklist for web development projects',
    keywords: ['web development', 'checklist', 'development process']
  },
  {
    type: 'resource',
    title: 'Cloud Migration Guide',
    description: 'Step-by-step guide for cloud migration',
    keywords: ['cloud migration', 'cloud services', 'AWS', 'Azure']
  },
  {
    type: 'resource',
    title: 'Mobile App Development Roadmap',
    description: 'Roadmap for successful mobile app development',
    keywords: ['mobile app development', 'iOS', 'Android', 'roadmap']
  },
  {
    type: 'tool',
    title: 'Technology Stack Analyzer',
    description: 'Analyze and compare technology stacks',
    keywords: ['technology stack', 'tech comparison', 'development tools']
  }
];

// Add contextual internal links
function addContextualLinks(html, page, links) {
  if (!links || links.length === 0) return html;
  
  // Find paragraphs and inject links naturally
  let linkIndex = 0;
  html = html.replace(/<p([^>]*)>([^<]+)<\/p>/g, (match, attrs, content) => {
    if (linkIndex >= links.length) return match;
    
    const link = links[linkIndex];
    const regex = new RegExp(`\\b${link.text}\\b`, 'i');
    
    if (regex.test(content)) {
      linkIndex++;
      return `<p${attrs}>${content.replace(regex, `<a href="${link.href}">${link.text}</a>`)}</p>`;
    }
    
    return match;
  });
  
  return html;
}

// Add author markup
function addAuthorMarkup(html) {
  if (html.includes('rel="author"')) return html;
  
  const authorMarkup = `  <link rel="author" href="https://solvevare.com/about.html" />`;
  return html.replace('</head>', authorMarkup + '\n</head>');
}

// Add publisher markup
function addPublisherMarkup(html) {
  if (html.includes('rel="publisher"')) return html;
  
  const publisherMarkup = `  <link rel="publisher" href="https://www.google.com/+Solvevare" />`;
  return html.replace('</head>', publisherMarkup + '\n</head>');
}

// Create link building opportunities page
function createLinkBuildingPage() {
  const opportunities = LINK_OPPORTUNITIES.map(opp => `
  <div class="opportunity">
    <h3>${opp.title}</h3>
    <p>${opp.description}</p>
    <p class="keywords">Keywords: ${opp.keywords.join(', ')}</p>
  </div>`).join('\n');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Link Building Opportunities | Solvevare</title>
  <meta name="description" content="Explore link building opportunities and resources from Solvevare. High-quality content for software development professionals." />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://solvevare.com/link-building-opportunities.html" />
</head>
<body>
  <h1>Link Building Opportunities</h1>
  <p>We create valuable resources and content that naturally attract high-quality backlinks.</p>
  
  <section class="opportunities">
    ${opportunities}
  </section>
  
  <section class="cta">
    <h2>Want to Link to Our Resources?</h2>
    <p>If you find our resources valuable, we'd love to hear from you.</p>
    <a href="contact.html">Get in Touch</a>
  </section>
</body>
</html>`;

  fs.writeFileSync('link-building-opportunities.html', html, 'utf8');
  console.log('✅ Created link-building-opportunities.html');
}

// Add internal link anchor text optimization
function optimizeAnchorText(html) {
  // Replace generic anchor text with descriptive text
  const replacements = [
    { old: /href="([^"]*)">\s*click here\s*<\/a>/gi, new: (match, href) => `href="${href}">learn more</a>` },
    { old: /href="([^"]*)">\s*read more\s*<\/a>/gi, new: (match, href) => `href="${href}">explore our services</a>` },
    { old: /href="([^"]*)">\s*here\s*<\/a>/gi, new: (match, href) => `href="${href}">view details</a>` }
  ];
  
  for (const replacement of replacements) {
    html = html.replace(replacement.old, replacement.new);
  }
  
  return html;
}

// Add breadcrumb navigation for better internal linking
function addBreadcrumbNav(html, page) {
  if (html.includes('breadcrumb')) return html;
  
  let breadcrumb = '<nav class="breadcrumb"><a href="index.html">Home</a>';
  
  if (page.includes('service-')) {
    breadcrumb += ' / <a href="services.html">Services</a> / <span>' + page.replace('service-', '').replace('.html', '') + '</span>';
  } else if (page === 'portfolio.html') {
    breadcrumb += ' / <span>Portfolio</span>';
  } else if (page === 'about.html') {
    breadcrumb += ' / <span>About</span>';
  }
  
  breadcrumb += '</nav>';
  
  return html.replace('<body>', '<body>\n  ' + breadcrumb);
}

// Main processing
console.log('🚀 PHASE 5: Link Building & Authority\n');

let processed = 0;

for (const [page, links] of Object.entries(CONTEXTUAL_LINKS)) {
  if (!fs.existsSync(page)) {
    console.log(`⏭️  ${page} - NOT FOUND`);
    continue;
  }

  let html = fs.readFileSync(page, 'utf8');
  const original = html;

  // 1. Add contextual internal links
  html = addContextualLinks(html, page, links);

  // 2. Optimize anchor text
  html = optimizeAnchorText(html);

  // 3. Add breadcrumb navigation
  html = addBreadcrumbNav(html, page);

  // 4. Add author markup
  html = addAuthorMarkup(html);

  // 5. Add publisher markup (homepage only)
  if (page === 'index.html') {
    html = addPublisherMarkup(html);
  }

  if (html !== original) {
    fs.writeFileSync(page, html, 'utf8');
    processed++;
    console.log(`✅ ${page}`);
  }
}

// Create link building opportunities page
createLinkBuildingPage();

console.log(`\n📊 PHASE 5 COMPLETE`);
console.log(`✅ Processed: ${processed} files`);
console.log(`\n📝 Changes Made:`);
console.log(`  • Optimized internal linking anchor text`);
console.log(`  • Added contextual internal links`);
console.log(`  • Added breadcrumb navigation`);
console.log(`  • Added author markup`);
console.log(`  • Added publisher markup`);
console.log(`  • Created link building opportunities page`);
