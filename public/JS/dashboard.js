// dashboard.js

document.addEventListener("DOMContentLoaded", function () {
  const body = document.querySelector("body");
  const sidebar = body.querySelector("nav");
  const sidebarToggle = body.querySelector(".sidebar-toggle");

  // Toggle sidebar and save state in localStorage
  sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
    const status = sidebar.classList.contains("close") ? "close" : "open";
    localStorage.setItem("status", status);
  });

  // Retrieve and apply sidebar state from localStorage
  const status = localStorage.getItem("status");
  if (status === "close") {
    sidebar.classList.add("close");
  }
});
