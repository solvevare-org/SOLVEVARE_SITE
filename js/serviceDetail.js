// Service Detail Page Rendering Logic
(function() {
  // Get service ID from URL query parameter
  function getServiceId() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('id')) || 1;
  }

  // Find service by ID
  function getServiceData(id) {
    return servicesData.find(service => service.id === id);
  }

  // Render service not found
  function renderNotFound() {
    document.body.innerHTML = `
      <div style="min-height: 100vh; background: #000; display: flex; align-items: center; justify-content: center;">
        <div style="text-align: center;">
          <h1 style="font-size: 2.25rem; font-weight: 700; color: #fff; margin-bottom: 1rem;">Service Not Found</h1>
          <a href="../services.html" style="color: #00e6fb; text-decoration: none; transition: color 0.3s;">
            Back to Services
          </a>
        </div>
      </div>
    `;
  }

  // Render hero section
  function renderHero(service) {
    const heroSection = document.getElementById('hero-section');
    heroSection.style.backgroundImage = `url('${service.image}')`;
    
    const iconSvg = document.getElementById('service-icon');
    iconSvg.innerHTML = `<path d="${service.iconPath}"/>`;
    
    document.getElementById('service-title').textContent = service.title;
    document.getElementById('service-tagline').textContent = service.tagline;
    document.getElementById('service-full-desc').textContent = service.fullDescription;
    document.getElementById('page-title').textContent = `${service.title} - Solvevare`;
  }

  // Render features
  function renderFeatures(features) {
    const featuresGrid = document.getElementById('features-grid');
    featuresGrid.innerHTML = features.map(feature => `
      <div class="service-feature-item">
        <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <p>${feature}</p>
      </div>
    `).join('');
  }

  // Render technologies
  function renderTechnologies(technologies) {
    const techTags = document.getElementById('tech-tags');
    techTags.innerHTML = technologies.map(tech => `
      <span class="tech-tag">${tech}</span>
    `).join('');
  }

  // Render process
  function renderProcess(process) {
    const processGrid = document.getElementById('process-grid');
    processGrid.innerHTML = process.map((item, index) => `
      <div class="process-step-wrapper">
        <div class="process-step-glow"></div>
        <div class="process-step">
          <div class="process-header">
            <div class="process-number">${index + 1}</div>
            <h3>${item.step}</h3>
          </div>
          <p>${item.description}</p>
        </div>
      </div>
    `).join('');
  }

  // Render benefits
  function renderBenefits(benefits) {
    const benefitsList = document.getElementById('benefits-list');
    benefitsList.innerHTML = benefits.map(benefit => `
      <li>
        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
        </svg>
        ${benefit}
      </li>
    `).join('');
  }

  // Render case study
  function renderCaseStudy(caseStudy, serviceTitle) {
    document.getElementById('case-client').textContent = caseStudy.client;
    document.getElementById('case-result').textContent = caseStudy.result;
    document.getElementById('case-service').textContent = serviceTitle;
    document.getElementById('case-desc').textContent = caseStudy.description;
  }

  // Render CTA text
  function renderCTA(serviceTitle) {
    document.getElementById('cta-text').textContent = 
      `Let's discuss how ${serviceTitle.toLowerCase()} can transform your business and help you achieve your goals.`;
  }

  // Initialize page
  function init() {
    const serviceId = getServiceId();
    const service = getServiceData(serviceId);

    if (!service) {
      renderNotFound();
      return;
    }

    renderHero(service);
    renderFeatures(service.features);
    renderTechnologies(service.technologies);
    renderProcess(service.process);
    renderBenefits(service.benefits);
    renderCaseStudy(service.caseStudy, service.title);
    renderCTA(service.title);
    
    // Initialize scroll animations
    initScrollAnimations();
  }

  // Scroll animations
  function initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 50);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('.service-feature-item, .process-step-wrapper, .benefits-list li, .section-title').forEach(el => {
      observer.observe(el);
    });
  }

  // Run on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
