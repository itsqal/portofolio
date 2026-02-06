// Project Carousel Navigation
const projectsCarousel = document.getElementById('projectsCarousel');
const projectsCarouselTrack = projectsCarousel.querySelector('div');
const projectCards = document.querySelectorAll('.project-card');
const prevBtn = document.getElementById('projectsCarouselPrev');
const nextBtn = document.getElementById('projectsCarouselNext');

let currentIndex = 0;

function getCardsPerView() {
    // Determine how many cards are visible based on screen width
    if (window.innerWidth < 640) return 1; // mobile
    if (window.innerWidth < 1024) return 2; // tablet
    return 3; // desktop
}

function getCardWidth() {
    // Get the actual width of a card including gap
    const card = projectCards[0];
    const cardWidth = card.offsetWidth;
    const gap = 24; // 1.5rem = 24px (gap-6 in Tailwind)
    return cardWidth + gap;
}

function updateCarousel() {
    const cardWidth = getCardWidth();
    const offset = currentIndex * cardWidth;
    projectsCarouselTrack.style.transform = `translateX(-${offset}px)`;
    
    // Update button states
    const cardsPerView = getCardsPerView();
    const maxIndex = Math.max(0, projectCards.length - cardsPerView);
    
    prevBtn.style.opacity = currentIndex === 0 ? '0.3' : '1';
    prevBtn.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';
    
    nextBtn.style.opacity = currentIndex >= maxIndex ? '0.3' : '1';
    nextBtn.style.pointerEvents = currentIndex >= maxIndex ? 'none' : 'auto';
}

function goToNext() {
    const cardsPerView = getCardsPerView();
    const maxIndex = Math.max(0, projectCards.length - cardsPerView);
    
    if (currentIndex < maxIndex) {
        currentIndex++;
        updateCarousel();
    }
}

function goToPrev() {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
}

// Event listeners
nextBtn.addEventListener('click', goToNext);
prevBtn.addEventListener('click', goToPrev);

// Reset carousel on window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        const cardsPerView = getCardsPerView();
        const maxIndex = Math.max(0, projectCards.length - cardsPerView);
        
        // Adjust current index if needed
        if (currentIndex > maxIndex) {
            currentIndex = maxIndex;
        }
        updateCarousel();
    }, 250);
});

// Initialize
updateCarousel();

// Optional: Touch/Swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

projectsCarousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

projectsCarousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50; // minimum distance for swipe
    
    if (touchStartX - touchEndX > swipeThreshold) {
        // Swiped left - go to next
        goToNext();
    }
    
    if (touchEndX - touchStartX > swipeThreshold) {
        // Swiped right - go to previous
        goToPrev();
    }
}