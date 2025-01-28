document.addEventListener("DOMContentLoaded", () => {
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightbox-image");
    const closeButton = document.getElementById("lightbox-close");
    const prevButton = document.getElementById("lightbox-prev");
    const nextButton = document.getElementById("lightbox-next");
    const images = document.querySelectorAll(".lightbox-trigger");
  
    let currentIndex = 0;
  
    const showLightbox = (index) => {
      currentIndex = index;
      const imageSrc = images[currentIndex].src;
      if (imageSrc) {
        lightboxImage.src = imageSrc;
        lightbox.classList.add("active");
      } else {
        console.error("Image source not found for the selected thumbnail.");
      }
    };
  
    const hideLightbox = () => {
      lightbox.classList.remove("active");
    };
  
    const showNextImage = () => {
      currentIndex = (currentIndex + 1) % images.length;
      showLightbox(currentIndex);
    };
  
    const showPrevImage = () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      showLightbox(currentIndex);
    };
  
    // Attach click events to thumbnails
    images.forEach((img, index) => {
      img.addEventListener("click", () => {
        console.log(`Thumbnail clicked: ${img.src}`);
        showLightbox(index);
      });
    });
  
    // Lightbox controls
    closeButton.addEventListener("click", hideLightbox);
    nextButton.addEventListener("click", showNextImage);
    prevButton.addEventListener("click", showPrevImage);
  
    // Close on background click or 'Escape' key
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) hideLightbox();
    });
  
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") hideLightbox();
      if (e.key === "ArrowRight") showNextImage();
      if (e.key === "ArrowLeft") showPrevImage();
    });
  });
  