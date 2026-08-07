/**
 * run-all-phases.js
 * Master SEO Optimization Runner
 * 
 * Executes all 5 phases of SEO optimization:
 * Phase 1: Schema & Technical SEO
 * Phase 2: On-Page SEO Optimization
 * Phase 3: Technical SEO & Performance
 * Phase 4: Content Optimization & Keyword Targeting
 * Phase 5: Link Building & Authority Optimization
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const PHASES = [
  {
    name: 'Phase 1: Schema & Technical SEO',
    file: 'phase1-seo-fix.js',
    description: 'Add FAQPage schema, optimize meta tags, fix heading hierarchy, enhance alt text'
  },
  {
    name: 'Phase 2: On-Page SEO Optimization',
    file: 'phase2-onpage-seo.js',
    description: 'Add internal linking, breadcrumb schema, optimize content structure, lazy loading'
  },
  {
    name: 'Phase 3: Technical SEO & Performance',
    file: 'phase3-technical-seo.js',
    description: 'Generate sitemap, robots.txt, add canonical tags, Open Graph, Twitter Cards'
  },
  {
    name: 'Phase 4: Content Optimization',
    file: 'phase4-content-optimization.js',
    description: 'Optimize keywords, add semantic keywords, improve readability, add CTAs'
  },
  {
    name: 'Phase 5: Link Building & Authority',
    file: 'phase5-link-building.js',
    description: 'Optimize internal links, add author/publisher markup, create link opportunities'
  }
];

const LOG_FILE = 'seo-optimization.log';

function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}`;
  console.log(logMessage);
  fs.appendFileSync(LOG_FILE, logMessage + '\n');
}

function runPhase(phase, index) {
  log(`\n${'='.repeat(70)}`);
  log(`Running ${phase.name} (${index}/${PHASES.length})`);
  log(`Description: ${phase.description}`);
  log(`${'='.repeat(70)}\n`);

  if (!fs.existsSync(phase.file)) {
    log(`❌ ERROR: ${phase.file} not found`);
    return false;
  }

  try {
    execSync(`node ${phase.file}`, { stdio: 'inherit' });
    log(`\n✅ ${phase.name} completed successfully\n`);
    return true;
  } catch (error) {
    log(`\n❌ ${phase.name} failed with error:`);
    log(error.message);
    return false;
  }
}

function generateSummary(results) {
  const summary = `
${'='.repeat(70)}
📊 SEO OPTIMIZATION SUMMARY
${'='.repeat(70)}

Total Phases: ${PHASES.length}
Completed: ${results.filter(r => r).length}
Failed: ${results.filter(r => !r).length}

Phase Results:
${PHASES.map((phase, idx) => {
  const status = results[idx] ? '✅' : '❌';
  return `${status} ${phase.name}`;
}).join('\n')}

${'='.repeat(70)}

Generated Files:
  • sitemap.xml - XML sitemap for search engines
  • robots.txt - Search engine crawling instructions
  • link-building-opportunities.html - Link bait resource page

Optimized Pages:
  • index.html
  • about.html
  • services.html
  • service-web-development.html
  • service-app-development.html
  • service-custom-software.html
  • service-cloud-devops.html
  • service-ux-design.html
  • service-database.html
  • service-automation.html
  • service-desktop-apps.html
  • service-networking.html
  • portfolio.html
  • contact.html
  • blog.html
  • industries.html
  • technologies.html
  • privacy-policy.html
  • terms-of-service.html
  • location.html
  • 404.html

Key Improvements:
  ✓ Schema markup (FAQ, Breadcrumb, Organization, LocalBusiness, Article)
  ✓ Meta tags (title, description, keywords, OG, Twitter)
  ✓ Heading hierarchy (single H1, logical H2/H3)
  ✓ Image optimization (alt text, titles, lazy loading)
  ✓ Internal linking (contextual, anchor text, breadcrumbs)
  ✓ Content optimization (keywords, readability, CTAs)
  ✓ Technical SEO (canonical, preload, prefetch, resource hints)
  ✓ Performance (lazy loading, resource hints, minification)

Next Steps:
  1. Review generated sitemap.xml and robots.txt
  2. Test pages with Google Search Console
  3. Validate schema markup with Schema.org validator
  4. Monitor rankings for target keywords
  5. Build backlinks to link-building-opportunities.html
  6. Continue content creation and optimization

${'='.repeat(70)}
`;

  return summary;
}

// Main execution
console.log(`
╔${'═'.repeat(68)}╗
║ 🚀 SOLVEVARE SEO OPTIMIZATION - MASTER RUNNER                    ║
║ Comprehensive 5-Phase SEO Optimization Suite                     ║
╚${'═'.repeat(68)}╝
`);

log('Starting SEO optimization process...');
log(`Total phases to execute: ${PHASES.length}`);

const results = [];
let startTime = Date.now();

for (let i = 0; i < PHASES.length; i++) {
  const success = runPhase(PHASES[i], i + 1);
  results.push(success);
  
  if (!success) {
    log(`\n⚠️  Phase ${i + 1} failed. Continuing with next phase...`);
  }
}

const duration = ((Date.now() - startTime) / 1000).toFixed(2);
const summary = generateSummary(results);

console.log(summary);
log(summary);

log(`\nTotal execution time: ${duration} seconds`);
log('SEO optimization process completed!');

console.log(`\n📝 Full log saved to: ${LOG_FILE}`);
