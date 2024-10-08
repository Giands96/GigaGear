document.addEventListener('DOMContentLoaded', function() {
    const slider = document.getElementById('slider');
    const slides = slider.children;
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const dots = document.querySelectorAll('.dot');

    let currentSlide = 0;
    const slideCount = slides.length;

    function goToSlide(n) {
        slider.style.transform = `translateX(-${n * 100}%)`;
        currentSlide = n;
        updateDots();
    }

    function nextSlide() {
        goToSlide((currentSlide + 1) % slideCount);
    }

    function prevSlide() {
        goToSlide((currentSlide - 1 + slideCount) % slideCount);
    }

    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('opacity-100', index === currentSlide);
            dot.classList.toggle('opacity-50', index !== currentSlide);
        });
    }

    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });

    // Auto slide every 4 seconds
    setInterval(nextSlide, 4000);
});