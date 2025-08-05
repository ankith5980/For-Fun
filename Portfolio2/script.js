// DOM Elements
const header = document.getElementById('header');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const nav = document.querySelector('.nav');
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

// Particle System
class ParticleSystem {
  constructor() {
    this.container = document.getElementById('particles-container');
    this.particleCount = 50;
    this.particles = [];
    this.init();
  }

  init() {
    for (let i = 0; i < this.particleCount; i++) {
      this.createParticle();
    }
  }

  createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random positioning
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    particle.style.left = `${left}%`;
    particle.style.top = `${top}%`;
    
    // Random animation duration
    const duration = 6 + Math.random() * 8;
    const delay = Math.random() * 5;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;
    
    // Color variation
    const colors = ['#6366f1', '#06b6d4', '#8b5cf6'];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    this.container.appendChild(particle);
    this.particles.push(particle);
  }
}

// Smooth Scrolling
class SmoothScroller {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          const headerHeight = header.offsetHeight;
          const targetPosition = target.offsetTop - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }
}

// Header Scroll Effect
class HeaderScroll {
  constructor() {
    this.init();
  }

  init() {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }
}

// Mobile Menu
class MobileMenu {
  constructor() {
    this.isOpen = false;
    this.init();
  }

  init() {
    mobileMenuBtn.addEventListener('click', () => {
      this.toggleMenu();
    });

    // Close menu when clicking on nav links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        this.closeMenu();
      });
    });
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.openMenu();
    } else {
      this.closeMenu();
    }
  }

  openMenu() {
    nav.style.display = 'flex';
    nav.style.flexDirection = 'column';
    nav.style.position = 'absolute';
    nav.style.top = '100%';
    nav.style.left = '0';
    nav.style.right = '0';
    nav.style.background = 'rgba(15, 23, 42, 0.98)';
    nav.style.backdropFilter = 'blur(20px)';
    nav.style.borderTop = '1px solid var(--border-color)';
    nav.style.padding = '1rem';
    nav.style.gap = '1rem';
  }

  closeMenu() {
    nav.style.display = '';
    nav.style.flexDirection = '';
    nav.style.position = '';
    nav.style.top = '';
    nav.style.left = '';
    nav.style.right = '';
    nav.style.background = '';
    nav.style.backdropFilter = '';
    nav.style.borderTop = '';
    nav.style.padding = '';
    nav.style.gap = '';
    this.isOpen = false;
  }
}

// Intersection Observer for Animations
class ScrollAnimations {
  constructor() {
    this.init();
  }

  init() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('loading');
        }
      });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.project-card, .skill-category, .section-header').forEach(el => {
      observer.observe(el);
    });
  }
}

// Contact Form Handler
class ContactForm {
  constructor() {
    this.init();
  }

  init() {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubmit();
    });
  }

  async handleSubmit() {
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
      // Send to backend
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        this.showMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
        contactForm.reset();
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error:', error);
      this.showMessage('Failed to send message. Please try again or email me directly.', 'error');
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  }

  showMessage(message, type) {
    formMessage.innerHTML = `<div class="message ${type}">${message}</div>`;
    formMessage.scrollIntoView({ behavior: 'smooth' });
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      formMessage.innerHTML = '';
    }, 5000);
  }
}

// Mouse Movement Effects
class MouseEffects {
  constructor() {
    this.init();
  }

  init() {
    document.addEventListener('mousemove', (e) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      
      // Parallax effect on background
      const gradientBg = document.querySelector('.gradient-bg');
      if (gradientBg) {
        gradientBg.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
      }
      
      // Particle movement
      const particles = document.querySelectorAll('.particle');
      particles.forEach((particle, index) => {
        const speed = (index % 3 + 1) * 0.5;
        particle.style.transform = `translate(${x * 30 * speed}px, ${y * 30 * speed}px)`;
      });
    });
  }
}

// Typing Animation
class TypingAnimation {
  constructor() {
    this.init();
  }

  init() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
      const text = heroTitle.textContent;
      heroTitle.textContent = '';
      
      let i = 0;
      const typeWriter = () => {
        if (i < text.length) {
          heroTitle.textContent += text.charAt(i);
          i++;
          setTimeout(typeWriter, 100);
        }
      };
      
      // Start typing after a short delay
      setTimeout(typeWriter, 500);
    }
  }
}

// Performance Optimizations
class PerformanceOptimizer {
  constructor() {
    this.init();
  }

  init() {
    // Throttle scroll events
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Handle scroll events here
          ticking = false;
        });
        ticking = true;
      }
    });

    // Lazy load images
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => {
      if (img.dataset.src) {
        imageObserver.observe(img);
      }
    });
  }
}

// Initialize all classes when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ParticleSystem();
  new SmoothScroller();
  new HeaderScroll();
  new MobileMenu();
  new ScrollAnimations();
  new ContactForm();
  new MouseEffects();
  new TypingAnimation();
  new PerformanceOptimizer();
});

// Utility Functions
const utils = {
  // Debounce function
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Throttle function
  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  // Format date
  formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  },

  // Validate email
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
};

// Export for use in other modules (if needed)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ParticleSystem,
    SmoothScroller,
    HeaderScroll,
    MobileMenu,
    ScrollAnimations,
    ContactForm,
    MouseEffects,
    TypingAnimation,
    PerformanceOptimizer,
    utils
  };
} 