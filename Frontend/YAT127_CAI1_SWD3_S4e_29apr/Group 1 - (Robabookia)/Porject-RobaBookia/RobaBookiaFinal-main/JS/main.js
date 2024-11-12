
// Nav-Bar

// Nav-Bar
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
// Preloader animation
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
      document.getElementById("navbar").style.visibility = "visible";
      document.getElementById("Form").style.visibility = "visible";
      document.getElementById("fot").style.visibility = "visible";
    }, 1600); // Delay for 1.5 second (1500 ms)
  });
  
// ========================================================



// Form Page 

const loginsec=document.querySelector('.login-section')
const loginlink=document.querySelector('.login-link')
const registerlink=document.querySelector('.register-link')
registerlink.addEventListener('click',()=>{
    loginsec.classList.add('active')
})
loginlink.addEventListener('click',()=>{
    loginsec.classList.remove('active')
})

// Book-rotate ==> Ahmed abd_alftah 

const section = document.querySelector(".book-rotate");
const book = document.querySelector(".book");
const body = document.querySelector(".body");

//Previous rotation value
let prev = 0;
//Calculation
let calc = 0;
//Drag sensitivity
const sensitivity = 2;

//Get the X position when the mouse is clicked down
section.addEventListener("mousedown", function (e) {
  //Get mouse X position
  const x = e.clientX;

  /*Rotate the book on mousemove*/
  section.addEventListener("mousemove", rotate);
  function rotate(e) {
    calc = (e.clientX - x) / sensitivity;

    book.style.transform = `rotateY(${calc + prev}deg)`;

    /*Change Cursor to Grabbing Icon*/
    body.style.cursor = "grabbing";
  }

  prev += calc;

  //Remove the Event and Cursor Icon on Mouse Release
  window.addEventListener("mouseup", function () {
    //Remove event listener
    section.removeEventListener("mousemove", rotate);
    //Reset cursor icon
    body.style.cursor = "default";
  });
});

// Pasword

function togglePassword() {
    var passwordField = document.getElementById("password");
    var toggleIcon = document.getElementById("toggleIcon");
  
    if (passwordField.type === "password") {
      passwordField.type = "text";
      toggleIcon.classList.remove("fa-eye");
      toggleIcon.classList.add("fa-eye-slash");
    } else {
      passwordField.type = "password";
      toggleIcon.classList.remove("fa-eye-slash");
      toggleIcon.classList.add("fa-eye");
    }
  }


//   Start-Form-Section with Help ChatGbt

document.querySelector('.login form').addEventListener('submit', function(event) {
    event.preventDefault();

    const emailInput = this.querySelector('input[type="email"]');
    const passwordInput = this.querySelector('input[type="password"]');
    
    let isValid = true;

    // Validate Email
    if (!validateEmail(emailInput.value)) {
        showError(emailInput, "Please enter a valid email.");
        isValid = false;
    } else {
        hideError(emailInput);
    }

    // Validate Password (must be at least 6 characters)
    if (passwordInput.value.length < 6) {
        showError(passwordInput, "Password must be at least 6 characters long.");
        isValid = false;
    } else {
        hideError(passwordInput);
    }

    if (isValid) {
        alert("Login Successful!");
        // Submit the form
        this.submit();
    }
});

// Validation RF

document.querySelector('.register form').addEventListener('submit', function(event) {
    event.preventDefault();

    const usernameInput = this.querySelector('input[type="text"]');
    const emailInput = this.querySelector('input[type="email"]');
    const passwordInput = this.querySelector('#password');
    const confirmPasswordInput = this.querySelector('#confirmPassword');

    let isValid = true;



    // Username 


    if (usernameInput.value.trim() === "") {
        showError(usernameInput, "Username is required.");
        isValid = false;
    } else if (usernameInput.value.length > 30) {
        showError(usernameInput, "Username must not exceed 30 characters.");
        isValid = false;
    } else {
        hideError(usernameInput);
    }

    // EM

    if (!validateEmail(emailInput.value)) {
        showError(emailInput, "Please enter a valid email.");
        isValid = false;
    } else {
        hideError(emailInput);
    }


    // PA


    if (passwordInput.value.length < 6) {
        showError(passwordInput, "Password must be at least 6 characters long.");
        isValid = false;
    } else {
        hideError(passwordInput);
    }

    // M-PA


    if (confirmPasswordInput.value !== passwordInput.value) {
        showError(confirmPasswordInput, "Passwords do not match.");
        isValid = false;
    } else {
        hideError(confirmPasswordInput);
    }

    if (isValid) {
        alert("Registration Successful!");
        this.submit();
    }
});

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(input, message) {
    let errorSpan = input.nextElementSibling;
    errorSpan.textContent = message;
    errorSpan.style.color = "red";
}

function hideError(input) {
    let errorSpan = input.nextElementSibling;
    errorSpan.textContent = "";
}

// // Foucs

let one = document.querySelector ("input[type='email']");
let tow = document.querySelector ("#username")

window.onload = () => {

    one.focus();
};


//
// العيون كلها بصاصة 

function togglePassword() {
    const passwordField = document.getElementById('password');
    const toggleIcon = document.getElementById('toggleIcon');
    
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    } else {
        passwordField.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    }
}

// تعطيل تأثير العين عند الضغط على "Sign In"
document.querySelector('.login-link').addEventListener('click', function() {
    disableEyeEffect();
});

function disableEyeEffect() {
    root.removeEventListener("mousemove", handleMouseMove);
    if (document.body.classList.contains("show-password")) {
        document.body.classList.remove("show-password");
        passwordInput.type = "password"; // إخفاء كلمة المرور
    }
}

function handleMouseMove(e) {
    let rect = beam.getBoundingClientRect();
    let mouseX = rect.right + rect.width / 2;
    let mouseY = rect.top + rect.height / 2;
    let rad = Math.atan2(mouseX - e.pageX, mouseY - e.pageY);
    let degrees = rad * (20 / Math.PI) * -1 - 350;

    root.style.setProperty("--beamDegrees", `${degrees}deg`);
}



// 
const root = document.documentElement;
const eye = document.getElementById("eyeball");
const beam = document.getElementById("beam");
const passwordInput = document.getElementById("password");

root.addEventListener("mousemove", (e) => {
  let rect = beam.getBoundingClientRect();
  let mouseX = rect.right + rect.width / 2;
  let mouseY = rect.top + rect.height / 2;
  let rad = Math.atan2(mouseX - e.pageX, mouseY - e.pageY);
  let degrees = rad * (20 / Math.PI) * -1 - 350;

  root.style.setProperty("--beamDegrees", `${degrees}deg`);
});

eye.addEventListener("click", (e) => {
  e.preventDefault();
  document.body.classList.toggle("show-password");
  passwordInput.type = passwordInput.type === "password" ? "text" : "password";
  passwordInput.focus();
});



// ==========================================
// المزااااج المزاااج رايج
// ===========================================

// فالديت بقا وكدا  بتاعت الفووتر 

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


// ==============================================
// ==============================================



