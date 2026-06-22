// Technology Details Page - Pixel-Perfect React Clone
(function() {
  'use strict';

  let currentTech = null;

  // Initialize
  function init() {
    if (typeof technologyDetailsData === 'undefined') {
      console.error('technologyDetailsData not loaded');
      showError();
      return;
    }

    // Get tech ID from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const techId = urlParams.get('tech');

    console.log('Tech ID from URL:', techId); // Debug log

    if (!techId) {
      console.error('No technology ID in URL');
      showError();
      return;
    }

    if (!technologyDetailsData[techId]) {
      console.error('Technology not found:', techId);
      console.log('Available technologies:', Object.keys(technologyDetailsData));
      showError();
      return;
    }

    currentTech = technologyDetailsData[techId];
    console.log('Loaded technology:', currentTech.name); // Debug log
    
    document.title = `${currentTech.name} Development - Solvevare`;
    
    renderAll();
    setupScrollAnimations();
    setupFAQ();
  }

  // Render all sections
  function renderAll() {
    renderHero();
    renderMetrics();
    renderWhyChoose();
    renderAdvantages();
    renderServices();
    renderProcess();
    renderPortfolio();
    renderTestimonials();
    renderFAQ();
    renderCTA();
    setupBenefitsVisibility();
  }

  // Render Hero
  function renderHero() {
    document.getElementById('hero-title').textContent = currentTech.title.toUpperCase();
    document.getElementById('hero-description').textContent = currentTech.heroDescription;
  }

  // Render Metrics
  function renderMetrics() {
    const metrics = [
      { label: 'Experience', value: '5+ Years' },
      { label: 'Projects', value: '100+' },
      { label: 'Clients', value: '50+' },
      { label: 'Awards', value: '10+' },
      { label: 'Team', value: '25+' }
    ];

    const grid = document.getElementById('metrics-grid');
    grid.innerHTML = metrics.map((metric, index) => `
      <div class="metric-item animate-fade-up stagger-${index + 1}">
        <div class="metric-value">${metric.value}</div>
        <div class="metric-label">${metric.label}</div>
      </div>
    `).join('');
  }

  // Render Why Choose
  function renderWhyChoose() {
    const grid = document.getElementById('why-choose-grid');
    
    const benefitsHtml = currentTech.whyChoose.benefits.map(benefit => `
      <li class="benefit-item">
        <svg class="benefit-icon" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="17 8 10.5 15 7 11.5"></polyline>
        </svg>
        <span class="benefit-text">${benefit}</span>
      </li>
    `).join('');

    grid.innerHTML = `
      <div class="animate-fade-left">
        <h2 class="why-choose-title">${currentTech.whyChoose.title.toUpperCase()}</h2>
        <p class="why-choose-description">${currentTech.whyChoose.description}</p>
      </div>
      <div class="animate-fade-right">
        <ul class="benefits-list">
          ${benefitsHtml}
        </ul>
      </div>
    `;
  }

  // Render Advantages
  function renderAdvantages() {
    document.getElementById('advantages-title').innerHTML = `Advantages of ${currentTech.name.toUpperCase()}`;

    const backgroundImages = [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80'
    ];

    const descriptions = [
      'New design features that are easily implemented within code: Shadows, blurs, masks, shimmering, smooth page transitions and animations.',
      `In ${currentTech.name}, there are a number of ready-made plugins and libraries that suit perfectly well for different apps and use cases.`,
      `${currentTech.name} allows great cooperation between developers and designers because you develop and watch design updates at the same time. Choose different layouts, platforms or devices - we know how to realize UI/UX ideas into visually attractive applications made with ${currentTech.name}.`
    ];

    const container = document.getElementById('advantages-container');
    container.innerHTML = currentTech.whyChoose.benefits.slice(0, 3).map((benefit, index) => `
      <div class="advantage-block animate-fade-up stagger-${index + 1}">
        <div class="advantage-bg" style="background-image: url(${backgroundImages[index]})"></div>
        <div class="advantage-overlay"></div>
        <div class="advantage-content">
          <h3 class="advantage-title">${benefit}</h3>
          <p class="advantage-description">${descriptions[index]}</p>
        </div>
      </div>
    `).join('');
  }

  // Render Services
  function renderServices() {
    document.getElementById('services-title').textContent = `Our ${currentTech.name} Development Services`.toUpperCase();
    document.getElementById('services-subtitle').textContent = `Comprehensive ${currentTech.name} solutions tailored to your business needs`;

    const serviceIcons = {
      'Flutter UI/UX Design': '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>',
      'Custom Flutter App Development': '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>',
      'Flutter Web Development': '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
      'Flutter Migration Services': '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>',
      'Flutter App Maintenance & Support': '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
      'Flutter Consulting': '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>'
    };

    const grid = document.getElementById('services-grid');
    grid.innerHTML = currentTech.services.map((service, index) => {
      const icon = serviceIcons[service.title] || '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>';
      
      return `
        <div class="service-card animate-fade-up stagger-${index + 1}">
          <div class="service-icon-wrapper">
            ${icon}
          </div>
          <h3 class="service-title">${service.title}</h3>
          <p class="service-description">${service.description}</p>
        </div>
      `;
    }).join('');
  }

  // Render Process
  function renderProcess() {
    const grid = document.getElementById('process-grid');
    grid.innerHTML = currentTech.process.map((step, index) => `
      <div class="process-item animate-fade-up stagger-${index + 1}">
        <div class="process-step-number">${step.step}</div>
        <h3 class="process-title">${step.title}</h3>
        <p class="process-description">${step.description}</p>
        ${index < currentTech.process.length - 1 ? '<div class="process-connector"></div>' : ''}
      </div>
    `).join('');
  }

  // Render Portfolio
  function renderPortfolio() {
    document.getElementById('portfolio-subtitle').textContent = `Explore some of our successful ${currentTech.name} projects`;

    const projects = [
      {
        id: 1,
        title: 'Ticketing System',
        category: 'Web Application',
        description: 'A Web app for managing support or service tickets.',
        image: 'assets/Screenshot 2025-12-15 203923.png'
      },
      {
        id: 2,
        title: 'NORIGHTWAY',
        category: 'Full Stack E-Commerce Platform',
        description: 'Modern web project focused on showcasing unconventional thinking.',
        image: 'assets/Screenshot 2025-12-15 213248.png'
      },
      {
        id: 3,
        title: 'Chem Publishers',
        category: 'Scientific Publishing',
        description: 'Digital publishing platform delivering high-quality chemistry content.',
        image: 'assets/Screenshot 2025-12-15 225523.png'
      },
      {
        id: 4,
        title: 'JB Bespoke Craft Website',
        category: 'Custom Carpentry',
        description: 'Handcrafted carpentry business showcase site.',
        image: 'assets/Screenshot 2025-12-15 233204.png'
      },
      {
        id: 5,
        title: 'Urgent Vet Marketing',
        category: 'Veterinary Marketing',
        description: 'Marketing-focused website for emergency veterinary clinics.',
        image: 'assets/Screenshot 2025-12-15 233700.png'
      },
      {
        id: 6,
        title: 'Hen Haus',
        category: 'Home Services Marketplace',
        description: 'Platform connecting homeowners with local professionals.',
        image: 'assets/Screenshot 2025-12-16 005831.png'
      }
    ];

    const grid = document.getElementById('portfolio-grid');
    grid.innerHTML = projects.map((project, index) => `
      <a href="#" class="portfolio-card animate-fade-up stagger-${index + 1}">
        <div class="portfolio-card-inner">
          <div class="portfolio-image-wrapper">
            <img src="${project.image}" alt="${project.title}" class="portfolio-image">
          </div>
          <div class="portfolio-content">
            <h3 class="portfolio-title">${project.title}</h3>
            <p class="portfolio-category">${project.category}</p>
            <p class="portfolio-description">${project.description}</p>
          </div>
        </div>
      </a>
    `).join('');
  }

  // Render Testimonials
  function renderTestimonials() {
    const testimonials = [
      {
        quote: "They deliver what they promise, and I can't say that about other companies I've worked with.",
        name: "Eran Harel",
        role: "CTO of Bos-Dimex",
        avatar: "EH"
      },
      {
        quote: "The team's expertise in Flutter helped us launch our app faster than expected. Excellent work!",
        name: "Sarah Mitchell",
        role: "Product Manager at TechCorp",
        avatar: "SM"
      }
    ];

    const grid = document.getElementById('testimonials-grid');
    grid.innerHTML = testimonials.map((testimonial, index) => `
      <div class="testimonial-card animate-fade-up stagger-${index + 0}">
        <p class="testimonial-quote">"${testimonial.quote}"</p>
        <div class="testimonial-author">
          <div class="testimonial-avatar">${testimonial.avatar}</div>
          <div>
            <p class="testimonial-name">${testimonial.name}</p>
            <p class="testimonial-role">${testimonial.role}</p>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Render FAQ
  function renderFAQ() {
    document.getElementById('faq-subtitle').textContent = `Common questions about our ${currentTech.name} development services`;

    const container = document.getElementById('faq-container');
    container.innerHTML = currentTech.faqs.map((faq, index) => `
      <div class="faq-item animate-fade-up stagger-${Math.min(index + 1, 8)}" data-faq-index="${index}">
        <button class="faq-question-button">
          <span class="faq-question-text">${faq.question}</span>
          <svg class="faq-icon" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-content">${faq.answer}</div>
        </div>
      </div>
    `).join('');
  }

  // Render CTA
  function renderCTA() {
    document.getElementById('cta-description').textContent = `Let's discuss how ${currentTech.name} can transform your business. Get in touch with us today.`;
  }

  // Setup FAQ interactions
  function setupFAQ() {
    document.addEventListener('click', function(e) {
      const button = e.target.closest('.faq-question-button');
      if (!button) return;

      const faqItem = button.closest('.faq-item');
      const isActive = faqItem.classList.contains('active');

      // Close all FAQs
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
      });

      // Toggle current FAQ
      if (!isActive) {
        faqItem.classList.add('active');
      }
    });
  }

  // Setup Benefits Visibility (using Intersection Observer for .visible class)
  function setupBenefitsVisibility() {
    const benefitItems = document.querySelectorAll('.benefits-list li');
    
    if (benefitItems.length === 0) return;

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    benefitItems.forEach(el => {
      observer.observe(el);
    });
  }

  // Setup Scroll Animations (Intersection Observer - like Framer Motion whileInView)
  function setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('.animate-fade-up, .animate-fade-left, .animate-fade-right').forEach(el => {
      el.style.animationPlayState = 'paused';
      observer.observe(el);
    });
  }

  // Show Error
  function showError() {
    document.querySelector('.tech-details-wrapper').innerHTML = `
      <div style="min-height: 80vh; display: flex; align-items: center; justify-content: center; text-align: center; padding: 2rem;">
        <div>
          <h1 style="font-size: 3rem; color: #fff; margin-bottom: 1rem;">Technology Not Found</h1>
          <p style="font-size: 1.25rem; color: #94a3b8; margin-bottom: 2rem;">The technology you're looking for doesn't exist.</p>
          <a href="technologies.html" style="padding: 1rem 2rem; background: linear-gradient(135deg, #00e6fb, #1E88E5); color: #fff; border-radius: 12px; text-decoration: none; font-weight: 600;">
            View All Technologies
          </a>
        </div>
      </div>
    `;
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
