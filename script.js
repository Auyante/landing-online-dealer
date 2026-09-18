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

        function isMobile() {
            return window.innerWidth <= 768;
        }

        function slideTo(index) {
            const offset = index * -100;
            images.forEach(img => {
                img.style.transform = 'translateX(' + offset + '%)';
            });
        }

        function resetSlider() {
            images.forEach(img => {
                img.style.transform = '';
            });
            currentIndex = 0;
        }

        function nextSlide() {
            if (!isMobile()) {
                stopAutoSlide();
                resetSlider();
                return;
            }
            currentIndex = (currentIndex + 1) % totalImages;
            slideTo(currentIndex);
        }

        function startAutoSlide() {
            stopAutoSlide();
            if (!isMobile()) {
                resetSlider();
                return;
            }
            slideTo(currentIndex);
            autoSlideTimer = setInterval(nextSlide, 3000);
        }

        function stopAutoSlide() {
            if (autoSlideTimer) {
                clearInterval(autoSlideTimer);
                autoSlideTimer = null;
            }
        }

        // Start on load
        startAutoSlide();

        // Restart on resize (with debounce)
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                currentIndex = 0;
                startAutoSlide();
            }, 250);
        });
    }
});
