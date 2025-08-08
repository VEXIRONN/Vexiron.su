// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

// Update cursor position
function updateCursor(e) {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    // Add slight delay to follower for smooth effect
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 50);
}

// Hover effects
function addHoverEffect() {
    // Add hover class to cursor when hovering over interactive elements
    const hoverElements = document.querySelectorAll('a, button, .btn, [data-cursor-hover]');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            if (element.classList.contains('btn') || element.tagName === 'BUTTON') {
                cursor.classList.add('hover');
            } else {
                cursor.classList.add('hover-text');
            }
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover', 'hover-text');
        });
    });
}

// Hide cursor on touch devices
function hideCursorOnTouch() {
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        cursor.style.display = 'none';
        cursorFollower.style.display = 'none';
    }
}

// Initialize cursor
function initCursor() {
    if (window.matchMedia('(pointer: fine)').matches) {
        document.addEventListener('mousemove', updateCursor);
        addHoverEffect();
    } else {
        hideCursorOnTouch();
    }
}

// Preloader
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    
    // Hide preloader after page is fully loaded
    setTimeout(() => {
        preloader.classList.add('hidden');
        
        // Remove preloader from DOM after animation completes
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1500); // Adjust time as needed (in milliseconds)
});

// Particles.js Configuration
function initParticles() {
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#64ffda'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    },
                    polygon: {
                        nb_sides: 5
                    }
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#64ffda',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: true,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    push: {
                        particles_nb: 3
                    }
                }
            },
            retina_detect: true
        });
    }
}

// Parallax effect for hero section
function initParallax() {
    const parallaxBg = document.querySelector('.parallax-bg');
    const parallaxImage = document.querySelector('.parallax-image');
    
    if (!parallaxBg || !parallaxImage) return;
    
    window.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth - e.pageX * 0.5) / 100;
        const y = (window.innerHeight - e.pageY * 0.5) / 100;
        
        parallaxBg.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
        
        parallaxImage.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
    });
}

// Smooth scroll to section
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Update active link
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                });
                this.parentElement.classList.add('active');
            }
        });
    });
}

// Animate elements on scroll with Intersection Observer for better performance
function initScrollAnimations() {
    // Check if Intersection Observer is supported
    if ('IntersectionObserver' in window) {
        const animateElements = document.querySelectorAll('.animate-on-scroll');
        
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    // Stop observing after animation is triggered
                    observer.unobserve(entry.target);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        // Observe each element
        animateElements.forEach(element => {
            observer.observe(element);
        });
    } else {
        // Fallback for browsers that don't support Intersection Observer
        const animateOnScroll = () => {
            const elements = document.querySelectorAll('.animate-on-scroll:not(.animate)');
            
            elements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.3;
                
                if (elementPosition < screenPosition) {
                    element.classList.add('animate');
                }
            });
        };
        
        // Throttle scroll event for better performance
        let isScrolling;
        window.addEventListener('scroll', () => {
            window.clearTimeout(isScrolling);
            isScrolling = setTimeout(animateOnScroll, 100);
        }, false);
        
        // Initial check
        animateOnScroll();
    }
    
    // Add animation delay classes
    document.querySelectorAll('.animate-delay-1').forEach(el => {
        el.style.animationDelay = '0.1s';
        el.style.transitionDelay = '0.1s';
    });
    document.querySelectorAll('.animate-delay-2').forEach(el => {
        el.style.animationDelay = '0.2s';
        el.style.transitionDelay = '0.2s';
    });
    document.querySelectorAll('.animate-delay-3').forEach(el => {
        el.style.animationDelay = '0.3s';
        el.style.transitionDelay = '0.3s';
    });
    document.querySelectorAll('.animate-delay-4').forEach(el => {
        el.style.animationDelay = '0.4s';
        el.style.transitionDelay = '0.4s';
    });
    document.querySelectorAll('.animate-delay-5').forEach(el => {
        el.style.animationDelay = '0.5s';
        el.style.transitionDelay = '0.5s';
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize particles
    initParticles();
    
    // Initialize custom cursor
    initCursor();
    
    // Initialize parallax effects
    initParallax();
    
    // Initialize smooth scroll
    initSmoothScroll();
    
    // Initialize animations on page load
    // Initial check for elements in viewport
    animateOnScroll();
    
    // Add scroll event listener for animations
    window.addEventListener('scroll', animateOnScroll);
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Animate elements when they come into view
    function animateOnScroll() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(element => {
            if (isInViewport(element)) {
                element.classList.add('visible');
            }
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });

    // Animate tech icons on hover
    const techIcons = document.querySelectorAll('.tech-icon');
    techIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'translateY(-10px) rotate(10deg)';
            setTimeout(() => {
                icon.style.transform = 'translateY(-5px) rotate(0)';
            }, 300);
        });
    });

    // Typing effect for the highlight text
    const typedTextSpan = document.querySelector('.typed-text');
    if (typedTextSpan) {
        const textArray = ['Web Developer', 'UI/UX Designer', 'Problem Solver', 'Tech Enthusiast'];
        let textArrayIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingDelay = 100;
        let erasingDelay = 50;
        let newTextDelay = 2000;

        function type() {
            const currentText = textArray[textArrayIndex];
            if (isDeleting) {
                typedTextSpan.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingDelay = erasingDelay;
            } else {
                typedTextSpan.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingDelay = 100;
            }

            if (!isDeleting && charIndex === currentText.length) {
                typingDelay = newTextDelay;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textArrayIndex = (textArrayIndex + 1) % textArray.length;
            }

            setTimeout(type, typingDelay);
        }

        // Start the typing effect after a delay
        setTimeout(type, 1000);
    }

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
            navbar.classList.remove('scroll-up');
            navbar.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
            navbar.classList.remove('scroll-down');
            navbar.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });

    // Project card hover effects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Contact form submission with validation
    const contactForm = document.getElementById('contact-form');
    const formInputs = contactForm.querySelectorAll('input, textarea');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Validate form inputs
        let isValid = true;
        formInputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });

        if (isValid) {
            // Here you would typically send the form data to a backend server
            const formData = new FormData(contactForm);
            console.log(Object.fromEntries(formData));
            
            // Show success message
            const successMsg = document.createElement('div');
            successMsg.className = 'success-message';
            successMsg.textContent = 'Thank you for your message! I will get back to you soon.';
            contactForm.appendChild(successMsg);
            
            // Remove success message after 3 seconds
            setTimeout(() => {
                successMsg.remove();
                contactForm.reset();
            }, 3000);
        }
    });

    // Add scroll reveal animations
    const sr = ScrollReveal({
        distance: '60px',
        duration: 2500,
        delay: 400,
        reset: true
    });

    sr.reveal('.about-content', { delay: 200 });
    sr.reveal('.project-card', { interval: 200 });
    sr.reveal('.contact-content', { delay: 200 });

    // Add copy to clipboard functionality for email
    const emailIcon = document.querySelector('.email-icon');
    if (emailIcon) {
        emailIcon.addEventListener('click', () => {
            navigator.clipboard.writeText('your.email@example.com');
            emailIcon.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(() => {
                emailIcon.innerHTML = '<i class="fas fa-envelope"></i>';
            }, 1500);
        });
    }
});
