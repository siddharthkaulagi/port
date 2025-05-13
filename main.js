// Wait for the document to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();
  
  // Mobile menu functionality
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navMenu = document.querySelector('.nav-menu');
  
  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      
      // Change icon from bars to X
      const icon = this.querySelector('i');
      if (icon.classList.contains('fa-bars')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  }
  
  // Close mobile menu when clicking a nav link
  const navLinks = document.querySelectorAll('.nav-menu a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  });
  
  // Update active menu item on scroll
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-menu a');
  
  window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    
    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href').substring(1) === current) {
        item.classList.add('active');
      }
    });
    
    // Add scrolled class to header for styling
    const header = document.querySelector('.header');
    if (pageYOffset > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  // Animate skill bars when they come into view
  const skillBars = document.querySelectorAll('.skill-progress .progress');
  const animateSkillBars = function() {
    skillBars.forEach(bar => {
      const barTop = bar.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (barTop < windowHeight - 100) {
        const width = bar.style.width;
        bar.style.width = "0";
        setTimeout(() => {
          bar.style.width = width;
        }, 100);
      }
    });
  };
  
  // Animate elements when they come into view
  const animateElements = function() {
    const elements = document.querySelectorAll('.fact, .timeline-item, .project-card, .education-card, .contact-item, .section-header');
    elements.forEach(element => {
      if (isElementInViewport(element) && !element.classList.contains('visible')) {
        element.classList.add('fade-in', 'visible');
      }
    });
  };
  
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
    );
  }
  
  // Add animation classes initially
  animateElements();
  animateSkillBars();
  
  // Add animation classes on scroll
  window.addEventListener('scroll', function() {
    animateElements();
    animateSkillBars();
  });
  
  // Contact form submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Here you would normally send the form data to a server
      // For this demo, we'll just simulate a successful submission
      
      const formData = new FormData(contactForm);
      const formEntries = Object.fromEntries(formData.entries());
      
      // Log form data to console (for demonstration purposes)
      console.log('Form submitted with data:', formEntries);
      
      // Show success message
      const formButton = contactForm.querySelector('button[type="submit"]');
      const originalText = formButton.textContent;
      formButton.textContent = 'Message Sent!';
      formButton.classList.add('success');
      formButton.disabled = true;
      
      // Reset form after a delay
      setTimeout(() => {
        contactForm.reset();
        formButton.textContent = originalText;
        formButton.classList.remove('success');
        formButton.disabled = false;
      }, 3000);
    });
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
});

// Add a small loading animation
window.addEventListener('load', function() {
  document.body.classList.add('loaded');
});