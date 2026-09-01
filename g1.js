// ============================================
// MOBILE MENU
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        if (window.innerWidth <= 768) {
            navLinks.classList.remove('active');
        }

        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            navLinks.classList.toggle('active');
        });

        document.querySelectorAll('.nav-links a').forEach(function(link) {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
            });
        });

        document.addEventListener('click', function(e) {
            if (!e.target.closest('#navbar')) {
                navLinks.classList.remove('active');
            }
        });
    }
});

// ============================================
// CONTACT FORM
// ============================================
const form = document.getElementById('contactForm');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you! We will get back to you within 24 hours.');
        this.reset();
    });
}

// ============================================
// SCROLL ANIMATION
// ============================================
const cards = document.querySelectorAll('.program-card, .trainer-card, .plan, .testimonial-card, .about-item');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

console.log('💪 IronCore Fitness - Gym in Vijay Nagar, Indore');
console.log('📞 Contact: +91 98765 43210');




// ============================================
// FADE-IN ON SCROLL (Fixed for Mobile)
// ============================================
const fadeElements = document.querySelectorAll('.fade-in');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { 
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'  // Triggers slightly before element enters viewport
});

fadeElements.forEach(el => {
    // Force initial state
    el.classList.remove('visible');
    fadeObserver.observe(el);
});

// Also check on load for elements already in viewport
window.addEventListener('load', function() {
    fadeElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            el.classList.add('visible');
        }
    });
});






// ============================================
// BACK TO TOP BUTTON
// ============================================
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', function() {
    if (window.scrollY > 400) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


























