/*====== typing animations=====*/ 
// var i = 0;
// var txt = 'ChemBio Coder';
// var speed = 40;
// function typeWriter() {
//     if (i < txt.length) {
//       document.getElementById("demo").innerHTML += txt.charAt(i);
//       i++;
//       setTimeout(typeWriter, speed);
//     }
//   }
// const tl = new TimelineMax();

// tl.fromTo(".type-me", 5, {
//   width: "0",
// }, {
//   width: "870px", /* same as text-description width */
//   ease:  SteppedEase.config(24)
// }, 0); 
// const text = "Hello, I'm Shehab Ali Abdel Latif. Welcome to my portfolio!";
// const typingElement = document.getElementById("typing");
// let index = 0;

// function typeText() {
//   if (index < text.length) {
//     typingElement.innerHTML += text.charAt(index);
//     index++;
//     setTimeout(typeText, 100); // Adjust typing speed by changing the delay here
//   }
// }

// document.addEventListener("DOMContentLoaded", typeText);
const text = "Hello, I'm Shehab Ali Abdel Latif. Welcome to my portfolio!";
const typingElement = document.getElementById("typing");
let index = 0;

function typeText() {
  if (index < text.length) {
    typingElement.innerHTML += text.charAt(index);
    index++;
    setTimeout(typeText, 100); // Adjust typing speed
  } else {
    setTimeout(() => {
      typingElement.innerHTML = ""; // Clear text after finishing
      index = 0; // Reset index
      typeText(); // Restart typing
    }, 2000); // Adjust delay before restarting the typing
  }
}

document.addEventListener("DOMContentLoaded", typeText);



