document.addEventListener('DOMContentLoaded', () => {
  const textSections = document.querySelectorAll('.text-section');

  // Set the background color from the data attribute
  textSections.forEach(section => {
    const bgColor = section.dataset.bgColor || '#fff';
    section.style.setProperty('--bg-color', bgColor);
  });

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, { threshold: 0.5 }); // Trigger when 50% of the section is visible

  textSections.forEach(section => observer.observe(section));
});


// Parallax Section
document.addEventListener('DOMContentLoaded', () => {
const parallaxSections = document.querySelectorAll('.parallax-text-section');

// Set the background image from the data attribute
parallaxSections.forEach(section => {
  const bgImage = section.dataset.bgImage || '';
  if (bgImage) {
    section.style.backgroundImage = `url(${bgImage})`;
  }
});

// Function to update background position for parallax effect
function parallaxScroll() {
  parallaxSections.forEach(section => {
    const rect = section.getBoundingClientRect();
    const sectionHeight = section.offsetHeight;
    const windowHeight = window.innerHeight;

    // Calculate the parallax effect's offset
    const yOffset = (rect.top - windowHeight / 2) * -0.4; // Adjust offset calculation
    const bgPosition = `center calc(50% + ${yOffset}px)`; // Keep background centered while scrolling

    section.style.backgroundPosition = bgPosition; // Set the new background position
  });
}

// Listen for scroll events
window.addEventListener('scroll', parallaxScroll);

// IntersectionObserver to trigger text animation
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // Only animate once
    }
  });
}, { threshold: 0.5 }); // Trigger when 50% of the section is visible

parallaxSections.forEach(section => observer.observe(section));
});
