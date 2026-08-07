/**
 * phase1-seo-fix.js
 * Phase 1: Schema & Technical SEO
 * 
 * Fixes:
 * 1. Add FAQPage schema to pages with FAQ sections
 * 2. Optimize meta titles (power words + keywords)
 * 3. Optimize meta descriptions (CTAs + benefits)
 * 4. Fix heading hierarchy (single H1, logical H2/H3)
 * 5. Enhance alt text (descriptive, keyword-rich)
 * 6. Add image titles
 */

const fs = require('fs');
const path = require('path');

const CORE_PAGES = {
  'index.html': {
    title: 'Solvevare | Custom Software Development & Digital Transformation Services',
    description: 'Transform your business with custom software development, web apps, cloud solutions & digital transformation. Expert team serving 200+ clients. Get started today.',
    hasFAQ: true,
    keywords: 'software development, web development, app development, cloud solutions, digital transformation'
  },
  'about.html': {
    title: 'About Solvevare | Expert Software Development Team',
    description: 'Meet the Solvevare team. 10+ years of experience delivering custom software solutions. Learn our mission, values & expertise. Contact us today.',
    hasFAQ: false,
    keywords: 'about solvevare, software development team, expertise, experience'
  },
  'services.html': {
    title: 'Software Development Services | Web, Mobile, Cloud & Custom Solutions',
    description: 'Explore our software development services: web development, mobile apps, cloud solutions, custom software & more. Find the right solution for your business.',
    hasFAQ: true,
    keywords: 'software development services, web development, app development, cloud services'
  },
  'service-web-development.html': {
    title: 'Web Development Services | Custom Web Apps & Responsive Websites',
    description: 'Professional web development services. Custom web apps, responsive websites, e-commerce platforms & more. Scalable, secure & high-performance solutions.',
    hasFAQ: true,
    keywords: 'web development, web apps, responsive websites, e-commerce, web design'
  },
  'service-app-development.html': {
    title: 'Mobile App Development | iOS, Android & Cross-Platform Apps',
    description: 'Expert mobile app development for iOS, Android & cross-platform. Native performance, intuitive UX & secure architecture. Start your app project today.',
    hasFAQ: true,
    keywords: 'mobile app development, iOS development, Android development, cross-platform apps'
  },
  'service-custom-software.html': {
    title: 'Custom Software Development | Enterprise Solutions & Integrations',
    description: 'Custom software development tailored to your business. Enterprise solutions, system integrations, automation & more. Scalable & maintainable code.',
    hasFAQ: true,
    keywords: 'custom software development, enterprise software, system integration, business automation'
  },
  'service-cloud-devops.html': {
    title: 'Cloud & DevOps Services | AWS, Azure, GCP & Infrastructure',
    description: 'Cloud architecture, migration & DevOps services. AWS, Azure, GCP expertise. CI/CD pipelines, containerization & cost optimization. Scale with confidence.',
    hasFAQ: true,
    keywords: 'cloud services, DevOps, AWS, Azure, GCP, cloud migration, CI/CD'
  },
  'service-ux-design.html': {
    title: 'UX/UI Design Services | User-Centered Digital Experiences',
    description: 'Professional UX/UI design services. User research, wireframes, prototypes & intuitive interfaces. Create products users love. Start your design project.',
    hasFAQ: true,
    keywords: 'UX design, UI design, user experience, interface design, product design'
  },
  'service-database.html': {
    title: 'Database Development & Optimization | SQL, NoSQL & Data Engineering',
    description: 'Database design, optimization & data engineering. SQL, NoSQL, data warehousing & analytics. Secure, scalable & high-performance databases.',
    hasFAQ: true,
    keywords: 'database development, database optimization, SQL, NoSQL, data engineering'
  },
  'service-automation.html': {
    title: 'Business Automation & Integration Services | Workflow Optimization',
    description: 'Automate workflows, integrate systems & optimize processes. RPA, API integrations, workflow automation & more. Increase efficiency & reduce costs.',
    hasFAQ: true,
    keywords: 'business automation, workflow automation, system integration, RPA, process automation'
  },
  'service-desktop-apps.html': {
    title: 'Desktop Application Development | Windows, macOS & Cross-Platform',
    description: 'Desktop application development for Windows, macOS & Linux. Native performance, rich features & seamless integration. Build powerful desktop apps.',
    hasFAQ: true,
    keywords: 'desktop application development, Windows apps, macOS apps, cross-platform desktop'
  },
  'service-networking.html': {
    title: 'Networking & Infrastructure Services | Secure Network Architecture',
    description: 'Network design, infrastructure management & security. Secure architecture, system administration & IT infrastructure. Build reliable networks.',
    hasFAQ: true,
    keywords: 'networking services, network infrastructure, network security, system administration'
  },
  'portfolio.html': {
    title: 'Portfolio | Case Studies & Successful Projects | Solvevare',
    description: 'View our portfolio of successful projects. Case studies, client results & proven expertise. See how we transform businesses with technology.',
    hasFAQ: false,
    keywords: 'portfolio, case studies, projects, client work, success stories'
  },
  'contact.html': {
    title: 'Contact Solvevare | Get Your Project Started Today',
    description: 'Ready to start your project? Contact Solvevare today. Phone, email & office locations. Let\'s discuss your software development needs.',
    hasFAQ: true,
    keywords: 'contact solvevare, get in touch, software development inquiry'
  },
  'blog.html': {
    title: 'Blog | Software Development Insights & Industry News',
    description: 'Read our blog for software development insights, best practices & industry news. Stay updated with latest trends in technology.',
    hasFAQ: false,
    keywords: 'blog, software development, technology insights, industry news'
  },
  'industries.html': {
    title: 'Industry Solutions | Healthcare, Finance, E-Commerce & More',
    description: 'Industry-specific software solutions. Healthcare, finance, e-commerce, logistics & more. Tailored solutions for your industry.',
    hasFAQ: true,
    keywords: 'industry solutions, healthcare software, finance software, e-commerce solutions'
  },
  'technologies.html': {
    title: 'Technology Stack | React, Node.js, AWS, Azure & More',
    description: 'Explore our technology expertise. React, Node.js, Python, AWS, Azure, GCP & more. Modern tech stack for scalable solutions.',
    hasFAQ: false,
    keywords: 'technology stack, React, Node.js, Python, AWS, Azure, GCP'
  },
  'privacy-policy.html': {
    title: 'Privacy Policy | Data Protection & Privacy | Solvevare',
    description: 'Read Solvevare\'s privacy policy. Learn how we protect your data and respect your privacy. Your information is secure with us.',
    hasFAQ: false,
    keywords: 'privacy policy, data protection, privacy'
  },
  'terms-of-service.html': {
    title: 'Terms of Service | Legal Terms & Conditions | Solvevare',
    description: 'Read Solvevare\'s terms of service. Understand the legal terms and conditions for using our services. Fair, transparent & clear.',
    hasFAQ: false,
    keywords: 'terms of service, legal terms, conditions'
  },
  '404.html': {
    title: '404 - Page Not Found | Solvevare',
    description: 'The page you\'re looking for doesn\'t exist. Return to homepage or contact us for help. We\'re here to assist.',
    hasFAQ: false,
    keywords: '404, page not found, error'
  },
  'location.html': {
    title: 'Locations | Solvevare Serves Across USA & Globally',
    description: 'Find Solvevare locations across USA. Software development services available nationwide. Contact your local office today.',
    hasFAQ: false,
    keywords: 'locations, solvevare offices, software development services'
  }
};

// FAQPage schema template
function getFAQPageSchema(faqs) {
  return `
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      ${faqs.map(faq => `{
        "@type": "Question",
        "name": "${faq.q.replace(/"/g, '\\"')}",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "${faq.a.replace(/"/g, '\\"')}"
        }
      }`).join(',\n      ')}
    ]
  }
  </script>`;
}

// Extract FAQs from page
function extractFAQs(html) {
  const faqs = [];
  const faqRegex = /<button class="faq-question">\s*<span>([^<]+)<\/span>[\s\S]*?<div class="faq-answer">\s*([^<]+)\s*<\/div>/g;
  let match;
  while ((match = faqRegex.exec(html)) !== null) {
    faqs.push({ q: match[1].trim(), a: match[2].trim() });
  }
  return faqs;
}

// Fix meta title
function fixMetaTitle(html, newTitle) {
  return html.replace(/<title>[^<]+<\/title>/, `<title>${newTitle}</title>`);
}

// Fix meta description
function fixMetaDescription(html, newDesc) {
  return html.replace(
    /name="description"\s+content="[^"]*"/,
    `name="description" content="${newDesc}"`
  );
}

// Fix heading hierarchy - ensure single H1
function fixHeadingHierarchy(html) {
  // Count H1s
  const h1Count = (html.match(/<h1[^>]*>/g) || []).length;
  
  if (h1Count > 1) {
    // Convert extra H1s to H2
    let h1Found = false;
    html = html.replace(/<h1([^>]*)>/g, (match) => {
      if (!h1Found) {
        h1Found = true;
        return match;
      }
      return '<h2' + match.slice(2);
    });
    html = html.replace(/<\/h1>/g, (match, offset) => {
      if (html.lastIndexOf('<h1') < offset) {
        return '</h2>';
      }
      return match;
    });
  }
  
  return html;
}

// Enhance alt text
function enhanceAltText(html, keywords) {
  // Generic alt text patterns to enhance
  const patterns = [
    { old: /alt="image"/gi, new: `alt="Professional ${keywords.split(',')[0].trim()} solution"` },
    { old: /alt="screenshot"/gi, new: `alt="Software development interface screenshot"` },
    { old: /alt="logo"/gi, new: `alt="Solvevare logo"` },
    { old: /alt="team"/gi, new: `alt="Solvevare expert team members"` },
    { old: /alt="office"/gi, new: `alt="Solvevare office location"` },
    { old: /alt="project"/gi, new: `alt="Successful software project"` },
  ];
  
  for (const pattern of patterns) {
    html = html.replace(pattern.old, pattern.new);
  }
  
  return html;
}

// Add image titles
function addImageTitles(html) {
  // Add title attribute to images that don't have it
  html = html.replace(/<img([^>]*?)(?<!title="[^"]*")>/g, (match) => {
    if (match.includes('title=')) return match;
    const altMatch = match.match(/alt="([^"]*)"/);
    const alt = altMatch ? altMatch[1] : 'Image';
    return match.replace(/\/>/, ` title="${alt}" />`);
  });
  return html;
}

// Main processing
let fixed = 0;
let skipped = 0;

for (const [file, config] of Object.entries(CORE_PAGES)) {
  if (!fs.existsSync(file)) {
    console.log(`⏭️  ${file} - NOT FOUND`);
    skipped++;
    continue;
  }

  let html = fs.readFileSync(file, 'utf8');
  const original = html;

  // 1. Fix meta title
  html = fixMetaTitle(html, config.title);

  // 2. Fix meta description
  html = fixMetaDescription(html, config.description);

  // 3. Fix heading hierarchy
  html = fixHeadingHierarchy(html);

  // 4. Enhance alt text
  html = enhanceAltText(html, config.keywords);

  // 5. Add image titles
  html = addImageTitles(html);

  // 6. Add FAQPage schema if has FAQ
  if (config.hasFAQ) {
    const faqs = extractFAQs(html);
    if (faqs.length > 0 && !html.includes('"@type": "FAQPage"')) {
      const schema = getFAQPageSchema(faqs);
      html = html.replace('</head>', schema + '\n</head>');
    }
  }

  if (html !== original) {
    fs.writeFileSync(file, html, 'utf8');
    fixed++;
    console.log(`✅ ${file}`);
  } else {
    skipped++;
    console.log(`⏭️  ${file} - NO CHANGES`);
  }
}

console.log(`\n📊 PHASE 1 COMPLETE`);
console.log(`✅ Fixed: ${fixed} files`);
console.log(`⏭️  Skipped: ${skipped} files`);
console.log(`\n📝 Changes Made:`);
console.log(`  • Optimized meta titles (power words + keywords)`);
console.log(`  • Optimized meta descriptions (CTAs + benefits)`);
console.log(`  • Fixed heading hierarchy (single H1)`);
console.log(`  • Enhanced alt text (descriptive, keyword-rich)`);
console.log(`  • Added image titles`);
console.log(`  • Added FAQPage schema to FAQ pages`);
