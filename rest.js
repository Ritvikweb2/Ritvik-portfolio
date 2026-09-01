// ============================================
// 1. MOBILE MENU TOGGLE
// ============================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// ============================================
// 2. CONTACT FORM
// ============================================
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    alert('Thank you, ' + name + '! We will get back to you soon.');
    this.reset();
});

// ============================================
// 3. ORDER NOW BUTTON
// ============================================
document.getElementById('orderBtn').addEventListener('click', () => {
    document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
});

// ============================================
// 4. SCROLL ANIMATION
// ============================================
const items = document.querySelectorAll('.menu-item, .about, .contact');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

items.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'all 0.8s ease';
    observer.observe(item);
});