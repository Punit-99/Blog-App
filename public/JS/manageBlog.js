document.addEventListener("DOMContentLoaded", () => {
  const myBlogs = async () => {
    try {
      const response = await fetch("/api/v1/blog/userblog");
      const myBlogs = await response.json();
      manageMyBlogs(myBlogs);
      myBlogs.forEach((blog) => {
        console.log(blog);
      });
    } catch (error) {}
  };

  // Display user blogs in the manageBlogSection
  const manageMyBlogs = (myblogPost) => {
    const blogPostElement = createBlogPostElement(myblogPost);

    // Add edit and delete functionality
    const deleteBtn = blogPostElement.querySelector(".deleteBtn");
    deleteBtn.addEventListener("click", async () => {
      try {
        const deleteBlog = await fetch(
          `/api/v1/blog/deleteblog/${myblogPost._id}`,
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

    const editBtn = blogPostElement.querySelector(".editBtn");
    editBtn.addEventListener("click", () => {
      modal.style.display = "block";

      const editContainer = document.querySelector(".editContainer");
      const blogId = editContainer.querySelector("#blogId");
      const blogTitle = editContainer.querySelector("#blog-title");
      const blogContent = editContainer.querySelector("#blog-content");
      const blogThumbnail = editContainer.querySelector("#blog-thumbnail");

      blogId.value = myblogPost._id;
      blogTitle.value = myblogPost.title;
      blogContent.value = myblogPost.content;

      const updateBtn = editContainer.querySelector("#update-btn");
      updateBtn.addEventListener(
        "click",
        async () => {
          await updateBlog(
            blogId.value,
            blogTitle.value,
            blogContent.value,
            blogThumbnail.files[0]
          );
        },
        { once: true }
      );
    });

    manageBlogSection.appendChild(blogPostElement);
  };

  // Helper function to create blog post element
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
      <div class="actionBtn">
        <button class="editBtn">EDIT</button>
        <button class="deleteBtn">DELETE</button>
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

  // Update Blog
  const updateBlog = async (id, title, content, thumbnail) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    try {
      const response = await fetch(`/api/v1/blog/updateblog/${id}`, {
        method: "PATCH",
        body: formData,
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

  // Close modal when clicking outside of it
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  myBlogs();
});
