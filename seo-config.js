/**
 * seo-config.js
 * Central Configuration File
 * 
 * Customize all SEO optimization parameters in one place
 */

module.exports = {
  // Site Configuration
  site: {
    name: 'Solvevare',
    url: 'https://solvevare.com',
    description: 'Custom software development and digital transformation services',
    logo: 'https://solvevare.com/images/logo.png',
    ogImage: 'https://solvevare.com/images/og-image.jpg',
    twitterImage: 'https://solvevare.com/images/twitter-image.jpg'
  },

  // Contact Information
  contact: {
    phone: '+1-XXX-XXX-XXXX',
    email: 'info@solvevare.com',
    address: {
      street: '123 Tech Street',
      city: 'San Francisco',
      state: 'CA',
      zip: '94105',
      country: 'US'
    }
  },

  // Social Media
  social: {
    linkedin: 'https://www.linkedin.com/company/solvevare',
    twitter: 'https://twitter.com/solvevare',
    facebook: 'https://www.facebook.com/solvevare',
    github: 'https://github.com/solvevare'
  },

  // SEO Settings
  seo: {
    // Meta tag lengths
    titleLength: { min: 50, max: 60 },
    descriptionLength: { min: 150, max: 160 },
    
    // Keyword density target
    keywordDensity: { min: 2, max: 3 },
    
    // Heading hierarchy
    maxH1PerPage: 1,
    
    // Image optimization
    lazyLoadImages: true,
    addImageTitles: true,
    
    // Internal linking
    minInternalLinks: 3,
    maxInternalLinks: 10,
    
    // Schema markup
    enableFAQSchema: true,
    enableBreadcrumbSchema: true,
    enableOrganizationSchema: true,
    enableLocalBusinessSchema: true,
    enableArticleSchema: true
  },

  // Performance Settings
  performance: {
    // Core Web Vitals targets
    lcp: 2500, // ms
    fid: 100,  // ms
    cls: 0.1,  // score
    ttfb: 600, // ms
    fcp: 1800, // ms
    
    // Page size limits
    maxPageSize: 500, // KB
    maxImageSize: 100, // KB
    
    // Caching
    enableGzip: true,
    enableBrowserCache: true,
    cacheExpiry: {
      images: '1y',
      css: '1month',
      js: '1month',
      html: '1week',
      fonts: '1year'
    }
  },

  // Sitemap Configuration
  sitemap: {
    changefreq: {
      homepage: 'weekly',
      services: 'weekly',
      portfolio: 'weekly',
      blog: 'daily',
      legal: 'yearly',
      default: 'monthly'
    },
    priority: {
      homepage: 1.0,
      services: 0.95,
      serviceDetail: 0.9,
      portfolio: 0.85,
      blog: 0.8,
      legal: 0.5,
      default: 0.7
    }
  },

  // Robots.txt Configuration
  robots: {
    allowAll: true,
    disallowPaths: ['/admin/', '/private/', '/*.json$'],
    crawlDelay: 1,
    userAgents: ['*', 'AdsBot-Google', 'Googlebot']
  },

  // Keyword Targets
  keywords: {
    'index.html': {
      primary: 'software development',
      secondary: ['web development', 'app development', 'cloud solutions', 'digital transformation'],
      lsi: ['custom software', 'software company', 'development services', 'technology solutions']
    },
    'about.html': {
      primary: 'about us',
      secondary: ['team', 'expertise', 'experience', 'company'],
      lsi: ['about company', 'company profile', 'team members', 'company information']
    },
    'services.html': {
      primary: 'software development services',
      secondary: ['web development', 'app development', 'cloud services', 'custom software'],
      lsi: ['development services', 'software solutions', 'tech services', 'IT services']
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
    'contact.html': {
      primary: 'contact us',
      secondary: ['get in touch', 'inquiry', 'support', 'help'],
      lsi: ['contact information', 'contact form', 'reach us', 'contact details']
    }
  },

  // Internal Linking Strategy
  internalLinks: {
    'index.html': [
      { text: 'Web Development', href: 'service-web-development.html' },
      { text: 'Mobile Apps', href: 'service-app-development.html' },
      { text: 'Cloud Solutions', href: 'service-cloud-devops.html' },
      { text: 'View Portfolio', href: 'portfolio.html' },
      { text: 'Contact Us', href: 'contact.html' }
    ],
    'services.html': [
      { text: 'Web Development', href: 'service-web-development.html' },
      { text: 'App Development', href: 'service-app-development.html' },
      { text: 'Custom Software', href: 'service-custom-software.html' },
      { text: 'Cloud & DevOps', href: 'service-cloud-devops.html' },
      { text: 'UX/UI Design', href: 'service-ux-design.html' },
      { text: 'Database Services', href: 'service-database.html' },
      { text: 'Business Automation', href: 'service-automation.html' },
      { text: 'Desktop Apps', href: 'service-desktop-apps.html' },
      { text: 'Networking', href: 'service-networking.html' }
    ],
    'portfolio.html': [
      { text: 'Our Services', href: 'services.html' },
      { text: 'Industries', href: 'industries.html' },
      { text: 'Technologies', href: 'technologies.html' },
      { text: 'Contact Us', href: 'contact.html' }
    ],
    'about.html': [
      { text: 'Our Services', href: 'services.html' },
      { text: 'Portfolio', href: 'portfolio.html' },
      { text: 'Industries', href: 'industries.html' },
      { text: 'Contact Us', href: 'contact.html' }
    ],
    'blog.html': [
      { text: 'Services', href: 'services.html' },
      { text: 'Portfolio', href: 'portfolio.html' },
      { text: 'Technologies', href: 'technologies.html' }
    ]
  },

  // Pages to Optimize
  pages: [
    'index.html',
    'about.html',
    'services.html',
    'service-web-development.html',
    'service-app-development.html',
    'service-custom-software.html',
    'service-cloud-devops.html',
    'service-ux-design.html',
    'service-database.html',
    'service-automation.html',
    'service-desktop-apps.html',
    'service-networking.html',
    'portfolio.html',
    'contact.html',
    'blog.html',
    'industries.html',
    'technologies.html',
    'privacy-policy.html',
    'terms-of-service.html',
    'location.html',
    '404.html'
  ],

  // Logging Configuration
  logging: {
    enabled: true,
    logFile: 'seo-optimization.log',
    verbose: true,
    timestamps: true
  },

  // Validation Rules
  validation: {
    checkMetaTags: true,
    checkHeadings: true,
    checkImages: true,
    checkLinks: true,
    checkSchema: true,
    checkMobileResponsive: true,
    checkPageSize: true,
    checkPerformance: true
  },

  // Backup Configuration
  backup: {
    enabled: true,
    backupDir: 'backup',
    timestamp: true,
    compress: false
  },

  // Advanced Settings
  advanced: {
    // Regex patterns for content matching
    patterns: {
      genericAlt: /^(image|photo|picture|screenshot|logo|icon)$/i,
      genericLink: /^(click here|read more|here)$/i,
      email: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
      phone: /\+?1?\s*\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})/g
    },
    
    // Content optimization
    minParagraphLength: 50,
    maxParagraphLength: 500,
    targetReadingLevel: 'high-school',
    
    // Link building
    minAnchorTextLength: 3,
    maxAnchorTextLength: 60,
    preferDescriptiveAnchors: true
  }
};
