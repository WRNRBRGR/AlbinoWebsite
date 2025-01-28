// Select all the items in the illustration gallery
const items = document.querySelectorAll('.illustration-item');

// Select the modal and its contents
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modal-image');
const closeBtn = document.getElementById('close-btn');

// Add event listener to each illustration item for the click event
items.forEach(item => {
    item.addEventListener('click', (e) => {
        // Get the image source from the clicked item
        const imgSrc = item.querySelector('img').src; // Changed e.target to item

        // Display the modal and set the image in the modal
        modal.style.display = 'flex';
        modalImage.src = imgSrc;
    });
});

// Close the modal when the close button is clicked
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close the modal if the user clicks outside the modal content
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none'; // Hide modal if the background is clicked
    }
});
