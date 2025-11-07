// Promo Banner Close
const promoBanner = document.getElementById('promoBanner');
const promoClose = document.getElementById('promoClose');
const navbar = document.getElementById('navbar');

if (promoClose && promoBanner) {
    promoClose.addEventListener('click', () => {
        promoBanner.classList.add('hidden');
        navbar.classList.add('no-promo');
        localStorage.setItem('promoBannerClosed', 'true');
    });
}

// Check if promo banner was previously closed
if (localStorage.getItem('promoBannerClosed') === 'true') {
    promoBanner.classList.add('hidden');
    navbar.classList.add('no-promo');
}

// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    }
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Testimonials Slider
const testimonialCards = document.querySelectorAll('.testimonial-card');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const sliderDots = document.getElementById('sliderDots');
let currentSlide = 0;

// Create dots
testimonialCards.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    sliderDots.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function updateSlider() {
    testimonialCards.forEach((card, index) => {
        card.classList.remove('active');
        dots[index].classList.remove('active');
    });
    testimonialCards[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % testimonialCards.length;
    updateSlider();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + testimonialCards.length) % testimonialCards.length;
    updateSlider();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlider();
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Auto-play testimonials
setInterval(nextSlide, 5000);

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
const whatsappBtn = document.getElementById('whatsappBtn');

// WhatsApp phone number (replace with your actual number)
const whatsappNumber = '+919948318650'; // Format: country code + number (no + or spaces)

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').options[document.getElementById('service').selectedIndex].text;
    const message = document.getElementById('message').value;
    
    // Show success message
    alert(`Thank you, ${name}! Your appointment request has been received. We'll contact you at ${email} or ${phone} shortly.`);
    
    // Reset form
    contactForm.reset();
});

// WhatsApp Button Click Handler
whatsappBtn.addEventListener('click', () => {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;
    
    // Build WhatsApp message
    let whatsappMessage = 'Hi, I would like to book an appointment at Elegance Beauty Parlour.%0A%0A';
    
    if (name) {
        whatsappMessage += `Name: ${encodeURIComponent(name)}%0A`;
    }
    if (phone) {
        whatsappMessage += `Phone: ${encodeURIComponent(phone)}%0A`;
    }
    if (service) {
        const serviceName = document.getElementById('service').options[document.getElementById('service').selectedIndex].text;
        whatsappMessage += `Service: ${encodeURIComponent(serviceName)}%0A`;
    }
    if (message) {
        whatsappMessage += `Message: ${encodeURIComponent(message)}%0A`;
    }
    
    // Open WhatsApp
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
    window.open(whatsappUrl, '_blank');
});

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('section, .service-card, .gallery-item, .info-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Gallery Item Click Effect
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const text = item.querySelector('.gallery-overlay p').textContent;
        // Create a simple lightbox effect
        const lightbox = document.createElement('div');
        lightbox.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);display:flex;align-items:center;justify-content:center;z-index:9999;cursor:pointer;';
        lightbox.innerHTML = `<img src="${img.src}" style="max-width:90%;max-height:90%;border-radius:10px;box-shadow:0 0 50px rgba(212,165,116,0.5);">`;
        lightbox.addEventListener('click', () => lightbox.remove());
        document.body.appendChild(lightbox);
    });
});



// Newsletter Form
const newsletterForm = document.querySelector('.newsletter-form');
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input').value;
    alert(`Thank you for subscribing with ${email}! You'll receive our latest updates and offers.`);
    newsletterForm.reset();
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section');
const navLinksArray = Array.from(navLinks);

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksArray.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Scroll Indicator Click
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Hero Banner Auto Slider
const heroSlides = document.querySelectorAll('.hero-slide');
const indicators = document.querySelectorAll('.indicator');
let currentSlideIndex = 0;
let heroSliderInterval;

function showSlide(index) {
    // Remove active class from all slides and indicators
    heroSlides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Add active class to current slide and indicator
    heroSlides[index].classList.add('active');
    indicators[index].classList.add('active');
}

function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % heroSlides.length;
    showSlide(currentSlideIndex);
}

function startHeroSlider() {
    heroSliderInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
}

function stopHeroSlider() {
    clearInterval(heroSliderInterval);
}

// Manual slide control with indicators
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        currentSlideIndex = index;
        showSlide(currentSlideIndex);
        
        // Restart auto-scroll after manual selection
        stopHeroSlider();
        startHeroSlider();
    });
});

// Start auto-slider when page loads
if (heroSlides.length > 0) {
    startHeroSlider();
}

// Pause slider when user hovers over hero section
const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroSection.addEventListener('mouseenter', stopHeroSlider);
    heroSection.addEventListener('mouseleave', startHeroSlider);
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all FAQ items
        faqItems.forEach(faq => faq.classList.remove('active'));
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Counter Animation for Stats
const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;

const animateStats = () => {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target;
            }
        };
        updateCounter();
    });
};

// Trigger stats animation when section is visible
const statsSection = document.querySelector('.stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                animateStats();
                statsAnimated = true;
            }
        });
    }, { threshold: 0.5 });

    statsObserver.observe(statsSection);
}

// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const themeModal = document.getElementById('themeModal');
const themeOptions = document.querySelectorAll('.theme-option');

// Toggle theme modal
themeToggle.addEventListener('click', () => {
    themeModal.classList.toggle('active');
});

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    if (!themeToggle.contains(e.target) && !themeModal.contains(e.target)) {
        themeModal.classList.remove('active');
    }
});

// Theme selection
themeOptions.forEach(option => {
    option.addEventListener('click', () => {
        const theme = option.getAttribute('data-theme');
        
        // Remove active class from all options
        themeOptions.forEach(opt => opt.classList.remove('active'));
        
        // Add active class to selected option
        option.classList.add('active');
        
        // Apply theme
        document.body.setAttribute('data-theme', theme);
        
        // Save theme preference
        localStorage.setItem('selectedTheme', theme);
        
        // Close modal after selection
        setTimeout(() => {
            themeModal.classList.remove('active');
        }, 300);
    });
});

// Load saved theme on page load
const savedTheme = localStorage.getItem('selectedTheme');
if (savedTheme) {
    document.body.setAttribute('data-theme', savedTheme);
    themeOptions.forEach(option => {
        if (option.getAttribute('data-theme') === savedTheme) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });
}

console.log('Elegance Beauty Parlour - Website Loaded Successfully! 💅✨');
