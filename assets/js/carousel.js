/* ===========================
   Advanced Event Carousel
=========================== */
const carouselContainer = document.querySelector('.carousel-container');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
const indicatorsContainer = document.querySelector('.carousel-indicators');
const eventCards = document.querySelectorAll('.event-card');

let currentIndex = 0;
const totalSlides = eventCards.length;
let autoSlideInterval;

// Create indicators dynamically
for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    indicatorsContainer.appendChild(dot);
}
const dots = document.querySelectorAll('.dot');

// Go to specific slide
function goToSlide(index) {
    currentIndex = index;
    const offset = -index * eventCards[0].offsetWidth;
    carouselContainer.style.transform = `translateX(${offset}px)`;
    updateIndicators();
}

// Update indicator state
function updateIndicators() {
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');
}

// Next & Prev
function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    goToSlide(currentIndex);
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    goToSlide(currentIndex);
}

// Auto-slide every 5 seconds
function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Event Listeners
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

carouselContainer.addEventListener('mouseenter', stopAutoSlide);
carouselContainer.addEventListener('mouseleave', startAutoSlide);

// Initial state
goToSlide(0);
startAutoSlide();

/* ===========================
   Swipe Gesture for Mobile
=========================== */
let startX = 0;
let isSwiping = false;

carouselContainer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isSwiping = true;
    stopAutoSlide(); // Pause auto-slide while swiping
});

carouselContainer.addEventListener('touchmove', (e) => {
    if (!isSwiping) return;

    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;

    // Move carousel slightly while dragging for feedback
    carouselContainer.style.transition = 'none';
    const offset = (-currentIndex * eventCards[0].offsetWidth) + diff;
    carouselContainer.style.transform = `translateX(${offset}px)`;
});

carouselContainer.addEventListener('touchend', (e) => {
    isSwiping = false;
    carouselContainer.style.transition = 'transform 0.3s ease';

    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX;

    if (Math.abs(diff) > 50) { // Swipe threshold
        if (diff > 0) {
            prevSlide();
        } else {
            nextSlide();
        }
    } else {
        // Snap back if swipe is too small
        goToSlide(currentIndex);
    }

    startAutoSlide(); // Resume auto-slide
});
