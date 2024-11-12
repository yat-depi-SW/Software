
const galleryItems = [
  {
    title: "Abanob Nader",
    copy: "Abanob has a knack for turning potential setbacks into creative opportunities, as demonstrated by his design of the lively 404 error page with an animated cube. His thoughtful approach adds a playful element to the site, transforming a normally frustrating experience into a moment of delight.",
    director: "404-error page",
    cinematographer: "HTML, CSS",
  },
  {
    title: "Ahmed AbdelFattah",
    copy: "Ahmed is the visionary behind RobaBookia’s Home and About pages, blending design and functionality to create visually appealing and interactive experiences. His mastery of front-end technologies ensures that every detail is carefully crafted, making each page engaging and intuitive for users.",
    director: "Home and About pages",
    cinematographer: "HTML, CSS, JavaScript and GSAP.js",
  },
  {
    title: "Joseph Lotfy",
    copy: "Joseph excels in creating seamless user journeys for book discovery and checkout. His meticulous integration of search functionalities and real-time data makes exploring and purchasing books effortless, providing users with a smooth and enjoyable experience on every visit.",
    director: "English discover books and Checkout pages",
    cinematographer: "HTML, CSS, JavaScript and API integration",
  },
  {
    title: "Marihan Ehab",
    copy: "Marihan’s exceptional design talent and creativity shine through in RobaBookia’s ‘Read a Book’ feature and Arabic discovery sections. With her vibrant aesthetic and immersive page-turning animations, she transforms reading into a captivating experience, celebrating both beauty and cultural depth.",
    director: "Read a book and Arabic discover books",
    cinematographer: "HTML, CSS, JavaScript and turn.js",
  },
  {
    title: "Mohamed Mahmoud",
    copy: "Mohamed is the architect of RobaBookia’s onboarding experience, crafting intuitive sign-in and sign-up pages that are both functional and welcoming. His real-time input validations and smooth transitions make registering effortless, setting the tone for a positive user experience from the start.",
    director: "Sign in & Sign up and suggest a book pages and the footer",
    cinematographer: "HTML, CSS and JavaScript",
  },
  {
    title: "Raghad Hany",
    copy: "Raghad is the backbone of RobaBookia’s communication channels, ensuring that users can reach out seamlessly through the contact page. Her attention to detail in form design and API integration reflects her commitment to making every interaction feel personal and meaningful.",
    director: "Contact us page",
    cinematographer: "HTML, CSS, JavaScript and API integration",
  },
];
document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.querySelector(".gallery");
  const blurryPrev = document.querySelector(".blurry-prev");
  const projectPreview = document.querySelector(".project-preview");
  const itemCount = galleryItems.length;

  let activeItemIndex = 0;
  let isAnimating = false;

  function createSplitText(element) {
    const splitText = new SplitType(element, { types: "lines" });
    element.innerHTML = "";
    splitText.lines.forEach((line) => {
      const lineDiv = document.createElement("div");
      lineDiv.className = "line";
      const lineSpan = document.createElement("span");
      lineSpan.textContent = line.textContent;
      lineDiv.appendChild(lineSpan);
      element.appendChild(lineDiv);
    });
  }

  const initialInfoText = document.querySelector(".info p");
  if (initialInfoText) {
    createSplitText(initialInfoText);
  }

  const elementsToAnimate = document.querySelectorAll(
    ".title h1, .info p, .line span, .credits p, .director p, .cinematographer p"
  );
  gsap.set(elementsToAnimate, { y: 0 });

  // Helper function to create an element with a class
  function createElementWithClass(tag, className) {
    const element = document.createElement(tag);
    element.classList.add(className);
    return element;
  }

  // Function to generate project details
  function createProjectDetails(activeItem, index) {
    const newProjectDetails = createElementWithClass("div", "project-details");

    const detailsStructure = [
      { className: "title", tag: "h1", content: activeItem.title },
      { className: "info", tag: "p", content: activeItem.copy },
      { className: "credits", tag: "p", content: "Credits" },
      {
        className: "director",
        tag: "p",
        content: `Pages: ${activeItem.director}`,
      },
      {
        className: "cinematographer",
        tag: "p",
        content: `Technologies: ${activeItem.cinematographer}`,
      },
    ];

    detailsStructure.forEach(({ className, tag, content }) => {
      const div = createElementWithClass("div", className);
      const element = document.createElement(tag);
      element.textContent = content;
      div.appendChild(element);
      newProjectDetails.appendChild(div);
    });

    const newProjectImg = createElementWithClass("div", "project-img");
    const newImg = document.createElement("img");
    newImg.src = `assets/img${index + 1}.png`;
    newImg.alt = activeItem.title;
    newProjectImg.appendChild(newImg);

    return {
      newProjectDetails,
      newProjectImg,
      infoP: newProjectDetails.querySelector(".info p"),
    };
  }

  // Click handler logic moved outside for better structure
  // Click handler logic moved outside for better structure
  function handleItemClick(index) {
    if (index === activeItemIndex || isAnimating) return;

    isAnimating = true;
    const activeItem = galleryItems[index];

    // Remove "active" class from the previous item
    gallery.children[activeItemIndex].classList.remove("active");
    // Add "active" class to the new item
    gallery.children[index].classList.add("active");
    activeItemIndex = index;

    // Select all the elements to animate
    const elementsToAnimate = document.querySelectorAll(
      ".title h1, .info p, .line span, .credits p, .director p, .cinematographer p"
    );

    // Get the current project image and its elements
    const currentProjectImg = document.querySelector(".project-img");
    const currentProjectImgElem = currentProjectImg.querySelector("img");

    // Create a new blurry image
    const newBlurryImg = createElementWithClass("img", "blurry-img");
    newBlurryImg.src = `assets/img${index + 1}.png`;
    newBlurryImg.alt = activeItem.title;

    gsap.set(newBlurryImg, {
      opacity: 0,
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
    });
    blurryPrev.insertBefore(newBlurryImg, blurryPrev.firstChild);

    const currentBlurryImg = blurryPrev.querySelector("img:nth-child(2)");
    if (currentBlurryImg) {
      gsap.to(currentBlurryImg, {
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: "power2.inOut",
        onComplete: () => blurryPrev.removeChild(currentBlurryImg),
      });
    }

    // Animate the blurry image
    gsap.to(newBlurryImg, {
      delay: 0.5,
      opacity: 1,
      duration: 1,
      ease: "power2.inOut",
    });

    // Animate the old elements out and remove them
    gsap.to(elementsToAnimate, {
      y: -60,
      duration: 1,
      ease: "power4.in",
      stagger: 0.05,
    });

    // Animate the current project image out
    gsap.to(currentProjectImg, {
      onStart: () => {
        gsap.to(currentProjectImgElem, {
          scale: 2,
          duration: 1,
          ease: "power4.in",
        });
      },
      scale: 0,
      bottom: "10em",
      duration: 1,
      ease: "power4.in",
      onComplete: () => {
        // Remove the previous details and image after animation completes
        document.querySelector(".project-details")?.remove();
        currentBlurryImg?.remove();
        currentProjectImg?.remove(); // Properly remove the current project image

        // Add the new project details and image
        const { newProjectDetails, newProjectImg, infoP } =
          createProjectDetails(activeItem, index);
        projectPreview.appendChild(newProjectDetails);
        projectPreview.appendChild(newProjectImg);

        createSplitText(infoP);

        // Animate the new elements in
        const newElementsToAnimate = newProjectDetails.querySelectorAll(
          ".title h1, .info p, .line span, .credits p, .director p, .cinematographer p"
        );

        gsap.fromTo(
          newElementsToAnimate,
          { y: 40 },
          { y: 0, duration: 1, ease: "power4.out", stagger: 0.05 }
        );

        gsap.fromTo(
          newProjectImg,
          { scale: 0, bottom: "-10em" },
          { scale: 1, bottom: "1em", duration: 1, ease: "power4.out" }
        );

        gsap.fromTo(
          newProjectImg.querySelector("img"),
          { scale: 2 },
          {
            scale: 1,
            duration: 1,
            ease: "power4.out",
            onComplete: () => {
              isAnimating = false;
            },
          }
        );
      },
    });
  }
  // Generate gallery items
  for (let i = 0; i < itemCount; i++) {
    const itemDiv = createElementWithClass("div", "item");
    if (i === 0) itemDiv.classList.add("active");

    const img = document.createElement("img");
    img.src = `assets/img${i + 1}.png`;
    img.alt = galleryItems[i].title;
    itemDiv.appendChild(img);

    itemDiv.dataset.index = i;
    itemDiv.addEventListener("click", () => handleItemClick(i));

    gallery.appendChild(itemDiv);
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
