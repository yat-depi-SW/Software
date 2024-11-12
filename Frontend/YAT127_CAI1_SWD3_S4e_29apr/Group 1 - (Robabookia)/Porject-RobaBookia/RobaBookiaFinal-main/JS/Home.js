//Navbar-menu
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

//Preloader
gsap.from("h2 div", 1.5, {
  yPercent: 100,
  ease: "power4.inOut",
  stagger: {
    amount: 0.5,
  },
});

gsap.to("h2", 1.5, {
  clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
  ease: "power4.inOut",
  stagger: {
    amount: 0.5,
  },
});

document.addEventListener("DOMContentLoaded", function () {
  let overlay = document.querySelector(".overlay");
  overlay.addEventListener("click", function () {
    gsap.to("h2 div", 1.5, {
      yPercent: -100,
      ease: "power4.inOut",
      stagger: {
        amount: 0.5,
      },
    });

    gsap.to(
      "h2",
      1.5,
      {
        clipPath: "polygon(0 85%, 100% 85%, 100% 100%, 0 100%)",
        ease: "power4.inOut",
        stagger: {
          amount: 0.5,
        },
      },
      0
    );
    gsap.to(".overlay", 2, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      ease: "power4.inOut",
    });

    gsap.to(".img", 2, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 0%, 0% 0%)",
      ease: "power4.inOut",
      stagger: {
        amount: 1.5,
      },
    });

    gsap.to(".loader", 2, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      ease: "power4.inOut",
      delay: 2.4,
    });
  });
});

//Hero-section
gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".wrapper",
        start: "top top",
        end: "+=150%",
        pin: true,
        scrub: true,
        markers: false,
      },
    })
    .to(".image-container img", {
      scale: 2,
      z: 250,
      transformOrigin: "center center",
      ease: "power1.inOut",
    })
    .to(
      ".section.hero",
      {
        scale: 1.4,
        transformOrigin: "center center",
        ease: "power1.inOut",
      },
      "<"
    );
});

// Darken background on scroll
gsap.to(".section.hero", {
  scrollTrigger: {
    trigger: ".wrapper",
    start: "top top",
    end: "45% top", // Extends the scroll effect to a longer duration
    scrub: true,
  },
  boxShadow: "inset 0 0 0 1000px rgba(0,0,0,0.5)",
  ease: "power1.inOut",
});

// Select the book and the audio element
const book = document.querySelector(".book");
const audio = document.getElementById("hover-audio");

// Play the audio on hover
book.addEventListener("mouseenter", () => {
  playAudio();
});

// Stop the audio when hover ends
book.addEventListener("mouseleave", () => {
  audio.pause();
});

// Play audio on click (for mobile devices)
book.addEventListener("click", () => {
  playAudio();
});

function playAudio() {
  audio.currentTime = 0; // Reset to the start
  audio.play().catch((error) => {
    console.error("Audio playback error: ", error);
  });
}

// Preload audio
audio.preload = "auto";

//Books carousel-slider
const carousel = document.querySelector(".carousel");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

let currentIndex = 0;
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID;
let currentSlide = 0;

function showBooks() {
  const bookWidth = carousel.children[0].offsetWidth + 30; // including margin
  carousel.style.transform = `translateX(-${currentIndex * bookWidth}px)`;
}

// Mouse/Touch events for dragging
carousel.addEventListener("mousedown", startDrag);
carousel.addEventListener("mousemove", drag);
carousel.addEventListener("mouseup", endDrag);
carousel.addEventListener("mouseleave", endDrag);

// Touch events for mobile
carousel.addEventListener("touchstart", startDrag);
carousel.addEventListener("touchmove", drag);
carousel.addEventListener("touchend", endDrag);

function startDrag(e) {
  isDragging = true;
  startPos = getPositionX(e);
  animationID = requestAnimationFrame(animation);
}

function drag(e) {
  if (!isDragging) return;
  const currentPosition = getPositionX(e);
  currentTranslate = prevTranslate + currentPosition - startPos;
}

function endDrag() {
  cancelAnimationFrame(animationID);
  isDragging = false;

  const bookWidth = carousel.children[0].offsetWidth + 30;
  const movedBy = currentTranslate - prevTranslate;

  if (movedBy < -100 && currentIndex < carousel.children.length - 1) {
    currentIndex++;
  } else if (movedBy > 100 && currentIndex > 0) {
    currentIndex--;
  }

  showBooks();
  prevTranslate = currentTranslate = -currentIndex * bookWidth;
}

function getPositionX(e) {
  return e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
}

function animation() {
  carousel.style.transform = `translateX(${currentTranslate}px)`;
  if (isDragging) requestAnimationFrame(animation);
}

// Buttons click logic remains the same
nextBtn.addEventListener("click", () => {
  const totalBooks = carousel.children.length;
  const bookWidth = carousel.children[0].offsetWidth + 30;
  const visibleWidth = document.querySelector(
    ".carousel-container"
  ).offsetWidth;
  const visibleCards = Math.floor(visibleWidth / bookWidth);

  if (currentIndex < totalBooks - visibleCards) {
    currentIndex++;
  } else {
    currentIndex = 0; // Loop back to the start
  }
  showBooks();
});

prevBtn.addEventListener("click", () => {
  const bookWidth = carousel.children[0].offsetWidth + 30;
  const visibleWidth = document.querySelector(
    ".carousel-container"
  ).offsetWidth;
  const visibleCards = Math.floor(visibleWidth / bookWidth);

  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = carousel.children.length - visibleCards; // Loop to last visible card
  }
  showBooks();
});

window.addEventListener("resize", showBooks);

// Changing the style of the cursor
const cursor = document.createElement("div");
cursor.classList.add("cursor");
document.body.appendChild(cursor);

document.body.style.cursor = "none";

const positionElement = (e) => {
  const mouseY = e.clientY;
  const mouseX = e.clientX;

  cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
};

window.addEventListener("pointermove", positionElement);

window.addEventListener("pointerleave", () => {
  cursor.style.display = "none";
});

window.addEventListener("pointerout", () => {
  cursor.style.display = "none";
});

window.addEventListener("pointermove", () => {
  cursor.style.display = "block";
});

//Choice of the week
let old = $(".card").get(0);
$(".card").click(function () {
  if (old && old !== this && $(old).hasClass("open")) {
    $(old).removeClass("open");
  }
  $(this).toggleClass("open");
  old = this;
});

//Testimonial section
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 32,
  loop: true,
  centeredSlides: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  breakpoints: {
    640: {
      slidesPerView: 1,
      spaceBetween: 32,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 32,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 32,
    },
  },
});

//Choice of the week
function toggleDetails(clickedCard) {
  // Get all cards
    if(screen.width > '900px'){
    const cards = document.querySelectorAll(".card");

    // Loop through all cards to ensure other cards' contents are hidden
    cards.forEach((card) => {
      // Find the summary and button container in each card
      const summary = card.querySelector(".summary");
      const buttonDiv = card.querySelector("button").parentElement;

      // Hide summary and button if the card is not the clicked one
      if (card !== clickedCard) {
        summary.classList.add("hidden");
        buttonDiv.classList.add("hidden");
      }
    });

    // Toggle the summary and button of the clicked card
    const clickedSummary = clickedCard.querySelector(".summary");
    const clickedButtonDiv = clickedCard.querySelector("button").parentElement;

    // Toggle the clicked card's content
    clickedSummary.classList.toggle("hidden");
    clickedButtonDiv.classList.toggle("hidden");
  }
}

//Footer
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
