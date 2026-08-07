/**
 * monitor-seo.js
 * SEO Monitoring & Analytics Dashboard
 * 
 * Tracks:
 * 1. SEO metrics and scores
 * 2. Performance metrics
 * 3. Content metrics
 * 4. Link metrics
 * 5. Generates analytics reports
 */

const fs = require('fs');
const path = require('path');
const config = require('./seo-config.js');

class SEOMonitor {
  constructor() {
    this.metrics = {
      seo: {},
      performance: {},
      content: {},
      links: {},
      schema: {}
    };
    this.timestamp = new Date().toISOString();
  }

  analyzeAllPages() {
    console.log(`\n${'='.repeat(70)}`);
    console.log('📊 SEO MONITORING & ANALYTICS DASHBOARD');
    console.log(`${'='.repeat(70)}\n`);

    const results = [];

    for (const page of config.pages) {
      if (!fs.existsSync(page)) continue;

      const html = fs.readFileSync(page, 'utf8');
      const pageMetrics = this.analyzePage(page, html);
      results.push(pageMetrics);
    }

    this.generateDashboard(results);
    this.generateReport(results);
  }

  analyzePage(page, html) {
    const metrics = {
      page,
      seo: this.analyzeSEO(html),
      performance: this.analyzePerformance(html),
      content: this.analyzeContent(html),
      links: this.analyzeLinks(html),
      schema: this.analyzeSchema(html)
    };

    return metrics;
  }

  analyzeSEO(html) {
    const titleMatch = html.match(/<title>([^<]+)<\/title>/);
    const descMatch = html.match(/name="description"\s+content="([^"]*)"/);
    const h1Count = (html.match(/<h1[^>]*>/g) || []).length;
    const h2Count = (html.match(/<h2[^>]*>/g) || []).length;
    const h3Count = (html.match(/<h3[^>]*>/g) || []).length;
    const canonicalExists = html.includes('rel="canonical"');
    const viewportExists = html.includes('name="viewport"');

    const titleLength = titleMatch ? titleMatch[1].length : 0;
    const descLength = descMatch ? descMatch[1].length : 0;

    let seoScore = 0;
    if (titleLength >= 50 && titleLength <= 60) seoScore += 20;
    else if (titleLength > 0) seoScore += 10;

    if (descLength >= 150 && descLength <= 160) seoScore += 20;
    else if (descLength > 0) seoScore += 10;

    if (h1Count === 1) seoScore += 15;
    if (h2Count > 0) seoScore += 10;
    if (canonicalExists) seoScore += 15;
    if (viewportExists) seoScore += 10;

    return {
      score: Math.min(100, seoScore),
      title: { length: titleLength, optimal: titleLength >= 50 && titleLength <= 60 },
      description: { length: descLength, optimal: descLength >= 150 && descLength <= 160 },
      h1: h1Count,
      h2: h2Count,
      h3: h3Count,
      canonical: canonicalExists,
      viewport: viewportExists
    };
  }

  analyzePerformance(html) {
    const pageSize = html.length / 1024; // KB
    const imageCount = (html.match(/<img[^>]*>/g) || []).length;
    const lazyLoadCount = (html.match(/loading="lazy"/g) || []).length;
    const scriptCount = (html.match(/<script[^>]*>/g) || []).length;
    const styleCount = (html.match(/<style[^>]*>/g) || []).length;
    const linkCount = (html.match(/<link[^>]*>/g) || []).length;

    let perfScore = 100;
    if (pageSize > 500) perfScore -= 20;
    if (pageSize > 1000) perfScore -= 20;
    if (lazyLoadCount < imageCount * 0.5) perfScore -= 10;
    if (scriptCount > 5) perfScore -= 10;

    return {
      score: Math.max(0, perfScore),
      pageSize: parseFloat(pageSize.toFixed(2)),
      images: imageCount,
      lazyLoaded: lazyLoadCount,
      scripts: scriptCount,
      styles: styleCount,
      links: linkCount
    };
  }

  analyzeContent(html) {
    const text = html.replace(/<[^>]*>/g, ' ').trim();
    const words = text.split(/\s+/).filter(w => w.length > 0);
    const paragraphs = (html.match(/<p[^>]*>/g) || []).length;
    const lists = (html.match(/<ul[^>]*>|<ol[^>]*>/g) || []).length;
    const images = (html.match(/<img[^>]*>/g) || []).length;

    const wordCount = words.length;
    const avgWordsPerParagraph = paragraphs > 0 ? Math.round(wordCount / paragraphs) : 0;

    let contentScore = 0;
    if (wordCount >= 300) contentScore += 20;
    if (wordCount >= 500) contentScore += 10;
    if (paragraphs >= 3) contentScore += 15;
    if (lists > 0) contentScore += 10;
    if (images > 0) contentScore += 15;
    if (avgWordsPerParagraph >= 50 && avgWordsPerParagraph <= 150) contentScore += 15;

    return {
      score: Math.min(100, contentScore),
      wordCount,
      paragraphs,
      lists,
      images,
      avgWordsPerParagraph
    };
  }

  analyzeLinks(html) {
    const internalLinks = (html.match(/href="([^"]*\.html)"/g) || []).length;
    const externalLinks = (html.match(/href="https?:\/\/[^"]*"/g) || []).length;
    const anchorLinks = (html.match(/href="#[^"]*"/g) || []).length;
    const noFollowLinks = (html.match(/rel="nofollow"/g) || []).length;

    let linkScore = 0;
    if (internalLinks >= 3) linkScore += 20;
    if (internalLinks >= 5) linkScore += 10;
    if (externalLinks > 0) linkScore += 15;
    if (anchorLinks > 0) linkScore += 10;

    return {
      score: Math.min(100, linkScore),
      internal: internalLinks,
      external: externalLinks,
      anchors: anchorLinks,
      noFollow: noFollowLinks
    };
  }

  analyzeSchema(html) {
    const schemaTypes = new Set();
    const schemaMatches = html.match(/"@type":\s*"([^"]+)"/g) || [];
    
    schemaMatches.forEach(match => {
      const type = match.match(/"@type":\s*"([^"]+)"/)[1];
      schemaTypes.add(type);
    });

    let schemaScore = 0;
    if (schemaTypes.has('FAQPage')) schemaScore += 15;
    if (schemaTypes.has('BreadcrumbList')) schemaScore += 15;
    if (schemaTypes.has('Organization')) schemaScore += 15;
    if (schemaTypes.has('LocalBusiness')) schemaScore += 15;
    if (schemaTypes.has('Article')) schemaScore += 10;
    if (schemaTypes.size > 0) schemaScore += 10;

    return {
      score: Math.min(100, schemaScore),
      types: Array.from(schemaTypes),
      count: schemaTypes.size
    };
  }

  generateDashboard(results) {
    console.log('📈 OVERALL METRICS\n');

    const avgSEO = (results.reduce((sum, r) => sum + r.seo.score, 0) / results.length).toFixed(1);
    const avgPerf = (results.reduce((sum, r) => sum + r.performance.score, 0) / results.length).toFixed(1);
    const avgContent = (results.reduce((sum, r) => sum + r.content.score, 0) / results.length).toFixed(1);
    const avgLinks = (results.reduce((sum, r) => sum + r.links.score, 0) / results.length).toFixed(1);
    const avgSchema = (results.reduce((sum, r) => sum + r.schema.score, 0) / results.length).toFixed(1);

    const overallScore = ((parseFloat(avgSEO) + parseFloat(avgPerf) + parseFloat(avgContent) + parseFloat(avgLinks) + parseFloat(avgSchema)) / 5).toFixed(1);

    console.log(`Overall SEO Score: ${overallScore}/100 ${this.getScoreEmoji(overallScore)}`);
    console.log(`├─ SEO Score: ${avgSEO}/100`);
    console.log(`├─ Performance Score: ${avgPerf}/100`);
    console.log(`├─ Content Score: ${avgContent}/100`);
    console.log(`├─ Links Score: ${avgLinks}/100`);
    console.log(`└─ Schema Score: ${avgSchema}/100\n`);

    console.log('📊 TOP PERFORMERS\n');
    const topSEO = results.sort((a, b) => b.seo.score - a.seo.score)[0];
    const topPerf = results.sort((a, b) => b.performance.score - a.performance.score)[0];
    const topContent = results.sort((a, b) => b.content.score - a.content.score)[0];

    console.log(`Best SEO: ${topSEO.page} (${topSEO.seo.score}/100)`);
    console.log(`Best Performance: ${topPerf.page} (${topPerf.performance.score}/100)`);
    console.log(`Best Content: ${topContent.page} (${topContent.content.score}/100)\n`);

    console.log('⚠️  AREAS FOR IMPROVEMENT\n');
    const needsWork = results.filter(r => r.seo.score < 70);
    if (needsWork.length > 0) {
      console.log(`Pages with SEO score < 70: ${needsWork.length}`);
      needsWork.slice(0, 5).forEach(r => {
        console.log(`  • ${r.page}: ${r.seo.score}/100`);
      });
    }
    console.log();
  }

  generateReport(results) {
    const report = {
      timestamp: this.timestamp,
      summary: {
        totalPages: results.length,
        avgSEOScore: (results.reduce((sum, r) => sum + r.seo.score, 0) / results.length).toFixed(1),
        avgPerformanceScore: (results.reduce((sum, r) => sum + r.performance.score, 0) / results.length).toFixed(1),
        avgContentScore: (results.reduce((sum, r) => sum + r.content.score, 0) / results.length).toFixed(1),
        avgLinksScore: (results.reduce((sum, r) => sum + r.links.score, 0) / results.length).toFixed(1),
        avgSchemaScore: (results.reduce((sum, r) => sum + r.schema.score, 0) / results.length).toFixed(1)
      },
      pages: results,
      recommendations: this.generateRecommendations(results)
    };

    fs.writeFileSync('seo-monitoring-report.json', JSON.stringify(report, null, 2), 'utf8');
    console.log('📄 Detailed report saved to: seo-monitoring-report.json\n');
  }

  generateRecommendations(results) {
    const recommendations = [];

    // SEO recommendations
    const lowSEO = results.filter(r => r.seo.score < 70);
    if (lowSEO.length > 0) {
      recommendations.push({
        category: 'SEO',
        priority: 'High',
        message: `${lowSEO.length} pages have SEO score < 70. Review meta tags and heading hierarchy.`,
        pages: lowSEO.map(r => r.page)
      });
    }

    // Performance recommendations
    const lowPerf = results.filter(r => r.performance.score < 70);
    if (lowPerf.length > 0) {
      recommendations.push({
        category: 'Performance',
        priority: 'High',
        message: `${lowPerf.length} pages have performance score < 70. Optimize images and reduce page size.`,
        pages: lowPerf.map(r => r.page)
      });
    }

    // Content recommendations
    const lowContent = results.filter(r => r.content.score < 70);
    if (lowContent.length > 0) {
      recommendations.push({
        category: 'Content',
        priority: 'Medium',
        message: `${lowContent.length} pages have content score < 70. Add more content and structure.`,
        pages: lowContent.map(r => r.page)
      });
    }

    // Schema recommendations
    const noSchema = results.filter(r => r.schema.count === 0);
    if (noSchema.length > 0) {
      recommendations.push({
        category: 'Schema Markup',
        priority: 'Medium',
        message: `${noSchema.length} pages have no schema markup. Add structured data.`,
        pages: noSchema.map(r => r.page)
      });
    }

    // Link recommendations
    const fewLinks = results.filter(r => r.links.internal < 3);
    if (fewLinks.length > 0) {
      recommendations.push({
        category: 'Internal Linking',
        priority: 'Low',
        message: `${fewLinks.length} pages have < 3 internal links. Improve internal linking strategy.`,
        pages: fewLinks.map(r => r.page)
      });
    }

    return recommendations;
  }

  getScoreEmoji(score) {
    if (score >= 90) return '🟢';
    if (score >= 70) return '🟡';
    if (score >= 50) return '🟠';
    return '🔴';
  }

  printDetailedMetrics(results) {
    console.log(`\n${'='.repeat(70)}`);
    console.log('📋 DETAILED PAGE METRICS');
    console.log(`${'='.repeat(70)}\n`);

    for (const result of results.slice(0, 10)) {
      console.log(`📄 ${result.page}`);
      console.log(`   SEO: ${result.seo.score}/100 ${this.getScoreEmoji(result.seo.score)}`);
      console.log(`   ├─ Title: ${result.seo.title.length} chars ${result.seo.title.optimal ? '✅' : '⚠️'}`);
      console.log(`   ├─ Description: ${result.seo.description.length} chars ${result.seo.description.optimal ? '✅' : '⚠️'}`);
      console.log(`   ├─ H1: ${result.seo.h1} ${result.seo.h1 === 1 ? '✅' : '⚠️'}`);
      console.log(`   └─ Canonical: ${result.seo.canonical ? '✅' : '❌'}`);
      
      console.log(`   Performance: ${result.performance.score}/100 ${this.getScoreEmoji(result.performance.score)}`);
      console.log(`   ├─ Page Size: ${result.performance.pageSize} KB`);
      console.log(`   ├─ Images: ${result.performance.images}`);
      console.log(`   └─ Lazy Loaded: ${result.performance.lazyLoaded}/${result.performance.images}`);
      
      console.log(`   Content: ${result.content.score}/100 ${this.getScoreEmoji(result.content.score)}`);
      console.log(`   ├─ Words: ${result.content.wordCount}`);
      console.log(`   ├─ Paragraphs: ${result.content.paragraphs}`);
      console.log(`   └─ Images: ${result.content.images}`);
      
      console.log(`   Links: ${result.links.score}/100`);
      console.log(`   ├─ Internal: ${result.links.internal}`);
      console.log(`   └─ External: ${result.links.external}`);
      
      console.log(`   Schema: ${result.schema.score}/100`);
      console.log(`   └─ Types: ${result.schema.types.join(', ') || 'None'}\n`);
    }
  }
}

// Run monitoring
const monitor = new SEOMonitor();
monitor.analyzeAllPages();
monitor.printDetailedMetrics(
  config.pages
    .filter(page => fs.existsSync(page))
    .map(page => {
      const html = fs.readFileSync(page, 'utf8');
      return monitor.analyzePage(page, html);
    })
);

console.log(`${'='.repeat(70)}`);
console.log('✅ Monitoring complete!');
console.log(`${'='.repeat(70)}\n`);
