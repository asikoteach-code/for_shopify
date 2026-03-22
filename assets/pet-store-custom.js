/**
 * Pet Grooming Store Custom JavaScript
 * Handles interactive elements, social proof, and UX enhancements
 */

(function () {
  'use strict';

  /**
   * Dynamic Social Proof Counter
   * Animates counter numbers on scroll
   */
  function initSocialProofCounters() {
    const counters = document.querySelectorAll('[data-counter-target]');
    
    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const finalValue = parseInt(target.dataset.counterTarget, 10);
          let currentValue = 0;
          const increment = finalValue / 50;
          const interval = 30;

          const counter = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
              target.textContent = finalValue.toLocaleString();
              clearInterval(counter);
              observer.unobserve(target);
            } else {
              target.textContent = Math.floor(currentValue).toLocaleString();
            }
          }, interval);
        }
      });
    }, observerOptions);

    counters.forEach((counter) => {
      observer.observe(counter);
    });
  }

  /**
   * Inventory Warning Display
   * Shows stock status dynamically
   */
  function initInventoryWarnings() {
    const inventoryElements = document.querySelectorAll('[data-inventory]');
    
    inventoryElements.forEach((element) => {
      const stock = parseInt(element.dataset.inventory, 10);
      
      if (stock < 5 && stock > 0) {
        const warning = document.createElement('span');
        warning.className = 'inventory-warning';
        warning.textContent = `Only ${stock} left in stock!`;
        element.appendChild(warning);
      } else if (stock === 0) {
        const outOfStock = document.createElement('span');
        outOfStock.className = 'inventory-warning';
        outOfStock.textContent = 'Out of stock';
        element.appendChild(outOfStock);
      }
    });
  }

  /**
   * Star Rating System
   * Displays and handles star ratings
   */
  function initStarRatings() {
    const ratings = document.querySelectorAll('[data-rating]');
    
    ratings.forEach((ratingContainer) => {
      const rating = parseInt(ratingContainer.dataset.rating, 10);
      let starHTML = '';
      
      for (let i = 1; i <= 5; i++) {
        starHTML += i <= rating ? '★' : '☆';
      }
      
      ratingContainer.textContent = starHTML;
      ratingContainer.classList.add('star-rating');
    });
  }

  /**
   * Sticky Add-to-Cart Bar
   * Shows CTA on scroll
   */
  function initStickyAddToCart() {
    const addToCartBtn = document.querySelector('[data-add-to-cart-btn]');
    const stickyBar = document.querySelector('[data-sticky-cta]');
    
    if (!addToCartBtn || !stickyBar) return;

    const observerOptions = {
      threshold: 0,
      rootMargin: '0px 0px 100px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          stickyBar.classList.add('visible');
        } else {
          stickyBar.classList.remove('visible');
        }
      });
    }, observerOptions);

    observer.observe(addToCartBtn);
  }

  /**
   * Testimonial Carousel
   * Simple carousel for testimonials
   */
  function initTestimonialCarousel() {
    const carousels = document.querySelectorAll('[data-testimonial-carousel]');
    
    carousels.forEach((carousel) => {
      const items = carousel.querySelectorAll('[data-testimonial-item]');
      const prevBtn = carousel.querySelector('[data-carousel-prev]');
      const nextBtn = carousel.querySelector('[data-carousel-next]');
      let currentIndex = 0;

      function showSlide(index) {
        items.forEach((item, idx) => {
          item.style.display = idx === index ? 'block' : 'none';
        });
      }

      function nextSlide() {
        currentIndex = (currentIndex + 1) % items.length;
        showSlide(currentIndex);
      }

      function prevSlide() {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        showSlide(currentIndex);
      }

      if (nextBtn) nextBtn.addEventListener('click', nextSlide);
      if (prevBtn) prevBtn.addEventListener('click', prevSlide);

      showSlide(0);
    });
  }

  /**
   * Trust Badge Animation
   * Adds entrance animation to trust elements
   */
  function initTrustBadgeAnimation() {
    const badges = document.querySelectorAll('.trust-badge');
    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'fadeInUp 0.6s ease-out';
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    badges.forEach((badge) => {
      observer.observe(badge);
    });
  }

  /**
   * Product Card Quick Add
   * Enables quick add to cart from product cards
   */
  function initQuickAdd() {
    const quickAddButtons = document.querySelectorAll('[data-quick-add]');
    
    quickAddButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const productId = btn.dataset.productId;
        const variantId = btn.dataset.variantId;
        
        // Trigger add to cart animation
        btn.classList.add('adding');
        btn.textContent = 'Adding...';
        
        // Simulate add to cart (would be actual cart logic)
        setTimeout(() => {
          btn.classList.remove('adding');
          btn.textContent = 'Added!';
          
          setTimeout(() => {
            btn.textContent = 'Add to Cart';
          }, 2000);
        }, 800);
      });
    });
  }

  /**
   * Countdown Timer
   * Displays countdown for limited-time offers
   */
  function initCountdownTimer() {
    const timers = document.querySelectorAll('[data-countdown]');
    
    timers.forEach((timer) => {
      const endTime = new Date(timer.dataset.countdown).getTime();
      
      const updateTimer = () => {
        const now = new Date().getTime();
        const timeLeft = endTime - now;
        
        if (timeLeft < 0) {
          timer.textContent = 'Offer Ended';
          timer.classList.add('expired');
          return;
        }
        
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        timer.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
      };
      
      updateTimer();
      setInterval(updateTimer, 1000);
    });
  }

  /**
   * Form Validation
   * Basic validation for email signup
   */
  function initFormValidation() {
    const forms = document.querySelectorAll('[data-validation="true"]');
    
    forms.forEach((form) => {
      form.addEventListener('submit', (e) => {
        const inputs = form.querySelectorAll('input[required]');
        let isValid = true;
        
        inputs.forEach((input) => {
          if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
          } else {
            input.classList.remove('error');
          }
        });
        
        if (!isValid) {
          e.preventDefault();
        }
      });
    });
  }

  /**
   * Smooth Scroll
   * Smooth scrolling for anchor links
   */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      });
    });
  }

  /**
   * Mobile Menu Enhancement
   * Better mobile menu handling
   */
  function initMobileMenuEnhancement() {
    const menuBtn = document.querySelector('[data-menu-toggle]');
    const menu = document.querySelector('[data-mobile-menu]');
    
    if (menuBtn && menu) {
      menuBtn.addEventListener('click', () => {
        menu.classList.toggle('visible');
        menuBtn.classList.toggle('active');
      });
      
      // Close menu when clicking on a link
      const links = menu.querySelectorAll('a');
      links.forEach((link) => {
        link.addEventListener('click', () => {
          menu.classList.remove('visible');
          menuBtn.classList.remove('active');
        });
      });
    }
  }

  /**
   * Initialize all features when DOM is ready
   */
  function init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        initSocialProofCounters();
        initInventoryWarnings();
        initStarRatings();
        initStickyAddToCart();
        initTestimonialCarousel();
        initTrustBadgeAnimation();
        initQuickAdd();
        initCountdownTimer();
        initFormValidation();
        initSmoothScroll();
        initMobileMenuEnhancement();
      });
    } else {
      // DOM is already loaded
      initSocialProofCounters();
      initInventoryWarnings();
      initStarRatings();
      initStickyAddToCart();
      initTestimonialCarousel();
      initTrustBadgeAnimation();
      initQuickAdd();
      initCountdownTimer();
      initFormValidation();
      initSmoothScroll();
      initMobileMenuEnhancement();
    }
  }

  // Start initialization
  init();
})();

// Add fadeInUp animation styles
if (!document.querySelector('style[data-custom-animations]')) {
  const style = document.createElement('style');
  style.setAttribute('data-custom-animations', '');
  style.textContent = `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .sticky-cta {
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      transform: translateY(100%);
    }
    
    .sticky-cta.visible {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
    
    input.error {
      border-color: #E74C3C !important;
      background-color: rgba(231, 76, 60, 0.05);
    }
  `;
  document.head.appendChild(style);
}
