// Portfolio Interactive Features
// Comprehensive JS - Dark/Light Mode, Mobile Menu, Form Validation, Animations, Typing Effects, Scroll Effects

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark' || (!currentTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    body.setAttribute('data-theme', 'dark');
    themeToggle.querySelector('i').className = 'fas fa-sun';
} else {
    body.removeAttribute('data-theme');
    themeToggle.querySelector('i').className = 'fas fa-moon';
}

themeToggle.addEventListener('click', () => {
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        themeToggle.querySelector('i').className = 'fas fa-moon';
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        themeToggle.querySelector('i').className = 'fas fa-sun';
        localStorage.setItem('theme', 'dark');
    }
});

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
});

// Animate stats counters
function animateCounters() {
    const counters = document.querySelectorAll('.stat h4');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        updateCounter();
    });
}

// Trigger counters when about section is visible
const aboutSection = document.querySelector('#about');
const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            aboutObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (aboutSection) {
    aboutObserver.observe(aboutSection);
}

// Project cards hover effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simple validation
        if (name && email && subject && message) {
            // Simulate form submission
            contactForm.innerHTML = `
                <div style="text-align: center; padding: 2rem;">
                    <i class="fas fa-check-circle" style="font-size: 4rem; color: var(--primary-color); margin-bottom: 1rem;"></i>
                    <h3>Thank You!</h3>
                    <p>Your message has been sent successfully. I'll get back to you soon!</p>
                </div>
            `;
            
            // Reset form after 5 seconds
            setTimeout(() => {
                window.location.reload();
            }, 5000);
        }
    });
}

// Add scroll progress bar
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    // Optional: Add progress bar if needed
});

// Parallax effect for hero image (subtle)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image img');
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container') && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Performance: Preload critical images
const images = [
    '../mahir.jpeg'
];

images.forEach(src => {
    const img = new Image();
    img.src = src;
});

// Window resize handler
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Recalculate any responsive layouts if needed
    }, 250);
});

// ==================== ENHANCED FEATURES ====================

// 1. TYPING ANIMATION FOR HERO TITLE
function initTypewriterEffect() {
    const heroTitle = document.querySelector('.hero-title .highlight');
    if (!heroTitle) return;
    
    const text = 'Shaik Mahir Babu';
    heroTitle.textContent = '';
    let index = 0;
    
    function type() {
        if (index < text.length) {
            heroTitle.textContent += text.charAt(index);
            index++;
            setTimeout(type, 100);
        }
    }
    
    type();
}

// 2. SCROLL-TO-TOP BUTTON
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'scroll-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        z-index: 998;
        display: none;
        align-items: center;
        justify-content: center;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    `;
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.display = 'flex';
        } else {
            button.style.display = 'none';
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.1)';
    });
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
    });
}

// 3. SKILL PROGRESS BARS ANIMATION
function animateSkillBars() {
    const skillItems = document.querySelectorAll('.skill-items span');
    
    skillItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'all 0.6s ease';
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillItems = entry.target.querySelectorAll('.skill-items span');
                skillItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, index * 100);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    document.querySelectorAll('.skill-category').forEach(category => {
        observer.observe(category);
    });
}

// 4. EXPERIENCE CARDS STAGGER ANIMATION
function animateExperienceCards() {
    const cards = document.querySelectorAll('.experience-item, .education-item, .certification-item');
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const items = entry.target.querySelectorAll('.experience-item, .education-item, .certification-item');
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 150);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    const experienceSection = document.querySelector('#experience');
    if (experienceSection) observer.observe(experienceSection);
}

// 5. FORM VALIDATION WITH VISUAL FEEDBACK
function setupFormValidation() {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', validateInput);
        input.addEventListener('focus', clearError);
    });
    
    function validateInput(e) {
        const input = e.target;
        const value = input.value.trim();
        
        if (!value) {
            showError(input, 'This field is required');
            return false;
        }
        
        if (input.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showError(input, 'Please enter a valid email');
                return false;
            }
        }
        
        clearError(input);
        return true;
    }
    
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        if (!formGroup.querySelector('.error-message')) {
            const errorEl = document.createElement('span');
            errorEl.className = 'error-message';
            errorEl.textContent = message;
            errorEl.style.cssText = `
                color: #ec4899;
                font-size: 0.8rem;
                margin-top: 5px;
                display: block;
            `;
            formGroup.appendChild(errorEl);
        }
        input.style.borderColor = '#ec4899';
    }
    
    function clearError(e) {
        const input = e.target || e;
        const formGroup = input.closest('.form-group');
        const errorEl = formGroup.querySelector('.error-message');
        if (errorEl) errorEl.remove();
        input.style.borderColor = '';
    }
}

// 6. PROJECT CARDS FILTER (if categories added)
function initProjectFilter() {
    const projectCards = document.querySelectorAll('.project-card');
    if (projectCards.length === 0) return;
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
        });
    });
}

// 7. KEYBOARD NAVIGATION
function setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + K to focus on first nav link
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            document.querySelector('.nav-link').focus();
        }
        
        // Escape to close mobile menu
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// 8. LAZY LOADING FOR IMAGES
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    }, { threshold: 0.1 });
    
    images.forEach(img => imageObserver.observe(img));
}

// 9. SCROLL REVEAL ANIMATIONS FOR ALL CARDS
function setupCardRevealAnimations() {
    const cards = document.querySelectorAll(
        '.project-card, .skill-category, .experience-item, .education-item, .certification-item'
    );
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    });
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    cards.forEach(card => revealObserver.observe(card));
}

// 10. NAVBAR DYNAMIC STYLING ON SCROLL
function enhanceNavbarOnScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
            navbar.style.background = 'rgba(255, 255, 255, 0.99)';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });
}

// 11. GOOGLE ANALYTICS-LIKE TRACKING (Optional)
function trackUserInteractions() {
    // Track section views
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log('📍 Viewed section:', entry.target.id);
            }
        });
    }, { threshold: 0.5 });
    
    sections.forEach(section => sectionObserver.observe(section));
    
    // Track external link clicks with new tab animation
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        link.addEventListener('click', (e) => {
            console.log('🔗 External link clicked:', link.href);
            
            // Add click animation
            link.style.animation = 'linkClick 0.4s ease';
            
            // Log analytics data
            const linkText = link.textContent || link.getAttribute('title');
            console.log(`📤 Opening external: ${linkText}`);
        });
    });
}

// 12. SMOOTH SCROLL OFFSET FOR FIXED NAVBAR
function setupAnchorScrollOffset() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            const target = document.querySelector(href);
            
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 13. EXTERNAL LINK NOTIFICATION
function setupExternalLinkNotification() {
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        link.addEventListener('click', (e) => {
            // Create notification
            const notification = document.createElement('div');
            notification.className = 'external-link-notification';
            notification.innerHTML = `
                <i class="fas fa-external-link-alt"></i>
                <span>Opening in new tab...</span>
            `;
            notification.style.cssText = `
                position: fixed;
                bottom: 30px;
                left: 30px;
                background: linear-gradient(135deg, #6366f1, #8b5cf6);
                color: white;
                padding: 12px 20px;
                border-radius: 50px;
                box-shadow: 0 8px 25px rgba(99, 102, 241, 0.3);
                display: flex;
                align-items: center;
                gap: 10px;
                z-index: 1001;
                font-weight: 600;
                animation: slideInNotif 0.4s ease;
            `;
            
            document.body.appendChild(notification);
            
            // Remove after 2 seconds
            setTimeout(() => {
                notification.style.animation = 'slideOutNotif 0.4s ease';
                setTimeout(() => notification.remove(), 400);
            }, 2000);
        });
    });
}

// 14. CLICKABLE ABOUT SECTION STATS
function setupClickableAboutStats() {
    const stats = document.querySelectorAll('.stat[data-stat]');
    
    stats.forEach(stat => {
        stat.addEventListener('click', function() {
            const statType = this.getAttribute('data-stat');
            openStatDetails(statType);
        });
        
        // Add cursor pointer on hover
        stat.style.cursor = 'pointer';
        
        // Add hover animation
        stat.addEventListener('mouseenter', function() {
            this.style.animation = 'statPulse 0.6s ease';
        });
    });
}

// 15. CLICKABLE SKILL BADGES
function setupClickableSkillBadges() {
    const skillBadges = document.querySelectorAll('.skill-badge');
    
    skillBadges.forEach(badge => {
        badge.addEventListener('click', function() {
            const skillName = this.getAttribute('data-skill');
            showSkillDetails(skillName);
        });
    });
}

// 16. CLICKABLE SECTION TITLES
function setupClickableSections() {
    const clickableSections = document.querySelectorAll('.clickable-section');
    
    clickableSections.forEach(section => {
        section.addEventListener('click', function() {
            const sectionName = this.getAttribute('data-section');
            openSectionInNewTab(sectionName);
        });
    });
}

function openSectionInNewTab(sectionName) {
    const currentUrl = window.location.href.split('#')[0];
    const sectionUrl = `${currentUrl}#${sectionName}`;
    
    // Open in new tab
    window.open(sectionUrl, '_blank');
    
    // Show notification
    const toast = document.createElement('div');
    toast.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-external-link-alt"></i>
            <span>Opening ${sectionName.charAt(0).toUpperCase() + sectionName.slice(1)} section in new tab...</span>
        </div>
    `;
    
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        color: white;
        border-radius: 10px;
        padding: 1.2rem 1.5rem;
        max-width: 350px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        z-index: 1001;
        animation: slideInRight 0.4s ease;
        font-size: 0.95rem;
    `;
    
    document.body.appendChild(toast);
    
    // Auto remove after 2 seconds
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.4s ease';
        setTimeout(() => toast.remove(), 400);
    }, 2000);
}

function showSkillDetails(skillName) {
    const skillDetailsMap = {
        'HTML5': 'html5',
        'CSS3': 'css3',
        'JavaScript': 'javascript',
        'React': 'react',
        'Bootstrap': 'bootstrap',
        'Node.js': 'nodejs',
        'PHP': 'php',
        'MySQL': 'mysql',
        'MongoDB': 'mongodb',
        'Git': 'git',
        'GitHub': 'github',
        'VS Code': 'vscode',
        'Figma': 'figma'
    };
    
    const skillId = skillDetailsMap[skillName];
    
    if (skillId) {
        // Open in new tab - scroll to skills section
        const currentUrl = window.location.href.split('#')[0];
        window.open(currentUrl + '#skills', '_blank');
        
        // Show notification that tab opened
        const toast = document.createElement('div');
        toast.className = 'skill-toast';
        toast.innerHTML = `
            <div class="skill-toast-content">
                <h4>${skillName}</h4>
                <p>Opening in new tab...</p>
                <small>✨ Portfolio opened with Skills section in focus</small>
            </div>
        `;
        
        toast.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: rgba(255, 255, 255, 0.95);
            border-left: 4px solid #6366f1;
            border-radius: 10px;
            padding: 1.5rem;
            max-width: 350px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
            z-index: 1001;
            animation: slideInRight 0.4s ease;
            font-size: 0.9rem;
            line-height: 1.6;
        `;
        
        document.body.appendChild(toast);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.4s ease';
            setTimeout(() => toast.remove(), 400);
        }, 3000);
    }
}

function openStatDetails(type) {
    const statDetailsMap = {
        experience: {
            title: 'My Professional Journey',
            content: 'Started in 2021 as an intern, became Junior Developer in 2022, and currently Full Stack Developer since 2023. Gained expertise in React, Node.js, MongoDB, and modern web technologies.',
            url: '#experience'
        },
        projects: {
            title: 'View All Projects',
            content: 'Explore 30+ projects including E-commerce platforms, task managers, weather apps, and more custom solutions for clients.',
            url: '#projects'
        },
        satisfaction: {
            title: 'Client Testimonials',
            content: '100% satisfaction rate from all clients. Fast turnaround, quality code, great communication, and continuous support.',
            url: '#projects'
        }
    };
    
    const details = statDetailsMap[type];
    
    if (details) {
        // Open in new tab and scroll to section
        const currentUrl = window.location.href.split('#')[0];
        window.open(currentUrl + details.url, '_blank');
    }
}

// 17. CLICKABLE PROJECT CARDS
function setupClickableProjects() {
    const projectCards = document.querySelectorAll('.project-card[data-project]');
    
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectName = this.getAttribute('data-project');
            openProjectInNewTab(projectName);
        });
    });
}

function openProjectInNewTab(projectName) {
    const projectDetailsMap = {
        'shop-easy': {
            title: 'ShopEasy - Full E-commerce Platform',
            description: 'Complete Amazon-style shopping platform with cart, checkout, product filtering, and authentication system.'
        },
        'task-master': {
            title: 'TaskMaster Pro',
            description: 'Advanced task management app with drag & drop, real-time collaboration, and progress tracking.'
        },
        'weather-dash': {
            title: 'Weather Dashboard',
            description: 'Real-time weather app with 7-day forecast, interactive maps, and location-based alerts.'
        },
        'portfolio': {
            title: 'Personal Portfolio v2.0',
            description: 'Modern portfolio website with animations, dark/light mode, and interactive elements.'
        }
    };
    
    const project = projectDetailsMap[projectName];
    
    if (project) {
        // Show notification
        const toast = document.createElement('div');
        toast.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <i class="fas fa-project-diagram"></i>
                <span>Opening ${project.title} in new tab...</span>
            </div>
        `;
        
        toast.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: linear-gradient(135deg, #38bdf8, #00bcd4);
            color: white;
            border-radius: 10px;
            padding: 1.2rem 1.5rem;
            max-width: 350px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
            z-index: 1001;
            animation: slideInRight 0.4s ease;
            font-size: 0.95rem;
        `;
        
        document.body.appendChild(toast);
        
        // Open projects section in new tab
        const currentUrl = window.location.href.split('#')[0];
        window.open(currentUrl + '#projects', '_blank');
        
        // Auto remove toast after 2 seconds
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.4s ease';
            setTimeout(() => toast.remove(), 400);
        }, 2000);
    }
}

// INITIALIZATION FUNCTION
function initializePortfolio() {
    console.log('🚀 Initializing Mahir\'s Portfolio...');
    
    // Call all enhancement functions
    initTypewriterEffect();
    createScrollToTopButton();
    animateSkillBars();
    animateExperienceCards();
    setupFormValidation();
    initProjectFilter();
    setupKeyboardNavigation();
    setupLazyLoading();
    setupCardRevealAnimations();
    enhanceNavbarOnScroll();
    trackUserInteractions();
    setupAnchorScrollOffset();
    setupExternalLinkNotification();
    setupClickableAboutStats();
    setupClickableSkillBadges();
    setupClickableSections();
    setupClickableProjects();
    
    console.log('✅ Mahir\'s Portfolio fully loaded! 🚀');
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePortfolio);
} else {
    initializePortfolio();
}

