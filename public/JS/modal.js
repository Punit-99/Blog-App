document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("modal");
  const openModalBtns = document.querySelectorAll(
    "#openModalBtn, #openModalBtn2"
  );
  const loginForm = document.getElementById("loginForm");
  const signUpForm = document.getElementById("signUpForm");
  const toggleSignUp = document.getElementById("toggleSignUp");
  const toggleLogin = document.getElementById("toggleLogin");

  openModalBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      modal.style.display = "block";
    });
  });

  // Close modal when clicking outside of the modal content
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  // Show Sign Up form and hide Login form
  toggleSignUp.addEventListener("click", function (e) {
    e.preventDefault();
    loginForm.style.display = "none";
    signUpForm.style.display = "block";
  });

  // Show Login form and hide Sign Up form
  toggleLogin.addEventListener("click", function (e) {
    e.preventDefault();
    signUpForm.style.display = "none";
    loginForm.style.display = "block";
  });
});
