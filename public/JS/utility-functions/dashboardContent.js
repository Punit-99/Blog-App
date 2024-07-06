document
  .getElementById("all-blogs-link")
  .addEventListener("click", function (event) {
    event.preventDefault();
    showContent("all-blogs-content");
  });

document
  .getElementById("write-blog-link")
  .addEventListener("click", function (event) {
    event.preventDefault();
    showContent("write-blog-content");
  });

document
  .getElementById("manage-blogs-link")
  .addEventListener("click", function (event) {
    event.preventDefault();
    showContent("manage-blogs-content");
  });

// Function to show the selected content and hide others
function showContent(contentId) {
  const allContents = document.querySelectorAll(".overview");
  allContents.forEach((content) => {
    if (content.id === contentId) {
      content.style.display = "block";
    } else {
      content.style.display = "none";
    }
  });
}
