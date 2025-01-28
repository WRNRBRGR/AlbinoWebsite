document.addEventListener('DOMContentLoaded', () => {
  const carouselImages = document.querySelector('.carousel-images');
  const images = document.querySelectorAll('.carousel-images img');
  const leftButton = document.querySelector('.carousel-button.left');
  const rightButton = document.querySelector('.carousel-button.right');

  // Clone the first and last images
  const firstClone = images[0].cloneNode(true);
  const lastClone = images[images.length - 1].cloneNode(true);
  carouselImages.appendChild(firstClone);
  carouselImages.insertBefore(lastClone, images[0]);

  const updatedImages = document.querySelectorAll('.carousel-images img');
  let imageWidth = images[0].getBoundingClientRect().width;

  // Set initial position to the first real image
  let currentIndex = 1;
  carouselImages.style.transform = `translateX(-${currentIndex * imageWidth}px)`;

  function updateCarousel() {
      carouselImages.style.transition = 'transform 0.5s ease-in-out';
      carouselImages.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
  }

  function handleTransitionEnd() {
      if (currentIndex === 0) {
          // Jump to the last real image (no transition)
          currentIndex = updatedImages.length - 2;
          carouselImages.style.transition = 'none';
          carouselImages.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
      } else if (currentIndex === updatedImages.length - 1) {
          // Jump to the first real image (no transition)
          currentIndex = 1;
          carouselImages.style.transition = 'none';
          carouselImages.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
      }
  }

  leftButton.addEventListener('click', () => {
      if (currentIndex > 0) {
          currentIndex--;
          updateCarousel();
      }
  });

  rightButton.addEventListener('click', () => {
      if (currentIndex < updatedImages.length - 1) {
          currentIndex++;
          updateCarousel();
      }
  });

  // Listen for the end of the transition
  carouselImages.addEventListener('transitionend', handleTransitionEnd);

  // Debounce function to improve resize performance
  let resizeTimeout;
  const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
          // Update image width and adjust position
          imageWidth = updatedImages[0].getBoundingClientRect().width;
          carouselImages.style.transition = 'none'; // Prevent glitching
          carouselImages.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
      }, 200); // Adjust the delay as needed
  };

  // Adjust the carousel on window resize
  window.addEventListener('resize', handleResize);
});

  