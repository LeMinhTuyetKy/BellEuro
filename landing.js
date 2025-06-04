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
