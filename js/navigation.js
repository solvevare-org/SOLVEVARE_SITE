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
    
    if (mobileBtn && mobileMenu) {
      mobileBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        const icon = mobileBtn.querySelector('svg use');
        if (icon) {
          const isOpen = mobileMenu.classList.contains('active');
          icon.setAttribute('href', isOpen ? '#icon-x' : '#icon-menu');
        }
      });
    }
  }

  setupMegaMenus() {
    // Home Dropdown
    const homeLink = document.querySelector('[data-dropdown="home"]');
    const homeMenu = document.querySelector('#home-mega-menu');
    
    if (homeLink && homeMenu) {
      this.setupDropdown(homeLink, homeMenu, 'home');
    }

    // Services Dropdown
    const servicesLink = document.querySelector('[data-dropdown="services"]');
    const servicesMenu = document.querySelector('#services-mega-menu');
    
    if (servicesLink && servicesMenu) {
      this.setupDropdown(servicesLink, servicesMenu, 'services');
    }

    // Industries Dropdown
    const industriesLink = document.querySelector('[data-dropdown="industries"]');
    const industriesMenu = document.querySelector('#industries-mega-menu');
    
    if (industriesLink && industriesMenu) {
      this.setupDropdown(industriesLink, industriesMenu, 'industries');
      this.setupIndustrySwitcher();
    }

    // Technologies Dropdown
    const technologiesLink = document.querySelector('[data-dropdown="technologies"]');
    const technologiesMenu = document.querySelector('#technologies-mega-menu');
    
    if (technologiesLink && technologiesMenu) {
      this.setupDropdown(technologiesLink, technologiesMenu, 'technologies');
      this.setupTechnologySwitcher();
    }
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
        
        // Here you can add logic to switch content based on selected industry
        // For now, we'll keep the default Healthcare content
      });
    });
  }

  setupTechnologySwitcher() {
    const technologyButtons = document.querySelectorAll('.technology-item');
    
    technologyButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons
        technologyButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        // Here you can add logic to switch content based on selected technology
        // For now, we'll keep the default React Native content
      });
    });
  }
}

// Initialize navigation when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new Navigation();
  });
} else {
  new Navigation();
}
