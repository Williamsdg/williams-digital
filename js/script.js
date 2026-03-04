// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        const isOpen = item.classList.contains('open');

        document.querySelectorAll('.faq-item').forEach(faq => {
            faq.classList.remove('open');
        });

        if (!isOpen) {
            item.classList.add('open');
        }
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const btn = contactForm.querySelector('.btn');
        const originalText = btn.textContent;
        btn.textContent = 'Message Sent!';
        btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        btn.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.4)';

        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.style.boxShadow = '';
            contactForm.reset();
        }, 3000);
    });
}

// Navbar scroll effect
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.08)';
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Scroll Reveal Animation
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Stagger animations within the same parent
            const parent = entry.target.parentElement;
            const siblings = Array.from(parent.children).filter(el => el.classList.contains('reveal'));
            const siblingIndex = siblings.indexOf(entry.target);

            setTimeout(() => {
                entry.target.classList.add('visible');
            }, siblingIndex * 100);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px'
});

// Animated Number Counter
function animateCounter(el, target, suffix = '') {
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();
    const isDecimal = target % 1 !== 0;

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out cubic
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = start + (target - start) * easeOut;

        if (isDecimal) {
            el.textContent = current.toFixed(1) + suffix;
        } else {
            el.textContent = Math.round(current) + suffix;
        }

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
            entry.target.dataset.counted = 'true';
            const h3 = entry.target.querySelector('h3');
            const text = h3.textContent.trim();

            // Parse the number and suffix
            const match = text.match(/^([\d.]+)(.*)$/);
            if (match) {
                const num = parseFloat(match[1]);
                const suffix = match[2];
                animateCounter(h3, num, suffix);
            }
        }
    });
}, { threshold: 0.3 });

// Apply animations on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    // Reveal animations for cards and elements
    const revealElements = document.querySelectorAll(
        '.card, .pricing-card, .portfolio-card, .testimonial, .faq-item, .value-card, .contact-info-item, .baseball-card'
    );

    revealElements.forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

    // Counter animations for stat items
    document.querySelectorAll('.stat-item').forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
        counterObserver.observe(el);
    });

    // Parallax-like effect on hero
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scroll = window.pageYOffset;
            const heroHeight = hero.offsetHeight;
            if (scroll < heroHeight) {
                hero.style.backgroundPosition = `50% ${scroll * 0.3}px`;
            }
        });
    }

    // Typing effect for hero subtitle (if element exists)
    const typingEl = document.querySelector('.typing-text');
    if (typingEl) {
        const words = ['Ecommerce Stores', 'Online Shops', 'Digital Storefronts', 'Shopping Experiences'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeEffect() {
            const currentWord = words[wordIndex];

            if (isDeleting) {
                typingEl.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingEl.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            let delay = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentWord.length) {
                delay = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                delay = 500;
            }

            setTimeout(typeEffect, delay);
        }

        typeEffect();
    }

    // Shop category filter
    const categoryBtns = document.querySelectorAll('.shop-category-btn');
    if (categoryBtns.length) {
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                categoryBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Animate cards out and back in
                const cards = document.querySelectorAll('.baseball-card');
                cards.forEach((card, i) => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px) scale(0.95)';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) scale(1)';
                    }, 100 + i * 80);
                });
            });
        });
    }

    // Add to cart button feedback
    document.querySelectorAll('.card-add-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const original = btn.textContent;
            btn.textContent = 'Added!';
            btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            setTimeout(() => {
                btn.textContent = original;
                btn.style.background = '';
            }, 1500);
        });
    });
});
