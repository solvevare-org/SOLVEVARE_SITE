(function () {
  'use strict';

  function toKebab(str) {
    return str.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  }

  function getCurrentKey() {
    // Derive from canonical link: .../locations/{state-slug}-in-{city-slug}.html
    var canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) return null;
    var m = canonical.href.match(/\/locations\/([^/]+)-in-([^/]+)\.html/);
    if (!m) return null;
    // Reconstruct the locationsData key format (state_slug|city_slug with spaces)
    // The JSON key uses the original state_slug and city_slug values from locationsData
    // which may have spaces — but we stored them as kebab in the JSON key too.
    // Key format in JSON: "{state_slug}|{city_slug}" where both are original (space) values.
    // We need to reverse-lookup. Instead, store keys as kebab in JSON and match here.
    return m[1] + '|' + m[2]; // both already kebab from the filename
  }

  function render(nearby) {
    var section = document.getElementById('nearby-locations-section');
    if (!section) return;
    if (!nearby || nearby.length === 0) {
      section.style.display = 'none';
      return;
    }

    var grid = section.querySelector('.nearby-grid');
    if (!grid) return;

    grid.innerHTML = nearby.map(function (loc) {
      var href = '../locations/' + loc.state_slug + '-in-' + loc.city_slug + '.html';
      return '<a href="' + href + '" class="nearby-card">' +
        '<span class="nearby-city">' + loc.city + '</span>' +
        '<span class="nearby-state">' + loc.state + '</span>' +
        '<span class="nearby-dist">' + loc.miles + ' mi away</span>' +
        '</a>';
    }).join('');
  }

  function init() {
    var key = getCurrentKey();
    if (!key) return;

    // Resolve path relative to current page (works from /locations/ dir)
    var jsonPath = '../js/nearby-locations.json';

    var xhr = new XMLHttpRequest();
    xhr.open('GET', jsonPath, true);
    xhr.onload = function () {
      if (xhr.status !== 200) return;
      try {
        var data = JSON.parse(xhr.responseText);
        render(data[key] || []);
      } catch (e) { /* silent */ }
    };
    xhr.send();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
