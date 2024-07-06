const publishBlogBtn = document.getElementById("publishBlogBtn");

const publishBlog = async () => {
  const blogTitle = document.getElementById("blog-title").value.trim();
  const blogContent = document.getElementById("blog-content").value.trim();
  const author = "exampleUsername"; // Replace with actual username

  if (blogTitle !== "" && blogContent !== "" && author) {
    try {
      const response = await fetch("/api/v1/blog/createblog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: blogTitle,
          content: blogContent,
          author,
        }),
      });

      if (!response.ok) {
        console.log("Blog Not published");
        return;
      }
      const newBlog = await response.json();
      document.getElementById("blog-title").value = "";
      document.getElementById("blog-content").value = "";
      console.log("Blog published:");
    } catch (err) {
      console.log("Blog could not publish", err);
    }
  } else {
    console.log("Please fill out all fields.");
  }
};

publishBlogBtn.addEventListener("click", publishBlog);
