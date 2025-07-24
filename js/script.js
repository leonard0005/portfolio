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
// Add this to your script.js
let currentSlideIndex = 1;

function changeSlide(direction) {
  showSlide(currentSlideIndex += direction);
}

function currentSlide(slideIndex) {
  showSlide(currentSlideIndex = slideIndex);
}

function showSlide(slideIndex) {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  
  if (slideIndex > slides.length) {
    currentSlideIndex = 1;
  }
  if (slideIndex < 1) {
    currentSlideIndex = slides.length;
  }
  
  // Hide all slides
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  
  // Show current slide
  slides[currentSlideIndex - 1].classList.add('active');
  dots[currentSlideIndex - 1].classList.add('active');
}

// Auto-play functionality (optional)
function autoSlide() {
  currentSlideIndex++;
  showSlide(currentSlideIndex);
}

// Uncomment to enable auto-play every 5 seconds
// setInterval(autoSlide, 5000);

// Touch/swipe support for mobile  *maybe it doesnt work (at least on desktop)*
let startX = 0;
let endX = 0;

document.querySelector('.slider-container').addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

document.querySelector('.slider-container').addEventListener('touchend', (e) => {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  const threshold = 50;
  const diff = startX - endX;
  
  if (Math.abs(diff) > threshold) {
    if (diff > 0) {
      changeSlide(1); // Swipe left - next slide
    } else {
      changeSlide(-1); // Swipe right - previous slide
    }
  }
}


//end of slider