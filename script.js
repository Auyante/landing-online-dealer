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
        const images = carousel.querySelectorAll('img');
        let currentIndex = 0;
        let autoSlideInterval = null;

        function slideTo(index) {
            images.forEach(img => {
                img.style.transform = `translateX(-${index * 100}%)`;
            });
        }

        function startAutoSlide() {
            // Only auto-slide on screens <= 768px
            if (window.innerWidth > 768) {
                // Reset position on desktop
                images.forEach(img => { img.style.transform = ''; });
                return;
            }

            if (autoSlideInterval) clearInterval(autoSlideInterval);
            
            autoSlideInterval = setInterval(() => {
                if (window.innerWidth > 768) {
                    clearInterval(autoSlideInterval);
                    images.forEach(img => { img.style.transform = ''; });
                    return;
                }
                currentIndex = (currentIndex + 1) % images.length;
                slideTo(currentIndex);
            }, 3000);
        }

        // Initialize and handle resize
        startAutoSlide();
        window.addEventListener('resize', () => {
            currentIndex = 0;
            slideTo(0);
            startAutoSlide();
        });
    }
});
