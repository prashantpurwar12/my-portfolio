
document.addEventListener('DOMContentLoaded', () => {
    // DOM Cache
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navOverlay = document.getElementById('nav-overlay');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollProgressBar = document.getElementById('scrollProgressBar');

    
    const handleNavbarScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    handleNavbarScroll(); // Initial invocation on load

    
    const toggleMobileMenu = () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        navOverlay.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    };

    const closeMobileMenu = () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    hamburger.addEventListener('click', toggleMobileMenu);
    navOverlay.addEventListener('click', closeMobileMenu);

    // Close menu on nav-link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close menu on ESC keypress
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMobileMenu();
    });

    /* 
    =========================================
       3. HIGH-PERFORMANCE ACTIVE NAV LINK HIGHLIGHTING
       (Uses IntersectionObserver instead of expensive scroll listeners)
    =========================================
    */
    const observerOptions = {
        root: null,
        rootMargin: '-30% 0px -60% 0px', // Target trigger boundary
        threshold: 0
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                const targetLink = document.querySelector(`.nav-link[href="#${id}"]`);
                
                if (targetLink) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    targetLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => navObserver.observe(section));

    /* 
    =========================================
       4. SCROLL PROGRESS INDICATOR
    =========================================
    */
    const handleScrollProgress = () => {
        const scrollDistance = window.scrollY;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (documentHeight > 0 && scrollProgressBar) {
            const scrollPercentage = (scrollDistance / documentHeight) * 100;
            scrollProgressBar.style.width = `${scrollPercentage}%`;
        }
    };
    window.addEventListener('scroll', handleScrollProgress, { passive: true });

    /* 
    =========================================
       5. INTERSECTION OBSERVER FOR FADE-IN SCROLL ANIMATIONS
    =========================================
    */
    const fadeInOptions = {
        threshold: 0.05,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, fadeInOptions);

    const animatedElements = document.querySelectorAll(
        '.service-card, .project-card, .cert-item, .contact-method, .achievement-item, .education-item, .testimonial-card'
    );

    animatedElements.forEach(element => {
        // Set initial transition styles via JS to keep CSS clean
        element.style.opacity = '0';
        element.style.transform = 'translateY(25px)';
        element.style.transition = 'opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1), transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
        fadeInObserver.observe(element);
    });

    /* 
    =========================================
       6. SCROLL TO TOP FLOATING BUTTON
    =========================================
    */
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--bg-card);
        color: var(--text-primary);
        border: 1px solid var(--border-color);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        visibility: hidden;
        transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
        z-index: 1000;
        box-shadow: var(--shadow-sm);
    `;

    document.body.appendChild(scrollToTopBtn);

    const toggleScrollToTop = () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    };
    window.addEventListener('scroll', toggleScrollToTop, { passive: true });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    scrollToTopBtn.addEventListener('mouseenter', () => {
        scrollToTopBtn.style.transform = 'translateY(-3px) scale(1.05)';
        scrollToTopBtn.style.background = 'var(--text-primary)';
        scrollToTopBtn.style.color = 'var(--bg-primary)';
        scrollToTopBtn.style.boxShadow = 'var(--shadow-lg)';
    });

    scrollToTopBtn.addEventListener('mouseleave', () => {
        scrollToTopBtn.style.transform = 'translateY(0) scale(1)';
        scrollToTopBtn.style.background = 'var(--bg-card)';
        scrollToTopBtn.style.color = 'var(--text-primary)';
        scrollToTopBtn.style.boxShadow = 'var(--shadow-sm)';
    });

    console.log('Premium Portfolio Script initialized successfully! 🚀');
});
