// Wait for the DOM contents to fully load before initializing scripts
document.addEventListener("DOMContentLoaded", () => {
    initMobileMenu();
    initItemsFilter();
    initQuoteForm();
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
                    // Brief fade-in visual simulation
                    node.style.opacity = "1";
                } else {
                    node.style.display = "none";
                    node.style.opacity = "0";
                }
            });
        });
    });
}

/**
 * Client Callback Lead Form Handler
 */
function initQuoteForm() {
    const quoteForm = document.getElementById("quoteForm");
    const successMessage = document.getElementById("formSuccessMessage");

    if (quoteForm) {
        quoteForm.addEventListener("submit", (e) => {
            e.preventDefault(); // Stop page reload

            // Gather inputs for any potential future API extension integration
            const name = document.getElementById("clientName").value;
            const phone = document.getElementById("clientPhone").value;
            const type = document.getElementById("scrapType").value;

            console.log(`Lead Generated Successfully: ${name} | ${phone} | ${type}`);

            // Visual feedback transition
            quoteForm.reset();
            if (successMessage) {
                successMessage.style.display = "block";
                
                // Automatically clear message notice after 6 seconds
                setTimeout(() => {
                    successMessage.style.display = "none";
                }, 6000);
            }
        });
    }
}
