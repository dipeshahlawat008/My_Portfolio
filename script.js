// Initialize AOS animation library
AOS.init({
    duration: 800,
    once: true,
    startEvent: 'DOMContentLoaded'
});

// Rotating text animation
const rotatingText = document.querySelector('.rotating-text');
const texts = Array.from(rotatingText.getElementsByTagName('span'));
let currentIndex = 0;

function rotateText() {
    texts[currentIndex].style.opacity = '0';
    currentIndex = (currentIndex + 1) % texts.length;
    texts[currentIndex].style.opacity = '1';
}

// Initially show first text
texts.forEach((text, index) => {
    text.style.opacity = index === 0 ? '1' : '0';
});

setInterval(rotateText, 3000);

// Improved Smooth Scroll with Offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for Section Animations
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Update active nav link
            const id = entry.target.id;
            if (id) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '-50px 0px -50px 0px'
});

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    sectionObserver.observe(section);
});

// Modern Material Ripple Effect
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    ripple.addEventListener('animationend', () => {
        ripple.remove();
    });
}

// Add ripple effect to buttons
document.querySelectorAll('button, .card').forEach(element => {
    element.addEventListener('click', createRipple);
});

// Parallax Effect for Hero Section
document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) / 20;
    const moveY = (e.clientY - window.innerHeight / 2) / 20;

    document.querySelectorAll('.material-3d').forEach(element => {
        element.style.transform = `perspective(1000px) rotateY(${moveX}deg) rotateX(${-moveY}deg)`;
    });
});

// Smooth Navbar Background Transition
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class when page is scrolled
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Hide/show navbar based on scroll direction
    if (currentScroll > lastScroll && currentScroll > 80) {
        navbar.classList.add('hidden');
        navbar.classList.remove('visible');
    } else {
        navbar.classList.remove('hidden');
        navbar.classList.add('visible');
    }

    lastScroll = currentScroll;
});

// Active link handling
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('span');
        const btnIcon = submitBtn.querySelector('i');

        // Loading state
        submitBtn.classList.add('loading');
        btnText.textContent = 'Sending...';
        btnIcon.className = 'fas fa-spinner';

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Success state
            submitBtn.classList.remove('loading');
            submitBtn.classList.add('success');
            btnText.textContent = 'Sent Successfully!';
            btnIcon.className = 'fas fa-check';
            contactForm.reset();

            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.classList.remove('success');
                btnText.textContent = 'Send Message';
                btnIcon.className = 'fas fa-paper-plane';
            }, 3000);

        } catch (error) {
            console.error('Error:', error);
            submitBtn.classList.remove('loading');
            btnText.textContent = 'Try Again';
            btnIcon.className = 'fas fa-exclamation-circle';
        }
    });
}

// 3D Cube Animation
const cube = document.querySelector('.cube');
if (cube) {
    let rotationX = 0;
    let rotationY = 0;

    function animateCube() {
        rotationX += 0.5;
        rotationY += 0.5;
        cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
        requestAnimationFrame(animateCube);
    }

    animateCube();
}

// Skills progress animation
const skillsSection = document.querySelector('#skills');
if (skillsSection) {
    const progressBars = skillsSection.querySelectorAll('.progress');
    
    function animateProgress() {
        progressBars.forEach(progress => {
            const width = progress.style.width;
            progress.style.width = '0';
            setTimeout(() => {
                progress.style.width = width;
            }, 100);
        });
    }

    // Trigger animation when skills section is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgress();
                observer.unobserve(entry.target);
            }
        });
    });

    observer.observe(skillsSection);
}

// Initialize AOS animation library with optimized settings
AOS.init({
    duration: 800,
    once: true,
    startEvent: 'DOMContentLoaded'
});

// Rotating text animation
const rotatingTextContainer = document.querySelector('.rotating-text');
if (rotatingTextContainer) {
    const texts = rotatingTextContainer.querySelectorAll('span');
    let currentIndex = 0;

    function rotateText() {
        texts[currentIndex].style.opacity = '0';
        currentIndex = (currentIndex + 1) % texts.length;
        texts[currentIndex].style.opacity = '1';
    }

    // Set initial state
    texts.forEach((text, index) => {
        text.style.opacity = index === 0 ? '1' : '0';
    });

    setInterval(rotateText, 3000);
}

// Lazy load images
const images = document.querySelectorAll('img');
if ('loading' in HTMLImageElement.prototype) {
    images.forEach(img => {
        if (img.dataset.src) {
            img.src = img.dataset.src;
        }
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// Smooth reveal animation for elements
const heroObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
            observer.unobserve(entry.target);
        }
    });
}, heroObserverOptions);

document.querySelectorAll('.hero-content > *').forEach(el => {
    observer.observe(el);
});

// Apple-style animations
document.addEventListener('DOMContentLoaded', () => {
    // Initial animations
    setTimeout(() => {
        document.querySelectorAll('.text-reveal').forEach((el, i) => {
            setTimeout(() => {
                el.classList.add('visible');
            }, i * 200);
        });
    }, 500);

    // Scroll animations
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.fade-up, .project-item').forEach(el => {
        observer.observe(el);
    });

    // Parallax effect
    window.addEventListener('scroll', () => {
        document.querySelectorAll('.parallax').forEach(el => {
            const speed = el.dataset.speed || 0.5;
            const rect = el.getBoundingClientRect();
            const scrolled = window.pageYOffset;
            
            if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                el.style.transform = `translateY(${scrolled * speed}px)`;
            }
        });
    });

    // Smooth section transitions
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Add this to handle sticky section animations
const sections = document.querySelectorAll('.apple-section');
let currentSection = 0;

window.addEventListener('scroll', () => {
    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5) {
            currentSection = index;
            section.classList.add('active');
        } else {
            section.classList.remove('active');
        }
    });
});

// Magical interactions
document.addEventListener('DOMContentLoaded', () => {
    // Mouse movement effect for cards
    document.querySelectorAll('.magic-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // Reveal items on scroll
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.reveal-item').forEach(item => {
        revealObserver.observe(item);
    });

    // Smooth section transitions
    const sections = document.querySelectorAll('.magic-section');
    sections.forEach(section => {
        section.addEventListener('mouseenter', () => {
            section.classList.add('active');
        });
    });

    // Parallax effect for floating elements
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        document.querySelectorAll('.floating-elements').forEach(el => {
            const speed = el.dataset.speed || 30;
            const x = (mouseX * speed);
            const y = (mouseY * speed);
            el.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
});

// Smooth scroll handling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add this to your existing script.js
document.addEventListener('DOMContentLoaded', () => {
    // Particle effect
    const createParticles = () => {
        const particles = document.querySelector('.particles');
        for(let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.setProperty('--x', (Math.random() * 200 - 100) + 'px');
            particle.style.setProperty('--y', (Math.random() * 200 - 100) + 'px');
            particle.style.animationDelay = Math.random() * 4 + 's';
            particles.appendChild(particle);
        }
    };

    createParticles();

    // Mouse movement parallax
    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const x = (clientX / window.innerWidth - 0.5) * 20;
        const y = (clientY / window.innerHeight - 0.5) * 20;

        gsap.to('.gradient-sphere', {
            x: x,
            y: y,
            duration: 1,
            ease: 'power2.out'
        });
    });
});

// Smooth section animations
const smoothSections = document.querySelectorAll('.smooth-section');
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    },
    { threshold: 0.1 }
);

smoothSections.forEach(section => observer.observe(section));

// Dynamic text animation
const typingText = document.querySelector('.dynamic-text');
if (typingText) {
    const words = JSON.parse(typingText.dataset.words);
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 200;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typingDelay = 2000; // Pause at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingDelay = 200;
        }

        setTimeout(type, isDeleting ? 100 : typingDelay);
    }

    type();
}

// Skill category hover effects
document.querySelectorAll('.skill-category').forEach(category => {
    category.addEventListener('mouseenter', () => {
        category.style.transform = 'translateY(-10px)';
    });

    category.addEventListener('mouseleave', () => {
        category.style.transform = 'translateY(0)';
    });
});

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize smooth sections
    const smoothSections = document.querySelectorAll('.smooth-section');
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        },
        { 
            threshold: 0.1,
            rootMargin: '0px 0px -10% 0px'
        }
    );

    smoothSections.forEach(section => {
        observer.observe(section);
    });

    // Initialize typing effect
    const typingText = document.querySelector('.dynamic-text');
    if (typingText) {
        const words = JSON.parse(typingText.dataset.words);
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingDelay = 200;

        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typingText.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingText.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typingDelay = 2000; // Pause at end of word
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typingDelay = 200;
            }

            setTimeout(type, isDeleting ? 100 : typingDelay);
        }

        type();
    }
});

// Add smooth reveal animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.classList.add('animate-hidden');
    observer.observe(section);
});

// Add mouse parallax effect
document.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 20;
    const y = (clientY / window.innerHeight - 0.5) * 20;

    document.querySelectorAll('.tech-item').forEach(item => {
        item.style.transform = `translate(${x}px, ${y}px) translateY(${parseFloat(item.style.getPropertyValue('--float-offset') || 0)}px)`;
    });
});

// Add floating animation offset
document.querySelectorAll('.tech-item').forEach(item => {
    item.style.setProperty('--float-offset', Math.random() * 20);
});

// Smooth scrolling function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Make sure all links are working
document.addEventListener('DOMContentLoaded', function() {
    // Check all links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
});
