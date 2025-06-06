// Hiệu ứng fade-in và xoay khi cuộn trang
const elements = document.querySelectorAll('.order-step, .section-title, .contact-info');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.getAttribute('data-delay') || 0;
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, delay);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

elements.forEach(element => {
    observer.observe(element);
});

// Hiệu ứng nhấp để làm nổi bật
const steps = document.querySelectorAll('.order-step');
steps.forEach(step => {
    step.addEventListener('click', () => {
        steps.forEach(s => s.style.background = 'rgba(255, 255, 255, 0.9)');
        step.style.background = 'linear-gradient(45deg, #f1c40f, #e67e22)';
        setTimeout(() => {
            step.style.background = 'rgba(255, 255, 255, 0.9)';
        }, 1000);
    });
});

// Initialize Swiper instances
let benefitsSwiper = null;

// Initialize Benefits Swiper
function initBenefitsSwiper() {
    if (!benefitsSwiper) {
        benefitsSwiper = new Swiper('.benefits-swiper', {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: '.benefits-swiper .swiper-button-next',
                prevEl: '.benefits-swiper .swiper-button-prev',
            },
            pagination: {
                el: '.benefits-swiper .swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 10
                },
                480: {
                    slidesPerView: 2,
                    spaceBetween: 15
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 20
                }
            }
        });
    }
}

// Initialize Features Swiper
const featuresSwiper = new Swiper('.features-swiper', {
    slidesPerView: 'auto',
    spaceBetween: 20,
    loop: true,
    speed: 800,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },
    pagination: {
        el: '.features-swiper .swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.features-swiper .swiper-button-next',
        prevEl: '.features-swiper .swiper-button-prev',
    },
    breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 10
        },
        480: {
            slidesPerView: 2,
            spaceBetween: 15
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 20
        }
    },
    effect: 'slide',
    grabCursor: true,
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    observer: true,
    observeParents: true,
});

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
    initBenefitsSwiper();
});

// Update on resize
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        if (benefitsSwiper) {
            benefitsSwiper.update();
        }
    }, 250);
});

// Mobile Menu
const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuClose = document.querySelector('.mobile-menu-close');
const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
const mobileMenuLinks = document.querySelectorAll('.mobile-nav-links a');

function openMobileMenu() {
    mobileMenu.classList.add('active');
    mobileMenuOverlay.classList.add('active');
    document.body.classList.add('menu-open');
}

function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    mobileMenuOverlay.classList.remove('active');
    document.body.classList.remove('menu-open');
}

mobileMenuIcon.addEventListener('click', openMobileMenu);
mobileMenuClose.addEventListener('click', closeMobileMenu);
mobileMenuOverlay.addEventListener('click', closeMobileMenu);

// Close mobile menu when clicking on a link
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        closeMobileMenu();
    });
});

// Header scroll effect
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 50) {
        header.classList.remove('scroll-up');
        header.classList.remove('scroll-down');
        return;
    }

    if (currentScroll > lastScroll && currentScroll > 50) {
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll) {
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Force light mode
function forceLightMode() {
    // Add light mode class to html element
    document.documentElement.classList.add('light-mode');
    document.documentElement.classList.remove('dark-mode');
    
    // Set meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
        metaThemeColor.setAttribute('content', '#FAF8F5');
    }

    // Force light color scheme
    document.documentElement.style.colorScheme = 'light';
    document.documentElement.style.forcedColorAdjust = 'none';
}

// Check and force light mode on load
document.addEventListener('DOMContentLoaded', function() {
    forceLightMode();
    
    // Watch for system color scheme changes
    if (window.matchMedia) {
        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Force light mode when system changes to dark
        darkModeMediaQuery.addEventListener('change', (e) => {
            if (e.matches) {
                forceLightMode();
            }
        });
    }
});

