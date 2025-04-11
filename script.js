// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');
const backToTopBtn = document.getElementById('back-to-top');
const sections = document.querySelectorAll('section');
const contactForm = document.getElementById('contact-form');

// Toggle Mobile Menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    // Toggle hamburger animation
    const bars = document.querySelectorAll('.bar');
    if (hamburger.classList.contains('active')) {
        bars[0].style.transform = 'translateY(8px) rotate(45deg)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'translateY(-8px) rotate(-45deg)';
    } else {
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    }
});

// Close menu when nav item clicked
navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        
        // Reset hamburger
        const bars = document.querySelectorAll('.bar');
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    });
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});

// Back to Top button visibility
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('active');
    } else {
        backToTopBtn.classList.remove('active');
    }
    
    // Add animation to sections when scrolled into view
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < window.innerHeight * 0.75) {
            section.classList.add('fade-in', 'active');
        }
    });
});

// Back to Top functionality
backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Initialize sections for animations
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in class to all sections
    sections.forEach(section => {
        section.classList.add('fade-in');
    });
    
    // Check if sections are in view on initial load
    setTimeout(() => {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < window.innerHeight * 0.75) {
                section.classList.add('active');
            }
        });
    }, 100);
    
    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-text h1');
    if (heroTitle) {
        heroTitle.classList.add('typing-effect');
    }
    
    // Initialize page load animation
    document.body.classList.add('page-loaded');
});

// Form submission
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic form validation
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        let isValid = true;
        
        // Clear previous error messages
        document.querySelectorAll('.error-message').forEach(msg => msg.remove());
        document.querySelectorAll('.error').forEach(field => field.classList.remove('error'));
        
        // Check required fields
        if (!name.value.trim()) {
            isValid = false;
            name.classList.add('error');
            addErrorMessage(name, 'Name is required');
        }
        
        if (!email.value.trim()) {
            isValid = false;
            email.classList.add('error');
            addErrorMessage(email, 'Email is required');
        } else if (!isValidEmail(email.value.trim())) {
            isValid = false;
            email.classList.add('error');
            addErrorMessage(email, 'Please enter a valid email');
        }
        
        if (!message.value.trim()) {
            isValid = false;
            message.classList.add('error');
            addErrorMessage(message, 'Message is required');
        }
        
        if (isValid) {
            // In a real application, you would send the form data to the server
            // For demo, we'll just show a success message
            const formSuccess = document.createElement('div');
            formSuccess.className = 'form-success';
            formSuccess.textContent = 'Thank you for your message! I will get back to you soon.';
            
            contactForm.innerHTML = '';
            contactForm.appendChild(formSuccess);
        }
    });
}

// Helper function to add error message
function addErrorMessage(element, message) {
    const errorMessage = document.createElement('span');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    element.parentNode.appendChild(errorMessage);
}

// Helper function to validate email
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

// Experience card interaction
const experienceCard = document.querySelector('.experience-card');
if (experienceCard) {
    experienceCard.addEventListener('mouseenter', () => {
        const divider = experienceCard.querySelector('.divider');
        if (divider) {
            divider.style.width = '100px';
            divider.style.transition = 'width 0.3s ease';
        }
    });
    
    experienceCard.addEventListener('mouseleave', () => {
        const divider = experienceCard.querySelector('.divider');
        if (divider) {
            divider.style.width = '50px';
        }
    });
}

// Skill categories interaction
const skillCategories = document.querySelectorAll('.skills-category');
skillCategories.forEach(category => {
    category.addEventListener('mouseenter', () => {
        const heading = category.querySelector('h3');
        if (heading) {
            heading.style.color = '#1a4e5a'; // Darker teal on hover
        }
    });
    
    category.addEventListener('mouseleave', () => {
        const heading = category.querySelector('h3');
        if (heading) {
            heading.style.color = '#2b7a8e'; // Back to original color
        }
    });
});