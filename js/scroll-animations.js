// Scroll-based animations using Intersection Observer
// Matches React Framer Motion whileInView behavior

document.addEventListener('DOMContentLoaded', function() {
  // Create Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add in-view class to trigger animations
        entry.target.classList.add('in-view');
        
        // Optional: Stop observing after animation triggers (once: true behavior)
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe uiverse section elements
  const uiverseRight = document.querySelector('.uiverse-right');
  const uiverseFeatures = document.querySelectorAll('.uiverse-feature');
  const uiverseBtn = document.querySelector('.uiverse-btn');

  if (uiverseRight) observer.observe(uiverseRight);
  uiverseFeatures.forEach(feature => observer.observe(feature));
  if (uiverseBtn) observer.observe(uiverseBtn);

  // Observe other animated elements
  const fadeInElements = document.querySelectorAll('.fade-in');
  fadeInElements.forEach(el => observer.observe(el));

  // Observe service cards
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => observer.observe(card));

  // Observe portfolio cards
  const portfolioCards = document.querySelectorAll('.portfolio-card');
  portfolioCards.forEach(card => observer.observe(card));

  // Observe about section
  const aboutContent = document.querySelector('.about-content');
  const statsCard = document.querySelector('.stats-card-wrapper');
  if (aboutContent) observer.observe(aboutContent);
  if (statsCard) observer.observe(statsCard);

  // Observe contact section
  const contactInfo = document.querySelector('.contact-info');
  const contactVisual = document.querySelector('.contact-visual');
  if (contactInfo) observer.observe(contactInfo);
  if (contactVisual) observer.observe(contactVisual);
});
