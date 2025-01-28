document.addEventListener("DOMContentLoaded", () => {
  // Get all video containers on the page
  const videoContainers = document.querySelectorAll(".video-container-top");

  videoContainers.forEach((container) => {
    const video = container.querySelector("video");
    const playPauseButton = container.querySelector("#playPause");
    const playIcon = container.querySelector("#playIcon");
    const pauseIcon = container.querySelector("#pauseIcon");
    const muteButton = container.querySelector("#mute");
    const fullscreenButton = container.querySelector("#fullscreen");
    const timeline = container.querySelector("#timeline");
    const centerPlayButton = container.querySelector(".play-button");

    const muteSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
<polygon class="st0" points="23.76 8.94 22.35 7.53 19.29 10.59 16.23 7.53 14.82 8.94 17.88 12 14.82 15.06 16.23 16.47 19.29 13.41 22.35 16.47 23.76 15.06 20.7 12 23.76 8.94"/>
  <path class="st0" d="M6.17,8.01H1.05c-.15,0-.27.12-.27.27v7.44c0,.15.12.27.27.27h5.12s.09.01.12.03l7.4,3.76c.18.09.4-.04.4-.24V4.46c0-.2-.21-.33-.4-.24l-7.4,3.76s-.08.03-.12.03Z"/>     
  </svg>
      
    `;

    const unmuteSVG = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
       <path class="st0" d="M6.17,8.01H1.05c-.15,0-.27.12-.27.27v7.44c0,.15.12.27.27.27h5.12s.09.01.12.03l7.4,3.76c.18.09.4-.04.4-.24V4.46c0-.2-.21-.33-.4-.24l-7.4,3.76s-.08.03-.12.03Z"/>
  <path class="st0" d="M19.37,20.26l-1.79-.89c3.63-7.33.04-14.67,0-14.74l1.78-.9c.17.33,4.09,8.28,0,16.53h0Z"/>
      </svg>
    `;

    let isPlaying = false;
    let isMuted = false;

    // Play/Pause functionality for both play buttons
    function togglePlayPause() {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
    }

    // Center Play button (the one in the middle of the video)
    centerPlayButton.addEventListener("click", togglePlayPause);

    // Play/Pause button from the controls
    playPauseButton.addEventListener("click", togglePlayPause);

    // Update the UI based on the play/pause state
    video.addEventListener("play", () => {
      isPlaying = true;
      playIcon.style.display = "none";  // Hide play icon
      pauseIcon.style.display = "block";  // Show pause icon
      centerPlayButton.style.display = "none"; // Hide center play button when video is playing
    });

    video.addEventListener("pause", () => {
      isPlaying = false;
      playIcon.style.display = "block";  // Show play icon
      pauseIcon.style.display = "none";  // Hide pause icon
      centerPlayButton.style.display = "flex"; // Show center play button when video is paused
    });

    // Mute/Unmute button functionality
    muteButton.addEventListener("click", () => {
      isMuted = !isMuted;
      video.muted = isMuted;

      // Set custom SVG based on mute state
      if (isMuted) {
        muteButton.innerHTML = muteSVG;
      } else {
        muteButton.innerHTML = unmuteSVG;
      }
    });

    // Fullscreen button functionality
    fullscreenButton.addEventListener("click", () => {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        video.requestFullscreen();
      }
    });

    // Update the timeline (progress bar) while video is playing
    video.addEventListener("timeupdate", () => {
      timeline.value = (video.currentTime / video.duration) * 100 || 0;
    });

    // Timeline input control to skip to a specific time
    timeline.addEventListener("input", () => {
      video.currentTime = (timeline.value / 100) * video.duration;
    });

    // Make the entire video area clickable to toggle play/pause
    video.addEventListener("click", togglePlayPause);
  });
});



// Dynamic Margin-Top for the Project Section
window.addEventListener("load", () => {
  const videoContainer = document.querySelector(".video-container-top");
  const projectSection = document.querySelector(".project-section");

  if (videoContainer && projectSection) {
    const videoHeight = videoContainer.offsetHeight;
    projectSection.style.marginTop = `${videoHeight}px`;
  }
});

window.addEventListener("resize", () => {
  const videoContainer = document.querySelector(".video-container-top");
  const projectSection = document.querySelector(".project-section");

  if (videoContainer && projectSection) {
    const videoHeight = videoContainer.offsetHeight;
    projectSection.style.marginTop = `${videoHeight}px`;
  }
});