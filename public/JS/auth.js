document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const signUpForm = document.getElementById("signUpForm");
  const modal = document.getElementById("modal");

  if (signUpForm) {
    signUpForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const userName = document.getElementById("signUpUserName").value;
      const email = document.getElementById("signUpEmail").value;
      const password = document.getElementById("signUpPassword").value;

      try {
        const response = await fetch("/api/v1/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userName, email, password }),
        });

        if (!response.ok) {
          return;
        }
        window.location.href = "/";
        modal.style.display = "block";
      } catch (err) {
        console.log(err);
      }
    });
  }
  //Login Form Submission
  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;

      try {
        const response = await fetch("/api/v1/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          return;
        }

        window.location.href = "/dashboard";
      } catch (error) {
        console.error("Login error:", error);
      }
    });
  }
});
