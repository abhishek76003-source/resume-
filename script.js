// ===========================
// Sticky Header
// ===========================
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
    
    lastScroll = currentScroll;
});

// ===========================
// Mobile Menu Toggle
// ===========================
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuClose = document.querySelector('.mobile-menu-close');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');

// Open mobile menu
mobileMenuToggle.addEventListener('click', () => {
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
});

// Close mobile menu
mobileMenuClose.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
});

// Close menu when clicking a link
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ===========================
// Smooth Scrolling for Anchor Links
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// Appointment Form Handling
// ===========================
const appointmentForm = document.getElementById('appointmentForm');

appointmentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const message = document.getElementById('message').value;
    
    // Format time for better readability
    let timeText = '';
    if (time === 'morning') {
        timeText = 'Morning (9:00 AM - 12:00 PM)';
    } else if (time === 'afternoon') {
        timeText = 'Afternoon (12:00 PM - 3:00 PM)';
    } else if (time === 'evening') {
        timeText = 'Evening (5:00 PM - 8:00 PM)';
    } else {
        timeText = 'Anytime';
    }
    
    // Format date for better readability
    // Append 'T00:00:00' to ensure date is interpreted in local timezone, not UTC
    // This prevents the date from shifting to the previous day in certain timezones
    const dateObj = new Date(date + 'T00:00:00');
    const formattedDate = dateObj.toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Create WhatsApp message
    let whatsappMessage = `Hello Dr. Arjit Gupta,\n\n`;
    whatsappMessage += `I would like to book an appointment at Vardaan Clinic.\n\n`;
    whatsappMessage += `*Patient Details:*\n`;
    whatsappMessage += `Name: ${name}\n`;
    whatsappMessage += `Phone: ${phone}\n`;
    whatsappMessage += `Preferred Date: ${formattedDate}\n`;
    whatsappMessage += `Preferred Time: ${timeText}\n`;
    
    if (message) {
        whatsappMessage += `\n*Health Concern:*\n${message}\n`;
    }
    
    whatsappMessage += `\nLooking forward to your confirmation.\nThank you!`;
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // WhatsApp number (without + and spaces)
    const whatsappNumber = '919479881390';
    
    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Reset form
    appointmentForm.reset();
    
    // Show success message
    showNotification('Redirecting to WhatsApp...', 'success');
});

// ===========================
// Set minimum date for appointment
// ===========================
const dateInput = document.getElementById('date');
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

const minDate = tomorrow.toISOString().split('T')[0];
dateInput.setAttribute('min', minDate);

// Set max date (3 months from now)
const maxDate = new Date(today);
maxDate.setMonth(maxDate.getMonth() + 3);
dateInput.setAttribute('max', maxDate.toISOString().split('T')[0]);

// ===========================
// Form Validation
// ===========================
const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone');

// Name validation - only letters and spaces
nameInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
});

// Phone validation - only numbers, max 10 digits
phoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 10) {
        value = value.slice(0, 10);
    }
    e.target.value = value;
});

// ===========================
// Scroll to Top Button
// ===========================
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===========================
// Notification System
// ===========================
function showNotification(message, type = 'info') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#28A745' : type === 'error' ? '#DC3545' : '#0066CC'};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        font-weight: 500;
    `;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add to body
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ===========================
// Animate on Scroll
// ===========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .why-card, .contact-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
});

// ===========================
// Active Navigation Link
// ===========================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav a[href^="#"]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===========================
// Preload Images
// ===========================
window.addEventListener('load', () => {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
        img.setAttribute('src', img.getAttribute('data-src'));
        img.onload = () => {
            img.removeAttribute('data-src');
        };
    });
});

// ===========================
// Emergency Call Button Animation
// ===========================
const emergencyButtons = document.querySelectorAll('a[href^="tel:"]');
emergencyButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 200);
    });
});

// ===========================
// Console Welcome Message
// ===========================
console.log('%c🏥 Vardaan Clinic', 'color: #0066CC; font-size: 24px; font-weight: bold;');
console.log('%cDr. Arjit Gupta - Internal Medicine & Critical Care', 'color: #666; font-size: 14px;');
console.log('%cFor appointments: +91 9479881390', 'color: #28A745; font-size: 12px;');

// ===========================
// Performance Monitoring
// ===========================
if ('performance' in window) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page loaded in ${pageLoadTime}ms`);
    });
}

// ===========================
// Accessibility Improvements
// ===========================
// Add keyboard navigation for mobile menu
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Add focus trap for mobile menu when open
const focusableElements = 'a[href], button, textarea, input, select';
let firstFocusableElement, lastFocusableElement;

mobileMenu.addEventListener('transitionend', () => {
    if (mobileMenu.classList.contains('active')) {
        const focusableContent = mobileMenu.querySelectorAll(focusableElements);
        firstFocusableElement = focusableContent[0];
        lastFocusableElement = focusableContent[focusableContent.length - 1];
        
        if (firstFocusableElement) {
            firstFocusableElement.focus();
        }
    }
});

document.addEventListener('keydown', (e) => {
    if (!mobileMenu.classList.contains('active')) return;
    
    if (e.key === 'Tab') {
        if (e.shiftKey) {
            if (document.activeElement === firstFocusableElement) {
                lastFocusableElement.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastFocusableElement) {
                firstFocusableElement.focus();
                e.preventDefault();
            }
        }
    }
});
