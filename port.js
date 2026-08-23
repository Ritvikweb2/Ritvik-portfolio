// ============================================
// 1. MOBILE MENU TOGGLE
// ============================================
const hamburger = document.createElement('button');
hamburger.innerHTML = '☰';
hamburger.className = 'hamburger';
document.querySelector('#navbar .container').prepend(hamburger);

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
// 2. SCROLL ANIMATION FOR PROJECTS & SERVICES
// ============================================
const cards = document.querySelectorAll('.project-card, .service-card');

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

// ============================================
// 3. CONSOLE WELCOME
// ============================================
console.log('🚀 Ritvik Malviya - Web Developer');
console.log('📞 Contact: +91 6263576359');