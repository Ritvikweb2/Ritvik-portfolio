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
// 2. SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// 3. CONTACT FORM
// ============================================
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = this.querySelector('input[placeholder="Your Name"]').value;
        const email = this.querySelector('input[placeholder="Your Email"]').value;
        const phone = this.querySelector('input[placeholder="Phone Number"]').value;
        const message = this.querySelector('textarea').value;

        if (!name || !email || !phone || !message) {
            alert('Please fill in all fields.');
            return;
        }

        const btn = this.querySelector('.submit-btn');
        const originalText = btn.textContent;
        btn.textContent = 'Sending...';
        btn.disabled = true;

        setTimeout(function() {
            alert('Thank you, ' + name + '! We will get back to you within 24 hours.');
            contactForm.reset();
            btn.textContent = originalText;
            btn.disabled = false;
        }, 1500);
    });
}

// ============================================
// 4. VIDEO ANIMATION ON SCROLL
// ============================================
const video = document.querySelector('.tablet-video');

const showVideo = function() {
    if (video) {
        const rect = video.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) {
            video.classList.add('visible');
        }
    }
};

window.addEventListener('scroll', showVideo);
window.addEventListener('load', showVideo);

// ============================================
// 5. SCROLL ANIMATION FOR CARDS
// ============================================
const cards = document.querySelectorAll('.testimonial-card, .text-section, .video-section, #contact');

const cardObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

cards.forEach(function(card) {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.8s ease';
    cardObserver.observe(card);
});

// ============================================
// 6. BACK TO TOP BUTTON
// ============================================
const backTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', function() {
    if (window.scrollY > 400) {
        backTopBtn.classList.add('show');
    } else {
        backTopBtn.classList.remove('show');
    }
});

backTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// 7. LOADER
// ============================================
window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(function() {
            loader.classList.add('hide');
        }, 500);
    }
});

// ============================================
// 8. PARALLAX HERO EFFECT
// ============================================
window.addEventListener('scroll', function() {
    const hero = document.querySelector('#home');
    if (hero) {
        const scrolled = window.scrollY;
        const video = document.getElementById('hero-video');
        if (video) {
            video.style.transform = 'translate(-50%, -50%) scale(' + (1 + scrolled * 0.0005) + ')';
        }
    }
});

// ============================================
// 9. CONSOLE WELCOME
// ============================================
console.log('🏠 ELORIA - Luxury Interior Design');
console.log('📞 Contact: +91 98765 43210');
console.log('✨ Built with ❤️');