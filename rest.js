// ============================================
// 1. MOBILE MENU TOGGLE
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
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
            if (!e.target.closest('nav')) {
                navLinks.classList.remove('active');
            }
        });
    }
});

// ============================================
// 2. CONTACT FORM
// ============================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        alert('Thank you, ' + name + '! We will get back to you soon.');
        this.reset();
    });
}

// ============================================
// 3. ORDER NOW BUTTON
// ============================================
const orderBtn = document.getElementById('orderBtn');
if (orderBtn) {
    orderBtn.addEventListener('click', function() {
        document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
    });
}

// ============================================
// 4. SCROLL ANIMATION
// ============================================
const items = document.querySelectorAll('.menu-item, .about, .contact');

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

items.forEach(function(item) {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'all 0.8s ease';
    observer.observe(item);
});

console.log('🍽️ ALADEEN Restaurant - Website loaded');