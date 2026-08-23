// Typewriter effect
const heroText = document.querySelector('#hero h1');
const text = heroText.textContent;
heroText.textContent = '';

let i = 0;
function typeWriter() {
    if (i < text.length) {
        heroText.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 80);
    }
}
typeWriter();

// Fade-in sections on scroll
const sections = document.querySelectorAll('section');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, { threshold: 0.15 });

sections.forEach(section => observer.observe(section));

// Number counter animation
document.querySelectorAll('.stat-number').forEach(stat => {
    const target = parseInt(stat.dataset.target);
    let current = 0;
    const increment = target / 60;

    const updateCounter = () => {
        if (current < target) {
            current += increment;
            stat.textContent = Math.round(current);
            setTimeout(updateCounter, 20);
        } else {
            stat.textContent = target;
        }
    };
    updateCounter();
});

// Parallax on hero image
window.addEventListener('scroll', () => {
    const hero = document.querySelector('#hero .hero-bg');
    const scrolled = window.scrollY;
    hero.style.transform = `translateY(${scrolled * 0.4}px) scale(1.1)`;
});


// ============================================
// 1. TYPEWRITER EFFECT
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('#hero h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 70);
            }
        };
        typeWriter();
    }
});

// ============================================
// 2. SCROLL FADE-IN ANIMATION
// ============================================
const sections = document.querySelectorAll('section, .plan, .trainer-card, .program-card');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, { threshold: 0.2 });

sections.forEach(section => observer.observe(section));

// ============================================
// 3. PARALLAX HERO
// ============================================
window.addEventListener('scroll', () => {
    const heroBg = document.querySelector('#hero .hero-bg');
    if (heroBg) {
        const scrolled = window.scrollY;
        heroBg.style.transform = `translateY(${scrolled * 0.3}px) scale(1.1)`;
    }
});

// ============================================
// 4. NUMBER COUNTER (if you have stats)
// ============================================
const counters = document.querySelectorAll('.counter');
counters.forEach(counter => {
    const target = parseInt(counter.dataset.target);
    let current = 0;
    const increment = target / 80;

    const updateCounter = () => {
        if (current < target) {
            current += increment;
            counter.textContent = Math.round(current);
            setTimeout(updateCounter, 15);
        } else {
            counter.textContent = target;
        }
    };

    const observerCounter = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            updateCounter();
            observerCounter.unobserve(counter);
        }
    }, { threshold: 0.5 });

    observerCounter.observe(counter);
});