const projectOrder = [
  'ticketing-system',
  'norightway',
  'chem-publishers',
  'jb-bespoke',
  'urgent-vet',
  'hen-haus',
  'fairway',
  'leadsavvy',
  'ims-ft',
  'tradie-ladie',
  'tech-effect',
  'thryve-sync',
  'fcb-connect'
];

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get('id');

  if (!projectId || !projectsData[projectId]) {
    window.location.href = 'portfolio.html';
    return;
  }

  const project = projectsData[projectId];
  const currentIndex = projectOrder.indexOf(projectId);

  // Hero Section
  document.getElementById('hero-image').src = project.heroImage;
  document.getElementById('hero-image').alt = project.title;
  document.getElementById('hero-gradient').style.background = project.gradient;
  document.getElementById('project-category').textContent = project.category;
  document.getElementById('project-title').textContent = project.title;
  document.getElementById('project-description').textContent = project.description;
  document.getElementById('project-client').textContent = project.client;
  document.getElementById('project-date').textContent = project.date;
  document.getElementById('project-duration').textContent = project.duration;
  
  const websiteLink = document.getElementById('project-website-link');
  if (project.website && project.website !== '#') {
    websiteLink.href = project.website;
  } else {
    websiteLink.style.display = 'none';
  }

  // Main Content
  document.getElementById('project-full-description').textContent = project.fullDescription;

  // Challenges
  const challengesList = document.getElementById('project-challenges');
  challengesList.innerHTML = project.challenges.map(c => `<li>${c}</li>`).join('');

  // Solutions
  const solutionsList = document.getElementById('project-solutions');
  solutionsList.innerHTML = project.solutions.map(s => `<li>${s}</li>`).join('');

  // Results
  const resultsGrid = document.getElementById('project-results');
  resultsGrid.innerHTML = project.results.map(r => `
    <div class="result-card">
      <div class="result-value">${r.value}</div>
      <div class="result-label">${r.label}</div>
    </div>
  `).join('');

  // Gallery
  const gallery = document.getElementById('project-gallery');
  gallery.innerHTML = project.gallery.map(img => `
    <div class="gallery-item">
      <img src="${img}" alt="${project.title}">
    </div>
  `).join('');

  // Sidebar
  const techList = document.getElementById('project-technologies');
  techList.innerHTML = project.technologies.map(tech => `
    <span class="tech-badge">${tech}</span>
  `).join('');

  document.getElementById('sidebar-client').textContent = project.client;
  document.getElementById('sidebar-date').textContent = project.date;
  document.getElementById('sidebar-duration').textContent = project.duration;
  document.getElementById('sidebar-role').textContent = project.role;

  // Navigation
  const prevLink = document.getElementById('prev-project-link');
  const nextLink = document.getElementById('next-project-link');

  if (currentIndex > 0) {
    const prevId = projectOrder[currentIndex - 1];
    prevLink.href = `project-details.html?id=${prevId}`;
  } else {
    prevLink.style.opacity = '0.5';
    prevLink.style.pointerEvents = 'none';
  }

  if (currentIndex < projectOrder.length - 1) {
    const nextId = projectOrder[currentIndex + 1];
    nextLink.href = `project-details.html?id=${nextId}`;
  } else {
    nextLink.style.opacity = '0.5';
    nextLink.style.pointerEvents = 'none';
  }
});
