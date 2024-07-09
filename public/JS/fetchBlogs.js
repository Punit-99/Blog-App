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

    // delete Blog function
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
          blogPostElement.remove(); // Remove the blog post element from the DOM
        }
      } catch (err) {
        console.log("Blog not deleted", err);
      }
    });

    // Update blog function
    const editBtn = blogPostElement.querySelector(".editBtn");
    editBtn.addEventListener("click", () => {
      const modal = document.getElementById("modal");
      modal.style.display = "block";

      const editContainer = document.querySelector(".editContainer");
      const blogId = editContainer.querySelector("#blogId");
      const blogTitle = editContainer.querySelector("#blog-title");
      const blogContent = editContainer.querySelector("#blog-content");

      blogId.value = blogPost._id;
      blogTitle.value = blogPost.title;
      blogContent.value = blogPost.content;

      const updateBtn = editContainer.querySelector("#update-btn");
      updateBtn.addEventListener(
        "click",
        () => {
          updateBlog(blogId.value, blogTitle.value, blogContent.value);
        },
        { once: true }
      );
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

  // -----Update Blog-----
  const updateBlog = async (id, title, content) => {
    try {
      const response = await fetch(`/api/v1/blog/updateblog/${id}`, {
        method: "PATCH", // hold
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        const updatedBlog = await response.json();
        console.log("Blog updated:", updatedBlog);
        modal.style.display = "none";
        location.reload();
      } else {
        console.error("Update failed:", response.statusText);
      }
    } catch (err) {
      console.log(`Could not update blog ${err}`);
    }
  };
});
