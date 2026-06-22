(function () {
  const isSubfolder = window.location.pathname.split('/').filter(p => p && !p.includes('.')).length > 1;
  const base = isSubfolder ? '../' : '';

  const NAV_STATES = [
    'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut',
    'Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa',
    'Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan',
    'Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire',
    'New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio',
    'Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota',
    'Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia',
    'Wisconsin','Wyoming'
  ];

  function populateStates() {
    const statesGrid = document.querySelector('#nav-states-grid');
    if (!statesGrid) return;
    statesGrid.innerHTML = NAV_STATES.map(function(s) {
      const hash = s.toLowerCase().replace(/\s+/g, '-');
      const locHref = base ? base + 'location.html#' + hash : 'location.html#' + hash;
      return '<a href="' + locHref + '" class="loc-state-link">' + s + '</a>';
    }).join('');
  }

  function setupLocationsDropdown() {
    const locLink = document.querySelector('[data-dropdown="locations"]');
    const locMenu = document.querySelector('#locations-mega-menu');
    if (!locLink || !locMenu) return;
    let t;
    const show = function() { clearTimeout(t); locMenu.classList.add('active'); const nav = document.querySelector('nav'); if(nav) nav.classList.add('dropdown-open'); };
    const hide = function() { t = setTimeout(function() { locMenu.classList.remove('active'); const nav = document.querySelector('nav'); if(nav && !document.querySelector('.mega-menu.active')) nav.classList.remove('dropdown-open'); }, 150); };
    locLink.addEventListener('mouseenter', show);
    locLink.addEventListener('mouseleave', hide);
    locMenu.addEventListener('mouseenter', function() { clearTimeout(t); });
    locMenu.addEventListener('mouseleave', hide);
  }

  fetch(base + 'components/navbar.html')
    .then(function(r) { return r.text(); })
    .then(function(html) {
      if (base) {
        html = html.replace(/(href|src)="(?!http|#|\/\/|data:|mailto:)([^"]+)"/g,
          function(_, attr, path) { return attr + '="' + base + path + '"'; });
      }
      const placeholder = document.getElementById('navbar');
      if (placeholder) {
        placeholder.outerHTML = html;
      } else {
        document.body.insertAdjacentHTML('afterbegin', html);
      }

      // Setup mobile dropdown toggle
      window.toggleMobileDropdown = function(id) {
        var el = document.getElementById(id);
        if (el) el.style.display = el.style.display === 'block' ? 'none' : 'block';
      };

      // Populate states grid
      populateStates();

      // Setup locations hover dropdown directly
      setupLocationsDropdown();

      // Re-initialize Navigation class if available
      if (typeof Navigation !== 'undefined') {
        new Navigation();
      } else {
        // Navigation not yet loaded, wait for it
        document.addEventListener('DOMContentLoaded', function() {
          if (typeof Navigation !== 'undefined') new Navigation();
        });
        // Also try after short delay as fallback
        setTimeout(function() {
          if (typeof Navigation !== 'undefined') new Navigation();
          setupLocationsDropdown();
          populateStates();
        }, 100);
      }
    });
})();
