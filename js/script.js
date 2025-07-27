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
document.addEventListener('DOMContentLoaded', function() {
  initializeSliders();
  addModalListeners();
});


//end of slider

// FULLSCREEN MODAL FUNCTIONALITY
let currentModalSlider = null;
let currentModalIndex = 0;
let modalImages = [];

function openModal(mediaSrc, sliderId) {
  const modal = document.getElementById('photoModal');
  const modalImage = document.getElementById('modalImage');
  const modalVideo = document.getElementById('modalVideo');
  
  // Store current slider info
  currentModalSlider = sliderId;
  
  // Get all media from the current slider (images and videos)
  const sliderContainer = document.getElementById(sliderId);
  const slides = sliderContainer.querySelectorAll('.slide');
  modalImages = Array.from(slides).map(slide => {
    const img = slide.querySelector('img');
    const video = slide.querySelector('video');
    if (img) {
      return { src: img.src, alt: img.alt, type: 'image' };
    } else if (video) {
      return { src: video.querySelector('source').src, alt: 'Video', type: 'video' };
    }
  }).filter(item => item); // Remove any undefined items
  
  // Find current media index
  currentModalIndex = modalImages.findIndex(item => item.src === mediaSrc);
  if (currentModalIndex === -1) currentModalIndex = 0;
  
  // Display the correct media type
  const currentMedia = modalImages[currentModalIndex];
  if (currentMedia.type === 'video') {
    modalImage.style.display = 'none';
    modalVideo.style.display = 'block';
    modalVideo.querySelector('source').src = currentMedia.src;
    modalVideo.load(); // Reload the video with new source
  } else {
    modalVideo.style.display = 'none';
    modalImage.style.display = 'block';
    modalImage.src = currentMedia.src;
    modalImage.alt = currentMedia.alt;
  }
  
  // Show modal
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeModal() {
  const modal = document.getElementById('photoModal');
  const modalImage = document.getElementById('modalImage');
  const modalVideo = document.getElementById('modalVideo');
  
  modal.style.display = 'none';
  document.body.style.overflow = 'auto'; // Restore scrolling
  
  // Reset both media elements
  modalImage.style.display = 'none';
  modalVideo.style.display = 'none';
  modalVideo.pause(); // Pause video when modal closes
  
  currentModalSlider = null;
  currentModalIndex = 0;
  modalImages = [];
}

function modalChangeSlide(direction) {
  if (modalImages.length === 0) return;
  
  currentModalIndex += direction;
  
  // Handle wraparound
  if (currentModalIndex >= modalImages.length) {
    currentModalIndex = 0;
  }
  if (currentModalIndex < 0) {
    currentModalIndex = modalImages.length - 1;
  }
  
  // Update modal media
  const modalImage = document.getElementById('modalImage');
  const modalVideo = document.getElementById('modalVideo');
  const currentMedia = modalImages[currentModalIndex];
  
  if (currentMedia.type === 'video') {
    modalImage.style.display = 'none';
    modalVideo.style.display = 'block';
    modalVideo.querySelector('source').src = currentMedia.src;
    modalVideo.load(); // Reload the video with new source
  } else {
    modalVideo.style.display = 'none';
    modalImage.style.display = 'block';
    modalImage.src = currentMedia.src;
    modalImage.alt = currentMedia.alt;
  }
  
  // Update the corresponding slider to match
  if (currentModalSlider) {
    sliderStates[currentModalSlider].currentIndex = currentModalIndex + 1;
    showSlide(currentModalIndex + 1, currentModalSlider);
  }
}

// Close modal when clicking outside the image
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('photoModal');
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal || e.target.classList.contains('modal-content')) {
        closeModal();
      }
    });
  }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeModal();
  }
  // Navigate with arrow keys
  if (document.getElementById('photoModal').style.display === 'block') {
    if (e.key === 'ArrowLeft') {
      modalChangeSlide(-1);
    }
    if (e.key === 'ArrowRight') {
      modalChangeSlide(1);
    }
  }
});

// Add click listeners to all slider images
function addModalListeners() {
  const sliders = document.querySelectorAll('.photo-slider');
  sliders.forEach(slider => {
    const sliderId = slider.id;
    const sliderContainer = slider.querySelector('.slider-container');
    
    // Add click listener to the slider container
    if (sliderContainer) {
      sliderContainer.addEventListener('click', function(e) {
        // Check if an image or video was clicked
        if (e.target.tagName === 'IMG' || e.target.tagName === 'VIDEO') {
          console.log('Media clicked - src:', e.target.src || e.target.currentSrc, 'sliderId:', sliderId);
          openModal(e.target.src || e.target.currentSrc, sliderId);
        }
      });
    }
  });
}