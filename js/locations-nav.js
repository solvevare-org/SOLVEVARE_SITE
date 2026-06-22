// Populate Locations mega-menu nav states grid on all pages
(function () {
  const stateNames = [
    'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut',
    'Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa',
    'Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan',
    'Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada',
    'New Hampshire','New Jersey','New Mexico','New York','North Carolina',
    'North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island',
    'South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont',
    'Virginia','Washington','West Virginia','Wisconsin','Wyoming'
  ];

  function populate() {
    const navGrid = document.getElementById('nav-states-grid');
    if (!navGrid || navGrid.children.length > 0) return; // already filled (location.html fills it inline)
    const inSubfolder = window.location.pathname.split('/').filter(Boolean).length > 1;
    const base = inSubfolder ? '../location.html' : 'location.html';
    navGrid.innerHTML = stateNames.map(s => {
      const hash = s.toLowerCase().replace(/\s+/g, '-');
      return `<a href="${base}#${hash}" class="loc-state-link">${s}</a>`;
    }).join('');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', populate);
  } else {
    populate();
  }
})();
