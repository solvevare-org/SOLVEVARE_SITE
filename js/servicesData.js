// Services Data
const servicesData = [
  {
    id: 1,
    iconPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z',
    title: 'Web Development',
    tagline: 'Build Your Digital Empire',
    description: 'Custom web applications and responsive websites built with modern technologies.',
    fullDescription: 'Transform your digital presence with cutting-edge web development solutions. We create custom web applications and responsive websites that not only look stunning but also deliver exceptional performance and user experience. Our expertise spans modern frameworks, progressive web apps, e-commerce platforms, and enterprise solutions.',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&h=800&fit=crop',
    features: [
      'Responsive Design for All Devices',
      'Progressive Web Applications (PWA)',
      'E-Commerce Solutions',
      'Content Management Systems',
      'API Development & Integration',
      'Performance Optimization',
      'SEO-Friendly Architecture',
      'Cross-Browser Compatibility'
    ],
    technologies: ['React', 'Next.js', 'Vue.js', 'TypeScript', 'Node.js', 'TailwindCSS', 'GraphQL', 'REST APIs'],
    process: [
      { step: 'Discovery', description: 'Understanding your business goals and target audience' },
      { step: 'Planning', description: 'Creating wireframes and technical architecture' },
      { step: 'Design', description: 'Crafting beautiful and intuitive user interfaces' },
      { step: 'Development', description: 'Building with modern technologies and best practices' },
      { step: 'Testing', description: 'Rigorous quality assurance and cross-browser testing' },
      { step: 'Launch', description: 'Deployment and performance optimization' },
      { step: 'Support', description: 'Ongoing maintenance and feature enhancements' }
    ],
    benefits: [
      'Increased user engagement and conversion rates',
      'Scalable architecture for business growth',
      'Enhanced brand credibility and trust',
      'Improved search engine rankings',
      'Faster loading times and better performance',
      'Seamless user experience across all devices'
    ],
    caseStudy: {
      client: 'TechCorp Solutions',
      result: '250% increase in conversion rate',
      description: 'Built a high-performance e-commerce platform that scaled to handle 100K+ daily visitors'
    }
  },
  {
    id: 2,
    iconPath: 'M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z',
    title: 'App Development',
    tagline: 'Mobile Experiences That Matter',
    description: 'Native and cross-platform mobile applications for iOS and Android.',
    fullDescription: 'Bring your ideas to life with powerful mobile applications that engage users on the go. We develop native and cross-platform apps that deliver seamless experiences on iOS and Android devices. From concept to app store deployment, we handle every aspect of mobile app development.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=800&fit=crop',
    features: [
      'Native iOS & Android Development',
      'Cross-Platform Solutions (React Native, Flutter)',
      'Mobile UI/UX Design',
      'Push Notifications',
      'Offline Functionality',
      'In-App Purchases',
      'Real-Time Features',
      'App Store Optimization'
    ],
    technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'GraphQL', 'Redux', 'SQLite'],
    process: [
      { step: 'Ideation', description: 'Defining app concept and core features' },
      { step: 'UX/UI Design', description: 'Creating intuitive mobile interfaces' },
      { step: 'Prototyping', description: 'Building interactive prototypes for validation' },
      { step: 'Development', description: 'Coding with best practices and performance in mind' },
      { step: 'Testing', description: 'Comprehensive testing on real devices' },
      { step: 'Deployment', description: 'App store submission and approval management' },
      { step: 'Updates', description: 'Regular updates and feature additions' }
    ],
    benefits: [
      'Direct access to millions of mobile users',
      'Enhanced customer engagement and loyalty',
      'Increased revenue through mobile commerce',
      'Real-time customer interactions',
      'Competitive advantage in your market',
      'Valuable user insights and analytics'
    ],
    caseStudy: {
      client: 'FitLife App',
      result: '1M+ downloads in 6 months',
      description: 'Developed a fitness tracking app with AI-powered recommendations and social features'
    }
  },
  {
    id: 3,
    iconPath: 'M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z',
    title: 'Desktop Development',
    tagline: 'Powerful Desktop Solutions',
    description: 'Powerful desktop applications for Windows, macOS, and Linux.',
    fullDescription: 'Create robust desktop applications that provide rich user experiences and offline capabilities. We build cross-platform desktop software using modern frameworks like Electron, enabling your application to run seamlessly on Windows, macOS, and Linux.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop',
    features: [
      'Cross-Platform Development',
      'Native Performance',
      'Offline Capabilities',
      'File System Integration',
      'System Tray Applications',
      'Auto-Updates',
      'Hardware Integration',
      'Custom UI Components'
    ],
    technologies: ['Electron', 'Node.js', 'C++', 'Python', 'Qt', 'WPF', '.NET', 'SQLite'],
    process: [
      { step: 'Requirements', description: 'Gathering detailed functional requirements' },
      { step: 'Architecture', description: 'Designing system architecture and data flow' },
      { step: 'Interface Design', description: 'Creating desktop-optimized UI/UX' },
      { step: 'Development', description: 'Building with performance and security in mind' },
      { step: 'Integration', description: 'Connecting with existing systems and APIs' },
      { step: 'Deployment', description: 'Creating installers for all platforms' },
      { step: 'Maintenance', description: 'Ongoing support and version management' }
    ],
    benefits: [
      'Full control over application environment',
      'Offline functionality for critical operations',
      'Superior performance for resource-intensive tasks',
      'Direct hardware and file system access',
      'Professional look and feel',
      'One-time purchase or subscription models'
    ],
    caseStudy: {
      client: 'DataViz Pro',
      result: '50K+ enterprise users',
      description: 'Built a data visualization tool that processes millions of data points in real-time'
    }
  },
  {
    id: 4,
    iconPath: 'M19.35 10.04C18.67 6.59 15.64 4 12 4c-1.48 0-2.85.43-4.01 1.17l1.46 1.46C10.21 6.23 11.08 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3s-1.34 3-3 3H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h.71C7.37 7.69 9.48 6 12 6v2c-1.82 0-3.41.88-4.41 2.24C6.94 10.1 6.48 10 6 10c-1.66 0-3 1.34-3 3s1.34 3 3 3h13c1.1 0 2-.9 2-2s-.9-2-2-2h-2.5v-.5c0-2.49-1.51-4.63-3.65-5.54z',
    title: 'Cloud Solutions',
    tagline: 'Scale Without Limits',
    description: 'Cloud infrastructure design, migration, and management on AWS, Azure, and Google Cloud.',
    fullDescription: 'Leverage the power of cloud computing to scale your business operations efficiently. We provide end-to-end cloud solutions including infrastructure design, migration strategies, deployment automation, and ongoing management across AWS, Azure, and Google Cloud Platform.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=800&fit=crop',
    features: [
      'Cloud Architecture Design',
      'Migration Strategy & Execution',
      'Multi-Cloud Solutions',
      'Auto-Scaling Infrastructure',
      'DevOps & CI/CD Pipelines',
      'Disaster Recovery',
      'Cost Optimization',
      'Security & Compliance'
    ],
    technologies: ['AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Terraform', 'Jenkins', 'Ansible'],
    process: [
      { step: 'Assessment', description: 'Analyzing current infrastructure and requirements' },
      { step: 'Strategy', description: 'Developing cloud adoption roadmap' },
      { step: 'Design', description: 'Architecting scalable cloud infrastructure' },
      { step: 'Migration', description: 'Seamlessly moving workloads to the cloud' },
      { step: 'Optimization', description: 'Fine-tuning performance and costs' },
      { step: 'Security', description: 'Implementing robust security measures' },
      { step: 'Monitoring', description: '24/7 monitoring and incident response' }
    ],
    benefits: [
      'Reduced infrastructure costs',
      'Unlimited scalability on demand',
      'Improved disaster recovery capabilities',
      'Enhanced security and compliance',
      'Global reach and low latency',
      'Focus on business, not infrastructure'
    ],
    caseStudy: {
      client: 'Enterprise Corp',
      result: '60% cost reduction',
      description: 'Migrated legacy infrastructure to AWS with zero downtime and improved performance'
    }
  },
  {
    id: 5,
    iconPath: 'M20 13H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1zM7 19c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM20 3H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1zM7 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z',
    title: 'Networking & Infrastructure',
    tagline: 'Build Rock-Solid Foundations',
    description: 'Enterprise network design, implementation, and security.',
    fullDescription: 'Establish reliable and secure network infrastructure that supports your business operations. We design, implement, and manage enterprise networks that ensure high availability, optimal performance, and robust security for your growing organization.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=800&fit=crop',
    features: [
      'Network Architecture Design',
      'LAN/WAN Implementation',
      'Network Security Solutions',
      'VPN Configuration',
      'Load Balancing',
      'Network Monitoring',
      'Firewall Management',
      'Disaster Recovery Planning'
    ],
    technologies: ['Cisco', 'Juniper', 'VMware', 'Palo Alto', 'F5', 'Wireshark', 'Nagios', 'SNMP'],
    process: [
      { step: 'Analysis', description: 'Assessing current network infrastructure' },
      { step: 'Planning', description: 'Designing optimal network topology' },
      { step: 'Implementation', description: 'Installing and configuring hardware' },
      { step: 'Security', description: 'Implementing security protocols' },
      { step: 'Testing', description: 'Stress testing and validation' },
      { step: 'Documentation', description: 'Creating comprehensive documentation' },
      { step: 'Support', description: 'Ongoing monitoring and maintenance' }
    ],
    benefits: [
      'Enhanced network reliability and uptime',
      'Improved security posture',
      'Better network performance',
      'Scalable infrastructure',
      'Reduced operational costs',
      'Proactive issue detection'
    ],
    caseStudy: {
      client: 'Global Finance Ltd',
      result: '99.99% uptime achieved',
      description: 'Implemented redundant network infrastructure across 50 global offices'
    }
  },
  {
    id: 6,
    iconPath: 'M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z',
    title: 'Database Solutions',
    tagline: 'Your Data, Optimized',
    description: 'Database design, optimization, and management for SQL and NoSQL systems.',
    fullDescription: 'Maximize the value of your data with expert database solutions. We design, implement, and optimize database systems that ensure data integrity, security, and lightning-fast performance. Our expertise covers both SQL and NoSQL databases for various use cases.',
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=1200&h=800&fit=crop',
    features: [
      'Database Design & Modeling',
      'Performance Optimization',
      'Data Migration Services',
      'Backup & Recovery Solutions',
      'Replication & High Availability',
      'Security & Access Control',
      'Query Optimization',
      'Database Monitoring'
    ],
    technologies: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Elasticsearch', 'Oracle', 'SQL Server', 'Cassandra'],
    process: [
      { step: 'Assessment', description: 'Analyzing data requirements and patterns' },
      { step: 'Design', description: 'Creating optimized database schema' },
      { step: 'Implementation', description: 'Setting up database infrastructure' },
      { step: 'Migration', description: 'Transferring existing data safely' },
      { step: 'Optimization', description: 'Tuning queries and indexes' },
      { step: 'Security', description: 'Implementing access controls' },
      { step: 'Monitoring', description: 'Continuous performance monitoring' }
    ],
    benefits: [
      'Faster query performance',
      'Improved data security and compliance',
      'Reduced storage costs',
      'Better data consistency',
      'Scalable data architecture',
      'Automated backup and recovery'
    ],
    caseStudy: {
      client: 'E-Commerce Giant',
      result: '10x query speed improvement',
      description: 'Optimized database handling 10M+ transactions daily with zero data loss'
    }
  },
  {
    id: 7,
    iconPath: 'M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z',
    title: 'Brand Design',
    tagline: 'Make Your Mark',
    description: 'From logos to color palettes, we develop your brand identity.',
    fullDescription: 'Create a memorable brand identity that resonates with your audience and stands out from the competition. We craft comprehensive brand strategies including logo design, color systems, typography, and brand guidelines that ensure consistency across all touchpoints.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=800&fit=crop',
    features: [
      'Logo Design & Branding',
      'Brand Strategy Development',
      'Color Palette Creation',
      'Typography Selection',
      'Brand Guidelines',
      'Marketing Collateral',
      'Social Media Graphics',
      'Brand Asset Library'
    ],
    technologies: ['Adobe Creative Suite', 'Figma', 'Sketch', 'InVision', 'Procreate', 'Illustrator', 'Photoshop', 'After Effects'],
    process: [
      { step: 'Discovery', description: 'Understanding your brand values and audience' },
      { step: 'Research', description: 'Analyzing market and competitors' },
      { step: 'Concept', description: 'Creating initial design concepts' },
      { step: 'Refinement', description: 'Iterating based on feedback' },
      { step: 'Finalization', description: 'Polishing final design elements' },
      { step: 'Guidelines', description: 'Creating comprehensive brand guidelines' },
      { step: 'Delivery', description: 'Providing all brand assets and files' }
    ],
    benefits: [
      'Strong brand recognition',
      'Increased customer trust',
      'Consistent brand experience',
      'Professional market presence',
      'Competitive differentiation',
      'Higher perceived value'
    ],
    caseStudy: {
      client: 'StartupHub',
      result: '300% brand recognition increase',
      description: 'Complete brand redesign that transformed market perception and customer engagement'
    }
  },
  {
    id: 8,
    iconPath: 'M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z',
    title: 'Custom Software',
    tagline: 'Built For Your Business',
    description: 'Bespoke software solutions tailored to your unique business requirements.',
    fullDescription: 'Get software that perfectly fits your business processes and requirements. We develop custom software solutions from the ground up, tailored specifically to solve your unique challenges and support your business goals. From enterprise applications to specialized tools, we build software that drives results.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=800&fit=crop',
    features: [
      'Custom Application Development',
      'Business Process Automation',
      'Integration Solutions',
      'Legacy System Modernization',
      'API Development',
      'Third-Party Integrations',
      'Workflow Optimization',
      'Custom Reporting & Analytics'
    ],
    technologies: ['Python', 'Java', 'C#', '.NET', 'Spring Boot', 'Django', 'FastAPI', 'Microservices'],
    process: [
      { step: 'Consultation', description: 'Understanding business processes and pain points' },
      { step: 'Analysis', description: 'Defining requirements and success criteria' },
      { step: 'Architecture', description: 'Designing scalable system architecture' },
      { step: 'Development', description: 'Agile development with regular demos' },
      { step: 'Testing', description: 'Comprehensive QA and user acceptance testing' },
      { step: 'Deployment', description: 'Production rollout and training' },
      { step: 'Evolution', description: 'Continuous improvement and feature additions' }
    ],
    benefits: [
      'Perfect fit for your business needs',
      'Competitive advantage through innovation',
      'Improved operational efficiency',
      'Reduced manual work and errors',
      'Better data insights and reporting',
      'Long-term cost savings'
    ],
    caseStudy: {
      client: 'Manufacturing Co',
      result: '70% efficiency improvement',
      description: 'Built custom ERP system that automated inventory management and production planning'
    }
  },
  {
    id: 9,
    iconPath: 'M7 2v11h3v9l7-12h-4l4-8z',
    title: 'Automation & Integration',
    tagline: 'Automate & Orchestrate Workflows',
    description: 'Automation, workflow integration, and orchestration across systems — building reliable, event-driven processes and integrations.',
    fullDescription: 'Design and implement automation solutions and integrations that connect systems, reduce manual work, and ensure reliability. We build event-driven architectures, integration layers, and orchestrations that allow data to flow securely between platforms. From connector development to enterprise-scale orchestration and monitoring, we help teams automate repetitive tasks and focus on strategic work.',
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1200&h=800&fit=crop',
    features: [
      'Workflow Orchestration & Scheduling',
      'Connector & API Development',
      'Event-Driven Architecture',
      'Robust Error Handling & Retries',
      'Monitoring & Alerting',
      'Data Transformation & Mapping',
      'Scalable Integration Patterns',
      'Security & Compliance'
    ],
    technologies: ['Zapier', 'n8n', 'AWS Lambda', 'Serverless', 'Node.js', 'Kafka', 'RabbitMQ', 'REST APIs', 'GraphQL', 'Postgres'],
    process: [
      { step: 'Discovery', description: 'Identify integration points, data flows, and business rules' },
      { step: 'Design', description: 'Define orchestration, retries, and data contracts' },
      { step: 'Implementation', description: 'Build connectors, functions, and orchestration pipelines' },
      { step: 'Validation', description: 'End-to-end testing with sample and edge-case data' },
      { step: 'Monitoring', description: 'Deploy observability and alerting to ensure reliability' },
      { step: 'Iteration', description: 'Refine and scale integrations based on usage and feedback' }
    ],
    benefits: [
      'Reduced manual work and errors',
      'Faster time-to-resolution for business processes',
      'Improved data consistency across systems',
      'Scalable automation that grows with your business',
      'Lower operational costs and improved SLAs'
    ],
    caseStudy: {
      client: 'RetailOps',
      result: '75% reduction in manual processing time',
      description: 'Automated order routing and reconciliation across multiple systems resulting in faster fulfillment and fewer errors.'
    }
  }
];
