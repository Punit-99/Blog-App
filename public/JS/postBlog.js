const publishBlogBtn = document.getElementById("publishBlogBtn");

const publishBlog = async () => {
  const blogTitle = document.getElementById("blog-title").value.trim();
  const blogContent = document.getElementById("blog-content").value.trim();
  const blogThumbnail = document.getElementById("blog-thumbnail").files[0];
  const author = "exampleUsername";
  if (blogTitle !== "" && blogContent !== "" && author && blogThumbnail) {
    const formData = new FormData();
    formData.append("title", blogTitle);
    formData.append("content", blogContent);
    formData.append("author", author);
    formData.append("thumbnail", blogThumbnail);

    try {
      const response = await fetch("/api/v1/blog/createblog", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      console.log("Response Status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.log("Blog Not published:", errorText);
        return;
      }
      const newBlog = await response.json();
      document.getElementById("blog-title").value = "";
      document.getElementById("blog-content").value = "";
      document.getElementById("blog-thumbnail").value = "";
    } catch (err) {
      console.log("Blog could not publish", err);
    }
  } else {
    console.log("Please fill out all fields.");
  }
};

publishBlogBtn.addEventListener("click", publishBlog);
