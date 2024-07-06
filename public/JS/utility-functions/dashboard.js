// dashboard.js

document.addEventListener("DOMContentLoaded", function () {
  const body = document.querySelector("body");
  const sidebar = body.querySelector("nav");
  const sidebarToggle = body.querySelector(".sidebar-toggle");

  // Toggle sidebar and save state in localStorage
  sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
  });
});
