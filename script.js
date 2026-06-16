// Wait for the DOM contents to fully load before initializing scripts
document.addEventListener("DOMContentLoaded", () => {
    initMobileMenu();
    initItemsFilter();
    initAutoplayMobileCarousel();
});

/**
 * Mobile Navigation Toggle Functionality
 */
function initMobileMenu() {
    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    if (menuToggle && mainNav) {
        menuToggle.addEventListener("click", () => {
            mainNav.classList.toggle("active");
            
            // Accessible Aria Attribute state update
            const isExpanded = mainNav.classList.contains("active");
            menuToggle.setAttribute("aria-expanded", isExpanded);
        });
    }
}

/**
 * Interactive Filter for Scrap Items Gallery
 */
function initItemsFilter() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const itemNodes = document.querySelectorAll(".item-node");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Remove active class from all buttons and add to the clicked one
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const filterValue = button.getAttribute("data-filter");

            // Loop through gallery items and show/hide accordingly
            itemNodes.forEach(node => {
                const category = node.getAttribute("data-category");
                if (filterValue === "all" || category === filterValue) {
                    node.style.display = "block";
                    setTimeout(() => { node.style.opacity = "1"; }, 10);
                } else {
                    node.style.opacity = "0";
                    node.style.display = "none";
                }
            });
        });
    });
}

/**
 * Clean JavaScript Autoplay engine for the native mobile gallery carousel
 */
function initAutoplayMobileCarousel() {
    const track = document.getElementById("galleryCarousel");
    if (!track) return;

    let carouselInterval;

    function startAutoplay() {
        // Only run autoplay loops if screen width matches mobile layout break limits (< 768px)
        if (window.innerWidth > 768) return;

        carouselInterval = setInterval(() => {
            const maxScrollLeft = track.scrollWidth - track.clientWidth;
            
            // If slider has reached the end edge loop back smoothly to start index 0
            if (track.scrollLeft >= maxScrollLeft - 5) {
                track.scrollTo({ left: 0, behavior: "smooth" });
            } else {
                // Advance forward by one full card width column stride
                track.scrollBy({ left: 275, behavior: "smooth" });
            }
        }, 3500); // Ticks every 3.5 seconds
    }

    function stopAutoplay() {
        clearInterval(carouselInterval);
    }

    // Initialize loop engine
    startAutoplay();

    // Pause animation threads if user actively initiates manual scroll gestures
    track.addEventListener("touchstart", stopAutoplay, { passive: true });
    track.addEventListener("touchend", startAutoplay, { passive: true });
    
    // Clear and re-verify context limits dynamically if phone view shifts rotation angles
    window.addEventListener("resize", () => {
        stopAutoplay();
        startAutoplay();
    });
}