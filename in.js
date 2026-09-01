// ============================================
// 1. MOBILE MENU TOGGLE
// ============================================
const navLinks = document.querySelector('.nav-links');
const menuToggle = document.createElement('button');
menuToggle.innerHTML = '☰';
menuToggle.className = 'menu-toggle';
document.querySelector('nav .container').prepend(menuToggle);

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// ============================================
// 2. CONTACT FORM SUBMISSION
// ============================================
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = this.querySelector('input[placeholder="Your Name"]').value;
        const email = this.querySelector('input[placeholder="Your Email"]').value;
        const phone = this.querySelector('input[placeholder="Phone Number"]').value;
        const message = this.querySelector('textarea').value;

        // Simple validation
        if (!name || !email || !phone || !message) {
            alert('Please fill in all fields.');
            return;
        }

        // Show loading state
        const btn = this.querySelector('.submit-btn');
        const originalText = btn.textContent;
        btn.textContent = 'Sending...';
        btn.disabled = true;

        // Simulate sending (replace with actual API call later)
        setTimeout(() => {
            alert('Thank you, ' + name + '! We will get back to you within 24 hours.');
            this.reset();
            btn.textContent = originalText;
            btn.disabled = false;
        }, 1500);

        // For actual form submission, uncomment and use:
        /*
        fetch('https://your-api-endpoint.com/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, phone, message })
        })
        .then(response => response.json())
        .then(data => {
            alert('Message sent successfully!');
            this.reset();
            btn.textContent = originalText;
            btn.disabled = false;
        })
        .catch(error => {
            alert('Error sending message. Please try again.');
            btn.textContent = originalText;
            btn.disabled = false;
        });
        */
    });
}

// ============================================
// 3. SMOOTH SCROLL FOR NAV LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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
// 4. ADD SCROLL ANIMATION FOR STATS (Optional)
// ============================================
const stats = document.querySelectorAll('.stat-item h3');

const animateStats = () => {
    stats.forEach(stat => {
        const text = stat.textContent;
        const number = parseInt(text.replace(/[^0-9]/g, ''));
        if (number && !stat.dataset.animated) {
            stat.dataset.animated = true;
            // Simple animation - just add a class
            stat.style.opacity = '1';
            stat.style.transform = 'translateY(0)';
        }
    });
};

// Check if stats are visible on scroll
window.addEventListener('scroll', () => {
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            animateStats();
        }
    }
});

// ============================================
// 5. CONSOLE WELCOME (Optional)
// ============================================
console.log('🏠 ELORIA - Luxury Interior Design');
console.log('📞 Contact: +91 98765 43210');




// ============================================
// VIDEO ANIMATION ON SCROLL
// ============================================
const video = document.querySelector('.tablet-video');

const showVideo = () => {
    if (video) {
        const rect = video.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            video.classList.add('visible');
        }
    }
};

window.addEventListener('scroll', showVideo);
window.addEventListener('load', showVideo);


window.addEventListener('scroll', () => {
    const btn = document.querySelector('.back-top');
    if (window.scrollY > 500) {
        btn.classList.add('show');
    } else {
        btn.classList.remove('show');
    }
});



window.addEventListener('load', () => {
    document.getElementById('loader').classList.add('hide');
});
