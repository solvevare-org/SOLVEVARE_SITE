const projectsData = {
  'ticketing-system': {
    title: 'Ticketing System',
    category: 'Web Application',
    description: 'A comprehensive web application for managing support and service tickets efficiently.',
    client: 'Internal Project',
    date: 'December 2024',
    duration: '3 months',
    role: 'Full Stack Development',
    website: 'https://solvevareticketingsystem.vercel.app',
    heroImage: 'assets/Screenshot 2025-12-15 203923.png',
    gradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3))',
    fullDescription: 'A modern ticketing system designed to streamline support operations and enhance customer service efficiency. The platform provides comprehensive ticket management, real-time analytics, and automated workflows.',
    challenges: [
      'Real-time ticket updates and notifications',
      'Complex role-based access control',
      'Integration with multiple communication channels',
      'Scalable architecture for high-volume operations'
    ],
    solutions: [
      'Implemented WebSocket for real-time updates',
      'Built granular permission system with role hierarchy',
      'Created unified API for email, chat, and phone integrations',
      'Designed microservices architecture with load balancing'
    ],
    results: [
      { label: 'Response Time', value: '40% Faster' },
      { label: 'Customer Satisfaction', value: '95%' },
      { label: 'Tickets Resolved', value: '10K+' },
      { label: 'Active Users', value: '500+' }
    ],
    technologies: ['React', 'Node.js', 'MongoDB', 'WebSocket', 'Redis', 'AWS'],
    gallery: [
      'assets/screencapture-solvevareticketingsystem-vercel-app-dashboard-2025-12-15-20_55_33.png',
      'assets/screencapture-solvevareticketingsystem-vercel-app-tickets-2025-12-15-20_55_54.png',
      'assets/screencapture-solvevareticketingsystem-vercel-app-analytics-2025-12-15-20_58_07.png',
      'assets/screencapture-solvevareticketingsystem-vercel-app-finance-2025-12-15-20_58_39.png'
    ]
  },
  'norightway': {
    title: 'NORIGHTWAY',
    category: 'E-Commerce',
    description: 'A modern e-commerce platform showcasing unconventional thinking through minimalist design.',
    client: 'NORIGHTWAY Brand',
    date: 'November 2024',
    duration: '2 months',
    role: 'Frontend & UI/UX',
    website: 'https://norightway.info',
    heroImage: 'assets/Screenshot 2025-12-15 213248.png',
    gradient: 'linear-gradient(135deg, rgba(6, 182, 212, 0.3), rgba(59, 130, 246, 0.3))',
    fullDescription: 'An innovative e-commerce platform that challenges conventional design patterns. Built with a focus on user experience and brand identity, featuring seamless shopping experience and modern aesthetics.',
    challenges: [
      'Creating unique brand identity in crowded market',
      'Balancing minimalism with functionality',
      'Optimizing performance for image-heavy content',
      'Implementing smooth animations without performance loss'
    ],
    solutions: [
      'Developed distinctive visual language with custom components',
      'Used progressive disclosure for complex features',
      'Implemented lazy loading and image optimization',
      'Utilized CSS transforms and GPU acceleration'
    ],
    results: [
      { label: 'Page Load Time', value: '1.2s' },
      { label: 'Conversion Rate', value: '3.8%' },
      { label: 'Mobile Traffic', value: '65%' },
      { label: 'Bounce Rate', value: '28%' }
    ],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe', 'Vercel'],
    gallery: [
      'assets/Screenshot 2025-12-15 213248.png',
      'assets/Screenshot 2025-12-15 215615.png',
      'assets/Screenshot 2025-12-15 215823.png',
      'assets/Screenshot 2025-12-15 215842.png',
      'assets/Screenshot 2025-12-15 215916.png',
      'assets/Screenshot 2025-12-15 215957.png',
      'assets/Screenshot 2025-12-15 220024.png',
      'assets/screencapture-norightway-info-2025-12-15-22_00_52.png'
    ]
  },
  'chem-publishers': {
    title: 'Chem Publishers',
    category: 'Publishing',
    description: 'A digital publishing platform for chemistry and scientific research content.',
    client: 'Chem Publishers Ltd',
    date: 'October 2024',
    duration: '4 months',
    role: 'Full Stack Development',
    website: '#',
    heroImage: 'assets/Screenshot 2025-12-15 225523.png',
    gradient: 'linear-gradient(135deg, rgba(168, 85, 247, 0.3), rgba(236, 72, 153, 0.3))',
    fullDescription: 'A comprehensive digital publishing platform designed for academic and scientific content. Features advanced search, citation management, and collaborative tools for researchers and publishers.',
    challenges: [
      'Complex document management system',
      'Advanced search with scientific notation',
      'Citation and reference management',
      'Multi-format content delivery (PDF, HTML, ePub)'
    ],
    solutions: [
      'Built custom CMS with version control',
      'Implemented Elasticsearch with custom analyzers',
      'Integrated citation standards (APA, MLA, Chicago)',
      'Created adaptive content rendering engine'
    ],
    results: [
      { label: 'Publications', value: '5000+' },
      { label: 'Active Researchers', value: '2000+' },
      { label: 'Search Accuracy', value: '98%' },
      { label: 'Download Speed', value: '3x Faster' }
    ],
    technologies: ['Django', 'PostgreSQL', 'Elasticsearch', 'React', 'Docker'],
    gallery: [
      'assets/Screenshot 2025-12-15 225523.png',
      'assets/Screenshot 2025-12-15 231159.png',
      'assets/Screenshot 2025-12-15 231217.png'
    ]
  },
  'jb-bespoke': {
    title: 'JB Bespoke Craft',
    category: 'Business Website',
    description: 'A handcrafted carpentry business showcase site for bespoke woodworking.',
    client: 'JB Bespoke Craft',
    date: 'September 2024',
    duration: '1.5 months',
    role: 'Web Design & Development',
    website: '#',
    heroImage: 'assets/Screenshot 2025-12-15 233204.png',
    gradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3))',
    fullDescription: 'A beautiful portfolio website showcasing custom woodworking and carpentry services. Features project galleries, service descriptions, and contact forms designed to attract high-end clients.',
    challenges: [
      'Showcasing craftsmanship through digital medium',
      'Creating elegant yet simple navigation',
      'Optimizing high-quality images',
      'Mobile-first responsive design'
    ],
    solutions: [
      'Implemented immersive image galleries with zoom',
      'Designed intuitive single-page layout',
      'Used WebP format with fallbacks',
      'Created fluid responsive grid system'
    ],
    results: [
      { label: 'Inquiries', value: '150% ↑' },
      { label: 'Page Views', value: '5K/month' },
      { label: 'Mobile Users', value: '70%' },
      { label: 'Avg. Session', value: '4.5 min' }
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'GSAP', 'Netlify'],
    gallery: [
      'assets/Screenshot 2025-12-15 233204.png',
      'assets/screencapture-jack-website-gamma-vercel-app-index-html-2025-12-15-23_19_01.png',
      'assets/screencapture-jack-website-gamma-vercel-app-services-html-2025-12-15-23_19_18.png'
    ]
  },
  'urgent-vet': {
    title: 'Urgent Vet Marketing',
    category: 'Marketing',
    description: 'Marketing website for emergency veterinary clinics to attract local clients.',
    client: 'Urgent Vet Clinics',
    date: 'August 2024',
    duration: '2 months',
    role: 'Marketing & Web Development',
    website: '#',
    heroImage: 'assets/Screenshot 2025-12-15 233700.png',
    gradient: 'linear-gradient(135deg, rgba(6, 182, 212, 0.3), rgba(59, 130, 246, 0.3))',
    fullDescription: 'A conversion-focused marketing website designed to help emergency veterinary clinics increase their local visibility and attract more clients during critical moments.',
    challenges: [
      'Local SEO optimization',
      'Emergency contact accessibility',
      'Trust building for new visitors',
      'Fast loading for mobile users'
    ],
    solutions: [
      'Implemented local schema markup and Google My Business integration',
      'Created prominent emergency contact buttons',
      'Added testimonials and credentials prominently',
      'Optimized for Core Web Vitals'
    ],
    results: [
      { label: 'Local Ranking', value: 'Top 3' },
      { label: 'Call Volume', value: '200% ↑' },
      { label: 'Page Speed', value: '95/100' },
      { label: 'Conversion Rate', value: '8.5%' }
    ],
    technologies: ['WordPress', 'PHP', 'SEO Tools', 'Google Analytics'],
    gallery: [
      'assets/Screenshot 2025-12-15 233700.png',
      'assets/Screenshot 2025-12-15 234109.png'
    ]
  },
  'hen-haus': {
    title: 'Hen Haus',
    category: 'Marketplace',
    description: 'Platform connecting homeowners with skilled local professionals.',
    client: 'Hen Haus Inc',
    date: 'July 2024',
    duration: '5 months',
    role: 'Platform Architecture',
    website: '#',
    heroImage: 'assets/Screenshot 2025-12-16 005831.png',
    gradient: 'linear-gradient(135deg, rgba(168, 85, 247, 0.3), rgba(236, 72, 153, 0.3))',
    fullDescription: 'A comprehensive marketplace platform that connects homeowners with verified local professionals for home improvement projects. Features include project posting, bidding system, and secure payments.',
    challenges: [
      'Two-sided marketplace complexity',
      'Trust and verification system',
      'Real-time bidding mechanism',
      'Secure payment processing'
    ],
    solutions: [
      'Built separate dashboards for homeowners and professionals',
      'Implemented multi-step verification with background checks',
      'Created real-time notification system for bids',
      'Integrated Stripe Connect for secure payments'
    ],
    results: [
      { label: 'Active Professionals', value: '1200+' },
      { label: 'Projects Completed', value: '3500+' },
      { label: 'Customer Rating', value: '4.8/5' },
      { label: 'Transaction Volume', value: '$2M+' }
    ],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Socket.io'],
    gallery: [
      'assets/Screenshot 2025-12-16 005831.png',
      'assets/Screenshot 2025-12-16 005853.png',
      'assets/Screenshot 2025-12-16 005905.png'
    ]
  },
  'fairway': {
    title: 'Fairway Multifamily',
    category: 'Real Estate',
    description: 'Real estate investment firm expanding quality affordable housing.',
    client: 'Fairway Multifamily',
    date: 'June 2024',
    duration: '3 months',
    role: 'Web Development',
    website: '#',
    heroImage: 'assets/Screenshot 2025-12-16 012240.png',
    gradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3))',
    fullDescription: 'A professional corporate website for a real estate investment firm focused on affordable housing. Features property listings, investment opportunities, and company information.',
    challenges: [
      'Professional corporate image',
      'Property showcase system',
      'Investor portal integration',
      'Compliance with real estate regulations'
    ],
    solutions: [
      'Designed sophisticated brand identity',
      'Built custom property management system',
      'Created secure investor dashboard',
      'Implemented legal compliance checks'
    ],
    results: [
      { label: 'Properties Listed', value: '50+' },
      { label: 'Investor Inquiries', value: '300% ↑' },
      { label: 'Site Traffic', value: '10K/month' },
      { label: 'Lead Quality', value: '85%' }
    ],
    technologies: ['Next.js', 'Sanity CMS', 'Tailwind', 'Vercel'],
    gallery: [
      'assets/Screenshot 2025-12-16 012240.png',
      'assets/Screenshot 2025-12-16 012337.png'
    ]
  },
  'leadsavvy': {
    title: 'LeadSavvy AI',
    category: 'AI Platform',
    description: 'AI-driven CRM platform with lead generation and email marketing.',
    client: 'LeadSavvy Inc',
    date: 'May 2024',
    duration: '6 months',
    role: 'Full Stack & AI Integration',
    website: '#',
    heroImage: 'assets/Screenshot 2025-12-16 013929.png',
    gradient: 'linear-gradient(135deg, rgba(6, 182, 212, 0.3), rgba(59, 130, 246, 0.3))',
    fullDescription: 'An intelligent CRM platform powered by AI that combines lead generation, email marketing automation, and landing page creation. Uses machine learning to optimize campaigns and predict customer behavior.',
    challenges: [
      'AI model integration and training',
      'Real-time lead scoring',
      'Email deliverability optimization',
      'Scalable infrastructure for AI processing'
    ],
    solutions: [
      'Integrated TensorFlow for predictive analytics',
      'Built real-time scoring engine with Redis',
      'Implemented SMTP optimization and warm-up',
      'Deployed on Kubernetes for auto-scaling'
    ],
    results: [
      { label: 'Lead Quality', value: '90%' },
      { label: 'Email Open Rate', value: '45%' },
      { label: 'Conversion Rate', value: '12%' },
      { label: 'Active Campaigns', value: '5000+' }
    ],
    technologies: ['Python', 'TensorFlow', 'React', 'PostgreSQL', 'Kubernetes'],
    gallery: [
      'assets/Screenshot 2025-12-16 013852.png',
      'assets/Screenshot 2025-12-16 013905.png',
      'assets/Screenshot 2025-12-16 013929.png'
    ]
  },
  'ims-ft': {
    title: 'IMS-FT',
    category: 'Management System',
    description: 'Inventory management system for tracking sales and financials.',
    client: 'Small Business Solutions',
    date: 'April 2024',
    duration: '4 months',
    role: 'Full Stack Development',
    website: 'https://ims-ft.vercel.app',
    heroImage: 'assets/screencapture-ims-ft-vercel-app-2025-12-17-01_32_55.png',
    gradient: 'linear-gradient(135deg, rgba(168, 85, 247, 0.3), rgba(236, 72, 153, 0.3))',
    fullDescription: 'A comprehensive inventory management system designed for small businesses. Features include stock tracking, sales management, financial reporting, and multi-location support.',
    challenges: [
      'Real-time inventory synchronization',
      'Complex financial calculations',
      'Multi-location management',
      'Offline functionality'
    ],
    solutions: [
      'Implemented event-driven architecture',
      'Built custom accounting engine',
      'Created centralized inventory with location tracking',
      'Added Progressive Web App capabilities'
    ],
    results: [
      { label: 'Inventory Accuracy', value: '99.5%' },
      { label: 'Time Saved', value: '15 hrs/week' },
      { label: 'Active Businesses', value: '200+' },
      { label: 'Transactions', value: '50K+' }
    ],
    technologies: ['React', 'Node.js', 'MongoDB', 'PWA', 'Chart.js'],
    gallery: [
      'assets/screencapture-ims-ft-vercel-app-2025-12-17-01_30_55.png',
      'assets/screencapture-ims-ft-vercel-app-2025-12-17-01_31_07.png',
      'assets/screencapture-ims-ft-vercel-app-2025-12-17-01_31_17.png',
      'assets/screencapture-ims-ft-vercel-app-2025-12-17-01_32_55.png'
    ]
  },
  'tradie-ladie': {
    title: 'Tradie-Ladie FT',
    category: 'Marketplace',
    description: 'Digital platform connecting homeowners with local tradies.',
    client: 'Tradie-Ladie',
    date: 'March 2024',
    duration: '4 months',
    role: 'Platform Development',
    website: 'https://tradie-ladie-ft.vercel.app',
    heroImage: 'assets/screencapture-tradie-ladie-ft-vercel-app-2025-12-17-01_39_48.png',
    gradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3))',
    fullDescription: 'A marketplace platform specifically designed for the Australian market, connecting homeowners with qualified tradies for various home improvement and maintenance projects.',
    challenges: [
      'Geographic service area matching',
      'Trade qualification verification',
      'Quote comparison system',
      'Review authenticity'
    ],
    solutions: [
      'Implemented geolocation-based matching',
      'Integrated with Australian trade licensing databases',
      'Built transparent quote comparison interface',
      'Added verified customer review system'
    ],
    results: [
      { label: 'Registered Tradies', value: '800+' },
      { label: 'Jobs Posted', value: '2000+' },
      { label: 'Match Rate', value: '92%' },
      { label: 'User Satisfaction', value: '4.7/5' }
    ],
    technologies: ['Vue.js', 'Laravel', 'MySQL', 'Google Maps API'],
    gallery: [
      'assets/screencapture-tradie-ladie-ft-vercel-app-2025-12-17-01_39_48.png'
    ]
  },
  'tech-effect': {
    title: 'The Tech Effect Podcast',
    category: 'Podcast',
    description: 'Modern podcast website showcasing technology-focused discussions.',
    client: 'Tech Effect Media',
    date: 'February 2024',
    duration: '2 months',
    role: 'Web Design & Development',
    website: 'https://the-tech-effect-podcast-steel.vercel.app',
    heroImage: 'assets/screencapture-the-tech-effect-podcast-steel-vercel-app-2025-12-17-01_44_24.png',
    gradient: 'linear-gradient(135deg, rgba(6, 182, 212, 0.3), rgba(59, 130, 246, 0.3))',
    fullDescription: 'A modern and engaging podcast website featuring episode listings, host profiles, and integrated audio player. Designed to grow audience and provide seamless listening experience.',
    challenges: [
      'Audio player integration',
      'Episode management system',
      'RSS feed generation',
      'Social media integration'
    ],
    solutions: [
      'Built custom audio player with playlist',
      'Created CMS for easy episode publishing',
      'Implemented automatic RSS feed generation',
      'Added social sharing and embedding features'
    ],
    results: [
      { label: 'Monthly Listeners', value: '15K+' },
      { label: 'Episodes Published', value: '50+' },
      { label: 'Avg. Listen Time', value: '35 min' },
      { label: 'Subscriber Growth', value: '250%' }
    ],
    technologies: ['React', 'Next.js', 'Contentful', 'Vercel'],
    gallery: [
      'assets/screencapture-the-tech-effect-podcast-steel-vercel-app-2025-12-17-01_44_24.png',
      'assets/screencapture-the-tech-effect-podcast-steel-vercel-app-about-2025-12-17-01_46_04.png',
      'assets/screencapture-the-tech-effect-podcast-steel-vercel-app-episodes-2025-12-17-01_46_37.png'
    ]
  },
  'thryve-sync': {
    title: 'Thryve Sync',
    category: 'Business Automation',
    description: 'Centralized platform to synchronize business operations and workflows.',
    client: 'Thryve Technologies',
    date: 'January 2024',
    duration: '5 months',
    role: 'System Architecture',
    website: 'https://thryve-sync.vercel.app',
    heroImage: 'assets/screencapture-thryve-sync-vercel-app-2025-12-17-01_52_46.png',
    gradient: 'linear-gradient(135deg, rgba(168, 85, 247, 0.3), rgba(236, 72, 153, 0.3))',
    fullDescription: 'An enterprise-grade business automation platform that synchronizes data and workflows across multiple departments and systems. Features include workflow automation, data integration, and analytics.',
    challenges: [
      'Multi-system integration',
      'Data synchronization conflicts',
      'Workflow automation complexity',
      'Enterprise security requirements'
    ],
    solutions: [
      'Built API gateway with transformation layer',
      'Implemented conflict resolution algorithms',
      'Created visual workflow builder',
      'Added enterprise SSO and encryption'
    ],
    results: [
      { label: 'Systems Integrated', value: '25+' },
      { label: 'Time Saved', value: '40%' },
      { label: 'Data Accuracy', value: '99.8%' },
      { label: 'Active Users', value: '1000+' }
    ],
    technologies: ['Node.js', 'React', 'PostgreSQL', 'RabbitMQ', 'Docker'],
    gallery: [
      'assets/screencapture-thryve-sync-vercel-app-2025-12-17-01_52_14.png',
      'assets/screencapture-thryve-sync-vercel-app-2025-12-17-01_52_24.png',
      'assets/screencapture-thryve-sync-vercel-app-2025-12-17-01_52_46.png'
    ]
  },
  'fcb-connect': {
    title: 'FCB Connect',
    category: 'Admin Dashboard',
    description: 'Centralized admin dashboard for managing users and operations.',
    client: 'FCB Corporation',
    date: 'December 2023',
    duration: '4 months',
    role: 'Dashboard Development',
    website: 'https://fcbconnect.vercel.app',
    heroImage: 'assets/screencapture-fcbconnect-vercel-app-admin-dashboard-2025-12-17-01_59_25.png',
    gradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3))',
    fullDescription: 'A comprehensive admin dashboard providing centralized control over user management, data analytics, and operational workflows. Features real-time monitoring and advanced reporting capabilities.',
    challenges: [
      'Complex data visualization',
      'Real-time monitoring',
      'Role-based access control',
      'Performance with large datasets'
    ],
    solutions: [
      'Implemented D3.js for custom visualizations',
      'Built WebSocket-based monitoring system',
      'Created granular permission system',
      'Used virtual scrolling and pagination'
    ],
    results: [
      { label: 'Users Managed', value: '10K+' },
      { label: 'Dashboard Load', value: '<2s' },
      { label: 'Data Points', value: '1M+' },
      { label: 'Admin Efficiency', value: '60% ↑' }
    ],
    technologies: ['React', 'TypeScript', 'D3.js', 'Node.js', 'MongoDB'],
    gallery: [
      'assets/screencapture-fcbconnect-vercel-app-admin-dashboard-2025-12-17-01_58_29.png',
      'assets/screencapture-fcbconnect-vercel-app-admin-dashboard-2025-12-17-01_59_25.png',
      'assets/screencapture-fcbconnect-vercel-app-agent-portal-2025-12-17-02_00_07.png'
    ]
  }
};
