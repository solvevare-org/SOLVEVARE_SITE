// Icon SVG paths
const iconPaths = {
  Heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
  GraduationCap: '<path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>',
  Home: '<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  Box: '<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>',
  DollarSign: '<line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
  Truck: '<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>'
};

let selectedIndustry = industriesData[0];

// Render industries list
function renderIndustriesList() {
  const listContainer = document.getElementById('industriesList');
  
  listContainer.innerHTML = industriesData.map(industry => {
    const isSelected = selectedIndustry.id === industry.id;
    return `
      <div class="industry-item ${isSelected ? 'selected' : ''}" 
           data-industry-id="${industry.id}"
           onclick="selectIndustry('${industry.id}')">
        <div class="industry-item-content">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            ${iconPaths[industry.icon]}
          </svg>
          <span>${industry.name}</span>
        </div>
        <a href="industry-details.html?id=${industry.id}" class="industry-view-link" onclick="event.stopPropagation()">
          View
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>
    `;
  }).join('');
}

// Render industry details
function renderIndustryDetails() {
  const detailsContainer = document.getElementById('industryDetails');
  
  detailsContainer.innerHTML = `
    <h3>${selectedIndustry.name}</h3>
    <div class="industry-services">
      ${selectedIndustry.services.map(service => `
        <div class="industry-service-card">
          <h4>${service.title}</h4>
          <p>${service.description}</p>
        </div>
      `).join('')}
    </div>
    ${selectedIndustry.caseStudy ? `
      <a href="${selectedIndustry.caseStudy.link}" class="learn-more-link">
        Learn more
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </a>
    ` : ''}
  `;
  
  // Trigger animation
  detailsContainer.classList.remove('fade-in');
  void detailsContainer.offsetWidth; // Force reflow
  detailsContainer.classList.add('fade-in');
}

// Select industry
function selectIndustry(industryId) {
  selectedIndustry = industriesData.find(ind => ind.id === industryId);
  renderIndustriesList();
  renderIndustryDetails();
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  renderIndustriesList();
  renderIndustryDetails();
  
  // Smooth scroll for hero button
  document.querySelector('.industries-hero a[href="#industries"]')?.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('#industries').scrollIntoView({ behavior: 'smooth' });
  });
});
