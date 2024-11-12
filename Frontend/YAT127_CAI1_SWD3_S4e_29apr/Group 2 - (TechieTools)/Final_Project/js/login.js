let button = document.getElementById("togglePassword");

// To See password
button.addEventListener("click", function () {
  const passwordInput = document.getElementById("password");
  const icon = this.querySelector("i");

  const type =
    passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);

  icon.classList.toggle("fa-eye");
  icon.classList.toggle("fa-eye-slash");
});

// welcome msg
button.addEventListener("click", function () {
  
});
