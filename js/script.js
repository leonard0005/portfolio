function goToPage(htmlFileName) {
  window.location.href = htmlFileName;
}

// Function to toggle mobile menu
function toggleMobileMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  
  if (mobileMenu.style.display === 'block') {
    mobileMenu.style.display = 'none';
    hamburgerBtn.classList.remove('active');
  } else {
    mobileMenu.style.display = 'block';
    hamburgerBtn.classList.add('active');
  }
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
  const mobileMenu = document.getElementById('mobileMenu');
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const nav = document.querySelector('nav');
  
  if (!nav.contains(event.target)) {
    mobileMenu.style.display = 'none';
    hamburgerBtn.classList.remove('active');
  }
});

// Function to set content div position based on actual header height
function setContentPosition() {
  const header = document.querySelector('.header');
  const contentDiv = document.querySelector('.content-div');
  
  if (header && contentDiv) {
    const headerHeight = header.offsetHeight;
    contentDiv.style.paddingTop = `${headerHeight + 40}px`;
  }
}

// Run on page load
document.addEventListener('DOMContentLoaded', setContentPosition);

// Run on window resize to handle responsive changes
window.addEventListener('resize', setContentPosition);






// SLIDER 
// Object to store each slider's current index
const sliderStates = {};

function changeSlide(direction, sliderId) {
  // Initialize slider if it doesn't exist
  if (!sliderStates[sliderId]) {
    sliderStates[sliderId] = { currentIndex: 1 };
  }
  
  sliderStates[sliderId].currentIndex += direction;
  showSlide(sliderStates[sliderId].currentIndex, sliderId);
}

function currentSlide(slideIndex, sliderId) {
  // Initialize slider if it doesn't exist
  if (!sliderStates[sliderId]) {
    sliderStates[sliderId] = { currentIndex: 1 };
  }
  
  sliderStates[sliderId].currentIndex = slideIndex;
  showSlide(slideIndex, sliderId);
}

function showSlide(slideIndex, sliderId) {
  // Get slides and dots for this specific slider only
  const sliderContainer = document.getElementById(sliderId);
  if (!sliderContainer) return;
  
  const slides = sliderContainer.querySelectorAll('.slide');
  const dots = sliderContainer.querySelectorAll('.dot');
  
  // Handle wraparound
  if (slideIndex > slides.length) {
    sliderStates[sliderId].currentIndex = 1;
  }
  if (slideIndex < 1) {
    sliderStates[sliderId].currentIndex = slides.length;
  }
  
  const currentIndex = sliderStates[sliderId].currentIndex;
  
  // Hide all slides and dots for this slider
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  
  // Show current slide and dot for this slider
  if (slides[currentIndex - 1]) {
    slides[currentIndex - 1].classList.add('active');
  }
  if (dots[currentIndex - 1]) {
    dots[currentIndex - 1].classList.add('active');
  }
}

// Initialize all sliders when page loads
function initializeSliders() {
  const sliders = document.querySelectorAll('.photo-slider');
  sliders.forEach((slider, index) => {
    const sliderId = slider.id || `slider-${index}`;
    slider.id = sliderId; // Ensure each slider has an ID
    
    // Initialize the slider state
    sliderStates[sliderId] = { currentIndex: 1 };
    
    // Show first slide
    showSlide(1, sliderId);
    
    // Add touch/swipe support for this specific slider
    const sliderContainer = slider.querySelector('.slider-container');
    if (sliderContainer) {
      let startX = 0;
      let endX = 0;
      
      sliderContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
      });
      
      sliderContainer.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        const threshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > threshold) {
          if (diff > 0) {
            changeSlide(1, sliderId); // Swipe left - next slide
          } else {
            changeSlide(-1, sliderId); // Swipe right - previous slide
          }
        }
      });
    }
  });
}

// Initialize sliders when page loads
document.addEventListener('DOMContentLoaded', initializeSliders);


//end of slider