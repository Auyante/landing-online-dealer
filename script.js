document.addEventListener('DOMContentLoaded', () => {
    // 1. Fade-in Scroll Animations
    const fadeElements = document.querySelectorAll('.fade-in');

    const checkVisibility = () => {
        const triggerBottom = window.innerHeight / 5 * 4;

        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < triggerBottom) {
                element.classList.add('visible');
            }
        });
    };

    // Run on load and scroll
    window.addEventListener('scroll', checkVisibility);
    checkVisibility();

    // 2. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
            navbar.style.padding = '0.5rem 0';
        } else {
            navbar.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
            navbar.style.padding = '1rem 0';
        }
    });

    // 3. Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Auto-slide Payment Carousel on small screens
    const carousel = document.querySelector('.payment-carousel');
    if (carousel) {
        const images = Array.from(carousel.querySelectorAll('img'));
        const totalImages = images.length;
        let currentIndex = 0;
        let autoSlideTimer = null;
        let dotsContainer = null;

        function isMobile() {
            return window.innerWidth <= 768;
        }

        // Create dot indicators
        function createDots() {
            if (dotsContainer) dotsContainer.remove();
            if (!isMobile()) return;

            dotsContainer = document.createElement('div');
            dotsContainer.className = 'carousel-dots';
            for (let i = 0; i < totalImages; i++) {
                const dot = document.createElement('span');
                dot.className = 'dot' + (i === 0 ? ' active' : '');
                dot.addEventListener('click', () => {
                    currentIndex = i;
                    scrollToIndex(i);
                    resetAutoSlide();
                });
                dotsContainer.appendChild(dot);
            }
            carousel.parentNode.insertBefore(dotsContainer, carousel.nextSibling);
        }

        function updateDots() {
            if (!dotsContainer) return;
            const dots = dotsContainer.querySelectorAll('.dot');
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
        }

        function scrollToIndex(index) {
            const scrollAmount = carousel.offsetWidth * index;
            carousel.scrollTo({ left: scrollAmount, behavior: 'smooth' });
            updateDots();
        }

        function nextSlide() {
            if (!isMobile()) {
                stopAutoSlide();
                return;
            }
            currentIndex = (currentIndex + 1) % totalImages;
            scrollToIndex(currentIndex);
        }

        function startAutoSlide() {
            stopAutoSlide();
            if (!isMobile()) return;
            autoSlideTimer = setInterval(nextSlide, 3000);
        }

        function stopAutoSlide() {
            if (autoSlideTimer) {
                clearInterval(autoSlideTimer);
                autoSlideTimer = null;
            }
        }

        function resetAutoSlide() {
            stopAutoSlide();
            startAutoSlide();
        }

        // Sync dots when user swipes manually
        let scrollTimeout;
        carousel.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                const newIndex = Math.round(carousel.scrollLeft / carousel.offsetWidth);
                if (newIndex !== currentIndex && newIndex >= 0 && newIndex < totalImages) {
                    currentIndex = newIndex;
                    updateDots();
                }
            }, 100);
        });

        // Pause auto-slide on touch, resume on release
        carousel.addEventListener('touchstart', stopAutoSlide, { passive: true });
        carousel.addEventListener('touchend', () => {
            setTimeout(startAutoSlide, 2000);
        }, { passive: true });

        // Initialize
        createDots();
        startAutoSlide();

        // Handle resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                currentIndex = 0;
                createDots();
                if (isMobile()) {
                    carousel.scrollTo({ left: 0, behavior: 'auto' });
                    startAutoSlide();
                } else {
                    stopAutoSlide();
                }
            }, 250);
        });
    }
});
