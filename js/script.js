document.addEventListener("DOMContentLoaded", function () {
    // Get elements
    const hamburger = document.getElementById("hamburger");
    const navigation = document.getElementById("navigation");
    const portfolioItems = document.querySelectorAll(".portfolio-item");
    const header = document.querySelector(".header");
    const videoContainer = document.querySelector(".fullscreen-video-container");
    const svgLogo = document.getElementById("svg-logo");
    const lottieLogo = document.getElementById("lottie-logo");
    const lottieNavContainer = document.getElementById("lottie-logo-nav");
    const pageWrapper = document.getElementById("page-wrapper");
    const fullscreenVideo = document.querySelector(".fullscreen-video");

    // Initialize Lottie Animation for Navigation
    if (lottieNavContainer) {
        const navLottieAnimation = lottie.loadAnimation({
            container: lottieNavContainer,
            path: "animations/A_LogoIcon_NavAnim.json",
            renderer: "svg",
            loop: false,
            autoplay: false,
        });

        // Hamburger Menu Logic
        function toggleHamburgerMenu() {
            hamburger.classList.toggle("open");
            navigation.classList.toggle("show");
            document.body.classList.toggle("no-scroll");

            if (navigation.classList.contains("show")) {
                navLottieAnimation.play();
            } else {
                navLottieAnimation.stop();
            }
        }

        if (hamburger) {
            hamburger.addEventListener("click", toggleHamburgerMenu);
        }

        // Close menu if clicking outside
        window.addEventListener("click", (e) => {
            if (
                navigation &&
                !navigation.contains(e.target) &&
                !hamburger.contains(e.target)
            ) {
                navigation.classList.remove("show");
                hamburger.classList.remove("open");
                navLottieAnimation.stop();
            }
        });
    }

    // Portfolio Items Visibility (Fade-in effect on scroll)
    function checkPortfolioVisibility() {
        portfolioItems.forEach((item) => {
            const rect = item.getBoundingClientRect();
            console.log(item, rect.top, rect.bottom, window.innerHeight); // Debugging visibility
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                item.classList.add("visible");
            } else {
                item.classList.remove("visible");
            }
        });
    }

    // Header Shrink and Portfolio Visibility on Scroll
    function handleScrollEvents() {
        // Shrink the header when scrolling down
        if (window.scrollY > 50) {
            header.classList.add("shrink");
        } else {
            header.classList.remove("shrink");
        }

        checkPortfolioVisibility();

        // Hide the fullscreen video after scrolling past it
        if (videoContainer) {
            videoContainer.style.display =
                window.scrollY > window.innerHeight ? "none" : "block";
        }
    }

    // Lottie Animation for Header Logo
    if (lottieLogo && svgLogo) {
        const animation = lottie.loadAnimation({
            container: lottieLogo,
            path: "animations/A_LogoIcon_Anim.json",
            renderer: "svg",
            loop: false,
            autoplay: false,
        });

        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                svgLogo.style.display = "none";
                lottieLogo.style.display = "block";
                animation.play();
            } else {
                svgLogo.style.display = "block";
                lottieLogo.style.display = "none";
                animation.stop();
            }
        });
    }

    // Parallax Effect on Scroll
    if (fullscreenVideo) {
        document.addEventListener("scroll", function () {
            const scrollPosition = window.scrollY;
            fullscreenVideo.style.transform = `translateY(${
                scrollPosition * 0.75
            }px)`;
        });
    }

    // Fade-In and Fade-Out Pages
    if (pageWrapper) {
        pageWrapper.classList.add("show");

        document.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", (event) => {
                // Prevent default navigation to add fade-out
                event.preventDefault();

                const href = link.getAttribute("href");

                pageWrapper.classList.remove("show");
                pageWrapper.classList.add("fade-out");

                // Wait for the animation to complete, then navigate
                setTimeout(() => {
                    window.location.href = href;
                }, 300); // Match this to your CSS transition duration
            });
        });
    }

    // Update the year dynamically in the footer
    const currentYear = new Date().getFullYear();
    const navYearSpan = document.getElementById("current-year");
    const footerYearSpan = document.getElementById("footer-year");

    if (navYearSpan) navYearSpan.textContent = currentYear;
    if (footerYearSpan) footerYearSpan.textContent = currentYear;

    // Ensure Portfolio Items are visible on load
    checkPortfolioVisibility();
    window.addEventListener("scroll", handleScrollEvents);
});
