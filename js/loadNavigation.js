// Load Navigation Component Dynamically
function loadNavigation() {
  const navHTML = `
    <!-- Navigation with Mega Menus -->
    <nav>
      <div class="nav-container">
        <!-- Left Navigation Links (Desktop) -->
        <div class="nav-left">
          <!-- Home with Dropdown -->
          <a href="index.html" class="nav-link" data-dropdown="home">
            Home
          </a>

          <!-- Services with Dropdown -->
          <a href="services.html" class="nav-link" data-dropdown="services">
            Services <span>›</span>
          </a>

          <!-- Industries -->
          <a href="industries.html" class="nav-link" data-dropdown="industries">
            Industries <span>›</span>
          </a>

          <!-- Technologies -->
          <a href="technologies.html" class="nav-link" data-dropdown="technologies">
            Technologies <span>›</span>
          </a>

          <!-- Portfolio -->
          <a href="portfolio.html" class="nav-link">
            Portfolio
          </a>
        </div>

        <!-- Mobile Menu Button -->
        <button class="mobile-menu-btn" aria-label="Toggle menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <use href="#icon-menu"></use>
          </svg>
        </button>

        <!-- Center Logo -->
        <a href="index.html" class="nav-logo">
          <img src="assets/favicon.png" alt="Solvevare Logo">
        </a>

        <!-- Right Actions -->
        <div class="nav-right">
          <button class="btn-donate" onclick="window.location.href='contact.html'">
            Book a meet
          </button>
        </div>
      </div>

      <!-- Home Mega Menu -->
      <div class="mega-menu" id="home-mega-menu">
        <div class="mega-menu-container">
          <div class="home-mega-grid">
            <div>
              <p class="home-mega-desc">
                In our company, we're not just IT professionals. We foster a flexible, forward-thinking environment to meet client needs, earn trust, and grow expertise.
              </p>
            </div>
            <div class="home-mega-links">
              <div>
                <a href="about.html" class="home-mega-link">About Us</a>
                <a href="contact.html" class="home-mega-link">Contacts</a>
              </div>
              <div>
                <a href="#" class="home-mega-link">Blog</a>
              </div>
            </div>
            <div>
              <div class="testimonial-card">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" style="color: #94a3b8; margin-bottom: 1rem;">
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" fill="currentColor" />
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" fill="currentColor" />
                </svg>
                <p class="testimonial-quote">
                  "They deliver what they promise, and I can't say that about other companies I've worked with."
                </p>
                <div class="testimonial-author">
                  <div class="testimonial-avatar">EH</div>
                  <div>
                    <div class="testimonial-name">Eran Harel</div>
                    <div class="testimonial-role">CTO of Bos-Dimex</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Services Mega Menu -->
      <div class="mega-menu" id="services-mega-menu">
        <div class="mega-menu-container">
          <div class="services-mega-grid">
            <div>
              <div class="services-list-header">
                <span class="services-list-icon">
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                    <rect x="3" y="3" width="18" height="18" rx="4" fill="#00E6FB" fill-opacity="0.15" />
                    <path d="M8 8h8v8H8V8z" fill="#00E6FB" />
                  </svg>
                </span>
                All Services
              </div>
              <div class="services-grid">
                <a href="service/detail.html?id=1" class="service-link">Web Development</a>
                <a href="service/detail.html?id=2" class="service-link">App Development</a>
                <a href="service/detail.html?id=3" class="service-link">Desktop & Cross-Platform Apps</a>
                <a href="service/detail.html?id=4" class="service-link">Cloud & DevOps</a>
                <a href="service/detail.html?id=5" class="service-link">Networking & Infrastructure</a>
                <a href="service/detail.html?id=6" class="service-link">Database & Data Engineering</a>
                <a href="service/detail.html?id=7" class="service-link">Product & UX Design</a>
                <a href="service/detail.html?id=8" class="service-link">Custom Software & Integrations</a>
                <a href="service/detail.html?id=9" class="service-link">Automation & Integration</a>
              </div>
            </div>
            <div class="partnership-card">
              <p class="partnership-header">Our Partnerships</p>
              <div class="partnership-title">
                <div class="microsoft-logo">
                  <span style="background: #F25022; width: 12px; height: 12px;"></span>
                  <span style="background: #7FBA00; width: 12px; height: 12px;"></span>
                  <span style="background: #00A4EF; width: 12px; height: 12px;"></span>
                  <span style="background: #FFB900; width: 12px; height: 12px;"></span>
                </div>
                <span class="partnership-name">Microsoft</span>
              </div>
              <ul class="partnership-list">
                <li class="partnership-item">
                  <span>AI Business Solutions</span>
                  <span>→</span>
                </li>
                <li class="partnership-item">
                  <span>Cloud & AI Platforms</span>
                  <span>→</span>
                </li>
                <li class="partnership-item">
                  <span>Security (Azure)</span>
                  <span>→</span>
                </li>
              </ul>
              <div class="partnership-footer">
                <span class="partnership-label">Cloud & AI ecosystem</span>
                <div class="partnership-tags">
                  <span class="partnership-tag">Google Cloud</span>
                  <span class="partnership-tag aws">AWS</span>
                  <span class="partnership-tag">Databricks</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Industries Mega Menu -->
      <div class="mega-menu" id="industries-mega-menu">
        <div class="mega-menu-container">
          <div class="industries-mega-grid">
            <div class="industries-list">
              <button class="industry-item active" data-industry="healthcare">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z"/>
                </svg>
                <span>Healthcare</span>
              </button>
              <button class="industry-item" data-industry="education">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
                </svg>
                <span>Education</span>
              </button>
              <button class="industry-item" data-industry="realestate">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                </svg>
                <span>Real Estate</span>
              </button>
              <button class="industry-item" data-industry="blockchain">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm-1 16.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
                <span>Blockchain</span>
              </button>
              <button class="industry-item" data-industry="fintech">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
                </svg>
                <span>Fintech</span>
              </button>
              <button class="industry-item" data-industry="logistics">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
                </svg>
                <span>Logistics</span>
              </button>
            </div>
            <div class="industry-services">
              <h3 class="industry-services-title">Healthcare Services</h3>
              <ul class="industry-services-list">
                <li>
                  <a href="#" class="industry-service-link">Custom Healthcare Software Development</a>
                  <p class="industry-service-desc">Build electronic health records (EHR), clinician portals, and tailored clinical workflows that comply with healthcare regulations.</p>
                </li>
                <li>
                  <a href="#" class="industry-service-link">Telemedicine App Development</a>
                  <p class="industry-service-desc">Secure video consultations, appointment booking, and messaging for remote patient care.</p>
                </li>
                <li>
                  <a href="#" class="industry-service-link">mHealth App Development</a>
                  <p class="industry-service-desc">Patient-facing mobile apps for monitoring, engagement, and medication reminders.</p>
                </li>
                <li>
                  <a href="#" class="industry-service-link">Medical Device Software Development</a>
                  <p class="industry-service-desc">Embedded and companion software design with regulatory readiness for medical devices.</p>
                </li>
                <li>
                  <a href="#" class="industry-service-link">Healthcare Application Development</a>
                  <p class="industry-service-desc">Custom web and mobile solutions for insurers, providers and patients focused on usability and security.</p>
                </li>
                <li>
                  <a href="#" class="industry-service-link">Healthcare Consulting</a>
                  <p class="industry-service-desc">Clinical workflow analysis, integration strategy and compliance advisory for health IT projects.</p>
                </li>
              </ul>
            </div>
            <div class="industry-case-study">
              <h3 class="case-study-title">Web App for Printing Customized 3D Models for Surgery Supply</h3>
              <p class="case-study-desc">Responsive web app for managing 3D printing workflow via 3D viewer.</p>
              <div class="case-study-image">
                <img src="assets/Screenshot 2025-12-15 203923.png" alt="Healthcare Case Study">
              </div>
              <a href="#" class="case-study-link">
                View Case Study
                <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Technologies Mega Menu -->
      <div class="mega-menu" id="technologies-mega-menu">
        <div class="mega-menu-container">
          <div class="technologies-mega-grid">
            <div class="technologies-list">
              <h3 class="technologies-title">All Technologies</h3>
              <div class="technologies-grid">
                <button class="technology-item active" data-tech="react">React JS</button>
                <button class="technology-item" data-tech="flutter">Flutter</button>
                <button class="technology-item" data-tech="python">Python (Django)</button>
                <button class="technology-item" data-tech="node">Node.Js</button>
                <button class="technology-item" data-tech="dotnet">.NET</button>
                <button class="technology-item" data-tech="reactnative">React Native</button>
                <button class="technology-item" data-tech="aws">AWS</button>
                <button class="technology-item" data-tech="azure">Azure</button>
                <button class="technology-item" data-tech="gcp">GCP</button>
                <button class="technology-item" data-tech="datascience">Data Science</button>
                <button class="technology-item" data-tech="ml">Machine Learning</button>
                <button class="technology-item" data-tech="blockchain">Blockchain</button>
              </div>
            </div>
            <div class="technology-featured">
              <div class="tech-card">
                <div class="tech-card-header">
                  <h3 class="tech-card-title">React Native</h3>
                  <div class="tech-icon">
                    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/>
                    </svg>
                  </div>
                </div>
                <p class="tech-card-desc">
                  Create native mobile apps for iOS and Android using React. Share code across platforms.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div class="mobile-menu">
        <div class="mobile-menu-content">
          <div class="mobile-menu-item">
            <a href="index.html" class="mobile-menu-link">Home</a>
          </div>
          <div class="mobile-menu-item">
            <a href="services.html" class="mobile-menu-link">Services</a>
          </div>
          <div class="mobile-menu-item">
            <a href="portfolio.html" class="mobile-menu-link">Portfolio</a>
          </div>
          <div class="mobile-menu-item">
            <a href="about.html" class="mobile-menu-link">About</a>
          </div>
          <div class="mobile-menu-item">
            <a href="contact.html" class="mobile-menu-link">Contact</a>
          </div>
          <div class="mobile-menu-item">
            <button class="btn-donate" style="display: block; width: 100%; margin-top: 1rem;" onclick="window.location.href='contact.html'">
              Book a meet
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- SVG Icons -->
    <svg style="display: none;">
      <symbol id="icon-menu" viewBox="0 0 24 24">
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      </symbol>
      <symbol id="icon-x" viewBox="0 0 24 24">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </symbol>
    </svg>
  `;

  // Insert navigation at the beginning of body
  document.body.insertAdjacentHTML('afterbegin', navHTML);
}

// Load navigation when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadNavigation);
} else {
  loadNavigation();
}
