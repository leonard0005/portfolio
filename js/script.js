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

