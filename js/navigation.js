// Navigation Mega Menu System
class Navigation {
  constructor() {
    this.nav = document.querySelector('nav');
    this.homeDropdown = null;
    this.servicesDropdown = null;
    this.mobileMenu = null;
    this.timeouts = {};
    
    this.init();
  }

  init() {
    this.setupScrollEffect();
    this.setupMobileMenu();
    this.setupMegaMenus();
    this.setupActiveLinks();
  }

  setupScrollEffect() {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        this.nav.classList.add('scrolled');
      } else {
        this.nav.classList.remove('scrolled');
      }
    });
  }

  setupMobileMenu() {
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');

    const menuIcon = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
      <line x1="3" y1="6" x2="21" y2="6"/>
      <line x1="3" y1="12" x2="21" y2="12"/>
      <line x1="3" y1="18" x2="21" y2="18"/>
    </svg>`;

    const closeIcon = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
      <line x1="5" y1="5" x2="19" y2="19"/>
      <line x1="19" y1="5" x2="5" y2="19"/>
    </svg>`;

    if (mobileBtn && mobileMenu) {
      mobileBtn.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.toggle('active');
        mobileBtn.innerHTML = isOpen ? closeIcon : menuIcon;
        mobileBtn.setAttribute('aria-expanded', isOpen);
      });
    }
  }


  setupMegaMenus() {
    const pairs = [
      ['home', '#home-mega-menu'],
      ['services', '#services-mega-menu'],
      ['industries', '#industries-mega-menu'],
      ['technologies', '#technologies-mega-menu'],
      ['locations', '#locations-mega-menu'],
    ];
    pairs.forEach(([key, selector]) => {
      const link = document.querySelector(`[data-dropdown="${key}"]`);
      const menu = document.querySelector(selector);
      if (link && menu) {
        this.setupDropdown(link, menu, key);
        if (key === 'industries') this.setupIndustrySwitcher();
        if (key === 'technologies') this.setupTechnologySwitcher();
      }
    });
  }

  setupDropdown(trigger, menu, name) {
    let closeTimeout = null;

    const show = () => {
      if (closeTimeout) {
        clearTimeout(closeTimeout);
        closeTimeout = null;
      }
      menu.classList.add('active');
      this.nav.classList.add('dropdown-open');
    };

    const hide = () => {
      closeTimeout = setTimeout(() => {
        menu.classList.remove('active');
        this.checkDropdownsOpen();
      }, 150);
    };

    const checkDropdownsOpen = () => {
      const anyOpen = document.querySelector('.mega-menu.active');
      if (!anyOpen) {
        this.nav.classList.remove('dropdown-open');
      }
    };

    // Mouse events for trigger
    trigger.addEventListener('mouseenter', show);
    trigger.addEventListener('mouseleave', hide);

    // Mouse events for menu
    menu.addEventListener('mouseenter', () => {
      if (closeTimeout) {
        clearTimeout(closeTimeout);
        closeTimeout = null;
      }
    });
    menu.addEventListener('mouseleave', hide);

    // Store reference
    this[`${name}Dropdown`] = { trigger, menu, show, hide };
  }

  setupActiveLinks() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  checkDropdownsOpen() {
    const anyOpen = document.querySelector('.mega-menu.active');
    if (!anyOpen) {
      this.nav.classList.remove('dropdown-open');
    }
  }

  setupIndustrySwitcher() {
    const industryButtons = document.querySelectorAll('.industry-item');
    
    industryButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons
        industryButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        // Get industry ID and update content
        const industryId = button.getAttribute('data-industry');
        this.updateIndustryContent(industryId);
      });
    });
  }

  updateIndustryContent(industryId) {
    // Find industry data
    const industry = industriesData.find(ind => ind.id === industryId);
    if (!industry) {
      console.error('Industry not found:', industryId);
      return;
    }

    console.log('Updating industry:', industry.name);

    // Detect depth to build correct relative path
    const depth = window.location.pathname.split('/').filter(Boolean).length;
    const prefix = depth > 1 ? '../' : '';
    const industryPath = `${prefix}industry-details.html?id=${industryId}`;

    // Update services title with link
    const servicesTitle = document.querySelector('.industry-services-title');
    if (servicesTitle) {
      servicesTitle.innerHTML = `<a href="${industryPath}" class="industry-services-title-link">${industry.name} Services</a>`;
    }

    // Update services list
    const servicesList = document.querySelector('.industry-services-list');
    if (servicesList) {
      servicesList.innerHTML = industry.services.map(service => `
        <li>
          <a href="${industryPath}" class="industry-service-link">${service.title}</a>
          <p class="industry-service-desc">${service.description}</p>
        </li>
      `).join('');
    }

    // Update case study (if exists)
    const caseStudyContainer = document.querySelector('.industry-case-study');
    if (caseStudyContainer) {
      if (industry.caseStudy) {
        caseStudyContainer.style.display = 'block';
        const caseStudyTitle = caseStudyContainer.querySelector('.case-study-title');
        const caseStudyDesc = caseStudyContainer.querySelector('.case-study-desc');
        const caseStudyImage = caseStudyContainer.querySelector('.case-study-image img');
        const caseStudyLink = caseStudyContainer.querySelector('.case-study-link');

        if (caseStudyTitle) caseStudyTitle.textContent = industry.caseStudy.title;
        if (caseStudyDesc) caseStudyDesc.textContent = industry.caseStudy.description;
        if (caseStudyImage) caseStudyImage.src = industry.caseStudy.image;
        if (caseStudyLink) caseStudyLink.href = industry.caseStudy.link;
      } else {
        caseStudyContainer.style.display = 'none';
      }
    }
  }

  setupTechnologySwitcher() {
    const technologyButtons = document.querySelectorAll('.technology-item');
    
    technologyButtons.forEach(button => {
      // Hover event to update featured card
      button.addEventListener('mouseenter', () => {
        // Remove active class from all buttons
        technologyButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to hovered button
        button.classList.add('active');
        
        // Get technology ID and update content
        const techId = button.getAttribute('data-tech');
        this.updateTechnologyContent(techId);
      });
    });
  }

  updateTechnologyContent(techId) {
    // Find technology data
    const tech = technologiesData.find(t => t.id === techId);
    if (!tech) {
      console.error('Technology not found:', techId);
      return;
    }

    // Update featured card with smooth transition
    const techCard = document.querySelector('.tech-card');
    if (!techCard) return;

    // Add fade out
    techCard.style.opacity = '0';
    techCard.style.transform = 'translateY(10px)';

    setTimeout(() => {
      // Update title
      const title = techCard.querySelector('.tech-card-title');
      if (title) title.textContent = tech.name;

      // Update description
      const desc = techCard.querySelector('.tech-card-desc');
      if (desc) desc.textContent = tech.description;

      // Update icon (using simple SVG based on category)
      const iconContainer = techCard.querySelector('.tech-icon');
      if (iconContainer) {
        iconContainer.innerHTML = this.getTechIcon(tech.icon);
      }

      // Fade in
      techCard.style.opacity = '1';
      techCard.style.transform = 'translateY(0)';
    }, 200);
  }

  getTechIcon(iconName) {
    const icons = {
      'react': '<svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="2"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>',
      'smartphone': '<svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/></svg>',
      'code': '<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
      'server': '<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>',
      'cloud': '<svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4c-1.48 0-2.85.43-4.01 1.17l1.46 1.46C10.21 6.23 11.08 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3s-1.34 3-3 3H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h.71C7.37 7.69 9.48 6 12 6v2c-1.82 0-3.41.88-4.41 2.24C6.94 10.1 6.48 10 6 10c-1.66 0-3 1.34-3 3s1.34 3 3 3h13c1.1 0 2-.9 2-2s-.9-2-2-2h-2.5v-.5c0-2.49-1.51-4.63-3.65-5.54z"/></svg>',
      'bar-chart': '<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>',
      'cpu': '<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>',
      'box': '<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>'
    };
    return icons[iconName] || icons['code'];
  }
}

function setupBookMeetButtons() {
  document.querySelectorAll('.btn-donate, .mobile-book-btn').forEach(btn => {
    btn.removeAttribute('onclick');
    btn.addEventListener('click', () => {
      window.open('https://calendly.com/solvevare', '_blank');
    });
  });
}

// Initialize navigation when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new Navigation();
    setupBookMeetButtons();
  });
} else {
  new Navigation();
  setupBookMeetButtons();
}
