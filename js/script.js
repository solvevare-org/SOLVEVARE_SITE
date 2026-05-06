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

// Testimonials Slider
let currentTestimonial = 0;
const testimonials = [
  {
    message: "This product has completely transformed how we work. The intuitive design and powerful features have made our team more productive than ever before.",
    name: "Sarah Mitchell",
    role: "Product Manager at TechCorp",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
  },
  {
    message: "I've tried countless solutions, but nothing comes close to this. The customer support is exceptional, and the results speak for themselves. Highly recommended!",
    name: "Marcus Johnson",
    role: "CEO at StartupHub",
    avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
  },
  {
    message: "The level of expertise and dedication shown by the team is unparalleled. They didn't just meet our expectations; they redefined them.",
    name: "Thomas Wright",
    role: "Head of Operations at Global Logistics",
    avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
  },
  {
    message: "Outstanding experience from start to finish. The attention to detail and commitment to excellence is evident in every interaction. This is the gold standard.",
    name: "Emily Chen",
    role: "Creative Director at DesignLab",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
  },
  {
    message: "Working with this platform has been a game-changer for our scalability. The architecture is solid, and the support team is always one step ahead.",
    name: "Olivia Martinez",
    role: "Technical Lead at InnovateSoft",
    avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
  }
];

function initTestimonials() {
  const slider = document.querySelector('.testimonial-slider');
  if (!slider) return;

  // Create testimonial cards
  testimonials.forEach((testimonial, index) => {
    const card = document.createElement('div');
    card.className = 'testimonial-card';
    card.innerHTML = `
      <p class="testimonial-text">"${testimonial.message}"</p>
      <div class="testimonial-author">
        <img src="${testimonial.avatar}" alt="${testimonial.name}" class="author-avatar">
        <div class="author-info">
          <h4>${testimonial.name}</h4>
          <p>${testimonial.role}</p>
        </div>
        <div class="testimonial-rating">
          <span class="star">★</span>
          <span class="star">★</span>
          <span class="star">★</span>
          <span class="star">★</span>
          <span class="star">★</span>
        </div>
      </div>
    `;
    slider.appendChild(card);
  });

  updateTestimonials();
}

function updateTestimonials() {
  const cards = document.querySelectorAll('.testimonial-card');
  cards.forEach((card, index) => {
    card.classList.remove('active', 'left', 'right', 'hidden');
    
    if (index === currentTestimonial) {
      card.classList.add('active');
    } else if (index === (currentTestimonial - 1 + testimonials.length) % testimonials.length) {
      card.classList.add('left');
    } else if (index === (currentTestimonial + 1) % testimonials.length) {
      card.classList.add('right');
    } else {
      card.classList.add('hidden');
    }
  });
}

function nextTestimonial() {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  updateTestimonials();
}

function prevTestimonial() {
  currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
  updateTestimonials();
}

// Testimonial Controls
document.addEventListener('DOMContentLoaded', () => {
  initTestimonials();

  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');

  if (prevBtn) prevBtn.addEventListener('click', prevTestimonial);
  if (nextBtn) nextBtn.addEventListener('click', nextTestimonial);
});

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

// Initialize logo scroll on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLogoScroll);
} else {
  initLogoScroll();
}
