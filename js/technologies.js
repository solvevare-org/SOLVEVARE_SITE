// Technologies Page JavaScript
(function() {
  'use strict';

  // SVG Icons mapping
  const icons = {
    react: '<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 1a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></svg>',
    smartphone: '<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>',
    code: '<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    server: '<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>',
    cloud: '<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>',
    'bar-chart': '<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>',
    cpu: '<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>',
    box: '<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>'
  };

  let selectedTech = null;

  // Initialize page
  function init() {
    if (typeof technologiesData === 'undefined') {
      console.error('technologiesData not loaded');
      return;
    }

    // Check for hash in URL
    const hash = window.location.hash.substring(1);
    if (hash) {
      const tech = technologiesData.find(t => t.id === hash);
      if (tech) {
        selectedTech = tech;
      } else {
        selectedTech = technologiesData[0];
      }
    } else {
      selectedTech = technologiesData[0];
    }

    renderTechList();
    renderAllTechGrid();
    renderFeaturedCard();
    setupEventListeners();

    // Scroll to technology section if hash exists
    if (hash) {
      setTimeout(() => {
        scrollToTechnology(hash);
      }, 300);
    }
  }

  // Render Technologies List (Left Column)
  function renderTechList() {
    const techList = document.getElementById('techList');
    if (!techList) return;

    techList.innerHTML = technologiesData.map((tech, index) => {
      const isActive = tech.id === selectedTech.id;
      return `
        <button 
          class="tech-item ${isActive ? 'active' : ''}" 
          data-tech-id="${tech.id}"
          style="animation-delay: ${index * 0.05}s"
        >
          <div class="tech-item-icon">
            ${icons[tech.icon] || icons.code}
          </div>
          <span class="tech-item-name">${tech.name}</span>
          ${isActive ? '<div class="tech-item-dot"></div>' : ''}
        </button>
      `;
    }).join('');
  }

  // Render All Technologies Grid (Middle Column)
  function renderAllTechGrid() {
    const techAllGrid = document.getElementById('techAllGrid');
    if (!techAllGrid) return;

    techAllGrid.innerHTML = technologiesData.map((tech, index) => {
      const isActive = tech.id === selectedTech.id;
      return `
        <a 
          href="#" 
          class="tech-all-item ${isActive ? 'active' : ''}" 
          data-tech-id="${tech.id}"
          style="animation-delay: ${index * 0.05}s"
        >
          <span class="tech-all-item-name">${tech.name}</span>
        </a>
      `;
    }).join('');
  }

  // Render Featured Technology Card (Right Column)
  function renderFeaturedCard() {
    const techFeaturedCard = document.getElementById('techFeaturedCard');
    if (!techFeaturedCard || !selectedTech) return;

    const categoryFormatted = selectedTech.category.replace('-', ' ');

    techFeaturedCard.innerHTML = `
      <div class="tech-featured-bg">
        <div class="tech-featured-bg-1"></div>
        <div class="tech-featured-bg-2"></div>
      </div>
      <div class="tech-featured-overlay"></div>
      <div class="tech-featured-content">
        <div class="tech-featured-header">
          <div>
            <div class="tech-featured-badge">
              <span>Featured</span>
            </div>
            <h3 class="tech-featured-title">${selectedTech.name}</h3>
          </div>
          <div class="tech-featured-icon">
            ${icons[selectedTech.icon] || icons.code}
          </div>
        </div>
        <p class="tech-featured-desc">${selectedTech.description}</p>
        <a href="#" class="tech-featured-link">
          Learn more about ${selectedTech.name.split(' ')[0]}
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>
        <div class="tech-featured-category">
          <span>${categoryFormatted}</span>
        </div>
      </div>
    `;
  }

  // Setup Event Listeners
  function setupEventListeners() {
    // Tech List Items
    document.addEventListener('click', function(e) {
      const techItem = e.target.closest('.tech-item');
      if (techItem) {
        e.preventDefault();
        const techId = techItem.dataset.techId;
        selectTechnology(techId);
      }
    });

    // All Tech Grid Items
    document.addEventListener('click', function(e) {
      const techAllItem = e.target.closest('.tech-all-item');
      if (techAllItem) {
        e.preventDefault();
        const techId = techAllItem.dataset.techId;
        selectTechnology(techId);
      }
    });

    // Hover on All Tech Grid Items
    document.addEventListener('mouseenter', function(e) {
      const techAllItem = e.target.closest('.tech-all-item');
      if (techAllItem) {
        const techId = techAllItem.dataset.techId;
        selectTechnology(techId);
      }
    }, true);
  }

  // Select Technology
  function selectTechnology(techId) {
    const tech = technologiesData.find(t => t.id === techId);
    if (!tech || tech.id === selectedTech.id) return;

    selectedTech = tech;
    
    // Update URL hash
    window.history.replaceState(null, null, `#${techId}`);
    
    // Update active states
    document.querySelectorAll('.tech-item').forEach(item => {
      item.classList.toggle('active', item.dataset.techId === techId);
    });

    document.querySelectorAll('.tech-all-item').forEach(item => {
      item.classList.toggle('active', item.dataset.techId === techId);
    });

    // Re-render featured card with animation
    const featuredCard = document.getElementById('techFeaturedCard');
    if (featuredCard) {
      featuredCard.style.opacity = '0';
      featuredCard.style.transform = 'translateY(20px) scale(0.95)';
      
      setTimeout(() => {
        renderFeaturedCard();
        setTimeout(() => {
          featuredCard.style.opacity = '1';
          featuredCard.style.transform = 'translateY(0) scale(1)';
        }, 50);
      }, 200);
    }

    // Scroll to technology section
    scrollToTechnology(techId);
  }

  // Scroll to Technology Section
  function scrollToTechnology(techId) {
    const techSection = document.querySelector('.tech-section');
    if (techSection) {
      const offset = 100; // Offset for fixed navbar
      const elementPosition = techSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
