// blogStructure.js

document.addEventListener("DOMContentLoaded", function () {
  const blogSection = document.getElementById("blogSection");
  const manageBlogSection = document.getElementById("manageBlogSection");
  const modal = document.getElementById("modal");

  const blogPosts = [
    {
      title: "A better Blogger experience on the web",
      thumbnail: "../Images/thumbnail.jpg",
      description:
        "Since 1999, millions of people have expressed themselves on Blogger",
      fullContent:
        "Since 1999, millions of people have expressed themselves on Blogger. From detailed posts about almost every apple variety you could ever imagine to a blog dedicated to the art of blogging itself, the ability to easily share, publish and express oneself on the web is at the core of Blogger's mission. As the web constantly evolves, we want to ensure anyone using Blogger has an easy and intuitive experience publishing their content to the web. That's why we've been slowly introducing an improved web experience for Blogger. Give the fresh interface a spin by clicking “Try the New Blog\"",
      date: "4 years ago",
    },
  ];

  function createBlogPostElement(post, section) {
    const blogPostElement = document.createElement("div");
    blogPostElement.classList.add("blog-post");

    const blogPostContent = `
      <img src="${post.thumbnail}" alt="Blog Thumbnail" />
      <div class="blog-post-content">
        <h2 class="blog-post-title">${post.title}</h2>
        <p class="blog-post-description">${post.description}...</p>
        <p class="blog-post-full-content" style="display:none;">${post.fullContent}</p>
        <a href="#" class="read-more">read more</a>
        <div class="blog-post-footer">${post.date}</div>
      </div>
    `;

    blogPostElement.innerHTML = blogPostContent;
    section.appendChild(blogPostElement);

    const readMoreLink = blogPostElement.querySelector(".read-more");
    const fullContent = blogPostElement.querySelector(".blog-post-full-content");

    readMoreLink.addEventListener("click", function (event) {
      event.preventDefault();
      if (fullContent.style.display === "none" || fullContent.style.display === "") {
        fullContent.style.display = "block";
        readMoreLink.textContent = "read less";
        blogPostElement.querySelector(".blog-post-description").style.display = "none";
      } else {
        fullContent.style.display = "none";
        readMoreLink.textContent = "read more";
        blogPostElement.querySelector(".blog-post-description").style.display = "block";
      }
    });
  }

  // Function to create blog posts in specified section
  function createBlogPosts(posts, section) {
    posts.forEach(post => {
      createBlogPostElement(post, section);
    });
  }

  // Create blog posts in blogSection
  createBlogPosts(blogPosts, blogSection);

  // Create blog posts in manageBlogSection
  createBlogPosts(blogPosts, manageBlogSection);

  // Modal operations
  function toggleModal() {
    modal.style.display = modal.style.display === "block" ? "none" : "block";
  }

  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      toggleModal();
    }
  });

  const editBtn = document.getElementById("editBtn");
  editBtn.addEventListener("click", toggleModal);
});

