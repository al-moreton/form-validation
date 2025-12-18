// index.js
import "../css/styles.css";

const form = document.querySelector("form");
const inputs = form.elements;

const emailInput = inputs["email"];
const countryInput = inputs["country"];
const postcodeInput = inputs["postcode"];
const passwordInput = inputs["password"];
const confirmPasswordInput = inputs["confirm-password"];
const submitButton = document.querySelector(".submit");
const messageContainer = document.querySelector(".message");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  messageContainer.textContent = "";

  const isEmailValid = validateEmail(emailInput);
  const isPostcodeValid = validatePostcode(postcodeInput);
  const isCountryValid = validateCountry(countryInput);
  const isPasswordValid = validatePassword(passwordInput);
  const isConfirmPasswordValid = validateConfirmPassword(passwordInput, confirmPasswordInput);

  if (isEmailValid && isPostcodeValid && isCountryValid && isPostcodeValid && isPasswordValid && isConfirmPasswordValid) {
    Array.from(inputs).forEach((input) => {
      if (input.type !== "submit" && input.name) {
        const p = document.createElement("p");
        p.textContent = `${input.name}: ${input.value}`;
        messageContainer.appendChild(p);
      }
    });
  } else {
    messageContainer.textContent = "Please fix errors above";
  }
});

emailInput.addEventListener("focusout", (e) => {
  validateEmail(emailInput);
});

postcodeInput.addEventListener("focusout", (e) => {
  validatePostcode(postcodeInput);
});

countryInput.addEventListener("focusout", (e) => {
  validateCountry(countryInput);
});

passwordInput.addEventListener("focusout", (e) => {
  validatePassword(passwordInput);
});

passwordInput.addEventListener("input", (e) => {
  passwordChecklist(passwordInput);
})

function passwordChecklist(password) {
  const checklistArr = document.querySelectorAll('.password-checklist li span i');
  const box = document.querySelector('.password-checklist-box');
  let lengthCheck = false;
  let uppercaseCheck = false;
  let numberCheck = false;

  if (password.value.trim().length > 7) {
    checklistArr[0].className = 'fa-solid fa-check text-green-500';
    lengthCheck = true;
  } else {
    checklistArr[0].className = 'fa-solid fa-x text-red-500';
    lengthCheck = false;
  }

  if (password.value.trim() !== password.value.trim().toLowerCase()) {
    checklistArr[1].className = 'fa-solid fa-check text-green-500';
    uppercaseCheck = true;
  } else {
    checklistArr[1].className = 'fa-solid fa-x text-red-500';
    uppercaseCheck = false;
  }

  if (/\d/.test(password.value.trim()) || /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password.value.trim())) {
    checklistArr[2].className = 'fa-solid fa-check text-green-500';
    numberCheck = true;
  } else {
    checklistArr[2].className = 'fa-solid fa-x text-red-500';
    numberCheck = false;
  }

  if (lengthCheck && uppercaseCheck && numberCheck) {
    box.classList.add('border-green-500');
    box.classList.remove('border-red-500');
  } else {
    box.classList.remove('border-green-500');
    box.classList.add('border-red-500');
  }
}

confirmPasswordInput.addEventListener("focusout", (e) => {
  validateConfirmPassword(passwordInput, confirmPasswordInput);
})

function validateEmail(email) {
  const emailErrorSpan = document.querySelector(".email-error");
  emailErrorSpan.textContent = "";
  emailInput.classList.remove("outline-red-500");

  if (!email.value.trim()) {
    emailInput.classList.add("outline-red-500");
    emailErrorSpan.textContent = "Please enter an email address.";
    return false;
  }

  if (email.validity.typeMismatch) {
    emailInput.classList.add("outline-red-500");
    emailErrorSpan.textContent = "Please enter a valid email address.";
    return false;
  }

  return true;
}

function validatePostcode(postcode) {
  const postcodeErrorSpan = document.querySelector(".postcode-error");
  postcodeErrorSpan.textContent = "";
  postcodeInput.classList.remove("outline-red-500");

  if (!postcode.value.trim()) {
    postcodeInput.classList.add("outline-red-500");
    postcodeErrorSpan.textContent = "Please enter a postcode.";
    return false;
  }

  if (!/^[A-Z0-9\s-]{3,10}$/i.test(postcode.value)) {
    postcodeInput.classList.add("outline-red-500");
    postcodeErrorSpan.textContent = "Please enter a valid postcode format.";
    return false;
  }

  return true;
}

function validateCountry(country) {
  const countryErrorSpan = document.querySelector(".country-error");
  countryErrorSpan.textContent = "";
  countryInput.classList.remove("outline-red-500");

  if (!country.value.trim()) {
    countryInput.classList.add("outline-red-500");
    countryErrorSpan.textContent = "Please enter a country.";
    return false;
  }

  return true;
}

function validatePassword(password) {
  const passwordErrorSpan = document.querySelector(".password-error");
  passwordErrorSpan.textContent = "";
  passwordInput.classList.remove("outline-red-500");
  confirmPasswordInput.classList.remove("outline-red-500");

  if (!password.value.trim()) {
    passwordInput.classList.add("outline-red-500");
    passwordErrorSpan.textContent = "Please enter a password";
    return false;
  }

  return true;
}

function validateConfirmPassword(password, confirmPassword) {
  const passwordErrorSpan = document.querySelector(".password-error");
  passwordErrorSpan.textContent = "";
  passwordInput.classList.remove("outline-red-500");
  confirmPasswordInput.classList.remove("outline-red-500");

  if (!password.value.trim()) {
    passwordInput.classList.add("outline-red-500");
    passwordErrorSpan.textContent = "Please enter a password";
    return false;
  }

  if (!confirmPassword.value.trim()) {
    confirmPasswordInput.classList.add("outline-red-500");
    passwordErrorSpan.textContent = "Please enter confirm your password";
    return false;
  }

  if (password.value.trim() != confirmPassword.value.trim()) {
    confirmPasswordInput.classList.add("outline-red-500");
    passwordErrorSpan.textContent = "Please confirm your password";
    return false;
  }

  return true;
}


