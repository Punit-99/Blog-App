document.getElementById("logoutButton").addEventListener("click", async () => {
  try {
    const response = await fetch("/api/v1/auth/logout", {
      method: "POST",
    });

    if (response.ok) {
      console.log("Logged out successfully");
      window.location.href = "/";
    } else {
      console.error("Logout failed");
    }
  } catch (err) {
    console.error("Error:", err);
  }
});
