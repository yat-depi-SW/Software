document.addEventListener("DOMContentLoaded", function () {
    // Start the preloader animation
    gsap.to(".img", 2, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 0%, 0% 0%)",
      ease: "power4.inOut",
      stagger: {
        amount: 1.5,
      },
    });
  
    // Animate the loader out after 2.4 seconds
    gsap.to(".loader", 2, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      ease: "power4.inOut",
      delay: 2.4,
      onComplete: function () {
        // Hide the loader after animation completes
        document.querySelector(".loader").style.display = "none";
      },
    });
  
    // Show the main content within 1 second after the preloader starts
    setTimeout(function () {
      document.getElementById("fot").style.visibility = "visible";
      document.getElementById("navbar").style.visibility = "visible";
      document.getElementById("container").style.visibility = "visible";
    }, 1600); // Delay for 1.5 second (1500 ms)
  });






  document.getElementById('subscribeForm').addEventListener('submit', function(event) {
    event.preventDefault();  

    const emailInput = document.getElementById('emailInput');
    const emailValue = emailInput.value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailValue)) {
        emailInput.classList.add('error'); 
    } else {
        emailInput.classList.remove('error'); 
        alert("Subscription successful!");
    }
});

//navbar
const menu = document.getElementById("menu");

Array.from(document.getElementsByClassName("menu-item")).forEach(
(item, index) => {
item.onmouseover = () => {
menu.dataset.activeIndex = index;
};
}
);

function showMenu() {
// Show the menu
document.getElementById("menu").style.display = "flex";
// Disable scrolling on the body when the menu is shown
document.body.style.overflow = "hidden";
}

function hideMenu() {
// Hide the menu
document.getElementById("menu").style.display = "none";
// Enable scrolling again
document.body.style.overflow = "auto";
}

//To change the word of the navbar on hover
function changeTitle(newTitle) {
document.getElementById("navbarTitle").textContent = newTitle;
}

function resetTitle() {
document.getElementById("navbarTitle").textContent = "RobaBookia";
}

//navbar color change when scroll
window.addEventListener("scroll", function () {
const navbar = document.getElementById("navbar");

// Adjust the scroll position where the color change occurs
const triggerHeight = window.innerHeight * 2.6; // Adjust the multiplier for the desired position

// Toggle the 'scrolled' class based on scroll position
if (window.scrollY > triggerHeight) {
navbar.classList.add("scrolled");
} else {
navbar.classList.remove("scrolled");
}
});