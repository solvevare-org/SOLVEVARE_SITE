// Back to Top Button Functionality
(function() {
  'use strict';

  // Create back to top button
  function createBackToTopButton() {
    const button = document.createElement('div');
    button.className = 'back-to-top';
    button.innerHTML = `
      <button 
        class="back-to-top-btn" 
        aria-label="Scroll to top" 
        title="Back to top"
      >
        <svg class="back-to-top-icon" viewBox="0 0 24 24">
          <line x1="12" y1="19" x2="12" y2="5"></line>
          <polyline points="5 12 12 5 19 12"></polyline>
        </svg>
      </button>
    `;
    document.body.appendChild(button);
    return button;
  }

  // Initialize
  function init() {
    const backToTop = createBackToTopButton();
    const btn = backToTop.querySelector('.back-to-top-btn');

    // Show/hide button on scroll
    function toggleVisibility() {
      if (window.scrollY > 320) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }

    // Scroll to top
    function scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }

    // Event listeners
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    btn.addEventListener('click', scrollToTop);

    // Initial check
    toggleVisibility();
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
