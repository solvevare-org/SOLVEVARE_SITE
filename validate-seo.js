/**
 * validate-seo.js
 * SEO Validation & Testing Utility
 * 
 * Validates:
 * 1. Meta tags presence and length
 * 2. Heading hierarchy
 * 3. Image alt text
 * 4. Internal links validity
 * 5. Schema markup validity
 * 6. Mobile responsiveness meta tags
 * 7. Performance metrics
 */

const fs = require('fs');
const path = require('path');

const PAGES = [
  'index.html', 'about.html', 'services.html',
  'service-web-development.html', 'service-app-development.html',
  'service-custom-software.html', 'service-cloud-devops.html',
  'service-ux-design.html', 'service-database.html',
  'service-automation.html', 'service-desktop-apps.html',
  'service-networking.html', 'portfolio.html', 'contact.html',
  'blog.html', 'industries.html', 'technologies.html',
  'privacy-policy.html', 'terms-of-service.html', 'location.html', '404.html'
];

class SEOValidator {
  constructor() {
    this.issues = [];
    this.warnings = [];
    this.stats = {
      totalPages: 0,
      pagesWithIssues: 0,
      totalIssues: 0,
      totalWarnings: 0
    };
  }

  validatePage(page, html) {
    const pageIssues = [];
    const pageWarnings = [];

    // 1. Check meta title
    const titleMatch = html.match(/<title>([^<]+)<\/title>/);
    if (!titleMatch) {
      pageIssues.push('Missing <title> tag');
    } else if (titleMatch[1].length < 30) {
      pageWarnings.push(`Title too short (${titleMatch[1].length} chars, target 50-60)`);
    } else if (titleMatch[1].length > 60) {
      pageWarnings.push(`Title too long (${titleMatch[1].length} chars, target 50-60)`);
    }

    // 2. Check meta description
    const descMatch = html.match(/name="description"\s+content="([^"]*)"/);
    if (!descMatch) {
      pageIssues.push('Missing meta description');
    } else if (descMatch[1].length < 120) {
      pageWarnings.push(`Description too short (${descMatch[1].length} chars, target 150-160)`);
    } else if (descMatch[1].length > 160) {
      pageWarnings.push(`Description too long (${descMatch[1].length} chars, target 150-160)`);
    }

    // 3. Check viewport meta tag
    if (!html.includes('name="viewport"')) {
      pageIssues.push('Missing viewport meta tag (mobile responsiveness)');
    }

    // 4. Check H1 count
    const h1Count = (html.match(/<h1[^>]*>/g) || []).length;
    if (h1Count === 0) {
      pageIssues.push('Missing H1 tag');
    } else if (h1Count > 1) {
      pageIssues.push(`Multiple H1 tags found (${h1Count}), should be 1`);
    }

    // 5. Check heading hierarchy
    const headings = html.match(/<h[1-6][^>]*>/g) || [];
    if (headings.length > 0) {
      const firstHeading = headings[0].match(/h([1-6])/)[1];
      if (firstHeading !== '1') {
        pageWarnings.push(`First heading is H${firstHeading}, should be H1`);
      }
    }

    // 6. Check images with alt text
    const images = html.match(/<img[^>]*>/g) || [];
    const imagesWithoutAlt = images.filter(img => !img.includes('alt=')).length;
    if (imagesWithoutAlt > 0) {
      pageWarnings.push(`${imagesWithoutAlt} images missing alt text`);
    }

    // 7. Check canonical tag
    if (!html.includes('rel="canonical"')) {
      pageWarnings.push('Missing canonical tag');
    }

    // 8. Check schema markup
    const schemaCount = (html.match(/"@type":/g) || []).length;
    if (schemaCount === 0) {
      pageWarnings.push('No schema markup found');
    }

    // 9. Check internal links
    const internalLinks = html.match(/href="([^"]*\.html)"/g) || [];
    const brokenLinks = internalLinks.filter(link => {
      const href = link.match(/href="([^"]*)"/)[1];
      return !PAGES.includes(href) && href !== '#';
    });
    if (brokenLinks.length > 0) {
      pageWarnings.push(`${brokenLinks.length} potentially broken internal links`);
    }

    // 10. Check for generic alt text
    const genericAlt = images.filter(img => {
      const altMatch = img.match(/alt="([^"]*)"/);
      return altMatch && /^(image|photo|picture|screenshot|logo|icon)$/i.test(altMatch[1]);
    }).length;
    if (genericAlt > 0) {
      pageWarnings.push(`${genericAlt} images with generic alt text`);
    }

    // 11. Check for lazy loading
    const imagesWithoutLazy = images.filter(img => !img.includes('loading=')).length;
    if (imagesWithoutLazy > 0) {
      pageWarnings.push(`${imagesWithoutLazy} images without lazy loading`);
    }

    // 12. Check for Open Graph tags
    if (!html.includes('property="og:title"')) {
      pageWarnings.push('Missing Open Graph tags');
    }

    // 13. Check for Twitter Card tags
    if (!html.includes('name="twitter:card"')) {
      pageWarnings.push('Missing Twitter Card tags');
    }

    // 14. Check page size
    const pageSize = html.length / 1024; // KB
    if (pageSize > 500) {
      pageWarnings.push(`Large page size (${pageSize.toFixed(1)} KB, target < 500 KB)`);
    }

    return { issues: pageIssues, warnings: pageWarnings };
  }

  validateAll() {
    console.log(`\n${'='.repeat(70)}`);
    console.log('🔍 SEO VALIDATION REPORT');
    console.log(`${'='.repeat(70)}\n`);

    for (const page of PAGES) {
      if (!fs.existsSync(page)) {
        console.log(`⏭️  ${page} - NOT FOUND\n`);
        continue;
      }

      const html = fs.readFileSync(page, 'utf8');
      const { issues, warnings } = this.validatePage(page, html);

      this.stats.totalPages++;
      if (issues.length > 0 || warnings.length > 0) {
        this.stats.pagesWithIssues++;
      }
      this.stats.totalIssues += issues.length;
      this.stats.totalWarnings += warnings.length;

      if (issues.length === 0 && warnings.length === 0) {
        console.log(`✅ ${page} - No issues found`);
      } else {
        console.log(`📄 ${page}`);
        if (issues.length > 0) {
          console.log(`   ❌ Issues (${issues.length}):`);
          issues.forEach(issue => console.log(`      • ${issue}`));
        }
        if (warnings.length > 0) {
          console.log(`   ⚠️  Warnings (${warnings.length}):`);
          warnings.forEach(warning => console.log(`      • ${warning}`));
        }
      }
      console.log();
    }

    this.printSummary();
  }

  printSummary() {
    console.log(`${'='.repeat(70)}`);
    console.log('📊 VALIDATION SUMMARY');
    console.log(`${'='.repeat(70)}\n`);

    console.log(`Total Pages Checked: ${this.stats.totalPages}`);
    console.log(`Pages with Issues: ${this.stats.pagesWithIssues}`);
    console.log(`Total Issues: ${this.stats.totalIssues}`);
    console.log(`Total Warnings: ${this.stats.totalWarnings}`);

    const healthScore = Math.max(0, 100 - (this.stats.totalIssues * 10 + this.stats.totalWarnings * 2));
    console.log(`\nSEO Health Score: ${healthScore}/100`);

    if (healthScore >= 90) {
      console.log('Status: 🟢 Excellent');
    } else if (healthScore >= 70) {
      console.log('Status: 🟡 Good');
    } else if (healthScore >= 50) {
      console.log('Status: 🟠 Fair');
    } else {
      console.log('Status: 🔴 Poor');
    }

    console.log(`\n${'='.repeat(70)}\n`);
  }

  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      stats: this.stats,
      recommendations: this.getRecommendations()
    };

    fs.writeFileSync('seo-validation-report.json', JSON.stringify(report, null, 2), 'utf8');
    console.log('📄 Detailed report saved to: seo-validation-report.json\n');
  }

  getRecommendations() {
    const recommendations = [];

    if (this.stats.totalIssues > 0) {
      recommendations.push('Fix all critical issues before submitting to search engines');
    }

    if (this.stats.totalWarnings > 5) {
      recommendations.push('Address warnings to improve SEO performance');
    }

    recommendations.push('Submit sitemap.xml to Google Search Console');
    recommendations.push('Validate schema markup with Schema.org validator');
    recommendations.push('Test mobile responsiveness with Google Mobile-Friendly Test');
    recommendations.push('Monitor Core Web Vitals with Google PageSpeed Insights');
    recommendations.push('Build high-quality backlinks to improve domain authority');
    recommendations.push('Create fresh content regularly to maintain rankings');

    return recommendations;
  }
}

// Run validation
const validator = new SEOValidator();
validator.validateAll();
validator.generateReport();

console.log('✅ Validation complete!');
