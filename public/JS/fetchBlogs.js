document.addEventListener("DOMContentLoaded", () => {
  // ----------Fetch All Blogs-------------------
  const fetchBlogs = async () => {
    try {
      const response = await fetch("/api/v1/blog/allblogs");
      const blogPosts = await response.json();
      blogPosts.forEach((blogPost) => {
        displayAllBlogs(blogPost);
        manageMyBlogs(blogPost);
      });
    } catch (err) {
      console.log(`Could not fetch blogs: ${err}`);
    }
  };

  const blogSection = document.getElementById("blogSection");
  const manageBlogSection = document.getElementById("manageBlogSection");

  // populate Blogs
  const displayAllBlogs = (blogPost) => {
    const blogPostElement = document.createElement("div");
    blogPostElement.classList.add("blog-post");
    blogPostElement.setAttribute("data-blog-id", blogPost._id);

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

    // read more button functionality
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

  // manage blogs populate here
  const manageMyBlogs = (blogPost) => {
    const blogPostElement = document.createElement("div");
    blogPostElement.classList.add("blog-post");
    blogPostElement.setAttribute("data-blog-id", blogPost._id);

    const blogPostContent = `
     <div class="imgConatiner">
        <img src="" alt="Blog Thumbnail" />
      </div>
      <div class="blog-post-content">
        <h2 class="blog-post-title">${blogPost.title}</h2>
        <p class="blog-post-description">...</p>
        <p class="blog-post-full-content" style="display: none">${blogPost.content}</p>
        <a href="#" class="read-more">read more</a>
        <div class="blog-post-footer">${blogPost.createdAt}</div>
      </div>
      <div class="actionBtn">
        <button id="editBtn" class="editBtn">EDIT</button>
        <button id="deleteBtn" class="deleteBtn">DELETE</button>
      </div>
    `;

    blogPostElement.innerHTML = blogPostContent;
    manageBlogSection.appendChild(blogPostElement);

    // delete function
    const deleteBtn = blogPostElement.querySelector(".deleteBtn");
    deleteBtn.addEventListener("click", async () => {
      try {
        const deleteBlog = await fetch(
          `/api/v1/blog/deleteblog/${blogPost._id}`,
          {
            method: "DELETE",
          }
        );
        if (deleteBlog.ok) {
          console.log("Blog deleted");
        }
      } catch (err) {
        console.log("Blog not deleted");
      }
    });

    // read more button functionality
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

  // Fetch and display blogs
  fetchBlogs();

  // ------------MODAL OPERATION--------------------
  const modal = document.getElementById("modal");

  // Close modal when clicking outside of the modal content
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  // Open modal on edit button click
  manageBlogSection.addEventListener("click", function (event) {
    const editBtn = event.target.closest(".editBtn");
    if (editBtn) {
      modal.style.display = "block";
    }
  });

  // // Delete Blog
  // const deleteBlog = async (blogId) => {
  //   try {
  //     const response = await fetch(`/api/v1/blog/deleteblog/${blogId}`, {
  //       method: "DELETE",
  //     });

  //     if (!response.ok) {
  //       console.log("Blog not Deleted");
  //       throw new Error("Failed to delete blog");
  //     }

  //     console.log(`Blog ${blogId} deleted successfully`);
  //   } catch (err) {
  //     console.error(`Blog not deleted: ${err}`);
  //   }
  // };
});
