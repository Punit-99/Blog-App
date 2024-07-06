// fetch All blogs

document.addEventListener("DOMContentLoaded", () => {
  // ----------Fetch All Blogs-------------------
  const fetchBlogs = async () => {
    try {
      const response = await fetch("/api/v1/blog/allblogs");
      const blogPosts = await response.json();
      blogPosts.forEach((blogPost) => {
        createBlogPostElement(blogPost);
      });
    } catch (err) {
      console.log(`Could not fetch blogs: ${err}`);
    }
  };
  // ----------------------------
  const blogSection = document.getElementById("blogSection");

  // populate Blogs
  const createBlogPostElement = (blogPost) => {
    const blogPostElement = document.createElement("div");
    blogPostElement.classList.add("blog-post");

    const blogPostContent = `
    <img src="" alt="Blog Thumbnail" />
    <div class="blog-post-content">
      <h2 class="blog-post-title">${blogPost.title}</h2>
      <p class="blog-post-description">...</p>
      <p class="blog-post-full-content" style="display:none;">${blogPost.content}</p>
      <a href="#" class="read-more">read more</a>
      <div class="blog-post-footer">${blogPost.createdAt}</div>
    </div>
  `;

    blogPostElement.innerHTML = blogPostContent;
    blogSection.appendChild(blogPostElement);

    // ----------read more button--------------
    const readMoreLink = blogPostElement.querySelector(".read-more");
    const fullContent = blogPostElement.querySelector(
      ".blog-post-full-content"
    );
    readMoreLink.addEventListener("click", function (event) {
      event.preventDefault();
      if (
        fullContent.style.display === "none" ||
        fullContent.style.display === ""
      ) {
        fullContent.style.display = "block";
        readMoreLink.textContent = "read less";
        blogPostElement.querySelector(".blog-post-description").style.display =
          "none";
      } else {
        fullContent.style.display = "none";
        readMoreLink.textContent = "read more";
        blogPostElement.querySelector(".blog-post-description").style.display =
          "block";
      }
    });
  };
  fetchBlogs();
});
