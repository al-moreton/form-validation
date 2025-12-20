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
const passwordReveals = document.querySelectorAll(".password-reveal");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  messageContainer.textContent = "";

  const isEmailValid = validateEmail(emailInput);
  const isPostcodeValid = validatePostcode(postcodeInput);
  const isCountryValid = validateCountry(countryInput);
  const isPasswordValid = validatePassword(passwordInput);
  const isConfirmPasswordValid = validateConfirmPassword(confirmPasswordInput);

  if (
    isEmailValid &&
    isPostcodeValid &&
    isCountryValid &&
    isPasswordValid &&
    isConfirmPasswordValid
  ) {
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
  checkSubmitBtn();
  validateEmail(emailInput);
});

postcodeInput.addEventListener("focusout", (e) => {
  checkSubmitBtn();
  validatePostcode(postcodeInput);
});

countryInput.addEventListener("focusout", (e) => {
  checkSubmitBtn();
  validateCountry(countryInput);
});

passwordInput.addEventListener("focusin", (e) => {
  const box = document.querySelector(".password-checklist-box");
  const passwordErrorSpan = document.querySelector(".password-error");

  passwordErrorSpan.textContent = "";
  passwordInput.classList.remove("outline-red-500");

  if (box) {
    if (box.classList.contains("hidden")) {
      box.classList.remove("hidden");
      box.classList.add("opacity-0", "max-h-0", "invisible", "overflow-hidden");
      box.offsetHeight;
      box.classList.add("transition-all", "duration-500", "ease-in-out");
    }

    // Then show it
    box.classList.remove("opacity-0", "max-h-0", "invisible");
    box.classList.add("opacity-100", "max-h-96", "p-3", "mt-3");
  }
});

passwordInput.addEventListener("focusout", (e) => {
  const box = document.querySelector(".password-checklist-box");

  if (box) {
    box.classList.remove("opacity-100", "max-h-96", "p-3", "mt-3");
    box.classList.add("opacity-0", "max-h-0", "invisible");
  }

  checkSubmitBtn();
  validatePassword(passwordInput);
});

passwordInput.addEventListener("input", (e) => {
  passwordChecklist(passwordInput);
});

confirmPasswordInput.addEventListener("focusout", (e) => {
  checkSubmitBtn();
  validateConfirmPassword(confirmPasswordInput);
});

passwordReveals.forEach((button) => {
  button.addEventListener("click", (e) => {
    revealPassword(e.target);
  });
});

function validateEmail(email) {
  const emailErrorSpan = document.querySelector(".email-error");
  emailErrorSpan.textContent = "";
  emailInput.classList.remove("outline-red-500");

  if (email.validity.valueMissing) {
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

  if (postcode.validity.valueMissing) {
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

  if (country.validity.valueMissing) {
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

  if (password.validity.valueMissing) {
    passwordInput.classList.add("outline-red-500");
    passwordErrorSpan.textContent = "Please enter a password";
    return false;
  }

  if (password.validity.tooShort) {
    passwordInput.classList.add("outline-red-500");
    passwordErrorSpan.textContent = "Password too short";
    return false;
  }

  return true;
}

function validateConfirmPassword(confirmPassword) {
  const passwordErrorSpan = document.querySelector(".confirm-password-error");
  passwordErrorSpan.textContent = "";
  confirmPasswordInput.classList.remove("outline-red-500");

  if (confirmPassword.validity.valueMissing) {
    confirmPasswordInput.classList.add("outline-red-500");
    passwordErrorSpan.textContent = "Please confirm your password";
    return false;
  }

  if (password.value.trim() != confirmPassword.value.trim()) {
    confirmPasswordInput.classList.add("outline-red-500");
    passwordErrorSpan.textContent = "Your passwords do not match";
    return false;
  }

  return true;
}

function passwordChecklist(password) {
  const checklistArr = document.querySelectorAll(
    ".password-checklist li span i",
  );
  const box = document.querySelector(".password-checklist-box");
  const bars = document.querySelectorAll(".password-bars div");
  let lengthCheck = false;
  let uppercaseCheck = false;
  let numberCheck = false;
  let barIndex = 0;

  // Reset all bars to gray
  bars.forEach((bar) => {
    bar.classList.remove("bg-green-500");
    bar.classList.add("bg-slate-100");
  });

  if (password.value.trim().length > 7) {
    checklistArr[0].className = "fa-solid fa-check text-green-500";
    lengthCheck = true;
    if (bars.length > barIndex) {
      bars[barIndex].classList.remove("bg-slate-100");
      bars[barIndex].classList.add("bg-green-500");
      barIndex++;
    }
  } else {
    checklistArr[0].className = "fa-solid fa-x text-red-500";
  }

  if (password.value.trim() !== password.value.trim().toLowerCase()) {
    checklistArr[1].className = "fa-solid fa-check text-green-500";
    uppercaseCheck = true;
    if (bars.length > barIndex) {
      bars[barIndex].classList.remove("bg-slate-100");
      bars[barIndex].classList.add("bg-green-500");
      barIndex++;
    }
  } else {
    checklistArr[1].className = "fa-solid fa-x text-red-500";
  }

  if (
    /\d/.test(password.value.trim()) ||
    /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password.value.trim())
  ) {
    checklistArr[2].className = "fa-solid fa-check text-green-500";
    numberCheck = true;
    if (bars.length > barIndex) {
      bars[barIndex].classList.remove("bg-slate-100");
      bars[barIndex].classList.add("bg-green-500");
      barIndex++;
    }
  } else {
    checklistArr[2].className = "fa-solid fa-x text-red-500";
  }

  if (lengthCheck && uppercaseCheck && numberCheck) {
    box.classList.add("border-green-500");
    box.classList.remove("border-red-500");
  } else {
    box.classList.remove("border-green-500");
    box.classList.add("border-red-500");
  }
}

function revealPassword(input) {
  let field = input.previousElementSibling;
  if (field) {
    if (field.type === "password") {
      field.type = "text";
      input.classList.remove("fa-eye");
      input.classList.add("fa-eye-slash");
    } else {
      field.type = "password";
      input.classList.add("fa-eye");
      input.classList.remove("fa-eye-slash");
    }
  }
}

function checkSubmitBtn() {
  const allValid =
    validateEmail(emailInput) &&
    validatePostcode(postcodeInput) &&
    validateCountry(countryInput) &&
    validatePassword(passwordInput) &&
    validateConfirmPassword(confirmPasswordInput);

  document.querySelectorAll('.email-error, .postcode-error, .country-error, .password-error, .confirm-password-error')
    .forEach(span => span.textContent = '');

  [emailInput, countryInput, postcodeInput, passwordInput, confirmPasswordInput]
    .forEach(input => input.classList.remove("outline-red-500"));

  submitButton.toggleAttribute("disabled", !allValid);
  submitButton.classList.toggle('bg-indigo-300', !allValid);
  submitButton.classList.toggle('bg-indigo-500', allValid);
  submitButton.classList.toggle('hover:bg-indigo-500', allValid);
  submitButton.classList.toggle('focus-visible:outline-2', allValid);
  submitButton.classList.toggle('focus-visible:outline-offset-2', allValid);
  submitButton.classList.toggle('focus-visible:outline-indigo-600', allValid);
}
