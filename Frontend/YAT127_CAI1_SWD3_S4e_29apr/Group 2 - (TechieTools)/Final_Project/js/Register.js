function validateForm() {
    // Clear previous errors
    document.getElementById('firstNameError').innerText = '';
    document.getElementById('lastNameError').innerText = '';
    document.getElementById('emailError').innerText = '';
    document.getElementById('passwordError').innerText = '';
    document.getElementById('confirmPasswordError').innerText = '';

    // Get form values
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    let isValid = true;

    // Validate First Name
    if (firstName === '') {
        document.getElementById('firstNameError').innerText = 'First name is required.';
        isValid = false;
    }

    // Validate Last Name
    if (lastName === '') {
        document.getElementById('lastNameError').innerText = 'Last name is required.';
        isValid = false;
    }

    // Validate Email
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email === '' || !emailPattern.test(email)) {
        document.getElementById('emailError').innerText = 'Please enter a valid email address.';
        isValid = false;
    }

    // Validate Password
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/; // At least 8 characters, one uppercase, one lowercase, one number
    if (password === '' || !passwordPattern.test(password)) {
        document.getElementById('passwordError').innerText = 'Password is required and must be at least 8 characters long with one uppercase letter and one number.';
        document.getElementById("togglePasswordVisibility").style.top = "30%";
        isValid = false;
    }else{
            document.getElementById("togglePasswordVisibility").style.top ="50%";
    }

    // Validate Confirm Password
    if (confirmPassword !== password) {
        document.getElementById('confirmPasswordError').innerText = 'Passwords do not match.';
        document.getElementById("toggleConfirmPasswordVisibility").style.top = "35%";
        isValid = false;
    }else{
        document.getElementById("toggleConfirmPasswordVisibility").style.top = "50%";

    }

    // You can submit the form here if needed
    if (isValid) {
        alert('Registration successful!');
    }
}

// Toggle password visibility for password and confirm password fields
document.getElementById('togglePasswordVisibility').addEventListener('click', function() {
    const passwordField = document.getElementById('password');
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
    this.querySelector('i').classList.toggle('fa-eye');
    this.querySelector('i').classList.toggle('fa-eye-slash');
});

document.getElementById('toggleConfirmPasswordVisibility').addEventListener('click', function() {
    const confirmPasswordField = document.getElementById('confirmPassword');
    const type = confirmPasswordField.getAttribute('type') === 'password' ? 'text' : 'password';
    confirmPasswordField.setAttribute('type', type);
    this.querySelector('i').classList.toggle('fa-eye');
    this.querySelector('i').classList.toggle('fa-eye-slash');
});