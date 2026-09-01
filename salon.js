// ============================================
// 1. MOBILE MENU TOGGLE
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Create hamburger button if not in HTML
    const nav = document.querySelector('nav .container');
    let hamburger = document.getElementById('hamburger');
    
    if (!hamburger) {
        hamburger = document.createElement('button');
        hamburger.id = 'hamburger';
        hamburger.className = 'hamburger';
        hamburger.innerHTML = '☰';
        nav.prepend(hamburger);
    }

    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        navLinks.classList.toggle('active');
    });

    // Close menu on link click
    document.querySelectorAll('.nav-links a').forEach(function(link) {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
        });
    });

    // Close menu on outside click
    document.addEventListener('click', function(e) {
        if (!e.target.closest('nav')) {
            navLinks.classList.remove('active');
        }
    });
});

// ============================================
// 2. SMOOTH SCROLL FOR ANCHOR LINKS
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
// 3. BOOKING FORM HANDLING
// ============================================
const bookingForm = document.querySelector('.booking-form');
if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const name = this.querySelector('input[placeholder="Full Name"]').value;
        const email = this.querySelector('input[placeholder="Email"]').value;
        const city = this.querySelector('input[placeholder="City"]').value;
        const gender = this.querySelector('select').value;
        const service = this.querySelectorAll('select')[1].value;
        const date = this.querySelector('input[type="date"]').value;
        const time = this.querySelector('input[type="time"]').value;

        // Validate
        if (!name || !email || !city || !gender || !service || !date || !time) {
            alert('Please fill in all fields.');
            return;
        }

        // Show loading state
        const btn = this.querySelector('.btn');
        const originalText = btn.textContent;
        btn.textContent = 'Booking...';
        btn.disabled = true;

        // Simulate booking (replace with actual API call)
        setTimeout(function() {
            alert('✅ Thank you, ' + name + '! Your appointment has been booked.');
            bookingForm.reset();
            btn.textContent = originalText;
            btn.disabled = false;
        }, 1500);
    });
}

// ============================================
// 4. SCROLL ANIMATION (FADE IN)
// ============================================
const animateOnScroll = function() {
    const elements = document.querySelectorAll('.info-card, .service-category, .split-item');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(function(el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
};

// Run on load
animateOnScroll();

// ============================================
// 5. BACK TO TOP BUTTON (Create if not exists)
// ============================================
const createBackToTop = function() {
    let btn = document.getElementById('backToTop');
    if (!btn) {
        btn = document.createElement('button');
        btn.id = 'backToTop';
        btn.innerHTML = '↑';
        btn.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #d4af37;
            color: #000;
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            font-size: 1.5rem;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 999;
            box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
        `;
        document.body.appendChild(btn);
    }

    window.addEventListener('scroll', function() {
        if (window.scrollY > 400) {
            btn.style.opacity = '1';
            btn.style.visibility = 'visible';
        } else {
            btn.style.opacity = '0';
            btn.style.visibility = 'hidden';
        }
    });

    btn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
};

createBackToTop();

// ============================================
// 6. CONSOLE WELCOME
// ============================================
console.log('✂️ SALON Website - Loaded successfully');
console.log('📞 Contact: +91 98765 43210');