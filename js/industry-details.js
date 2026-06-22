// Get industry ID from URL
function getIndustryIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

// Find industry data
function getIndustryData(id) {
  return industriesData.find(industry => industry.id === id);
}

// Populate page with industry data
function populateIndustryDetails() {
  const industryId = getIndustryIdFromURL();
  
  if (!industryId) {
    window.location.href = 'industries.html';
    return;
  }

  const industry = getIndustryData(industryId);

  if (!industry) {
    document.getElementById('app').innerHTML = `
      <div class="pt-20 min-h-screen bg-gradient-to-b from-[#050509] via-[#050815] to-[#030712] text-white text-center py-20">
        <h1 class="text-4xl font-bold">Industry not found</h1>
        <a href="industries.html" class="text-[#00BCD4] hover:text-[#9C27B0] mt-4 inline-block">
          Back to Industries
        </a>
      </div>
    `;
    return;
  }

  // Update page title
  document.title = `${industry.name} - Solvevare`;

  // Update hero section
  document.getElementById('industryName').textContent = industry.name;
  document.getElementById('industrySubtitle').textContent = `We build tailored solutions for the ${industry.name} sector.`;
  document.getElementById('servicesCount').textContent = `${industry.services.length} services`;
  document.getElementById('industryDescription').textContent = 
    industry.caseStudy?.description || 
    `From compliance and workflows to customer-facing experiences, we deliver secure and effective digital products for the ${industry.name.toLowerCase()} industry.`;

  // Update highlights
  document.getElementById('highlightServices').textContent = industry.services.length;
  document.getElementById('highlightCaseStudies').textContent = industry.caseStudy ? '1+' : '—';

  // Update services intro
  document.getElementById('servicesIntro').textContent = 
    `Below are the primary services we provide for the ${industry.name} industry. Each service includes a short explanation and a direct way to contact us about that offering.`;

  // Update CTA text
  document.getElementById('ctaText').textContent = 
    `If you'd like to discuss the ${industry.name} services above or explore a custom solution, our team is ready to help.`;

  // Populate services grid
  const servicesGrid = document.getElementById('servicesGrid');
  servicesGrid.innerHTML = '';

  industry.services.forEach((service, index) => {
    const serviceCard = document.createElement('div');
    serviceCard.className = 'service-card';
    serviceCard.innerHTML = `
      <div class="flex items-start gap-3">
        <div class="service-card-dot"></div>
        <div>
          <h3 class="service-card-title">${service.title}</h3>
          <p class="service-card-description">${service.description}</p>
          <div class="mt-4">
            <a href="contact.html?industry=${industry.id}&service=${encodeURIComponent(service.title)}" class="service-card-link">
              Discuss this service
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    `;
    servicesGrid.appendChild(serviceCard);
  });

  // Handle case study section
  if (industry.caseStudy) {
    document.getElementById('caseStudyBadge').style.display = 'inline';
    document.getElementById('caseStudyLink').style.display = 'inline-flex';
    document.getElementById('caseStudyLink').href = industry.caseStudy.link;
    
    // Set hero media image with error handling
    const heroImage = document.getElementById('caseStudyImage');
    heroImage.src = industry.caseStudy.image;
    heroImage.alt = industry.caseStudy.title;
    heroImage.onerror = function() {
      this.style.display = 'none';
      this.classList.add('error');
      const placeholder = document.createElement('div');
      placeholder.className = 'media-image error';
      placeholder.textContent = 'No image available';
      this.parentNode.insertBefore(placeholder, this);
    };
    
    document.getElementById('caseStudyTitle').textContent = industry.caseStudy.title;
    document.getElementById('caseStudyDesc').textContent = industry.caseStudy.description;

    // Case study card
    document.getElementById('caseStudyCard').style.display = 'block';
    document.getElementById('caseStudyCardTitle').textContent = `Case Study: ${industry.caseStudy.title}`;
    document.getElementById('caseStudyCardDesc').textContent = industry.caseStudy.description;
    
    // Set case study card image with error handling
    const cardImage = document.getElementById('caseStudyCardImage');
    cardImage.src = industry.caseStudy.image;
    cardImage.alt = industry.caseStudy.title;
    cardImage.onerror = function() {
      this.style.display = 'none';
      this.classList.add('error');
      const placeholder = document.createElement('div');
      placeholder.className = 'case-study-image error';
      placeholder.textContent = 'No image available';
      this.parentNode.insertBefore(placeholder, this);
    };
    
    document.getElementById('caseStudyCardLink').href = industry.caseStudy.link;
  } else {
    document.getElementById('caseStudyBadge').style.display = 'none';
    document.getElementById('caseStudyLink').style.display = 'none';
    document.getElementById('caseStudyCard').style.display = 'none';
  }

  // Load footer
  loadFooter();
}

// Load footer
function loadFooter() {
  fetch('includes/navigation.html')
    .then(response => response.text())
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const footer = doc.querySelector('footer');
      if (footer) {
        document.getElementById('footer').innerHTML = footer.innerHTML;
      }
    })
    .catch(error => console.error('Error loading footer:', error));
}

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', populateIndustryDetails);
} else {
  populateIndustryDetails();
}
