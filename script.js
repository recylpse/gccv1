document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.remove('active');
            if (i === index) {
                testimonial.classList.add('active');
            }
        });
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function() {
            currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
            showTestimonial(currentTestimonial);
        });

        nextBtn.addEventListener('click', function() {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        });

        // Auto-rotate testimonials
        setInterval(function() {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    }

    // Form Submission
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = {
                name: this.querySelector('input[type="text"]').value,
                email: this.querySelector('input[type="email"]').value,
                phone: this.querySelector('input[type="tel"]').value,
                service: this.querySelector('select').value,
                message: this.querySelector('textarea').value
            };

            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            
            // Reset form
            this.reset();
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll animation with GSAP
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    let isScrolled = false;

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop && scrollTop > 100 && !isScrolled) {
            // Scrolling down - make header smaller and change bg
            gsap.to(header, {
                   padding: '0.6rem',
                backgroundColor: '#132D20',
                duration: 0.3,
                ease: 'power2.out'
            });
            gsap.to('.logo h1, .nav-links a, .hamburger .line', {
                color: 'var(--secondary-color)',
                duration: 0.3,
                ease: 'power2.out',
          

            });
            gsap.to('.hamburger .line', {
                backgroundColor: 'var(--secondary-color)',
                duration: 0.3,
                ease: 'power2.out'
            });
                         gsap.to(navLinks, {
                backgroundColor: 'var(--primary-color)',
                duration: 0.3,
                ease: 'power2.out'
            });
            // Change SVG path colors
            gsap.to('.logo-svg path:nth-child(1)', { fill: 'var(--secondary-color)', duration: 0.3, ease: 'power2.out' });
            gsap.to('.logo-svg path:nth-child(2)', { fill: 'var(--gold-light)', duration: 0.3, ease: 'power2.out' });
            gsap.to('.logo-svg path:nth-child(3)', { fill: 'var(--secondary-color)', duration: 0.3, ease: 'power2.out' });
            isScrolled = true;
        } else if (scrollTop < lastScrollTop && isScrolled) {
            // Scrolling up - revert header
            gsap.to(header,  {
                padding: '1rem',
                backgroundColor: 'var(--secondary-color)',
                duration: 0.3,
                ease: 'power2.out'
            });
            gsap.to('.nav-links a', {
                color: 'var(--primary-color)',
                duration: 0.3,
                ease: 'power2.out',
               
            });

                     gsap.to('.hamburger .line', {
                backgroundColor: 'var(--primary-color)',
                duration: 0.3,
                ease: 'power2.out'
            });
                     gsap.to(navLinks, {
                backgroundColor: 'var(--secondary-color)',
                duration: 0.3,
                ease: 'power2.out'
            });
            // Revert SVG path colors
            gsap.to('.logo-svg path:nth-child(1)', { fill: '#132D20', duration: 0.3, ease: 'power2.out' });
            gsap.to('.logo-svg path:nth-child(2)', { fill: '#917945', duration: 0.3, ease: 'power2.out' });
            gsap.to('.logo-svg path:nth-child(3)', { fill: '#132D20', duration: 0.3, ease: 'power2.out' });
            isScrolled = false;
        }

        lastScrollTop = scrollTop;
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) translateX(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.animate-fade-in, .animate-fade-in-delay, .animate-fade-in-delay-2, .animate-slide-in-left, .animate-slide-in-right');
    animatedElements.forEach(element => {
        // Set initial state
        element.style.opacity = '0';
        if (element.classList.contains('animate-slide-in-left')) {
            element.style.transform = 'translateX(-50px)';
        } else if (element.classList.contains('animate-slide-in-right')) {
            element.style.transform = 'translateX(50px)';
        }
        element.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
        
        observer.observe(element);
    });

    // Counter animation for stats
    const animateCounters = () => {
        const counters = document.querySelectorAll('.stat-item h3');
        
        counters.forEach(counter => {
            const target = parseInt(counter.innerText);
            const increment = target / 200;
            let currentValue = 0;
            
            const updateCounter = () => {
                currentValue += increment;
                
                if (currentValue < target) {
                    counter.innerText = Math.ceil(currentValue) + '+';
                    setTimeout(updateCounter, 10);
                } else {
                    counter.innerText = target + '+';
                }
            };
            
            // Check if element is in viewport
            const rect = counter.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                // Reset to 0 and start animation
                counter.innerText = '0+';
                updateCounter();
                counter.classList.add('animated');
            }
        });
    };

    // Run counter animation on scroll
    let countersAnimated = false;
    window.addEventListener('scroll', () => {
        if (!countersAnimated) {
            const statsSection = document.querySelector('.stats');
            if (statsSection) {
                const rect = statsSection.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    animateCounters();
                    countersAnimated = true;
                }
            }
        }
    });


    // Service cards hover effect
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'var(--primary-color)';
            this.style.color = 'var(--secondary-color)';
            this.querySelector('.service-icon').style.color = 'var(--secondary-color)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'var(--secondary-color)';
            this.style.color = 'var(--text-color)';
            this.querySelector('.service-icon').style.color = 'var(--primary-color)';
        });
    });

    // Loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });



    // Form validation
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value) {
                this.style.borderColor = '#e74c3c';
            } else {
                this.style.borderColor = 'var(--border-color)';
            }
        });
    });

    // Email validation
    const emailInput = document.querySelector('input[type="email"]');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (this.value && !emailRegex.test(this.value)) {
                this.style.borderColor = '#e74c3c';
                alert('Please enter a valid email address');
            }
        });
    }

    // Phone number formatting
    const phoneInput = document.querySelector('input[type="tel"]');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            // Remove all non-digits
            let value = this.value.replace(/\D/g, '');
            
            // Format as needed
            if (value.length > 0) {
                if (value.length <= 3) {
                    this.value = value;
                } else if (value.length <= 6) {
                    this.value = value.slice(0, 3) + ' ' + value.slice(3);
                } else {
                    this.value = value.slice(0, 3) + ' ' + value.slice(3, 6) + ' ' + value.slice(6, 10);
                }
            }
        });
    }

    // Add active state to current navigation item based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').slice(1) === current) {
                item.classList.add('active');
            }
        });
    });

    // Preloader (if you want to add one)
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(preloader);

    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 500);
    });
});

// Add these styles to your CSS for the preloader
const preloaderStyles = `
    .preloader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: var(--secondary-color);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s;
    }

    .spinner {
        width: 50px;
        height: 50px;
        border: 3px solid var(--border-color);
        border-top: 3px solid var(--primary-color);
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    .nav-links a.active {
        color: var(--primary-color);
        font-weight: 600;
    }
`;

// Add the preloader styles to the document
const styleSheet = document.createElement('style');
styleSheet.textContent = preloaderStyles;
document.head.appendChild(styleSheet);


