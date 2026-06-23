// Navigation Scroll Effect
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// Active Navigation Link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navItems = document.querySelectorAll('.nav-links a');

navItems.forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// Testimonials Carousel - Exact match to React version
let activeTestimonialIndex = 1; // Start with second card (Marcus Johnson)
const totalTestimonials = 5;

function getCardPosition(index) {
  let diff = index - activeTestimonialIndex;
  
  // Normalize the difference to handle circular array
  if (diff > totalTestimonials / 2) {
    diff -= totalTestimonials;
  } else if (diff < -totalTestimonials / 2) {
    diff += totalTestimonials;
  }
  
  if (diff === 0) return 'active';
  if (diff === 1) return 'right';
  if (diff === -1) return 'left';
  return 'hidden';
}

function updateTestimonialPositions() {
  const cards = document.querySelectorAll('.testimonials .testimonial-card');
  cards.forEach((card, index) => {
    const position = getCardPosition(index);
    card.setAttribute('data-position', position);
    
    // Update active class
    if (position === 'active') {
      card.classList.add('active');
    } else {
      card.classList.remove('active');
    }
  });
}

function handlePreviousTestimonial() {
  activeTestimonialIndex = (activeTestimonialIndex === 0) 
    ? totalTestimonials - 1 
    : activeTestimonialIndex - 1;
  updateTestimonialPositions();
}

function handleNextTestimonial() {
  activeTestimonialIndex = (activeTestimonialIndex === totalTestimonials - 1) 
    ? 0 
    : activeTestimonialIndex + 1;
  updateTestimonialPositions();
}

// Initialize testimonials on page load
function initTestimonials() {
  const prevBtn = document.querySelector('.testimonials .prev-btn');
  const nextBtn = document.querySelector('.testimonials .next-btn');

  if (prevBtn) prevBtn.addEventListener('click', handlePreviousTestimonial);
  if (nextBtn) nextBtn.addEventListener('click', handleNextTestimonial);
  
  // Set initial positions
  updateTestimonialPositions();
}

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      source: document.getElementById('source').value,
      interest: document.getElementById('interest').value,
      message: document.getElementById('message').value
    };

    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
      // Simulate form submission (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      alert('Message sent successfully! We will get back to you soon.');
      contactForm.reset();
      submitBtn.textContent = 'Message Sent!';
      
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 2000);
    } catch (error) {
      alert('Failed to send message. Please try again.');
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Hero Video Auto-replay with Delay
const heroVideo = document.querySelector('.hero-video');
if (heroVideo) {
  heroVideo.addEventListener('ended', () => {
    setTimeout(() => {
      heroVideo.play();
    }, 2000);
  });
}

// Intersection Observer for Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .portfolio-card, .feature-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Logo Scroll Animation - Exact match to React version
function initLogoScroll() {
  const scrollContainers = document.querySelectorAll('.logos-scroll');
  
  scrollContainers.forEach(scrollContainer => {
    if (!scrollContainer) return;
    
    let scrollPosition = 0;
    
    const scroll = () => {
      scrollPosition += 0.5;
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0;
      }
      scrollContainer.scrollLeft = scrollPosition;
    };
    
    const intervalId = setInterval(scroll, 20);
    
    // Store interval ID for cleanup if needed
    scrollContainer.setAttribute('data-scroll-interval', intervalId);
  });
}

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initLogoScroll();
    initTestimonials();
    initServiceCardRouting();
  });
} else {
  initLogoScroll();
  initTestimonials();
  initServiceCardRouting();
}

// Service Card Routing - Click to navigate to service detail pages
function initServiceCardRouting() {
  const serviceCards = document.querySelectorAll('.services-page-grid .service-card');
  
  serviceCards.forEach((card, index) => {
    card.addEventListener('click', () => {
      window.location.href = `service/detail.html?id=${index + 1}`;
    });
  });
}

// Mobile Dropdown Toggle - For mobile menu
function toggleMobileDropdown(dropdownId) {
  const dropdown = document.getElementById(dropdownId);
  if (!dropdown) return;

  const isNowOpen = !dropdown.classList.contains('active');
  dropdown.classList.toggle('active', isNowOpen);

  // Toggle 'open' on the parent .mobile-menu-row for arrow rotation & color
  const arrowBtn = document.querySelector(`[data-toggle="${dropdownId}"]`);
  if (arrowBtn) {
    const row = arrowBtn.closest('.mobile-menu-row');
    if (row) row.classList.toggle('open', isNowOpen);
  }
}


