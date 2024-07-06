document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("modal");
  const openModalBtns = document.querySelectorAll("#openModalBtn, #openModalBtn2");
  const loginForm = document.getElementById("loginForm");
  const signUpForm = document.getElementById("signUpForm");
  const toggleSignUp = document.getElementById("toggleSignUp");
  const toggleLogin = document.getElementById("toggleLogin");

  // Function to toggle modal visibility
  function toggleModal(display) {
    modal.style.display = display;
  }

  // Function to toggle between login and sign-up forms
  function toggleForms(showSignUpForm) {
    if (showSignUpForm) {
      loginForm.style.display = "none";
      signUpForm.style.display = "block";
    } else {
      loginForm.style.display = "block";
      signUpForm.style.display = "none";
    }
  }

  // Add event listeners to open modal buttons
  openModalBtns.forEach(btn => btn.addEventListener("click", () => toggleModal("block")));

  // Close modal when clicking outside of the modal content
  window.addEventListener("click", event => {
    if (event.target === modal) {
      toggleModal("none");
    }
  });

  // Add event listeners to toggle between forms
  toggleSignUp.addEventListener("click", e => {
    e.preventDefault();
    toggleForms(true);
  });

  toggleLogin.addEventListener("click", e => {
    e.preventDefault();
    toggleForms(false);
  });

  // Check if the modal should be opened based on the URL query parameter
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('modal') === 'open') {
    toggleModal("block");
  }
});
