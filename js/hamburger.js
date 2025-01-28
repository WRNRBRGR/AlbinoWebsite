const menuIcon = document.getElementById('menu-icon');
  const navigation = document.getElementById('navigation');

  // Load Lottie animation
  const lottieAnimation = lottie.loadAnimation({
    container: menuIcon,
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: '../animations/A_HamburgerMenu.json' // Replace with your Lottie file path
  });

  let isOpen = false;

  menuIcon.addEventListener('click', () => {
    if (isOpen) {
      lottieAnimation.playSegments([16, 0], true); // Play reverse (cross to hamburger)
      navigation.classList.add('hidden'); // Hide navigation
    } else {
      lottieAnimation.playSegments([0, 16], true); // Play forward (hamburger to cross)
      navigation.classList.remove('hidden'); // Show navigation
    }
    isOpen = !isOpen;
  });



  // Check if background is dark or not?

  function getAverageBrightness(videoElement) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;

    ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    let totalBrightness = 0;
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
      totalBrightness += brightness;
    }

    const avgBrightness = totalBrightness / (canvas.width * canvas.height);
    return avgBrightness;
  }

  function updateLottieColor(avgBrightness) {
    const color = avgBrightness > 128 ? '#000000' : '#ffffff'; // Dark or light threshold
    lottieAnimation.renderer.elements[0].setAttribute('fill', color);
  }

  const videoElement = document.querySelector('video');
  videoElement.addEventListener('timeupdate', () => {
    const avgBrightness = getAverageBrightness(videoElement);
    updateLottieColor(avgBrightness);
  });