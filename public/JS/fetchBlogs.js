document.addEventListener("DOMContentLoaded", () => {
  const blogSection = document.getElementById("blogSection");

  // Fetch all blogs
  const fetchBlogs = async () => {
    try {
      const response = await fetch("/api/v1/blog/allblogs");
      const blogPosts = await response.json();
      blogPosts.forEach((blogPost) => {
        displayAllBlogs(blogPost);
      });
    } catch (err) {
      console.log(`Could not fetch blogs: ${err}`);
    }
  };

  // Display all blogs in the blogSection
  const displayAllBlogs = (blogPost) => {
    const blogPostElement = createBlogPostElement(blogPost);
    blogSection.appendChild(blogPostElement);
  };

  const createBlogPostElement = (blogPost) => {
    const blogPostElement = document.createElement("div");
    blogPostElement.classList.add("blog-post");
    blogPostElement.setAttribute("data-blog-id", blogPost._id);

    const blogPostContent = `
      <div class="imgContainer">
        <img src="${blogPost.thumbnail}" alt="Blog Thumbnail" />
      </div>
      <div class="blog-post-content">
        <h2 class="blog-post-title">${blogPost.title}</h2>
        <p class="blog-post-description">...</p>
        <p class="blog-post-full-content" style="display: none">${
          blogPost.content
        }</p>
        <a href="#" class="read-more">read more</a>
        <div class="blog-post-footer">${new Date(
          blogPost.createdAt
        ).toLocaleString()}</div>
      </div>
    `;

    blogPostElement.innerHTML = blogPostContent;

    // Read more/less functionality
    const readMoreLink = blogPostElement.querySelector(".read-more");
    const fullContent = blogPostElement.querySelector(
      ".blog-post-full-content"
    );

    readMoreLink.addEventListener("click", (event) => {
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

    return blogPostElement;
  };

  fetchBlogs();
});
