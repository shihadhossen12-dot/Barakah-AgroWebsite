/* ==========================================================================
   BARAKAH AGRO - MAIN JAVASCRIPT (script.js)
   Vanilla JavaScript for Foundation Version:
   1. Mobile Hamburger Menu Toggle
   2. Add to Cart Interaction & Counter
   3. Auto-close mobile menu on link click
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  // ------------------------------------------------------------------------
  // 1. MOBILE HAMBURGER MENU
  // ------------------------------------------------------------------------
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const navLinks = document.getElementById("navLinks");
  const navLinkItems = document.querySelectorAll(".nav-link");

  if (hamburgerBtn && navLinks) {
    // Toggle mobile menu when hamburger is clicked
    hamburgerBtn.addEventListener("click", function () {
      const isOpen = navLinks.classList.toggle("open");
      hamburgerBtn.classList.toggle("is-active", isOpen);
      hamburgerBtn.setAttribute("aria-expanded", isOpen);
    });

    // Close menu when any navigation link is clicked
    navLinkItems.forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        hamburgerBtn.classList.remove("is-active");
        hamburgerBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ------------------------------------------------------------------------
  // 2. ADD TO CART INTERACTION & COUNTER
  // ------------------------------------------------------------------------
  let cartItemCount = 0;
  const cartBadge = document.getElementById("cartCount");
  const addToCartButtons = document.querySelectorAll(".btn-add-cart");
  const toastNotification = document.getElementById("toast");

  addToCartButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      // Increase cart item count
      cartItemCount += 1;
      if (cartBadge) {
        cartBadge.textContent = cartItemCount;

        // Subtle pop animation for counter
        cartBadge.classList.add("bump");
        setTimeout(function () {
          cartBadge.classList.remove("bump");
        }, 200);
      }

      // Visual feedback on the button
      const originalText = button.textContent;
      button.textContent = "Added! ✓";
      button.classList.add("added");

      // Optional toast popup
      const productName = button.getAttribute("data-product") || "Item";
      showToast(`${productName} added to cart!`);

      // Reset button after 1.5 seconds
      setTimeout(function () {
        button.textContent = originalText;
        button.classList.remove("added");
      }, 1500);
    });
  });

  // ------------------------------------------------------------------------
  // 3. TOAST NOTIFICATION HELPER
  // ------------------------------------------------------------------------
  let toastTimeout;
  function showToast(message) {
    if (!toastNotification) return;

    const toastText = document.getElementById("toastMessage");
    if (toastText) {
      toastText.textContent = message;
    }

    toastNotification.classList.add("show");

    // Clear previous timer if clicked quickly
    clearTimeout(toastTimeout);

    // Hide toast after 2.5 seconds
    toastTimeout = setTimeout(function () {
      toastNotification.classList.remove("show");
    }, 2500);
  }
});
